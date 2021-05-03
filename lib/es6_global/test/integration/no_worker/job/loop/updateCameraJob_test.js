

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ViewTool$Wonderjs from "../../../../tool/service/device/ViewTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as Vector3Tool$Wonderjs from "../../../../tool/service/atom/Vector3Tool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as OptionService$Wonderjs from "../../../../../src/service/atom/OptionService.js";
import * as NoWorkerJobTool$Wonderjs from "../../../../tool/service/job/no_worker/NoWorkerJobTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as FlyCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/FlyCameraControllerAPI.js";
import * as FlyCameraControllerTool$Wonderjs from "../../../../tool/service/camera_controller/FlyCameraControllerTool.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as ArcballCameraControllerTool$Wonderjs from "../../../../tool/service/camera_controller/ArcballCameraControllerTool.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";
import * as RotateFlyCameraControllerMainService$Wonderjs from "../../../../../src/service/state/main/camera_controller/fly/RotateFlyCameraControllerMainService.js";

Wonder_jest.describe("test update camera job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("update perspectiveCameraProjection", (function (param) {
                var _buildNoWorkerJobConfig = function (param) {
                  return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n        [\n          {\n            \"name\": \"default\",\n            \"jobs\": [\n              {\n                \"name\": \"update_camera\"\n              }\n            ]\n          }\n        ]\n        ", undefined, "\n          [\n            {\n              \"name\": \"update_camera\"\n            }\n          ]\n        ", /* () */0);
                };
                beforeEach((function () {
                        state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, undefined, /* () */0);
                        return /* () */0;
                      }));
                CameraTool$Wonderjs.testBuildPMatrix((function (param) {
                        return state[0];
                      }), (function (state) {
                        return DirectorTool$Wonderjs.run(state, undefined, /* () */0);
                      }));
                Wonder_jest.test("test dirty during multi updates", (function (param) {
                        var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state[0]);
                        var perspectiveCameraProjection = match[2];
                        var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(match[0]);
                        var state$2 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.2, state$1);
                        var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraProjectionPMatrix(perspectiveCameraProjection, state$3)), new Float32Array(/* array */[
                                        1.7320508075688776,
                                        0,
                                        0,
                                        0,
                                        0,
                                        1.7320508075688776,
                                        0,
                                        0,
                                        0,
                                        0,
                                        -1.0004000800160033,
                                        -1,
                                        0,
                                        0,
                                        -0.40008001600320064,
                                        0
                                      ]));
                      }));
                return Wonder_jest.test("test mark dirty", (function (param) {
                              var match = CameraTool$Wonderjs.createCameraGameObjectWithoutAspect(state[0]);
                              var cameraProjection1 = match[3][1];
                              var __x = SettingTool$Wonderjs.buildFakeCanvasWithSize(SettingTool$Wonderjs.buildFakeGl(sandbox), sandbox, undefined, 100, 150, /* () */0);
                              var state$1 = ViewTool$Wonderjs.setCanvas(__x, match[0]);
                              var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                              var __x$1 = SettingTool$Wonderjs.buildFakeCanvasWithSize(SettingTool$Wonderjs.buildFakeGl(sandbox), sandbox, undefined, 200, 150, /* () */0);
                              var state$3 = ViewTool$Wonderjs.setCanvas(__x$1, state$2);
                              var state$4 = PerspectiveCameraProjectionAPI$Wonderjs.markPerspectiveCameraProjectionDirty(cameraProjection1, state$3);
                              var state$5 = DirectorTool$Wonderjs.runWithDefaultTime(state$4);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](PerspectiveCameraProjectionTool$Wonderjs.unsafeGetPMatrix(cameraProjection1, state$5)), new Float32Array(/* array */[
                                              1.299038052558899,
                                              0,
                                              0,
                                              0,
                                              0,
                                              1.7320507764816284,
                                              0,
                                              0,
                                              0,
                                              0,
                                              -1.0002000331878662,
                                              -1,
                                              0,
                                              0,
                                              -0.20002000033855438,
                                              0
                                            ]));
                            }));
              }));
        Wonder_jest.describe("update arcballCameraController", (function (param) {
                var _prepare = function ($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, param) {
                  var distance = $staropt$star !== undefined ? $staropt$star : 0;
                  var phi = $staropt$star$1 !== undefined ? $staropt$star$1 : 1.57;
                  var theta = $staropt$star$2 !== undefined ? $staropt$star$2 : 1.57;
                  var target = $staropt$star$3 !== undefined ? $staropt$star$3 : /* tuple */[
                      1,
                      2,
                      3
                    ];
                  var directionArray = $staropt$star$4 !== undefined ? $staropt$star$4 : /* array */[];
                  var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                  {\n                    \"name\": \"default\",\n                    \"jobs\": [\n                      {\n                        \"name\": \"update_camera\"\n                      }\n                    ]\n                  }\n                ]\n              ", undefined, "\n                [\n                  {\n                    \"name\": \"update_camera\"\n                  }\n                ]\n              ", /* () */0), undefined, /* () */0);
                  var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                  var cameraController = match[3][0];
                  var state$1 = ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTarget(cameraController, target, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerTheta(cameraController, theta, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerPhi(cameraController, phi, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController, distance, ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDirectionArray(cameraController, directionArray, match[0])))));
                  return /* tuple */[
                          state$1,
                          match[2]
                        ];
                };
                Wonder_jest.describe("update one arcballCameraController", (function (param) {
                        return Wonder_jest.describe("update transform", (function (param) {
                                      Wonder_jest.describe("update localPosition", (function (param) {
                                              Wonder_jest.test("trigger point scale event", (function (param) {
                                                      var match = _prepare(2.3, undefined, undefined, /* tuple */[
                                                            1,
                                                            2,
                                                            3
                                                          ], undefined, /* () */0);
                                                      var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(2, TransformAPI$Wonderjs.getTransformLocalPosition(match[1], state))), /* tuple */[
                                                                  1,
                                                                  2,
                                                                  5.3
                                                                ]);
                                                    }));
                                              Wonder_jest.test("trigger keydown event", (function (param) {
                                                      var match = _prepare(undefined, undefined, undefined, /* tuple */[
                                                            1,
                                                            2,
                                                            3
                                                          ], /* array */[
                                                            /* Right */1,
                                                            /* Up */2
                                                          ], /* () */0);
                                                      var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(2, TransformAPI$Wonderjs.getTransformLocalPosition(match[1], state))), /* tuple */[
                                                                  2,
                                                                  3,
                                                                  3.05
                                                                ]);
                                                    }));
                                              Wonder_jest.test("trigger point scale and keydown event", (function (param) {
                                                      var match = _prepare(2.3, undefined, undefined, /* tuple */[
                                                            1,
                                                            2,
                                                            3
                                                          ], /* array */[
                                                            /* Left */0,
                                                            /* Down */3
                                                          ], /* () */0);
                                                      var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(2, TransformAPI$Wonderjs.getTransformLocalPosition(match[1], state))), /* tuple */[
                                                                  0,
                                                                  1,
                                                                  5.3
                                                                ]);
                                                    }));
                                              return Wonder_jest.test("trigger point drag and keydown event", (function (param) {
                                                            var match = _prepare(undefined, 1, 0.5, /* tuple */[
                                                                  1,
                                                                  2,
                                                                  3
                                                                ], /* array */[
                                                                  /* Left */0,
                                                                  /* Up */2
                                                                ], /* () */0);
                                                            var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match[0]);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(2, TransformAPI$Wonderjs.getTransformLocalPosition(match[1], state))), /* tuple */[
                                                                        0.01,
                                                                        3.04,
                                                                        3.02
                                                                      ]);
                                                          }));
                                            }));
                                      return Wonder_jest.test("lookAt target", (function (param) {
                                                    var match = _prepare(2.5, 1, 0.5, /* tuple */[
                                                          1,
                                                          2,
                                                          3
                                                        ], undefined, /* () */0);
                                                    var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformRotation(match[1], state)), /* tuple */[
                                                                -0.4895463742519966,
                                                                0.24214243964541454,
                                                                0.14363681885111765,
                                                                0.8252756113563703
                                                              ]);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("update two arcballCameraController", (function (param) {
                              return Wonder_jest.test("set localPosition", (function (param) {
                                            var match = _prepare(2.5, 1, 0.5, /* tuple */[
                                                  1,
                                                  2,
                                                  3
                                                ], undefined, /* () */0);
                                            var match$1 = ArcballCameraControllerTool$Wonderjs.createGameObject(match[0]);
                                            var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match$1[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            Vector3Tool$Wonderjs.truncate(3, TransformAPI$Wonderjs.getTransformLocalPosition(match[1], state)),
                                                            Vector3Tool$Wonderjs.truncate(3, TransformAPI$Wonderjs.getTransformLocalPosition(match$1[2], state))
                                                          ]), /* tuple */[
                                                        /* tuple */[
                                                          1.648,
                                                          4.194,
                                                          4.009
                                                        ],
                                                        /* tuple */[
                                                          0,
                                                          0,
                                                          10
                                                        ]
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("update flyCameraController", (function (param) {
                      var _prepare = function ($staropt$star, $staropt$star$1, $staropt$star$2, param) {
                        var eulerAngleDiff = $staropt$star !== undefined ? $staropt$star : /* record */[
                            /* diffX */0,
                            /* diffY */0
                          ];
                        var translationDiff = $staropt$star$1 !== undefined ? $staropt$star$1 : /* tuple */[
                            0,
                            0,
                            0
                          ];
                        var directionArray = $staropt$star$2 !== undefined ? $staropt$star$2 : /* array */[];
                        var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                  {\n                    \"name\": \"default\",\n                    \"jobs\": [\n                      {\n                        \"name\": \"update_camera\"\n                      }\n                    ]\n                  }\n                ]\n              ", undefined, "\n                [\n                  {\n                    \"name\": \"update_camera\"\n                  }\n                ]\n              ", /* () */0), undefined, /* () */0);
                        var match = FlyCameraControllerTool$Wonderjs.createGameObject(state);
                        var cameraController = match[3][0];
                        var state$1 = FlyCameraControllerTool$Wonderjs.setTranslationDiff(cameraController, translationDiff, FlyCameraControllerTool$Wonderjs.setEulerAngleDiff(cameraController, eulerAngleDiff, FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerDirectionArray(cameraController, directionArray, FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerWheelSpeed(cameraController, 2.5, FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerMoveSpeed(cameraController, 1.2, match[0])))));
                        return /* tuple */[
                                state$1,
                                match[2],
                                cameraController
                              ];
                      };
                      Wonder_jest.describe("update one flyCameraController", (function (param) {
                              Wonder_jest.describe("update transform localEulerAngle", (function (param) {
                                      return Wonder_jest.describe("trigger point drag event", (function (param) {
                                                    Wonder_jest.describe("get localEulerAngle from map", (function (param) {
                                                            Wonder_jest.test("if has localEulerAngle in map, get it", (function (param) {
                                                                    var match = _prepare(/* record */[
                                                                          /* diffX */5.2,
                                                                          /* diffY */6.2
                                                                        ], undefined, undefined, /* () */0);
                                                                    var transform = match[1];
                                                                    var localEulerAngles = /* tuple */[
                                                                      1,
                                                                      2,
                                                                      3
                                                                    ];
                                                                    var match$1 = RotateFlyCameraControllerMainService$Wonderjs.getLocalEulerAngleOrInit(transform, FlyCameraControllerTool$Wonderjs.setLocalEulerAngle(transform, localEulerAngles, match[0]));
                                                                    var match$2 = match$1[0];
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(3, /* tuple */[
                                                                                        match$2[0],
                                                                                        match$2[1],
                                                                                        match$2[2]
                                                                                      ])), localEulerAngles);
                                                                  }));
                                                            return Wonder_jest.test("else, get localEulerAngle from engine and store in map", (function (param) {
                                                                          var match = _prepare(undefined, undefined, undefined, /* () */0);
                                                                          var transform = match[1];
                                                                          var localEulerAngles = /* tuple */[
                                                                            1,
                                                                            2,
                                                                            3
                                                                          ];
                                                                          var match$1 = RotateFlyCameraControllerMainService$Wonderjs.getLocalEulerAngleOrInit(transform, TransformAPI$Wonderjs.setTransformLocalEulerAngles(transform, localEulerAngles, match[0]));
                                                                          var match$2 = match$1[0];
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                          Vector3Tool$Wonderjs.truncate(3, /* tuple */[
                                                                                                match$2[0],
                                                                                                match$2[1],
                                                                                                match$2[2]
                                                                                              ]),
                                                                                          Vector3Tool$Wonderjs.truncate(3, OptionService$Wonderjs.unsafeGet(FlyCameraControllerTool$Wonderjs.getLocalEulerAngle(transform, match$1[1])))
                                                                                        ]), /* tuple */[
                                                                                      localEulerAngles,
                                                                                      localEulerAngles
                                                                                    ]);
                                                                        }));
                                                          }));
                                                    return Wonder_jest.describe("calc the new localEulerAngle with diffValue and localEulerAngle in map and set to map and engine", (function (param) {
                                                                  var _judgeLocalEulerAngle = function (param, param$1, getNewEulerAngleFunc) {
                                                                    var z = param$1[2];
                                                                    var y = param$1[1];
                                                                    var x = param$1[0];
                                                                    var diffY = param[1];
                                                                    var diffX = param[0];
                                                                    var match = _prepare(/* record */[
                                                                          /* diffX */diffX,
                                                                          /* diffY */diffY
                                                                        ], undefined, undefined, /* () */0);
                                                                    var transform = match[1];
                                                                    var state = FlyCameraControllerTool$Wonderjs.setLocalEulerAngle(transform, /* tuple */[
                                                                          x,
                                                                          y,
                                                                          z
                                                                        ], match[0]);
                                                                    var state$1 = NoWorkerJobTool$Wonderjs.execLoopJobs(state);
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(3, Curry._2(getNewEulerAngleFunc, transform, state$1))), Vector3Tool$Wonderjs.truncate(3, /* tuple */[
                                                                                    x - diffX,
                                                                                    y - diffY,
                                                                                    z
                                                                                  ]));
                                                                  };
                                                                  Wonder_jest.test("set the new localEulerAngle in localEulerAngleMap", (function (param) {
                                                                          return _judgeLocalEulerAngle(/* tuple */[
                                                                                      1.2,
                                                                                      3.4
                                                                                    ], /* tuple */[
                                                                                      1,
                                                                                      2,
                                                                                      3
                                                                                    ], (function (transform, state) {
                                                                                        return OptionService$Wonderjs.unsafeGet(FlyCameraControllerTool$Wonderjs.getLocalEulerAngle(transform, state));
                                                                                      }));
                                                                        }));
                                                                  return Wonder_jest.test("set the new localEulerAngle in engine", (function (param) {
                                                                                return _judgeLocalEulerAngle(/* tuple */[
                                                                                            1.2,
                                                                                            3.4
                                                                                          ], /* tuple */[
                                                                                            1,
                                                                                            2,
                                                                                            3
                                                                                          ], TransformAPI$Wonderjs.getTransformLocalEulerAngles);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("update transform localPosition", (function (param) {
                                      Wonder_jest.test("trigger point scale event", (function (param) {
                                              var match = _prepare(undefined, /* tuple */[
                                                    0,
                                                    0,
                                                    12
                                                  ], undefined, /* () */0);
                                              var transform = match[1];
                                              var state = NoWorkerJobTool$Wonderjs.execLoopJobs(TransformAPI$Wonderjs.setTransformLocalEulerAngles(transform, /* tuple */[
                                                        45,
                                                        20,
                                                        34
                                                      ], match[0]));
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(3, TransformAPI$Wonderjs.getTransformLocalPosition(transform, state))), /* tuple */[
                                                          7.151,
                                                          -5.412,
                                                          7.974
                                                        ]);
                                            }));
                                      Wonder_jest.test("trigger keydown event", (function (param) {
                                              var match = _prepare(undefined, undefined, /* array */[
                                                    /* Left */0,
                                                    /* Up */2
                                                  ], /* () */0);
                                              var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(3, TransformAPI$Wonderjs.getTransformLocalPosition(match[1], state))), /* tuple */[
                                                          -1.2,
                                                          1.2,
                                                          0
                                                        ]);
                                            }));
                                      return Wonder_jest.test("tigger point scale and keydown event", (function (param) {
                                                    var match = _prepare(undefined, /* tuple */[
                                                          0,
                                                          0,
                                                          -2.5
                                                        ], /* array */[
                                                          /* Left */0,
                                                          /* Front */4
                                                        ], /* () */0);
                                                    var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(3, TransformAPI$Wonderjs.getTransformLocalPosition(match[1], state))), /* tuple */[
                                                                -1.2,
                                                                0,
                                                                -3.7
                                                              ]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("update transform localPosition and localEulerAngle", (function (param) {
                                            return Wonder_jest.test("trigger keydown and point drag event", (function (param) {
                                                          var match = _prepare(/* record */[
                                                                /* diffX */0,
                                                                /* diffY */0
                                                              ], /* tuple */[
                                                                1.5,
                                                                0,
                                                                0
                                                              ], undefined, /* () */0);
                                                          var transform = match[1];
                                                          var state = NoWorkerJobTool$Wonderjs.execLoopJobs(TransformAPI$Wonderjs.setTransformLocalEulerAngles(transform, /* tuple */[
                                                                    45,
                                                                    20,
                                                                    34
                                                                  ], match[0]));
                                                          var localPos1 = Vector3Tool$Wonderjs.truncate(3, TransformAPI$Wonderjs.getTransformLocalPosition(transform, state));
                                                          var match$1 = _prepare(/* record */[
                                                                /* diffX */10,
                                                                /* diffY */15
                                                              ], /* tuple */[
                                                                1.5,
                                                                0,
                                                                0
                                                              ], undefined, /* () */0);
                                                          var transform$1 = match$1[1];
                                                          var state$1 = NoWorkerJobTool$Wonderjs.execLoopJobs(TransformAPI$Wonderjs.setTransformLocalEulerAngles(transform$1, /* tuple */[
                                                                    45,
                                                                    20,
                                                                    34
                                                                  ], match$1[0]));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* != */7], Wonder_jest.Expect[/* expect */0](Vector3Tool$Wonderjs.truncate(3, TransformAPI$Wonderjs.getTransformLocalPosition(transform$1, state$1))), localPos1);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test reset data", (function (param) {
                                    return Wonder_jest.test("reset flyCamera diff value after update camera", (function (param) {
                                                  var match = _prepare(undefined, /* tuple */[
                                                        1.5,
                                                        0,
                                                        0
                                                      ], undefined, /* () */0);
                                                  var cameraController = match[2];
                                                  var state = NoWorkerJobTool$Wonderjs.execLoopJobs(match[0]);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  FlyCameraControllerTool$Wonderjs.unsafeGetTranslationDiff(cameraController, state),
                                                                  FlyCameraControllerTool$Wonderjs.unsafeGetEulerAngleDiff(cameraController, state)
                                                                ]), /* tuple */[
                                                              /* tuple */[
                                                                0,
                                                                0,
                                                                0
                                                              ],
                                                              /* record */[
                                                                /* diffX */0,
                                                                /* diffY */0
                                                              ]
                                                            ]);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
