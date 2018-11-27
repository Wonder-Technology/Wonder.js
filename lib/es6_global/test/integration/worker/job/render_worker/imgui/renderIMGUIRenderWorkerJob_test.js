

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as IMGUITool$Wonderjs from "../../../../../tool/service/imgui/IMGUITool.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as ManageIMGUIAPI$Wonderjs from "../../../../../../src/api/imgui/ManageIMGUIAPI.js";
import * as TestWorkerTool$Wonderjs from "../../../tool/TestWorkerTool.js";
import * as WorkerDataTool$Wonderjs from "../../../../../tool/service/workerData/WorkerDataTool.js";
import * as IMGUIWorkerTool$Wonderjs from "../../all/tool/IMGUIWorkerTool.js";
import * as RenderIMGUITool$Wonderjs from "../../../../../tool/service/imgui/RenderIMGUITool.js";
import * as BrowserDetectTool$Wonderjs from "../../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as ButtonIMGUITool$WonderImgui from "../../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/ButtonIMGUITool.js";
import * as RenderIMGUITool$WonderImgui from "../../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/RenderIMGUITool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../../../tool/WorkerJobWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../tool/RenderJobsRenderWorkerTool.js";
import * as RenderIMGUIRenderWorkerTool$Wonderjs from "../tool/RenderIMGUIRenderWorkerTool.js";
import * as SendRenderDataMainWorkerJob$Wonderjs from "../../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js";
import * as SendRenderRenderDataWorkerTool$Wonderjs from "../../tool/SendRenderRenderDataWorkerTool.js";
import * as GetFinishRenderDataMainWorkerJob$Wonderjs from "../../../../../../src/job/worker/main/loop/GetFinishRenderDataMainWorkerJob.js";
import * as GetFinishRenderDataMainWorkerTool$Wonderjs from "../../main_worker/tool/GetFinishRenderDataMainWorkerTool.js";
import * as BasicSourceTextureRenderWorkerTool$Wonderjs from "../../../tool/BasicSourceTextureRenderWorkerTool.js";

