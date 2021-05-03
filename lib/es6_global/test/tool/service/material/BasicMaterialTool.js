

import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as GameObjectTool$Wonderjs from "../gameObject/GameObjectTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../src/api/material/BasicMaterialAPI.js";
import * as ShaderIndicesService$Wonderjs from "../../../../src/service/primitive/material/ShaderIndicesService.js";
import * as JudgeInstanceMainService$Wonderjs from "../../../../src/service/state/main/instance/JudgeInstanceMainService.js";
import * as DefaultTypeArrayValueService$Wonderjs from "../../../../src/service/primitive/buffer/DefaultTypeArrayValueService.js";
import * as InitBasicMaterialMainService$Wonderjs from "../../../../src/service/state/main/material/basic/InitBasicMaterialMainService.js";
import * as InitInitBasicMaterialService$Wonderjs from "../../../../src/service/state/init_shader/init_material/init_basicMaterial/material/InitInitBasicMaterialService.js";
import * as BufferAllBasicMaterialService$Wonderjs from "../../../../src/service/record/all/material/basic/BufferAllBasicMaterialService.js";
import * as GameObjectBasicMaterialService$Wonderjs from "../../../../src/service/record/main/material/basic/GameObjectBasicMaterialService.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../../../../src/service/state/main/material/basic/RecordBasicMaterialMainService.js";
import * as ShaderIndexBasicMaterialMainService$Wonderjs from "../../../../src/service/state/main/material/basic/ShaderIndexBasicMaterialMainService.js";
import * as CreateInitBasicMaterialStateMainService$Wonderjs from "../../../../src/service/state/main/material/basic/CreateInitBasicMaterialStateMainService.js";

var getRecord = RecordBasicMaterialMainService$Wonderjs.getRecord;

function createGameObject(state) {
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          material
        ];
}

function createGameObjectWithMaterial(material, state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match[0]);
  return /* tuple */[
          state$1,
          gameObject,
          material
        ];
}

function getDefaultShaderIndex(state) {
  return DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
}

function getDefaultColor(state) {
  return RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* defaultColor */6];
}

function initMaterials(gl, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var index = match[/* index */0];
  InitInitBasicMaterialService$Wonderjs.init(gl, /* tuple */[
        JudgeInstanceMainService$Wonderjs.buildMap(index, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectsMap */7], gameObjectRecord),
        JudgeInstanceMainService$Wonderjs.isSupportInstance(state)
      ], CreateInitBasicMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
            index,
            match[/* disposedIndexArray */8]
          ], state));
  return state;
}

function getShaderIndex(materialIndex, state) {
  return ShaderIndicesService$Wonderjs.getShaderIndex(materialIndex, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* shaderIndices */2]);
}

function setShaderIndex(materialIndex, shaderIndex, state) {
  return ShaderIndexBasicMaterialMainService$Wonderjs.setShaderIndex(materialIndex, shaderIndex, state);
}

var dispose = GameObjectTool$Wonderjs.disposeGameObjectBasicMaterialComponent;

var initMaterial = InitBasicMaterialMainService$Wonderjs.handleInitComponent;

function isMaterialDisposed(material, state) {
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  return match[/* disposedIndexArray */8].includes(material);
}

function hasGameObject(material, state) {
  var match = GameObjectBasicMaterialService$Wonderjs.getGameObjects(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state));
  if (match !== undefined) {
    return match.length > 0;
  } else {
    return false;
  }
}

function isNeedInitMaterial(material, state) {
  return InitInitBasicMaterialService$Wonderjs.isNeedInitMaterial(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* shaderIndices */2]);
}

function getDefaultIsDepthTest(param) {
  return true;
}

function getDefaultAlpha(param) {
  return BufferAllBasicMaterialService$Wonderjs.getDefaultAlpha(/* () */0);
}

function disposeBasicMaterial(material, state) {
  return BasicMaterialAPI$Wonderjs.batchDisposeBasicMaterial(/* array */[material], state);
}

export {
  getRecord ,
  createGameObject ,
  createGameObjectWithMaterial ,
  getDefaultShaderIndex ,
  getDefaultColor ,
  initMaterials ,
  getShaderIndex ,
  setShaderIndex ,
  dispose ,
  initMaterial ,
  isMaterialDisposed ,
  hasGameObject ,
  isNeedInitMaterial ,
  getDefaultIsDepthTest ,
  getDefaultAlpha ,
  disposeBasicMaterial ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
