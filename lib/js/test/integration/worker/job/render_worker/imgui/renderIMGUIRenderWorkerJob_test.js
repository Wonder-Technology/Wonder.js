'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var IMGUITool$Wonderjs = require("../../../../../tool/service/imgui/IMGUITool.js");
var ExecIMGUITool$Wonderjs = require("../../../../../tool/service/imgui/ExecIMGUITool.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var TestWorkerTool$Wonderjs = require("../../../tool/TestWorkerTool.js");
var WorkerDataTool$Wonderjs = require("../../../../../tool/service/workerData/WorkerDataTool.js");
var IMGUIWorkerTool$Wonderjs = require("../../all/tool/IMGUIWorkerTool.js");
var RenderIMGUITool$Wonderjs = require("../../../../../tool/service/imgui/RenderIMGUITool.js");
var BrowserDetectTool$Wonderjs = require("../../../../../tool/service/browserDetect/BrowserDetectTool.js");
var ButtonIMGUITool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/ButtonIMGUITool.js");
var RenderIMGUITool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/RenderIMGUITool.js");
var SceneGraphIMGUITool$Wonderjs = require("../../../../no_worker/asset/tool/SceneGraphIMGUITool.js");
var WorkerJobWorkerTool$Wonderjs = require("../../../tool/WorkerJobWorkerTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../tool/RenderJobsRenderWorkerTool.js");
var SendRenderDataMainWorkerJob$Wonderjs = require("../../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js");
var SendRenderRenderDataWorkerTool$Wonderjs = require("../../tool/SendRenderRenderDataWorkerTool.js");
var GetFinishRenderDataMainWorkerJob$Wonderjs = require("../../../../../../src/job/worker/main/loop/GetFinishRenderDataMainWorkerJob.js");
var GetFinishRenderDataMainWorkerTool$Wonderjs = require("../../main_worker/tool/GetFinishRenderDataMainWorkerTool.js");
var BasicSourceTextureRenderWorkerTool$Wonderjs = require("../../../tool/texture/BasicSourceTextureRenderWorkerTool.js");

Wonder_jest.describe("test render imgui render worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.describe("test send render data to render worker", (function (param) {
                Wonder_jest.testPromise("send ioData", undefined, (function (param) {
                        var ioData = /* record */[
                          /* pointUp */true,
                          /* pointDown */true,
                          /* pointPosition : tuple */[
                            0,
                            1
                          ],
                          /* pointMovementDelta : tuple */[
                            1,
                            2
                          ]
                        ];
                        var match = IMGUIWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                        var postMessageToRenderWorker = match[1];
                        var state = IMGUITool$Wonderjs.setIOData(ioData, match[0]);
                        MainStateTool$Wonderjs.setState(state);
                        return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                      return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                            ioData: ioData,
                                                            execFuncDataArr: Sinon$1.match.any
                                                          }, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                    }), undefined, /* () */0);
                      }));
                Wonder_jest.describe("reset io data->point event state when point up", (function (param) {
                        return Wonder_jest.testPromise("test io data after send data", undefined, (function (param) {
                                      var match = IMGUIWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                                      var state = IMGUITool$Wonderjs.setIOData(/* record */[
                                            /* pointUp */true,
                                            /* pointDown */true,
                                            /* pointPosition : tuple */[
                                              0,
                                              1
                                            ],
                                            /* pointMovementDelta : tuple */[
                                              1,
                                              2
                                            ]
                                          ], match[0]);
                                      MainStateTool$Wonderjs.setState(state);
                                      return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                    var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUITool$Wonderjs.getIOData(state)), /* record */[
                                                                    /* pointUp */false,
                                                                    /* pointDown */false,
                                                                    /* pointPosition : tuple */[
                                                                      0,
                                                                      1
                                                                    ],
                                                                    /* pointMovementDelta : tuple */[
                                                                      1,
                                                                      2
                                                                    ]
                                                                  ]));
                                                  }), undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("send execData", (function (param) {
                              Wonder_jest.describe("if is already set execData in render worker, not set again", (function (param) {
                                      return Wonder_jest.describe("send none", (function (param) {
                                                    Wonder_jest.testPromise("test two loops", undefined, (function (param) {
                                                            var match = IMGUIWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                                                            var postMessageToRenderWorker = match[1];
                                                            var execFunc = function (param, param$1, state) {
                                                              return state;
                                                            };
                                                            var customData_001 = function (a) {
                                                              return a + 1 | 0;
                                                            };
                                                            var customData = /* tuple */[
                                                              100,
                                                              customData_001
                                                            ];
                                                            var state = ExecIMGUITool$Wonderjs.addExecFuncData(match[0], undefined, Caml_option.some(customData), undefined, Caml_option.some(execFunc), /* () */0);
                                                            MainStateTool$Wonderjs.setState(state);
                                                            return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                                          return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                                                        return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                                                              ioData: Sinon$1.match.any,
                                                                                                              execFuncDataArr: ExecIMGUITool$Wonderjs.createEmptyExecFuncDataArr(/* () */0)
                                                                                                            }, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                                      }), undefined, /* () */0);
                                                                        }), undefined, /* () */0);
                                                          }));
                                                    return Wonder_jest.testPromise("test three loops", undefined, (function (param) {
                                                                  var match = IMGUIWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                                                                  var postMessageToRenderWorker = match[1];
                                                                  var execFunc = function (param, param$1, state) {
                                                                    return state;
                                                                  };
                                                                  var customData_001 = function (a) {
                                                                    return a + 1 | 0;
                                                                  };
                                                                  var customData = /* tuple */[
                                                                    100,
                                                                    customData_001
                                                                  ];
                                                                  var state = ExecIMGUITool$Wonderjs.addExecFuncData(match[0], undefined, Caml_option.some(customData), undefined, Caml_option.some(execFunc), /* () */0);
                                                                  MainStateTool$Wonderjs.setState(state);
                                                                  return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                                                return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                                                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                                                                            return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                                                                                  ioData: Sinon$1.match.any,
                                                                                                                                  execFuncDataArr: ExecIMGUITool$Wonderjs.createEmptyExecFuncDataArr(/* () */0)
                                                                                                                                }, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                                                          }), undefined, /* () */0);
                                                                                            }), undefined, /* () */0);
                                                                              }), undefined, /* () */0);
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("else", (function (param) {
                                            return Wonder_jest.testPromise("send data", undefined, (function (param) {
                                                          var match = IMGUIWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                                                          var postMessageToRenderWorker = match[1];
                                                          var execFunc = function (param, param$1, state) {
                                                            return state;
                                                          };
                                                          var customData_001 = function (a) {
                                                            return a + 1 | 0;
                                                          };
                                                          var customData = /* tuple */[
                                                            100,
                                                            customData_001
                                                          ];
                                                          var name = "e1";
                                                          var state = ExecIMGUITool$Wonderjs.addExecFuncData(match[0], name, Caml_option.some(customData), 1, Caml_option.some(execFunc), /* () */0);
                                                          MainStateTool$Wonderjs.setState(state);
                                                          return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                                        return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                                              ioData: Sinon$1.match.any,
                                                                                              execFuncDataArr: SceneGraphIMGUITool$Wonderjs.buildExecFuncDataArr(name, Caml_option.some(customData), 1, Caml_option.some(execFunc), /* () */0)
                                                                                            }, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                      }), undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test render worker job", (function (param) {
                      Wonder_jest.beforeAllPromise(undefined, (function (param) {
                              return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                            }));
                      Wonder_jest.afterAllPromise(undefined, (function (param) {
                              return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                            }));
                      Wonder_jest.describe("test render imgui", (function (param) {
                              return Wonder_jest.describe("test render image", (function (param) {
                                            var _addExecFuncData = function (imageX1, execOrder, state) {
                                              return ExecIMGUITool$Wonderjs.addExecFuncData(state, undefined, /* tuple */[
                                                          RenderIMGUITool$WonderImgui.buildImageData(/* () */0),
                                                          imageX1
                                                        ], execOrder, Caml_option.some((function (customData, imguiAPIJsObj, state) {
                                                                var match = customData[0][0];
                                                                var match$1 = match[1];
                                                                var match$2 = match[0];
                                                                var imageFunc = imguiAPIJsObj.image;
                                                                return imageFunc(/* tuple */[
                                                                            customData[1],
                                                                            match$2[1],
                                                                            match$2[2],
                                                                            match$2[3]
                                                                          ], /* tuple */[
                                                                            match$1[0],
                                                                            match$1[1],
                                                                            match$1[2],
                                                                            match$1[3]
                                                                          ], match[2], state);
                                                              })), /* () */0);
                                            };
                                            Wonder_jest.testPromise("test single exec func data", undefined, (function (param) {
                                                    var match = IMGUIWorkerTool$Wonderjs.prepareForTestInRenderWorkerJob(sandbox);
                                                    var bufferData = match[1];
                                                    var state = _addExecFuncData(50, 2, match[0]);
                                                    var bufferDataCallCountAfterInit = /* record */[/* contents */0];
                                                    return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                  return Promise.resolve(RenderIMGUITool$Wonderjs.judgeCustomTextureProgramPositionBufferData(bufferData, bufferDataCallCountAfterInit[0], /* array */[
                                                                                  50,
                                                                                  60,
                                                                                  50,
                                                                                  310,
                                                                                  200,
                                                                                  60,
                                                                                  200,
                                                                                  310
                                                                                ]));
                                                                }), state, sandbox, (function (state) {
                                                                  bufferDataCallCountAfterInit[0] = Sinon.getCallCount(bufferData);
                                                                  return /* () */0;
                                                                }), /* () */0);
                                                  }));
                                            return Wonder_jest.testPromise("test two exec func data", undefined, (function (param) {
                                                          var match = IMGUIWorkerTool$Wonderjs.prepareForTestInRenderWorkerJob(sandbox);
                                                          var bufferData = match[1];
                                                          var state = _addExecFuncData(100, 1, _addExecFuncData(50, 2, match[0]));
                                                          var bufferDataCallCountAfterInit = /* record */[/* contents */0];
                                                          return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                        return Promise.resolve(RenderIMGUITool$Wonderjs.judgeCustomTextureProgramPositionBufferData(bufferData, bufferDataCallCountAfterInit[0], /* array */[
                                                                                        100,
                                                                                        60,
                                                                                        100,
                                                                                        310,
                                                                                        250,
                                                                                        60,
                                                                                        250,
                                                                                        310,
                                                                                        50,
                                                                                        60,
                                                                                        50,
                                                                                        310,
                                                                                        200,
                                                                                        60,
                                                                                        200,
                                                                                        310
                                                                                      ]));
                                                                      }), state, sandbox, (function (state) {
                                                                        bufferDataCallCountAfterInit[0] = Sinon.getCallCount(bufferData);
                                                                        return /* () */0;
                                                                      }), /* () */0);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test operate main state if imgui button is click", (function (param) {
                                    return Wonder_jest.describe("can't invoke api to operate main state in execFunc!\n          instead, should:", (function (param) {
                                                  Wonder_jest.testPromise("set custom data to render worker state in execFunc;\n                send custom data to main worker when finish render;", undefined, (function (param) {
                                                          var match = IMGUIWorkerTool$Wonderjs.prepareForTestInRenderWorkerJob(sandbox);
                                                          var state = RenderIMGUITool$Wonderjs.prepareFntData(match[0]);
                                                          var customData = ButtonIMGUITool$WonderImgui.buildButtonData1(/* () */0);
                                                          var match$1 = customData[0];
                                                          var state$1 = ExecIMGUITool$Wonderjs.addExecFuncData(state, undefined, Caml_option.some(customData), undefined, Caml_option.some((function (customData, imguiAPIJsObj, state) {
                                                                      var match = customData[0];
                                                                      var buttonFunc = imguiAPIJsObj.button;
                                                                      var setCustomDataFunc = imguiAPIJsObj.setCustomDataFromRenderWorkerToMainWorker;
                                                                      var match$1 = buttonFunc(/* tuple */[
                                                                            /* tuple */[
                                                                              match[0],
                                                                              match[1],
                                                                              match[2],
                                                                              match[3]
                                                                            ],
                                                                            customData[1]
                                                                          ], null, state);
                                                                      var state$1 = match$1[0];
                                                                      if (match$1[1]) {
                                                                        return setCustomDataFunc(1, state$1);
                                                                      } else {
                                                                        return state$1;
                                                                      }
                                                                    })), /* () */0);
                                                          var selfPostMessage = RenderJobsRenderWorkerTool$Wonderjs.stubSelfPostMessage(sandbox[0]);
                                                          var state$2 = IMGUITool$Wonderjs.setIOData(/* record */[
                                                                /* pointUp */true,
                                                                /* pointDown */true,
                                                                /* pointPosition : tuple */[
                                                                  match$1[0],
                                                                  match$1[1]
                                                                ],
                                                                /* pointMovementDelta : tuple */[
                                                                  0,
                                                                  0
                                                                ]
                                                              ], state$1);
                                                          var state$3 = BrowserDetectTool$Wonderjs.setChrome(state$2);
                                                          return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (postMessageToRenderWorker) {
                                                                        return Promise.resolve(Sinon.toCalledWith(/* array */[GetFinishRenderDataMainWorkerTool$Wonderjs.buildFinishRenderData(1, /* () */0)], Wonder_jest.Expect[/* expect */0](selfPostMessage)));
                                                                      }), state$3, sandbox, undefined, /* () */0);
                                                        }));
                                                  return Wonder_jest.test("get custom data in main worker;\n                (so that in the next frame, user can check custom data in main state and operate main state in main worker)", (function (param) {
                                                                var state = MainStateTool$Wonderjs.createState(/* () */0);
                                                                var state$1 = GetFinishRenderDataMainWorkerJob$Wonderjs._exec(GetFinishRenderDataMainWorkerTool$Wonderjs.buildFinishRenderData(1, /* () */0), state);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](WorkerDataTool$Wonderjs.getRenderWorkerCustomData(state$1)), 1);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
