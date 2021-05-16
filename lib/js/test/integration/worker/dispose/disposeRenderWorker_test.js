'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$Wonderjs = require("../../../tool/service/setting/SettingTool.js");
var GameObjectAPI$Wonderjs = require("../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var WorkerWorkerTool$Wonderjs = require("../tool/WorkerWorkerTool.js");
var BasicMaterialTool$Wonderjs = require("../../../tool/service/material/BasicMaterialTool.js");
var LightMaterialTool$Wonderjs = require("../../../tool/service/material/LightMaterialTool.js");
var TestMainWorkerTool$Wonderjs = require("../job/main_worker/tool/TestMainWorkerTool.js");
var WorkerJobWorkerTool$Wonderjs = require("../tool/WorkerJobWorkerTool.js");
var DisposeAndSendDisposeDataMainWorkerJob$Wonderjs = require("../../../../src/job/worker/main/loop/DisposeAndSendDisposeDataMainWorkerJob.js");

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

/*  Not a pure module */
