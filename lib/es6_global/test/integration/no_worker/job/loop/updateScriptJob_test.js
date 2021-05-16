

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$Wonderjs from "../../asset/tool/GLBTool.js";
import * as NodeTool$Wonderjs from "../../../../tool/NodeTool.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ScriptAPI$Wonderjs from "../../../../../src/api/script/ScriptAPI.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as ScriptTool$Wonderjs from "../../../../tool/service/script/ScriptTool.js";
import * as LoadWDBTool$Wonderjs from "../../../tool/asset/load/LoadWDBTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as ConvertGLBTool$Wonderjs from "../../asset/tool/ConvertGLBTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as ConvertGLBSystem$Wonderjs from "../../../../../src/asset/converter/ConvertGLBSystem.js";
import * as LoadStreamWDBTool$Wonderjs from "../../../tool/asset/load/LoadStreamWDBTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

Wonder_jest.describe("test update_script job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"update_script\"\n        }\n      ]\n    }\n  ]\n        ", undefined, undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("shouldn't exec before load done", (function (param) {
                var _buildFakeFetchReturnResponse = function (sandbox, contentLength, ok, arrayBuffer) {
                  return Promise.resolve({
                              ok: true,
                              headers: {
                                get: Sinon.returns(contentLength, Sinon.withOneArg("content-length", Sinon.createEmptyStubWithJsObjSandbox(sandbox)))
                              },
                              arrayBuffer: (function (param) {
                                  return Promise.resolve(arrayBuffer);
                                })
                            });
                };
                var _buildFakeFetch = function (sandbox, contentLength, gltfJsonStr, binBuffer) {
                  var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  Sinon.returns(_buildFakeFetchReturnResponse(sandbox, contentLength, true, ConvertGLBSystem$Wonderjs.convertGLBData(JSON.parse(gltfJsonStr), binBuffer)), Sinon.onCall(0, fetch));
                  return fetch;
                };
                beforeEach((function () {
                        state[0] = RenderJobsTool$Wonderjs.initWithJobConfigAndBufferConfigWithoutBuildFakeDom(sandbox, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitPipelineConfigWithoutInitMain(/* () */0), "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"update_script\"\n        }\n      ]\n    }\n  ]\n        ", NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitJobConfigWithoutInitMain(/* () */0), NoWorkerJobConfigTool$Wonderjs.buildNoWorkerLoopJobConfig(/* () */0), /* () */0), SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                        TestTool$Wonderjs.closeContractCheck(/* () */0);
                        GLBTool$Wonderjs.prepare(sandbox[0]);
                        state[0] = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                        return /* () */0;
                      }));
                Wonder_jest.describe("test load stream wdb", (function (param) {
                        var boxTexturedWDBArrayBuffer = /* record */[/* contents */-1];
                        beforeAll((function () {
                                boxTexturedWDBArrayBuffer[0] = NodeTool$Wonderjs.convertGLBToWDB("BoxTextured");
                                return /* () */0;
                              }));
                        Wonder_jest.describe("test support stream load", (function (param) {
                                Wonder_jest.testPromise("test load once", undefined, (function (param) {
                                        var _prepare = function (sandbox, state) {
                                          var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(boxTexturedWDBArrayBuffer[0]), undefined, /* () */0), Sinon.onCall(0, readStub))));
                                          return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                        };
                                        var match = _prepare(sandbox, state[0]);
                                        var handleBeforeStartLoop = match[2];
                                        var match$1 = ScriptTool$Wonderjs.createGameObject(match[4]);
                                        var updateStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncStub[/* buildScriptData */1](match$1[2], match$1[0], sandbox, undefined, Caml_option.some(updateStub), undefined, /* () */0);
                                        MainStateTool$Wonderjs.setState(state$1);
                                        var handleBeforeStartLoop$1 = function (state, rootGameObject) {
                                          return DirectorTool$Wonderjs.runWithDefaultTime(Curry._2(handleBeforeStartLoop, state, rootGameObject));
                                        };
                                        return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                      match[0],
                                                      LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                      handleBeforeStartLoop$1,
                                                      match[3]
                                                    ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                      var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                      DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(updateStub)), 1));
                                                    }));
                                      }));
                                return Wonder_jest.testPromise("test load twice", undefined, (function (param) {
                                              var _prepare = function (sandbox, state) {
                                                var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(3, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(boxTexturedWDBArrayBuffer[0]), undefined, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(boxTexturedWDBArrayBuffer[0]), undefined, /* () */0), Sinon.onCall(0, readStub))))))));
                                                return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                              };
                                              var match = _prepare(sandbox, state[0]);
                                              var handleWhenDoneFunc = match[3];
                                              var handleBeforeStartLoop = match[2];
                                              var readStub = match[1];
                                              var default11Image = match[0];
                                              var match$1 = ScriptTool$Wonderjs.createGameObject(match[4]);
                                              var updateStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncStub[/* buildScriptData */1](match$1[2], match$1[0], sandbox, undefined, Caml_option.some(updateStub), undefined, /* () */0);
                                              MainStateTool$Wonderjs.setState(state$1);
                                              var handleBeforeStartLoop$1 = function (state, rootGameObject) {
                                                return DirectorTool$Wonderjs.runWithDefaultTime(Curry._2(handleBeforeStartLoop, state, rootGameObject));
                                              };
                                              return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                            default11Image,
                                                            LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                            handleBeforeStartLoop$1,
                                                            handleWhenDoneFunc
                                                          ], LoadStreamWDBTool$Wonderjs.buildReader(readStub)).then((function (param) {
                                                            var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                            var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                            MainStateTool$Wonderjs.setState(state$1);
                                                            return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                          default11Image,
                                                                          LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                                          handleBeforeStartLoop$1,
                                                                          handleWhenDoneFunc
                                                                        ], LoadStreamWDBTool$Wonderjs.buildReader(readStub)).then((function (param) {
                                                                          var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                          DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(updateStub)), 2));
                                                                        }));
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.describe("test not support stream load", (function (param) {
                                      return Wonder_jest.describe("fallback to load whole wdb", (function (param) {
                                                    return Wonder_jest.testPromise("test load once", undefined, (function (param) {
                                                                  var _prepare = function (sandbox, state) {
                                                                    var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                    var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(boxTexturedWDBArrayBuffer[0]), undefined, /* () */0), Sinon.onCall(0, readStub))));
                                                                    return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                                  };
                                                                  var match = _prepare(sandbox, state[0]);
                                                                  var match$1 = ScriptTool$Wonderjs.createGameObject(match[4]);
                                                                  var updateStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                  var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncStub[/* buildScriptData */1](match$1[2], match$1[0], sandbox, undefined, Caml_option.some(updateStub), undefined, /* () */0);
                                                                  MainStateTool$Wonderjs.setState(state$1);
                                                                  var fetchFunc = _buildFakeFetch(sandbox, 0, ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), GLBTool$Wonderjs.buildBinBuffer(/* () */0));
                                                                  return LoadStreamWDBTool$Wonderjs.load(NodeTool$Wonderjs.buildWDBPath("BoxTextured"), fetchFunc, undefined, (function (state, param, rootGameObject) {
                                                                                  MainStateTool$Wonderjs.setState(DirectorTool$Wonderjs.runWithDefaultTime(state));
                                                                                  return /* () */0;
                                                                                }), /* () */0).then((function (param) {
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(updateStub)), 1));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test load whole wdb", (function (param) {
                              return Wonder_jest.testPromise("test load once", undefined, (function (param) {
                                            var fetchFunc = _buildFakeFetch(sandbox, 0, ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), GLBTool$Wonderjs.buildBinBuffer(/* () */0));
                                            var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                            var updateStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncStub[/* buildScriptData */1](match[2], match[0], sandbox, undefined, Caml_option.some(updateStub), undefined, /* () */0);
                                            MainStateTool$Wonderjs.setState(state$1);
                                            return LoadWDBTool$Wonderjs.load("../singleNode.wdb", fetchFunc, undefined, undefined, undefined, undefined, undefined, (function (contentLength, wdbPath) {
                                                            MainStateTool$Wonderjs.setState(DirectorTool$Wonderjs.runWithDefaultTime(MainStateTool$Wonderjs.unsafeGetState(/* () */0)));
                                                            return /* () */0;
                                                          }), /* () */0).then((function (param) {
                                                          DirectorTool$Wonderjs.runWithDefaultTime(param[0]);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(updateStub)), 1));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("exec all update event functions", (function (param) {
                      Wonder_jest.test("only exec actived scripts' update event functions", (function (param) {
                              var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                              var script1 = match[2];
                              var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                              var script2 = match$1[2];
                              var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match$1[0], undefined, undefined, undefined, /* () */0);
                              var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                              var state$3 = ScriptAPI$Wonderjs.setScriptIsActive(script1, false, state$2);
                              var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script1, state$4),
                                              ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script2, state$4)
                                            ]), /* tuple */[
                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueBeforeExecUpdateEventFunc */16](/* () */0),
                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0)
                                        ]);
                            }));
                      Wonder_jest.test("only exec existed update event functions", (function (param) {
                              var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                              var script = match[2];
                              var scriptEventFunctionData1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](undefined, undefined, undefined);
                              var scriptEventFunctionData2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptEventFunctionData */0](undefined, Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildUpdateEventFunc */7](/* () */0)), undefined);
                              var state$1 = ScriptAPI$Wonderjs.addScriptEventFunctionData(script, "scriptEventFunctionData1", scriptEventFunctionData1, match[0]);
                              var state$2 = ScriptAPI$Wonderjs.addScriptEventFunctionData(script, "scriptEventFunctionData2", scriptEventFunctionData2, state$1);
                              var scriptAttributeName = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getScriptAttributeName */3](/* () */0);
                              var scriptAttribute = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptAttribute */2](scriptAttributeName);
                              var state$3 = ScriptAPI$Wonderjs.addScriptAttribute(script, scriptAttributeName, scriptAttribute, state$2);
                              var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script, state$4)), ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0));
                            }));
                      Wonder_jest.describe("test one script component with one event function data", (function (param) {
                              Wonder_jest.describe("test one script component with one attribute", (function (param) {
                                      Wonder_jest.test("test attribute", (function (param) {
                                              var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                              var script1 = match[2];
                                              var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                                              var script2 = match$1[2];
                                              var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match$1[0], undefined, undefined, undefined, /* () */0);
                                              var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                                              var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script1, state$3),
                                                              ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script2, state$3)
                                                            ]), /* tuple */[
                                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0),
                                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0)
                                                        ]);
                                            }));
                                      return Wonder_jest.test("set transform local position in update", (function (param) {
                                                    var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                                    var script1 = match[2];
                                                    var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                                                    var script2 = match$1[2];
                                                    var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match$1[0], undefined, Caml_option.some(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0)), undefined, /* () */0);
                                                    var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                                                    var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getLocalPosition */10](script1, state$3),
                                                                    ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script2, state$3)
                                                                  ]), /* tuple */[
                                                                ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getLocalPositionAfterExec */9](/* () */0),
                                                                ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0)
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.test("test one script component with two attributes", (function (param) {
                                            var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                            var script1 = match[2];
                                            var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                                            var script2 = match$1[2];
                                            var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndTwoAttributes[/* buildScriptData */5](script1, match$1[0]);
                                            var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                                            var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndTwoAttributes[/* getAttribute1FieldBValue */6](script1, state$3),
                                                            ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script2, state$3)
                                                          ]), /* tuple */[
                                                        ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndTwoAttributes[/* getAttribute1FieldBValueAfterExecUpdateEventFunc */7](/* () */0),
                                                        ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0)
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.test("test one script component with two event function data", (function (param) {
                                    var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                    var script1 = match[2];
                                    var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                                    var script2 = match$1[2];
                                    var state$1 = ScriptTool$Wonderjs.TestCaseWithTwoEventFuncsAndTwoAttributes[/* buildScriptData */5](script1, match$1[0]);
                                    var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                                    var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    ScriptTool$Wonderjs.TestCaseWithTwoEventFuncsAndTwoAttributes[/* getAttribute1FieldAValue */6](script1, state$3),
                                                    ScriptTool$Wonderjs.TestCaseWithTwoEventFuncsAndTwoAttributes[/* getAttribute1FieldBValue */8](script1, state$3),
                                                    ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValue */13](script2, state$3)
                                                  ]), /* tuple */[
                                                ScriptTool$Wonderjs.TestCaseWithTwoEventFuncsAndTwoAttributes[/* getAttribute1FieldAValueAfterExecUpdateEventFunc */7](/* () */0),
                                                ScriptTool$Wonderjs.TestCaseWithTwoEventFuncsAndTwoAttributes[/* getAttribute1FieldBValueAfterExecUpdateEventFunc */9](/* () */0),
                                                ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldBValueAfterExecUpdateEventFunc */17](/* () */0)
                                              ]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
