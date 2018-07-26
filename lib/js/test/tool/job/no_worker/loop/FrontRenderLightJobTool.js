'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var BoxGeometryTool$Wonderjs = require("../../../service/geometry/BoxGeometryTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../src/api/MeshRendererAPI.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var LightMaterialTool$Wonderjs = require("../../../service/material/LightMaterialTool.js");

function prepareGameObject(_, state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
  var geometry = match$1[1];
  var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
  var meshRenderer = match$2[1];
  var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
  var gameObject = match$3[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectBoxGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0])));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material,
          meshRenderer
        ];
}

function prepareGameObjectWithCreatedMap(sandbox, state) {
  var match = prepareGameObject(sandbox, state);
  var material = match[3];
  var match$1 = LightMaterialTool$Wonderjs.createAndSetMaps(material, match[0]);
  var match$2 = match$1[1];
  return /* tuple */[
          match$1[0],
          match[1],
          match[2],
          material,
          match[4],
          /* tuple */[
            match$2[0],
            match$2[1]
          ]
        ];
}

function prepareGameObjectWithSharedGeometry(_, geometry, addGameObjectGeometryComponentFunc, state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = MeshRendererAPI$Wonderjs.createMeshRenderer(match[0]);
  var meshRenderer = match$1[1];
  var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
  var gameObject = match$2[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, Curry._3(addGameObjectGeometryComponentFunc, gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$2[0])));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material,
          meshRenderer
        ];
}

exports.prepareGameObject = prepareGameObject;
exports.prepareGameObjectWithCreatedMap = prepareGameObjectWithCreatedMap;
exports.prepareGameObjectWithSharedGeometry = prepareGameObjectWithSharedGeometry;
/* GameObjectAPI-Wonderjs Not a pure module */
