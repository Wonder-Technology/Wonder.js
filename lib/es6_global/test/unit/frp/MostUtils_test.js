

import * as Most from "most";
import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as MostUtils$Wonderjs from "../../../src/asset/utils/MostUtils.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("MostUtils", (function (param) {
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
        return Wonder_jest.describe("concatStreamFuncArray", (function (param) {
                      return Wonder_jest.describe("contract check", (function (param) {
                                    Wonder_jest.test("check stream count should >=2", (function (param) {
                                            var fakeDom = {
                                              addEventListener: (function (param) {
                                                  return Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                }),
                                              removeEventListener: (function (param) {
                                                  return Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                })
                                            };
                                            return Wonder_jest.Expect[/* toThrowMessage */21]("expect stream count >= 2", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                              return MostUtils$Wonderjs.concatStreamFuncArray(1, /* array */[Most.fromEvent("click", fakeDom, true)]);
                                                            })));
                                          }));
                                    Wonder_jest.test("check the first stream should be fromEvent stream", (function (param) {
                                            return Wonder_jest.Expect[/* toThrowMessage */21]("the first stream should be fromEvent stream", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                              return MostUtils$Wonderjs.concatStreamFuncArray(1, /* array */[
                                                                          Most.just(1),
                                                                          Most.just(2)
                                                                        ]);
                                                            })));
                                          }));
                                    return Wonder_jest.test("check only the first stream should be fromEvent stream", (function (param) {
                                                  var fakeDom = {
                                                    addEventListener: (function (param) {
                                                        return Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      }),
                                                    removeEventListener: (function (param) {
                                                        return Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      })
                                                  };
                                                  return Wonder_jest.Expect[/* toThrowMessage */21]("only the first stream should be fromEvent stream", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                    return MostUtils$Wonderjs.concatStreamFuncArray(1, /* array */[
                                                                                Most.fromEvent("click", fakeDom, true),
                                                                                Most.fromEvent("click", fakeDom, true)
                                                                              ]);
                                                                  })));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
