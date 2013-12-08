App.ChannelsController = Ember.ArrayController.extend({
  actions: {
    start: function(){
      var id = uuid.v4();
      var fb = new Firebase(App.ENV.FIREBASE_URL + '/channels');
      fb.child(id).set({id: id, name: 'something', timestamp: Date.now()})
      this.transitionToRoute('channels.watch', {id: id, frameSource: new App.LeapFrameSource()});
    }
  }
});

