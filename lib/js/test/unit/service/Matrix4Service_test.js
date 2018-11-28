'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var GlobalTempTool$Wonderjs = require("../../tool/service/globalTemp/GlobalTempTool.js");
var Matrix4Service$Wonderjs = require("../../../src/service/atom/Matrix4Service.js");
var CreateStateMainService$Wonderjs = require("../../../src/service/state/main/state/CreateStateMainService.js");

describe("Matrix4Service", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("fix bug", (function () {
                return Wonder_jest.test("fix getRotation bug", (function () {
                              var matrix = new Float32Array(/* array */[
                                    1.0,
                                    0.0,
                                    0.0,
                                    0.0,
                                    0.0,
                                    0.0,
                                    -1.0,
                                    0.0,
                                    0.0,
                                    1.0,
                                    0.0,
                                    0.0,
                                    0.0,
                                    0.0,
                                    0.0,
                                    1.0
                                  ]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Matrix4Service$Wonderjs.fromTranslationRotationScale(Matrix4Service$Wonderjs.getTranslationTuple(matrix), Matrix4Service$Wonderjs.getRotationTuple(matrix), Matrix4Service$Wonderjs.getScaleTuple(matrix), GlobalTempTool$Wonderjs.getFloat32Array1(state[0]))), new Float32Array(/* array */[
                                              1,
                                              0,
                                              -0,
                                              0,
                                              -0,
                                              2.220446049250313e-16,
                                              -1,
                                              0,
                                              0,
                                              1,
                                              2.220446049250313e-16,
                                              0,
                                              0,
                                              0,
                                              0,
                                              1
                                            ]));
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
