

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as IMGUITool$Wonderjs from "../../../../../tool/service/imgui/IMGUITool.js";
import * as ExecIMGUITool$Wonderjs from "../../../../../tool/service/imgui/ExecIMGUITool.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../../../tool/TestWorkerTool.js";
import * as WorkerDataTool$Wonderjs from "../../../../../tool/service/workerData/WorkerDataTool.js";
import * as IMGUIWorkerTool$Wonderjs from "../../all/tool/IMGUIWorkerTool.js";
import * as RenderIMGUITool$Wonderjs from "../../../../../tool/service/imgui/RenderIMGUITool.js";
import * as BrowserDetectTool$Wonderjs from "../../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as ButtonIMGUITool$WonderImgui from "../../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/ButtonIMGUITool.js";
import * as RenderIMGUITool$WonderImgui from "../../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/RenderIMGUITool.js";
import * as SceneGraphIMGUITool$Wonderjs from "../../../../no_worker/asset/tool/SceneGraphIMGUITool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../../../tool/WorkerJobWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../tool/RenderJobsRenderWorkerTool.js";
import * as SendRenderDataMainWorkerJob$Wonderjs from "../../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js";
import * as SendRenderRenderDataWorkerTool$Wonderjs from "../../tool/SendRenderRenderDataWorkerTool.js";
import * as GetFinishRenderDataMainWorkerJob$Wonderjs from "../../../../../../src/job/worker/main/loop/GetFinishRenderDataMainWorkerJob.js";
import * as GetFinishRenderDataMainWorkerTool$Wonderjs from "../../main_worker/tool/GetFinishRenderDataMainWorkerTool.js";
import * as BasicSourceTextureRenderWorkerTool$Wonderjs from "../../../tool/texture/BasicSourceTextureRenderWorkerTool.js";

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

export {
  
}
/*  Not a pure module */
