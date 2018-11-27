'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLBTool$Wonderjs = require("../tool/GLBTool.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var ConvertTool$Wonderjs = require("../tool/ConvertTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var AssembleWDBSystemTool$Wonderjs = require("../tool/AssembleWDBSystemTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");

describe("fix assemble wdb bug", (function () {
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
        describe("test dispose gameObject before assemble", (function () {
                return Wonder_jest.testPromise("all components should create component from disposedIndexArray when assemble except basicSourceTexture component", (function () {
                              var match = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, state[0]);
                              var geometry1 = match[2];
                              var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithCreatedMap(sandbox, match[0]);
                              var specularMap2 = match$1[5][1];
                              var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                              var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                              var state$3 = GameObjectAPI$Wonderjs.disposeGameObject(match[1], state$2);
                              var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                            var rootGameObject = param[2];
                                            var state = param[0];
                                            var state$1 = ArrayService$WonderCommonlib.reduceOneParam((function (state, gameObject) {
                                                    return GameObjectAPI$Wonderjs.initGameObject(gameObject, state);
                                                  }), state, AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, state));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            AssembleWDBSystemTool$Wonderjs.getAllGeometrys(rootGameObject, state$1),
                                                            AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(rootGameObject, state$1)
                                                          ]), /* tuple */[
                                                        /* array */[geometry1],
                                                        /* array */[specularMap2 + 1 | 0]
                                                      ]);
                                          }), state$4);
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
