

import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../../state/main/data/StateDataMain.js";
import * as TypeArrayService$Wonderjs from "../buffer/TypeArrayService.js";
import * as IsDebugMainService$Wonderjs from "../../state/main/state/IsDebugMainService.js";
import * as DisposeTypeArrayService$Wonderjs from "../buffer/DisposeTypeArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as BufferSourceInstanceService$Wonderjs from "../../record/main/instance/sourceInstance/BufferSourceInstanceService.js";

var getObjectInstanceTransformIndex = SparseMapService$WonderCommonlib.unsafeGet;

function setDefaultObjectInstanceTransformIndex(sourceInstance, objectInstanceTransformIndexMap) {
  return SparseMapService$WonderCommonlib.set(sourceInstance, 0, objectInstanceTransformIndexMap);
}

function getObjectInstanceTransformCount(objectInstanceTransformIndex) {
  return objectInstanceTransformIndex;
}

function _getStartIndexAndEndIndex(sourceInstance, objectInstanceCountPerSourceInstance, objectInstanceTransformIndex, objectInstanceTransformCollections) {
  var startIndex = BufferSourceInstanceService$Wonderjs.getObjectInstanceTransformCollectionsIndex(sourceInstance, objectInstanceCountPerSourceInstance);
  return Contract$WonderLog.ensureCheck((function (param) {
                var endIndex = param[1];
                var startIndex = param[0];
                Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("endIndex should <= objectInstanceTransformCollections->length", "not"), (function () {
                        return Contract$WonderLog.Operators[/* <= */11](endIndex, objectInstanceTransformCollections.length);
                      }));
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("endIndex + 1 should >= startIndex", "not"), (function () {
                              return Contract$WonderLog.Operators[/* >= */7](endIndex + 1 | 0, startIndex);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), /* tuple */[
              startIndex,
              startIndex + (objectInstanceTransformIndex - 1 | 0) | 0
            ]);
}

function reduceObjectInstanceTransformCollection(param, initialValue, reduceFunc) {
  var objectInstanceTransformCollections = param[3];
  var result = initialValue;
  var match = _getStartIndexAndEndIndex(param[0], param[1], param[2], objectInstanceTransformCollections);
  for(var i = match[0] ,i_finish = match[1]; i <= i_finish; ++i){
    result = reduceFunc(result, TypeArrayService$Wonderjs.getUint32_1(i, objectInstanceTransformCollections));
  }
  return result;
}

function getObjectInstanceTransformArray(sourceInstance, objectInstanceCountPerSourceInstance, objectInstanceTransformIndexMap, objectInstanceTransformCollections) {
  var objectInstanceTransformIndex = SparseMapService$WonderCommonlib.unsafeGet(sourceInstance, objectInstanceTransformIndexMap);
  return reduceObjectInstanceTransformCollection(/* tuple */[
              sourceInstance,
              objectInstanceCountPerSourceInstance,
              objectInstanceTransformIndex,
              objectInstanceTransformCollections
            ], /* array */[], (function (objectInstanceTransformArray, objectInstanceTransform) {
                return ArrayService$Wonderjs.push(objectInstanceTransform, objectInstanceTransformArray);
              }));
}

function addObjectInstanceTransform(sourceInstance, objectInstanceTransform, objectInstanceCountPerSourceInstance, param) {
  var objectInstanceTransformIndexMap = param[0];
  var objectInstanceTransformIndex = SparseMapService$WonderCommonlib.unsafeGet(sourceInstance, objectInstanceTransformIndexMap);
  return Contract$WonderLog.ensureCheck((function (param) {
                var objectInstanceTransformIndex = SparseMapService$WonderCommonlib.unsafeGet(sourceInstance, param[0]);
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("objectInstanceTransformIndex should <= objectInstanceCountPerSourceInstance:" + (String(objectInstanceCountPerSourceInstance) + ""), "is " + (String(objectInstanceTransformIndex) + "")), (function () {
                              return Contract$WonderLog.Operators[/* <= */11](objectInstanceTransformIndex, objectInstanceCountPerSourceInstance);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), /* tuple */[
              SparseMapService$WonderCommonlib.set(sourceInstance, objectInstanceTransformIndex + 1 | 0, objectInstanceTransformIndexMap),
              TypeArrayService$Wonderjs.setUint32_1(BufferSourceInstanceService$Wonderjs.getObjectInstanceTransformIndex(sourceInstance, objectInstanceTransformIndex, objectInstanceCountPerSourceInstance), objectInstanceTransform, param[1])
            ]);
}

function resetObjectInstanceTransformIndexMap(sourceInstance, objectInstanceTransformIndexMap) {
  return SparseMapService$WonderCommonlib.set(sourceInstance, 0, objectInstanceTransformIndexMap);
}

function batchRemoveObjectInstanceTransform(sourceInstance, objectInstanceTransformArray, objectInstanceCountPerSourceInstance, param) {
  var objectInstanceTransformCollections = param[1];
  var objectInstanceTransformIndexMap = param[0];
  var objectInstanceTransformIndex = SparseMapService$WonderCommonlib.unsafeGet(sourceInstance, objectInstanceTransformIndexMap);
  return Contract$WonderLog.ensureCheck((function (param) {
                var objectInstanceTransformIndex = SparseMapService$WonderCommonlib.unsafeGet(sourceInstance, param[0]);
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("objectInstanceTransformIndex should >= 0", "is " + (String(objectInstanceTransformIndex) + "")), (function () {
                              return Contract$WonderLog.Operators[/* >= */7](objectInstanceTransformIndex, 0);
                            }));
              }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData), objectInstanceTransformIndex !== 0 ? /* tuple */[
                SparseMapService$WonderCommonlib.set(sourceInstance, objectInstanceTransformIndex - objectInstanceTransformArray.length | 0, objectInstanceTransformIndexMap),
                objectInstanceTransformArray.reduce((function (objectInstanceTransformCollections, objectInstanceTransform, i) {
                        return DisposeTypeArrayService$Wonderjs.deleteSingleValueBySwapUint32TypeArr(objectInstanceTransformCollections.indexOf(objectInstanceTransform), BufferSourceInstanceService$Wonderjs.getObjectInstanceTransformIndex(sourceInstance, objectInstanceTransformIndex - i | 0, objectInstanceCountPerSourceInstance), objectInstanceTransformCollections);
                      }), objectInstanceTransformCollections)
              ] : /* tuple */[
                objectInstanceTransformIndexMap,
                objectInstanceTransformCollections
              ]);
}

export {
  getObjectInstanceTransformIndex ,
  setDefaultObjectInstanceTransformIndex ,
  getObjectInstanceTransformCount ,
  _getStartIndexAndEndIndex ,
  reduceObjectInstanceTransformCollection ,
  getObjectInstanceTransformArray ,
  addObjectInstanceTransform ,
  resetObjectInstanceTransformIndexMap ,
  batchRemoveObjectInstanceTransform ,
  
}
/* Log-WonderLog Not a pure module */
