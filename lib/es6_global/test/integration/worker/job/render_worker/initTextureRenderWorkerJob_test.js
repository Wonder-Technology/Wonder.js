

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as PromiseTool$Wonderjs from "../../../tool/PromiseTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as BrowserDetectTool$Wonderjs from "../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as CubemapTextureTool$Wonderjs from "../../../../tool/service/texture/CubemapTextureTool.js";
import * as TestMainWorkerTool$Wonderjs from "../main_worker/tool/TestMainWorkerTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as MainInitJobMainWorkerTool$Wonderjs from "../main_worker/tool/MainInitJobMainWorkerTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "./tool/RenderJobsRenderWorkerTool.js";
import * as SendInitRenderDataWorkerTool$Wonderjs from "../tool/SendInitRenderDataWorkerTool.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "../main_worker/tool/WorkerInstanceMainWorkerTool.js";
import * as CubemapTextureRenderWorkerTool$Wonderjs from "../../tool/texture/CubemapTextureRenderWorkerTool.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as ArrayBufferViewSourceTextureTool$Wonderjs from "../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js";
import * as BasicSourceTextureRenderWorkerTool$Wonderjs from "../../tool/texture/BasicSourceTextureRenderWorkerTool.js";
import * as ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs from "../../tool/texture/ArrayBufferViewSourceTextureRenderWorkerTool.js";

