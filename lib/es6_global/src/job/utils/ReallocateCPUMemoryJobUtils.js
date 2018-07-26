

import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as QueryCPUMemoryService$Wonderjs from "../../service/record/main/memory/QueryCPUMemoryService.js";
import * as RecordCustomGeometryMainService$Wonderjs from "../../service/state/main/geometry/custom/RecordCustomGeometryMainService.js";
import * as ReallocateGameObjectCPUMemoryService$Wonderjs from "../../service/record/main/memory/ReallocateGameObjectCPUMemoryService.js";
import * as ReallocateCustomGeometryCPUMemoryService$Wonderjs from "../../service/state/main/memory/ReallocateCustomGeometryCPUMemoryService.js";

function _reallocateGameObjectByDisposeCount(state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  if (QueryCPUMemoryService$Wonderjs.isDisposeTooMany(gameObjectRecord[/* disposeCount */2], state[/* settingRecord */0])) {
    gameObjectRecord[/* disposeCount */2] = 0;
    var newrecord = Caml_array.caml_array_dup(state);
    newrecord[/* gameObjectRecord */10] = ReallocateGameObjectCPUMemoryService$Wonderjs.reAllocate(state[/* gameObjectRecord */10]);
    return newrecord;
  } else {
    return state;
  }
}

function _reallocateCustomGeometryByDisposeCount(state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var customGeometryRecord = RecordCustomGeometryMainService$Wonderjs.getRecord(state);
  newrecord[/* customGeometryRecord */23] = QueryCPUMemoryService$Wonderjs.isDisposeTooMany(customGeometryRecord[/* disposeCount */14], state[/* settingRecord */0]) ? (customGeometryRecord[/* disposeCount */14] = 0, ReallocateCustomGeometryCPUMemoryService$Wonderjs.reAllocate(customGeometryRecord)) : customGeometryRecord;
  return newrecord;
}

function execJob(state) {
  return _reallocateCustomGeometryByDisposeCount(_reallocateGameObjectByDisposeCount(state));
}

export {
  _reallocateGameObjectByDisposeCount ,
  _reallocateCustomGeometryByDisposeCount ,
  execJob ,
  
}
/* QueryCPUMemoryService-Wonderjs Not a pure module */
