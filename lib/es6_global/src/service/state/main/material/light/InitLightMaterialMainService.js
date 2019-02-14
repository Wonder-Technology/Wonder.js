

import * as InitMaterialMainService$Wonderjs from "../InitMaterialMainService.js";
import * as InitInitLightMaterialService$Wonderjs from "../../../init_shader/init_material/init_lightMaterial/material/InitInitLightMaterialService.js";
import * as RecordLightMaterialMainService$Wonderjs from "./RecordLightMaterialMainService.js";
import * as CreateInitLightMaterialStateMainService$Wonderjs from "./CreateInitLightMaterialStateMainService.js";

function initMaterials(materialIndexArr, gl, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return InitMaterialMainService$Wonderjs.initMaterials(materialIndexArr, /* tuple */[
              gl,
              match[/* index */0],
              match[/* disposedIndexArray */14],
              match[/* gameObjectsMap */13]
            ], /* tuple */[
              InitInitLightMaterialService$Wonderjs.initMaterial,
              CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState
            ], state);
}

function handleInitComponent(materialIndex, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var materialArrayForWorkerInit = match[/* materialArrayForWorkerInit */16];
  return InitMaterialMainService$Wonderjs.handleInitComponent(materialIndex, /* tuple */[
              match[/* index */0],
              match[/* disposedIndexArray */14],
              match[/* shaderIndices */2],
              materialArrayForWorkerInit,
              match[/* gameObjectsMap */13]
            ], /* tuple */[
              InitInitLightMaterialService$Wonderjs.isNeedInitMaterial,
              InitInitLightMaterialService$Wonderjs.initMaterial,
              CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState
            ], state);
}

function reInitComponents(materialIndices, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return InitMaterialMainService$Wonderjs.reInitComponents(materialIndices, /* tuple */[
              match[/* shaderIndices */2],
              match[/* gameObjectsMap */13],
              match[/* index */0],
              match[/* disposedIndexArray */14]
            ], /* tuple */[
              InitInitLightMaterialService$Wonderjs.reInitMaterial,
              CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState
            ], state);
}

export {
  initMaterials ,
  handleInitComponent ,
  reInitComponents ,
  
}
/* InitMaterialMainService-Wonderjs Not a pure module */
