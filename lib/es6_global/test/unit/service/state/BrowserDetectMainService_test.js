

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as RootTool$Wonderjs from "../../../integration/tool/RootTool.js";
import * as TestTool$Wonderjs from "../../../tool/TestTool.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../../integration/worker/tool/FakeGlWorkerTool.js";
import * as BrowserDetectTool$Wonderjs from "../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as BrowserDetectMainService$Wonderjs from "../../../../src/service/state/main/browserDetect/BrowserDetectMainService.js";

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

export {
  
}
/*  Not a pure module */
