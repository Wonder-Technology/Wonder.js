

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function getAmbientLightColor(param) {
  var sceneRecord = param[/* sceneRecord */0];
  return sceneRecord[/* ambientLight */0][/* color */0];
}

function setAmbientLightColor(color, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* sceneRecord */0] = /* record */[/* ambientLight : record */[/* color */color]];
  return newrecord;
}

export {
  getAmbientLightColor ,
  setAmbientLightColor ,
  
}
/* No side effect */
