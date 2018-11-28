'use strict';

var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var GameObjectTool$Wonderjs = require("../gameObject/GameObjectTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../src/api/material/BasicMaterialAPI.js");
var BufferSettingService$Wonderjs = require("../../../../src/service/record/main/setting/BufferSettingService.js");
var ShaderIndicesService$Wonderjs = require("../../../../src/service/primitive/material/ShaderIndicesService.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../src/api/texture/BasicSourceTextureAPI.js");
var BufferMaterialService$Wonderjs = require("../../../../src/service/record/main/material/BufferMaterialService.js");
var BasicSourceTextureTool$Wonderjs = require("../texture/BasicSourceTextureTool.js");
var JudgeInstanceMainService$Wonderjs = require("../../../../src/service/state/main/instance/JudgeInstanceMainService.js");
var BufferBasicMaterialService$Wonderjs = require("../../../../src/service/record/all/material/basic/BufferBasicMaterialService.js");
var EmptyMapUnitArrayMapService$Wonderjs = require("../../../../src/service/record/main/material/EmptyMapUnitArrayMapService.js");
var DefaultTypeArrayValueService$Wonderjs = require("../../../../src/service/primitive/buffer/DefaultTypeArrayValueService.js");
var InitBasicMaterialMainService$Wonderjs = require("../../../../src/service/state/main/material/basic/InitBasicMaterialMainService.js");
var InitInitBasicMaterialService$Wonderjs = require("../../../../src/service/state/init_material/init_basicMaterial/material/InitInitBasicMaterialService.js");
var GameObjectBasicMaterialService$Wonderjs = require("../../../../src/service/record/main/material/basic/GameObjectBasicMaterialService.js");
var RecordBasicMaterialMainService$Wonderjs = require("../../../../src/service/state/main/material/basic/RecordBasicMaterialMainService.js");
var ShaderIndexBasicMaterialMainService$Wonderjs = require("../../../../src/service/state/main/material/basic/ShaderIndexBasicMaterialMainService.js");
var OperateTypeArrayBasicMaterialService$Wonderjs = require("../../../../src/service/record/all/material/basic/OperateTypeArrayBasicMaterialService.js");
var CreateInitBasicMaterialStateMainService$Wonderjs = require("../../../../src/service/state/main/material/basic/CreateInitBasicMaterialStateMainService.js");

var getRecord = RecordBasicMaterialMainService$Wonderjs.getRecord;

function createMaterialWithMap(state) {
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
  var texture = match$1[1];
  var source = BasicSourceTextureTool$Wonderjs.buildSource(10, 20);
  var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(texture, source, match$1[0]);
  var state$2 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, texture, state$1);
  return /* tuple */[
          state$2,
          material,
          /* tuple */[
            texture,
            source
          ]
        ];
}

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

function createGameObjectWithMap(state) {
  var match = createGameObject(state);
  var material = match[2];
  var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
  var texture = match$1[1];
  var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, texture, match$1[0]);
  return /* tuple */[
          state$1,
          match[1],
          /* tuple */[
            material,
            texture
          ]
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

function getDefaultShaderIndex() {
  return DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
}

function getDefaultColor(state) {
  return RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* defaultColor */7];
}

function initMaterials(gl, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = RecordBasicMaterialMainService$Wonderjs.getRecord(state);
  var index = match[/* index */0];
  InitInitBasicMaterialService$Wonderjs.init(gl, /* tuple */[
        JudgeInstanceMainService$Wonderjs.buildMap(index, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectsMap */8], gameObjectRecord),
        JudgeInstanceMainService$Wonderjs.isSupportInstance(state)
      ], CreateInitBasicMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
            index,
            match[/* disposedIndexArray */9]
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
  return match[/* disposedIndexArray */9].includes(material);
}

function getMapUnit(material, state) {
  return OperateTypeArrayBasicMaterialService$Wonderjs.getMapUnit(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* mapUnits */5]);
}

function setMapUnit(material, unit, state) {
  OperateTypeArrayBasicMaterialService$Wonderjs.setMapUnit(material, unit, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* mapUnits */5]);
  return state;
}

function getTextureIndicesIndex(material, state) {
  return BufferBasicMaterialService$Wonderjs.getTextureIndicesIndex(material, BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]));
}

function getDefaultTextureIndex() {
  return BufferMaterialService$Wonderjs.getDefaultTextureIndex(/* () */0);
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

function getEmptyMapUnitArray(material, state) {
  return EmptyMapUnitArrayMapService$Wonderjs._unsafeGetEmptyMapUnitArray(material, RecordBasicMaterialMainService$Wonderjs.getRecord(state)[/* emptyMapUnitArrayMap */6]);
}

exports.getRecord = getRecord;
exports.createMaterialWithMap = createMaterialWithMap;
exports.createGameObject = createGameObject;
exports.createGameObjectWithMap = createGameObjectWithMap;
exports.createGameObjectWithMaterial = createGameObjectWithMaterial;
exports.getDefaultShaderIndex = getDefaultShaderIndex;
exports.getDefaultColor = getDefaultColor;
exports.initMaterials = initMaterials;
exports.getShaderIndex = getShaderIndex;
exports.setShaderIndex = setShaderIndex;
exports.dispose = dispose;
exports.initMaterial = initMaterial;
exports.isMaterialDisposed = isMaterialDisposed;
exports.getMapUnit = getMapUnit;
exports.setMapUnit = setMapUnit;
exports.getTextureIndicesIndex = getTextureIndicesIndex;
exports.getDefaultTextureIndex = getDefaultTextureIndex;
exports.hasGameObject = hasGameObject;
exports.isNeedInitMaterial = isNeedInitMaterial;
exports.getEmptyMapUnitArray = getEmptyMapUnitArray;
/* GameObjectAPI-Wonderjs Not a pure module */
