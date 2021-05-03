

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MostTool$Wonderjs from "../tool/MostTool.js";
import * as StateAPI$Wonderjs from "../../../../../src/api/StateAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ImportABTool$Wonderjs from "../tool/ImportABTool.js";
import * as PrepareABTool$Wonderjs from "../tool/PrepareABTool.js";
import * as GenerateAllABTool$Wonderjs from "../tool/GenerateAllABTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as OperateWABAssetBundleMainService$Wonderjs from "../../../../../src/service/state/main/assetBundle/OperateWABAssetBundleMainService.js";

Wonder_jest.describe("load wab", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                PrepareABTool$Wonderjs.prepare(sandbox[0]);
                return GenerateAllABTool$Wonderjs.Manifest[/* prepareDigest */4](sandbox[0]);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("loadWABAndSetToState", (function (param) {
                      var _buildFakeFetchArrayBufferResponse = function (arrayBuffer) {
                        return Promise.resolve({
                                    ok: true,
                                    arrayBuffer: (function (param) {
                                        return Promise.resolve(arrayBuffer);
                                      })
                                  });
                      };
                      var _buildFakeFetch = function (sandbox, arrayBuffer1) {
                        var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        Sinon.returns(_buildFakeFetchArrayBufferResponse(arrayBuffer1), Sinon.onCall(0, fetch));
                        return fetch;
                      };
                      Wonder_jest.testPromise("if wab is loaded, not load", undefined, (function (param) {
                              var wab1RelativePath = ImportABTool$Wonderjs.WAB[/* getWABRelativePath */0](/* () */0);
                              var wab = ImportABTool$Wonderjs.WAB[/* buildWAB */1](/* () */0);
                              var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                              var state$1 = OperateWABAssetBundleMainService$Wonderjs.markLoaded(wab1RelativePath, OperateWABAssetBundleMainService$Wonderjs.setLoadedWAB(wab1RelativePath, wab, state));
                              StateAPI$Wonderjs.setState(state$1);
                              var fetch = _buildFakeFetch(sandbox, wab);
                              return MostTool$Wonderjs.testStream((function (param) {
                                            return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](fetch))));
                                          }), ImportABTool$Wonderjs.WAB[/* loadWABAndSetToState */2](wab1RelativePath, undefined, Caml_option.some(fetch), /* () */0));
                            }));
                      return Wonder_jest.describe("else", (function (param) {
                                    Wonder_jest.testPromise("mark wab loaded", undefined, (function (param) {
                                            var wab1RelativePath = ImportABTool$Wonderjs.WAB[/* getWABRelativePath */0](/* () */0);
                                            var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                            var state$1 = OperateWABAssetBundleMainService$Wonderjs.markNotLoaded(wab1RelativePath, state);
                                            StateAPI$Wonderjs.setState(state$1);
                                            var fetch = _buildFakeFetch(sandbox, ImportABTool$Wonderjs.WAB[/* buildWAB */1](/* () */0));
                                            return MostTool$Wonderjs.testStream((function (param) {
                                                          var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateWABAssetBundleMainService$Wonderjs.isLoaded(wab1RelativePath, state)), true));
                                                        }), ImportABTool$Wonderjs.WAB[/* loadWABAndSetToState */2](wab1RelativePath, undefined, Caml_option.some(fetch), /* () */0));
                                          }));
                                    return Wonder_jest.testPromise("set loaded sab to state", undefined, (function (param) {
                                                  var wab1RelativePath = ImportABTool$Wonderjs.WAB[/* getWABRelativePath */0](/* () */0);
                                                  var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                  var state$1 = OperateWABAssetBundleMainService$Wonderjs.markNotLoaded(wab1RelativePath, state);
                                                  StateAPI$Wonderjs.setState(state$1);
                                                  var wab = ImportABTool$Wonderjs.WAB[/* buildWAB */1](/* () */0);
                                                  var fetch = _buildFakeFetch(sandbox, wab);
                                                  return MostTool$Wonderjs.testStream((function (param) {
                                                                var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateWABAssetBundleMainService$Wonderjs.unsafeGetLoadedWAB(wab1RelativePath, state)), wab));
                                                              }), ImportABTool$Wonderjs.WAB[/* loadWABAndSetToState */2](wab1RelativePath, undefined, Caml_option.some(fetch), /* () */0));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
