'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../../tool/gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../../../../tool/core/DirectorTool.js");
var GeometryTool$Wonderjs = require("../../../../../tool/service/geometry/GeometryTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var RenderJobsTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../../tool/service/geometry/BoxGeometryTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../../src/api/MeshRendererAPI.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../../src/api/material/BasicMaterialAPI.js");
var LoopRenderJobTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");

Wonder_jest.describe("test render basic + gameObjects with different geometry", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var prepareGameObjects = function (sandbox, state) {
          var match = BoxGeometryTool$Wonderjs.createGameObject(state);
          var gameObject1 = match[1];
          var match$1 = GeometryTool$Wonderjs.createGameObjectAndSetPointData(match[0]);
          var match$2 = match$1[3];
          var gameObject2 = match$1[1];
          var match$3 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match$1[0]);
          var material1 = match$3[1];
          var match$4 = BasicMaterialAPI$Wonderjs.createBasicMaterial(match$3[0]);
          var material2 = match$4[1];
          var match$5 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$4[0]);
          var meshRenderer1 = match$5[1];
          var match$6 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$5[0]);
          var meshRenderer2 = match$6[1];
          var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject1, meshRenderer1, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject1, material1, match$6[0]));
          var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject2, meshRenderer2, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject2, material2, state$1));
          return /* tuple */[
                  state$2,
                  /* tuple */[
                    gameObject1,
                    gameObject2
                  ],
                  /* tuple */[
                    match[2],
                    /* tuple */[
                      match$1[2],
                      match$2[0],
                      match$2[1],
                      match$2[2],
                      match$2[3]
                    ]
                  ],
                  /* tuple */[
                    material1,
                    material2
                  ],
                  /* tuple */[
                    meshRenderer1,
                    meshRenderer2
                  ]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("send attribute record", (function (param) {
                      return Wonder_jest.describe("init vbo buffers when first send", (function (param) {
                                    var _prepare = function (sandbox, state) {
                                      var match = prepareGameObjects(sandbox, state);
                                      var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                      return /* tuple */[
                                              match$1[0],
                                              match[2]
                                            ];
                                    };
                                    Wonder_jest.test("create buffer", (function (param) {
                                            var match = _prepare(sandbox, state[0]);
                                            var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                            DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createBuffer)), 4);
                                          }));
                                    Wonder_jest.describe("init vertex buffer", (function (param) {
                                            Wonder_jest.test("bufferData", (function (param) {
                                                    var match = _prepare(sandbox, state[0]);
                                                    var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                    var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                    var vertices = BoxGeometryTool$Wonderjs.getBoxGeometryVertices(state$2);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    Sinon.getCallCount(Sinon.withThreeArgs(1, vertices, 2, bufferData)),
                                                                    Sinon.getCallCount(Sinon.withThreeArgs(1, match[1][1][1], 2, bufferData))
                                                                  ]), /* tuple */[
                                                                1,
                                                                1
                                                              ]);
                                                  }));
                                            return Wonder_jest.test("bind buffer and unbind buffer", (function (param) {
                                                          var match = _prepare(sandbox, state[0]);
                                                          var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                          DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(1, bindBuffer))), 6);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("init index buffer", (function (param) {
                                                  Wonder_jest.test("bufferData", (function (param) {
                                                          var match = _prepare(sandbox, state[0]);
                                                          var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                          var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                          var indices = BoxGeometryTool$Wonderjs.getBoxGeometryIndices(state$2);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          Sinon.getCallCount(Sinon.withThreeArgs(1, indices, 2, bufferData)),
                                                                          Sinon.getCallCount(Sinon.withThreeArgs(1, match[1][1][4], 2, bufferData))
                                                                        ]), /* tuple */[
                                                                      1,
                                                                      1
                                                                    ]);
                                                        }));
                                                  return Wonder_jest.test("bind buffer and unbind buffer", (function (param) {
                                                                var match = _prepare(sandbox, state[0]);
                                                                var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(1, bindBuffer))), 6);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
