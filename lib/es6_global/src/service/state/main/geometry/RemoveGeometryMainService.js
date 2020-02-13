

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as GroupGeometryService$Wonderjs from "../../../record/main/geometry/GroupGeometryService.js";
import * as RecordGeometryMainService$Wonderjs from "./RecordGeometryMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function handleRemoveComponent(gameObject, geometry, state) {
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */22] = GroupGeometryService$Wonderjs.removeGameObject(gameObject, geometry, geometryRecord);
  return newrecord;
}

function handleBatchRemoveComponent(geometryDataMap, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */22] = MutableSparseMapService$WonderCommonlib.reduceiValid((function (geometryRecord, gameObjectArr, geometry) {
          return GroupGeometryService$Wonderjs.batchRemoveGameObjects(gameObjectArr, geometry, geometryRecord);
        }), RecordGeometryMainService$Wonderjs.getRecord(state), geometryDataMap);
  return newrecord;
}

export {
  handleRemoveComponent ,
  handleBatchRemoveComponent ,
  
}
/* GroupGeometryService-Wonderjs Not a pure module */
