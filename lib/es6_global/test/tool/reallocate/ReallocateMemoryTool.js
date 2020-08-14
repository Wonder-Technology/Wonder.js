

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as RecordGeometryMainService$Wonderjs from "../../../src/service/state/main/geometry/RecordGeometryMainService.js";
import * as ReallocateGeometryCPUMemoryService$Wonderjs from "../../../src/service/state/main/memory/ReallocateGeometryCPUMemoryService.js";
import * as ReallocateGameObjectCPUMemoryService$Wonderjs from "../../../src/service/record/main/memory/ReallocateGameObjectCPUMemoryService.js";

function reallocateGeometryMemory(state) {
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(state);
  geometryRecord[/* disposeCount */16] = 0;
  var geometryRecord$1 = ReallocateGeometryCPUMemoryService$Wonderjs.reAllocateToTheSameBuffer(geometryRecord);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */23] = geometryRecord$1;
  return newrecord;
}

function reallocateGameObjectMemory(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* gameObjectRecord */10] = ReallocateGameObjectCPUMemoryService$Wonderjs.reAllocate(state[/* gameObjectRecord */10]);
  return newrecord;
}

function reallocateAll(state) {
  return reallocateGameObjectMemory(reallocateGeometryMemory(state));
}

export {
  reallocateGeometryMemory ,
  reallocateGameObjectMemory ,
  reallocateAll ,
  
}
/* RecordGeometryMainService-Wonderjs Not a pure module */
