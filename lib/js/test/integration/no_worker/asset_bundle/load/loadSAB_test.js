'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MostTool$Wonderjs = require("../tool/MostTool.js");
var StateAPI$Wonderjs = require("../../../../../src/api/StateAPI.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var JudgeTool$Wonderjs = require("../../../../tool/JudgeTool.js");
var SinonTool$Wonderjs = require("../../tool/sinon/SinonTool.js");
var ImportABTool$Wonderjs = require("../tool/ImportABTool.js");
var PrepareABTool$Wonderjs = require("../tool/PrepareABTool.js");
var GenerateAllABTool$Wonderjs = require("../tool/GenerateAllABTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");
var OperateSABAssetBundleMainService$Wonderjs = require("../../../../../src/service/state/main/assetBundle/OperateSABAssetBundleMainService.js");

Wonder_jest.describe("load sab", (function (param) {
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
        return Wonder_jest.describe("loadSABAndSetToState", (function (param) {
                      var _buildFakeFetchArrayBufferResponse = function (arrayBuffer) {
                        return Promise.resolve({
                                    ok: true,
                                    arrayBuffer: (function (param) {
                                        return Promise.resolve(arrayBuffer);
                                      })
                                  });
                      };
                      var _buildFakeFetch = function (sandbox, arrayBuffer1, arrayBuffer2) {
                        var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        Sinon.returns(_buildFakeFetchArrayBufferResponse(arrayBuffer2), Sinon.onCall(1, Sinon.returns(_buildFakeFetchArrayBufferResponse(arrayBuffer1), Sinon.onCall(0, fetch))));
                        return fetch;
                      };
                      Wonder_jest.testPromise("if sab is loaded, not load", undefined, (function (param) {
                              var match = ImportABTool$Wonderjs.SAB[/* getABRelativePaths */0](/* () */0);
                              var sab1RelativePath = match[2];
                              return GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateTwoRABs */6](state[0]).then((function (param) {
                                            var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                            var state$1 = OperateSABAssetBundleMainService$Wonderjs.markLoaded(sab1RelativePath, state);
                                            StateAPI$Wonderjs.setState(state$1);
                                            var fetch = _buildFakeFetch(sandbox, param[0], param[1]);
                                            return MostTool$Wonderjs.testStream((function (param) {
                                                          return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](fetch))));
                                                        }), ImportABTool$Wonderjs.SAB[/* loadSABAndSetToState */7](sab1RelativePath, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(fetch), /* () */0));
                                          }));
                            }));
                      return Wonder_jest.describe("else", (function (param) {
                                    Wonder_jest.testPromise("if dependency rab is cached, not load it", undefined, (function (param) {
                                            var match = ImportABTool$Wonderjs.SAB[/* getABRelativePaths */0](/* () */0);
                                            var sab1RelativePath = match[2];
                                            return GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateTwoRABs */6](state[0]).then((function (param) {
                                                          var rab1 = param[0];
                                                          var fetch = _buildFakeFetch(sandbox, rab1, param[1]);
                                                          return MostTool$Wonderjs.testStream((function (param) {
                                                                        return Promise.resolve(Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](fetch))));
                                                                      }), ImportABTool$Wonderjs.SAB[/* loadSABAndSetToState */7](sab1RelativePath, undefined, undefined, undefined, Caml_option.some((function (param, param$1) {
                                                                                return new Promise((function (resolve, reject) {
                                                                                              return resolve(true);
                                                                                            }));
                                                                              })), Caml_option.some((function (param) {
                                                                                return new Promise((function (resolve, reject) {
                                                                                              return resolve(rab1);
                                                                                            }));
                                                                              })), undefined, Caml_option.some(fetch), /* () */0));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("else", (function (param) {
                                                  Wonder_jest.testPromise("load dependency rab", undefined, (function (param) {
                                                          var match = ImportABTool$Wonderjs.SAB[/* getABRelativePaths */0](/* () */0);
                                                          var sab1RelativePath = match[2];
                                                          var rab1RelativePath = match[0];
                                                          return GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateTwoRABs */6](state[0]).then((function (param) {
                                                                        var rab1 = param[0];
                                                                        var fetch = _buildFakeFetch(sandbox, rab1, param[1]);
                                                                        return MostTool$Wonderjs.testStream((function (param) {
                                                                                      var __x = Sinon.getCall(0, fetch);
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                          Sinon.getCallCount(fetch),
                                                                                                          SinonTool$Wonderjs.calledWith(__x, sab1RelativePath)
                                                                                                        ]), /* tuple */[
                                                                                                      1,
                                                                                                      true
                                                                                                    ]));
                                                                                    }), ImportABTool$Wonderjs.SAB[/* loadSABAndSetToState */7](sab1RelativePath, undefined, undefined, undefined, Caml_option.some((function (abRelativePath, hashId) {
                                                                                              return new Promise((function (resolve, reject) {
                                                                                                            var match = JudgeTool$Wonderjs.isEqual(abRelativePath, rab1RelativePath);
                                                                                                            return resolve(match ? true : false);
                                                                                                          }));
                                                                                            })), Caml_option.some((function (param) {
                                                                                              return new Promise((function (resolve, reject) {
                                                                                                            return resolve(rab1);
                                                                                                          }));
                                                                                            })), undefined, Caml_option.some(fetch), /* () */0));
                                                                      }));
                                                        }));
                                                  Wonder_jest.testPromise("mark sab loaded", undefined, (function (param) {
                                                          var match = ImportABTool$Wonderjs.SAB[/* getABRelativePaths */0](/* () */0);
                                                          var sab1RelativePath = match[2];
                                                          return GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateTwoRABs */6](state[0]).then((function (param) {
                                                                        var fetch = _buildFakeFetch(sandbox, param[0], param[1]);
                                                                        return MostTool$Wonderjs.testStream((function (param) {
                                                                                      var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateSABAssetBundleMainService$Wonderjs.isLoaded(sab1RelativePath, state)), true));
                                                                                    }), ImportABTool$Wonderjs.SAB[/* loadSABAndSetToState */7](sab1RelativePath, undefined, undefined, undefined, Caml_option.some((function (abRelativePath, hashId) {
                                                                                              return new Promise((function (resolve, reject) {
                                                                                                            return resolve(false);
                                                                                                          }));
                                                                                            })), undefined, undefined, Caml_option.some(fetch), /* () */0));
                                                                      }));
                                                        }));
                                                  return Wonder_jest.testPromise("set loaded sab to state", undefined, (function (param) {
                                                                var match = ImportABTool$Wonderjs.SAB[/* getABRelativePaths */0](/* () */0);
                                                                var sab1RelativePath = match[2];
                                                                return GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateTwoRABs */6](state[0]).then((function (param) {
                                                                              var fetch = _buildFakeFetch(sandbox, -100, param[1]);
                                                                              return MostTool$Wonderjs.testStream((function (param) {
                                                                                            var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateSABAssetBundleMainService$Wonderjs.getLoadedSAB(sab1RelativePath, state)), -100));
                                                                                          }), ImportABTool$Wonderjs.SAB[/* loadSABAndSetToState */7](sab1RelativePath, undefined, undefined, undefined, Caml_option.some((function (abRelativePath, hashId) {
                                                                                                    return new Promise((function (resolve, reject) {
                                                                                                                  return resolve(false);
                                                                                                                }));
                                                                                                  })), undefined, undefined, Caml_option.some(fetch), /* () */0));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
