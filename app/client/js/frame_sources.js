App.FirebaseFramePusher = Ember.Object.extend({
  init: function(firebase) {
    this.firebase = firebase;
    _.bindAll(this, 'start')
  },
  start: function(){
    var self = this;
    Leap.loop(function(frame){
      var pointables = frame.pointables || [];
      var points = _.map(pointables, function(p) { return {id: p.id, tipPosition: p.tipPosition}});
      self.firebase.update({pointables: points});
    });
  }
})

App.LeapFrameSource = Ember.Object.extend({
  subscribe:function(frameCallback) {
    Leap.loop(function(frame) {
      frameCallback([frame]);
    });
  },
  stopListening: function(frameCallback) {
    Leap.loopController.removeAllListeners();
  }
});

App.FirebaseFrameSource = Ember.Object.extend({
  init: function(firebase) {
    this.firebase = firebase;
  },
  subscribe: function(frameCallback) {
    this.firebase.on('value', function(f){frameCallback(f.val())});
  },
  stopListening: function(frameCallback) {
    this.firebase.off();
  }
});
