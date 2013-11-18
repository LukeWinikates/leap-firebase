App.IndexController = Ember.Controller.extend({
  actions: {
    start: function(){
      var id = uuid.v4();
      this.transitionToRoute('broadcast', {id: id});
    }
  }
});

