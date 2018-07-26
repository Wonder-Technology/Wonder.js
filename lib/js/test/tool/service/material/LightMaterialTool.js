'use strict';

var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var GameObjectTool$Wonderjs = require("../gameObject/GameObjectTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../src/api/material/LightMaterialAPI.js");
var BufferSettingService$Wonderjs = require("../../../../src/service/record/main/setting/BufferSettingService.js");
var ShaderIndicesService$Wonderjs = require("../../../../src/service/primitive/material/ShaderIndicesService.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../src/api/texture/BasicSourceTextureAPI.js");
var BufferMaterialService$Wonderjs = require("../../../../src/service/record/main/material/BufferMaterialService.js");
var BasicSourceTextureTool$Wonderjs = require("../texture/BasicSourceTextureTool.js");
var JudgeInstanceMainService$Wonderjs = require("../../../../src/service/state/main/instance/JudgeInstanceMainService.js");
var GroupLightMaterialService$Wonderjs = require("../../../../src/service/record/main/material/light/GroupLightMaterialService.js");
var BufferLightMaterialService$Wonderjs = require("../../../../src/service/record/all/material/light/BufferLightMaterialService.js");
var DefaultTypeArrayValueService$Wonderjs = require("../../../../src/service/primitive/buffer/DefaultTypeArrayValueService.js");
var InitInitLightMaterialService$Wonderjs = require("../../../../src/service/state/init_material/init_lightMaterial/material/InitInitLightMaterialService.js");
var InitLightMaterialMainService$Wonderjs = require("../../../../src/service/state/main/material/light/InitLightMaterialMainService.js");
var RecordLightMaterialMainService$Wonderjs = require("../../../../src/service/state/main/material/light/RecordLightMaterialMainService.js");
var TextureCountMapMaterialService$Wonderjs = require("../../../../src/service/record/main/material/TextureCountMapMaterialService.js");
var ShaderIndexLightMaterialMainService$Wonderjs = require("../../../../src/service/state/main/material/light/ShaderIndexLightMaterialMainService.js");
var OperateTypeArrayLightMaterialService$Wonderjs = require("../../../../src/service/record/all/material/light/OperateTypeArrayLightMaterialService.js");
var CreateInitLightMaterialStateMainService$Wonderjs = require("../../../../src/service/state/main/material/light/CreateInitLightMaterialStateMainService.js");

var getRecord = RecordLightMaterialMainService$Wonderjs.getRecord;

function createGameObject(state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$1[0]);
  return /* tuple */[
          state$1,
          gameObject,
          material
        ];
}

function createAndSetMapsWithMap(material, diffuseMap, specularMap, state) {
  var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, diffuseMap, state);
  var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialSpecularMap(material, specularMap, state$1);
  return /* tuple */[
          state$2,
          /* tuple */[
            diffuseMap,
            specularMap
          ]
        ];
}

function createAndSetMaps(material, state) {
  var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
  var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
  return createAndSetMapsWithMap(material, match[1], match$1[1], match$1[0]);
}

function createMaterialWithMap(state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = createAndSetMaps(material, match[0]);
  var match$2 = match$1[1];
  var specularMap = match$2[1];
  var diffuseMap = match$2[0];
  var source1 = BasicSourceTextureTool$Wonderjs.buildSource(10, 20);
  var source2 = BasicSourceTextureTool$Wonderjs.buildSource(10, 20);
  var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(diffuseMap, source1, match$1[0]);
  var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(specularMap, source1, state$1);
  return /* tuple */[
          state$2,
          material,
          /* tuple */[
            diffuseMap,
            specularMap,
            source1,
            source2
          ]
        ];
}

function createGameObjectWithMap(state) {
  var match = createGameObject(state);
  var material = match[2];
  var match$1 = createAndSetMaps(material, match[0]);
  var match$2 = match$1[1];
  return /* tuple */[
          match$1[0],
          match[1],
          /* tuple */[
            material,
            /* tuple */[
              match$2[0],
              match$2[1]
            ]
          ]
        ];
}

function createGameObjectWithMaterial(material, state) {
  var match = GameObjectAPI$Wonderjs.createGameObject(state);
  var gameObject = match[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match[0]);
  return /* tuple */[
          state$1,
          gameObject,
          material
        ];
}

function getDefaultShaderIndex() {
  return DefaultTypeArrayValueService$Wonderjs.getDefaultShaderIndex(/* () */0);
}

function getDefaultDiffuseColor(state) {
  return RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* defaultDiffuseColor */10];
}

