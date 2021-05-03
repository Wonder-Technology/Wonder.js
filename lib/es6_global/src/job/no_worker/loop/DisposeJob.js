

import * as Caml_array from "./../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as DisposeJobUtils$Wonderjs from "../../utils/DisposeJobUtils.js";
import * as DisposeVboBufferService$Wonderjs from "../../../service/record/main/vboBuffer/DisposeVboBufferService.js";
import * as DisposeComponentGameObjectMainService$Wonderjs from "../../../service/state/main/gameObject/DisposeComponentGameObjectMainService.js";

function execJob(flags, state) {
  var match = DisposeJobUtils$Wonderjs.execJob(DisposeComponentGameObjectMainService$Wonderjs.batchDisposeBasicMaterialComponentData, DisposeComponentGameObjectMainService$Wonderjs.batchDisposeLightMaterialComponentData, state);
  var state$1 = match[0];
  var newrecord = Caml_array.caml_array_dup(state$1);
  newrecord[/* vboBufferRecord */36] = DisposeVboBufferService$Wonderjs.disposeSourceInstanceVboBuffer(match[2], DisposeVboBufferService$Wonderjs.disposeGeometryVboBuffer(match[1], state$1[/* vboBufferRecord */36]));
  return newrecord;
}

export {
  execJob ,
  
}
/* DisposeJobUtils-Wonderjs Not a pure module */
