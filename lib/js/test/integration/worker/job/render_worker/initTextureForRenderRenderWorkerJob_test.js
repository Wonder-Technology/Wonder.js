'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../tool/FakeGlWorkerTool.js");
var WorkerWorkerTool$Wonderjs = require("../../tool/WorkerWorkerTool.js");
var BrowserDetectTool$Wonderjs = require("../../../../tool/service/browserDetect/BrowserDetectTool.js");
var CubemapTextureAPI$Wonderjs = require("../../../../../src/api/texture/CubemapTextureAPI.js");
var CubemapTextureTool$Wonderjs = require("../../../../tool/service/texture/CubemapTextureTool.js");
var TestMainWorkerTool$Wonderjs = require("../main_worker/tool/TestMainWorkerTool.js");
var WorkerJobWorkerTool$Wonderjs = require("../../tool/WorkerJobWorkerTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../tool/service/texture/BasicSourceTextureTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("./tool/RenderJobsRenderWorkerTool.js");
var SendRenderDataMainWorkerJob$Wonderjs = require("../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../main_worker/tool/WorkerInstanceMainWorkerTool.js");
var CubemapTextureRenderWorkerTool$Wonderjs = require("../../tool/texture/CubemapTextureRenderWorkerTool.js");
var SendRenderRenderDataWorkerTool$Wonderjs = require("../tool/SendRenderRenderDataWorkerTool.js");
var ArrayBufferViewSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js");
var ArrayBufferViewSourceTextureTool$Wonderjs = require("../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js");
var BasicSourceTextureRenderWorkerTool$Wonderjs = require("../../tool/texture/BasicSourceTextureRenderWorkerTool.js");
var ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs = require("../../tool/texture/ArrayBufferViewSourceTextureRenderWorkerTool.js");

Wonder_jest.describe("test init texture for render render worker job", (function (param) {
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
        Wonder_jest.describe("test send render data->init texture to render worker", (function (param) {
                Wonder_jest.describe("test basic source texture", (function (param) {
                        var _prepare = function (state) {
                          var match = BasicSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                          var match$1 = match[5];
                          var match$2 = match[4];
                          var match$3 = match[3];
                          var gameObject2 = match$3[1];
                          var gameObject1 = match$3[0];
                          var match$4 = match[2];
                          var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject2, GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]));
                          return /* tuple */[
                                  state$1,
                                  match[1],
                                  /* tuple */[
                                    match$4[0],
                                    match$4[1],
                                    match$4[2],
                                    match$4[3]
                                  ],
                                  /* tuple */[
                                    gameObject1,
                                    gameObject2
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
                        Wonder_jest.describe("test send texture data", (function (param) {
                                Wonder_jest.testPromise("send needAddedImageDataArray, needInitedTextureIndexArray", undefined, (function (param) {
                                        var match = _prepare(/* () */0);
                                        var match$1 = match[5];
                                        var source2 = match$1[1];
                                        var source1 = match$1[0];
                                        var match$2 = match[4];
                                        var map2 = match$2[1];
                                        var map1 = match$2[0];
                                        var match$3 = match[2];
                                        var imageDataArrayBuffer2 = match$3[1];
                                        var imageDataArrayBuffer1 = match$3[0];
                                        var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(match[0]);
                                        var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                        return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                      return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData({
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
                                                                            ],
                                                                            needInitedTextureIndexArray: /* array */[
                                                                              map1,
                                                                              map2
                                                                            ]
                                                                          }, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                    }), undefined, /* () */0);
                                      }));
                                return Wonder_jest.testPromise("needAddedImageDataArray, needInitedTextureIndexArray shouldn't contain duplicate data", undefined, (function (param) {
                                              var match = _prepare(/* () */0);
                                              var match$1 = match[5];
                                              var source2 = match$1[1];
                                              var source1 = match$1[0];
                                              var match$2 = match[4];
                                              var map2 = match$2[1];
                                              var map1 = match$2[0];
                                              var match$3 = match[3];
                                              var match$4 = match[2];
                                              var imageDataArrayBuffer2 = match$4[1];
                                              var imageDataArrayBuffer1 = match$4[0];
                                              var state = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map1, source1, match[0]);
                                              var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map2, source2, state);
                                              var state$2 = GameObjectAPI$Wonderjs.initGameObject(match$3[1], GameObjectAPI$Wonderjs.initGameObject(match$3[0], state$1));
                                              var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(state$2);
                                              var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                            return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData({
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
                                                                                  ],
                                                                                  needInitedTextureIndexArray: /* array */[
                                                                                    map1,
                                                                                    map2
                                                                                  ]
                                                                                }, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                          }), undefined, /* () */0);
                                            }));
                              }));
                        return Wonder_jest.testPromise("clear basicSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send", undefined, (function (param) {
                                      _prepare(/* () */0);
                                      return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (state) {
                                                    var match = BasicSourceTextureTool$Wonderjs.getRecord(state);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        match[/* needAddedSourceArray */12].length,
                                                                        match[/* needInitedTextureIndexArray */13].length
                                                                      ]), /* tuple */[
                                                                    0,
                                                                    0
                                                                  ]));
                                                  }), undefined, /* () */0);
                                    }));
                      }));
                Wonder_jest.describe("test arrayBufferView source texture", (function (param) {
                        var _prepare = function (state) {
                          var match = ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                          var match$1 = match[3];
                          var match$2 = match[2];
                          var match$3 = match[1];
                          var gameObject2 = match$3[1];
                          var gameObject1 = match$3[0];
                          var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject2, GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]));
                          return /* tuple */[
                                  state$1,
                                  /* tuple */[
                                    gameObject1,
                                    gameObject2
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
                        Wonder_jest.describe("test send texture data", (function (param) {
                                return Wonder_jest.testPromise("send needAddedSourceArray, needInitedTextureIndexArray", undefined, (function (param) {
                                              var match = _prepare(/* () */0);
                                              var match$1 = match[3];
                                              var source2 = match$1[1];
                                              var source1 = match$1[0];
                                              var match$2 = match[2];
                                              var map2 = match$2[1];
                                              var map1 = match$2[0];
                                              var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(match[0]);
                                              var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                            return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, {
                                                                                  needAddedSourceArray: /* array */[
                                                                                    /* tuple */[
                                                                                      map1,
                                                                                      source1
                                                                                    ],
                                                                                    /* tuple */[
                                                                                      map2,
                                                                                      source2
                                                                                    ]
                                                                                  ],
                                                                                  needInitedTextureIndexArray: /* array */[
                                                                                    map1,
                                                                                    map2
                                                                                  ]
                                                                                }, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                          }), undefined, /* () */0);
                                            }));
                              }));
                        Wonder_jest.testPromise("needAddedSourceArray, needInitedTextureIndexArray shouldn't contain duplicate data", undefined, (function (param) {
                                var match = _prepare(/* () */0);
                                var match$1 = match[3];
                                var source2 = match$1[1];
                                var source1 = match$1[0];
                                var match$2 = match[2];
                                var map2 = match$2[1];
                                var map1 = match$2[0];
                                var match$3 = match[1];
                                var state = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(map1, source1, match[0]);
                                var state$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(map2, source2, state);
                                var state$2 = GameObjectAPI$Wonderjs.initGameObject(match$3[1], GameObjectAPI$Wonderjs.initGameObject(match$3[0], state$1));
                                var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(state$2);
                                var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                              return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, {
                                                                    needAddedSourceArray: /* array */[
                                                                      /* tuple */[
                                                                        map1,
                                                                        source1
                                                                      ],
                                                                      /* tuple */[
                                                                        map2,
                                                                        source2
                                                                      ]
                                                                    ],
                                                                    needInitedTextureIndexArray: /* array */[
                                                                      map1,
                                                                      map2
                                                                    ]
                                                                  }, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                            }), undefined, /* () */0);
                              }));
                        return Wonder_jest.testPromise("clear arrayBufferViewSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send", undefined, (function (param) {
                                      _prepare(/* () */0);
                                      return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (state) {
                                                    var match = ArrayBufferViewSourceTextureTool$Wonderjs.getRecord(state);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        match[/* needAddedSourceArray */14].length,
                                                                        match[/* needInitedTextureIndexArray */15].length
                                                                      ]), /* tuple */[
                                                                    0,
                                                                    0
                                                                  ]));
                                                  }), undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("test cubemap texture", (function (param) {
                              var _prepare = function (state) {
                                var match = CubemapTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoMaps(sandbox);
                                var match$1 = match[4];
                                var match$2 = match[3];
                                var map2 = match$2[1];
                                var map1 = match$2[0];
                                var match$3 = match[2];
                                var state$1 = WorkerWorkerTool$Wonderjs.setFakeWorkersAndSetState(match[0]);
                                var state$2 = CubemapTextureAPI$Wonderjs.initCubemapTexture(map2, CubemapTextureAPI$Wonderjs.initCubemapTexture(map1, state$1));
                                return /* tuple */[
                                        state$2,
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
                                          map1,
                                          map2
                                        ],
                                        /* tuple */[
                                          match$1[0],
                                          match$1[1]
                                        ]
                                      ];
                              };
                              Wonder_jest.describe("test send texture data", (function (param) {
                                      Wonder_jest.testPromise("send all needAddedImageDataArray data and needInitedTextureIndexArray", undefined, (function (param) {
                                              var match = _prepare(/* () */0);
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
                                              var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(match[0]);
                                              var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                            return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, {
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
                                                                                  ],
                                                                                  needInitedTextureIndexArray: /* array */[
                                                                                    map1,
                                                                                    map2
                                                                                  ]
                                                                                }, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                          }), undefined, /* () */0);
                                            }));
                                      return Wonder_jest.testPromise("all needAddedImageDataArray data and needInitedTextureIndexArray shouldn't contain duplicate data", undefined, (function (param) {
                                                    var match = _prepare(/* () */0);
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
                                                    var state = CubemapTextureAPI$Wonderjs.setCubemapTexturePXSource(map1, pxSource1, match[0]);
                                                    var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTexturePYSource(map2, pySource2, state);
                                                    var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(state$1);
                                                    var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                                    return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (param) {
                                                                  return Promise.resolve(Sinon.toCalledWith(/* array */[SendRenderRenderDataWorkerTool$Wonderjs.buildRenderRenderData(undefined, undefined, {
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
                                                                                        ],
                                                                                        needInitedTextureIndexArray: /* array */[
                                                                                          map1,
                                                                                          map2
                                                                                        ]
                                                                                      }, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                                }), undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.testPromise("clear cubemapTextureRecord->all needAddedSourceArray data and needInitedTextureIndexArray after send", undefined, (function (param) {
                                            _prepare(/* () */0);
                                            return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (state) {
                                                          var match = CubemapTextureTool$Wonderjs.getRecord(state);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                                                        ]));
                                                        }), undefined, /* () */0);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test render worker job", (function (param) {
                      Wonder_jest.describe("test basic source texture", (function (param) {
                              var _prepare = function (state) {
                                var match = BasicSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                                var match$1 = match[5];
                                var match$2 = match[4];
                                var match$3 = match[3];
                                var match$4 = match[2];
                                var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                return /* tuple */[
                                        state$1,
                                        match[1],
                                        /* tuple */[
                                          match$4[0],
                                          match$4[1],
                                          match$4[2],
                                          match$4[3]
                                        ],
                                        /* tuple */[
                                          match$3[0],
                                          match$3[1]
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
                              var _judge = function (judgeFunc, state) {
                                var state$1 = BrowserDetectTool$Wonderjs.setChrome(state);
                                return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                              var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                              var match = BasicSourceTextureRenderWorkerTool$Wonderjs.createTwoMaps(state);
                                              var match$1 = match[2];
                                              var source4 = match$1[1];
                                              var source3 = match$1[0];
                                              var match$2 = match[1];
                                              var match$3 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithDiffuseMap(sandbox, match$2[0], match[0]);
                                              var map3 = match$3[5];
                                              var gameObject3 = match$3[1];
                                              var match$4 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithDiffuseMap(sandbox, match$2[1], match$3[0]);
                                              var map4 = match$4[5];
                                              var gameObject4 = match$4[1];
                                              var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject4, GameObjectAPI$Wonderjs.initGameObject(gameObject3, match$4[0]));
                                              return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function (param) {
                                                            return Promise.resolve(Curry._3(judgeFunc, /* tuple */[
                                                                            gameObject3,
                                                                            gameObject4
                                                                          ], /* tuple */[
                                                                            map3,
                                                                            map4
                                                                          ], /* tuple */[
                                                                            source3,
                                                                            source4
                                                                          ]));
                                                          }), state$1, sandbox, undefined, /* () */0);
                                            }), state$1, sandbox, undefined, /* () */0);
                              };
                              Wonder_jest.beforeAllPromise(undefined, (function (param) {
                                      return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                                    }));
                              Wonder_jest.afterAllPromise(undefined, (function (param) {
                                      return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                                    }));
                              Wonder_jest.describe("add source to sourceMap", (function (param) {
                                      return Wonder_jest.testPromise("test for chrome", undefined, (function (param) {
                                                    var match = _prepare(/* () */0);
                                                    var match$1 = match[2];
                                                    var imageDataArrayBuffer4 = match$1[3];
                                                    var imageDataArrayBuffer3 = match$1[2];
                                                    return _judge((function (param, param$1, param$2) {
                                                                  var source4 = param$2[1];
                                                                  var source3 = param$2[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(param$1[0], RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                  BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(param$1[1], RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                ]), /* tuple */[
                                                                              /* array */[
                                                                                imageDataArrayBuffer3,
                                                                                source3.width,
                                                                                source3.height,
                                                                                {
                                                                                  imageOrientation: "flipY"
                                                                                }
                                                                              ],
                                                                              /* array */[
                                                                                imageDataArrayBuffer4,
                                                                                source4.width,
                                                                                source4.height,
                                                                                {
                                                                                  imageOrientation: "flipY"
                                                                                }
                                                                              ]
                                                                            ]);
                                                                }), match[0]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("init added textures", (function (param) {
                                            return Wonder_jest.testPromise("test create gl texture", undefined, (function (param) {
                                                          var match = _prepare(/* () */0);
                                                          var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                          var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                          return _judge((function (param, param$1, param$2) {
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createTexture)), 4);
                                                                      }), state);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test arrayBufferView source texture", (function (param) {
                                    var _prepare = function (state) {
                                      var match = ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                                      var match$1 = match[3];
                                      var match$2 = match[2];
                                      var match$3 = match[1];
                                      var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      return /* tuple */[
                                              state$1,
                                              /* tuple */[
                                                match$3[0],
                                                match$3[1]
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
                                    var _judge = function (judgeFunc, state) {
                                      var state$1 = BrowserDetectTool$Wonderjs.setChrome(state);
                                      return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                    var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                    var match = ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.createTwoMaps(state);
                                                    var match$1 = match[2];
                                                    var source4 = match$1[1];
                                                    var source3 = match$1[0];
                                                    var match$2 = match[1];
                                                    var match$3 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithDiffuseMap(sandbox, match$2[0], match[0]);
                                                    var map3 = match$3[5];
                                                    var gameObject3 = match$3[1];
                                                    var match$4 = FrontRenderLightJobTool$Wonderjs.prepareGameObjectWithDiffuseMap(sandbox, match$2[1], match$3[0]);
                                                    var map4 = match$4[5];
                                                    var gameObject4 = match$4[1];
                                                    var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject4, GameObjectAPI$Wonderjs.initGameObject(gameObject3, match$4[0]));
                                                    return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function (param) {
                                                                  return Promise.resolve(Curry._3(judgeFunc, /* tuple */[
                                                                                  gameObject3,
                                                                                  gameObject4
                                                                                ], /* tuple */[
                                                                                  map3,
                                                                                  map4
                                                                                ], /* tuple */[
                                                                                  source3,
                                                                                  source4
                                                                                ]));
                                                                }), state$1, sandbox, undefined, /* () */0);
                                                  }), state$1, sandbox, undefined, /* () */0);
                                    };
                                    Wonder_jest.describe("add source to sourceMap", (function (param) {
                                            return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                          var match = _prepare(/* () */0);
                                                          return _judge((function (param, param$1, param$2) {
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(param$1[0], RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                        ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(param$1[1], RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                                      ]), /* tuple */[
                                                                                    param$2[0],
                                                                                    param$2[1]
                                                                                  ]);
                                                                      }), match[0]);
                                                        }));
                                          }));
                                    return Wonder_jest.describe("init added textures", (function (param) {
                                                  return Wonder_jest.testPromise("test create gl texture", undefined, (function (param) {
                                                                var match = _prepare(/* () */0);
                                                                var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                return _judge((function (param, param$1, param$2) {
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createTexture)), 4);
                                                                            }), state);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
