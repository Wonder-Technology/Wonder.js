'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var RecordGeometryMainService$Wonderjs = require("../../../src/service/state/main/geometry/RecordGeometryMainService.js");
var ReallocateGeometryCPUMemoryService$Wonderjs = require("../../../src/service/state/main/memory/ReallocateGeometryCPUMemoryService.js");
var ReallocateGameObjectCPUMemoryService$Wonderjs = require("../../../src/service/record/main/memory/ReallocateGameObjectCPUMemoryService.js");

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

exports.reallocateGeometryMemory = reallocateGeometryMemory;
exports.reallocateGameObjectMemory = reallocateGameObjectMemory;
exports.reallocateAll = reallocateAll;
/* RecordGeometryMainService-Wonderjs Not a pure module */
