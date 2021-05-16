

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as LoadABSystem$Wonderjs from "../../../src/asset_bundle/import/LoadABSystem.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("LoadABSystem", (function (param) {
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
        Wonder_jest.describe("isAssetBundleArrayBufferCached", (function (param) {
                return Wonder_jest.testPromise("return false", undefined, (function (param) {
                              return LoadABSystem$Wonderjs.isAssetBundleArrayBufferCached("", "").then((function (result) {
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](result), false));
                                          }));
                            }));
              }));
        Wonder_jest.describe("getAssetBundleArrayBufferCache", (function (param) {
                return Wonder_jest.test("fatal", (function (param) {
                              return Wonder_jest.Expect[/* toThrow */18](Wonder_jest.Expect[/* expect */0]((function (param) {
                                                return LoadABSystem$Wonderjs.getAssetBundleArrayBufferCache("");
                                              })));
                            }));
              }));
        return Wonder_jest.describe("cacheAssetBundleArrayBuffer", (function (param) {
                      return Wonder_jest.testPromise("do nothing", undefined, (function (param) {
                                    return LoadABSystem$Wonderjs.cacheAssetBundleArrayBuffer("", -1, "").then((function (param) {
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](1), 1));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
