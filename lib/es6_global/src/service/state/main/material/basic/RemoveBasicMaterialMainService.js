

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GroupBasicMaterialService$Wonderjs from "../../../../record/main/material/basic/GroupBasicMaterialService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";

var _handleRemoveComponent = GroupBasicMaterialService$Wonderjs.removeGameObject;

function handleRemoveComponent(gameObject, basicMaterial, state) {
  var basicMaterialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = GroupBasicMaterialService$Wonderjs.removeGameObject(gameObject, basicMaterial, basicMaterialRecord);
  return newrecord;
}

function handleBatchRemoveComponent(basicMaterialDataArray, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = ArrayService$WonderCommonlib.reduceOneParam((function (basicMaterialRecord, param) {
          return GroupBasicMaterialService$Wonderjs.removeGameObject(param[0], param[1], basicMaterialRecord);
        }), RecordBasicMaterialMainService$Wonderjs.getRecord(state), basicMaterialDataArray);
  return newrecord;
}

export {
  _handleRemoveComponent ,
  handleRemoveComponent ,
  handleBatchRemoveComponent ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
