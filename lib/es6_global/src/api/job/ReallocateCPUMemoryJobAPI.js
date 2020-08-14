

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as BufferSettingService$Wonderjs from "../../service/record/main/setting/BufferSettingService.js";
import * as QueryCPUMemoryService$Wonderjs from "../../service/record/main/memory/QueryCPUMemoryService.js";
import * as RecordGeometryMainService$Wonderjs from "../../service/state/main/geometry/RecordGeometryMainService.js";
import * as ReallocateCPUMemoryJobUtils$Wonderjs from "../../job/utils/ReallocateCPUMemoryJobUtils.js";
import * as ReallocateGeometryCPUMemoryService$Wonderjs from "../../service/state/main/memory/ReallocateGeometryCPUMemoryService.js";

function isDisposeTooMany(state) {
  return QueryCPUMemoryService$Wonderjs.isDisposeTooMany(RecordGeometryMainService$Wonderjs.getRecord(state)[/* disposeCount */16], state[/* settingRecord */0]);
}

function isGeometryBufferNearlyFull(percent, state) {
  return QueryCPUMemoryService$Wonderjs.isGeometryBufferNearlyFull(percent, RecordGeometryMainService$Wonderjs.getRecord(state));
}

function reAllocateToBuffer(newBufferData, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* geometryRecord */22] = ReallocateGeometryCPUMemoryService$Wonderjs.reAllocateToBuffer(newBufferData, RecordGeometryMainService$Wonderjs.getRecord(state));
  return newrecord;
}

function initGeometryBufferData(param) {
  var settingRecord = param[/* settingRecord */0];
  var geometryPointCount = BufferSettingService$Wonderjs.getGeometryPointCount(settingRecord);
  var geometryCount = BufferSettingService$Wonderjs.getGeometryCount(settingRecord);
  return RecordGeometryMainService$Wonderjs._initBufferData(geometryPointCount, geometryCount);
}

var reallocateGeometry = ReallocateCPUMemoryJobUtils$Wonderjs.reallocateGeometry;

function resetDisposeCount(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var newrecord$1 = Caml_array.caml_array_dup(RecordGeometryMainService$Wonderjs.getRecord(state));
  newrecord[/* geometryRecord */22] = (newrecord$1[/* disposeCount */16] = 0, newrecord$1);
  return newrecord;
}

var reallocateGameObjectByDisposeCount = ReallocateCPUMemoryJobUtils$Wonderjs.reallocateGameObjectByDisposeCount;

export {
  reallocateGameObjectByDisposeCount ,
  isDisposeTooMany ,
  isGeometryBufferNearlyFull ,
  reAllocateToBuffer ,
  initGeometryBufferData ,
  reallocateGeometry ,
  resetDisposeCount ,
  
}
/* BufferSettingService-Wonderjs Not a pure module */
