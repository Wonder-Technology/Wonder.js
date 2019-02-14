

import * as InitMaterialMainService$Wonderjs from "../InitMaterialMainService.js";
import * as InitInitBasicMaterialService$Wonderjs from "../../../init_shader/init_material/init_basicMaterial/material/InitInitBasicMaterialService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "./RecordBasicMaterialMainService.js";
import * as CreateInitBasicMaterialStateMainService$Wonderjs from "./CreateInitBasicMaterialStateMainService.js";

function initMaterials(materialIndexArr, gl, state) {
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  return InitMaterialMainService$Wonderjs.initMaterials(materialIndexArr, /* tuple */[
              gl,
              match[/* index */0],
              match[/* disposedIndexArray */11],
              match[/* gameObjectsMap */10]
            ], /* tuple */[
              InitInitBasicMaterialService$Wonderjs.initMaterial,
              CreateInitBasicMaterialStateMainService$Wonderjs.createInitMaterialState
            ], state);
}

function handleInitComponent(materialIndex, state) {
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var materialArrayForWorkerInit = match[/* materialArrayForWorkerInit */13];
  return InitMaterialMainService$Wonderjs.handleInitComponent(materialIndex, /* tuple */[
              match[/* index */0],
              match[/* disposedIndexArray */11],
              match[/* shaderIndices */2],
              materialArrayForWorkerInit,
              match[/* gameObjectsMap */10]
            ], /* tuple */[
              InitInitBasicMaterialService$Wonderjs.isNeedInitMaterial,
              InitInitBasicMaterialService$Wonderjs.initMaterial,
              CreateInitBasicMaterialStateMainService$Wonderjs.createInitMaterialState
            ], state);
}

function reInitComponents(materialIndices, state) {
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  return InitMaterialMainService$Wonderjs.reInitComponents(materialIndices, /* tuple */[
              match[/* shaderIndices */2],
              match[/* gameObjectsMap */10],
              match[/* index */0],
              match[/* disposedIndexArray */11]
            ], /* tuple */[
              InitInitBasicMaterialService$Wonderjs.reInitMaterial,
              CreateInitBasicMaterialStateMainService$Wonderjs.createInitMaterialState
            ], state);
}

export {
  initMaterials ,
  handleInitComponent ,
  reInitComponents ,
  
}
/* InitMaterialMainService-Wonderjs Not a pure module */
