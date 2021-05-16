'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLBTool$Wonderjs = require("../tool/GLBTool.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var LoadWDBTool$Wonderjs = require("../../../tool/asset/load/LoadWDBTool.js");
var ArrayService$Wonderjs = require("../../../../../src/service/atom/ArrayService.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var ConvertGLBTool$Wonderjs = require("../tool/ConvertGLBTool.js");
var ConvertGLBSystem$Wonderjs = require("../../../../../src/asset/converter/ConvertGLBSystem.js");
var AssembleWDBSystemTool$Wonderjs = require("../tool/AssembleWDBSystemTool.js");

Wonder_jest.describe("load wdb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildFakeFetchArrayBufferResponse = function (sandbox, contentLength, arrayBuffer) {
          return Promise.resolve({
                      headers: {
                        get: Sinon.returns(contentLength, Sinon.withOneArg("content-length", Sinon.createEmptyStubWithJsObjSandbox(sandbox)))
                      },
                      arrayBuffer: (function (param) {
                          return Promise.resolve(arrayBuffer);
                        })
                    });
        };
        var _buildFakeFetch = function (sandbox, contentLength, gltfJsonStr, binBuffer) {
          var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          Sinon.returns(_buildFakeFetchArrayBufferResponse(sandbox, contentLength, ConvertGLBSystem$Wonderjs.convertGLBData(JSON.parse(gltfJsonStr), binBuffer)), Sinon.onCall(0, fetch));
          return fetch;
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                GLBTool$Wonderjs.prepare(sandbox[0]);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.testPromise("load wdb and assemble", undefined, (function (param) {
                var fetchFunc = _buildFakeFetch(sandbox, 0, ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), GLBTool$Wonderjs.buildBinBuffer(/* () */0));
                return LoadWDBTool$Wonderjs.load("../singleNode.wdb", fetchFunc, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0).then((function (param) {
                              var gameObject = param[2][0];
                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(gameObject, param[0])), /* array */[gameObject]));
                            }));
              }));
        return Wonder_jest.describe("test load multi wdb files", (function (param) {
                      var _buildFakeFetch = function (sandbox, contentLength1, contentLength2, gltfJsonStr1, gltfJsonStr2, binBuffer) {
                        var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        Sinon.returns(_buildFakeFetchArrayBufferResponse(sandbox, contentLength2, ConvertGLBSystem$Wonderjs.convertGLBData(JSON.parse(gltfJsonStr2), binBuffer)), Sinon.onCall(1, Sinon.returns(_buildFakeFetchArrayBufferResponse(sandbox, contentLength1, ConvertGLBSystem$Wonderjs.convertGLBData(JSON.parse(gltfJsonStr1), binBuffer)), Sinon.onCall(0, fetch))));
                        return fetch;
                      };
                      Wonder_jest.testPromise("test load", undefined, (function (param) {
                              var fetchFunc = _buildFakeFetch(sandbox, 0, 0, ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), GLBTool$Wonderjs.buildBinBuffer(/* () */0));
                              return LoadWDBTool$Wonderjs.load("../singleNode.wdb", fetchFunc, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0).then((function (param) {
                                            var gameObject1 = param[2][0];
                                            MainStateTool$Wonderjs.setState(param[0]);
                                            return LoadWDBTool$Wonderjs.load("../singleNode.wdb", fetchFunc, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0).then((function (param) {
                                                          var gameObject2 = param[2][0];
                                                          var state = param[0];
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              AssembleWDBSystemTool$Wonderjs.getAllGameObjects(gameObject1, state),
                                                                              AssembleWDBSystemTool$Wonderjs.getAllGameObjects(gameObject2, state)
                                                                            ]), /* tuple */[
                                                                          /* array */[gameObject1],
                                                                          /* array */[gameObject2]
                                                                        ]));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.testPromise("test trigger handleWhenLoadingFunc", undefined, (function (param) {
                                    var contentLengthArr = /* array */[];
                                    var wdbPathArr = /* array */[];
                                    var wdbPath1 = "../singleNode1.wdb";
                                    var wdbPath2 = "../singleNode2.wdb";
                                    var fetchFunc = _buildFakeFetch(sandbox, 1, 2, ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), GLBTool$Wonderjs.buildBinBuffer(/* () */0));
                                    var handleWhenLoadingFunc = function (contentLength, wdbPath) {
                                      ArrayService$Wonderjs.push(contentLength, contentLengthArr);
                                      ArrayService$Wonderjs.push(wdbPath, wdbPathArr);
                                      return /* () */0;
                                    };
                                    return LoadWDBTool$Wonderjs.load(wdbPath1, fetchFunc, undefined, undefined, undefined, undefined, undefined, handleWhenLoadingFunc, /* () */0).then((function (param) {
                                                  var gameObject1 = param[2][0];
                                                  MainStateTool$Wonderjs.setState(param[0]);
                                                  return LoadWDBTool$Wonderjs.load(wdbPath2, fetchFunc, undefined, undefined, undefined, undefined, undefined, handleWhenLoadingFunc, /* () */0).then((function (param) {
                                                                var gameObject2 = param[2][0];
                                                                var state = param[0];
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    contentLengthArr,
                                                                                    wdbPathArr,
                                                                                    AssembleWDBSystemTool$Wonderjs.getAllGameObjects(gameObject1, state),
                                                                                    AssembleWDBSystemTool$Wonderjs.getAllGameObjects(gameObject2, state)
                                                                                  ]), /* tuple */[
                                                                                /* array */[
                                                                                  1,
                                                                                  2
                                                                                ],
                                                                                /* array */[
                                                                                  wdbPath1,
                                                                                  wdbPath2
                                                                                ],
                                                                                /* array */[gameObject1],
                                                                                /* array */[gameObject2]
                                                                              ]));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
