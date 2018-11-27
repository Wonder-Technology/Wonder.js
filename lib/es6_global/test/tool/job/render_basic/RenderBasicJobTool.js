

import * as CameraTool$Wonderjs from "../../service/camera/CameraTool.js";
import * as GeometryTool$Wonderjs from "../../service/geometry/GeometryTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as RenderBasicJob$Wonderjs from "../../../../src/job/no_worker/loop/render_basic/RenderBasicJob.js";
import * as BoxGeometryTool$Wonderjs from "../../service/geometry/BoxGeometryTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../src/api/MeshRendererAPI.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../src/api/material/BasicMaterialAPI.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../src/api/texture/BasicSourceTextureAPI.js";

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

export {
  execJob ,
  prepareGameObject ,
  prepareGameObjectWithMap ,
  prepareGameObjectWithCreatedMap ,
  prepareGameObjectWithGeometry ,
  prepareGameObjectWithSharedGeometry ,
  prepareGameObjectWithSharedMaterial ,
  prepareForDrawElements ,
  
}
/* CameraTool-Wonderjs Not a pure module */
