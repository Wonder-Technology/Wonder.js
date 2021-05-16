

import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$Wonderjs from "../../../atom/ArrayService.js";
import * as StateDataMain$Wonderjs from "../data/StateDataMain.js";
import * as IsDebugMainService$Wonderjs from "../state/IsDebugMainService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectsMapService$Wonderjs from "../../../primitive/GameObjectsMapService.js";
import * as OperateSettingService$Wonderjs from "../../../record/main/setting/OperateSettingService.js";
import * as JudgeAllInstanceService$Wonderjs from "../../../record/all/instance/JudgeAllInstanceService.js";
import * as HasComponentGameObjectService$Wonderjs from "../../../record/main/gameObject/HasComponentGameObjectService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function isSupportInstance(state) {
  return JudgeAllInstanceService$Wonderjs.isSupportInstance(OperateSettingService$Wonderjs.unsafeGetGPU(state[/* settingRecord */0])[/* useHardwareInstance */0], state[/* gpuDetectRecord */5]);
}

function isSourceInstance(materialIndex, gameObjectsMap, gameObjectRecord) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("all gameObjects are or are not sourceInstance", "some are, the others are not"), (function (param) {
                        var gameObjects = GameObjectsMapService$Wonderjs.getGameObjects(materialIndex, gameObjectsMap);
                        if (gameObjects !== undefined) {
                          var gameObjects$1 = gameObjects;
                          var gameObjectsLen = gameObjects$1.length;
                          var isSourceInstanceLen = gameObjects$1.filter((function (gameObject) {
                                  return HasComponentGameObjectService$Wonderjs.hasSourceInstanceComponent(gameObject, gameObjectRecord);
                                })).length;
                          return Contract$WonderLog.assertTrue(isSourceInstanceLen === gameObjectsLen || isSourceInstanceLen === 0);
                        } else {
                          return Contract$WonderLog.assertPass(/* () */0);
                        }
                      }));
        }), IsDebugMainService$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData));
  var match = GameObjectsMapService$Wonderjs.getGameObjects(materialIndex, gameObjectsMap);
  if (match !== undefined) {
    return HasComponentGameObjectService$Wonderjs.hasSourceInstanceComponent(ArrayService$Wonderjs.unsafeGetFirst(match), gameObjectRecord);
  } else {
    return false;
  }
}

function buildMap(index, gameObjectsMap, gameObjectRecord) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (map, materialIndex) {
                return MutableSparseMapService$WonderCommonlib.set(materialIndex, isSourceInstance(materialIndex, gameObjectsMap, gameObjectRecord), map);
              }), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), ArrayService$Wonderjs.range(0, index - 1 | 0));
}

export {
  isSupportInstance ,
  isSourceInstance ,
  buildMap ,
  
}
/* Log-WonderLog Not a pure module */