function getDefaultSpecularColor(state) {
  return RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* defaultSpecularColor */11];
}

function getDefaultShininess(state) {
  return RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* defaultShininess */12];
}

function initMaterials(gl, state) {
  var gameObjectRecord = state[/* gameObjectRecord */10];
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  var index = match[/* index */0];
  InitInitLightMaterialService$Wonderjs.init(gl, /* tuple */[
        JudgeInstanceMainService$Wonderjs.buildMap(index, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* gameObjectMap */13], gameObjectRecord),
        JudgeInstanceMainService$Wonderjs.isSupportInstance(state)
      ], CreateInitLightMaterialStateMainService$Wonderjs.createInitMaterialState(/* tuple */[
            index,
            match[/* disposedIndexArray */15]
          ], state));
  return state;
}

function getShaderIndex(materialIndex, state) {
  return ShaderIndicesService$Wonderjs.getShaderIndex(materialIndex, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* shaderIndices */2]);
}

function setShaderIndex(materialIndex, shaderIndex, state) {
  return ShaderIndexLightMaterialMainService$Wonderjs.setShaderIndex(materialIndex, shaderIndex, state);
}

function dispose(material, state) {
  return GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(-1, material, state);
}

var initMaterial = InitLightMaterialMainService$Wonderjs.handleInitComponent;

function isMaterialDisposed(material, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return match[/* disposedIndexArray */15].includes(material);
}

function getGroupCount(material, state) {
  return GroupLightMaterialService$Wonderjs.getGroupCount(material, RecordLightMaterialMainService$Wonderjs.getRecord(state));
}

function getBasicSourceTextureCount(material, state) {
  return TextureCountMapMaterialService$Wonderjs.unsafeGetCount(material, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* textureCountMap */9]);
}

function getDiffuseMapUnit(material, state) {
  return OperateTypeArrayLightMaterialService$Wonderjs.getDiffuseMapUnit(material, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* diffuseMapUnits */7]);
}

function setDiffuseMapUnit(material, unit, state) {
  OperateTypeArrayLightMaterialService$Wonderjs.setDiffuseMapUnit(material, unit, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* diffuseMapUnits */7]);
  return state;
}

function getSpecularMapUnit(material, state) {
  return OperateTypeArrayLightMaterialService$Wonderjs.getSpecularMapUnit(material, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* specularMapUnits */8]);
}

function setSpecularMapUnit(material, unit, state) {
  OperateTypeArrayLightMaterialService$Wonderjs.setSpecularMapUnit(material, unit, RecordLightMaterialMainService$Wonderjs.getRecord(state)[/* specularMapUnits */8]);
  return state;
}

function getTextureIndicesIndex(material, state) {
  return BufferLightMaterialService$Wonderjs.getTextureIndicesIndex(material, BufferSettingService$Wonderjs.getTextureCountPerMaterial(state[/* settingRecord */0]));
}

function getDefaultTextureIndex() {
  return BufferMaterialService$Wonderjs.getDefaultTextureIndex(/* () */0);
}

exports.getRecord = getRecord;
exports.createGameObject = createGameObject;
exports.createAndSetMapsWithMap = createAndSetMapsWithMap;
exports.createAndSetMaps = createAndSetMaps;
exports.createMaterialWithMap = createMaterialWithMap;
exports.createGameObjectWithMap = createGameObjectWithMap;
exports.createGameObjectWithMaterial = createGameObjectWithMaterial;
exports.getDefaultShaderIndex = getDefaultShaderIndex;
exports.getDefaultDiffuseColor = getDefaultDiffuseColor;
exports.getDefaultSpecularColor = getDefaultSpecularColor;
exports.getDefaultShininess = getDefaultShininess;
exports.initMaterials = initMaterials;
exports.getShaderIndex = getShaderIndex;
exports.setShaderIndex = setShaderIndex;
exports.dispose = dispose;
exports.initMaterial = initMaterial;
exports.isMaterialDisposed = isMaterialDisposed;
exports.getGroupCount = getGroupCount;
exports.getBasicSourceTextureCount = getBasicSourceTextureCount;
exports.getDiffuseMapUnit = getDiffuseMapUnit;
exports.setDiffuseMapUnit = setDiffuseMapUnit;
exports.getSpecularMapUnit = getSpecularMapUnit;
exports.setSpecularMapUnit = setSpecularMapUnit;
exports.getTextureIndicesIndex = getTextureIndicesIndex;
exports.getDefaultTextureIndex = getDefaultTextureIndex;
/* GameObjectAPI-Wonderjs Not a pure module */
