

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as BoxGeometryTool$Wonderjs from "../../../service/geometry/BoxGeometryTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../service/material/LightMaterialTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../service/noWorkerJob/NoWorkerJobConfigTool.js";

function prepareGameObject(sandbox, state) {
  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
  var material = match[1];
  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
  var geometry = match$1[1];
  var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
  var meshRenderer = match$2[1];
  var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
  var gameObject = match$3[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0])));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material,
          meshRenderer
        ];
}

function prepareGameObjectWithDiffuseMap(sandbox, diffuseMap, state) {
  var match = prepareGameObject(sandbox, state);
  var material = match[3];
  var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, diffuseMap, match[0]);
  return /* tuple */[
          state$1,
          match[1],
          match[2],
          material,
          match[4],
          diffuseMap
        ];
}

function prepareGameObjectWithCreatedDiffuseMap(sandbox, state) {
  var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
  return prepareGameObjectWithDiffuseMap(sandbox, match[1], match[0]);
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

function prepareGameObjectWithSharedGeometry(sandbox, geometry, addGameObjectGeometryComponentFunc, state) {
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

function buildNoWorkerJobConfig(param) {
  return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_camera\"\n        },\n        {\n          \"name\": \"start_time\"\n        },\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_state\"\n        },\n        {\n          \"name\": \"init_basic_material\"\n        },\n        {\n          \"name\": \"init_light_material\"\n        },\n        {\n          \"name\": \"init_texture\"\n        }\n        ]\n    }\n]\n        ", "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"tick\"\n            },\n            {\n                \"name\": \"dispose\"\n            },\n            {\n                \"name\": \"reallocate_cpu_memory\"\n            },\n            {\n                \"name\": \"update_transform\"\n            },\n            {\n                \"name\": \"update_camera\"\n            },\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"create_basic_render_object_buffer\"\n            },\n            {\n                \"name\": \"create_light_render_object_buffer\"\n            },\n            {\n                \"name\": \"clear_color\"\n            },\n            {\n                \"name\": \"clear_buffer\"\n            },\n            {\n                \"name\": \"clear_last_send_component\"\n            },\n            {\n                \"name\": \"send_uniform_shader_data\"\n            },\n            {\n                \"name\": \"render_basic\"\n            },\n            {\n                \"name\": \"front_render_light\"\n            }\n        ]\n    }\n]\n        ", NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitJobConfigWithoutInitMain(/* () */0), NoWorkerJobConfigTool$Wonderjs.buildNoWorkerLoopJobConfig(/* () */0), /* () */0);
}

export {
  prepareGameObject ,
  prepareGameObjectWithDiffuseMap ,
  prepareGameObjectWithCreatedDiffuseMap ,
  prepareGameObjectWithCreatedMap ,
  prepareGameObjectWithSharedGeometry ,
  buildNoWorkerJobConfig ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
