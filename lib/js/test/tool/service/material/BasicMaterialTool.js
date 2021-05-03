'use strict';

var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var GameObjectTool$Wonderjs = require("../gameObject/GameObjectTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../src/api/material/BasicMaterialAPI.js");
var ShaderIndicesService$Wonderjs = require("../../../../src/service/primitive/material/ShaderIndicesService.js");
var JudgeInstanceMainService$Wonderjs = require("../../../../src/service/state/main/instance/JudgeInstanceMainService.js");
var DefaultTypeArrayValueService$Wonderjs = require("../../../../src/service/primitive/buffer/DefaultTypeArrayValueService.js");
var InitBasicMaterialMainService$Wonderjs = require("../../../../src/service/state/main/material/basic/InitBasicMaterialMainService.js");
var InitInitBasicMaterialService$Wonderjs = require("../../../../src/service/state/init_shader/init_material/init_basicMaterial/material/InitInitBasicMaterialService.js");
var BufferAllBasicMaterialService$Wonderjs = require("../../../../src/service/record/all/material/basic/BufferAllBasicMaterialService.js");
var GameObjectBasicMaterialService$Wonderjs = require("../../../../src/service/record/main/material/basic/GameObjectBasicMaterialService.js");
var RecordBasicMaterialMainService$Wonderjs = require("../../../../src/service/state/main/material/basic/RecordBasicMaterialMainService.js");
var ShaderIndexBasicMaterialMainService$Wonderjs = require("../../../../src/service/state/main/material/basic/ShaderIndexBasicMaterialMainService.js");
var CreateInitBasicMaterialStateMainService$Wonderjs = require("../../../../src/service/state/main/material/basic/CreateInitBasicMaterialStateMainService.js");

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

exports.getRecord = getRecord;
exports.createGameObject = createGameObject;
exports.createGameObjectWithMaterial = createGameObjectWithMaterial;
exports.getDefaultShaderIndex = getDefaultShaderIndex;
exports.getDefaultColor = getDefaultColor;
exports.initMaterials = initMaterials;
exports.getShaderIndex = getShaderIndex;
exports.setShaderIndex = setShaderIndex;
exports.dispose = dispose;
exports.initMaterial = initMaterial;
exports.isMaterialDisposed = isMaterialDisposed;
exports.hasGameObject = hasGameObject;
exports.isNeedInitMaterial = isNeedInitMaterial;
exports.getDefaultIsDepthTest = getDefaultIsDepthTest;
exports.getDefaultAlpha = getDefaultAlpha;
exports.disposeBasicMaterial = disposeBasicMaterial;
/* GameObjectAPI-Wonderjs Not a pure module */
