App.HandVisualizerComponent = Ember.Component.extend({
  didInsertElement: function(){
    var frameSource = this.get("frameSource")
    var canvas = document.getElementById("leap-overlay");
    // fullscreen
    canvas.width = 800;
    canvas.height = 400;
    var ctx = canvas.getContext("2d");
    ctx.translate(canvas.width/2,canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.7)";

    var renderer = function(frame) {
      ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);

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
          ctx.arc(pos[0]-radius/2,-pos[1]-radius/2,radius,0,2*Math.PI);
          ctx.fill();
        }
      });
    }
    this.set('renderer', renderer);
    frameSource.subscribe(renderer);
  },
  willDestroyElement: function(){
    var frameSource = this.get("frameSource")
    frameSource.stopListening(this.get('renderer'));
  }
});