Wonder_jest.describe("test init texture render worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        return Wonder_jest.describe("init all textures", (function (param) {
                      var _prepareForBasicSourceTexture = function (param) {
                        var match = BasicSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoMaps(sandbox);
                        var match$1 = match[4];
                        var match$2 = match[3];
                        var match$3 = match[2];
                        var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                        return /* tuple */[
                                state,
                                match[1],
                                /* tuple */[
                                  match$3[0],
                                  match$3[1],
                                  match$3[2],
                                  match$3[3]
                                ],
                                /* tuple */[
                                  match$2[0],
                                  match$2[1]
                                ],
                                /* tuple */[
                                  match$1[0],
                                  match$1[1]
                                ]
                              ];
                      };
                      var _prepareForArrayBufferViewSourceTexture = function (param) {
                        var match = ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoMaps(sandbox);
                        var match$1 = match[2];
                        var match$2 = match[1];
                        var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                        return /* tuple */[
                                state,
                                /* tuple */[
                                  match$2[0],
                                  match$2[1]
                                ],
                                /* tuple */[
                                  match$1[0],
                                  match$1[1]
                                ]
                              ];
                      };
                      var _prepareForCubemapTexture = function (param) {
                        var match = CubemapTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoMaps(sandbox);
                        var match$1 = match[4];
                        var match$2 = match[3];
                        var match$3 = match[2];
                        var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                        return /* tuple */[
                                state,
                                match[1],
                                /* tuple */[
                                  match$3[0],
                                  match$3[1],
                                  match$3[2],
                                  match$3[3],
                                  match$3[4],
                                  match$3[5],
                                  match$3[6],
                                  match$3[7],
                                  match$3[8],
                                  match$3[9],
                                  match$3[10],
                                  match$3[11]
                                ],
                                /* tuple */[
                                  match$2[0],
                                  match$2[1]
                                ],
                                /* tuple */[
                                  match$1[0],
                                  match$1[1]
                                ]
                              ];
                      };
                      return Wonder_jest.describe("test init two textures", (function (param) {
                                    Wonder_jest.describe("test send init data to render worker", (function (param) {
                                            Wonder_jest.describe("test source texture", (function (param) {
                                                    var _initTwoGameObjects = function (map1, map2, state) {
                                                      var match = LightMaterialTool$Wonderjs.createGameObject(state);
                                                      var match$1 = LightMaterialTool$Wonderjs.createGameObject(match[0]);
                                                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(match[2], map1, match$1[0]);
                                                      var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(match$1[2], map2, state$1);
                                                      var state$3 = GameObjectAPI$Wonderjs.initGameObject(match[1], state$2);
                                                      return GameObjectAPI$Wonderjs.initGameObject(match$1[1], state$3);
                                                    };
                                                    Wonder_jest.describe("test basic source texture", (function (param) {
                                                            Wonder_jest.describe("contract check", (function (param) {
                                                                    return Wonder_jest.testPromise("basicSourceTextureRecord->needInitedTextureIndexArray should be empty", undefined, (function (param) {
                                                                                  var match = _prepareForBasicSourceTexture(/* () */0);
                                                                                  var match$1 = match[3];
                                                                                  var state = _initTwoGameObjects(match$1[0], match$1[1], match[0]);
                                                                                  MainStateTool$Wonderjs.setState(state);
                                                                                  return PromiseTool$Wonderjs.judgeErrorMessage("basicSourceTextureRecord->needInitedTextureIndexArray should be empty, but actual is 0,1", MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                                    return Promise.resolve(Wonder_jest.fail("should error before"));
                                                                                                  }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0)));
                                                                                }));
                                                                  }));
                                                            Wonder_jest.describe("send needAddedImageDataArray", (function (param) {
                                                                    Wonder_jest.testPromise("convert source to imageData", undefined, (function (param) {
                                                                            var match = _prepareForBasicSourceTexture(/* () */0);
                                                                            var match$1 = match[4];
                                                                            var source2 = match$1[1];
                                                                            var source1 = match$1[0];
                                                                            var match$2 = match[2];
                                                                            var imageDataArrayBuffer2 = match$2[1];
                                                                            var imageDataArrayBuffer1 = match$2[0];
                                                                            var context = match[1];
                                                                            var drawImage = context.drawImage;
                                                                            var getImageData = context.getImageData;
                                                                            return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                          Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, Caml_option.some(SendInitRenderDataWorkerTool$Wonderjs.buildTextureData(undefined, {
                                                                                                                                index: 2,
                                                                                                                                needAddedImageDataArray: /* array */[
                                                                                                                                  /* tuple */[
                                                                                                                                    imageDataArrayBuffer1,
                                                                                                                                    source1.width,
                                                                                                                                    source1.height,
                                                                                                                                    0
                                                                                                                                  ],
                                                                                                                                  /* tuple */[
                                                                                                                                    imageDataArrayBuffer2,
                                                                                                                                    source2.width,
                                                                                                                                    source2.height,
                                                                                                                                    1
                                                                                                                                  ]
                                                                                                                                ]
                                                                                                                              }, undefined, undefined, /* () */0)), undefined, undefined, undefined, /* () */0), postMessageToRenderWorker)),
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
                                                                    return Wonder_jest.describe("fix bug", (function (param) {
                                                                                  return Wonder_jest.testPromise("shouldn't convert undefined source", undefined, (function (param) {
                                                                                                var match = _prepareForBasicSourceTexture(/* () */0);
                                                                                                var match$1 = match[4];
                                                                                                var source2 = match$1[1];
                                                                                                var source1 = match$1[0];
                                                                                                var match$2 = match[2];
                                                                                                var imageDataArrayBuffer2 = match$2[1];
                                                                                                var imageDataArrayBuffer1 = match$2[0];
                                                                                                var context = match[1];
                                                                                                BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(undefined, undefined, match[0]);
                                                                                                context.drawImage;
                                                                                                context.getImageData;
                                                                                                return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, Caml_option.some(SendInitRenderDataWorkerTool$Wonderjs.buildTextureData(undefined, {
                                                                                                                                                  index: 2,
                                                                                                                                                  needAddedImageDataArray: /* array */[
                                                                                                                                                    /* tuple */[
                                                                                                                                                      imageDataArrayBuffer1,
                                                                                                                                                      source1.width,
                                                                                                                                                      source1.height,
                                                                                                                                                      0
                                                                                                                                                    ],
                                                                                                                                                    /* tuple */[
                                                                                                                                                      imageDataArrayBuffer2,
                                                                                                                                                      source2.width,
                                                                                                                                                      source2.height,
                                                                                                                                                      1
                                                                                                                                                    ]
                                                                                                                                                  ]
                                                                                                                                                }, undefined, undefined, /* () */0)), undefined, undefined, undefined, /* () */0), postMessageToRenderWorker))), 1);
                                                                                                            }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                                              }));
                                                                                }));
                                                                  }));
                                                            return Wonder_jest.testPromise("clear basicSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send", undefined, (function (param) {
                                                                          var match = _prepareForBasicSourceTexture(/* () */0);
                                                                          var match$1 = match[3];
                                                                          TestMainWorkerTool$Wonderjs.closeContractCheck(/* () */0);
                                                                          _initTwoGameObjects(match$1[0], match$1[1], match[0]);
                                                                          return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                        var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                                        var match = BasicSourceTextureTool$Wonderjs.getRecord(state);
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                        match[/* needAddedSourceArray */12].length,
                                                                                                        match[/* needInitedTextureIndexArray */13].length
                                                                                                      ]), /* tuple */[
                                                                                                    0,
                                                                                                    0
                                                                                                  ]);
                                                                                      }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                        }));
                                                          }));
                                                    return Wonder_jest.describe("test arrayBufferView source texture", (function (param) {
                                                                  Wonder_jest.describe("contract check", (function (param) {
                                                                          return Wonder_jest.testPromise("arrayBufferViewSourceTextureRecord->needInitedTextureIndexArray should be empty", undefined, (function (param) {
                                                                                        var match = _prepareForArrayBufferViewSourceTexture(/* () */0);
                                                                                        var match$1 = match[1];
                                                                                        var state = _initTwoGameObjects(match$1[0], match$1[1], match[0]);
                                                                                        MainStateTool$Wonderjs.setState(state);
                                                                                        return PromiseTool$Wonderjs.judgeErrorMessage("arrayBufferViewSourceTextureRecord->needInitedTextureIndexArray should be empty", MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                                          return Promise.resolve(Wonder_jest.fail("should error before"));
                                                                                                        }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0)));
                                                                                      }));
                                                                        }));
                                                                  Wonder_jest.describe("send sourceMap", (function (param) {
                                                                          return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                                        var match = _prepareForArrayBufferViewSourceTexture(/* () */0);
                                                                                        var match$1 = match[2];
                                                                                        var source2 = match$1[1];
                                                                                        var source1 = match$1[0];
                                                                                        var match$2 = match[1];
                                                                                        var map2 = match$2[1];
                                                                                        var map1 = match$2[0];
                                                                                        MainStateTool$Wonderjs.setState(match[0]);
                                                                                        return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, Caml_option.some(SendInitRenderDataWorkerTool$Wonderjs.buildTextureData(undefined, undefined, {
                                                                                                                                          index: 2,
                                                                                                                                          sourceMap: MutableSparseMapService$WonderCommonlib.set(map2, source2, MutableSparseMapService$WonderCommonlib.set(map1, source1, MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)))
                                                                                                                                        }, undefined, /* () */0)), undefined, undefined, undefined, /* () */0), postMessageToRenderWorker))), 1);
                                                                                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                                      }));
                                                                        }));
                                                                  return Wonder_jest.testPromise("clear arrayBufferViewSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send", undefined, (function (param) {
                                                                                var match = _prepareForArrayBufferViewSourceTexture(/* () */0);
                                                                                var match$1 = match[1];
                                                                                TestMainWorkerTool$Wonderjs.closeContractCheck(/* () */0);
                                                                                _initTwoGameObjects(match$1[0], match$1[1], match[0]);
                                                                                return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                              var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                                              var match = ArrayBufferViewSourceTextureTool$Wonderjs.getRecord(state);
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[/* needInitedTextureIndexArray */15].length), 0);
                                                                                            }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                              }));
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test cubemap texture", (function (param) {
                                                          Wonder_jest.describe("send needAddedImageDataArray", (function (param) {
                                                                  return Wonder_jest.testPromise("convert source to imageData", undefined, (function (param) {
                                                                                var match = _prepareForCubemapTexture(/* () */0);
                                                                                var match$1 = match[4];
                                                                                var match$2 = match$1[1];
                                                                                var nzSource2 = match$2[5];
                                                                                var pzSource2 = match$2[4];
                                                                                var nySource2 = match$2[3];
                                                                                var pySource2 = match$2[2];
                                                                                var nxSource2 = match$2[1];
                                                                                var pxSource2 = match$2[0];
                                                                                var match$3 = match$1[0];
                                                                                var nzSource1 = match$3[5];
                                                                                var pzSource1 = match$3[4];
                                                                                var nySource1 = match$3[3];
                                                                                var pySource1 = match$3[2];
                                                                                var nxSource1 = match$3[1];
                                                                                var pxSource1 = match$3[0];
                                                                                var match$4 = match[2];
                                                                                var imageDataArrayBuffer12 = match$4[11];
                                                                                var imageDataArrayBuffer11 = match$4[10];
                                                                                var imageDataArrayBuffer10 = match$4[9];
                                                                                var imageDataArrayBuffer9 = match$4[8];
                                                                                var imageDataArrayBuffer8 = match$4[7];
                                                                                var imageDataArrayBuffer7 = match$4[6];
                                                                                var imageDataArrayBuffer6 = match$4[5];
                                                                                var imageDataArrayBuffer5 = match$4[4];
                                                                                var imageDataArrayBuffer4 = match$4[3];
                                                                                var imageDataArrayBuffer3 = match$4[2];
                                                                                var imageDataArrayBuffer2 = match$4[1];
                                                                                var imageDataArrayBuffer1 = match$4[0];
                                                                                var context = match[1];
                                                                                var state = match[0];
                                                                                var drawImage = context.drawImage;
                                                                                var getImageData = context.getImageData;
                                                                                return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                              Sinon.getCallCount(Sinon.withOneArg(SendInitRenderDataWorkerTool$Wonderjs.buildInitRenderData(undefined, undefined, undefined, undefined, Caml_option.some(SendInitRenderDataWorkerTool$Wonderjs.buildTextureData(undefined, undefined, undefined, {
                                                                                                                                    buffer: CubemapTextureTool$Wonderjs.getRecord(state)[/* buffer */1],
                                                                                                                                    index: 2,
                                                                                                                                    needAddedPXImageDataArray: /* array */[
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer1,
                                                                                                                                        pxSource1.width,
                                                                                                                                        pxSource1.height,
                                                                                                                                        0
                                                                                                                                      ],
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer2,
                                                                                                                                        pxSource2.width,
                                                                                                                                        pxSource2.height,
                                                                                                                                        1
                                                                                                                                      ]
                                                                                                                                    ],
                                                                                                                                    needAddedNXImageDataArray: /* array */[
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer3,
                                                                                                                                        nxSource1.width,
                                                                                                                                        nxSource1.height,
                                                                                                                                        0
                                                                                                                                      ],
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer4,
                                                                                                                                        nxSource2.width,
                                                                                                                                        nxSource2.height,
                                                                                                                                        1
                                                                                                                                      ]
                                                                                                                                    ],
                                                                                                                                    needAddedPYImageDataArray: /* array */[
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer5,
                                                                                                                                        pySource1.width,
                                                                                                                                        pySource1.height,
                                                                                                                                        0
                                                                                                                                      ],
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer6,
                                                                                                                                        pySource2.width,
                                                                                                                                        pySource2.height,
                                                                                                                                        1
                                                                                                                                      ]
                                                                                                                                    ],
                                                                                                                                    needAddedNYImageDataArray: /* array */[
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer7,
                                                                                                                                        nySource1.width,
                                                                                                                                        nySource1.height,
                                                                                                                                        0
                                                                                                                                      ],
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer8,
                                                                                                                                        nySource2.width,
                                                                                                                                        nySource2.height,
                                                                                                                                        1
                                                                                                                                      ]
                                                                                                                                    ],
                                                                                                                                    needAddedPZImageDataArray: /* array */[
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer9,
                                                                                                                                        pzSource1.width,
                                                                                                                                        pzSource1.height,
                                                                                                                                        0
                                                                                                                                      ],
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer10,
                                                                                                                                        pzSource2.width,
                                                                                                                                        pzSource2.height,
                                                                                                                                        1
                                                                                                                                      ]
                                                                                                                                    ],
                                                                                                                                    needAddedNZImageDataArray: /* array */[
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer11,
                                                                                                                                        nzSource1.width,
                                                                                                                                        nzSource1.height,
                                                                                                                                        0
                                                                                                                                      ],
                                                                                                                                      /* tuple */[
                                                                                                                                        imageDataArrayBuffer12,
                                                                                                                                        nzSource2.width,
                                                                                                                                        nzSource2.height,
                                                                                                                                        1
                                                                                                                                      ]
                                                                                                                                    ]
                                                                                                                                  }, /* () */0)), undefined, undefined, undefined, /* () */0), postMessageToRenderWorker)),
                                                                                                              Sinon.getCallCount(Sinon.withThreeArgs(pxSource1, 0, 0, drawImage)),
                                                                                                              Sinon.getCallCount(Sinon.withThreeArgs(pxSource2, 0, 0, drawImage)),
                                                                                                              Sinon.getCallCount(Sinon.withThreeArgs(pzSource1, 0, 0, drawImage)),
                                                                                                              Sinon.getCallCount(Sinon.withThreeArgs(pzSource2, 0, 0, drawImage)),
                                                                                                              Sinon.getCallCount(Sinon.withFourArgs(0, 0, pxSource1.width, pxSource1.height, getImageData)),
                                                                                                              Sinon.getCallCount(Sinon.withFourArgs(0, 0, pxSource2.width, pxSource2.height, getImageData))
                                                                                                            ]), /* tuple */[
                                                                                                          1,
                                                                                                          1,
                                                                                                          1,
                                                                                                          1,
                                                                                                          1,
                                                                                                          6,
                                                                                                          6
                                                                                                        ]);
                                                                                            }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.testPromise("clear cubemapTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send", undefined, (function (param) {
                                                                        var match = _prepareForCubemapTexture(/* () */0);
                                                                        var match$1 = match[3];
                                                                        TestMainWorkerTool$Wonderjs.closeContractCheck(/* () */0);
                                                                        CubemapTextureAPI$Wonderjs.initCubemapTexture(match$1[1], CubemapTextureAPI$Wonderjs.initCubemapTexture(match$1[0], match[0]));
                                                                        return MainInitJobMainWorkerTool$Wonderjs.test(sandbox, WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker, (function (postMessageToRenderWorker) {
                                                                                      var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                                      var match = CubemapTextureTool$Wonderjs.getRecord(state);
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                      match[/* needAddedPXSourceArray */28].length,
                                                                                                      match[/* needAddedNXSourceArray */29].length,
                                                                                                      match[/* needAddedPYSourceArray */30].length,
                                                                                                      match[/* needAddedNYSourceArray */31].length,
                                                                                                      match[/* needAddedPZSourceArray */32].length,
                                                                                                      match[/* needAddedNZSourceArray */33].length,
                                                                                                      match[/* needInitedTextureIndexArray */34].length
                                                                                                    ]), /* tuple */[
                                                                                                  0,
                                                                                                  0,
                                                                                                  0,
                                                                                                  0,
                                                                                                  0,
                                                                                                  0,
                                                                                                  0
                                                                                                ]);
                                                                                    }), MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0));
                                                                      }));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test render worker job", (function (param) {
                                                  Wonder_jest.describe("test basic source texture", (function (param) {
                                                          Wonder_jest.beforeAllPromise(undefined, (function (param) {
                                                                  return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                                                                }));
                                                          Wonder_jest.afterAllPromise(undefined, (function (param) {
                                                                  return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                                                                }));
                                                          Wonder_jest.describe("add source to sourceMap", (function (param) {
                                                                  Wonder_jest.describe("test for chrome", (function (param) {
                                                                          Wonder_jest.testPromise("test flipY", undefined, (function (param) {
                                                                                  var match = _prepareForBasicSourceTexture(/* () */0);
                                                                                  var match$1 = match[4];
                                                                                  var source2 = match$1[1];
                                                                                  var source1 = match$1[0];
                                                                                  var match$2 = match[3];
                                                                                  var map2 = match$2[1];
                                                                                  var map1 = match$2[0];
                                                                                  var match$3 = match[2];
                                                                                  var imageDataArrayBuffer2 = match$3[1];
                                                                                  var imageDataArrayBuffer1 = match$3[0];
                                                                                  var state = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(map2, true, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(map1, true, match[0]));
                                                                                  var state$1 = BrowserDetectTool$Wonderjs.setChrome(state);
                                                                                  return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                    BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                                    BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                                                  ]), /* tuple */[
                                                                                                                /* array */[
                                                                                                                  imageDataArrayBuffer1,
                                                                                                                  source1.width,
                                                                                                                  source1.height,
                                                                                                                  {
                                                                                                                    imageOrientation: "flipY"
                                                                                                                  }
                                                                                                                ],
                                                                                                                /* array */[
                                                                                                                  imageDataArrayBuffer2,
                                                                                                                  source2.width,
                                                                                                                  source2.height,
                                                                                                                  {
                                                                                                                    imageOrientation: "flipY"
                                                                                                                  }
                                                                                                                ]
                                                                                                              ]));
                                                                                              }), state$1);
                                                                                }));
                                                                          return Wonder_jest.testPromise("test not flipY", undefined, (function (param) {
                                                                                        var match = _prepareForBasicSourceTexture(/* () */0);
                                                                                        var match$1 = match[4];
                                                                                        var source2 = match$1[1];
                                                                                        var source1 = match$1[0];
                                                                                        var match$2 = match[3];
                                                                                        var map2 = match$2[1];
                                                                                        var map1 = match$2[0];
                                                                                        var match$3 = match[2];
                                                                                        var imageDataArrayBuffer2 = match$3[1];
                                                                                        var imageDataArrayBuffer1 = match$3[0];
                                                                                        var state = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(map2, false, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(map1, false, match[0]));
                                                                                        var state$1 = BrowserDetectTool$Wonderjs.setChrome(state);
                                                                                        return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                          BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                                          BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                                                        ]), /* tuple */[
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer1,
                                                                                                                        source1.width,
                                                                                                                        source1.height,
                                                                                                                        {
                                                                                                                          imageOrientation: "none"
                                                                                                                        }
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer2,
                                                                                                                        source2.width,
                                                                                                                        source2.height,
                                                                                                                        {
                                                                                                                          imageOrientation: "none"
                                                                                                                        }
                                                                                                                      ]
                                                                                                                    ]));
                                                                                                    }), state$1);
                                                                                      }));
                                                                        }));
                                                                  return Wonder_jest.testPromise("test for firefox", undefined, (function (param) {
                                                                                var match = _prepareForBasicSourceTexture(/* () */0);
                                                                                var match$1 = match[4];
                                                                                var source2 = match$1[1];
                                                                                var source1 = match$1[0];
                                                                                var match$2 = match[3];
                                                                                var map2 = match$2[1];
                                                                                var map1 = match$2[0];
                                                                                var match$3 = match[2];
                                                                                var imageDataArrayBuffer2 = match$3[1];
                                                                                var imageDataArrayBuffer1 = match$3[0];
                                                                                var state = BrowserDetectTool$Wonderjs.setFirefox(match[0]);
                                                                                return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                  BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                                  BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                                                ]), /* tuple */[
                                                                                                              /* array */[
                                                                                                                imageDataArrayBuffer1,
                                                                                                                source1.width,
                                                                                                                source1.height,
                                                                                                                undefined
                                                                                                              ],
                                                                                                              /* array */[
                                                                                                                imageDataArrayBuffer2,
                                                                                                                source2.width,
                                                                                                                source2.height,
                                                                                                                undefined
                                                                                                              ]
                                                                                                            ]));
                                                                                            }), state);
                                                                              }));
                                                                }));
                                                          return Wonder_jest.describe("init added textures", (function (param) {
                                                                        return Wonder_jest.testPromise("test create gl texture", undefined, (function (param) {
                                                                                      var match = _prepareForBasicSourceTexture(/* () */0);
                                                                                      var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                                      var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                                      var state$1 = BrowserDetectTool$Wonderjs.setChrome(state);
                                                                                      return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                                                    return Promise.resolve(Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](createTexture)));
                                                                                                  }), state$1);
                                                                                    }));
                                                                      }));
                                                        }));
                                                  Wonder_jest.describe("test arrayBufferView source texture", (function (param) {
                                                          Wonder_jest.describe("add source map", (function (param) {
                                                                  return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                                var match = _prepareForArrayBufferViewSourceTexture(/* () */0);
                                                                                var match$1 = match[2];
                                                                                var source2 = match$1[1];
                                                                                var source1 = match$1[0];
                                                                                var match$2 = match[1];
                                                                                var map2 = match$2[1];
                                                                                var map1 = match$2[0];
                                                                                return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                  ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                                  ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                                                ]), /* tuple */[
                                                                                                              source1,
                                                                                                              source2
                                                                                                            ]));
                                                                                            }), match[0]);
                                                                              }));
                                                                }));
                                                          return Wonder_jest.describe("create gl texture", (function (param) {
                                                                        return Wonder_jest.testPromise("test create", undefined, (function (param) {
                                                                                      var match = _prepareForArrayBufferViewSourceTexture(/* () */0);
                                                                                      var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                                      var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                                      return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                                                    return Promise.resolve(Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](createTexture)));
                                                                                                  }), state);
                                                                                    }));
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("test cubemap texture", (function (param) {
                                                                Wonder_jest.beforeAllPromise(undefined, (function (param) {
                                                                        return Curry._1(CubemapTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                                                                      }));
                                                                Wonder_jest.afterAllPromise(undefined, (function (param) {
                                                                        return Curry._1(CubemapTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                                                                      }));
                                                                Wonder_jest.describe("add source to sourceMap", (function (param) {
                                                                        Wonder_jest.describe("test for chrome", (function (param) {
                                                                                Wonder_jest.testPromise("test flipY", undefined, (function (param) {
                                                                                        var match = _prepareForCubemapTexture(/* () */0);
                                                                                        var match$1 = match[4];
                                                                                        var match$2 = match$1[1];
                                                                                        var nzSource2 = match$2[5];
                                                                                        var pzSource2 = match$2[4];
                                                                                        var nySource2 = match$2[3];
                                                                                        var pySource2 = match$2[2];
                                                                                        var nxSource2 = match$2[1];
                                                                                        var pxSource2 = match$2[0];
                                                                                        var match$3 = match$1[0];
                                                                                        var nzSource1 = match$3[5];
                                                                                        var pzSource1 = match$3[4];
                                                                                        var nySource1 = match$3[3];
                                                                                        var pySource1 = match$3[2];
                                                                                        var nxSource1 = match$3[1];
                                                                                        var pxSource1 = match$3[0];
                                                                                        var match$4 = match[3];
                                                                                        var map2 = match$4[1];
                                                                                        var map1 = match$4[0];
                                                                                        var match$5 = match[2];
                                                                                        var imageDataArrayBuffer12 = match$5[11];
                                                                                        var imageDataArrayBuffer11 = match$5[10];
                                                                                        var imageDataArrayBuffer10 = match$5[9];
                                                                                        var imageDataArrayBuffer9 = match$5[8];
                                                                                        var imageDataArrayBuffer8 = match$5[7];
                                                                                        var imageDataArrayBuffer7 = match$5[6];
                                                                                        var imageDataArrayBuffer6 = match$5[5];
                                                                                        var imageDataArrayBuffer5 = match$5[4];
                                                                                        var imageDataArrayBuffer4 = match$5[3];
                                                                                        var imageDataArrayBuffer3 = match$5[2];
                                                                                        var imageDataArrayBuffer2 = match$5[1];
                                                                                        var imageDataArrayBuffer1 = match$5[0];
                                                                                        var state = CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(map2, true, CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(map1, true, match[0]));
                                                                                        var state$1 = BrowserDetectTool$Wonderjs.setChrome(state);
                                                                                        return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                          CubemapTextureRenderWorkerTool$Wonderjs.unsafeGetAllSources(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                                          CubemapTextureRenderWorkerTool$Wonderjs.unsafeGetAllSources(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                                                        ]), /* tuple */[
                                                                                                                      /* array */[
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer1,
                                                                                                                          pxSource1.width,
                                                                                                                          pxSource1.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ],
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer3,
                                                                                                                          nxSource1.width,
                                                                                                                          nxSource1.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ],
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer5,
                                                                                                                          pySource1.width,
                                                                                                                          pySource1.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ],
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer7,
                                                                                                                          nySource1.width,
                                                                                                                          nySource1.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ],
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer9,
                                                                                                                          pzSource1.width,
                                                                                                                          pzSource1.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ],
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer11,
                                                                                                                          nzSource1.width,
                                                                                                                          nzSource1.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ]
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer2,
                                                                                                                          pxSource2.width,
                                                                                                                          pxSource2.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ],
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer4,
                                                                                                                          nxSource2.width,
                                                                                                                          nxSource2.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ],
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer6,
                                                                                                                          pySource2.width,
                                                                                                                          pySource2.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ],
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer8,
                                                                                                                          nySource2.width,
                                                                                                                          nySource2.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ],
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer10,
                                                                                                                          pzSource2.width,
                                                                                                                          pzSource2.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ],
                                                                                                                        /* array */[
                                                                                                                          imageDataArrayBuffer12,
                                                                                                                          nzSource2.width,
                                                                                                                          nzSource2.height,
                                                                                                                          {
                                                                                                                            imageOrientation: "flipY"
                                                                                                                          }
                                                                                                                        ]
                                                                                                                      ]
                                                                                                                    ]));
                                                                                                    }), state$1);
                                                                                      }));
                                                                                return Wonder_jest.testPromise("test not flipY", undefined, (function (param) {
                                                                                              var match = _prepareForCubemapTexture(/* () */0);
                                                                                              var match$1 = match[4];
                                                                                              var match$2 = match$1[1];
                                                                                              var nzSource2 = match$2[5];
                                                                                              var pzSource2 = match$2[4];
                                                                                              var nySource2 = match$2[3];
                                                                                              var pySource2 = match$2[2];
                                                                                              var nxSource2 = match$2[1];
                                                                                              var pxSource2 = match$2[0];
                                                                                              var match$3 = match$1[0];
                                                                                              var nzSource1 = match$3[5];
                                                                                              var pzSource1 = match$3[4];
                                                                                              var nySource1 = match$3[3];
                                                                                              var pySource1 = match$3[2];
                                                                                              var nxSource1 = match$3[1];
                                                                                              var pxSource1 = match$3[0];
                                                                                              var match$4 = match[3];
                                                                                              var map2 = match$4[1];
                                                                                              var map1 = match$4[0];
                                                                                              var match$5 = match[2];
                                                                                              var imageDataArrayBuffer12 = match$5[11];
                                                                                              var imageDataArrayBuffer11 = match$5[10];
                                                                                              var imageDataArrayBuffer10 = match$5[9];
                                                                                              var imageDataArrayBuffer9 = match$5[8];
                                                                                              var imageDataArrayBuffer8 = match$5[7];
                                                                                              var imageDataArrayBuffer7 = match$5[6];
                                                                                              var imageDataArrayBuffer6 = match$5[5];
                                                                                              var imageDataArrayBuffer5 = match$5[4];
                                                                                              var imageDataArrayBuffer4 = match$5[3];
                                                                                              var imageDataArrayBuffer3 = match$5[2];
                                                                                              var imageDataArrayBuffer2 = match$5[1];
                                                                                              var imageDataArrayBuffer1 = match$5[0];
                                                                                              var state = CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(map2, false, CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(map1, false, match[0]));
                                                                                              var state$1 = BrowserDetectTool$Wonderjs.setChrome(state);
                                                                                              return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                                CubemapTextureRenderWorkerTool$Wonderjs.unsafeGetAllSources(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                                                CubemapTextureRenderWorkerTool$Wonderjs.unsafeGetAllSources(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                                                              ]), /* tuple */[
                                                                                                                            /* array */[
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer1,
                                                                                                                                pxSource1.width,
                                                                                                                                pxSource1.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ],
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer3,
                                                                                                                                nxSource1.width,
                                                                                                                                nxSource1.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ],
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer5,
                                                                                                                                pySource1.width,
                                                                                                                                pySource1.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ],
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer7,
                                                                                                                                nySource1.width,
                                                                                                                                nySource1.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ],
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer9,
                                                                                                                                pzSource1.width,
                                                                                                                                pzSource1.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ],
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer11,
                                                                                                                                nzSource1.width,
                                                                                                                                nzSource1.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ]
                                                                                                                            ],
                                                                                                                            /* array */[
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer2,
                                                                                                                                pxSource2.width,
                                                                                                                                pxSource2.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ],
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer4,
                                                                                                                                nxSource2.width,
                                                                                                                                nxSource2.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ],
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer6,
                                                                                                                                pySource2.width,
                                                                                                                                pySource2.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ],
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer8,
                                                                                                                                nySource2.width,
                                                                                                                                nySource2.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ],
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer10,
                                                                                                                                pzSource2.width,
                                                                                                                                pzSource2.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ],
                                                                                                                              /* array */[
                                                                                                                                imageDataArrayBuffer12,
                                                                                                                                nzSource2.width,
                                                                                                                                nzSource2.height,
                                                                                                                                {
                                                                                                                                  imageOrientation: "none"
                                                                                                                                }
                                                                                                                              ]
                                                                                                                            ]
                                                                                                                          ]));
                                                                                                          }), state$1);
                                                                                            }));
                                                                              }));
                                                                        return Wonder_jest.testPromise("test for firefox", undefined, (function (param) {
                                                                                      var match = _prepareForCubemapTexture(/* () */0);
                                                                                      var match$1 = match[4];
                                                                                      var match$2 = match$1[1];
                                                                                      var nzSource2 = match$2[5];
                                                                                      var pzSource2 = match$2[4];
                                                                                      var nySource2 = match$2[3];
                                                                                      var pySource2 = match$2[2];
                                                                                      var nxSource2 = match$2[1];
                                                                                      var pxSource2 = match$2[0];
                                                                                      var match$3 = match$1[0];
                                                                                      var nzSource1 = match$3[5];
                                                                                      var pzSource1 = match$3[4];
                                                                                      var nySource1 = match$3[3];
                                                                                      var pySource1 = match$3[2];
                                                                                      var nxSource1 = match$3[1];
                                                                                      var pxSource1 = match$3[0];
                                                                                      var match$4 = match[3];
                                                                                      var map2 = match$4[1];
                                                                                      var map1 = match$4[0];
                                                                                      var match$5 = match[2];
                                                                                      var imageDataArrayBuffer12 = match$5[11];
                                                                                      var imageDataArrayBuffer11 = match$5[10];
                                                                                      var imageDataArrayBuffer10 = match$5[9];
                                                                                      var imageDataArrayBuffer9 = match$5[8];
                                                                                      var imageDataArrayBuffer8 = match$5[7];
                                                                                      var imageDataArrayBuffer7 = match$5[6];
                                                                                      var imageDataArrayBuffer6 = match$5[5];
                                                                                      var imageDataArrayBuffer5 = match$5[4];
                                                                                      var imageDataArrayBuffer4 = match$5[3];
                                                                                      var imageDataArrayBuffer3 = match$5[2];
                                                                                      var imageDataArrayBuffer2 = match$5[1];
                                                                                      var imageDataArrayBuffer1 = match$5[0];
                                                                                      var state = CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(map2, true, CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(map1, true, match[0]));
                                                                                      var state$1 = BrowserDetectTool$Wonderjs.setFirefox(state);
                                                                                      return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                        CubemapTextureRenderWorkerTool$Wonderjs.unsafeGetAllSources(map1, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                                                        CubemapTextureRenderWorkerTool$Wonderjs.unsafeGetAllSources(map2, RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                                                      ]), /* tuple */[
                                                                                                                    /* array */[
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer1,
                                                                                                                        pxSource1.width,
                                                                                                                        pxSource1.height,
                                                                                                                        undefined
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer3,
                                                                                                                        nxSource1.width,
                                                                                                                        nxSource1.height,
                                                                                                                        undefined
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer5,
                                                                                                                        pySource1.width,
                                                                                                                        pySource1.height,
                                                                                                                        undefined
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer7,
                                                                                                                        nySource1.width,
                                                                                                                        nySource1.height,
                                                                                                                        undefined
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer9,
                                                                                                                        pzSource1.width,
                                                                                                                        pzSource1.height,
                                                                                                                        undefined
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer11,
                                                                                                                        nzSource1.width,
                                                                                                                        nzSource1.height,
                                                                                                                        undefined
                                                                                                                      ]
                                                                                                                    ],
                                                                                                                    /* array */[
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer2,
                                                                                                                        pxSource2.width,
                                                                                                                        pxSource2.height,
                                                                                                                        undefined
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer4,
                                                                                                                        nxSource2.width,
                                                                                                                        nxSource2.height,
                                                                                                                        undefined
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer6,
                                                                                                                        pySource2.width,
                                                                                                                        pySource2.height,
                                                                                                                        undefined
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer8,
                                                                                                                        nySource2.width,
                                                                                                                        nySource2.height,
                                                                                                                        undefined
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer10,
                                                                                                                        pzSource2.width,
                                                                                                                        pzSource2.height,
                                                                                                                        undefined
                                                                                                                      ],
                                                                                                                      /* array */[
                                                                                                                        imageDataArrayBuffer12,
                                                                                                                        nzSource2.width,
                                                                                                                        nzSource2.height,
                                                                                                                        undefined
                                                                                                                      ]
                                                                                                                    ]
                                                                                                                  ]));
                                                                                                  }), state$1);
                                                                                    }));
                                                                      }));
                                                                return Wonder_jest.describe("init added textures", (function (param) {
                                                                              return Wonder_jest.testPromise("test create gl texture", undefined, (function (param) {
                                                                                            var match = _prepareForCubemapTexture(/* () */0);
                                                                                            var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                                            var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                                            var state$1 = BrowserDetectTool$Wonderjs.setChrome(state);
                                                                                            return RenderJobsRenderWorkerTool$Wonderjs.init((function (state) {
                                                                                                          return Promise.resolve(Sinon.toCalledTwice(Wonder_jest.Expect[/* expect */0](createTexture)));
                                                                                                        }), state$1);
                                                                                          }));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
