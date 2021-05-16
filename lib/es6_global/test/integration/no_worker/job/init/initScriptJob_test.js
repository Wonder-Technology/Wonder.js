

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
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as LoadDataTool$Wonderjs from "../../../tool/asset/load/LoadDataTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as InitScriptJobTool$Wonderjs from "../../../../tool/job/no_worker/init/InitScriptJobTool.js";
import * as LoadStreamWDBTool$Wonderjs from "../../../tool/asset/load/LoadStreamWDBTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("test init_script job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("shouldn't exec before load done", (function (param) {
                Wonder_jest.test("init_script job shouldn't exec all actived scripts' init event functions before load done", (function (param) {
                        var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                        var initStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncStub[/* buildScriptData */1](match[2], match[0], sandbox, Caml_option.some(initStub), undefined, undefined, /* () */0);
                        var state$2 = LoadDataTool$Wonderjs.markCanExecScriptAllEventFunction(false, state$1);
                        InitScriptJobTool$Wonderjs.exec(state$2);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(initStub)), 0);
                      }));
                return Wonder_jest.describe("test load stream wdb", (function (param) {
                              var boxTexturedWDBArrayBuffer = /* record */[/* contents */-1];
                              beforeAll((function () {
                                      boxTexturedWDBArrayBuffer[0] = NodeTool$Wonderjs.convertGLBToWDB("BoxTextured");
                                      return /* () */0;
                                    }));
                              beforeEach((function () {
                                      state[0] = RenderJobsTool$Wonderjs.initWithJobConfigAndBufferConfigWithoutBuildFakeDom(sandbox, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitPipelineConfigWithoutInitMain(/* () */0), "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"update_script\"\n        }\n      ]\n    }\n  ]\n        ", NoWorkerJobConfigTool$Wonderjs.buildNoWorkerInitJobConfigWithoutInitMain(/* () */0), NoWorkerJobConfigTool$Wonderjs.buildNoWorkerLoopJobConfig(/* () */0), /* () */0), SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                      TestTool$Wonderjs.closeContractCheck(/* () */0);
                                      GLBTool$Wonderjs.prepare(sandbox[0]);
                                      state[0] = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                      return /* () */0;
                                    }));
                              Wonder_jest.testPromise("should exec all actived scripts' init event functions when load done", undefined, (function (param) {
                                      var _prepare = function (sandbox, state) {
                                        var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                        var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(boxTexturedWDBArrayBuffer[0]), undefined, /* () */0), Sinon.onCall(0, readStub))));
                                        return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                      };
                                      var match = _prepare(sandbox, state[0]);
                                      var handleBeforeStartLoop = match[2];
                                      var match$1 = ScriptTool$Wonderjs.createGameObject(match[4]);
                                      var initStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncStub[/* buildScriptData */1](match$1[2], match$1[0], sandbox, Caml_option.some(initStub), undefined, undefined, /* () */0);
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
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(initStub)), 1));
                                                  }));
                                    }));
                              return Wonder_jest.testPromise("should exec all actived scripts' init event functions before exec all actived scripts' update event functions when load done", undefined, (function (param) {
                                            var _prepare = function (sandbox, state) {
                                              var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(boxTexturedWDBArrayBuffer[0]), undefined, /* () */0), Sinon.onCall(0, readStub))));
                                              return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                            };
                                            var match = _prepare(sandbox, state[0]);
                                            var handleBeforeStartLoop = match[2];
                                            var match$1 = ScriptTool$Wonderjs.createGameObject(match[4]);
                                            var initStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var updateStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncStub[/* buildScriptData */1](match$1[2], match$1[0], sandbox, Caml_option.some(initStub), Caml_option.some(updateStub), undefined, /* () */0);
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
                                                          var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                          MainStateTool$Wonderjs.setState(state$1);
                                                          return Promise.resolve(Sinon.toCalledBefore(Sinon.getCall(0, updateStub), Wonder_jest.Expect[/* expect */0](Sinon.getCall(0, initStub))));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.test("exec all actived scripts' init event functions", (function (param) {
                      var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                      var script1 = match[2];
                      var match$1 = ScriptTool$Wonderjs.createGameObject(match[0]);
                      var script2 = match$1[2];
                      var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match$1[0], undefined, undefined, undefined, /* () */0);
                      var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script2, state$1, undefined, undefined, undefined, /* () */0);
                      var state$3 = ScriptAPI$Wonderjs.setScriptIsActive(script2, false, state$2);
                      var state$4 = InitScriptJobTool$Wonderjs.exec(state$3);
                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                      ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValue */12](script1, state$4),
                                      ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValue */12](script2, state$4)
                                    ]), /* tuple */[
                                  ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValueAfterExecInitEventFunc */15](/* () */0),
                                  ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValueBeforeExecInitEventFunc */14](/* () */0)
                                ]);
                    }));
      }));

export {
  
}
/*  Not a pure module */
