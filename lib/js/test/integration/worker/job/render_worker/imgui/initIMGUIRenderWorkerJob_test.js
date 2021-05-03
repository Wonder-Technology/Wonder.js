'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLSLTool$Wonderjs = require("../../../../../tool/render/core/GLSLTool.js");
var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var ScreenService$Wonderjs = require("../../../../../../src/service/primitive/device/ScreenService.js");
var TestWorkerTool$Wonderjs = require("../../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var BrowserDetectTool$Wonderjs = require("../../../../../tool/service/browserDetect/BrowserDetectTool.js");
var RenderIMGUITool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/RenderIMGUITool.js");
var IMGUIRenderWorkerTool$Wonderjs = require("../tool/IMGUIRenderWorkerTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../../tool/service/state/RenderWorkerStateTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var MainInitJobMainWorkerTool$Wonderjs = require("../../main_worker/tool/MainInitJobMainWorkerTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../tool/RenderJobsRenderWorkerTool.js");
var SendInitRenderDataWorkerTool$Wonderjs = require("../../tool/SendInitRenderDataWorkerTool.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../../main_worker/tool/WorkerInstanceMainWorkerTool.js");
var BasicSourceTextureRenderWorkerTool$Wonderjs = require("../../../tool/texture/BasicSourceTextureRenderWorkerTool.js");

Wonder_jest.describe("test init imgui render worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.describe("test send init data to render worker", (function (param) {
                Wonder_jest.testPromise("send canvas size data", undefined, (function (param) {
                        var match = IMGUIRenderWorkerTool$Wonderjs.prepareState(sandbox);
                        MainStateTool$Wonderjs.setState(match[0]);
                        return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                      var match = ScreenService$Wonderjs.queryFullScreenData(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                  canvasWidth: match[2],
                                                                  canvasHeight: match[3],
                                                                  fntData: Sinon$1.match.any,
                                                                  bitmapImageData: Sinon$1.match.any,
                                                                  customTextureSourceDataArr: Sinon$1.match.any,
                                                                  extendData: Sinon$1.match.any
                                                                }, undefined, undefined, /* () */0), postMessageToRenderWorker))), 1);
                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                      }));
                Wonder_jest.describe("send bitmapImageData", (function (param) {
                        return Wonder_jest.testPromise("convert bitmap to imageData", undefined, (function (param) {
                                      var match = IMGUIRenderWorkerTool$Wonderjs.prepareState(sandbox);
                                      var match$1 = match[1];
                                      var context = match$1[1];
                                      var imageDataArrayBuffer1 = match$1[0][0];
                                      var bitmap = {
                                        width: 100,
                                        height: 200
                                      };
                                      var state = IMGUIRenderWorkerTool$Wonderjs.setBitmap(bitmap, match[0]);
                                      MainStateTool$Wonderjs.setState(state);
                                      var drawImage = context.drawImage;
                                      var getImageData = context.getImageData;
                                      return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                                  canvasWidth: Sinon$1.match.any,
                                                                                  canvasHeight: Sinon$1.match.any,
                                                                                  fntData: Sinon$1.match.any,
                                                                                  bitmapImageData: /* tuple */[
                                                                                    imageDataArrayBuffer1,
                                                                                    bitmap.width,
                                                                                    bitmap.height
                                                                                  ],
                                                                                  customTextureSourceDataArr: Sinon$1.match.any,
                                                                                  extendData: Sinon$1.match.any
                                                                                }, undefined, undefined, /* () */0), postMessageToRenderWorker)),
                                                                    Sinon.getCallCount(Sinon.withThreeArgs(bitmap, 0, 0, drawImage)),
                                                                    Sinon.getCallCount(Sinon.withFourArgs(0, 0, bitmap.width, bitmap.height, getImageData))
                                                                  ]), /* tuple */[
                                                                1,
                                                                1,
                                                                1
                                                              ]);
                                                  }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                    }));
                      }));
                Wonder_jest.describe("send customTextureSourceDataArr", (function (param) {
                        return Wonder_jest.testPromise("convert sources to imageData arr", undefined, (function (param) {
                                      var match = IMGUIRenderWorkerTool$Wonderjs.prepareState(sandbox);
                                      var match$1 = match[1];
                                      var context = match$1[1];
                                      var match$2 = match$1[0];
                                      var imageDataArrayBuffer3 = match$2[2];
                                      var imageDataArrayBuffer2 = match$2[1];
                                      var id1 = "a1";
                                      var source1 = {
                                        width: 100,
                                        height: 200
                                      };
                                      var id2 = "a2";
                                      var source2 = {
                                        width: 300,
                                        height: 400
                                      };
                                      var state = IMGUIRenderWorkerTool$Wonderjs.setCustomImageArr(/* array */[
                                            IMGUIRenderWorkerTool$Wonderjs.buildCustomImageData(source1, id1, /* Png */1, /* () */0),
                                            IMGUIRenderWorkerTool$Wonderjs.buildCustomImageData(source2, id2, /* Jpg */0, /* () */0)
                                          ], match[0]);
                                      MainStateTool$Wonderjs.setState(state);
                                      var drawImage = context.drawImage;
                                      var getImageData = context.getImageData;
                                      return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                                  extendData: Sinon$1.match.any,
                                                                                  canvasWidth: Sinon$1.match.any,
                                                                                  canvasHeight: Sinon$1.match.any,
                                                                                  fntData: Sinon$1.match.any,
                                                                                  bitmapImageData: Sinon$1.match.any,
                                                                                  customTextureSourceDataArr: /* array */[
                                                                                    /* tuple */[
                                                                                      /* tuple */[
                                                                                        imageDataArrayBuffer2,
                                                                                        source1.width,
                                                                                        source1.height
                                                                                      ],
                                                                                      id1,
                                                                                      /* Png */1
                                                                                    ],
                                                                                    /* tuple */[
                                                                                      /* tuple */[
                                                                                        imageDataArrayBuffer3,
                                                                                        source2.width,
                                                                                        source2.height
                                                                                      ],
                                                                                      id2,
                                                                                      /* Jpg */0
                                                                                    ]
                                                                                  ]
                                                                                }, undefined, undefined, /* () */0), postMessageToRenderWorker)),
                                                                    Sinon.getCallCount(Sinon.withThreeArgs(source1, 0, 0, drawImage)),
                                                                    Sinon.getCallCount(Sinon.withThreeArgs(source2, 0, 0, drawImage)),
                                                                    Sinon.getCallCount(Sinon.withFourArgs(0, 0, source1.width, source1.height, getImageData)),
                                                                    Sinon.getCallCount(Sinon.withFourArgs(0, 0, source2.width, source2.height, getImageData))
                                                                  ]), /* tuple */[
                                                                1,
                                                                1,
                                                                1,
                                                                1,
                                                                1
                                                              ]);
                                                  }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                    }));
                      }));
                return Wonder_jest.testPromise("send fntData", undefined, (function (param) {
                              var match = IMGUIRenderWorkerTool$Wonderjs.prepareState(sandbox);
                              var state = IMGUIRenderWorkerTool$Wonderjs.setFntData(2, match[0]);
                              MainStateTool$Wonderjs.setState(state);
                              return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                        extendData: Sinon$1.match.any,
                                                                        canvasWidth: Sinon$1.match.any,
                                                                        canvasHeight: Sinon$1.match.any,
                                                                        fntData: JSON.stringify(2),
                                                                        bitmapImageData: Sinon$1.match.any,
                                                                        customTextureSourceDataArr: Sinon$1.match.any
                                                                      }, undefined, undefined, /* () */0), postMessageToRenderWorker))), 1);
                                          }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                            }));
              }));
        return Wonder_jest.describe("test render worker job", (function (param) {
                      var _prepare = function (param) {
                        var match = IMGUIRenderWorkerTool$Wonderjs.prepareSetData(sandbox);
                        var match$1 = match[2];
                        var match$2 = match$1[0];
                        var match$3 = match[1];
                        var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                        var state$1 = BrowserDetectTool$Wonderjs.setChrome(state);
                        return /* tuple */[
                                state$1,
                                /* tuple */[
                                  match$3[0],
                                  match$3[1],
                                  match$3[2]
                                ],
                                /* tuple */[
                                  /* tuple */[
                                    match$2[0],
                                    match$2[1],
                                    match$2[2],
                                    match$2[3]
                                  ],
                                  match$1[1]
                                ]
                              ];
                      };
                      Wonder_jest.beforeAllPromise(undefined, (function (param) {
                              return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                            }));
                      Wonder_jest.afterAllPromise(undefined, (function (param) {
                              return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                            }));
                      Wonder_jest.describe("set bitmap", (function (param) {
                              return Wonder_jest.describe("test for chrome", (function (param) {
                                            return Wonder_jest.testPromise("flipY is false", undefined, (function (param) {
                                                          var match = _prepare(/* () */0);
                                                          var imageDataArrayBuffer1 = match[2][0][0];
                                                          var bitmap = match[1][1];
                                                          return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUIRenderWorkerTool$Wonderjs.getBitmap(RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)[/* imguiRecord */29])), /* array */[
                                                                                        imageDataArrayBuffer1,
                                                                                        bitmap.width,
                                                                                        bitmap.height,
                                                                                        {
                                                                                          imageOrientation: "none"
                                                                                        }
                                                                                      ]));
                                                                      }), match[0]);
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("set customImageArr", (function (param) {
                              return Wonder_jest.describe("test for chrome", (function (param) {
                                            return Wonder_jest.testPromise("flipY is false", undefined, (function (param) {
                                                          var match = _prepare(/* () */0);
                                                          var match$1 = match[2][0];
                                                          var imageDataArrayBuffer3 = match$1[2];
                                                          var imageDataArrayBuffer2 = match$1[1];
                                                          var customImageArr = match[1][2];
                                                          var match$2 = Caml_array.caml_array_get(customImageArr, 0);
                                                          var imageType1 = match$2[2];
                                                          var id1 = match$2[1];
                                                          var source1 = match$2[0];
                                                          var match$3 = Caml_array.caml_array_get(customImageArr, 1);
                                                          var imageType2 = match$3[2];
                                                          var id2 = match$3[1];
                                                          var source2 = match$3[0];
                                                          return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUIRenderWorkerTool$Wonderjs.getCustomImageArr(RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)[/* imguiRecord */29])), /* array */[
                                                                                        /* tuple */[
                                                                                          /* tuple */[
                                                                                            imageDataArrayBuffer2,
                                                                                            source1.width,
                                                                                            source1.height,
                                                                                            {
                                                                                              imageOrientation: "none"
                                                                                            }
                                                                                          ],
                                                                                          id1,
                                                                                          imageType1
                                                                                        ],
                                                                                        /* tuple */[
                                                                                          /* tuple */[
                                                                                            imageDataArrayBuffer3,
                                                                                            source2.width,
                                                                                            source2.height,
                                                                                            {
                                                                                              imageOrientation: "none"
                                                                                            }
                                                                                          ],
                                                                                          id2,
                                                                                          imageType2
                                                                                        ]
                                                                                      ]));
                                                                      }), match[0]);
                                                        }));
                                          }));
                            }));
                      Wonder_jest.testPromise("set fntData", undefined, (function (param) {
                              var match = _prepare(/* () */0);
                              var fntData = match[1][0];
                              return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUIRenderWorkerTool$Wonderjs.getFntData(RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)[/* imguiRecord */29])), fntData));
                                          }), match[0]);
                            }));
                      Wonder_jest.describe("init imgui", (function (param) {
                              return Wonder_jest.testPromise("create program", undefined, (function (param) {
                                            var match = IMGUIRenderWorkerTool$Wonderjs.prepareSetData(sandbox);
                                            var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                            var state$1 = BrowserDetectTool$Wonderjs.setChrome(state);
                                            return RenderJobsRenderWorkerTool$Wonderjs.initWithJob(RenderJobsRenderWorkerTool$Wonderjs.getJobFuncArrExceptInitNoMaterialShader(/* () */0), (function (state) {
                                                          return Promise.resolve(Sinon.toCalledThrice(Wonder_jest.Expect[/* expect */0](createProgram)));
                                                        }), state$1);
                                          }));
                            }));
                      return Wonder_jest.describe("fix bug", (function (param) {
                                    return Wonder_jest.describe("test render empty imgui + a light box", (function (param) {
                                                  return Wonder_jest.testPromise("vs glsl should not contain \"attribute null null;\" ", undefined, (function (param) {
                                                                var match = IMGUIRenderWorkerTool$Wonderjs.prepareSetData(sandbox);
                                                                var getExtension = RenderIMGUITool$WonderImgui.buildNoVAOExtension(sandbox);
                                                                var shaderSource = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(shaderSource), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getExtension), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                                                                var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                                                var state$1 = BrowserDetectTool$Wonderjs.setChrome(match$2[0]);
                                                                return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.contain(GLSLTool$Wonderjs.getVsSource(shaderSource), "attribute null null;")), false));
                                                                            }), state$1);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
