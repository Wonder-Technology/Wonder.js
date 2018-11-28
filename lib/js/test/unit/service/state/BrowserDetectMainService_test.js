'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RootTool$Wonderjs = require("../../../integration/tool/RootTool.js");
var TestTool$Wonderjs = require("../../../tool/TestTool.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../integration/worker/tool/FakeGlWorkerTool.js");
var BrowserDetectTool$Wonderjs = require("../../../tool/service/browserDetect/BrowserDetectTool.js");
var BrowserDetectMainService$Wonderjs = require("../../../../src/service/state/main/browserDetect/BrowserDetectMainService.js");

describe("BrowserDetectMainService", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("if use worker", (function () {
                describe("if is mobile, error", (function () {
                        var _test = function (setBrowserFunc) {
                          RootTool$Wonderjs.setRoot(undefined, undefined, /* () */0);
                          var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                          MainStateTool$Wonderjs.setState(state$1);
                          Curry._1(setBrowserFunc, /* () */0);
                          var state$2 = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                          return Wonder_jest.Expect[/* toThrowMessage */20]("mobile not support worker", Wonder_jest.Expect[/* expect */0]((function () {
                                            return BrowserDetectMainService$Wonderjs.detectMobileNotSupportWorker(state$2);
                                          })));
                        };
                        Wonder_jest.test("if is android, error", (function () {
                                return _test(BrowserDetectTool$Wonderjs.setAndroid);
                              }));
                        return Wonder_jest.test("if is ios, error", (function () {
                                      return _test(BrowserDetectTool$Wonderjs.setIOS);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
