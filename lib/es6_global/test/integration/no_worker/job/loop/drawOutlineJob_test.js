

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_int32 from "../../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLSLTool$Wonderjs from "../../../../tool/render/core/GLSLTool.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ViewTool$Wonderjs from "../../../../tool/service/device/ViewTool.js";
import * as JudgeTool$Wonderjs from "../../../../tool/JudgeTool.js";
import * as SinonTool$Wonderjs from "../../tool/sinon/SinonTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as JobDataAPI$Wonderjs from "../../../../../src/api/jobData/JobDataAPI.js";
import * as ProgramTool$Wonderjs from "../../../../tool/service/program/ProgramTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as GeometryTool$Wonderjs from "../../../../tool/service/geometry/GeometryTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as Matrix4Service$Wonderjs from "../../../../../src/service/atom/Matrix4Service.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as RenderInJobTool$Wonderjs from "../tool/RenderInJobTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as GLSLLocationTool$Wonderjs from "../../../../tool/service/location/GLSLLocationTool.js";
import * as DrawOutlineJobTool$Wonderjs from "./tool/DrawOutlineJobTool.js";
import * as SphereGeometryTool$Wonderjs from "../../../../tool/service/geometry/SphereGeometryTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as FrontRenderLightJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../../src/service/state/main/render/CreateRenderStateMainService.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";

