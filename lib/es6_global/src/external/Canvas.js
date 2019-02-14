


var drawImage = (
    function(source, x, y, context){
      context.drawImage(source, x, y);
      return context
    }
    );

var getImageData = (
    function(x, y, width, height, context){
      return context.getImageData(x, y, width, height);
    }
    );

var putImageData = (
    function(imageData, x, y, context){
      context.putImageData(imageData, x, y);
    }
    );

export {
  drawImage ,
  getImageData ,
  putImageData ,
  
}
/* drawImage Not a pure module */
