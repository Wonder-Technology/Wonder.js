


function getIsDebug(state) {
  return state.config.isDebug;
}

function getGeometryCount(state) {
  return state.config.geometryCount;
}

function getGeometryPointCount(state) {
  return state.config.geometryPointCount;
}

export {
  getIsDebug ,
  getGeometryCount ,
  getGeometryPointCount ,
  
}
/* No side effect */
