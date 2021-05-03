

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as ShaderTool$Wonderjs from "../../../../tool/service/shader/ShaderTool.js";
import * as ProgramTool$Wonderjs from "../../../../tool/service/program/ProgramTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as GLSLSenderTool$Wonderjs from "../../../../tool/service/sender/GLSLSenderTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as AllMaterialTool$Wonderjs from "../../../../tool/service/material/AllMaterialTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as GLSLLocationTool$Wonderjs from "../../../../tool/service/location/GLSLLocationTool.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as InitRenderJobTool$Wonderjs from "../../../../tool/job/no_worker/init/InitRenderJobTool.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as SourceInstanceAPI$Wonderjs from "../../../../../src/api/SourceInstanceAPI.js";
import * as DirectionLightTool$Wonderjs from "../../../../tool/service/light/DirectionLightTool.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs from "../../../tool/job/FrontRenderLightForNoWorkerAndWorkerJobTool.js";

Wonder_jest.describe("test redo,undo shader data", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _prepareShaderData = function (state) {
          var record = ShaderTool$Wonderjs.getShaderRecord(state);
          record[/* index */0] = 2;
          MutableHashMapService$WonderCommonlib.set("key1", 0, record[/* shaderLibShaderIndexMap */2]);
          MutableHashMapService$WonderCommonlib.set("key2", 1, record[/* shaderLibShaderIndexMap */2]);
          return /* tuple */[
                  state,
                  0,
                  1
                ];
        };
        var _prepareProgramData = function (state) {
          var record = ProgramTool$Wonderjs.getProgramRecord(state);
          MutableSparseMapService$WonderCommonlib.set(0, 11, record[/* programMap */0]);
          record[/* lastUsedProgram */1] = 11;
          return /* tuple */[
                  state,
                  0,
                  11
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, InitRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0), undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("deepCopyForRestore", (function (param) {
                Wonder_jest.describe("deep copy shader record", (function (param) {
                        return Wonder_jest.test("deep copy materialsMap", (function (param) {
                                      var match = ShaderTool$Wonderjs.getShaderRecord(state[0]);
                                      var materialsMap = match[/* materialsMap */3];
                                      var originMaterialArr = /* array */[1];
                                      var copiedOriginMaterialArr = originMaterialArr.slice();
                                      MutableSparseMapService$WonderCommonlib.set(0, originMaterialArr, materialsMap);
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state[0]);
                                      var match$1 = ShaderTool$Wonderjs.getShaderRecord(copiedState);
                                      var materialsMap$1 = match$1[/* materialsMap */3];
                                      var arr = MutableSparseMapService$WonderCommonlib.unsafeGet(0, materialsMap$1);
                                      arr[0] = 2;
                                      var match$2 = ShaderTool$Wonderjs.getShaderRecord(state[0]);
                                      var materialsMap$2 = match$2[/* materialsMap */3];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.unsafeGet(0, materialsMap$2)), copiedOriginMaterialArr);
                                    }));
                      }));
                return Wonder_jest.describe("deep copy glsl sender record", (function (param) {
                              Wonder_jest.test("copy all send data maps", (function (param) {
                                      var match = state[0][/* glslSenderRecord */32];
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state[0]);
                                      MutableSparseMapService$WonderCommonlib.set(10, 100, match[/* attributeSendDataMap */0]);
                                      MutableSparseMapService$WonderCommonlib.set(10, 100, match[/* instanceAttributeSendDataMap */1]);
                                      MutableSparseMapService$WonderCommonlib.set(10, 100, match[/* uniformRenderObjectSendModelDataMap */3]);
                                      MutableSparseMapService$WonderCommonlib.set(10, 100, match[/* uniformRenderObjectSendMaterialDataMap */4]);
                                      MutableSparseMapService$WonderCommonlib.set(10, 100, match[/* uniformShaderSendNoCachableDataMap */5]);
                                      MutableSparseMapService$WonderCommonlib.set(10, 100, match[/* uniformShaderSendCachableDataMap */6]);
                                      MutableSparseMapService$WonderCommonlib.set(10, 100, match[/* uniformShaderSendCachableFunctionDataMap */7]);
                                      MutableSparseMapService$WonderCommonlib.set(10, 100, match[/* uniformInstanceSendNoCachableDataMap */8]);
                                      MutableSparseMapService$WonderCommonlib.set(10, 100, match[/* uniformNoMaterialShaderSendCachableDataMap */9]);
                                      var match$1 = copiedState[/* glslSenderRecord */32];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      MutableSparseMapService$WonderCommonlib.has(10, match$1[/* attributeSendDataMap */0]),
                                                      MutableSparseMapService$WonderCommonlib.has(10, match$1[/* instanceAttributeSendDataMap */1]),
                                                      MutableSparseMapService$WonderCommonlib.has(10, match$1[/* uniformRenderObjectSendModelDataMap */3]),
                                                      MutableSparseMapService$WonderCommonlib.has(10, match$1[/* uniformRenderObjectSendMaterialDataMap */4]),
                                                      MutableSparseMapService$WonderCommonlib.has(10, match$1[/* uniformShaderSendNoCachableDataMap */5]),
                                                      MutableSparseMapService$WonderCommonlib.has(10, match$1[/* uniformShaderSendCachableDataMap */6]),
                                                      MutableSparseMapService$WonderCommonlib.has(10, match$1[/* uniformShaderSendCachableFunctionDataMap */7]),
                                                      MutableSparseMapService$WonderCommonlib.has(10, match$1[/* uniformInstanceSendNoCachableDataMap */8]),
                                                      MutableSparseMapService$WonderCommonlib.has(10, match$1[/* uniformNoMaterialShaderSendCachableDataMap */9])
                                                    ]), /* tuple */[
                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false,
                                                  false
                                                ]);
                                    }));
                              Wonder_jest.test("not copy uniformCacheMap", (function (param) {
                                      var match = state[0][/* glslSenderRecord */32];
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state[0]);
                                      MutableSparseMapService$WonderCommonlib.set(10, 100, match[/* uniformCacheMap */2]);
                                      var match$1 = copiedState[/* glslSenderRecord */32];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.has(10, match$1[/* uniformCacheMap */2])), true);
                                    }));
                              return Wonder_jest.test("not copy vertexAttribHistoryArray, lastSendMaterialData", (function (param) {
                                            var record = state[0][/* glslSenderRecord */32];
                                            var vertexAttribHistoryArray = record[/* vertexAttribHistoryArray */10];
                                            var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state[0]);
                                            vertexAttribHistoryArray.push(100);
                                            record[/* lastSendMaterialData */11] = 100;
                                            var match = copiedState[/* glslSenderRecord */32];
                                            var vertexAttribHistoryArray$1 = match[/* vertexAttribHistoryArray */10];
                                            var lastSendMaterialData = match[/* lastSendMaterialData */11];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            vertexAttribHistoryArray$1.length,
                                                            lastSendMaterialData
                                                          ]), /* tuple */[
                                                        1,
                                                        undefined
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("restore", (function (param) {
                      Wonder_jest.describe("restore glsl sender data to target state", (function (param) {
                              var _prepareGLSLSenderData = function (state) {
                                var match = state[/* glslSenderRecord */32];
                                var vertexAttribHistoryArray = match[/* vertexAttribHistoryArray */10];
                                MutableSparseMapService$WonderCommonlib.set(0, 0, match[/* attributeSendDataMap */0]);
                                vertexAttribHistoryArray[0] = 2;
                                return /* tuple */[
                                        state,
                                        0,
                                        0,
                                        1,
                                        2
                                      ];
                              };
                              Wonder_jest.test("clear last send data", (function (param) {
                                      var match = _prepareGLSLSenderData(state[0]);
                                      var match$1 = _prepareGLSLSenderData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                      var newState = MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                                      var match$2 = GLSLSenderTool$Wonderjs.getGLSLSenderRecord(newState);
                                      var lastSendMaterialData = match$2[/* lastSendMaterialData */11];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](lastSendMaterialData), undefined);
                                    }));
                              return Wonder_jest.test("clear vertexAttribHistoryArray", (function (param) {
                                            var match = _prepareGLSLSenderData(state[0]);
                                            var match$1 = _prepareGLSLSenderData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                            var newState = MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                                            var match$2 = GLSLSenderTool$Wonderjs.getGLSLSenderRecord(newState);
                                            var vertexAttribHistoryArray = match$2[/* vertexAttribHistoryArray */10];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](vertexAttribHistoryArray), ArrayService$WonderCommonlib.createEmpty(/* () */0));
                                          }));
                            }));
                      Wonder_jest.describe("restore shader data to target state", (function (param) {
                              return Wonder_jest.describe("contract check", (function (param) {
                                            return Wonder_jest.test("currentState and targetState ->glslRecord->precision should be the same", (function (param) {
                                                          var match = _prepareShaderData(state[0]);
                                                          var state$1 = match[0];
                                                          var currentState = MainStateTool$Wonderjs.createNewCompleteState(sandbox);
                                                          TestTool$Wonderjs.openContractCheck(/* () */0);
                                                          currentState[/* glslRecord */29][/* precision */0] = "aaa";
                                                          return Wonder_jest.Expect[/* toThrowMessage */21]("expect currentState->glslRecord->precision and targetState->glslRecord->precision be the same, but actual not", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                            MainStateTool$Wonderjs.restore(currentState, state$1);
                                                                            return /* () */0;
                                                                          })));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("restore program data to target state", (function (param) {
                              return Wonder_jest.test("clear lastUsedProgram", (function (param) {
                                            var match = _prepareProgramData(state[0]);
                                            var match$1 = _prepareProgramData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                            var newState = MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                                            var match$2 = ProgramTool$Wonderjs.getProgramRecord(newState);
                                            var lastUsedProgram = match$2[/* lastUsedProgram */1];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](lastUsedProgram), undefined);
                                          }));
                            }));
                      Wonder_jest.describe("restore gpu shader related data to target state", (function (param) {
                              Wonder_jest.describe("test init shader", (function (param) {
                                      var _prepareBasicMaterialGameObject = function (sandbox, state) {
                                        var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
                                        var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
                                        var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                        var gameObject = match$2[1];
                                        var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, match$1[1], GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, match[1], match$2[0]));
                                        return /* tuple */[
                                                state$1,
                                                gameObject
                                              ];
                                      };
                                      var _prepareInstanceGameObject = function (sandbox, state) {
                                        var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
                                        var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
                                        var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                                        var gameObject = match$2[1];
                                        var match$3 = SourceInstanceAPI$Wonderjs.createSourceInstance(match$2[0]);
                                        var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, match$1[1], GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, match[1], GameObjectAPI$Wonderjs.addGameObjectSourceInstanceComponent(gameObject, match$3[1], match$3[0])));
                                        return /* tuple */[
                                                state$1,
                                                gameObject
                                              ];
                                      };
                                      var _exec = function (currentState, copiedState, gameObject) {
                                        var currentStateCreateProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var currentState$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(currentStateCreateProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), currentState);
                                        var currentState$2 = GameObjectTool$Wonderjs.initGameObject(gameObject, currentState$1);
                                        var initShaderCount = Sinon.getCallCount(currentStateCreateProgram);
                                        MainStateTool$Wonderjs.restore(currentState$2, copiedState);
                                        return /* tuple */[
                                                currentStateCreateProgram,
                                                initShaderCount
                                              ];
                                      };
                                      Wonder_jest.test("if targetState->shader not exist in currentState->shader, not init it", (function (param) {
                                              var match = _prepareInstanceGameObject(sandbox, state[0]);
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              var state$2 = InitRenderJobTool$Wonderjs.exec(state$1);
                                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                              var currentState = MainStateTool$Wonderjs.createNewCompleteStateWithRenderConfig(sandbox);
                                              var match$1 = _prepareBasicMaterialGameObject(sandbox, currentState);
                                              var match$2 = _exec(match$1[0], copiedState, match$1[1]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match$2[0])), match$2[1]);
                                            }));
                                      return Wonder_jest.describe("else, not init it", (function (param) {
                                                    return Wonder_jest.describe("fix bug", (function (param) {
                                                                  return Wonder_jest.test("test create gameObject which has no material", (function (param) {
                                                                                var match = _prepareInstanceGameObject(sandbox, state[0]);
                                                                                var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                                                                var match$2 = _prepareBasicMaterialGameObject(sandbox, match$1[0]);
                                                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                                                                                var state$2 = InitRenderJobTool$Wonderjs.exec(state$1);
                                                                                var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                                                                var match$3 = _prepareBasicMaterialGameObject(sandbox, state$2);
                                                                                var match$4 = _exec(match$3[0], copiedState, match$3[1]);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match$4[0])), match$4[1]);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test restore data", (function (param) {
                                            var _prepareState1 = function (state) {
                                              var record = ShaderTool$Wonderjs.getShaderRecord(state);
                                              var shaderLibShaderIndexMap = record[/* shaderLibShaderIndexMap */2];
                                              record[/* index */0] = 3;
                                              MutableHashMapService$WonderCommonlib.set("key3", 2, MutableHashMapService$WonderCommonlib.set("key2", 1, MutableHashMapService$WonderCommonlib.set("key1", 0, shaderLibShaderIndexMap)));
                                              var record$1 = ProgramTool$Wonderjs.getProgramRecord(state);
                                              MutableSparseMapService$WonderCommonlib.set(1, 12, MutableSparseMapService$WonderCommonlib.set(0, 11, record$1[/* programMap */0]));
                                              record$1[/* lastUsedProgram */1] = 12;
                                              var match = GLSLLocationTool$Wonderjs.getGLSLLocationRecord(state);
                                              MutableSparseMapService$WonderCommonlib.set(1, 22, MutableSparseMapService$WonderCommonlib.set(0, 21, match[/* attributeLocationMap */0]));
                                              MutableSparseMapService$WonderCommonlib.set(1, 32, MutableSparseMapService$WonderCommonlib.set(0, 31, match[/* uniformLocationMap */1]));
                                              var match$1 = state[/* glslSenderRecord */32];
                                              MutableSparseMapService$WonderCommonlib.set(1, 122, MutableSparseMapService$WonderCommonlib.set(0, 121, match$1[/* uniformShaderSendNoCachableDataMap */5]));
                                              return /* tuple */[
                                                      state,
                                                      /* tuple */[
                                                        0,
                                                        1
                                                      ],
                                                      /* tuple */[
                                                        11,
                                                        12
                                                      ],
                                                      /* tuple */[
                                                        21,
                                                        22,
                                                        31,
                                                        32
                                                      ],
                                                      /* tuple */[
                                                        121,
                                                        122
                                                      ]
                                                    ];
                                            };
                                            var _prepareState2 = function (state) {
                                              var record = ShaderTool$Wonderjs.getShaderRecord(state);
                                              var shaderLibShaderIndexMap = record[/* shaderLibShaderIndexMap */2];
                                              record[/* index */0] = 2;
                                              MutableHashMapService$WonderCommonlib.set("key4", 4, MutableHashMapService$WonderCommonlib.set("key1", 3, shaderLibShaderIndexMap));
                                              var record$1 = ProgramTool$Wonderjs.getProgramRecord(state);
                                              MutableSparseMapService$WonderCommonlib.set(4, 102, MutableSparseMapService$WonderCommonlib.set(3, 101, record$1[/* programMap */0]));
                                              record$1[/* lastUsedProgram */1] = 102;
                                              var match = GLSLLocationTool$Wonderjs.getGLSLLocationRecord(state);
                                              MutableSparseMapService$WonderCommonlib.set(4, 202, MutableSparseMapService$WonderCommonlib.set(3, 201, match[/* attributeLocationMap */0]));
                                              MutableSparseMapService$WonderCommonlib.set(4, 302, MutableSparseMapService$WonderCommonlib.set(3, 301, match[/* uniformLocationMap */1]));
                                              var match$1 = state[/* glslSenderRecord */32];
                                              MutableSparseMapService$WonderCommonlib.set(4, 10222, MutableSparseMapService$WonderCommonlib.set(3, 10221, match$1[/* uniformShaderSendNoCachableDataMap */5]));
                                              return /* tuple */[
                                                      state,
                                                      /* tuple */[
                                                        3,
                                                        4
                                                      ],
                                                      /* tuple */[
                                                        101,
                                                        102
                                                      ],
                                                      /* tuple */[
                                                        201,
                                                        202,
                                                        301,
                                                        302
                                                      ],
                                                      /* tuple */[
                                                        10221,
                                                        10222
                                                      ]
                                                    ];
                                            };
                                            var _prepare = function (state) {
                                              var match = _prepareState1(state);
                                              var targetState = match[0];
                                              var match$1 = _prepareState2(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                              var currentState = match$1[0];
                                              var newState = MainStateTool$Wonderjs.restore(currentState, targetState);
                                              return /* tuple */[
                                                      newState,
                                                      /* tuple */[
                                                        currentState,
                                                        match$1[1],
                                                        match$1[2],
                                                        match$1[3],
                                                        match$1[4]
                                                      ],
                                                      /* tuple */[
                                                        targetState,
                                                        match[1],
                                                        match[2],
                                                        match[3],
                                                        match[4]
                                                      ]
                                                    ];
                                            };
                                            Wonder_jest.describe("test restore shader data", (function (param) {
                                                    Wonder_jest.describe("test index", (function (param) {
                                                            return Wonder_jest.test("index should be big one", (function (param) {
                                                                          var match = _prepare(state[0]);
                                                                          var match$1 = ShaderTool$Wonderjs.getShaderRecord(match[0]);
                                                                          var index = match$1[/* index */0];
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](index), Math.max(ShaderTool$Wonderjs.getShaderRecord(match[1][0])[/* index */0], ShaderTool$Wonderjs.getShaderRecord(match[2][0])[/* index */0]));
                                                                        }));
                                                          }));
                                                    return Wonder_jest.describe("test shaderLibShaderIndexMap", (function (param) {
                                                                  return Wonder_jest.test("should be target state's one", (function (param) {
                                                                                var match = _prepare(state[0]);
                                                                                var match$1 = ShaderTool$Wonderjs.getShaderRecord(match[0]);
                                                                                var shaderLibShaderIndexMap = match$1[/* shaderLibShaderIndexMap */2];
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](shaderLibShaderIndexMap), ShaderTool$Wonderjs.getShaderRecord(match[2][0])[/* shaderLibShaderIndexMap */2]);
                                                                              }));
                                                                }));
                                                  }));
                                            Wonder_jest.describe("test restore program data", (function (param) {
                                                    return Wonder_jest.describe("test programMap", (function (param) {
                                                                  return Wonder_jest.test("should be target state's one", (function (param) {
                                                                                var match = _prepare(state[0]);
                                                                                var match$1 = ProgramTool$Wonderjs.getProgramRecord(match[0]);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* programMap */0]), ProgramTool$Wonderjs.getProgramRecord(match[2][0])[/* programMap */0]);
                                                                              }));
                                                                }));
                                                  }));
                                            Wonder_jest.describe("test restore glsl location data", (function (param) {
                                                    return Wonder_jest.describe("test attributeLocationMap, uniformLocationMap", (function (param) {
                                                                  return Wonder_jest.test("should be target state's one", (function (param) {
                                                                                var match = _prepare(state[0]);
                                                                                var targetState = match[2][0];
                                                                                var match$1 = GLSLLocationTool$Wonderjs.getGLSLLocationRecord(match[0]);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                match$1[/* attributeLocationMap */0],
                                                                                                match$1[/* uniformLocationMap */1]
                                                                                              ]), /* tuple */[
                                                                                            GLSLLocationTool$Wonderjs.getGLSLLocationRecord(targetState)[/* attributeLocationMap */0],
                                                                                            GLSLLocationTool$Wonderjs.getGLSLLocationRecord(targetState)[/* uniformLocationMap */1]
                                                                                          ]);
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test restore glsl sender data", (function (param) {
                                                          return Wonder_jest.describe("test uniformShaderSendNoCachableDataMap", (function (param) {
                                                                        return Wonder_jest.test("should be target state's one", (function (param) {
                                                                                      var match = _prepare(state[0]);
                                                                                      var match$1 = GLSLSenderTool$Wonderjs.getGLSLSenderRecord(match[0]);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* uniformShaderSendNoCachableDataMap */5]), GLSLSenderTool$Wonderjs.getGLSLSenderRecord(match[2][0])[/* uniformShaderSendNoCachableDataMap */5]);
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test re-init lightMaterial", (function (param) {
                                    return Wonder_jest.describe("test restore to the state before re-init", (function (param) {
                                                  var _initMaterial = function (material, state) {
                                                    var state$1 = AllMaterialTool$Wonderjs.prepareForInit(state);
                                                    return LightMaterialTool$Wonderjs.initMaterial(material, state$1);
                                                  };
                                                  Wonder_jest.test("shader index should be the one before re-init", (function (param) {
                                                          var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                                          var material = match[2];
                                                          var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                          var state$2 = _initMaterial(material, state$1);
                                                          var beforeShaderIndex = AllMaterialTool$Wonderjs.getShaderIndex(material, state$2);
                                                          var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                                          var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match$1[1], state$2);
                                                          var state$4 = LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], state$3);
                                                          AllMaterialTool$Wonderjs.getShaderIndex(material, state$4);
                                                          var restoredState = MainStateTool$Wonderjs.restore(state$4, copiedState);
                                                          var restoredShaderIndex = AllMaterialTool$Wonderjs.getShaderIndex(material, restoredState);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](restoredShaderIndex), beforeShaderIndex);
                                                        }));
                                                  Wonder_jest.test("used program should be the one before re-init", (function (param) {
                                                          var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          Sinon.returns(1, Sinon.onCall(0, createProgram));
                                                          Sinon.returns(2, Sinon.onCall(1, createProgram));
                                                          var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                          var material = match[2];
                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(useProgram), undefined, /* () */0), match[0]);
                                                          var state$2 = _initMaterial(material, state$1);
                                                          AllMaterialTool$Wonderjs.getShaderIndex(material, state$2);
                                                          var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                                          var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match[1], state$2);
                                                          var state$4 = LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], state$3);
                                                          AllMaterialTool$Wonderjs.getShaderIndex(material, state$4);
                                                          var restoredState = MainStateTool$Wonderjs.restore(state$4, copiedState);
                                                          var restoredState$1 = DirectorTool$Wonderjs.runWithDefaultTime(restoredState);
                                                          AllMaterialTool$Wonderjs.getShaderIndex(material, restoredState$1);
                                                          return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](Sinon.getCall(0, useProgram)));
                                                        }));
                                                  return Wonder_jest.describe("test dispose direction light gameObject after restore", (function (param) {
                                                                return Wonder_jest.test("final shaderIndex should be beforeShaderIndex + 1", (function (param) {
                                                                              var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                                              var material = match[2];
                                                                              var lightGameObject = match[1];
                                                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                              var state$2 = _initMaterial(material, state$1);
                                                                              AllMaterialTool$Wonderjs.getShaderIndex(material, state$2);
                                                                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                                                              var state$3 = GameObjectTool$Wonderjs.disposeGameObject(lightGameObject, state$2);
                                                                              var state$4 = LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], state$3);
                                                                              var afterShaderIndex = AllMaterialTool$Wonderjs.getShaderIndex(material, state$4);
                                                                              var restoredState = MainStateTool$Wonderjs.restore(state$4, copiedState);
                                                                              AllMaterialTool$Wonderjs.getShaderIndex(material, restoredState);
                                                                              var restoredState$1 = GameObjectTool$Wonderjs.disposeGameObject(lightGameObject, restoredState);
                                                                              var restoredState$2 = LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], restoredState$1);
                                                                              var restoredState$3 = DirectorTool$Wonderjs.runWithDefaultTime(restoredState$2);
                                                                              var disposedRestoredShaderIndex = AllMaterialTool$Wonderjs.getShaderIndex(material, restoredState$3);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](disposedRestoredShaderIndex), afterShaderIndex + 1 | 0);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
