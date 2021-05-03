

import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

var _setMapUnit = MutableSparseMapService$WonderCommonlib.set;

function setDiffuseMapUnit(material, unit, state) {
  MutableSparseMapService$WonderCommonlib.set(material, unit, state[/* lightMaterialRecord */8][/* diffuseMapUnitMap */0]);
  return state;
}

function setSpecularMapUnit(material, unit, state) {
  MutableSparseMapService$WonderCommonlib.set(material, unit, state[/* lightMaterialRecord */8][/* specularMapUnitMap */1]);
  return state;
}

export {
  _setMapUnit ,
  setDiffuseMapUnit ,
  setSpecularMapUnit ,
  
}
/* No side effect */
