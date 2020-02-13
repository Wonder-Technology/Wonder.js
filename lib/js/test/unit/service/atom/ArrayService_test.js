'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../tool/TestTool.js");
var ArrayService$Wonderjs = require("../../../../src/service/atom/ArrayService.js");
var CreateStateMainService$Wonderjs = require("../../../../src/service/state/main/state/CreateStateMainService.js");

Wonder_jest.describe("ArrayService", (function (param) {
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
        return Wonder_jest.describe("fastIntersect", (function (param) {
                      return Wonder_jest.describe("get targetArr and sourceArr intersect", (function (param) {
                                    Wonder_jest.test("test1", (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.fastIntersect(/* array */[
                                                                2,
                                                                4
                                                              ], /* array */[
                                                                5,
                                                                1,
                                                                2,
                                                                4,
                                                                3
                                                              ])), /* array */[
                                                        2,
                                                        4
                                                      ]);
                                          }));
                                    Wonder_jest.test("test2", (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.fastIntersect(/* array */[
                                                                2,
                                                                4
                                                              ], /* array */[
                                                                5,
                                                                1,
                                                                4,
                                                                3
                                                              ])), /* array */[4]);
                                          }));
                                    return Wonder_jest.test("test3", (function (param) {
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.fastIntersect(/* array */[
                                                                      6,
                                                                      4
                                                                    ], /* array */[
                                                                      5,
                                                                      1,
                                                                      4,
                                                                      3
                                                                    ])), /* array */[4]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
