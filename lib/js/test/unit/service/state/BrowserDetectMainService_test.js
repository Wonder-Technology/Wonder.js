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

Wonder_jest.describe("BrowserDetectMainService", (function (param) {
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
        return Wonder_jest.describe("if use worker", (function (param) {
                      return Wonder_jest.describe("if is mobile, error", (function (param) {
                                    var _test = function (setBrowserFunc) {
                                      RootTool$Wonderjs.setRoot(undefined, undefined, /* () */0);
                                      var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                      var state$2 = Curry._1(setBrowserFunc, state$1);
                                      MainStateTool$Wonderjs.setState(state$2);
                                      return Wonder_jest.Expect[/* toThrowMessage */21]("mobile not support worker", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                        return BrowserDetectMainService$Wonderjs.detectMobileNotSupportWorker(state$2);
                                                      })));
                                    };
                                    Wonder_jest.test("if is android, error", (function (param) {
                                            return _test(BrowserDetectTool$Wonderjs.setAndroid);
                                          }));
                                    return Wonder_jest.test("if is ios, error", (function (param) {
                                                  return _test(BrowserDetectTool$Wonderjs.setIOS);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
