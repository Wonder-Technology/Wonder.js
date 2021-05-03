

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as UpdateTransformJobUtils$Wonderjs from "../../utils/UpdateTransformJobUtils.js";
import * as RecordTransformMainService$Wonderjs from "../../../service/state/main/transform/RecordTransformMainService.js";

function execJob(param, state) {
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var index = transformRecord[/* index */0];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* transformRecord */11] = UpdateTransformJobUtils$Wonderjs.execJob(index, state[/* globalTempRecord */37], transformRecord);
  return newrecord;
}

export {
  execJob ,
  
}
/* UpdateTransformJobUtils-Wonderjs Not a pure module */
