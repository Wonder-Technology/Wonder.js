

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GroupLightMaterialService$Wonderjs from "../../../../record/main/material/light/GroupLightMaterialService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";

var _handleRemoveComponent = GroupLightMaterialService$Wonderjs.removeGameObject;

function handleRemoveComponent(gameObject, lightMaterial, state) {
  var lightMaterialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = GroupLightMaterialService$Wonderjs.removeGameObject(gameObject, lightMaterial, lightMaterialRecord);
  return newrecord;
}

function handleBatchRemoveComponent(lightMaterialDataArray, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = ArrayService$WonderCommonlib.reduceOneParam((function (lightMaterialRecord, param) {
          return GroupLightMaterialService$Wonderjs.removeGameObject(param[0], param[1], lightMaterialRecord);
        }), RecordLightMaterialMainService$Wonderjs.getRecord(state), lightMaterialDataArray);
  return newrecord;
}

export {
  _handleRemoveComponent ,
  handleRemoveComponent ,
  handleBatchRemoveComponent ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
