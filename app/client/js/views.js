App.HandVisualizerComponent = Ember.Component.extend({
  didInsertElement: function(){
    var frameSource = this.get("frameSource")
    var canvas = document.getElementById("leap-overlay");
    // fullscreen
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    // create a rendering context
    var ctx = canvas.getContext("2d");
    ctx.translate(canvas.width/2,canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    // listen to Leap Motion
    var renderer = function(frame) {
    // clear last frame
      ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);
      //A.push(obj);
      // render circles based on pointable positions
      var pointablesMap = frame.pointablesMap;
      points = _.map(pointablesMap, function(p) { return {id: p.id, tipPosition: p.tipPosition}});
      for (var i in points) {
        // get the pointable's position
        var pointable = points[i]
        if(pointable) {
          var pos = pointable.tipPosition;

          // create a circle for each pointable
          var radius = Math.min(600/Math.abs(pos[2]),20);
          ctx.beginPath();
          ctx.arc(pos[0]-radius/2,-pos[1]-radius/2,radius,0,2*Math.PI);
          ctx.fill();
        }
      }
    }
    this.set('renderer', renderer);
    frameSource.subscribe(renderer);
  },
  willDestroyElement: function(){
    frameSource.stopListening(this.get('renderer'));
  }
});
