

import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as BufferService$Wonderjs from "../../../primitive/buffer/BufferService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as DirtyTransformService$Wonderjs from "../../../record/main/transform/DirtyTransformService.js";
import * as IndexComponentService$Wonderjs from "../../../primitive/component/IndexComponentService.js";
import * as RecordTransformMainService$Wonderjs from "./RecordTransformMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _setDefaultChildren(index, childMap) {
  return MutableSparseMapService$WonderCommonlib.set(index, ArrayService$WonderCommonlib.createEmpty(/* () */0), childMap);
}

var _isNotNeedInitData = MutableSparseMapService$WonderCommonlib.has;

function _initDataWhenCreate(index, transformRecord) {
  var childMap = transformRecord[/* childMap */16];
  var match = MutableSparseMapService$WonderCommonlib.has(index, childMap);
  if (match) {
    return transformRecord;
  } else {
    var newrecord = Caml_array.caml_array_dup(transformRecord);
    newrecord[/* childMap */16] = _setDefaultChildren(index, childMap);
    return newrecord;
  }
}

function createWithoutMarkNotDirtyWithRecord(settingRecord, transformRecord) {
  var index = transformRecord[/* index */0];
  var disposedIndexArray = transformRecord[/* disposedIndexArray */21];
  var match = IndexComponentService$Wonderjs.generateIndex(index, disposedIndexArray);
  var index$1 = match[0];
  transformRecord[/* index */0] = match[1];
  var transformRecord$1 = _initDataWhenCreate(index$1, transformRecord);
  transformRecord$1[/* disposedIndexArray */21] = match[2];
  return BufferService$Wonderjs.checkNotExceedMaxCount(BufferSettingService$Wonderjs.getTransformCount(settingRecord), /* tuple */[
              transformRecord$1,
              index$1
            ]);
}

function createWithoutMarkNotDirty(state) {
  var match = createWithoutMarkNotDirtyWithRecord(state[/* settingRecord */0], RecordTransformMainService$Wonderjs.getRecord(state));
  state[/* transformRecord */11] = match[0];
  return /* tuple */[
          state,
          match[1]
        ];
}

function create(state) {
  var match = createWithoutMarkNotDirty(state);
  var index = match[1];
  var state$1 = match[0];
  state$1[/* transformRecord */11] = DirtyTransformService$Wonderjs.mark(index, true, RecordTransformMainService$Wonderjs.getRecord(state$1));
  return /* tuple */[
          state$1,
          index
        ];
}

export {
  _setDefaultChildren ,
  _isNotNeedInitData ,
  _initDataWhenCreate ,
  createWithoutMarkNotDirtyWithRecord ,
  createWithoutMarkNotDirty ,
  create ,
  
}
/* BufferService-Wonderjs Not a pure module */
