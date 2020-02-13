

import * as SceneAPI$Wonderjs from "../../../../../src/api/SceneAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as CubemapTextureTool$Wonderjs from "../../../../tool/service/texture/CubemapTextureTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as SkyboxSceneMainService$Wonderjs from "../../../../../src/service/state/main/scene/SkyboxSceneMainService.js";

var unsafeGetSkyboxGameObject = SkyboxSceneMainService$Wonderjs.unsafeGetSkyboxGameObject;

function prepareCubemapTexture(state) {
  var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state);
  var map = match[1];
  var state$1 = SceneAPI$Wonderjs.setCubemapTexture(map, match[0]);
  return /* tuple */[
          state$1,
          map
        ];
}

function prepareCubemapTextureAndSetAllSources(state) {
  var match = prepareCubemapTexture(state);
  var cubemapTexture = match[1];
  var state$1 = CubemapTextureTool$Wonderjs.setAllSources(match[0], cubemapTexture, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  return /* tuple */[
          state$1,
          cubemapTexture
        ];
}

function prepareGameObject(state) {
  var match = CameraTool$Wonderjs.createCameraGameObject(state);
  return /* tuple */[
          match[0],
          match[2],
          match[3][0]
        ];
}

function _buildRenderConfig($staropt$star, $staropt$star$1, param) {
  var shaders = $staropt$star !== undefined ? $staropt$star : "\n{\n  \"static_branchs\": [\n  ],\n  \"dynamic_branchs\": [\n  ],\n  \"groups\": [\n    {\n      \"name\": \"top\",\n      \"value\": [\n        \"common\",\n        \"vertex\"\n      ]\n    },\n    {\n      \"name\": \"end\",\n      \"value\": [\n        \"end\"\n      ]\n    }\n  ],\n  \"material_shaders\": [\n  ],\n  \"no_material_shaders\": [\n    {\n      \"name\": \"skybox\",\n      \"shader_libs\": [\n        {\n          \"type\": \"group\",\n          \"name\": \"top\"\n        },\n        {\n          \"name\": \"skybox\"\n        },\n        {\n          \"type\": \"group\",\n          \"name\": \"end\"\n        }\n      ]\n    }\n  ]\n}\n        ";
  var shaderLibs = $staropt$star$1 !== undefined ? $staropt$star$1 : "\n[\n  {\n    \"name\": \"common\",\n    \"glsls\": [\n      {\n        \"type\": \"vs\",\n        \"name\": \"common_vertex\"\n      },\n      {\n        \"type\": \"fs\",\n        \"name\": \"common_fragment\"\n      }\n    ],\n    \"variables\": {\n      \"uniforms\": [\n        {\n          \"name\": \"u_vMatrix\",\n          \"field\": \"vMatrix\",\n          \"type\": \"mat4\",\n          \"from\": \"camera\"\n        },\n        {\n          \"name\": \"u_pMatrix\",\n          \"field\": \"pMatrix\",\n          \"type\": \"mat4\",\n          \"from\": \"camera\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"vertex\",\n    \"variables\": {\n      \"attributes\": [\n        {\n          \"name\": \"a_position\",\n          \"buffer\": 0,\n          \"type\": \"vec3\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"skybox\",\n    \"glsls\": [\n      {\n        \"type\": \"vs\",\n        \"name\": \"webgl1_skybox_vertex\"\n      },\n      {\n        \"type\": \"fs\",\n        \"name\": \"webgl1_skybox_fragment\"\n      }\n    ],\n    \"variables\": {\n      \"uniforms\": [\n        {\n          \"name\": \"u_skyboxCubeMapSampler\",\n          \"from\": \"no_material_shader\",\n          \"field\": \"skyboxCubeMap\",\n          \"type\": \"samplerCube\"\n        },\n        {\n          \"name\": \"u_skyboxVMatrix\",\n          \"from\": \"no_material_shader\",\n          \"field\": \"skyboxVMatrix\",\n          \"type\": \"mat4\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"end\",\n    \"variables\": {\n      \"attributes\": [\n        {\n          \"buffer\": 3\n        }\n      ]\n    }\n  }\n]\n        ";
  return /* tuple */[
          shaders,
          shaderLibs
        ];
}

function initWithJobConfig(sandbox) {
  return DirectorTool$Wonderjs.prepare(TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_no_material_shader\"\n        },\n        {\n          \"name\": \"init_texture\"\n        },\n        {\n            \"name\": \"init_skybox\"\n        }\n        ]\n    }\n  ]\n        ", "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n            {\n                \"name\": \"update_camera\"\n            },\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"clear_last_send_component\"\n            },\n            {\n                \"name\": \"send_uniform_shader_data\"\n            },\n            {\n                \"name\": \"render_skybox\"\n            }\n        ]\n    }\n  ]\n        ", NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitJobConfigWithoutInitMain(/* () */0), NoWorkerJobConfigTool$Wonderjs.buildNoWorkerLoopJobConfig(/* () */0), /* () */0), _buildRenderConfig(undefined, undefined, /* () */0), undefined, /* () */0));
}

export {
  unsafeGetSkyboxGameObject ,
  prepareCubemapTexture ,
  prepareCubemapTextureAndSetAllSources ,
  prepareGameObject ,
  _buildRenderConfig ,
  initWithJobConfig ,
  
}
/* SceneAPI-Wonderjs Not a pure module */
