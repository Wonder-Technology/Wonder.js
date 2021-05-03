

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "./../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MemorySettingService$Wonderjs from "../../../record/main/setting/MemorySettingService.js";
import * as StaticTransformService$Wonderjs from "../../../primitive/instance/StaticTransformService.js";
import * as DisposeComponentService$Wonderjs from "../../../primitive/component/DisposeComponentService.js";
import * as DisposeTypeArrayService$Wonderjs from "../../../primitive/buffer/DisposeTypeArrayService.js";
import * as DisposeSourceInstanceAllService$Wonderjs from "../../all/instance/DisposeSourceInstanceAllService.js";
import * as ObjectInstanceCollectionService$Wonderjs from "../../../primitive/instance/ObjectInstanceCollectionService.js";
import * as RecordSourceInstanceMainService$Wonderjs from "./RecordSourceInstanceMainService.js";
import * as GetObjectInstanceArrayMainService$Wonderjs from "./GetObjectInstanceArrayMainService.js";

function isAlive(sourceInstance, param) {
  return DisposeComponentService$Wonderjs.isAlive(sourceInstance, param[/* disposedIndexArray */8]);
}

function _disposeObjectInstanceGameObject(objectInstanceGameObjectArr, param, batchDisposeGameObjectFunc, state) {
  return Contract$WonderLog.ensureCheck((function (param) {
                var sourceInstanceNeedDisposeVboBufferArr = param[2];
                var geometryNeedDisposeVboBufferArr = param[1];
                Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("geometryNeedDisposeVboBufferArr from object instance gameObject should be empty", "is " + (String(geometryNeedDisposeVboBufferArr) + "")), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](geometryNeedDisposeVboBufferArr.length, 0);
                      }));
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("sourceInstanceNeedDisposeVboBufferArr from object instance gameObject should be empty", "is " + (String(sourceInstanceNeedDisposeVboBufferArr) + "")), (function (param) {
                              return Contract$WonderLog.Operators[/* = */0](sourceInstanceNeedDisposeVboBufferArr.length, 0);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), Curry._3(batchDisposeGameObjectFunc, objectInstanceGameObjectArr, /* tuple */[
                  param[0],
                  param[1],
                  param[2],
                  param[3]
                ], state));
}

function _disposeData(sourceInstance, param, batchDisposeGameObjectFunc, state) {
  var record = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  var objectInstanceGameObjectArr = GetObjectInstanceArrayMainService$Wonderjs.getObjectInstanceArray(sourceInstance, state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* sourceInstanceRecord */6] = /* record */[
    /* index */record[/* index */0],
    /* objectInstanceTransformIndexMap */ObjectInstanceCollectionService$Wonderjs.resetObjectInstanceTransformIndexMap(sourceInstance, record[/* objectInstanceTransformIndexMap */1]),
    /* buffer */record[/* buffer */2],
    /* isTransformStatics */DisposeTypeArrayService$Wonderjs.deleteAndResetUint8(sourceInstance, StaticTransformService$Wonderjs.getDefault(/* () */0), record[/* isTransformStatics */3]),
    /* objectInstanceTransformCollections */record[/* objectInstanceTransformCollections */4],
    /* matrixInstanceBufferCapacityMap */DisposeSourceInstanceAllService$Wonderjs.disposeMatrixInstanceBufferCapacityMap(sourceInstance, record[/* matrixInstanceBufferCapacityMap */5]),
    /* matrixFloat32ArrayMap */DisposeSourceInstanceAllService$Wonderjs.disposeMatrixFloat32ArrayMap(sourceInstance, MemorySettingService$Wonderjs.getMaxBigTypeArrayPoolSize(state[/* settingRecord */0]), record[/* matrixFloat32ArrayMap */6], state[/* typeArrayPoolRecord */38]),
    /* isSendTransformMatrixDataMap */DisposeSourceInstanceAllService$Wonderjs.disposeIsSendTransformMatrixDataMap(sourceInstance, record[/* isSendTransformMatrixDataMap */7]),
    /* disposedIndexArray */record[/* disposedIndexArray */8],
    /* gameObjectMap */DisposeComponentService$Wonderjs.disposeSparseMapData(sourceInstance, record[/* gameObjectMap */9])
  ];
  return _disposeObjectInstanceGameObject(objectInstanceGameObjectArr, /* tuple */[
                param[0],
                param[1],
                param[2],
                param[3]
              ], batchDisposeGameObjectFunc, newrecord)[0];
}

function handleBatchDisposeComponent(sourceInstanceArray, param, batchDisposeGameObjectFunc, state) {
  var isRemoveTexture = param[3];
  var isRemoveMaterial = param[2];
  var isRemoveGeometry = param[1];
  var isKeepOrder = param[0];
  Contract$WonderLog.requireCheck((function (param) {
          return DisposeComponentService$Wonderjs.checkComponentShouldAliveWithBatchDispose(sourceInstanceArray, isAlive, RecordSourceInstanceMainService$Wonderjs.getRecord(state));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var sourceInstanceRecord = RecordSourceInstanceMainService$Wonderjs.getRecord(state);
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* sourceInstanceRecord */6] = /* record */[
    /* index */sourceInstanceRecord[/* index */0],
    /* objectInstanceTransformIndexMap */sourceInstanceRecord[/* objectInstanceTransformIndexMap */1],
    /* buffer */sourceInstanceRecord[/* buffer */2],
    /* isTransformStatics */sourceInstanceRecord[/* isTransformStatics */3],
    /* objectInstanceTransformCollections */sourceInstanceRecord[/* objectInstanceTransformCollections */4],
    /* matrixInstanceBufferCapacityMap */sourceInstanceRecord[/* matrixInstanceBufferCapacityMap */5],
    /* matrixFloat32ArrayMap */sourceInstanceRecord[/* matrixFloat32ArrayMap */6],
    /* isSendTransformMatrixDataMap */sourceInstanceRecord[/* isSendTransformMatrixDataMap */7],
    /* disposedIndexArray */sourceInstanceRecord[/* disposedIndexArray */8].concat(sourceInstanceArray),
    /* gameObjectMap */sourceInstanceRecord[/* gameObjectMap */9]
  ];
  return /* tuple */[
          ArrayService$WonderCommonlib.reduceOneParam((function (state, sourceInstance) {
                  return _disposeData(sourceInstance, /* tuple */[
                              isKeepOrder,
                              isRemoveGeometry,
                              isRemoveMaterial,
                              isRemoveTexture
                            ], batchDisposeGameObjectFunc, state);
                }), newrecord, sourceInstanceArray),
          sourceInstanceArray.slice()
        ];
}

export {
  isAlive ,
  _disposeObjectInstanceGameObject ,
  _disposeData ,
  handleBatchDisposeComponent ,
  
}
/* Log-WonderLog Not a pure module */
