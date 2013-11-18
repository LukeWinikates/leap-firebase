Firebase = function(){}
App.Router.map(function() {
  this.resource('index', {path: '/'})
  this.resource('broadcast', {path: '/broadcast/:id'})
  this.resource('watch', {path: '/watch/:id'})
});

App.BroadcastRoute = Em.Route.extend({
  //afterModel:function(controller) {
    //controller.set("frameSource", Leap.loop)
    //console.log("setupController");
  //},
  model: function(params, transition) {
    var fb = new Firebase(App.ENV.FIREBASE_URL + '/'+ params.id);
    return {fb: fb, frameSource: Leap.loop};
  }
})

App.WatchRoute = Em.Route.extend({
  model: function(params, transition) {
    var fb = new Firebase(App.ENV.FIREBASE_URL + '/'+ params.id);
    return fb;
  }
})

