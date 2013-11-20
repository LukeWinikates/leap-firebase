App.Router.map(function() {
  this.resource('index', {path: '/'})
  this.resource('broadcast', {path: '/broadcast/:id'})
  this.resource('watch', {path: '/watch/:id'})
});

App.BroadcastRoute = Em.Route.extend({
  model: function(params, transition) {
    var fb = new Firebase(App.ENV.FIREBASE_URL + '/'+ params.id);
    new App.FirebaseFramePusher(fb).start();
    return {fb: fb, frameSource: new App.LeapFrameSource(), id: params.id};
  }
});

App.WatchRoute = Em.Route.extend({
  model: function(params, transition) {
    var fb = new Firebase(App.ENV.FIREBASE_URL + '/'+ params.id);
    return {frameSource: new App.FirebaseFrameSource(fb)};
  }
});

App.FirebaseFramePusher = Ember.Object.extend({
  init: function(firebase) {
    this.firebase = firebase;
    _.bindAll(this, 'start')
  },
  start: function(){
    var self = this;
    Leap.loop(function(frame){
      var pointables = frame.pointables;
      var points = _.map(pointables, function(p) { return {id: p.id, tipPosition: p.tipPosition}});
      self.firebase.set({pointables: points});
    });
  }
})

App.LeapFrameSource = Ember.Object.extend({
  subscribe:function(frameCallback) {
    Leap.loop(frameCallback);
  },
  stopListening: function(frameCallback) {
    Leap.loopController.removeListener(frameCallback);
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
