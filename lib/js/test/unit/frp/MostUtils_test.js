'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var MostUtils$Wonderjs = require("../../../src/asset/utils/MostUtils.js");
var CreateStateMainService$Wonderjs = require("../../../src/service/state/main/state/CreateStateMainService.js");

describe("MostUtils", (function () {
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
        describe("concatStreamFuncArray", (function () {
                describe("contract check", (function () {
                        Wonder_jest.test("check stream count should >=2", (function () {
                                var fakeDom = {
                                  addEventListener: (function () {
                                      return Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                    }),
                                  removeEventListener: (function () {
                                      return Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                    })
                                };
                                return Wonder_jest.Expect[/* toThrowMessage */20]("expect stream count >= 2", Wonder_jest.Expect[/* expect */0]((function () {
                                                  return MostUtils$Wonderjs.concatStreamFuncArray(1, /* array */[Most.fromEvent("click", fakeDom, true)]);
                                                })));
                              }));
                        Wonder_jest.test("check the first stream should be fromEvent stream", (function () {
                                return Wonder_jest.Expect[/* toThrowMessage */20]("the first stream should be fromEvent stream", Wonder_jest.Expect[/* expect */0]((function () {
                                                  return MostUtils$Wonderjs.concatStreamFuncArray(1, /* array */[
                                                              Most.just(1),
                                                              Most.just(2)
                                                            ]);
                                                })));
                              }));
                        return Wonder_jest.test("check only the first stream should be fromEvent stream", (function () {
                                      var fakeDom = {
                                        addEventListener: (function () {
                                            return Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          }),
                                        removeEventListener: (function () {
                                            return Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                          })
                                      };
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("only the first stream should be fromEvent stream", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return MostUtils$Wonderjs.concatStreamFuncArray(1, /* array */[
                                                                    Most.fromEvent("click", fakeDom, true),
                                                                    Most.fromEvent("click", fakeDom, true)
                                                                  ]);
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
