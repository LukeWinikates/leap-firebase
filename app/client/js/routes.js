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

App.ChannelsWatchRoute = Em.Route.extend({
  model: function(params, transition) {
    var fb = new Firebase(App.ENV.FIREBASE_URL + '/channel/'+ params.id + '/stream/' + App.CurrentUser.id);
    new App.FirebaseFramePusher(fb).start();

    var fb = new Firebase(App.ENV.FIREBASE_URL + '/channel/'+ params.id + '/stream');
    return {frameSource: new App.FirebaseFrameSource(fb)};
  }
});

