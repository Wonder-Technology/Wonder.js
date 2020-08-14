

import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as BufferTransformService$Wonderjs from "../../../record/main/transform/BufferTransformService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../primitive/buffer/DisposeTypeArrayService.js";
import * as HierachyTransformService$Wonderjs from "../../../record/main/transform/HierachyTransformService.js";
import * as RecordTransformMainService$Wonderjs from "./RecordTransformMainService.js";

function isAlive(transform, param) {
  var disposedIndexArray = param[/* disposedIndexArray */21];
  return DisposeComponentService$Wonderjs.isAlive(transform, disposedIndexArray);
}

function _disposeFromParentAndChildMap(transform, isKeepOrder, record) {
  ArrayService$WonderCommonlib.reduceOneParam((function (record, child) {
          return HierachyTransformService$Wonderjs.removeFromParentMap(child, record);
        }), record, HierachyTransformService$Wonderjs.unsafeGetChildren(transform, record));
  var match = HierachyTransformService$Wonderjs.getParent(transform, record);
  if (match !== undefined) {
    return HierachyTransformService$Wonderjs.removeFromChildMap(match, transform, isKeepOrder, record);
  } else {
    return record;
  }
}

function _disposeData(transform, param, transformRecord) {
  var localToWorldMatrices = transformRecord[/* localToWorldMatrices */2];
  var localPositions = transformRecord[/* localPositions */3];
  var localRotations = transformRecord[/* localRotations */4];
  var localScales = transformRecord[/* localScales */5];
  var parentMap = transformRecord[/* parentMap */15];
  var childMap = transformRecord[/* childMap */16];
  var gameObjectMap = transformRecord[/* gameObjectMap */17];
  var dirtyMap = transformRecord[/* dirtyMap */18];
  var transformRecord$1 = _disposeFromParentAndChildMap(transform, param[2], transformRecord);
  transformRecord$1[/* localToWorldMatrices */2] = DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferTransformService$Wonderjs.getLocalToWorldMatrixIndex(transform), BufferTransformService$Wonderjs.getLocalToWorldMatricesSize(/* () */0), transformRecord[/* defaultLocalToWorldMatrix */11], localToWorldMatrices);
  transformRecord$1[/* localPositions */3] = DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferTransformService$Wonderjs.getLocalPositionIndex(transform), BufferTransformService$Wonderjs.getLocalPositionsSize(/* () */0), transformRecord[/* defaultLocalPosition */12], localPositions);
  transformRecord$1[/* localRotations */4] = DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferTransformService$Wonderjs.getLocalRotationIndex(transform), BufferTransformService$Wonderjs.getLocalRotationsSize(/* () */0), transformRecord[/* defaultLocalRotation */13], localRotations);
  transformRecord$1[/* localScales */5] = DisposeTypeArrayService$Wonderjs.deleteAndResetFloat32TypeArr(BufferTransformService$Wonderjs.getLocalScaleIndex(transform), BufferTransformService$Wonderjs.getLocalScalesSize(/* () */0), transformRecord[/* defaultLocalScale */14], localScales);
  transformRecord$1[/* parentMap */15] = DisposeComponentService$Wonderjs.disposeSparseMapData(transform, parentMap);
  transformRecord$1[/* childMap */16] = DisposeComponentService$Wonderjs.disposeSparseMapData(transform, childMap);
  transformRecord$1[/* dirtyMap */18] = DisposeComponentService$Wonderjs.disposeSparseMapData(transform, dirtyMap);
  transformRecord$1[/* gameObjectMap */17] = DisposeComponentService$Wonderjs.disposeSparseMapData(transform, gameObjectMap);
  return transformRecord$1;
}

function handleBatchDisposeComponent(transformArray, maxTypeArrayPoolSize, isKeepOrder, state) {
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(transformArray, isAlive, RecordTransformMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var transformRecord = RecordTransformMainService$Wonderjs.getRecord(state);
  var disposedIndexArray = transformRecord[/* disposedIndexArray */21];
  transformRecord[/* disposedIndexArray */21] = disposedIndexArray.concat(transformArray);
  var transformCount = BufferSettingService$Wonderjs.getTransformCount(state[/* settingRecord */0]);
  var dataTuple = /* tuple */[
    transformCount,
    maxTypeArrayPoolSize,
    isKeepOrder
  ];
  var transformRecord$1 = ArrayService$WonderCommonlib.reduceOneParam((function (transformRecord, transform) {
          return _disposeData(transform, dataTuple, transformRecord);
        }), transformRecord, transformArray);
  state[/* transformRecord */11] = transformRecord$1;
  return state;
}

export {
  isAlive ,
  _disposeFromParentAndChildMap ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Contract-WonderLog Not a pure module */
