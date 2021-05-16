'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var RedoUndoTool$Wonderjs = require("./tool/RedoUndoTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var AllMaterialTool$Wonderjs = require("../../../../tool/service/material/AllMaterialTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../src/api/MeshRendererAPI.js");
var MeshRendererTool$Wonderjs = require("../../../../tool/service/meshRenderer/MeshRendererTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");

Wonder_jest.describe("test redo,undo meshRenderer", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        var _prepareMeshRendererData = function (state) {
          var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
          var match$1 = MeshRendererTool$Wonderjs.createLightMaterialGameObject(match[0]);
          var match$2 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match$1[0]);
          var meshRenderer3 = match$2[2];
          var gameObject3 = match$2[1];
          var state$1 = GameObjectTool$Wonderjs.disposeGameObjectMeshRendererComponent(gameObject3, meshRenderer3, match$2[0]);
          return /* tuple */[
                  state$1,
                  match[1],
                  match$1[1],
                  gameObject3,
                  match[2],
                  match$1[2],
                  meshRenderer3
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
        Wonder_jest.describe("deep copy meshRenderer record", (function (param) {
                Wonder_jest.test("shadow copy basicMaterialRenderGameObjectMap,lightMaterialRenderGameObjectMap, gameObjectMap, disposedIndexArray", (function (param) {
                        return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                      var match = MeshRendererTool$Wonderjs.getRecord(state);
                                      return /* array */[
                                              match[/* basicMaterialRenderGameObjectMap */4],
                                              match[/* lightMaterialRenderGameObjectMap */5],
                                              match[/* gameObjectMap */6],
                                              match[/* disposedIndexArray */7]
                                            ];
                                    }), state[0]);
                      }));
                Wonder_jest.test("copy drawModes", (function (param) {
                        return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                    MeshRendererTool$Wonderjs.createBasicMaterialGameObject,
                                    MeshRendererAPI$Wonderjs.getMeshRendererDrawMode,
                                    MeshRendererAPI$Wonderjs.setMeshRendererDrawMode,
                                    (function (param) {
                                        return /* tuple */[
                                                /* Lines */1,
                                                /* Points */0
                                              ];
                                      })
                                  ], state);
                      }));
                return Wonder_jest.test("copy isRenders", (function (param) {
                              return RedoUndoTool$Wonderjs.testCopyTypeArraySingleValue(/* tuple */[
                                          MeshRendererTool$Wonderjs.createBasicMaterialGameObject,
                                          MeshRendererAPI$Wonderjs.getMeshRendererIsRender,
                                          MeshRendererAPI$Wonderjs.setMeshRendererIsRender,
                                          (function (param) {
                                              return /* tuple */[
                                                      MeshRendererTool$Wonderjs.getDefaultIsRender(/* () */0),
                                                      !MeshRendererTool$Wonderjs.getDefaultIsRender(/* () */0)
                                                    ];
                                            })
                                        ], state);
                            }));
              }));
        return Wonder_jest.describe("restore meshRenderer record to target state", (function (param) {
                      var _prepare = function (state) {
                        var match = _prepareMeshRendererData(state);
                        var state$1 = AllMaterialTool$Wonderjs.prepareForInit(match[0]);
                        var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                        var currentState = AllMaterialTool$Wonderjs.pregetGLSLData(match$1[0]);
                        return /* tuple */[
                                /* tuple */[
                                  state$1,
                                  match[1],
                                  match[2],
                                  match[3],
                                  match[4],
                                  match[5],
                                  match[6]
                                ],
                                /* tuple */[
                                  currentState,
                                  match$1[1],
                                  match$1[2]
                                ]
                              ];
                      };
                      Wonder_jest.test("set restored state to stateData", (function (param) {
                              var match = _prepare(state);
                              var currentState = MainStateTool$Wonderjs.restore(match[1][0], match[0][0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainStateTool$Wonderjs.unsafeGetState(/* () */0)), currentState);
                            }));
                      Wonder_jest.test("change restored state should affect source state", (function (param) {
                              var match = _prepare(state);
                              var state$1 = match[0][0];
                              MainStateTool$Wonderjs.restore(match[1][0], state$1);
                              var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererAPI$Wonderjs.unsafeGetMeshRendererGameObject(match$1[2], state$1)), match$1[1]);
                            }));
                      Wonder_jest.test("changing restored state which is restored from deep copied state shouldn't affect source state", (function (param) {
                              var match = _prepare(state);
                              var match$1 = match[0];
                              var state$1 = match$1[0];
                              var currentState = MainStateTool$Wonderjs.restore(match[1][0], MainStateTool$Wonderjs.deepCopyForRestore(state$1));
                              MeshRendererTool$Wonderjs.createBasicMaterialGameObject(currentState);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(state$1),
                                              MeshRendererTool$Wonderjs.getLightMaterialRenderGameObjectArray(state$1)
                                            ]), /* tuple */[
                                          /* array */[match$1[1]],
                                          /* array */[match$1[2]]
                                        ]);
                            }));
                      return Wonder_jest.test("test restore typeArrays", (function (param) {
                                    state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                    var match = _prepareMeshRendererData(state);
                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                    var state$2 = AllMaterialTool$Wonderjs.pregetGLSLData(state$1);
                                    var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                    var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state$2);
                                    var material4 = match$1[2];
                                    var currentState = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(material4, !MeshRendererTool$Wonderjs.getDefaultIsRender(/* () */0), MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(material4, MeshRendererTool$Wonderjs.getLines(/* () */0), match$1[0]));
                                    MainStateTool$Wonderjs.restore(currentState, copiedState);
                                    var defaultDrawMode = MeshRendererTool$Wonderjs.getDefaultDrawMode(/* () */0);
                                    var defaultIsRender = MeshRendererTool$Wonderjs.getDefaultIsRenderUint8(/* () */0);
                                    var match$2 = MeshRendererTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    match$2[/* drawModes */2],
                                                    match$2[/* isRenders */3]
                                                  ]), /* tuple */[
                                                new Uint8Array(/* array */[
                                                      defaultDrawMode,
                                                      defaultDrawMode,
                                                      defaultDrawMode,
                                                      defaultDrawMode
                                                    ]),
                                                new Uint8Array(/* array */[
                                                      defaultIsRender,
                                                      defaultIsRender,
                                                      defaultIsRender,
                                                      defaultIsRender
                                                    ])
                                              ]);
                                  }));
                    }));
      }));

/*  Not a pure module */
