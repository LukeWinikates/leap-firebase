App.ChannelsController = Ember.ArrayController.extend({
  actions: {
    start: function(){
      var id = uuid.v4();
      var fb = new Firebase(App.ENV.FIREBASE_URL + '/channels');
      fb.child(id).set({id: id, name: 'something', timestamp: Date.now()})
      this.transitionToRoute('channels.show', id);
    }
  }
});

App.ChannelsShowController = Ember.ObjectController.extend({
  init: function() {
    this.addBeforeObserver('model', this.stopBroadcasting);
    this.addObserver('model', this.startBroadcasting);
    this._super();
  },

  stopBroadcasting: function() {
    var model = this.get('model');
    model && model.stopBroadcasting();
  },

  startBroadcasting: function() {
    var model = this.get('model');
    model && model.startBroadcasting();
  }
});
