

import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as DeviceManagerService$Wonderjs from "../../../../record/all/device/DeviceManagerService.js";
import * as WorkerDetectMainService$Wonderjs from "../../workerDetect/WorkerDetectMainService.js";
import * as JudgeInstanceMainService$Wonderjs from "../../instance/JudgeInstanceMainService.js";
import * as InitInitLightMaterialService$Wonderjs from "../../../init_material/init_lightMaterial/material/InitInitLightMaterialService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";
import * as MaterialArrayForWorkerInitService$Wonderjs from "../../../../primitive/material/MaterialArrayForWorkerInitService.js";
import * as CreateInitLightMaterialStateMainService$Wonderjs from "./CreateInitLightMaterialStateMainService.js";

function initMaterials(materialIndexArr, gl, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var gameObjectMap = RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectMap */13];
  var isSupportInstance = JudgeInstanceMainService$Wonderjs.isSupportInstance(state);
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  ArrayService$WonderCommonlib.reduceOneParam((function (state, materialIndex) {
          return InitInitLightMaterialService$Wonderjs.initMaterial(gl, /* tuple */[
                      materialIndex,
                      JudgeInstanceMainService$Wonderjs.isSourceInstance(materialIndex, gameObjectMap, gameObjectRecord),
                      isSupportInstance
                    ], state);
        }), CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
            match[/* index */0],
            match[/* disposedIndexArray */15]
          ], state), materialIndexArr);
  return state;
}

function handleInitComponent(materialIndex, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var match$1 = InitInitLightMaterialService$Wonderjs.isNeedInitMaterial(materialIndex, match[/* shaderIndices */2]);
  if (match$1) {
    var match$2 = WorkerDetectMainService$Wonderjs.isUseWorker(state);
    if (match$2) {
      var match$3 = RecordLightMaterialMainService$Wonderjs.getRecord(state);
      var materialArrayForWorkerInit = match$3[/* materialArrayForWorkerInit */17];
      MaterialArrayForWorkerInitService$Wonderjs.addMaterialToMaterialArrayForWorkerInit(materialIndex, materialArrayForWorkerInit);
      return state;
    } else {
      var gl = DeviceManagerService$Wonderjs.unsafeGetGl(state[/* deviceManagerRecord */9]);
      var gameObjectMap = RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectMap */13];
      var isSupportInstance = JudgeInstanceMainService$Wonderjs.isSupportInstance(state);
      var match$4 = RecordLightMaterialMainService$Wonderjs.getRecord(state);
      InitInitLightMaterialService$Wonderjs.initMaterial(gl, /* tuple */[
            materialIndex,
            JudgeInstanceMainService$Wonderjs.isSourceInstance(materialIndex, gameObjectMap, gameObjectRecord),
            isSupportInstance
          ], CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
                match$4[/* index */0],
                match$4[/* disposedIndexArray */15]
              ], state));
      return state;
    }
  } else {
    return state;
  }
}

export {
  initMaterials ,
  handleInitComponent ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
