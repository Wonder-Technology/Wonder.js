

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$Wonderjs from "../tool/GLBTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as ConvertTool$Wonderjs from "../tool/ConvertTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as ConvertGLBTool$Wonderjs from "../tool/ConvertGLBTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as MeshRendererTool$Wonderjs from "../../../../tool/service/meshRenderer/MeshRendererTool.js";
import * as LoopRenderJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/LoopRenderJobTool.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AssembleWDBSystemTool$Wonderjs from "../tool/AssembleWDBSystemTool.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as FrontRenderLightJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js";

Wonder_jest.describe("fix assemble wdb bug", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return ConvertTool$Wonderjs.setFakeTransformCount(50);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test dispose gameObject before assemble", (function (param) {
                return Wonder_jest.testPromise("all components should create component from disposedIndexArray when assemble", undefined, (function (param) {
                              var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                              var specularMap1 = match[5][1];
                              var geometry1 = match[2];
                              var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, match[0]);
                              var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                              var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                              var state$3 = GameObjectAPI$Wonderjs.disposeGameObject(match[1], state$2);
                              var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                            var rootGameObject = param[2][0];
                                            var state = param[0];
                                            var state$1 = ArrayService$WonderCommonlib.reduceOneParam((function (state, gameObject) {
                                                    return GameObjectAPI$Wonderjs.initGameObject(gameObject, state);
                                                  }), state, AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, state));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            AssembleWDBSystemTool$Wonderjs.getAllGeometrys(rootGameObject, state$1),
                                                            AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(rootGameObject, state$1)
                                                          ]), /* tuple */[
                                                        /* array */[geometry1],
                                                        /* array */[specularMap1]
                                                      ]);
                                          }), state$4);
                            }));
              }));
        Wonder_jest.describe("test dispose gameObject after assemble", (function (param) {
                return Wonder_jest.describe("test basic source texture", (function (param) {
                              return Wonder_jest.testPromise("if the wdb use shared texture, the disposedIndexArray after dispose should has no duplicate items", undefined, (function (param) {
                                            var state$1 = state[0];
                                            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                            return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                                          var state = GameObjectTool$Wonderjs.disposeAllGameObjects(param[2][0], param[0]);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureTool$Wonderjs.getDisposedIndexArray(state)), /* array */[
                                                                      1,
                                                                      0
                                                                    ]);
                                                        }), state$2);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("should dispose gameObjects which are not exist in scene", (function (param) {
                      Wonder_jest.testPromise("test no children", undefined, (function (param) {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, "  [\n        {\n        \"nodes\": [0]\n    }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0\n        },\n        {\n            \"mesh\": 0\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                            var state = param[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2][0], state)), MeshRendererTool$Wonderjs.getLightMaterialRenderGameObjectArray(state));
                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                            }));
                      Wonder_jest.testPromise("test one child", undefined, (function (param) {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, "  [\n        {\n        \"nodes\": [0]\n    }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"children\": [\n                2\n            ]\n        },\n        {\n            \"mesh\": 0\n        },\n        {\n            \"mesh\": 0\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                            var state = param[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2][0], state)), MeshRendererTool$Wonderjs.getLightMaterialRenderGameObjectArray(state));
                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                            }));
                      return Wonder_jest.testPromise("test two children", undefined, (function (param) {
                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, "  [\n        {\n        \"nodes\": [0]\n    }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"children\": [\n                2\n            ]\n        },\n        {\n            \"mesh\": 0,\n            \"children\": [\n                3,4\n            ]\n        },\n        {\n            \"mesh\": 0\n        },\n        {\n            \"mesh\": 0\n        },\n        {\n            \"mesh\": 0\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                  var state = param[0];
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2][0], state)), MeshRendererTool$Wonderjs.getLightMaterialRenderGameObjectArray(state));
                                                }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
