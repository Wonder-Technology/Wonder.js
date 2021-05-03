

import * as Caml_array from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as GroupLightMaterialService$Wonderjs from "../../../../record/main/material/light/GroupLightMaterialService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";

function handleRemoveComponent(gameObject, material, state) {
  var materialRecord = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = GroupLightMaterialService$Wonderjs.removeGameObject(gameObject, material, materialRecord);
  return newrecord;
}

function handleBatchRemoveComponent(materialDataMap, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* lightMaterialRecord */16] = MutableSparseMapService$WonderCommonlib.reduceiValid((function (materialRecord, gameObjectArr, material) {
          return GroupLightMaterialService$Wonderjs.batchRemoveGameObjects(gameObjectArr, material, materialRecord);
        }), RecordLightMaterialMainService$Wonderjs.getRecord(state), materialDataMap);
  return newrecord;
}

export {
  handleRemoveComponent ,
  handleBatchRemoveComponent ,
  
}
/* GroupLightMaterialService-Wonderjs Not a pure module */
