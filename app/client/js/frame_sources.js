App.FirebaseFramePusher = Ember.Object.extend({
  init: function(firebase) {
    this.firebase = firebase;
    _.bindAll(this, 'start')
    this.firebase.onDisconnect().set(null);
  },
  start: function(){
    var self = this;
    Leap.loop(function(frame){
      var pointables = frame.pointables || [];
      var points = _.map(pointables, function(p) {
        return {id: p.id, tipPosition: p.tipPosition}
      });
      self.firebase.update({pointables: points});
    });
  },
  stop: function() {
    Leap.loopController && Leap.loopController.removeAllListeners();
  }
})

App.FirebaseFrameSource = Ember.Object.extend({
  init: function(firebase) {
    this.firebase = firebase;
  },
  subscribe: function(frameCallback) {
    this.firebase.on('value', function(f){
      frameCallback(f.val());
    });
  },
  stopListening: function(frameCallback) {
    this.firebase.off();
  }
});
