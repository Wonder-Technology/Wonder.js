'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SceneAPI$Wonderjs = require("../../../../../../src/api/SceneAPI.js");
var CameraTool$Wonderjs = require("../../../../../tool/service/camera/CameraTool.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var TransformAPI$Wonderjs = require("../../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var PointLightAPI$Wonderjs = require("../../../../../../src/api/light/PointLightAPI.js");
var GLSLSenderTool$Wonderjs = require("../../../../../tool/service/sender/GLSLSenderTool.js");
var TestWorkerTool$Wonderjs = require("../../../tool/TestWorkerTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../../src/api/MeshRendererAPI.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var GLSLLocationTool$Wonderjs = require("../../../../../tool/service/location/GLSLLocationTool.js");
var MeshRendererTool$Wonderjs = require("../../../../../tool/service/meshRenderer/MeshRendererTool.js");
var DirectionLightAPI$Wonderjs = require("../../../../../../src/api/light/DirectionLightAPI.js");
var TestMainWorkerTool$Wonderjs = require("../../main_worker/tool/TestMainWorkerTool.js");
var FrontRenderLightJobTool$Wonderjs = require("../../../../../tool/job/no_worker/loop/FrontRenderLightJobTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../tool/RenderJobsRenderWorkerTool.js");
var FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs = require("../../../../tool/job/FrontRenderLightForNoWorkerAndWorkerJobTool.js");

Wonder_jest.describe("test front render light render worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, 10, 12, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.describe("use program", (function (param) {
                var _prepare = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareForUseProgramCase;
                return Wonder_jest.testPromise("test use", undefined, (function (param) {
                              var match = RenderJobsRenderWorkerTool$Wonderjs.prepareForUseProgramCase(sandbox, _prepare, state[0]);
                              var useProgram = match[2];
                              var program = match[1];
                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                            return Promise.resolve(Sinon.toCalledWith(/* array */[program], Wonder_jest.Expect[/* expect */0](useProgram)));
                                          }), match[0], sandbox, undefined, /* () */0);
                            }));
              }));
        Wonder_jest.describe("send uniform data", (function (param) {
                Wonder_jest.describe("test send u_normalMatrix", (function (param) {
                        return Wonder_jest.testPromise("test send", undefined, (function (param) {
                                      var match = GLSLSenderTool$Wonderjs.JudgeSendUniformData[/* prepareSendUniformData */0](sandbox, FrontRenderLightJobTool$Wonderjs.prepareGameObject, state[0]);
                                      var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2][0], /* tuple */[
                                            1,
                                            2,
                                            3
                                          ], match[0]);
                                      var uniformMatrix3fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_normalMatrix");
                                      var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix3fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                      return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
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
                return Wonder_jest.describe("test send light record", (function (param) {
                              Wonder_jest.describe("test send ambient light data", (function (param) {
                                      return Wonder_jest.testPromise("send u_ambient", undefined, (function (param) {
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
                                                    return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                  return Promise.resolve(Sinon.toCalledWith(/* array */[
                                                                                  Caml_array.caml_array_get(posArr, 0),
                                                                                  1,
                                                                                  0,
                                                                                  0.5
                                                                                ], Wonder_jest.Expect[/* expect */0](uniform3f)));
                                                                }), match$2[0], sandbox, undefined, /* () */0);
                                                  }));
                                    }));
                              Wonder_jest.describe("test send direction light record", (function (param) {
                                      return Wonder_jest.describe("send structure record", (function (param) {
                                                    Wonder_jest.describe("send direction", (function (param) {
                                                            return Wonder_jest.testPromise("test one light", undefined, (function (param) {
                                                                          return FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.TestSendDirection[/* testOneLight */0](sandbox, state, FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight, (function (sandbox, callArgArr, uniform3f, state) {
                                                                                        return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                                                      return Promise.resolve(Sinon.toCalledWith(callArgArr, Wonder_jest.Expect[/* expect */0](uniform3f)));
                                                                                                    }), state, sandbox, undefined, /* () */0);
                                                                                      }));
                                                                        }));
                                                          }));
                                                    return Wonder_jest.testPromise("send intensity", undefined, (function (param) {
                                                                  var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForDirectionLight(sandbox, state[0]);
                                                                  var light1 = match[3];
                                                                  var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light1, 2.0, DirectionLightAPI$Wonderjs.setDirectionLightColor(light1, /* array */[
                                                                            1,
                                                                            0.5,
                                                                            0.5
                                                                          ], match[0]));
                                                                  var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_directionLights[0].intensity"], state$1);
                                                                  var uniform1f = match$1[2][0];
                                                                  var posArr = match$1[1];
                                                                  return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 0), uniform1f)))), /* :: */[
                                                                                                Caml_array.caml_array_get(posArr, 0),
                                                                                                /* :: */[
                                                                                                  2.0,
                                                                                                  /* [] */0
                                                                                                ]
                                                                                              ]));
                                                                              }), match$1[0], sandbox, undefined, /* () */0);
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test send point light record", (function (param) {
                                            return Wonder_jest.describe("send structure record", (function (param) {
                                                          Wonder_jest.describe("send position", (function (param) {
                                                                  return Wonder_jest.testPromise("test four lights", undefined, (function (param) {
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
                                                                                return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                                          Wonder_jest.testPromise("send color", undefined, (function (param) {
                                                                  var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForPointLight(sandbox, state[0]);
                                                                  var color1 = /* array */[
                                                                    0.5,
                                                                    1.0,
                                                                    0.5
                                                                  ];
                                                                  var state$1 = PointLightAPI$Wonderjs.setPointLightColor(match[3], color1, match[0]);
                                                                  var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].color"], state$1);
                                                                  var uniform3f = match$1[2][1];
                                                                  var posArr = match$1[1];
                                                                  return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 0), uniform3f)))), /* :: */[
                                                                                                Caml_array.caml_array_get(posArr, 0),
                                                                                                /* :: */[
                                                                                                  Caml_array.caml_array_get(color1, 0),
                                                                                                  /* :: */[
                                                                                                    Caml_array.caml_array_get(color1, 1),
                                                                                                    /* :: */[
                                                                                                      Caml_array.caml_array_get(color1, 2),
                                                                                                      /* [] */0
                                                                                                    ]
                                                                                                  ]
                                                                                                ]
                                                                                              ]));
                                                                              }), match$1[0], sandbox, undefined, /* () */0);
                                                                }));
                                                          return Wonder_jest.testPromise("send intensity", undefined, (function (param) {
                                                                        var match = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.prepareOneForPointLight(sandbox, state[0]);
                                                                        var light1 = match[3];
                                                                        var state$1 = PointLightAPI$Wonderjs.setPointLightIntensity(light1, 2.0, PointLightAPI$Wonderjs.setPointLightColor(light1, /* array */[
                                                                                  1,
                                                                                  0.5,
                                                                                  0.5
                                                                                ], match[0]));
                                                                        var match$1 = FrontRenderLightForNoWorkerAndWorkerJobTool$Wonderjs.setFakeGlForLight(sandbox, /* array */["u_pointLights[0].intensity"], state$1);
                                                                        var uniform1f = match$1[2][0];
                                                                        var posArr = match$1[1];
                                                                        return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getArgs(Sinon.getCall(0, Sinon.withOneArg(Caml_array.caml_array_get(posArr, 0), uniform1f)))), /* :: */[
                                                                                                      Caml_array.caml_array_get(posArr, 0),
                                                                                                      /* :: */[
                                                                                                        2.0,
                                                                                                        /* [] */0
                                                                                                      ]
                                                                                                    ]));
                                                                                    }), match$1[0], sandbox, undefined, /* () */0);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("draw", (function (param) {
                      return Wonder_jest.describe("drawElements", (function (param) {
                                    return Wonder_jest.testPromise("test drawMode", undefined, (function (param) {
                                                  var match = FrontRenderLightJobTool$Wonderjs.prepareGameObject(sandbox, state[0]);
                                                  var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                                                  var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(match[4], MeshRendererTool$Wonderjs.getLines(/* () */0), match$1[0]);
                                                  var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                  var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                  return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                                                return Promise.resolve(Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg(1, drawElements))));
                                                              }), state$2, sandbox, undefined, /* () */0);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
