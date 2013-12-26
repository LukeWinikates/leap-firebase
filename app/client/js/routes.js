App.Router.map(function() {
  this.resource('index', {path: '/'})
  this.resource('channels', function(){
    this.route('watch', {path: '/:id'})
  });
  this.route('sorry');
});

App.ApplicationRoute = Em.Route.extend({
  model: function() {
    var firebase = new Firebase(App.ENV.FIREBASE_URL);
    var promise = new Em.RSVP.Promise(function(resolve, reject){
      var simpleLogin = new FirebaseSimpleLogin(firebase, function(error, user) {
        if(error) {
          reject(error);
        }
        else {
          App.CurrentUser = user;
          resolve(user);
        }
      });
      simpleLogin.login('anonymous');
    });
    return promise;
  }
});

App.IndexRoute = Em.Route.extend({
  redirect: function() {
    this.transitionTo('channels')
  }
})

App.ChannelsRoute = Em.Route.extend({
  model: function() {
    return EmberFire.Array.create({
      ref: new Firebase(App.ENV.FIREBASE_URL+ '/channels')
    });
  }
});

App.Channel = Ember.Object.extend({
  init: function() {
    var framePusherRef = new Firebase(App.ENV.FIREBASE_URL + '/channel/'+ this.id + '/stream/' + App.CurrentUser.id);
    var framePusher = new App.FirebaseFramePusher(framePusherRef);
    this.set('framePusher', framePusher);
    var fb = new Firebase(App.ENV.FIREBASE_URL + '/channel/'+ this.id + '/stream');
    this.set('frameSource', new App.FirebaseFrameSource(fb));
  },
  startBroadcasting: function() {
    this.get('framePusher').start();
  },
  stopBroadcasting: function() {
    this.get('framePusher').stop();
  }
});

App.ChannelsWatchRoute = Em.Route.extend({
  model: function(params, transition) {
    return App.Channel.create(params);
  }
});

