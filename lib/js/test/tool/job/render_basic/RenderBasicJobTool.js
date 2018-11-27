'use strict';

var CameraTool$Wonderjs = require("../../service/camera/CameraTool.js");
var GeometryTool$Wonderjs = require("../../service/geometry/GeometryTool.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var RenderBasicJob$Wonderjs = require("../../../../src/job/no_worker/loop/render_basic/RenderBasicJob.js");
var BoxGeometryTool$Wonderjs = require("../../service/geometry/BoxGeometryTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../src/api/MeshRendererAPI.js");
var BasicMaterialAPI$Wonderjs = require("../../../../src/api/material/BasicMaterialAPI.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../src/api/texture/BasicSourceTextureAPI.js");

var execJob = RenderBasicJob$Wonderjs.execJob;

function prepareGameObject(_, state) {
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
  var geometry = match$1[1];
  var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
  var meshRenderer = match$2[1];
  var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
  var gameObject = match$3[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$3[0])));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material,
          meshRenderer
        ];
}

function prepareGameObjectWithMap(sandbox, map, state) {
  var match = prepareGameObject(sandbox, state);
  var material = match[3];
  var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialMap(material, map, match[0]);
  return /* tuple */[
          state$1,
          match[1],
          match[2],
          material,
          match[4],
          map
        ];
}

function prepareGameObjectWithCreatedMap(sandbox, state) {
  var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
  return prepareGameObjectWithMap(sandbox, match[1], match[0]);
}

function prepareGameObjectWithGeometry(_, state) {
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var match$1 = GeometryTool$Wonderjs.createGameObjectAndSetPointData(match[0]);
  var gameObject = match$1[1];
  var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
  var meshRenderer = match$2[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$2[0]));
  return /* tuple */[
          state$1,
          gameObject,
          match$1[2],
          material,
          meshRenderer
        ];
}

function prepareGameObjectWithSharedGeometry(_, geometry, state) {
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var match$1 = MeshRendererAPI$Wonderjs.createMeshRenderer(match[0]);
  var meshRenderer = match$1[1];
  var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
  var gameObject = match$2[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$2[0])));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material,
          meshRenderer
        ];
}

function prepareGameObjectWithSharedMaterial(_, material, state) {
  var match = BoxGeometryTool$Wonderjs.createBoxGeometry(state);
  var geometry = match[1];
  var match$1 = MeshRendererAPI$Wonderjs.createMeshRenderer(match[0]);
  var meshRenderer = match$1[1];
  var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
  var gameObject = match$2[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$2[0])));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material,
          meshRenderer
        ];
}

function prepareForDrawElements(sandbox, state) {
  var match = prepareGameObject(sandbox, state);
  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
  return /* tuple */[
          match$1[0],
          match[2],
          match[4]
        ];
}

exports.execJob = execJob;
exports.prepareGameObject = prepareGameObject;
exports.prepareGameObjectWithMap = prepareGameObjectWithMap;
exports.prepareGameObjectWithCreatedMap = prepareGameObjectWithCreatedMap;
exports.prepareGameObjectWithGeometry = prepareGameObjectWithGeometry;
exports.prepareGameObjectWithSharedGeometry = prepareGameObjectWithSharedGeometry;
exports.prepareGameObjectWithSharedMaterial = prepareGameObjectWithSharedMaterial;
exports.prepareForDrawElements = prepareForDrawElements;
/* CameraTool-Wonderjs Not a pure module */
