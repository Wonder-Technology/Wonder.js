

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$Wonderjs from "../tool/GLBTool.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as LoadWDBTool$Wonderjs from "../../../tool/asset/load/LoadWDBTool.js";
import * as ArrayService$Wonderjs from "../../../../../src/service/atom/ArrayService.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as ConvertGLBTool$Wonderjs from "../tool/ConvertGLBTool.js";
import * as ConvertGLBSystem$Wonderjs from "../../../../../src/asset/converter/ConvertGLBSystem.js";
import * as AssembleWDBSystemTool$Wonderjs from "../tool/AssembleWDBSystemTool.js";

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

export {
  
}
/*  Not a pure module */
