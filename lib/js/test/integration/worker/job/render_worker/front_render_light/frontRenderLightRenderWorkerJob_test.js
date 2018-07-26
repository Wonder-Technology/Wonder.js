'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var SceneAPI$Wonderjs = require("../../../../../../src/api/SceneAPI.js");
var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var TransformAPI$Wonderjs = require("../../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var GLSLSenderTool$Wonderjs = require("../../../../../tool/service/sender/GLSLSenderTool.js");
var TestWorkerTool$Wonderjs = require("../../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var GLSLLocationTool$Wonderjs = require("../../../../../tool/service/location/GLSLLocationTool.js");
var TestMainWorkerTool$Wonderjs = require("../../main_worker/tool/TestMainWorkerTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../tool/RenderJobsRenderWorkerTool.js");
var FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../../tool/job/FrontRenderLightForNoWorkerAndWorkerJobTool.js");

describe("test front render light render worker job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, 10, 10, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        describe("use program", (function () {
                var _prepare = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareForUseProgramCase;
                return Wonder_jest.testPromise("test use", (function () {
                              var match = RenderJobsRenderWorkerTool$Wonderjs.prepareForUseProgramCase(sandbox, _prepare, state[0]);
                              var useProgram = match[2];
                              var program = match[1];
                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                            return Promise.resolve(Sinon.toCalledWith(/* array */[program], Wonder_jest.Expect[/* expect */0](useProgram)));
                                          }), match[0], sandbox, undefined, /* () */0);
                            }));
              }));
        describe("send uniform data", (function () {
                describe("test send u_normalMatrix", (function () {
                        return Wonder_jest.testPromise("test send", (function () {
                                      var match = GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* prepareSendUniformData */0](sandbox, FrontRenderLightJobTool$Wonderjs.prepareGameObject, state[0]);
                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                            1,
                                            2,
                                            3
                                          ], match[0]);
                                      var uniformMatrix3fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_normalMatrix");
                                      var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(uniformMatrix3fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                      return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                    return Promise.resolve(Sinon.toCalledWith(/* array */[
                                                                    0,
                                                                    false,
                                                                    new Float32Array(/* array */[
                                                                          1,
                                                                          0,
                                                                          0,
                                                                          0,
                                                                          1,
                                                                          0,
                                                                          0,
                                                                          0,
                                                                          1
                                                                        ])
                                                                  ], Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(0, uniformMatrix3fv))));
                                                  }), state$2, sandbox, undefined, /* () */0);
                                    }));
                      }));
                describe("test send light record", (function () {
                        describe("test send ambient light data", (function () {
                                return Wonder_jest.testPromise("send u_ambient", (function () {
                                              var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                              var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                              var state$1 = SceneAPI$Wonderjs.setAmbientLightColor(/* array */[
                                                    1,
                                                    0,
                                                    0.5
                                                  ], match$1[0]);
                                              var match$2 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_ambient"], state$1);
                                              var uniform3f = match$2[2][1];
                                              var posArr = match$2[1];
                                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                            return Promise.resolve(Sinon.toCalledWith(/* array */[
                                                                            Caml_array.caml_array_get(posArr, 0),
                                                                            1,
                                                                            0,
                                                                            0.5
                                                                          ], Wonder_jest.Expect[/* expect */0](uniform3f)));
                                                          }), match$2[0], sandbox, undefined, /* () */0);
                                            }));
                              }));
                        describe("test send direction light record", (function () {
                                describe("send structure record", (function () {
                                        describe("send position", (function () {
                                                return Wonder_jest.testPromise("test one light", (function () {
                                                              var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                              var state$1 = match[0];
                                                              var state$2 = TransformAPI$Wonderjs.setTransformPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match[1], state$1), /* tuple */[
                                                                    1,
                                                                    2,
                                                                    3
                                                                  ], state$1);
                                                              var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_directionLights[0].position"], state$2);
                                                              var uniform3f = match$1[2][1];
                                                              var posArr = match$1[1];
                                                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                                            return Promise.resolve(Sinon.toCalledWith(/* array */[
                                                                                            Caml_array.caml_array_get(posArr, 0),
                                                                                            1,
                                                                                            2,
                                                                                            3
                                                                                          ], Wonder_jest.Expect[/* expect */0](uniform3f)));
                                                                          }), match$1[0], sandbox, undefined, /* () */0);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test send point light record", (function () {
                                describe("send structure record", (function () {
                                        describe("send position", (function () {
                                                return Wonder_jest.testPromise("test four lights", (function () {
                                                              var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareFourForPointLight(sandbox, state[0]);
                                                              var match$1 = match[1];
                                                              var state$1 = match[0];
                                                              var state$2 = TransformAPI$Wonderjs.setTransformPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[3], state$1), /* tuple */[
                                                                    4,
                                                                    2,
                                                                    3
                                                                  ], TransformAPI$Wonderjs.setTransformPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[2], state$1), /* tuple */[
                                                                        3,
                                                                        2,
                                                                        3
                                                                      ], TransformAPI$Wonderjs.setTransformPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[1], state$1), /* tuple */[
                                                                            2,
                                                                            2,
                                                                            3
                                                                          ], TransformAPI$Wonderjs.setTransformPosition(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(match$1[0], state$1), /* tuple */[
                                                                                1,
                                                                                2,
                                                                                3
                                                                              ], state$1))));
                                                              var match$2 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */[
                                                                    "u_pointLights[0].position",
                                                                    "u_pointLights[1].position",
                                                                    "u_pointLights[2].position",
                                                                    "u_pointLights[3].position"
                                                                  ], state$2);
                                                              var uniform3f = match$2[2][1];
                                                              var posArr = match$2[1];
                                                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 0), uniform3f))),
                                                                                                Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 1), uniform3f))),
                                                                                                Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 2), uniform3f))),
                                                                                                Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 3), uniform3f)))
                                                                                              ]), /* tuple */[
                                                                                            /* :: */[
                                                                                              Caml_array.caml_array_get(posArr, 0),
                                                                                              /* :: */[
                                                                                                1,
                                                                                                /* :: */[
                                                                                                  2,
                                                                                                  /* :: */[
                                                                                                    3,
                                                                                                    /* [] */0
                                                                                                  ]
                                                                                                ]
                                                                                              ]
                                                                                            ],
                                                                                            /* :: */[
                                                                                              Caml_array.caml_array_get(posArr, 1),
                                                                                              /* :: */[
                                                                                                2,
                                                                                                /* :: */[
                                                                                                  2,
                                                                                                  /* :: */[
                                                                                                    3,
                                                                                                    /* [] */0
                                                                                                  ]
                                                                                                ]
                                                                                              ]
                                                                                            ],
                                                                                            /* :: */[
                                                                                              Caml_array.caml_array_get(posArr, 2),
                                                                                              /* :: */[
                                                                                                3,
                                                                                                /* :: */[
                                                                                                  2,
                                                                                                  /* :: */[
                                                                                                    3,
                                                                                                    /* [] */0
                                                                                                  ]
                                                                                                ]
                                                                                              ]
                                                                                            ],
                                                                                            /* :: */[
                                                                                              Caml_array.caml_array_get(posArr, 3),
                                                                                              /* :: */[
                                                                                                4,
                                                                                                /* :: */[
                                                                                                  2,
                                                                                                  /* :: */[
                                                                                                    3,
                                                                                                    /* [] */0
                                                                                                  ]
                                                                                                ]
                                                                                              ]
                                                                                            ]
                                                                                          ]));
                                                                          }), match$2[0], sandbox, undefined, /* () */0);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
