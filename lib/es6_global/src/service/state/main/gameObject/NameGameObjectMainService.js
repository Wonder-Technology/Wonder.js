

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as NameService$Wonderjs from "../../../primitive/name/NameService.js";

function getName(uid, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return NameService$Wonderjs.getName(uid, gameObjectRecord[/* nameMap */1]);
}

function unsafeGetName(uid, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  return NameService$Wonderjs.unsafeGetName(uid, gameObjectRecord[/* nameMap */1]);
}

function setName(uid, name, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* nameMap */1] = NameService$Wonderjs.setName(uid, name, gameObjectRecord[/* nameMap */1]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  return newrecord;
}

export {
  getName ,
  unsafeGetName ,
  setName ,
  
}
/* NameService-Wonderjs Not a pure module */