describe("test render imgui render worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        describe("test send render data to render worker", (function () {
                Wonder_jest.testPromise("send ioData", (function () {
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
                        return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
                                      return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, {
                                                            ioData: ioData,
                                                            customData: Sinon$1.match.any,
                                                            imguiFunc: Sinon$1.match.any
                                                          }, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                    }), undefined, /* () */0);
                      }));
                describe("reset io data->point event state when point up", (function () {
                        return Wonder_jest.testPromise("test io data after send data", (function () {
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
                                      return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
                                                    var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUITool$Wonderjs.getIOData(state)), /* record */[
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
                describe("send imguiFunc and customData", (function () {
                        describe("if is already set imguiFunc in render worker, not set again", (function () {
                                describe("send none", (function () {
                                        Wonder_jest.testPromise("test two loops", (function () {
                                                var match = IMGUIWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                                                var postMessageToRenderWorker = match[1];
                                                var imguiFunc = function (_, _$1, state) {
                                                  return state;
                                                };
                                                var customData_001 = function (a) {
                                                  return a + 1 | 0;
                                                };
                                                var customData = /* tuple */[
                                                  100,
                                                  customData_001
                                                ];
                                                var state = ManageIMGUIAPI$Wonderjs.setIMGUIFunc(customData, imguiFunc, match[0]);
                                                MainStateTool$Wonderjs.setState(state);
                                                return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
                                                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
                                                                            return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, {
                                                                                                  ioData: Sinon$1.match.any,
                                                                                                  customData: undefined,
                                                                                                  imguiFunc: undefined
                                                                                                }, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                          }), undefined, /* () */0);
                                                            }), undefined, /* () */0);
                                              }));
                                        return Wonder_jest.testPromise("test three loops", (function () {
                                                      var match = IMGUIWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                                                      var postMessageToRenderWorker = match[1];
                                                      var imguiFunc = function (_, _$1, state) {
                                                        return state;
                                                      };
                                                      var customData_001 = function (a) {
                                                        return a + 1 | 0;
                                                      };
                                                      var customData = /* tuple */[
                                                        100,
                                                        customData_001
                                                      ];
                                                      var state = ManageIMGUIAPI$Wonderjs.setIMGUIFunc(customData, imguiFunc, match[0]);
                                                      MainStateTool$Wonderjs.setState(state);
                                                      return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
                                                                    return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
                                                                                  return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
                                                                                                return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, {
                                                                                                                      ioData: Sinon$1.match.any,
                                                                                                                      customData: undefined,
                                                                                                                      imguiFunc: undefined
                                                                                                                    }, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                                              }), undefined, /* () */0);
                                                                                }), undefined, /* () */0);
                                                                  }), undefined, /* () */0);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("else", (function () {
                                return Wonder_jest.testPromise("send data", (function () {
                                              var match = IMGUIWorkerTool$Wonderjs.prepareForTestSendRenderData(sandbox);
                                              var postMessageToRenderWorker = match[1];
                                              var imguiFunc = function (_, _$1, state) {
                                                return state;
                                              };
                                              var customData_001 = function (a) {
                                                return a + 1 | 0;
                                              };
                                              var customData = /* tuple */[
                                                100,
                                                customData_001
                                              ];
                                              var state = ManageIMGUIAPI$Wonderjs.setIMGUIFunc(customData, imguiFunc, match[0]);
                                              MainStateTool$Wonderjs.setState(state);
                                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
                                                            return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, undefined, {
                                                                                  ioData: Sinon$1.match.any,
                                                                                  customData: RenderIMGUIRenderWorkerTool$Wonderjs.serializeValueWithFunction(customData),
                                                                                  imguiFunc: RenderIMGUIRenderWorkerTool$Wonderjs.serializeFunction(imguiFunc)
                                                                                }, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                          }), undefined, /* () */0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test render worker job", (function () {
                beforeAll((function () {
                        return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                      }));
                afterAll((function () {
                        return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                      }));
                describe("test render imgui", (function () {
                        return Wonder_jest.testPromise("test render image", (function () {
                                      var match = IMGUIWorkerTool$Wonderjs.prepareForTestInRenderWorkerJob(sandbox);
                                      var bufferData = match[1];
                                      var state = ManageIMGUIAPI$Wonderjs.setIMGUIFunc(RenderIMGUITool$WonderImgui.buildImageData(/* () */0), (function (customData, apiJsObj, state) {
                                              var match = customData[0];
                                              var match$1 = match[1];
                                              var match$2 = match[0];
                                              var imageFunc = apiJsObj.image;
                                              return imageFunc(/* tuple */[
                                                          match$2[0],
                                                          match$2[1],
                                                          match$2[2],
                                                          match$2[3]
                                                        ], /* tuple */[
                                                          match$1[0],
                                                          match$1[1],
                                                          match$1[2],
                                                          match$1[3]
                                                        ], match[2], state);
                                            }), match[0]);
                                      return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(bufferData)), 8));
                                                  }), state, sandbox, undefined, /* () */0);
                                    }));
                      }));
                describe("test operate main state if imgui button is click", (function () {
                        describe("can't invoke api to operate main state in imguiFunc!\n          instead, should:", (function () {
                                Wonder_jest.testPromise("set custom data to render worker state in imguiFunc;\n                send custom data to main worker when finish render;", (function () {
                                        var match = IMGUIWorkerTool$Wonderjs.prepareForTestInRenderWorkerJob(sandbox);
                                        var state = RenderIMGUITool$Wonderjs.prepareFntData(match[0]);
                                        var customData = ButtonIMGUITool$WonderImgui.buildButtonData1(/* () */0);
                                        var match$1 = customData[0];
                                        var state$1 = ManageIMGUIAPI$Wonderjs.setIMGUIFunc(customData, (function (customData, apiJsObj, state) {
                                                var match = customData[0];
                                                var buttonFunc = apiJsObj.button;
                                                var setCustomDataFunc = apiJsObj.setCustomDataFromRenderWorkerToMainWorker;
                                                var match$1 = buttonFunc(/* tuple */[
                                                      match[0],
                                                      match[1],
                                                      match[2],
                                                      match[3]
                                                    ], customData[1], state);
                                                var state$1 = match$1[0];
                                                if (match$1[1]) {
                                                  return setCustomDataFunc(1, state$1);
                                                } else {
                                                  return state$1;
                                                }
                                              }), state);
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
                                        MainStateTool$Wonderjs.setState(state$2);
                                        BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                                        return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                      return Promise.resolve(Sinon.toCalledWith(/* array */[GetFinishRenderDataMainWorkerTool$Wonderjs.buildFinishRenderData(1, /* () */0)], Wonder_jest.Expect[/* expect */0](selfPostMessage)));
                                                    }), state$2, sandbox, undefined, /* () */0);
                                      }));
                                return Wonder_jest.test("get custom data in main worker;\n                (so that in the next frame, user can check custom data in main state and operate main state in main worker)", (function () {
                                              var state = MainStateTool$Wonderjs.createState(/* () */0);
                                              var state$1 = GetFinishRenderDataMainWorkerJob$Wonderjs._exec(GetFinishRenderDataMainWorkerTool$Wonderjs.buildFinishRenderData(1, /* () */0), state);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](WorkerDataTool$Wonderjs.getRenderWorkerCustomData(state$1)), 1);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
