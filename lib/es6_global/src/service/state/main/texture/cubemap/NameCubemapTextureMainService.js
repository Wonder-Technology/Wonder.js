

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as NameService$Wonderjs from "../../../../primitive/name/NameService.js";
import * as RecordCubemapTextureMainService$Wonderjs from "./RecordCubemapTextureMainService.js";

function getName(texture, state) {
  return NameService$Wonderjs.getName(texture, RecordCubemapTextureMainService$Wonderjs.getRecord(state)[/* nameMap */36]);
}

function unsafeGetName(texture, state) {
  return NameService$Wonderjs.unsafeGetName(texture, RecordCubemapTextureMainService$Wonderjs.getRecord(state)[/* nameMap */36]);
}

function setName(texture, name, state) {
  var record = RecordCubemapTextureMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(record);
  newrecord[/* cubemapTextureRecord */20] = (newrecord$1[/* nameMap */36] = NameService$Wonderjs.setName(texture, name, record[/* nameMap */36]), newrecord$1);
  return newrecord;
}

export {
  getName ,
  unsafeGetName ,
  setName ,
  
}
/* NameService-Wonderjs Not a pure module */
