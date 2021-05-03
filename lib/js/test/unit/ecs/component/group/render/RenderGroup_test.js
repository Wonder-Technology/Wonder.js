'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../../tool/gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../../../../tool/core/DirectorTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var RenderGroupAPI$Wonderjs = require("../../../../../../src/api/group/render/RenderGroupAPI.js");
var RenderJobsTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../../src/api/MeshRendererAPI.js");
var RenderGroupTool$Wonderjs = require("../../../../../tool/service/group/RenderGroupTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../../src/api/material/BasicMaterialAPI.js");
var GLSLLocationTool$Wonderjs = require("../../../../../tool/service/location/GLSLLocationTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../../src/api/material/LightMaterialAPI.js");
var MeshRendererTool$Wonderjs = require("../../../../../tool/service/meshRenderer/MeshRendererTool.js");
var LightMaterialTool$Wonderjs = require("../../../../../tool/service/material/LightMaterialTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var PregetGLSLDataTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/PregetGLSLDataTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../../tool/job/render_basic/RenderBasicJobTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");

Wonder_jest.describe("RenderGroup", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("createRenderGroup", (function (param) {
                Wonder_jest.test("create meshRenderer and material", (function (param) {
                        var match = RenderGroupTool$Wonderjs.createRenderGroup(state[0]);
                        var match$1 = match[1];
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        match$1[/* meshRenderer */0],
                                        match$1[/* material */1]
                                      ]), /* tuple */[
                                    0,
                                    0
                                  ]);
                      }));
                return Wonder_jest.describe("change state", (function (param) {
                              return Wonder_jest.test("state->index + 1", (function (param) {
                                            var match = RenderGroupTool$Wonderjs.createRenderGroup(state[0]);
                                            var state$1 = match[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            MeshRendererTool$Wonderjs.getRecord(state$1)[/* index */0],
                                                            LightMaterialTool$Wonderjs.getRecord(state$1)[/* index */0]
                                                          ]), /* tuple */[
                                                        1,
                                                        1
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("addRenderGroupComponents", (function (param) {
                return Wonder_jest.test("add meshRenderer and material component", (function (param) {
                              var match = RenderGroupTool$Wonderjs.createRenderGroup(state[0]);
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = RenderGroupTool$Wonderjs.addGameObjectRenderGroupComponents(gameObject, match[1], match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent(gameObject, state$1),
                                              GameObjectAPI$Wonderjs.hasGameObjectLightMaterialComponent(gameObject, state$1)
                                            ]), /* tuple */[
                                          true,
                                          true
                                        ]);
                            }));
              }));
        Wonder_jest.describe("disposeGameObjectRenderGroupComponents", (function (param) {
                return Wonder_jest.test("dispose meshRenderer and material component", (function (param) {
                              var match = RenderGroupTool$Wonderjs.createRenderGroup(state[0]);
                              var renderGroup = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = RenderGroupTool$Wonderjs.addGameObjectRenderGroupComponents(gameObject, renderGroup, match$1[0]);
                              var state$2 = RenderGroupTool$Wonderjs.disposeGameObjectRenderGroupComponents(gameObject, renderGroup, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent(gameObject, state$2),
                                              GameObjectAPI$Wonderjs.hasGameObjectLightMaterialComponent(gameObject, state$2)
                                            ]), /* tuple */[
                                          false,
                                          false
                                        ]);
                            }));
              }));
        Wonder_jest.describe("unsafeGetGameObjectRenderGroupComponents", (function (param) {
                return Wonder_jest.test("unsafe get meshRenderer and material components", (function (param) {
                              var match = RenderGroupTool$Wonderjs.createRenderGroup(state[0]);
                              var renderGroup = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = RenderGroupTool$Wonderjs.addGameObjectRenderGroupComponents(gameObject, renderGroup, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](RenderGroupTool$Wonderjs.unsafeGetGameObjectRenderGroupComponents(gameObject, state$1)), renderGroup);
                            }));
              }));
        Wonder_jest.describe("hasGameObjectRenderGroupComponents", (function (param) {
                return Wonder_jest.test("has meshRenderer and material components", (function (param) {
                              var match = RenderGroupTool$Wonderjs.createRenderGroup(state[0]);
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = RenderGroupTool$Wonderjs.addGameObjectRenderGroupComponents(gameObject, match[1], match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](RenderGroupTool$Wonderjs.hasGameObjectRenderGroupComponents(gameObject, state$1)), true);
                            }));
              }));
        return Wonder_jest.describe("replaceMaterial", (function (param) {
                      Wonder_jest.describe("replace material components", (function (param) {
                              Wonder_jest.test("test replace basic material to light material", (function (param) {
                                      state[0] = RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                                      var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                      var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                      var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_diffuse");
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                      var match$2 = RenderGroupAPI$Wonderjs.createRenderGroup(/* tuple */[
                                            MeshRendererAPI$Wonderjs.createMeshRenderer,
                                            LightMaterialAPI$Wonderjs.createLightMaterial
                                          ], state$2);
                                      var state$3 = RenderGroupAPI$Wonderjs.replaceMaterial(/* tuple */[
                                            RenderGroupTool$Wonderjs.buildRenderGroup(match[4], match[3]),
                                            match$2[1]
                                          ], match[1], /* tuple */[
                                            GameObjectAPI$Wonderjs.disposeGameObjectBasicMaterialComponent,
                                            GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent
                                          ], match$2[0]);
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, uniform3f))), 1);
                                    }));
                              return Wonder_jest.test("test replace light material to basic material", (function (param) {
                                            state[0] = RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                                            var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                            var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                            var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_color");
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                            var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                            var match$2 = RenderGroupAPI$Wonderjs.createRenderGroup(/* tuple */[
                                                  MeshRendererAPI$Wonderjs.createMeshRenderer,
                                                  BasicMaterialAPI$Wonderjs.createBasicMaterial
                                                ], state$2);
                                            var state$3 = RenderGroupAPI$Wonderjs.replaceMaterial(/* tuple */[
                                                  RenderGroupTool$Wonderjs.buildRenderGroup(match[4], match[3]),
                                                  match$2[1]
                                                ], match[1], /* tuple */[
                                                  GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent,
                                                  GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent
                                                ], match$2[0]);
                                            DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, uniform3f))), 1);
                                          }));
                            }));
                      return Wonder_jest.describe("not replace meshRenderer", (function (param) {
                                    var _prepare = function (state) {
                                      var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                      var state$1 = DirectorTool$Wonderjs.init(match[0]);
                                      var match$1 = RenderGroupAPI$Wonderjs.createRenderGroup(/* tuple */[
                                            MeshRendererAPI$Wonderjs.createMeshRenderer,
                                            BasicMaterialAPI$Wonderjs.createBasicMaterial
                                          ], state$1);
                                      var state$2 = PregetGLSLDataTool$Wonderjs.preparePrecision(match$1[0]);
                                      return /* tuple */[
                                              state$2,
                                              match[1],
                                              match[4],
                                              match[3],
                                              match$1[1]
                                            ];
                                    };
                                    var _prepareAndExec = function (state) {
                                      var match = _prepare(state);
                                      var meshRenderer1 = match[2];
                                      var gameObject1 = match[1];
                                      var state$1 = RenderGroupAPI$Wonderjs.replaceMaterial(/* tuple */[
                                            RenderGroupTool$Wonderjs.buildRenderGroup(meshRenderer1, match[3]),
                                            match[4]
                                          ], gameObject1, /* tuple */[
                                            GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent,
                                            GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent
                                          ], match[0]);
                                      return /* tuple */[
                                              state$1,
                                              gameObject1,
                                              meshRenderer1
                                            ];
                                    };
                                    beforeEach((function () {
                                            state[0] = PregetGLSLDataTool$Wonderjs.preparePrecision(FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0))));
                                            return /* () */0;
                                          }));
                                    Wonder_jest.test("meshRenderer shouldn't be relpace", (function (param) {
                                            var match = _prepareAndExec(state);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(match[1], match[0])), match[2]);
                                          }));
                                    Wonder_jest.test("update renderIndexArray", (function (param) {
                                            var match = _prepareAndExec(state);
                                            var state$1 = match[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$1),
                                                            MeshRendererTool$Wonderjs.getLightMaterialRenderGameObjectArray(state$1)
                                                          ]), /* tuple */[
                                                        /* array */[match[1]],
                                                        /* array */[]
                                                      ]);
                                          }));
                                    return Wonder_jest.test("meshRenderer->drawMode not change", (function (param) {
                                                  var match = _prepare(state);
                                                  var meshRenderer1 = match[2];
                                                  var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(meshRenderer1, 1, match[0]);
                                                  var state$2 = RenderGroupAPI$Wonderjs.replaceMaterial(/* tuple */[
                                                        RenderGroupTool$Wonderjs.buildRenderGroup(meshRenderer1, match[3]),
                                                        match[4]
                                                      ], match[1], /* tuple */[
                                                        GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent,
                                                        GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent
                                                      ], state$1);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(meshRenderer1, state$2)), 1);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
