

import * as Caml_array from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as GroupBasicMaterialService$Wonderjs from "../../../../record/main/material/basic/GroupBasicMaterialService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";

function handleRemoveComponent(gameObject, material, state) {
  var materialRecord = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = GroupBasicMaterialService$Wonderjs.removeGameObject(gameObject, material, materialRecord);
  return newrecord;
}

function handleBatchRemoveComponent(materialDataMap, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* basicMaterialRecord */15] = MutableSparseMapService$WonderCommonlib.reduceiValid((function (materialRecord, gameObjectArr, material) {
          return GroupBasicMaterialService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, materialRecord);
        }), RecordBasicMaterialMainService$Wonderjs.getRecord(state), materialDataMap);
  return newrecord;
}

export {
  handleRemoveComponent ,
  handleBatchRemoveComponent ,
  
}
/* GroupBasicMaterialService-Wonderjs Not a pure module */
