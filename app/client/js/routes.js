App.Router.map(function() {
  this.resource('index', {path: '/'})
  this.resource('channels', function(){
    this.route('broadcast', {path: '/:id/broadcast'})
    this.route('watch', {path: '/:id/watch'})
  });
});

App.IndexRoute = Em.Route.extend({
  model: function() {
    return EmberFire.Array.create({
      ref: new Firebase(App.ENV.FIREBASE_URL+ '/rooms')
    })
  }
});

App.ChannelsBroadcastRoute = Em.Route.extend({
  model: function(params, transition) {
    var fb = new Firebase(App.ENV.FIREBASE_URL + '/rooms/'+ params.id + '/stream');
    new App.FirebaseFramePusher(fb).start();
    return {fb: fb, frameSource: new App.LeapFrameSource(), id: params.id};
  }
});

App.ChannelsWatchRoute = Em.Route.extend({
  model: function(params, transition) {
    var fb = new Firebase(App.ENV.FIREBASE_URL + '/rooms/'+ params.id + '/stream');
    return {frameSource: new App.FirebaseFrameSource(fb)};
  }
});

