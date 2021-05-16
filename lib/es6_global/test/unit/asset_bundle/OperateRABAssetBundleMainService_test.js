

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as OperateRABAssetBundleMainService$Wonderjs from "../../../src/service/state/main/assetBundle/OperateRABAssetBundleMainService.js";

Wonder_jest.describe("OperateRABAssetBundleMainService", (function (param) {
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
        Wonder_jest.describe("releaseLoadedRAB", (function (param) {
                var _prepare = function (state) {
                  var rabRelativePath = "rab1.rab";
                  var state$1 = OperateRABAssetBundleMainService$Wonderjs.markLoaded(rabRelativePath, OperateRABAssetBundleMainService$Wonderjs.setLoadedRAB(rabRelativePath, 100, state));
                  return /* tuple */[
                          state$1,
                          rabRelativePath,
                          100
                        ];
                };
                Wonder_jest.test("delete loaded rab", (function (param) {
                        var match = _prepare(state[0]);
                        var rabRelativePath = match[1];
                        var state$1 = OperateRABAssetBundleMainService$Wonderjs.releaseLoadedRAB(rabRelativePath, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateRABAssetBundleMainService$Wonderjs.getLoadedRAB(rabRelativePath, state$1)), undefined);
                      }));
                return Wonder_jest.test("mark not loaded", (function (param) {
                              var match = _prepare(state[0]);
                              var rabRelativePath = match[1];
                              var state$1 = OperateRABAssetBundleMainService$Wonderjs.releaseLoadedRAB(rabRelativePath, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateRABAssetBundleMainService$Wonderjs.isLoaded(rabRelativePath, state$1)), false);
                            }));
              }));
        return Wonder_jest.describe("releaseAssembleRABData", (function (param) {
                      var _prepare = function (state, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, param) {
                        var rabRelativePath = $staropt$star !== undefined ? $staropt$star : "rab1.rab";
                        var imageMapByName = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
                        var basicSourceTextureMapByName = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
                        var cubemapTextureMapByName = $staropt$star$3 !== undefined ? Caml_option.valFromOption($staropt$star$3) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
                        var basicMaterialMap = $staropt$star$4 !== undefined ? Caml_option.valFromOption($staropt$star$4) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
                        var lightMaterialMap = $staropt$star$5 !== undefined ? Caml_option.valFromOption($staropt$star$5) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
                        var geometryMap = $staropt$star$6 !== undefined ? Caml_option.valFromOption($staropt$star$6) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
                        var scriptEventFunctionDataMap = $staropt$star$7 !== undefined ? Caml_option.valFromOption($staropt$star$7) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
                        var scriptAttributeMap = $staropt$star$8 !== undefined ? Caml_option.valFromOption($staropt$star$8) : ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
                        var state$1 = OperateRABAssetBundleMainService$Wonderjs.setAssembleRABData(rabRelativePath, /* tuple */[
                              imageMapByName,
                              basicSourceTextureMapByName,
                              cubemapTextureMapByName,
                              basicMaterialMap,
                              lightMaterialMap,
                              geometryMap,
                              scriptEventFunctionDataMap,
                              scriptAttributeMap
                            ], OperateRABAssetBundleMainService$Wonderjs.markAssembled(rabRelativePath, state));
                        return /* tuple */[
                                state$1,
                                rabRelativePath
                              ];
                      };
                      Wonder_jest.test("delete assembled image", (function (param) {
                              var imageName = "a";
                              var match = _prepare(state[0], "rab1.rab", Caml_option.some(ImmutableHashMapService$WonderCommonlib.set(imageName, 10, ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0))), undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              var rabRelativePath = match[1];
                              var state$1 = OperateRABAssetBundleMainService$Wonderjs.releaseAssembleRABData(rabRelativePath, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateRABAssetBundleMainService$Wonderjs.findImageByName(rabRelativePath, imageName, state$1)), undefined);
                            }));
                      return Wonder_jest.test("mark not assembled", (function (param) {
                                    var match = _prepare(state[0], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    var rabRelativePath = match[1];
                                    var state$1 = OperateRABAssetBundleMainService$Wonderjs.releaseAssembleRABData(rabRelativePath, match[0]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateRABAssetBundleMainService$Wonderjs.isAssembled(rabRelativePath, state$1)), false);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
