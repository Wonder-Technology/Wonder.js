

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as NameService$Wonderjs from "../../../primitive/name/NameService.js";
import * as RecordGeometryMainService$Wonderjs from "./RecordGeometryMainService.js";

function getName(geometry, state) {
  return NameService$Wonderjs.getName(geometry, RecordGeometryMainService$Wonderjs.getRecord(state)[/* nameMap */20]);
}

function unsafeGetName(geometry, state) {
  return NameService$Wonderjs.unsafeGetName(geometry, RecordGeometryMainService$Wonderjs.getRecord(state)[/* nameMap */20]);
}

function setName(geometry, name, state) {
  var record = RecordGeometryMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(record);
  newrecord[/* geometryRecord */23] = (newrecord$1[/* nameMap */20] = NameService$Wonderjs.setName(geometry, name, record[/* nameMap */20]), newrecord$1);
  return newrecord;
}

export {
  getName ,
  unsafeGetName ,
  setName ,
  
}
/* NameService-Wonderjs Not a pure module */
