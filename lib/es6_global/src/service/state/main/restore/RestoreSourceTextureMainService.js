

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordSourceTextureMainService$Wonderjs from "../texture/source/RecordSourceTextureMainService.js";

function restore(currentState, targetState) {
  var currentTextureRecord = RecordSourceTextureMainService$Wonderjs.getRecord(currentState);
  RecordSourceTextureMainService$Wonderjs.getRecord(targetState);
  var newrecord = Caml_array.caml_array_dup(targetState);
  newrecord[/* sourceTextureRecord */17] = /* record */[/* buffer */currentTextureRecord[/* buffer */0]];
  return newrecord;
}

export {
  restore ,
  
}
/* RecordSourceTextureMainService-Wonderjs Not a pure module */
