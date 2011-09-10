(function( $ ){
  $.fn.cornify = function() {
    var createTransform = function(sizeBase, angleSlope) {
          var size = sizeBase + Math.round(Math.random()*10)/100,
              halfAngleSlope = angleSlope / 2,
              angle = Math.round(Math.random()*angleSlope-halfAngleSlope),
              result = "rotate("+angle+"deg) scale("+size+","+size+")";

          return result;
        },
        performTransformation = function(element, sizeBase, angleSlope) {
          var element = $(element),
              transform = createTransform(sizeBase, angleSlope);

          element.css({
            'transform': transform,
            'WebkitTransform': transform
          });
        };

    return this.css({
      "WebkitTransition": "all .1s linear",
      "WebkitTransform": "rotate(1deg) scale(1.01,1.01)",
      "transition": "all .1s linear"
    }).mouseover(function() {
      performTransformation(this, 1, 20);
    }).mouseout(function() {
      performTransformation(this, .9, 6);
    });
  };
})( jQuery );
