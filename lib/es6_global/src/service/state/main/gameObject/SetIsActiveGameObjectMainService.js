

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as IsActiveScriptMainService$Wonderjs from "../script/IsActiveScriptMainService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as OperateMeshRendererMainService$Wonderjs from "../meshRenderer/OperateMeshRendererMainService.js";

function setIsActive(uid, isActive, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(gameObjectRecord);
  newrecord$1[/* isActiveMap */3] = MutableSparseMapService$WonderCommonlib.set(uid, isActive, gameObjectRecord[/* isActiveMap */3]);
  newrecord[/* gameObjectRecord */10] = newrecord$1;
  var match = GetComponentGameObjectService$Wonderjs.getScriptComponent(uid, gameObjectRecord);
  var state$1 = match !== undefined ? IsActiveScriptMainService$Wonderjs.setIsActive(match, isActive, newrecord) : newrecord;
  var match$1 = GetComponentGameObjectService$Wonderjs.getMeshRendererComponent(uid, gameObjectRecord);
  if (match$1 !== undefined) {
    return OperateMeshRendererMainService$Wonderjs.setIsRender(match$1, isActive, state$1);
  } else {
    return state$1;
  }
}

export {
  setIsActive ,
  
}
/* IsActiveScriptMainService-Wonderjs Not a pure module */
