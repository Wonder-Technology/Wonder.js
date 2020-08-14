


function getContext(canvas, contextConfigJsObj) {
  return canvas.getContext("webgl", contextConfigJsObj);
}

function createGl(contextConfig, canvas) {
  return canvas.getContext("webgl", contextConfig);
}

export {
  getContext ,
  createGl ,
  
}
/* No side effect */
