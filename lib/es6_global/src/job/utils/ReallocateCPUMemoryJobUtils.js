

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as QueryCPUMemoryService$Wonderjs from "../../service/record/main/memory/QueryCPUMemoryService.js";
import * as RecordGeometryMainService$Wonderjs from "../../service/state/main/geometry/RecordGeometryMainService.js";
import * as ReallocateGeometryCPUMemoryService$Wonderjs from "../../service/state/main/memory/ReallocateGeometryCPUMemoryService.js";
import * as ReallocateGameObjectCPUMemoryService$Wonderjs from "../../service/record/main/memory/ReallocateGameObjectCPUMemoryService.js";

function reallocateGameObjectByDisposeCount(state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  if (QueryCPUMemoryService$Wonderjs.isDisposeTooMany(gameObjectRecord[/* disposeCount */3], state[/* settingRecord */0])) {
    gameObjectRecord[/* disposeCount */3] = 0;
    var newrecord = Caml_array.caml_array_dup(state);
    newrecord[/* gameObjectRecord */10] = ReallocateGameObjectCPUMemoryService$Wonderjs.reAllocate(state[/* gameObjectRecord */10]);
    return newrecord;
  } else {
    return state;
  }
}

function _reallocateGeometry(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  newrecord[/* geometryRecord */22] = QueryCPUMemoryService$Wonderjs.isDisposeTooMany(geometryRecord[/* disposeCount */16], state[/* settingRecord */0]) || QueryCPUMemoryService$Wonderjs.isGeometryBufferNearlyFull(0.9, geometryRecord) ? (geometryRecord[/* disposeCount */16] = 0, ReallocateGeometryCPUMemoryService$Wonderjs.reAllocateToTheSameBuffer(geometryRecord)) : geometryRecord;
  return newrecord;
}

function execJob(state) {
  return _reallocateGeometry(reallocateGameObjectByDisposeCount(state));
}

export {
  reallocateGameObjectByDisposeCount ,
  _reallocateGeometry ,
  execJob ,
  
}
/* QueryCPUMemoryService-Wonderjs Not a pure module */
