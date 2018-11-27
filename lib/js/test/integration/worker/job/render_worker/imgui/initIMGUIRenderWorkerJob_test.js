'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var GLSLTool$Wonderjs = require("../../../../../tool/render/core/GLSLTool.js");
var IMGUITool$Wonderjs = require("../../../../../tool/service/imgui/IMGUITool.js");
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
var BasicSourceTextureRenderWorkerTool$Wonderjs = require("../../../tool/BasicSourceTextureRenderWorkerTool.js");

describe("test init imgui render worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        describe("test send init data to render worker", (function () {
                Wonder_jest.testPromise("send canvas size data", (function () {
                        var match = IMGUIRenderWorkerTool$Wonderjs.prepareState(sandbox);
                        MainStateTool$Wonderjs.setState(match[0]);
                        return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                      var match = ScreenService$Wonderjs.queryFullScreenData(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                  canvasWidth: match[2],
                                                                  canvasHeight: match[3],
                                                                  setting: Sinon$1.match.any,
                                                                  fntData: Sinon$1.match.any,
                                                                  bitmapImageData: Sinon$1.match.any,
                                                                  customTextureSourceDataArr: Sinon$1.match.any
                                                                }, undefined, undefined, /* () */0), postMessageToRenderWorker))), 1);
                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                      }));
                describe("send bitmapImageData", (function () {
                        return Wonder_jest.testPromise("convert bitmap to imageData", (function () {
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
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                                  canvasWidth: Sinon$1.match.any,
                                                                                  canvasHeight: Sinon$1.match.any,
                                                                                  setting: Sinon$1.match.any,
                                                                                  fntData: Sinon$1.match.any,
                                                                                  bitmapImageData: /* tuple */[
                                                                                    imageDataArrayBuffer1,
                                                                                    bitmap.width,
                                                                                    bitmap.height
                                                                                  ],
                                                                                  customTextureSourceDataArr: Sinon$1.match.any
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
                describe("send customTextureSourceDataArr", (function () {
                        return Wonder_jest.testPromise("convert sources to imageData arr", (function () {
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
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                                  canvasWidth: Sinon$1.match.any,
                                                                                  canvasHeight: Sinon$1.match.any,
                                                                                  setting: Sinon$1.match.any,
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
                Wonder_jest.testPromise("send setting", (function () {
                        var match = IMGUIRenderWorkerTool$Wonderjs.prepareState(sandbox);
                        var match$1 = IMGUITool$Wonderjs.setTextColorSetting(/* array */[
                              0.5,
                              0.5,
                              1
                            ], match[0]);
                        var setting = match$1[1];
                        MainStateTool$Wonderjs.setState(match$1[0]);
                        return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                  canvasWidth: Sinon$1.match.any,
                                                                  canvasHeight: Sinon$1.match.any,
                                                                  setting: JSON.stringify(setting),
                                                                  fntData: Sinon$1.match.any,
                                                                  bitmapImageData: Sinon$1.match.any,
                                                                  customTextureSourceDataArr: Sinon$1.match.any
                                                                }, undefined, undefined, /* () */0), postMessageToRenderWorker))), 1);
                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                      }));
                return Wonder_jest.testPromise("send fntData", (function () {
                              var match = IMGUIRenderWorkerTool$Wonderjs.prepareState(sandbox);
                              var state = IMGUIRenderWorkerTool$Wonderjs.setFntData(2, match[0]);
                              MainStateTool$Wonderjs.setState(state);
                              return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, undefined, {
                                                                        canvasWidth: Sinon$1.match.any,
                                                                        canvasHeight: Sinon$1.match.any,
                                                                        setting: Sinon$1.match.any,
                                                                        fntData: JSON.stringify(2),
                                                                        bitmapImageData: Sinon$1.match.any,
                                                                        customTextureSourceDataArr: Sinon$1.match.any
                                                                      }, undefined, undefined, /* () */0), postMessageToRenderWorker))), 1);
                                          }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                            }));
              }));
        describe("test render worker job", (function () {
                var _prepare = function () {
                  var match = IMGUIRenderWorkerTool$Wonderjs.prepareSetData(sandbox);
                  var match$1 = match[2];
                  var match$2 = match$1[0];
                  var match$3 = match[1];
                  var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                  MainStateTool$Wonderjs.setState(state);
                  BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                  return /* tuple */[
                          state,
                          /* tuple */[
                            match$3[0],
                            match$3[1],
                            match$3[2],
                            match$3[3]
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
                beforeAll((function () {
                        return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                      }));
                afterAll((function () {
                        return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                      }));
                describe("set bitmap", (function () {
                        describe("test for chrome", (function () {
                                return Wonder_jest.testPromise("flipY is false", (function () {
                                              var match = _prepare(/* () */0);
                                              var imageDataArrayBuffer1 = match[2][0][0];
                                              var bitmap = match[1][1];
                                              return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUIRenderWorkerTool$Wonderjs.getBitmap(RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)[/* imguiRecord */27])), /* array */[
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
                        return /* () */0;
                      }));
                describe("set customImageArr", (function () {
                        describe("test for chrome", (function () {
                                return Wonder_jest.testPromise("flipY is false", (function () {
                                              var match = _prepare(/* () */0);
                                              var match$1 = match[2][0];
                                              var imageDataArrayBuffer3 = match$1[2];
                                              var imageDataArrayBuffer2 = match$1[1];
                                              var customImageArr = match[1][3];
                                              var match$2 = Caml_array.caml_array_get(customImageArr, 0);
                                              var imageType1 = match$2[2];
                                              var id1 = match$2[1];
                                              var source1 = match$2[0];
                                              var match$3 = Caml_array.caml_array_get(customImageArr, 1);
                                              var imageType2 = match$3[2];
                                              var id2 = match$3[1];
                                              var source2 = match$3[0];
                                              return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUIRenderWorkerTool$Wonderjs.getCustomImageArr(RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)[/* imguiRecord */27])), /* array */[
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
                        return /* () */0;
                      }));
                Wonder_jest.testPromise("set fntData", (function () {
                        var match = _prepare(/* () */0);
                        var fntData = match[1][0];
                        return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUIRenderWorkerTool$Wonderjs.getFntData(RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)[/* imguiRecord */27])), fntData));
                                    }), match[0]);
                      }));
                Wonder_jest.testPromise("set setting", (function () {
                        var match = _prepare(/* () */0);
                        var setting = match[1][2];
                        return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](IMGUIRenderWorkerTool$Wonderjs.getSetting(RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)[/* imguiRecord */27])), setting));
                                    }), match[0]);
                      }));
                describe("init imgui", (function () {
                        return Wonder_jest.testPromise("create program", (function () {
                                      var match = IMGUIRenderWorkerTool$Wonderjs.prepareSetData(sandbox);
                                      var createProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      MainStateTool$Wonderjs.setState(state);
                                      BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                                      return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                    return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](createProgram)));
                                                  }), state);
                                    }));
                      }));
                describe("fix bug", (function () {
                        describe("test render empty imgui + a light box", (function () {
                                return Wonder_jest.testPromise("vs glsl should not contain \"attribute null null;\" ", (function () {
                                              var match = IMGUIRenderWorkerTool$Wonderjs.prepareSetData(sandbox);
                                              var getExtension = RenderIMGUITool$WonderImgui.buildNoVAOExtension(sandbox);
                                              var shaderSource = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(shaderSource), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getExtension), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              var match$1 = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state);
                                              var match$2 = CameraTool$Wonderjs.createCameraGameObject(match$1[0]);
                                              var state$1 = match$2[0];
                                              MainStateTool$Wonderjs.setState(state$1);
                                              BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                                              return RenderJobsRenderWorkerTool$Wonderjs.init((function () {
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.contain(GLSLTool$Wonderjs.getVsSource(shaderSource), "attribute null null;")), false));
                                                          }), state$1);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
