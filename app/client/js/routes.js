App.Router.map(function() {
  this.resource('index', {path: '/'})
  this.resource('broadcast', {path: '/broadcast/:id'})
  this.resource('watch', {path: '/watch/:id'})
});

App.IndexRoute = Em.Route.extend({
  model: function() {
    return EmberFire.Array.create({
      ref: new Firebase(App.ENV.FIREBASE_URL+ '/rooms')
    })
  }
});

App.BroadcastRoute = Em.Route.extend({
  model: function(params, transition) {
    var fb = new Firebase(App.ENV.FIREBASE_URL + '/rooms/'+ params.id + '/stream');
    new App.FirebaseFramePusher(fb).start();
    return {fb: fb, frameSource: new App.LeapFrameSource(), id: params.id};
  }
});

App.WatchRoute = Em.Route.extend({
  model: function(params, transition) {
    var fb = new Firebase(App.ENV.FIREBASE_URL + '/rooms/'+ params.id + '/stream');
    return {frameSource: new App.FirebaseFrameSource(fb)};
  }
});

