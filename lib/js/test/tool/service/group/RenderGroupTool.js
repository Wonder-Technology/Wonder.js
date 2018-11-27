'use strict';

var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var RenderGroupAPI$Wonderjs = require("../../../../src/api/group/render/RenderGroupAPI.js");
var MeshRendererAPI$Wonderjs = require("../../../../src/api/MeshRendererAPI.js");
var LightMaterialAPI$Wonderjs = require("../../../../src/api/material/LightMaterialAPI.js");
var RenderGroupMainService$Wonderjs = require("../../../../src/service/state/main/group/render/RenderGroupMainService.js");

function createRenderGroup(state) {
  return RenderGroupAPI$Wonderjs.createRenderGroup(/* tuple */[
              MeshRendererAPI$Wonderjs.createMeshRenderer,
              LightMaterialAPI$Wonderjs.createLightMaterial
            ], state);
}

function addGameObjectRenderGroupComponents(gameObject, cameraGroup, state) {
  return RenderGroupAPI$Wonderjs.addGameObjectRenderGroupComponents(gameObject, cameraGroup, /* tuple */[
              GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
              GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent
            ], state);
}

function disposeGameObjectRenderGroupComponents(gameObject, cameraGroup, state) {
  return RenderGroupAPI$Wonderjs.disposeGameObjectRenderGroupComponents(gameObject, cameraGroup, /* tuple */[
              GameObjectAPI$Wonderjs.disposeGameObjectMeshRendererComponent,
              GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent
            ], state);
}

function unsafeGetGameObjectRenderGroupComponents(gameObject, state) {
  return RenderGroupAPI$Wonderjs.unsafeGetGameObjectRenderGroupComponents(gameObject, /* tuple */[
              GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent,
              GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent
            ], state);
}

function hasGameObjectRenderGroupComponents(gameObject, state) {
  return RenderGroupAPI$Wonderjs.hasGameObjectRenderGroupComponents(gameObject, /* tuple */[
              GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent,
              GameObjectAPI$Wonderjs.hasGameObjectLightMaterialComponent
            ], state);
}

var buildRenderGroup = RenderGroupMainService$Wonderjs.buildRenderGroup;

exports.buildRenderGroup = buildRenderGroup;
exports.createRenderGroup = createRenderGroup;
exports.addGameObjectRenderGroupComponents = addGameObjectRenderGroupComponents;
exports.disposeGameObjectRenderGroupComponents = disposeGameObjectRenderGroupComponents;
exports.unsafeGetGameObjectRenderGroupComponents = unsafeGetGameObjectRenderGroupComponents;
exports.hasGameObjectRenderGroupComponents = hasGameObjectRenderGroupComponents;
/* GameObjectAPI-Wonderjs Not a pure module */
