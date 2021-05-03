'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var WorkerWorkerTool$Wonderjs = require("../../tool/WorkerWorkerTool.js");
var BasicMaterialTool$Wonderjs = require("../../../../tool/service/material/BasicMaterialTool.js");
var LightMaterialTool$Wonderjs = require("../../../../tool/service/material/LightMaterialTool.js");
var TestMainWorkerTool$Wonderjs = require("../main_worker/tool/TestMainWorkerTool.js");
var WorkerJobWorkerTool$Wonderjs = require("../../tool/WorkerJobWorkerTool.js");
var SendRenderDataMainWorkerJob$Wonderjs = require("../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../main_worker/tool/WorkerInstanceMainWorkerTool.js");
var SendRenderRenderDataWorkerTool$Wonderjs = require("../tool/SendRenderRenderDataWorkerTool.js");

Wonder_jest.describe("test init material for render render worker job", (function (param) {
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
        return Wonder_jest.describe("test render data->init material which is sended to render worker", (function (param) {
                      var _buildRenderData = function (basicMaterialDataForWorkerInit, lightMaterialDataForWorkerInit) {
                        return SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, undefined, {
                                    basicMaterialData: {
                                      materialDataForWorkerInit: basicMaterialDataForWorkerInit
                                    },
                                    lightMaterialData: {
                                      materialDataForWorkerInit: lightMaterialDataForWorkerInit
                                    }
                                  }, undefined, undefined, undefined, /* () */0);
                      };
                      Wonder_jest.describe("test basic material", (function (param) {
                              var _prepare = function (state) {
                                var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                var gameObject1 = match[1];
                                var match$1 = BasicMaterialTool$Wonderjs.createGameObject(match[0]);
                                var gameObject2 = match$1[1];
                                var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject2, GameObjectAPI$Wonderjs.initGameObject(gameObject1, match$1[0]));
                                var state$2 = WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(state$1);
                                return /* tuple */[
                                        state$2,
                                        /* tuple */[
                                          gameObject1,
                                          gameObject2
                                        ],
                                        /* tuple */[
                                          match[2],
                                          match$1[2]
                                        ]
                                      ];
                              };
                              Wonder_jest.describe("send need-init-basic-material data", (function (param) {
                                      Wonder_jest.testPromise("test", undefined, (function (param) {
                                              var match = _prepare(state);
                                              var match$1 = match[2];
                                              var material2 = match$1[1];
                                              var material1 = match$1[0];
                                              var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(match[0]);
                                              var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                            return Promise.resolve(Sinon.toCalledWith(/* array */[_buildRenderData(/* array */[
                                                                                  /* tuple */[
                                                                                    material1,
                                                                                    false
                                                                                  ],
                                                                                  /* tuple */[
                                                                                    material2,
                                                                                    false
                                                                                  ]
                                                                                ], Sinon$1.match.any)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                          }), undefined, /* () */0);
                                            }));
                                      return Wonder_jest.testPromise("materialDataForWorkerInit shouldn't contain duplicate data", undefined, (function (param) {
                                                    var match = _prepare(state);
                                                    var match$1 = match[2];
                                                    var material2 = match$1[1];
                                                    var material1 = match$1[0];
                                                    var match$2 = match[1];
                                                    var match$3 = BasicMaterialTool$Wonderjs.createGameObjectWithMaterial(material1, match[0]);
                                                    var match$4 = BasicMaterialTool$Wonderjs.createGameObjectWithMaterial(material2, match$3[0]);
                                                    var state$1 = GameObjectAPI$Wonderjs.initGameObject(match$4[1], GameObjectAPI$Wonderjs.initGameObject(match$3[1], GameObjectAPI$Wonderjs.initGameObject(match$2[1], GameObjectAPI$Wonderjs.initGameObject(match$2[0], match$4[0]))));
                                                    MainStateTool$Wonderjs.setState(state$1);
                                                    var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(state$1);
                                                    var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                                    return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                                  return Promise.resolve(Sinon.toCalledWith(/* array */[_buildRenderData(/* array */[
                                                                                        /* tuple */[
                                                                                          material1,
                                                                                          false
                                                                                        ],
                                                                                        /* tuple */[
                                                                                          material2,
                                                                                          false
                                                                                        ]
                                                                                      ], /* array */[])], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                }), undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.testPromise("clear basicMaterialRecord->materialArrayForWorkerInit after send", undefined, (function (param) {
                                            _prepare(state);
                                            return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (state) {
                                                          var match = BasicMaterialTool$Wonderjs.getRecord(state);
                                                          var materialArrayForWorkerInit = match[/* materialArrayForWorkerInit */10];
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](materialArrayForWorkerInit.length), 0));
                                                        }), undefined, /* () */0);
                                          }));
                            }));
                      return Wonder_jest.describe("test light material", (function (param) {
                                    var _prepare = function (state) {
                                      var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                      var match$1 = LightMaterialTool$Wonderjs.createGameObject(match[0]);
                                      var state$1 = WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(match$1[0]);
                                      return /* tuple */[
                                              state$1,
                                              /* tuple */[
                                                match[1],
                                                match$1[1]
                                              ],
                                              /* tuple */[
                                                match[2],
                                                match$1[2]
                                              ]
                                            ];
                                    };
                                    Wonder_jest.describe("send need-init-light-material data", (function (param) {
                                            Wonder_jest.testPromise("test", undefined, (function (param) {
                                                    var match = _prepare(state);
                                                    var match$1 = match[2];
                                                    var material2 = match$1[1];
                                                    var material1 = match$1[0];
                                                    var match$2 = match[1];
                                                    var state$1 = GameObjectAPI$Wonderjs.initGameObject(match$2[1], GameObjectAPI$Wonderjs.initGameObject(match$2[0], match[0]));
                                                    MainStateTool$Wonderjs.setState(state$1);
                                                    var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(state$1);
                                                    var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                                    return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                                  return Promise.resolve(Sinon.toCalledWith(/* array */[_buildRenderData(/* array */[], /* array */[
                                                                                        /* tuple */[
                                                                                          material1,
                                                                                          false
                                                                                        ],
                                                                                        /* tuple */[
                                                                                          material2,
                                                                                          false
                                                                                        ]
                                                                                      ])], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                }), undefined, /* () */0);
                                                  }));
                                            return Wonder_jest.testPromise("materialDataForWorkerInit shouldn't contain duplicate data", undefined, (function (param) {
                                                          var match = _prepare(state);
                                                          var match$1 = match[2];
                                                          var material2 = match$1[1];
                                                          var material1 = match$1[0];
                                                          var match$2 = match[1];
                                                          var match$3 = LightMaterialTool$Wonderjs.createGameObjectWithMaterial(material1, match[0]);
                                                          var match$4 = LightMaterialTool$Wonderjs.createGameObjectWithMaterial(material2, match$3[0]);
                                                          var state$1 = GameObjectAPI$Wonderjs.initGameObject(match$4[1], GameObjectAPI$Wonderjs.initGameObject(match$2[1], GameObjectAPI$Wonderjs.initGameObject(match$3[1], GameObjectAPI$Wonderjs.initGameObject(match$2[0], match$4[0]))));
                                                          MainStateTool$Wonderjs.setState(state$1);
                                                          var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(state$1);
                                                          var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                                          return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                                        return Promise.resolve(Sinon.toCalledWith(/* array */[_buildRenderData(/* array */[], /* array */[
                                                                                              /* tuple */[
                                                                                                material1,
                                                                                                false
                                                                                              ],
                                                                                              /* tuple */[
                                                                                                material2,
                                                                                                false
                                                                                              ]
                                                                                            ])], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                      }), undefined, /* () */0);
                                                        }));
                                          }));
                                    return Wonder_jest.testPromise("clear lightMaterialRecord->materialArrayForWorkerInit after send", undefined, (function (param) {
                                                  _prepare(state);
                                                  return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (state) {
                                                                var match = LightMaterialTool$Wonderjs.getRecord(state);
                                                                var materialArrayForWorkerInit = match[/* materialArrayForWorkerInit */14];
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](materialArrayForWorkerInit.length), 0));
                                                              }), undefined, /* () */0);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
