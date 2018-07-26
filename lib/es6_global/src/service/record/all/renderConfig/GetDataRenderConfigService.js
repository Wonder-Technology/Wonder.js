


function getShaders(param) {
  return param[/* shaders */0];
}

function getShaderLibs(param) {
  return param[/* shaderLibs */1];
}

function getPass(param) {
  return param[/* pass */2];
}

function getFail(param) {
  return param[/* fail */3];
}

export {
  getShaders ,
  getShaderLibs ,
  getPass ,
  getFail ,
  
}
/* No side effect */
