'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var MeshRendererAPI$Wonderjs = require("../../../../src/api/MeshRendererAPI.js");
var BasicMaterialAPI$Wonderjs = require("../../../../src/api/material/BasicMaterialAPI.js");
var LightMaterialAPI$Wonderjs = require("../../../../src/api/material/LightMaterialAPI.js");
var BufferMeshRendererService$Wonderjs = require("../../../../src/service/record/main/meshRenderer/BufferMeshRendererService.js");
var RecordMeshRendererMainService$Wonderjs = require("../../../../src/service/state/main/meshRenderer/RecordMeshRendererMainService.js");
var RenderArrayMeshRendererService$Wonderjs = require("../../../../src/service/record/main/meshRenderer/RenderArrayMeshRendererService.js");

function getBasicMaterialRenderGameObjectArray(state) {
  return RenderArrayMeshRendererService$Wonderjs.getBasicMaterialRenderGameObjectArray(RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function getLightMaterialRenderGameObjectArray(state) {
  return RenderArrayMeshRendererService$Wonderjs.getLightMaterialRenderGameObjectArray(RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function isMeshRenderer(meshRenderer) {
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* >= */2], Wonder_jest.Expect[/* expect */0](meshRenderer), 0);
}

function createBasicMaterialGameObject(state) {
  var match = MeshRendererAPI$Wonderjs.createMeshRenderer(state);
  var meshRenderer = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var match$2 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match$1[0]);
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, match$2[1], match$2[0]);
  var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, state$1);
  return /* tuple */[
          state$2,
          gameObject,
          meshRenderer
        ];
}

function createLightMaterialGameObject(state) {
  var match = MeshRendererAPI$Wonderjs.createMeshRenderer(state);
  var meshRenderer = match[1];
  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
  var gameObject = match$1[1];
  var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(match$1[0]);
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, match$2[1], match$2[0]);
  var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, state$1);
  return /* tuple */[
          state$2,
          gameObject,
          meshRenderer
        ];
}

var getRecord = RecordMeshRendererMainService$Wonderjs.getRecord;

function getLines(param) {
  return /* Lines */1;
}

function getPoints(param) {
  return /* Points */0;
}

function getTriangles(param) {
  return /* Triangles */4;
}

function getDefaultDrawMode(param) {
  return BufferMeshRendererService$Wonderjs.getDefaultDrawMode(/* () */0);
}

function getRender(param) {
  return BufferMeshRendererService$Wonderjs.getRender(/* () */0);
}

function getNotRender(param) {
  return BufferMeshRendererService$Wonderjs.getNotRender(/* () */0);
}

function getDefaultIsRender(param) {
  return BufferMeshRendererService$Wonderjs.getDefaultIsRender(/* () */0) === BufferMeshRendererService$Wonderjs.getRender(/* () */0);
}

function getDefaultIsRenderUint8(param) {
  return BufferMeshRendererService$Wonderjs.getDefaultIsRender(/* () */0);
}

exports.getBasicMaterialRenderGameObjectArray = getBasicMaterialRenderGameObjectArray;
exports.getLightMaterialRenderGameObjectArray = getLightMaterialRenderGameObjectArray;
exports.isMeshRenderer = isMeshRenderer;
exports.createBasicMaterialGameObject = createBasicMaterialGameObject;
exports.createLightMaterialGameObject = createLightMaterialGameObject;
exports.getRecord = getRecord;
exports.getLines = getLines;
exports.getPoints = getPoints;
exports.getTriangles = getTriangles;
exports.getDefaultDrawMode = getDefaultDrawMode;
exports.getRender = getRender;
exports.getNotRender = getNotRender;
exports.getDefaultIsRender = getDefaultIsRender;
exports.getDefaultIsRenderUint8 = getDefaultIsRenderUint8;
/* Wonder_jest Not a pure module */
