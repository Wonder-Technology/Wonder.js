'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var ShaderTool$Wonderjs = require("../../../../tool/service/shader/ShaderTool.js");
var ProgramTool$Wonderjs = require("../../../../tool/service/program/ProgramTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GLSLSenderTool$Wonderjs = require("../../../../tool/service/sender/GLSLSenderTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var AllMaterialTool$Wonderjs = require("../../../../tool/service/material/AllMaterialTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../src/api/material/BasicMaterialAPI.js");
var GLSLLocationTool$Wonderjs = require("../../../../tool/service/location/GLSLLocationTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var InitRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/init/InitRenderJobTool.js");
var LightMaterialTool$Wonderjs = require("../../../../tool/service/material/LightMaterialTool.js");
var SourceInstanceAPI$Wonderjs = require("../../../../../src/api/SourceInstanceAPI.js");
var DirectionLightTool$Wonderjs = require("../../../../tool/service/light/DirectionLightTool.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var HashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/HashMapService.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");
var FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../tool/job/FrontRenderLightForNoWorkerAndWorkerJobTool.js");

describe("test redo,undo shader data", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _prepareGLSLSenderData = function (state) {
          var match = state[/* glslSenderRecord */29];
          var vertexAttribHistoryArray = match[/* vertexAttribHistoryArray */9];
          SparseMapService$WonderCommonlib.set(0, 0, match[/* attributeSendDataMap */0]);
          SparseMapService$WonderCommonlib.set(0, 2, vertexAttribHistoryArray);
          return /* tuple */[
                  state,
                  0,
                  0,
                  1,
                  2
                ];
        };
        var _prepareShaderData = function (state) {
          var record = ShaderTool$Wonderjs.getShaderRecord(state);
          record[/* index */0] = 2;
          HashMapService$WonderCommonlib.set("key1", 0, record[/* shaderIndexMap */1]);
          HashMapService$WonderCommonlib.set("key2", 1, record[/* shaderIndexMap */1]);
          return /* tuple */[
                  state,
                  0,
                  1
                ];
        };
        var _prepareProgramData = function (state) {
          var record = ProgramTool$Wonderjs.getProgramRecord(state);
          SparseMapService$WonderCommonlib.set(0, 11, record[/* programMap */0]);
          record[/* lastUsedProgram */1] = 11;
          return /* tuple */[
                  state,
                  0,
                  11
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, InitRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0), undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("deepCopyForRestore", (function () {
                return Wonder_jest.test("deep copy materialsMap", (function () {
                              var match = ShaderTool$Wonderjs.getShaderRecord(state[0]);
                              var materialsMap = match[/* materialsMap */2];
                              var originMaterialArr = /* array */[1];
                              var copiedOriginMaterialArr = originMaterialArr.slice();
                              SparseMapService$WonderCommonlib.set(0, originMaterialArr, materialsMap);
                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state[0]);
                              var match$1 = ShaderTool$Wonderjs.getShaderRecord(copiedState);
                              var materialsMap$1 = match$1[/* materialsMap */2];
                              var arr = SparseMapService$WonderCommonlib.unsafeGet(0, materialsMap$1);
                              arr[0] = 2;
                              var match$2 = ShaderTool$Wonderjs.getShaderRecord(state[0]);
                              var materialsMap$2 = match$2[/* materialsMap */2];
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$WonderCommonlib.unsafeGet(0, materialsMap$2)), copiedOriginMaterialArr);
                            }));
              }));
        describe("restore", (function () {
                describe("restore glsl sender data to target state", (function () {
                        Wonder_jest.test("clear last send data", (function () {
                                var match = _prepareGLSLSenderData(state[0]);
                                var match$1 = _prepareGLSLSenderData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                var newState = MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                                var match$2 = GLSLSenderTool$Wonderjs.getGLSLSenderRecord(newState);
                                var lastSendMaterialData = match$2[/* lastSendMaterialData */10];
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](lastSendMaterialData), undefined);
                              }));
                        return Wonder_jest.test("clear vertexAttribHistoryArray", (function () {
                                      var match = _prepareGLSLSenderData(state[0]);
                                      var match$1 = _prepareGLSLSenderData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                      var newState = MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                                      var match$2 = GLSLSenderTool$Wonderjs.getGLSLSenderRecord(newState);
                                      var vertexAttribHistoryArray = match$2[/* vertexAttribHistoryArray */9];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](vertexAttribHistoryArray), ArrayService$WonderCommonlib.createEmpty(/* () */0));
                                    }));
                      }));
                describe("restore shader data to target state", (function () {
                        describe("contract check", (function () {
                                return Wonder_jest.test("currentState and targetState ->glslRecord->precision should be the same", (function () {
                                              var match = _prepareShaderData(state[0]);
                                              var state$1 = match[0];
                                              var currentState = MainStateTool$Wonderjs.createNewCompleteState(sandbox);
                                              TestTool$Wonderjs.openContractCheck(/* () */0);
                                              currentState[/* glslRecord */26][/* precision */0] = "aaa";
                                              return Wonder_jest.Expect[/* toThrowMessage */20]("expect currentState->glslRecord->precision and targetState->glslRecord->precision be the same, but actual not", Wonder_jest.Expect[/* expect */0]((function () {
                                                                MainStateTool$Wonderjs.restore(currentState, state$1);
                                                                return /* () */0;
                                                              })));
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("restore program data to target state", (function () {
                        return Wonder_jest.test("clear lastUsedProgram", (function () {
                                      var match = _prepareProgramData(state[0]);
                                      var match$1 = _prepareProgramData(MainStateTool$Wonderjs.createNewCompleteState(sandbox));
                                      var newState = MainStateTool$Wonderjs.restore(match$1[0], match[0]);
                                      var match$2 = ProgramTool$Wonderjs.getProgramRecord(newState);
                                      var lastUsedProgram = match$2[/* lastUsedProgram */1];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](lastUsedProgram), undefined);
                                    }));
                      }));
                describe("restore gpu shader related data to target state", (function () {
                        describe("test init shader", (function () {
                                var _prepareBasicMaterialGameObject = function (_, state) {
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
                                var _prepareInstanceGameObject = function (_, state) {
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
                                  var currentState$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(currentStateCreateProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), currentState);
                                  var currentState$2 = GameObjectTool$Wonderjs.initGameObject(gameObject, currentState$1);
                                  var initShaderCount = Sinon.getCallCount(currentStateCreateProgram);
                                  MainStateTool$Wonderjs.restore(currentState$2, copiedState);
                                  return /* tuple */[
                                          currentStateCreateProgram,
                                          initShaderCount
                                        ];
                                };
                                Wonder_jest.test("if targetState->shader not exist in currentState->shader, not init it", (function () {
                                        var match = _prepareInstanceGameObject(sandbox, state[0]);
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                        var state$2 = InitRenderJobTool$Wonderjs.exec(state$1);
                                        var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                        var currentState = MainStateTool$Wonderjs.createNewCompleteStateWithRenderConfig(sandbox);
                                        var match$1 = _prepareBasicMaterialGameObject(sandbox, currentState);
                                        var match$2 = _exec(match$1[0], copiedState, match$1[1]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match$2[0])), match$2[1]);
                                      }));
                                describe("else, not init it", (function () {
                                        describe("fix bug", (function () {
                                                return Wonder_jest.test("test create gameObject which has no material", (function () {
                                                              var match = _prepareInstanceGameObject(sandbox, state[0]);
                                                              var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                                              var match$2 = _prepareBasicMaterialGameObject(sandbox, match$1[0]);
                                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                                                              var state$2 = InitRenderJobTool$Wonderjs.exec(state$1);
                                                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                                              var match$3 = _prepareBasicMaterialGameObject(sandbox, state$2);
                                                              var match$4 = _exec(match$3[0], copiedState, match$3[1]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match$4[0])), match$4[1]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test restore data", (function () {
                                var _prepareState1 = function (state) {
                                  var record = ShaderTool$Wonderjs.getShaderRecord(state);
                                  var shaderIndexMap = record[/* shaderIndexMap */1];
                                  record[/* index */0] = 3;
                                  HashMapService$WonderCommonlib.set("key3", 2, HashMapService$WonderCommonlib.set("key2", 1, HashMapService$WonderCommonlib.set("key1", 0, shaderIndexMap)));
                                  var record$1 = ProgramTool$Wonderjs.getProgramRecord(state);
                                  SparseMapService$WonderCommonlib.set(1, 12, SparseMapService$WonderCommonlib.set(0, 11, record$1[/* programMap */0]));
                                  record$1[/* lastUsedProgram */1] = 12;
                                  var match = GLSLLocationTool$Wonderjs.getGLSLLocationRecord(state);
                                  SparseMapService$WonderCommonlib.set(1, 22, SparseMapService$WonderCommonlib.set(0, 21, match[/* attributeLocationMap */0]));
                                  SparseMapService$WonderCommonlib.set(1, 32, SparseMapService$WonderCommonlib.set(0, 31, match[/* uniformLocationMap */1]));
                                  var match$1 = state[/* glslSenderRecord */29];
                                  SparseMapService$WonderCommonlib.set(1, 122, SparseMapService$WonderCommonlib.set(0, 121, match$1[/* uniformShaderSendNoCachableDataMap */5]));
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
                                  var shaderIndexMap = record[/* shaderIndexMap */1];
                                  record[/* index */0] = 2;
                                  HashMapService$WonderCommonlib.set("key4", 4, HashMapService$WonderCommonlib.set("key1", 3, shaderIndexMap));
                                  var record$1 = ProgramTool$Wonderjs.getProgramRecord(state);
                                  SparseMapService$WonderCommonlib.set(4, 102, SparseMapService$WonderCommonlib.set(3, 101, record$1[/* programMap */0]));
                                  record$1[/* lastUsedProgram */1] = 102;
                                  var match = GLSLLocationTool$Wonderjs.getGLSLLocationRecord(state);
                                  SparseMapService$WonderCommonlib.set(4, 202, SparseMapService$WonderCommonlib.set(3, 201, match[/* attributeLocationMap */0]));
                                  SparseMapService$WonderCommonlib.set(4, 302, SparseMapService$WonderCommonlib.set(3, 301, match[/* uniformLocationMap */1]));
                                  var match$1 = state[/* glslSenderRecord */29];
                                  SparseMapService$WonderCommonlib.set(4, 10222, SparseMapService$WonderCommonlib.set(3, 10221, match$1[/* uniformShaderSendNoCachableDataMap */5]));
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
                                describe("test restore shader data", (function () {
                                        describe("test index", (function () {
                                                return Wonder_jest.test("index should be big one", (function () {
                                                              var match = _prepare(state[0]);
                                                              var match$1 = ShaderTool$Wonderjs.getShaderRecord(match[0]);
                                                              var index = match$1[/* index */0];
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](index), Math.max(ShaderTool$Wonderjs.getShaderRecord(match[1][0])[/* index */0], ShaderTool$Wonderjs.getShaderRecord(match[2][0])[/* index */0]));
                                                            }));
                                              }));
                                        describe("test shaderIndexMap", (function () {
                                                return Wonder_jest.test("should be target state's one", (function () {
                                                              var match = _prepare(state[0]);
                                                              var match$1 = ShaderTool$Wonderjs.getShaderRecord(match[0]);
                                                              var shaderIndexMap = match$1[/* shaderIndexMap */1];
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](shaderIndexMap), ShaderTool$Wonderjs.getShaderRecord(match[2][0])[/* shaderIndexMap */1]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test restore program data", (function () {
                                        describe("test programMap", (function () {
                                                return Wonder_jest.test("should be target state's one", (function () {
                                                              var match = _prepare(state[0]);
                                                              var match$1 = ProgramTool$Wonderjs.getProgramRecord(match[0]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* programMap */0]), ProgramTool$Wonderjs.getProgramRecord(match[2][0])[/* programMap */0]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test restore glsl location data", (function () {
                                        describe("test attributeLocationMap, uniformLocationMap", (function () {
                                                return Wonder_jest.test("should be target state's one", (function () {
                                                              var match = _prepare(state[0]);
                                                              var targetState = match[2][0];
                                                              var match$1 = GLSLLocationTool$Wonderjs.getGLSLLocationRecord(match[0]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              match$1[/* attributeLocationMap */0],
                                                                              match$1[/* uniformLocationMap */1]
                                                                            ]), /* tuple */[
                                                                          GLSLLocationTool$Wonderjs.getGLSLLocationRecord(targetState)[/* attributeLocationMap */0],
                                                                          GLSLLocationTool$Wonderjs.getGLSLLocationRecord(targetState)[/* uniformLocationMap */1]
                                                                        ]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                describe("test restore glsl sender data", (function () {
                                        describe("test uniformShaderSendNoCachableDataMap", (function () {
                                                return Wonder_jest.test("should be target state's one", (function () {
                                                              var match = _prepare(state[0]);
                                                              var match$1 = GLSLSenderTool$Wonderjs.getGLSLSenderRecord(match[0]);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[/* uniformShaderSendNoCachableDataMap */5]), GLSLSenderTool$Wonderjs.getGLSLSenderRecord(match[2][0])[/* uniformShaderSendNoCachableDataMap */5]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test re-init lightMaterial", (function () {
                        describe("test restore to the state before re-init", (function () {
                                var _initMaterial = function (material, state) {
                                  var state$1 = AllMaterialTool$Wonderjs.prepareForInit(state);
                                  return LightMaterialTool$Wonderjs.initMaterial(material, state$1);
                                };
                                Wonder_jest.test("shader index should be the one before re-init", (function () {
                                        var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                        var material = match[2];
                                        var match$1 = DirectionLightTool$Wonderjs.createGameObject(match[0]);
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                        var state$2 = _initMaterial(material, state$1);
                                        var beforeShaderIndex = AllMaterialTool$Wonderjs.getShaderIndex(material, state$2);
                                        var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$2);
                                        var state$3 = GameObjectTool$Wonderjs.disposeGameObject(match$1[1], state$2);
                                        var state$4 = LightMaterialAPI$Wonderjs.reInitMaterials(/* array */[material], state$3);
                                        AllMaterialTool$Wonderjs.getShaderIndex(material, state$4);
                                        var restoredState = MainStateTool$Wonderjs.restore(state$4, copiedState);
                                        var restoredShaderIndex = AllMaterialTool$Wonderjs.getShaderIndex(material, restoredState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](restoredShaderIndex), beforeShaderIndex);
                                      }));
                                Wonder_jest.test("used program should be the one before re-init", (function () {
                                        var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        Sinon.returns(1, Sinon.onCall(0, createProgram));
                                        Sinon.returns(2, Sinon.onCall(1, createProgram));
                                        var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                        var material = match[2];
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(useProgram), undefined, /* () */0), match[0]);
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
                                describe("test dispose direction light gameObject after restore", (function () {
                                        return Wonder_jest.test("final shaderIndex should be beforeShaderIndex + 1", (function () {
                                                      var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                      var material = match[2];
                                                      var lightGameObject = match[1];
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
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
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](disposedRestoredShaderIndex), afterShaderIndex + 1 | 0);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
