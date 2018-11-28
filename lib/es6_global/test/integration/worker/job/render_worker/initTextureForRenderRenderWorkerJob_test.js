

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as WorkerWorkerTool$Wonderjs from "../../tool/WorkerWorkerTool.js";
import * as BrowserDetectTool$Wonderjs from "../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../../tool/job/render_basic/RenderBasicJobTool.js";
import * as TestMainWorkerTool$Wonderjs from "../main_worker/tool/TestMainWorkerTool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../../tool/WorkerJobWorkerTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "./tool/RenderJobsRenderWorkerTool.js";
import * as SendRenderDataMainWorkerJob$Wonderjs from "../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "../main_worker/tool/WorkerInstanceMainWorkerTool.js";
import * as SendRenderRenderDataWorkerTool$Wonderjs from "../tool/SendRenderRenderDataWorkerTool.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js";
import * as ArrayBufferViewSourceTextureTool$Wonderjs from "../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js";
import * as BasicSourceTextureRenderWorkerTool$Wonderjs from "../../tool/BasicSourceTextureRenderWorkerTool.js";
import * as ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs from "../../tool/ArrayBufferViewSourceTextureRenderWorkerTool.js";

describe("test init texture for render render worker job", (function () {
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
        describe("test send render data->init texture to render worker", (function () {
                describe("test basic source texture", (function () {
                        var _prepare = function () {
                          var match = BasicSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                          var match$1 = match[5];
                          var match$2 = match[4];
                          var match$3 = match[3];
                          var gameObject2 = match$3[1];
                          var gameObject1 = match$3[0];
                          var match$4 = match[2];
                          var state = GameObjectAPI$Wonderjs.initGameObject(gameObject2, GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]));
                          return /* tuple */[
                                  state,
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
                        describe("test send texture data", (function () {
                                Wonder_jest.testPromise("send needAddedImageDataArray, needInitedTextureIndexArray", (function () {
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
                                        return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
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
                                                                          }, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                    }), undefined, /* () */0);
                                      }));
                                return Wonder_jest.testPromise("needAddedImageDataArray, needInitedTextureIndexArray shouldn't contain duplicate data", (function () {
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
                                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
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
                                                                                }, undefined, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                          }), undefined, /* () */0);
                                            }));
                              }));
                        return Wonder_jest.testPromise("clear basicSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send", (function () {
                                      _prepare(/* () */0);
                                      return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (state) {
                                                    var match = BasicSourceTextureTool$Wonderjs.getRecord(state);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        match[/* needAddedSourceArray */13].length,
                                                                        match[/* needInitedTextureIndexArray */14].length
                                                                      ]), /* tuple */[
                                                                    0,
                                                                    0
                                                                  ]));
                                                  }), undefined, /* () */0);
                                    }));
                      }));
                describe("test arrayBufferView source texture", (function () {
                        var _prepare = function () {
                          var match = ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                          var match$1 = match[3];
                          var match$2 = match[2];
                          var match$3 = match[1];
                          var gameObject2 = match$3[1];
                          var gameObject1 = match$3[0];
                          var state = GameObjectAPI$Wonderjs.initGameObject(gameObject2, GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]));
                          return /* tuple */[
                                  state,
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
                        describe("test send texture data", (function () {
                                return Wonder_jest.testPromise("send needAddedSourceArray, needInitedTextureIndexArray", (function () {
                                              var match = _prepare(/* () */0);
                                              var match$1 = match[3];
                                              var source2 = match$1[1];
                                              var source1 = match$1[0];
                                              var match$2 = match[2];
                                              var map2 = match$2[1];
                                              var map1 = match$2[0];
                                              var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(match[0]);
                                              var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
                                              return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
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
                                                                                }, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                                          }), undefined, /* () */0);
                                            }));
                              }));
                        Wonder_jest.testPromise("needAddedSourceArray, needInitedTextureIndexArray shouldn't contain duplicate data", (function () {
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
                                return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function () {
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
                                                                  }, undefined, undefined, undefined, undefined, /* () */0)], Wonder_jest.Expect[/* expect */0](postMessageToRenderWorker)));
                                            }), undefined, /* () */0);
                              }));
                        return Wonder_jest.testPromise("clear arrayBufferViewSourceTextureRecord->needAddedSourceArray, needInitedTextureIndexArray after send", (function () {
                                      _prepare(/* () */0);
                                      return WorkerJobWorkerTool$Wonderjs.execMainWorkerJob(SendRenderDataMainWorkerJob$Wonderjs.execJob, (function (state) {
                                                    var match = ArrayBufferViewSourceTextureTool$Wonderjs.getRecord(state);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        match[/* needAddedSourceArray */15].length,
                                                                        match[/* needInitedTextureIndexArray */16].length
                                                                      ]), /* tuple */[
                                                                    0,
                                                                    0
                                                                  ]));
                                                  }), undefined, /* () */0);
                                    }));
                      }));
                describe("test render worker job", (function () {
                        describe("test basic source texture", (function () {
                                var _prepare = function () {
                                  var match = BasicSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                                  var match$1 = match[5];
                                  var match$2 = match[4];
                                  var match$3 = match[3];
                                  var match$4 = match[2];
                                  var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                  return /* tuple */[
                                          state,
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
                                  BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                                  return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                var match = BasicSourceTextureRenderWorkerTool$Wonderjs.createTwoMaps(state);
                                                var match$1 = match[2];
                                                var source4 = match$1[1];
                                                var source3 = match$1[0];
                                                var match$2 = match[1];
                                                var match$3 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithMap(sandbox, match$2[0], match[0]);
                                                var map3 = match$3[5];
                                                var gameObject3 = match$3[1];
                                                var match$4 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithMap(sandbox, match$2[1], match$3[0]);
                                                var map4 = match$4[5];
                                                var gameObject4 = match$4[1];
                                                var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject4, GameObjectAPI$Wonderjs.initGameObject(gameObject3, match$4[0]));
                                                return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function () {
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
                                              }), state, sandbox, undefined, /* () */0);
                                };
                                beforeAll((function () {
                                        return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
                                      }));
                                afterAll((function () {
                                        return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
                                      }));
                                describe("add source to sourceMap", (function () {
                                        return Wonder_jest.testPromise("test for chrome", (function () {
                                                      var match = _prepare(/* () */0);
                                                      var match$1 = match[2];
                                                      var imageDataArrayBuffer4 = match$1[3];
                                                      var imageDataArrayBuffer3 = match$1[2];
                                                      return _judge((function (_, param, param$1) {
                                                                    var source4 = param$1[1];
                                                                    var source3 = param$1[0];
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(param[0], RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                                    BasicSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(param[1], RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
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
                                describe("init added textures", (function () {
                                        return Wonder_jest.testPromise("test create gl texture", (function () {
                                                      var match = _prepare(/* () */0);
                                                      var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                      return _judge((function (_, _$1, _$2) {
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createTexture)), 4);
                                                                  }), state);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test arrayBufferView source texture", (function () {
                        var _prepare = function () {
                          var match = ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoGameObjects(sandbox);
                          var match$1 = match[3];
                          var match$2 = match[2];
                          var match$3 = match[1];
                          var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                          return /* tuple */[
                                  state,
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
                          BrowserDetectTool$Wonderjs.setChrome(/* () */0);
                          return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                        var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                        var match = ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.createTwoMaps(state);
                                        var match$1 = match[2];
                                        var source4 = match$1[1];
                                        var source3 = match$1[0];
                                        var match$2 = match[1];
                                        var match$3 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithMap(sandbox, match$2[0], match[0]);
                                        var map3 = match$3[5];
                                        var gameObject3 = match$3[1];
                                        var match$4 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithMap(sandbox, match$2[1], match$3[0]);
                                        var map4 = match$4[5];
                                        var gameObject4 = match$4[1];
                                        var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject4, GameObjectAPI$Wonderjs.initGameObject(gameObject3, match$4[0]));
                                        return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function () {
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
                                      }), state, sandbox, undefined, /* () */0);
                        };
                        describe("add source to sourceMap", (function () {
                                return Wonder_jest.testPromise("test", (function () {
                                              var match = _prepare(/* () */0);
                                              return _judge((function (_, param, param$1) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(param[0], RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0)),
                                                                            ArrayBufferViewSourceTextureRenderWorkerTool$Wonderjs.unsafeGetSource(param[1], RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0))
                                                                          ]), /* tuple */[
                                                                        param$1[0],
                                                                        param$1[1]
                                                                      ]);
                                                          }), match[0]);
                                            }));
                              }));
                        describe("init added textures", (function () {
                                return Wonder_jest.testPromise("test create gl texture", (function () {
                                              var match = _prepare(/* () */0);
                                              var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                              var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                              return _judge((function (_, _$1, _$2) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(createTexture)), 4);
                                                          }), state);
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
