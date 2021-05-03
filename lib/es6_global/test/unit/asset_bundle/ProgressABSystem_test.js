

import * as Curry from "./../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as ProgressABSystem$Wonderjs from "../../../src/asset_bundle/import/ProgressABSystem.js";
import * as GenerateAllABTool$Wonderjs from "../../integration/no_worker/asset_bundle/tool/GenerateAllABTool.js";
import * as CreateStateMainService$Wonderjs from "../../../src/service/state/main/state/CreateStateMainService.js";
import * as OperateRABAssetBundleMainService$Wonderjs from "../../../src/service/state/main/assetBundle/OperateRABAssetBundleMainService.js";
import * as OperateSABAssetBundleMainService$Wonderjs from "../../../src/service/state/main/assetBundle/OperateSABAssetBundleMainService.js";
import * as OperateWABAssetBundleMainService$Wonderjs from "../../../src/service/state/main/assetBundle/OperateWABAssetBundleMainService.js";

Wonder_jest.describe("ProgressABSystem test", (function (param) {
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
        return Wonder_jest.describe("module RAB", (function (param) {
                      var _prepare = function (state, $staropt$star, param) {
                        var abRelativePath = $staropt$star !== undefined ? $staropt$star : "a.sab";
                        var rab1RelativePath = "rab1.rab";
                        var rab2RelativePath = "rab2.rab";
                        var rab3RelativePath = "rab3.rab";
                        var wholeDependencyRelationMap = GenerateAllABTool$Wonderjs.buildDependencyRelation(/* array */[
                              /* array */[
                                abRelativePath,
                                rab2RelativePath
                              ],
                              /* array */[
                                rab2RelativePath,
                                rab1RelativePath,
                                rab3RelativePath
                              ],
                              /* array */[
                                rab1RelativePath,
                                rab3RelativePath
                              ]
                            ]);
                        var wabRelativePath = "w1.wab";
                        var state$1 = OperateWABAssetBundleMainService$Wonderjs.setWholeDependencyRelationMap(wabRelativePath, wholeDependencyRelationMap, state[0]);
                        return /* tuple */[
                                state$1,
                                wabRelativePath,
                                abRelativePath,
                                /* tuple */[
                                  rab1RelativePath,
                                  rab2RelativePath,
                                  rab3RelativePath
                                ]
                              ];
                      };
                      Wonder_jest.describe("getAllNeededABCount", (function (param) {
                              return Wonder_jest.test("get all dependency rabs' count + 1", (function (param) {
                                            var match = _prepare(state, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ProgressABSystem$Wonderjs.RAB[/* getAllNeededABCount */0](match[2], match[1], match[0])), 4);
                                          }));
                            }));
                      return Wonder_jest.describe("getLoadedNeededABCount", (function (param) {
                                    return Wonder_jest.describe("get loaded dependency rabs' count + is self loaded", (function (param) {
                                                  Wonder_jest.describe("test self is sab", (function (param) {
                                                          Wonder_jest.test("test self is not loaded", (function (param) {
                                                                  var match = _prepare(state, "a.sab", /* () */0);
                                                                  var match$1 = match[3];
                                                                  var abRelativePath = match[2];
                                                                  var state$1 = OperateRABAssetBundleMainService$Wonderjs.markLoaded(match$1[2], OperateRABAssetBundleMainService$Wonderjs.markNotLoaded(match$1[1], OperateSABAssetBundleMainService$Wonderjs.markNotLoaded(abRelativePath, match[0])));
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ProgressABSystem$Wonderjs.RAB[/* getLoadedNeededABCount */3](abRelativePath, match[1], state$1)), 1);
                                                                }));
                                                          return Wonder_jest.test("test self is loaded", (function (param) {
                                                                        var match = _prepare(state, "a.sab", /* () */0);
                                                                        var match$1 = match[3];
                                                                        var abRelativePath = match[2];
                                                                        var state$1 = OperateRABAssetBundleMainService$Wonderjs.markLoaded(match$1[2], OperateRABAssetBundleMainService$Wonderjs.markNotLoaded(match$1[1], OperateSABAssetBundleMainService$Wonderjs.markLoaded(abRelativePath, match[0])));
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ProgressABSystem$Wonderjs.RAB[/* getLoadedNeededABCount */3](abRelativePath, match[1], state$1)), 2);
                                                                      }));
                                                        }));
                                                  Wonder_jest.describe("test self is rab", (function (param) {
                                                          return Wonder_jest.test("test self is loaded", (function (param) {
                                                                        var match = _prepare(state, "a.rab", /* () */0);
                                                                        var match$1 = match[3];
                                                                        var abRelativePath = match[2];
                                                                        var state$1 = OperateRABAssetBundleMainService$Wonderjs.markLoaded(match$1[2], OperateRABAssetBundleMainService$Wonderjs.markNotLoaded(match$1[1], OperateRABAssetBundleMainService$Wonderjs.markLoaded(abRelativePath, match[0])));
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ProgressABSystem$Wonderjs.RAB[/* getLoadedNeededABCount */3](abRelativePath, match[1], state$1)), 2);
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("test self is wab", (function (param) {
                                                                return Wonder_jest.test("fatal", (function (param) {
                                                                              var match = _prepare(state, "a.wab", /* () */0);
                                                                              var abRelativePath = match[2];
                                                                              var wabRelativePath = match[1];
                                                                              var state$1 = match[0];
                                                                              return Wonder_jest.Expect[/* toThrowMessage */21]("unknown abRelativePath", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                                                                return ProgressABSystem$Wonderjs.RAB[/* getLoadedNeededABCount */3](abRelativePath, wabRelativePath, state$1);
                                                                                              })));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
