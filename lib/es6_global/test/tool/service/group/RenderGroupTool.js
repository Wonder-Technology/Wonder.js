

import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as RenderGroupAPI$Wonderjs from "../../../../src/api/group/render/RenderGroupAPI.js";
import * as MeshRendererAPI$Wonderjs from "../../../../src/api/MeshRendererAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../src/api/material/LightMaterialAPI.js";
import * as RenderGroupMainService$Wonderjs from "../../../../src/service/state/main/group/render/RenderGroupMainService.js";

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

export {
  buildRenderGroup ,
  createRenderGroup ,
  addGameObjectRenderGroupComponents ,
  disposeGameObjectRenderGroupComponents ,
  unsafeGetGameObjectRenderGroupComponents ,
  hasGameObjectRenderGroupComponents ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
