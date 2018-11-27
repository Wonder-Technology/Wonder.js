

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GroupGeometryService$Wonderjs from "../../../record/main/geometry/GroupGeometryService.js";
import * as RecordGeometryMainService$Wonderjs from "./RecordGeometryMainService.js";

var _handleRemoveComponent = GroupGeometryService$Wonderjs.removeGameObject;

function handleRemoveComponent(gameObject, geometry, state) {
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */22] = GroupGeometryService$Wonderjs.removeGameObject(gameObject, geometry, geometryRecord);
  return newrecord;
}

function handleBatchRemoveComponent(geometryDataArray, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */22] = ArrayService$WonderCommonlib.reduceOneParam((function (geometryRecord, param) {
          return GroupGeometryService$Wonderjs.removeGameObject(param[0], param[1], geometryRecord);
        }), RecordGeometryMainService$Wonderjs.getRecord(state), geometryDataArray);
  return newrecord;
}

export {
  _handleRemoveComponent ,
  handleRemoveComponent ,
  handleBatchRemoveComponent ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
