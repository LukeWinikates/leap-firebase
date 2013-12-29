App.HandVisualizerComponent = Ember.Component.extend({
  init: function(){
    this.addBeforeObserver('frameSource', this.unsubscribeFrameSource);
    this.addObserver('frameSource', this.frameSourceDidChange);
    this.subscribeToFrameSource(this.get('frameSource'));
  },
  frameSourceDidChange: function(sender, key, value, rev){
    var frameSource = this.get("frameSource");
    this.subscribeToFrameSource(frameSource);
  },
  didInsertElement: function(){
    var canvas = document.getElementById("leap-overlay");
    ctx = canvas.getContext("2d");
    ctx.translate(canvas.width/2, canvas.height);
    this.set('isInDOM', true);
  },
  subscribeToFrameSource: function(frameSource) {
    var self = this;

    var renderer = function(channels) {
      if(!self.get('isInDOM')) { return; }
      var canvas = document.getElementById("leap-overlay");
      ctx = canvas.getContext("2d");
      ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);
      ctx.fillStyle = 'rgba(0,0,0,0.7)';

      _.each(channels, function(frame, userId){
        ctx.fillStyle = self.fillColorForChannel(userId);
        if(!frame) { return; }
        // render circles based on pointable positions
        var pointables = frame.pointables;
        var points = _.map(pointables, function(p) { return {id: p.id, tipPosition: p.tipPosition}});
        _.each(points, function(pointable) {
          // get the pointable's position
          if(pointable) {
            var pos = pointable.tipPosition;
            // create a circle for each pointable
            var radius = Math.min(600/Math.abs(pos[2]),20);
            ctx.beginPath();
            var x = pos[0] -radius/2;
            var y = -pos[1] -radius/2;
            var endAngle = 2*Math.PI;
            ctx.arc(x,y,radius,0,endAngle);
            ctx.fill();
          }
        });
      });
    }
    this.set('renderer', renderer);
    frameSource.subscribe(renderer);
  },
  unsubscribeFrameSource: function() {
    var frameSource = this.get("frameSource")
    frameSource.stopListening(this.get('renderer'));
  },
  willDestroyElement: function(){
    var frameSource = this.get("frameSource")
    frameSource.stopListening(this.get('renderer'));
  },
  fillColorForChannel: function(userId) {
    if(userId == App.CurrentUser.id) {
      return 'rgba(0,0,0,0.7)';
    }
    return 'rgba(0,140, 186, 0.7)';
  }
});
