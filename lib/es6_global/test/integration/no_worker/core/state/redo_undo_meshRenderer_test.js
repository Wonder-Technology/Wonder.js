

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as RedoUndoTool$Wonderjs from "./tool/RedoUndoTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as AllMaterialTool$Wonderjs from "../../../../tool/service/material/AllMaterialTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as MeshRendererTool$Wonderjs from "../../../../tool/service/meshRenderer/MeshRendererTool.js";
import * as LoopRenderJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/LoopRenderJobTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";

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

export {
  
}
/*  Not a pure module */
