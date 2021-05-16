

import * as CameraTool$Wonderjs from "../../service/camera/CameraTool.js";
import * as GeometryTool$Wonderjs from "../../service/geometry/GeometryTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as RenderBasicJob$Wonderjs from "../../../../src/job/no_worker/loop/render_basic/RenderBasicJob.js";
import * as BoxGeometryTool$Wonderjs from "../../service/geometry/BoxGeometryTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../src/api/MeshRendererAPI.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../src/api/material/BasicMaterialAPI.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../service/noWorkerJob/NoWorkerJobConfigTool.js";

var execJob = RenderBasicJob$Wonderjs.execJob;

function prepareGameObject(sandbox, state) {
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

function prepareGameObjectWithGeometry(sandbox, state) {
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

function prepareGameObjectWithSharedGeometry(sandbox, geometry, state) {
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

function prepareGameObjectWithSharedMaterial(sandbox, material, state) {
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

function buildNoWorkerJobConfig(param) {
  return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_camera\"\n        },\n        {\n          \"name\": \"start_time\"\n        },\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_state\"\n        },\n        {\n          \"name\": \"init_basic_material\"\n        },\n        {\n          \"name\": \"init_texture\"\n        }\n        ]\n    }\n]\n        ", NoWorkerJobConfigTool$Wonderjs.buildNoWorkerLoopPipelineConfig(/* () */0), NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitJobConfigWithoutInitMain(/* () */0), NoWorkerJobConfigTool$Wonderjs.buildNoWorkerLoopJobConfig(/* () */0), /* () */0);
}

export {
  execJob ,
  prepareGameObject ,
  prepareGameObjectWithGeometry ,
  prepareGameObjectWithSharedGeometry ,
  prepareGameObjectWithSharedMaterial ,
  prepareForDrawElements ,
  buildNoWorkerJobConfig ,
  
}
/* CameraTool-Wonderjs Not a pure module */
