


function getOutlineColor(param) {
  return param[/* outlineData */0][/* outlineColor */0];
}

function getGameObjectsNeedDrawOutline(param) {
  return param[/* outlineData */0][/* gameObjectsNeedDrawOutline */1];
}

function getSkyboxCubeTexture(param) {
  return param[/* skyboxData */1][/* cubeTexture */8];
}

export {
  getOutlineColor ,
  getGameObjectsNeedDrawOutline ,
  getSkyboxCubeTexture ,
  
}
/* No side effect */
