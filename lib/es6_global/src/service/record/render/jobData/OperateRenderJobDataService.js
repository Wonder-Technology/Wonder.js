


function getOutlineColor(param) {
  return param[/* outlineData */0][/* outlineColor */0];
}

function getGameObjectsNeedDrawOutline(param) {
  return param[/* outlineData */0][/* gameObjectsNeedDrawOutline */1];
}

export {
  getOutlineColor ,
  getGameObjectsNeedDrawOutline ,
  
}
/* No side effect */
