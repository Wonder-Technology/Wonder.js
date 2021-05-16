

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as BufferSettingService$Wonderjs from "../../../record/main/setting/BufferSettingService.js";
import * as ReduceStateMainService$Wonderjs from "../array/ReduceStateMainService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as GetComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/GetComponentGameObjectService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as GameObjectObjectInstanceService$Wonderjs from "../../../record/main/instance/objectInstance/GameObjectObjectInstanceService.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../primitive/instance/ObjectInstanceCollectionService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "./RecordSourceInstanceMainService.js";

function isAlive(objectInstance, objectInstanceRecord) {
  return DisposeComponentService$Wonderjs.isAlive(objectInstance, objectInstanceRecord[/* disposedIndexArray */2]);
}

function _unsafeGetSourceInstance(objectInstance, param) {
  return Contract$WonderLog.ensureCheck((function (sourceInstance) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("souceInstance exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(sourceInstance);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), MutableSparseMapService$WonderCommonlib.unsafeGet(objectInstance, param[/* sourceInstanceMap */1]));
}

function _disposeData(objectInstance, state) {
  var objectInstanceRecord = state[/* objectInstanceRecord */7];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* objectInstanceRecord */7] = /* record */[
    /* index */objectInstanceRecord[/* index */0],
    /* sourceInstanceMap */DisposeComponentService$Wonderjs.disposeSparseMapData(objectInstance, objectInstanceRecord[/* sourceInstanceMap */1]),
    /* disposedIndexArray */objectInstanceRecord[/* disposedIndexArray */2],
    /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(objectInstance, objectInstanceRecord[/* gameObjectMap */3])
  ];
  return newrecord;
}

function _batchDisposeObjectInstance(sourceInstance, objectInstanceTransformArray, state) {
  var match = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  var objectInstanceCountPerSourceInstance = BufferSettingService$Wonderjs.getObjectInstanceCountPerSourceInstance(state[/* settingRecord */0]);
  ObjectInstanceCollectionService$Wonderjs.batchRemoveObjectInstanceTransform(sourceInstance, objectInstanceTransformArray, objectInstanceCountPerSourceInstance, /* tuple */[
        match[/* objectInstanceTransformIndexMap */1],
        match[/* objectInstanceTransformCollections */4]
      ]);
  return state;
}

function handleBatchDisposeComponent(objectInstanceArray, state) {
  var objectInstanceRecord = state[/* objectInstanceRecord */7];
  var gameObjectRecord = state[/* gameObjectRecord */10];
  Contract$WonderLog.requireCheck((function (param) {
          var objectInstanceLen = objectInstanceArray.length;
          DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(objectInstanceArray, isAlive, objectInstanceRecord);
          Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("objectInstanceArray has one objectInstance at least", "" + (String(objectInstanceLen) + "")), (function (param) {
                  return Contract$WonderLog.Operators[/* > */5](objectInstanceLen, 0);
                }));
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("all objectInstance belong to the same sourceInstance", "not"), (function (param) {
                        var sourceInstance = _unsafeGetSourceInstance(objectInstanceArray[0], objectInstanceRecord);
                        return ArrayService$WonderCommonlib.forEach((function (objectInstance) {
                                      return Contract$WonderLog.Operators[/* = */0](_unsafeGetSourceInstance(objectInstance, objectInstanceRecord), sourceInstance);
                                    }), objectInstanceArray);
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var objectInstanceRecord_000 = /* index */objectInstanceRecord[/* index */0];
  var objectInstanceRecord_001 = /* sourceInstanceMap */objectInstanceRecord[/* sourceInstanceMap */1];
  var objectInstanceRecord_002 = /* disposedIndexArray */objectInstanceRecord[/* disposedIndexArray */2].concat(objectInstanceArray);
  var objectInstanceRecord_003 = /* gameObjectMap */objectInstanceRecord[/* gameObjectMap */3];
  var objectInstanceRecord$1 = /* record */[
    objectInstanceRecord_000,
    objectInstanceRecord_001,
    objectInstanceRecord_002,
    objectInstanceRecord_003
  ];
  var objectInstanceTransformArray = objectInstanceArray.map((function (objectInstance) {
          return GetComponentGameObjectService$Wonderjs.unsafeGetTransformComponent(GameObjectObjectInstanceService$Wonderjs.unsafeGetGameObject(objectInstance, objectInstanceRecord$1), gameObjectRecord);
        }));
  var sourceInstance = _unsafeGetSourceInstance(objectInstanceArray[0], objectInstanceRecord$1);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* objectInstanceRecord */7] = objectInstanceRecord$1;
  var state$1 = _batchDisposeObjectInstance(sourceInstance, objectInstanceTransformArray, newrecord);
  return ReduceStateMainService$Wonderjs.reduceState((function (state, objectInstance) {
                return _disposeData(objectInstance, state);
              }), state$1, objectInstanceArray);
}

export {
  isAlive ,
  _unsafeGetSourceInstance ,
  _disposeData ,
  _batchDisposeObjectInstance ,
  handleBatchDisposeComponent ,
  
}
/* Log-WonderLog Not a pure module */
