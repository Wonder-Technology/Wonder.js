

import * as Curry from "./../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../tool/TestTool.js";
import * as ArrayService$Wonderjs from "../../../../src/service/atom/ArrayService.js";
import * as CreateStateMainService$Wonderjs from "../../../../src/service/state/main/state/CreateStateMainService.js";

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

export {
  
}
/*  Not a pure module */
