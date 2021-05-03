


function getColor(param) {
  return param[/* outlineData */0][/* outlineColor */0];
}

function setColor(color, jobDataRecord) {
  return /* record */[/* outlineData : record */[
            /* outlineColor */color,
            /* gameObjectsNeedDrawOutline */jobDataRecord[/* outlineData */0][/* gameObjectsNeedDrawOutline */1]
          ]];
}

function getGameObjectsNeedDrawOutline(param) {
  return param[/* outlineData */0][/* gameObjectsNeedDrawOutline */1];
}

export {
  getColor ,
  setColor ,
  getGameObjectsNeedDrawOutline ,
  
}
/* No side effect */
