

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as OptionService$Wonderjs from "../../../atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as CopyTypeArrayService$Wonderjs from "../../../primitive/copy/CopyTypeArrayService.js";
import * as BufferTransformService$Wonderjs from "../../../record/main/transform/BufferTransformService.js";
import * as WorkerDetectMainService$Wonderjs from "../workerDetect/WorkerDetectMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as CreateTypeArrayTransformService$Wonderjs from "../../../record/all/transform/CreateTypeArrayTransformService.js";
import * as OperateTypeArrayTransformService$Wonderjs from "../../../record/main/transform/OperateTypeArrayTransformService.js";

function getRecord(param) {
  return OptionService$Wonderjs.unsafeGet(param[/* transformRecord */11]);
}

function setAllTypeArrDataToDefault(count, param, param$1) {
  var defaultLocalScale = param[3];
  var defaultLocalRotation = param[2];
  var defaultLocalPosition = param[1];
  var defaultLocalToWorldMatrix = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, index) {
                return /* tuple */[
                        OperateTypeArrayTransformService$Wonderjs.setLocalToWorldMatrix(index, defaultLocalToWorldMatrix, param[0]),
                        OperateTypeArrayTransformService$Wonderjs.setLocalPosition(index, defaultLocalPosition, param[1]),
                        OperateTypeArrayTransformService$Wonderjs.setLocalRotation(index, defaultLocalRotation, param[2]),
                        OperateTypeArrayTransformService$Wonderjs.setLocalScale(index, defaultLocalScale, param[3])
                      ];
              }), /* tuple */[
              param$1[0],
              param$1[1],
              param$1[2],
              param$1[3]
            ], ArrayService$WonderCommonlib.range(0, count - 1 | 0));
}

function _setAllTypeArrDataToDefault(count, defaultDataTuple, param) {
  return /* tuple */[
          param[0],
          setAllTypeArrDataToDefault(count, defaultDataTuple, /* tuple */[
                param[1],
                param[2],
                param[3],
                param[4]
              ])
        ];
}

function _initBufferData(count, defaultDataTuple) {
  var buffer = BufferTransformService$Wonderjs.createBuffer(count);
  var match = CreateTypeArrayTransformService$Wonderjs.createTypeArrays(buffer, count);
  return _setAllTypeArrDataToDefault(count, defaultDataTuple, /* tuple */[
              buffer,
              match[0],
              match[1],
              match[2],
              match[3]
            ]);
}

function _createForWorker(transformCount, defaultDataTuple, param, state) {
  var match = _initBufferData(transformCount, defaultDataTuple);
  var match$1 = match[1];
  state[/* transformRecord */11] = /* record */[
    /* index */0,
    /* buffer */param[0],
    /* localToWorldMatrices */param[1],
    /* localPositions */param[2],
    /* localRotations */param[3],
    /* localScales */param[4],
    /* copiedBuffer */Caml_option.some(match[0]),
    /* copiedLocalToWorldMatrices */Caml_option.some(match$1[0]),
    /* copiedLocalPositions */Caml_option.some(match$1[1]),
    /* copiedLocalRotations */Caml_option.some(match$1[2]),
    /* copiedLocalScales */Caml_option.some(match$1[3]),
    /* defaultLocalToWorldMatrix */defaultDataTuple[0],
    /* defaultLocalPosition */defaultDataTuple[1],
    /* defaultLocalRotation */defaultDataTuple[2],
    /* defaultLocalScale */defaultDataTuple[3],
    /* parentMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* childMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* dirtyMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* localToWorldMatrixCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* normalMatrixCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return state;
}

function _createForNoWorker(param, param$1, state) {
  state[/* transformRecord */11] = /* record */[
    /* index */0,
    /* buffer */param$1[0],
    /* localToWorldMatrices */param$1[1],
    /* localPositions */param$1[2],
    /* localRotations */param$1[3],
    /* localScales */param$1[4],
    /* copiedBuffer */undefined,
    /* copiedLocalToWorldMatrices */undefined,
    /* copiedLocalPositions */undefined,
    /* copiedLocalRotations */undefined,
    /* copiedLocalScales */undefined,
    /* defaultLocalToWorldMatrix */param[0],
    /* defaultLocalPosition */param[1],
    /* defaultLocalRotation */param[2],
    /* defaultLocalScale */param[3],
    /* parentMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* childMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* gameObjectMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* dirtyMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* localToWorldMatrixCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* normalMatrixCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */ArrayService$WonderCommonlib.createEmpty(/* () */0)
  ];
  return state;
}

