

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SettingTool$Wonderjs from "../../../tool/service/setting/SettingTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as WorkerWorkerTool$Wonderjs from "../tool/WorkerWorkerTool.js";
import * as BasicMaterialTool$Wonderjs from "../../../tool/service/material/BasicMaterialTool.js";
import * as LightMaterialTool$Wonderjs from "../../../tool/service/material/LightMaterialTool.js";
import * as TestMainWorkerTool$Wonderjs from "../job/main_worker/tool/TestMainWorkerTool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../tool/WorkerJobWorkerTool.js";
import * as DisposeAndSendDisposeDataMainWorkerJob$Wonderjs from "../../../../src/job/worker/main/loop/DisposeAndSendDisposeDataMainWorkerJob.js";

Wonder_jest.describe("test dispose with render worker", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("the material data send to render worker for init should remove the disposed ones", (function (param) {
                      Wonder_jest.describe("test basic material", (function (param) {
                              return Wonder_jest.testPromise("test", undefined, (function (param) {
                                            var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                            var material1 = match[2];
                                            var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                            var gameObject2 = match$1[1];
                                            var match$2 = BasicMaterialTool$Wonderjs.createGameObject(match$1[0]);
                                            var gameObject3 = match$2[1];
                                            var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject3, GameObjectAPI$Wonderjs.initGameObject(gameObject2, GameObjectAPI$Wonderjs.initGameObject(match[1], match$2[0])));
                                            var state$2 = GameObjectAPI$Wonderjs.disposeGameObject(gameObject3, GameObjectAPI$Wonderjs.disposeGameObjectBasicMaterialComponent(gameObject2, match$1[2], state$1));
                                            WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(state$2);
                                            return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(DisposeAndSendDisposeDataMainWorkerJob$Wonderjs.execJob, (function (state) {
                                                          var match = BasicMaterialTool$Wonderjs.getRecord(state);
                                                          var materialArrayForWorkerInit = match[/* materialArrayForWorkerInit */10];
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](materialArrayForWorkerInit), /* array */[material1]));
                                                        }), undefined, /* () */0);
                                          }));
                            }));
                      return Wonder_jest.describe("test light material", (function (param) {
                                    return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                  var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                                  var material1 = match[2];
                                                  var match$1 = LightMaterialTool$Wonderjs.createGameObject(match[0]);
                                                  var gameObject2 = match$1[1];
                                                  var match$2 = LightMaterialTool$Wonderjs.createGameObject(match$1[0]);
                                                  var gameObject3 = match$2[1];
                                                  var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject3, GameObjectAPI$Wonderjs.initGameObject(gameObject2, GameObjectAPI$Wonderjs.initGameObject(match[1], match$2[0])));
                                                  var state$2 = GameObjectAPI$Wonderjs.disposeGameObject(gameObject3, GameObjectAPI$Wonderjs.disposeGameObjectLightMaterialComponent(gameObject2, match$1[2], state$1));
                                                  WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(state$2);
                                                  return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(DisposeAndSendDisposeDataMainWorkerJob$Wonderjs.execJob, (function (state) {
                                                                var match = LightMaterialTool$Wonderjs.getRecord(state);
                                                                var materialArrayForWorkerInit = match[/* materialArrayForWorkerInit */14];
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](materialArrayForWorkerInit), /* array */[material1]));
                                                              }), undefined, /* () */0);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