Wonder_jest.describe("test draw outline job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildRenderConfig = function ($staropt$star, $staropt$star$1, param) {
          var shaders = $staropt$star !== undefined ? $staropt$star : "\n{\n  \"static_branchs\": [\n  ],\n  \"dynamic_branchs\": [\n  ],\n  \"groups\": [\n    {\n      \"name\": \"top\",\n      \"value\": [\n        \"common\",\n        \"vertex\"\n      ]\n    },\n    {\n      \"name\": \"end\",\n      \"value\": [\n        \"end\"\n      ]\n    }\n  ],\n  \"material_shaders\": [\n  ],\n  \"no_material_shaders\": [\n    {\n      \"name\": \"outline_draw_origin_gameObjects\",\n      \"shader_libs\": [\n        {\n          \"type\": \"group\",\n          \"name\": \"top\"\n        },\n        {\n          \"name\": \"modelMatrix_noInstance\"\n        },\n        {\n          \"name\": \"outline_origin\"\n        },\n        {\n          \"type\": \"group\",\n          \"name\": \"end\"\n        }\n      ]\n    },\n    {\n      \"name\": \"outline_draw_expand_gameObjects\",\n      \"shader_libs\": [\n        {\n          \"type\": \"group\",\n          \"name\": \"top\"\n        },\n        {\n          \"name\": \"normal\"\n        },\n        {\n          \"name\": \"outline_scaled_modelMatrix\"\n        },\n        {\n          \"name\": \"outline_expand\"\n        },\n        {\n          \"type\": \"group\",\n          \"name\": \"end\"\n        }\n      ]\n    }\n  ]\n}\n        ";
          var shaderLibs = $staropt$star$1 !== undefined ? $staropt$star$1 : "\n[\n  {\n    \"name\": \"common\",\n    \"glsls\": [\n      {\n        \"type\": \"vs\",\n        \"name\": \"common_vertex\"\n      },\n      {\n        \"type\": \"fs\",\n        \"name\": \"common_fragment\"\n      }\n    ],\n    \"variables\": {\n      \"uniforms\": [\n        {\n          \"name\": \"u_vMatrix\",\n          \"field\": \"vMatrix\",\n          \"type\": \"mat4\",\n          \"from\": \"camera\"\n        },\n        {\n          \"name\": \"u_pMatrix\",\n          \"field\": \"pMatrix\",\n          \"type\": \"mat4\",\n          \"from\": \"camera\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"modelMatrix_noInstance\",\n    \"glsls\": [\n      {\n        \"type\": \"vs\",\n        \"name\": \"modelMatrix_noInstance_vertex\"\n      }\n    ],\n    \"variables\": {\n      \"uniforms\": [\n        {\n          \"name\": \"u_mMatrix\",\n          \"field\": \"mMatrix\",\n          \"type\": \"mat4\",\n          \"from\": \"model\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"vertex\",\n    \"variables\": {\n      \"attributes\": [\n        {\n          \"name\": \"a_position\",\n          \"buffer\": 0,\n          \"type\": \"vec3\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"normal\",\n    \"variables\": {\n      \"attributes\": [\n        {\n          \"name\": \"a_normal\",\n          \"buffer\": 1,\n          \"type\": \"vec3\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"outline_expand\",\n    \"glsls\": [\n      {\n        \"type\": \"vs\",\n        \"name\": \"webgl1_outline_expand_vertex\"\n      },\n      {\n        \"type\": \"fs\",\n        \"name\": \"webgl1_outline_expand_fragment\"\n      }\n    ],\n    \"variables\": {\n      \"uniforms\": [\n        {\n          \"name\": \"u_outlineColor\",\n          \"from\": \"no_material_shader\",\n          \"field\": \"outlineExpand\",\n          \"type\": \"float3\"\n        }\n      ]\n    }\n  },\n{\n    \"name\": \"outline_scaled_modelMatrix\",\n    \"glsls\": [\n      {\n        \"type\": \"vs\",\n        \"name\": \"modelMatrix_noInstance_vertex\"\n      }\n    ],\n    \"variables\": {\n      \"uniforms\": [\n        {\n          \"name\": \"u_mMatrix\",\n          \"field\": \"mMatrix\",\n          \"type\": \"mat4\",\n          \"from\": \"expand_model\"\n        }\n      ]\n    }\n  },\n  {\n    \"name\": \"outline_origin\",\n    \"glsls\": [\n      {\n        \"type\": \"vs\",\n        \"name\": \"webgl1_outline_origin_vertex\"\n      },\n      {\n        \"type\": \"fs\",\n        \"name\": \"webgl1_outline_origin_fragment\"\n      }\n    ]\n  },\n  {\n    \"name\": \"end\",\n    \"variables\": {\n      \"attributes\": [\n        {\n          \"buffer\": 3\n        }\n      ]\n    }\n  }\n]\n        ";
          return /* tuple */[
                  shaders,
                  shaderLibs
                ];
        };
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n[\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_camera\"\n        },\n        {\n          \"name\": \"start_time\"\n        },\n        {\n          \"name\": \"preget_glslData\"\n        },\n        {\n          \"name\": \"init_no_material_shader\"\n        }\n        ]\n    }\n]\n        ", "\n[\n    {\n        \"name\": \"default\",\n        \"jobs\": [\n            {\n                \"name\": \"tick\"\n            },\n            {\n                \"name\": \"dispose\"\n            },\n            {\n                \"name\": \"reallocate_cpu_memory\"\n            },\n            {\n                \"name\": \"update_transform\"\n            },\n            {\n                \"name\": \"update_camera\"\n            },\n            {\n                \"name\": \"get_camera_data\"\n            },\n            {\n                \"name\": \"create_basic_render_object_buffer\"\n            },\n            {\n                \"name\": \"create_light_render_object_buffer\"\n            },\n            {\n                \"name\": \"clear_last_send_component\"\n            },\n            {\n                \"name\": \"send_uniform_shader_data\"\n            },\n            {\n                \"name\": \"draw_outline\"\n            }\n        ]\n    }\n]\n        ", NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitJobConfigWithoutInitMain(/* () */0), NoWorkerJobConfigTool$Wonderjs.buildNoWorkerLoopJobConfig(/* () */0), /* () */0);
        };
        var prepareBasicGameObject = function (sandbox, state) {
          var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
          var material = match[1];
          var match$1 = SphereGeometryTool$Wonderjs.createSphereGeometry(match[0]);
          var geometry = match$1[1];
          var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
          var meshRenderer = match$2[1];
          var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
          var gameObject = match$3[1];
          var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$3[0])));
          return /* tuple */[
                  state$1,
                  gameObject,
                  /* tuple */[
                    geometry,
                    match$1[2],
                    match$1[3]
                  ],
                  material,
                  meshRenderer
                ];
        };
        var prepareOneGameObject = function (sandbox, state) {
          var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
          var lightGameObject = match[1];
          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
          var state$1 = JobDataAPI$Wonderjs.setGameObjectsNeedDrawOutline(/* array */[lightGameObject], match$1[0]);
          return /* tuple */[
                  state$1,
                  /* tuple */[
                    match$1[2],
                    match$1[3][0]
                  ],
                  lightGameObject,
                  match[2]
                ];
        };
        var prepareGameObjects = function (sandbox, state) {
          var match = prepareBasicGameObject(sandbox, state);
          var match$1 = match[2];
          var basicGameObject = match[1];
          var match$2 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
          var lightGameObject = match$2[1];
          var match$3 = CameraTool$Wonderjs.createCameraGameObject(match$2[0]);
          var state$1 = JobDataAPI$Wonderjs.setGameObjectsNeedDrawOutline(/* array */[
                basicGameObject,
                lightGameObject
              ], match$3[0]);
          return /* tuple */[
                  state$1,
                  /* tuple */[
                    match$3[2],
                    match$3[3][0]
                  ],
                  /* tuple */[
                    basicGameObject,
                    lightGameObject
                  ],
                  /* tuple */[
                    /* tuple */[
                      match$1[0],
                      match$1[2]
                    ],
                    match$2[2]
                  ]
                ];
        };
        var prepareAndExecForSendVMatrix = function (param) {
          var match = prepareGameObjects(sandbox, state[0]);
          var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[1][0], /* tuple */[
                10,
                2,
                3
              ], match[0]);
          var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_vMatrix");
          var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
          var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
          var targetData = new Float32Array(/* array */[
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                -10,
                -2,
                -3,
                1
              ]);
          return /* tuple */[
                  state$3,
                  uniformMatrix4fv,
                  0,
                  targetData
                ];
        };
        var prepareAndExecForSendPMatrix = function (param) {
          var match = prepareGameObjects(sandbox, state[0]);
          var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_pMatrix");
          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
          var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
          var targetData = PerspectiveCameraProjectionTool$Wonderjs.getPMatrixOfCreateBasicCameraViewPerspectiveCamera(/* () */0);
          return /* tuple */[
                  state$2,
                  uniformMatrix4fv,
                  0,
                  targetData
                ];
        };
        var prepareAndExecForSendMMatrix = function (param) {
          var match = prepareGameObjects(sandbox, state[0]);
          var match$1 = match[2];
          var state$1 = match[0];
          var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[1], state$1), /* tuple */[
                2,
                3,
                4
              ], TransformAPI$Wonderjs.setTransformLocalPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[0], state$1), /* tuple */[
                    1,
                    2,
                    3
                  ], state$1));
          var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_mMatrix");
          var state$3 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$2);
          var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$3));
          return /* tuple */[
                  state$4,
                  uniformMatrix4fv,
                  0
                ];
        };
        var prepareAndExecForDrawElement = function (param) {
          var match = prepareGameObjects(sandbox, state[0]);
          var match$1 = match[3];
          var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
          var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
          return /* tuple */[
                  state$2,
                  drawElements,
                  1,
                  /* tuple */[
                    match$1[0][0],
                    match$1[1]
                  ]
                ];
        };
        var prepareAndExec = function (shaderName) {
          return RenderInJobTool$Wonderjs.TestUseProgram[/* prepareAndExec */0](sandbox, state, shaderName);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), _buildRenderConfig(undefined, undefined, /* () */0), "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": true,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ", /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("gl context->stencil should be true", (function (param) {
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ViewTool$Wonderjs.unsafeGetContext(state[0])), /* record */[
                            /* alpha */true,
                            /* depth */true,
                            /* stencil */true,
                            /* antialias */true,
                            /* premultipliedAlpha */true,
                            /* preserveDrawingBuffer */false
                          ]);
              }));
        Wonder_jest.describe("test init outline_draw_origin_gameObjects,outline_draw_expand_gameObjects shaders", (function (param) {
                Wonder_jest.describe("test get attribute location", (function (param) {
                        Wonder_jest.describe("test get a_position location", (function (param) {
                                return Wonder_jest.test("test get location twice", (function (param) {
                                              var state$1 = state[0];
                                              var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_position");
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                              DirectorTool$Wonderjs.init(state$2);
                                              return Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_position", getAttribLocation)));
                                            }));
                              }));
                        return Wonder_jest.describe("test get a_normal location", (function (param) {
                                      return Wonder_jest.test("test get location once", (function (param) {
                                                    var state$1 = state[0];
                                                    var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(undefined, sandbox, "a_normal");
                                                    var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                    DirectorTool$Wonderjs.init(state$2);
                                                    return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, "a_normal", getAttribLocation)));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test get uniform location", (function (param) {
                        Wonder_jest.describe("test get no_material_shader uniform location", (function (param) {
                                return Wonder_jest.test("test get u_outlineColor location once", (function (param) {
                                              return RenderInJobTool$Wonderjs.testGetLocation(sandbox, "u_outlineColor", 1, DirectorTool$Wonderjs.init, state);
                                            }));
                              }));
                        Wonder_jest.describe("test get camera uniform location", (function (param) {
                                return Wonder_jest.test("test get u_vMatrix location twice", (function (param) {
                                              return RenderInJobTool$Wonderjs.testGetLocation(sandbox, "u_vMatrix", 2, DirectorTool$Wonderjs.init, state);
                                            }));
                              }));
                        return Wonder_jest.describe("test get model uniform location", (function (param) {
                                      return Wonder_jest.test("test get u_mMatrix location twice", (function (param) {
                                                    return RenderInJobTool$Wonderjs.testGetLocation(sandbox, "u_mMatrix", 2, DirectorTool$Wonderjs.init, state);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test glsl", (function (param) {
                              Wonder_jest.describe("test outline_draw_origin_gameObjects glsl", (function (param) {
                                      Wonder_jest.test("test vs", (function (param) {
                                              var match = RenderInJobTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                              DirectorTool$Wonderjs.init(match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSourceByCount(match[1], 0), /* :: */[
                                                                  "attribute vec3 a_position;",
                                                                  /* :: */[
                                                                    "uniform mat4 u_vMatrix;",
                                                                    /* :: */[
                                                                      "uniform mat4 u_pMatrix;",
                                                                      /* :: */[
                                                                        "uniform mat4 u_mMatrix;",
                                                                        /* :: */[
                                                                          "mat4 mMatrix = u_mMatrix;",
                                                                          /* :: */[
                                                                            "gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);",
                                                                            /* [] */0
                                                                          ]
                                                                        ]
                                                                      ]
                                                                    ]
                                                                  ]
                                                                ])), true);
                                            }));
                                      return Wonder_jest.test("test fs", (function (param) {
                                                    var match = RenderInJobTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                                    DirectorTool$Wonderjs.init(match[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSourceByCount(match[1], 0), /* :: */[
                                                                        "gl_FragColor = vec4(1.0);",
                                                                        /* [] */0
                                                                      ])), true);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test outline_draw_expand_gameObjects glsl", (function (param) {
                                            Wonder_jest.describe("test vs", (function (param) {
                                                    Wonder_jest.test("send a_position, a_normal and mvp matrices", (function (param) {
                                                            var match = RenderInJobTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                                            DirectorTool$Wonderjs.init(match[0]);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSourceByCount(match[1], 2), /* :: */[
                                                                                "attribute vec3 a_position;",
                                                                                /* :: */[
                                                                                  "attribute vec3 a_normal;",
                                                                                  /* :: */[
                                                                                    "uniform mat4 u_vMatrix;",
                                                                                    /* :: */[
                                                                                      "uniform mat4 u_pMatrix;",
                                                                                      /* :: */[
                                                                                        "uniform mat4 u_mMatrix;",
                                                                                        /* :: */[
                                                                                          "mat4 mMatrix = u_mMatrix;",
                                                                                          /* [] */0
                                                                                        ]
                                                                                      ]
                                                                                    ]
                                                                                  ]
                                                                                ]
                                                                              ])), true);
                                                          }));
                                                    return Wonder_jest.test("move a_position out towards a_normal", (function (param) {
                                                                  var match = RenderInJobTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                                                  DirectorTool$Wonderjs.init(match[0]);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSourceByCount(match[1], 2), /* :: */[
                                                                                      "vec3 position = a_position.xyz + a_normal.xyz * 0.08;",
                                                                                      /* :: */[
                                                                                        "gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(position, 1.0);",
                                                                                        /* [] */0
                                                                                      ]
                                                                                    ])), true);
                                                                }));
                                                  }));
                                            return Wonder_jest.test("test fs", (function (param) {
                                                          var match = RenderInJobTool$Wonderjs.prepareForJudgeGLSLNotExec(sandbox, state[0]);
                                                          DirectorTool$Wonderjs.init(match[0]);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getFsSourceByCount(match[1], 2), /* :: */[
                                                                              "uniform vec3 u_outlineColor;",
                                                                              /* :: */[
                                                                                "gl_FragColor = vec4(u_outlineColor, 1.0);",
                                                                                /* [] */0
                                                                              ]
                                                                            ])), true);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("prepare gl state", (function (param) {
                Wonder_jest.test("enable stencil test", (function (param) {
                        var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                        return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](enable));
                      }));
                Wonder_jest.test("set stencil op and func and mask", (function (param) {
                        var stencilOp = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var stencilFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var stencilMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(stencilMask), Caml_option.some(stencilFunc), Caml_option.some(stencilOp), undefined, undefined, /* () */0), state[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                        var __x = Sinon.getCall(0, stencilOp);
                        var __x$1 = Sinon.getCall(0, stencilFunc);
                        var __x$2 = Sinon.getCall(0, stencilMask);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        SinonTool$Wonderjs.calledWithArg3(__x, 1, 1, 2),
                                        SinonTool$Wonderjs.calledWithArg3(__x$1, 3, 1, 255),
                                        SinonTool$Wonderjs.calledWith(__x$2, 255)
                                      ]), /* tuple */[
                                    true,
                                    true,
                                    true
                                  ]);
                      }));
                Wonder_jest.test("disable depth test", (function (param) {
                        var disable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(disable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                        return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](Sinon.getCall(0, disable)));
                      }));
                return Wonder_jest.test("not write to depth buffer and color buffer", (function (param) {
                              var depthMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var colorMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(colorMask), Caml_option.some(depthMask), undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                              DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                              var __x = Sinon.getCall(0, depthMask);
                              var __x$1 = Sinon.getCall(0, colorMask);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              SinonTool$Wonderjs.calledWith(__x, false),
                                              SinonTool$Wonderjs.calledWithArg4(__x$1, false, false, false, false)
                                            ]), /* tuple */[
                                          true,
                                          true
                                        ]);
                            }));
              }));
        Wonder_jest.describe("use draw origin gameObject program", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = prepareAndExec("outline_draw_origin_gameObjects");
                              var __x = Sinon.getCall(0, match[1]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SinonTool$Wonderjs.calledWith(__x, ProgramTool$Wonderjs.unsafeGetProgram(match[2], match[0]))), true);
                            }));
              }));
        Wonder_jest.describe("draw origin gameObjects", (function (param) {
                Wonder_jest.describe("send attribute data", (function (param) {
                        Wonder_jest.describe("init vertex buffer", (function (param) {
                                return Wonder_jest.test("bufferData", (function (param) {
                                              var state$1 = state;
                                              var match = prepareGameObjects(sandbox, state$1[0]);
                                              var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              JudgeTool$Wonderjs.isGreaterOrEqualThan(Sinon.getCallCount(Sinon.withThreeArgs(1, match[3][0][1][0], 2, bufferData)), 1),
                                                              JudgeTool$Wonderjs.isGreaterOrEqualThan(Sinon.getCallCount(Sinon.withThreeArgs(1, BoxGeometryTool$Wonderjs.getBoxGeometryVertices(state$3), 2, bufferData)), 1)
                                                            ]), /* tuple */[
                                                          true,
                                                          true
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.describe("init index buffer", (function (param) {
                                      return Wonder_jest.test("bufferData", (function (param) {
                                                    var match = prepareGameObjects(sandbox, state[0]);
                                                    var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                    var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    JudgeTool$Wonderjs.isGreaterOrEqualThan(Sinon.getCallCount(Sinon.withThreeArgs(1, match[3][0][1][3], 2, bufferData)), 1),
                                                                    JudgeTool$Wonderjs.isGreaterOrEqualThan(Sinon.getCallCount(Sinon.withThreeArgs(1, BoxGeometryTool$Wonderjs.getBoxGeometryIndices(state$2), 2, bufferData)), 1)
                                                                  ]), /* tuple */[
                                                                true,
                                                                true
                                                              ]);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("send uniform data", (function (param) {
                        Wonder_jest.describe("test send data per shader", (function (param) {
                                Wonder_jest.test("send u_vMatrix", (function (param) {
                                        var match = prepareAndExecForSendVMatrix(/* () */0);
                                        return Wonder_jest.Expect[/* toBeGreaterThanOrEqual */6](1, Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(match[2], false, match[3], match[1]))));
                                      }));
                                return Wonder_jest.test("send u_pMatrix", (function (param) {
                                              var match = prepareAndExecForSendPMatrix(/* () */0);
                                              return Wonder_jest.Expect[/* toBeGreaterThanOrEqual */6](1, Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(match[2], false, match[3], match[1]))));
                                            }));
                              }));
                        return Wonder_jest.describe("test send model data", (function (param) {
                                      return Wonder_jest.test("send u_mMatrix", (function (param) {
                                                    var match = prepareAndExecForSendMMatrix(/* () */0);
                                                    var pos = match[2];
                                                    var uniformMatrix4fv = match[1];
                                                    var targetData1 = new Float32Array(/* array */[
                                                          1,
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          1,
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          1,
                                                          0,
                                                          1,
                                                          2,
                                                          3,
                                                          1
                                                        ]);
                                                    var targetData2 = new Float32Array(/* array */[
                                                          1,
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          1,
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          1,
                                                          0,
                                                          2,
                                                          3,
                                                          4,
                                                          1
                                                        ]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    Sinon.getCallCount(Sinon.withThreeArgs(pos, false, targetData1, uniformMatrix4fv)),
                                                                    Sinon.getCallCount(Sinon.withThreeArgs(pos, false, targetData2, uniformMatrix4fv))
                                                                  ]), /* tuple */[
                                                                1,
                                                                1
                                                              ]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("draw", (function (param) {
                              return Wonder_jest.test("test drawElements", (function (param) {
                                            var match = prepareAndExecForDrawElement(/* () */0);
                                            var match$1 = match[3];
                                            var triangles = match[2];
                                            var drawElements = match[1];
                                            var state = match[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            JudgeTool$Wonderjs.isGreaterOrEqualThan(Sinon.getCallCount(Sinon.withFourArgs(triangles, GeometryTool$Wonderjs.getIndicesCount(match$1[0], CreateRenderStateMainService$Wonderjs.createRenderState(state)), GeometryTool$Wonderjs.getIndexType(CreateRenderStateMainService$Wonderjs.createRenderState(state)), Caml_int32.imul(GeometryTool$Wonderjs.getIndexTypeSize(CreateRenderStateMainService$Wonderjs.createRenderState(state)), 0), drawElements)), 1),
                                                            JudgeTool$Wonderjs.isGreaterOrEqualThan(Sinon.getCallCount(Sinon.withFourArgs(triangles, GeometryTool$Wonderjs.getIndicesCount(match$1[1], CreateRenderStateMainService$Wonderjs.createRenderState(state)), GeometryTool$Wonderjs.getIndexType(CreateRenderStateMainService$Wonderjs.createRenderState(state)), Caml_int32.imul(GeometryTool$Wonderjs.getIndexTypeSize(CreateRenderStateMainService$Wonderjs.createRenderState(state)), 0), drawElements)), 1)
                                                          ]), /* tuple */[
                                                        true,
                                                        true
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("clear last send component", (function (param) {
                return Wonder_jest.describe("clear lastSendGeometryData", (function (param) {
                              return Wonder_jest.test("send a_position twice", (function (param) {
                                            var match = prepareOneGameObject(sandbox, state[0]);
                                            var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, "a_position");
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withTwoArgs(0, 3, vertexAttribPointer))), 2);
                                          }));
                            }));
              }));
        Wonder_jest.describe("set gl state before draw expand gameObjects", (function (param) {
                Wonder_jest.test("set stencil func and mask", (function (param) {
                        var stencilFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var stencilMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(stencilMask), Caml_option.some(stencilFunc), undefined, undefined, undefined, /* () */0), state[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                        var __x = Sinon.getCall(1, stencilFunc);
                        var __x$1 = Sinon.getCall(1, stencilMask);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        SinonTool$Wonderjs.calledWithArg3(__x, 1, 1, 255),
                                        SinonTool$Wonderjs.calledWith(__x$1, 0)
                                      ]), /* tuple */[
                                    true,
                                    true
                                  ]);
                      }));
                Wonder_jest.test("not set side to back", (function (param) {
                        var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enable), undefined, Caml_option.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SinonTool$Wonderjs.calledWith(cullFace, 1)), false);
                      }));
                Wonder_jest.test("disable depth test", (function (param) {
                        var disable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(disable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                        DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                        return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](Sinon.getCall(0, disable)));
                      }));
                return Wonder_jest.test("not write to depth buffer and color buffer", (function (param) {
                              var depthMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var colorMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(colorMask), Caml_option.some(depthMask), undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                              DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(Sinon.withOneArg(false, depthMask)),
                                              Sinon.getCallCount(Sinon.withFourArgs(false, false, false, false, colorMask))
                                            ]), /* tuple */[
                                          1,
                                          1
                                        ]);
                            }));
              }));
        Wonder_jest.describe("draw expand gameObjects", (function (param) {
                Wonder_jest.describe("send attribute data", (function (param) {
                        return Wonder_jest.describe("send buffer", (function (param) {
                                      var _testSend = function (name, callCount) {
                                        var match = prepareGameObjects(sandbox, state[0]);
                                        var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, name);
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                        DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withTwoArgs(0, 3, vertexAttribPointer))), callCount);
                                      };
                                      Wonder_jest.describe("send a_position", (function (param) {
                                              return Wonder_jest.test("attach buffer to attribute", (function (param) {
                                                            return _testSend("a_position", 4);
                                                          }));
                                            }));
                                      return Wonder_jest.describe("send a_normal", (function (param) {
                                                    return Wonder_jest.test("attach buffer to attribute", (function (param) {
                                                                  return _testSend("a_normal", 2);
                                                                }));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("send uniform data", (function (param) {
                        Wonder_jest.describe("test send data per shader", (function (param) {
                                Wonder_jest.test("send u_vMatrix", (function (param) {
                                        var match = prepareAndExecForSendVMatrix(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(match[2], false, match[3], match[1]))), 2);
                                      }));
                                return Wonder_jest.test("send u_pMatrix", (function (param) {
                                              var match = prepareAndExecForSendPMatrix(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withThreeArgs(match[2], false, match[3], match[1]))), 2);
                                            }));
                              }));
                        Wonder_jest.test("send u_outlineColor", (function (param) {
                                var match = prepareGameObjects(sandbox, state[0]);
                                var color = /* array */[
                                  0.1,
                                  0.1,
                                  0.2
                                ];
                                var state$1 = JobDataAPI$Wonderjs.setOutlineColor(color, match[0]);
                                var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_outlineColor");
                                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$2));
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withFourArgs(0, Caml_array.caml_array_get(color, 0), Caml_array.caml_array_get(color, 1), Caml_array.caml_array_get(color, 2), uniform3f))), 1);
                              }));
                        return Wonder_jest.describe("test send model data", (function (param) {
                                      return Wonder_jest.test("send scaled u_mMatrix", (function (param) {
                                                    var match = prepareAndExecForSendMMatrix(/* () */0);
                                                    var pos = match[2];
                                                    var uniformMatrix4fv = match[1];
                                                    var scaleVectorForScaledModelMatrix = DrawOutlineJobTool$Wonderjs.getScaleVectorForScaledModelMatrix(/* () */0);
                                                    var __x = new Float32Array(/* array */[
                                                          1,
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          1,
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          1,
                                                          0,
                                                          1,
                                                          2,
                                                          3,
                                                          1
                                                        ]);
                                                    var targetData1 = Matrix4Service$Wonderjs.scale(scaleVectorForScaledModelMatrix, __x, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0));
                                                    var __x$1 = new Float32Array(/* array */[
                                                          1,
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          1,
                                                          0,
                                                          0,
                                                          0,
                                                          0,
                                                          1,
                                                          0,
                                                          2,
                                                          3,
                                                          4,
                                                          1
                                                        ]);
                                                    var targetData2 = Matrix4Service$Wonderjs.scale(scaleVectorForScaledModelMatrix, __x$1, Matrix4Service$Wonderjs.createIdentityMatrix4(/* () */0));
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    Sinon.getCallCount(Sinon.withThreeArgs(pos, false, targetData1, uniformMatrix4fv)),
                                                                    Sinon.getCallCount(Sinon.withThreeArgs(pos, false, targetData2, uniformMatrix4fv))
                                                                  ]), /* tuple */[
                                                                1,
                                                                1
                                                              ]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("draw", (function (param) {
                              return Wonder_jest.test("test drawElements", (function (param) {
                                            var match = prepareAndExecForDrawElement(/* () */0);
                                            var match$1 = match[3];
                                            var triangles = match[2];
                                            var drawElements = match[1];
                                            var state = match[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            Sinon.getCallCount(Sinon.withFourArgs(triangles, GeometryTool$Wonderjs.getIndicesCount(match$1[0], CreateRenderStateMainService$Wonderjs.createRenderState(state)), GeometryTool$Wonderjs.getIndexType(CreateRenderStateMainService$Wonderjs.createRenderState(state)), Caml_int32.imul(GeometryTool$Wonderjs.getIndexTypeSize(CreateRenderStateMainService$Wonderjs.createRenderState(state)), 0), drawElements)),
                                                            Sinon.getCallCount(Sinon.withFourArgs(triangles, GeometryTool$Wonderjs.getIndicesCount(match$1[1], CreateRenderStateMainService$Wonderjs.createRenderState(state)), GeometryTool$Wonderjs.getIndexType(CreateRenderStateMainService$Wonderjs.createRenderState(state)), Caml_int32.imul(GeometryTool$Wonderjs.getIndexTypeSize(CreateRenderStateMainService$Wonderjs.createRenderState(state)), 0), drawElements))
                                                          ]), /* tuple */[
                                                        2,
                                                        2
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("use draw expand gameObject program", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = prepareAndExec("outline_draw_expand_gameObjects");
                              var __x = Sinon.getCall(1, match[1]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SinonTool$Wonderjs.calledWith(__x, ProgramTool$Wonderjs.unsafeGetProgram(match[2], match[0]))), true);
                            }));
              }));
        return Wonder_jest.describe("restore gl state", (function (param) {
                      Wonder_jest.test("disable stencil test", (function (param) {
                              var disable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(disable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                              DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                              return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](Sinon.getCall(1, disable)));
                            }));
                      Wonder_jest.test("set stencil mask", (function (param) {
                              var stencilMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(stencilMask), undefined, undefined, undefined, undefined, /* () */0), state[0]);
                              DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                              var __x = Sinon.getCall(2, stencilMask);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SinonTool$Wonderjs.calledWith(__x, 255)), true);
                            }));
                      Wonder_jest.test("enable depth test", (function (param) {
                              var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                              DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                              return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](Sinon.getCall(1, enable)));
                            }));
                      return Wonder_jest.test("write to depth buffer and color buffer", (function (param) {
                                    var depthMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                    var colorMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(colorMask), Caml_option.some(depthMask), undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                    DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(state$1));
                                    var __x = Sinon.getCall(1, depthMask);
                                    var __x$1 = Sinon.getCall(1, colorMask);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    SinonTool$Wonderjs.calledWith(__x, true),
                                                    SinonTool$Wonderjs.calledWithArg4(__x$1, true, true, true, true)
                                                  ]), /* tuple */[
                                                true,
                                                true
                                              ]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