function create(state) {
  var transformCount = BufferSettingService$Wonderjs.getTransformCount(state[/* settingRecord */0]);
  var defaultLocalToWorldMatrix = /* array */[
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ];
  var defaultLocalPosition = /* array */[
    0,
    0,
    0
  ];
  var defaultLocalRotation = /* array */[
    0,
    0,
    0,
    1
  ];
  var defaultLocalScale = /* array */[
    1,
    1,
    1
  ];
  var defaultDataTuple = /* tuple */[
    defaultLocalToWorldMatrix,
    defaultLocalPosition,
    defaultLocalRotation,
    defaultLocalScale
  ];
  var match = _initBufferData(transformCount, defaultDataTuple);
  var match$1 = match[1];
  var localScales = match$1[3];
  var localRotations = match$1[2];
  var localPositions = match$1[1];
  var localToWorldMatrices = match$1[0];
  var buffer = match[0];
  var match$2 = WorkerDetectMainService$Wonderjs.isUseWorker(state);
  if (match$2) {
    return _createForWorker(transformCount, defaultDataTuple, /* tuple */[
                buffer,
                localToWorldMatrices,
                localPositions,
                localRotations,
                localScales
              ], state);
  } else {
    return _createForNoWorker(defaultDataTuple, /* tuple */[
                buffer,
                localToWorldMatrices,
                localPositions,
                localRotations,
                localScales
              ], state);
  }
}

function deepCopyForRestore(state) {
  var record = getRecord(state);
  var index = record[/* index */0];
  var localToWorldMatrices = record[/* localToWorldMatrices */2];
  var localPositions = record[/* localPositions */3];
  var localRotations = record[/* localRotations */4];
  var localScales = record[/* localScales */5];
  var parentMap = record[/* parentMap */15];
  var childMap = record[/* childMap */16];
  var gameObjectMap = record[/* gameObjectMap */17];
  var dirtyMap = record[/* dirtyMap */18];
  var disposedIndexArray = record[/* disposedIndexArray */21];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* transformRecord */11] = /* record */[
    /* index */record[/* index */0],
    /* buffer */record[/* buffer */1],
    /* localToWorldMatrices */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferTransformService$Wonderjs.getLocalToWorldMatricesSize(/* () */0)), localToWorldMatrices),
    /* localPositions */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferTransformService$Wonderjs.getLocalPositionsSize(/* () */0)), localPositions),
    /* localRotations */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferTransformService$Wonderjs.getLocalRotationsSize(/* () */0)), localRotations),
    /* localScales */CopyTypeArrayService$Wonderjs.copyFloat32ArrayWithEndIndex(Caml_int32.imul(index, BufferTransformService$Wonderjs.getLocalScalesSize(/* () */0)), localScales),
    /* copiedBuffer */record[/* copiedBuffer */6],
    /* copiedLocalToWorldMatrices */record[/* copiedLocalToWorldMatrices */7],
    /* copiedLocalPositions */record[/* copiedLocalPositions */8],
    /* copiedLocalRotations */record[/* copiedLocalRotations */9],
    /* copiedLocalScales */record[/* copiedLocalScales */10],
    /* defaultLocalToWorldMatrix */record[/* defaultLocalToWorldMatrix */11],
    /* defaultLocalPosition */record[/* defaultLocalPosition */12],
    /* defaultLocalRotation */record[/* defaultLocalRotation */13],
    /* defaultLocalScale */record[/* defaultLocalScale */14],
    /* parentMap */MutableSparseMapService$WonderCommonlib.copy(parentMap),
    /* childMap */CopyTypeArrayService$Wonderjs.deepCopyMutableSparseMapOfArray(childMap),
    /* gameObjectMap */MutableSparseMapService$WonderCommonlib.copy(gameObjectMap),
    /* dirtyMap */MutableSparseMapService$WonderCommonlib.copy(dirtyMap),
    /* localToWorldMatrixCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* normalMatrixCacheMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
    /* disposedIndexArray */disposedIndexArray.slice()
  ];
  return newrecord;
}

export {
  getRecord ,
  setAllTypeArrDataToDefault ,
  _setAllTypeArrDataToDefault ,
  _initBufferData ,
  _createForWorker ,
  _createForNoWorker ,
  create ,
  deepCopyForRestore ,
  
}
/* OptionService-Wonderjs Not a pure module */
