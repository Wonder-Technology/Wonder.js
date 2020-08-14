'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var ImportABTool$Wonderjs = require("../../integration/no_worker/asset_bundle/tool/ImportABTool.js");
var CreateStateMainService$Wonderjs = require("../../../src/service/state/main/state/CreateStateMainService.js");
var OperateRABAssetBundleMainService$Wonderjs = require("../../../src/service/state/main/assetBundle/OperateRABAssetBundleMainService.js");
var OperateSABAssetBundleMainService$Wonderjs = require("../../../src/service/state/main/assetBundle/OperateSABAssetBundleMainService.js");
var OperateWABAssetBundleMainService$Wonderjs = require("../../../src/service/state/main/assetBundle/OperateWABAssetBundleMainService.js");

Wonder_jest.describe("OperateSABAssetBundleMainService", (function (param) {
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
        Wonder_jest.describe("canAssemble", (function (param) {
                var _canAssemble = function (state, $staropt$star, $staropt$star$1, param) {
                  var wabRelativePath = $staropt$star !== undefined ? $staropt$star : "wab1.wab";
                  var sabRelativePath = $staropt$star$1 !== undefined ? $staropt$star$1 : ImportABTool$Wonderjs.SAB[/* getSABRelativePath */1](/* () */0);
                  return OperateSABAssetBundleMainService$Wonderjs.canAssemble(sabRelativePath, wabRelativePath, state);
                };
                return Wonder_jest.describe("return whether can assemble sab or not", (function (param) {
                              Wonder_jest.test("if sab isn't loaded, can't", (function (param) {
                                      var sabRelativePath = ImportABTool$Wonderjs.SAB[/* getSABRelativePath */1](/* () */0);
                                      var state$1 = OperateSABAssetBundleMainService$Wonderjs.markNotLoaded(sabRelativePath, state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_canAssemble(state$1, undefined, undefined, /* () */0)), false);
                                    }));
                              Wonder_jest.test("if wholeDependencyRelationMap isn't set to state, can't", (function (param) {
                                      var sabRelativePath = ImportABTool$Wonderjs.SAB[/* getSABRelativePath */1](/* () */0);
                                      ImportABTool$Wonderjs.SAB[/* getRABRelativePaths */2](/* () */0);
                                      var state$1 = OperateSABAssetBundleMainService$Wonderjs.markLoaded(sabRelativePath, state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_canAssemble(state$1, undefined, undefined, /* () */0)), false);
                                    }));
                              Wonder_jest.test("if any dependency rab isn't assembled, can't", (function (param) {
                                      var sabRelativePath = ImportABTool$Wonderjs.SAB[/* getSABRelativePath */1](/* () */0);
                                      var match = ImportABTool$Wonderjs.SAB[/* getRABRelativePaths */2](/* () */0);
                                      var state$1 = OperateWABAssetBundleMainService$Wonderjs.setWholeDependencyRelationMap("wab1.wab", ImportABTool$Wonderjs.RAB[/* buildWholeDependencyRelationMap */3](ImportABTool$Wonderjs.SAB[/* getABRelativePaths */0](/* () */0)), OperateRABAssetBundleMainService$Wonderjs.markAssembled(match[1], OperateRABAssetBundleMainService$Wonderjs.markNotAssembled(match[0], OperateSABAssetBundleMainService$Wonderjs.markLoaded(sabRelativePath, state[0]))));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_canAssemble(state$1, undefined, undefined, /* () */0)), false);
                                    }));
                              return Wonder_jest.test("else, can", (function (param) {
                                            var sabRelativePath = ImportABTool$Wonderjs.SAB[/* getSABRelativePath */1](/* () */0);
                                            var match = ImportABTool$Wonderjs.SAB[/* getRABRelativePaths */2](/* () */0);
                                            var state$1 = OperateWABAssetBundleMainService$Wonderjs.setWholeDependencyRelationMap("wab1.wab", ImportABTool$Wonderjs.RAB[/* buildWholeDependencyRelationMap */3](ImportABTool$Wonderjs.SAB[/* getABRelativePaths */0](/* () */0)), OperateRABAssetBundleMainService$Wonderjs.markAssembled(match[1], OperateRABAssetBundleMainService$Wonderjs.markAssembled(match[0], OperateSABAssetBundleMainService$Wonderjs.markLoaded(sabRelativePath, state[0]))));
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_canAssemble(state$1, undefined, undefined, /* () */0)), true);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("releaseLoadedSAB", (function (param) {
                      var _prepare = function (state) {
                        var sabRelativePath = "sab1.sab";
                        var state$1 = OperateSABAssetBundleMainService$Wonderjs.markLoaded(sabRelativePath, OperateSABAssetBundleMainService$Wonderjs.setLoadedSAB(sabRelativePath, 100, state));
                        return /* tuple */[
                                state$1,
                                sabRelativePath,
                                100
                              ];
                      };
                      Wonder_jest.test("delete loaded sab", (function (param) {
                              var match = _prepare(state[0]);
                              var sabRelativePath = match[1];
                              var state$1 = OperateSABAssetBundleMainService$Wonderjs.releaseLoadedSAB(sabRelativePath, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateSABAssetBundleMainService$Wonderjs.getLoadedSAB(sabRelativePath, state$1)), undefined);
                            }));
                      return Wonder_jest.test("mark not loaded", (function (param) {
                                    var match = _prepare(state[0]);
                                    var sabRelativePath = match[1];
                                    var state$1 = OperateSABAssetBundleMainService$Wonderjs.releaseLoadedSAB(sabRelativePath, match[0]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateSABAssetBundleMainService$Wonderjs.isLoaded(sabRelativePath, state$1)), false);
                                  }));
                    }));
      }));

/*  Not a pure module */
