'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var GPUDetectTool$Wonderjs = require("../../../../tool/service/gpu/GPUDetectTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");

Wonder_jest.describe("test detect gl job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"detect_gl\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n\n[\n\n        {\n          \"name\": \"detect_gl\"\n        }\n]\n        ", undefined, /* () */0);
        };
        var _exec = function (fakeGl) {
          var state = FakeGlTool$Wonderjs.setFakeGl(fakeGl, TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0));
          TestTool$Wonderjs.closeContractCheck(/* () */0);
          return DirectorTool$Wonderjs.init(state);
        };
        var _setFakeGlData = (
               function(name, value, fakeGl){
                 fakeGl[name] = value;
                 return fakeGl;
               }
                );
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("detect extension", (function (param) {
                Wonder_jest.test("detect instanced_arrays", (function (param) {
                        var match = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                        var fakeGl = match[1];
                        _exec(fakeGl);
                        return Sinon.toCalledWith(/* array */["ANGLE_instanced_arrays"], Wonder_jest.Expect[/* expect */0](Sinon.getCall(0, fakeGl.getExtension)));
                      }));
                return Wonder_jest.test("detect element_index_uint", (function (param) {
                              var match = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                              var fakeGl = match[1];
                              _exec(fakeGl);
                              return Sinon.toCalledWith(/* array */["OES_element_index_uint"], Wonder_jest.Expect[/* expect */0](Sinon.getCall(1, fakeGl.getExtension)));
                            }));
              }));
        return Wonder_jest.describe("detect capabilty", (function (param) {
                      Wonder_jest.describe("detect texture capability", (function (param) {
                              var _prepare = function (param) {
                                var match = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                                var fakeGl = Curry._3(_setFakeGlData, "MAX_TEXTURE_IMAGE_UNITS", 4, match[1]);
                                Sinon.returns(16, Sinon.withOneArg(4, fakeGl.getParameter));
                                return /* tuple */[
                                        16,
                                        fakeGl
                                      ];
                              };
                              return Wonder_jest.test("detect max texture unit", (function (param) {
                                            var match = _prepare(/* () */0);
                                            var state = _exec(match[1]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GPUDetectTool$Wonderjs.getRecord(state)[/* maxTextureUnit */3]), match[0]);
                                          }));
                            }));
                      return Wonder_jest.describe("detect precision", (function (param) {
                                    var _prepare = function (sandbox) {
                                      var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                      var match = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                                      var fakeGl = Curry._3(_setFakeGlData, "VERTEX_SHADER", 0, match[1]);
                                      var fakeGl$1 = Curry._3(_setFakeGlData, "FRAGMENT_SHADER", 1, fakeGl);
                                      var fakeGl$2 = Curry._3(_setFakeGlData, "HIGH_FLOAT", 2, fakeGl$1);
                                      var fakeGl$3 = Curry._3(_setFakeGlData, "MEDIUM_FLOAT", 3, fakeGl$2);
                                      Sinon.returns({
                                            precision: 0
                                          }, fakeGl$3.getShaderPrecisionFormat);
                                      return /* tuple */[
                                              fakeGl$3,
                                              warn,
                                              0,
                                              1,
                                              2,
                                              3
                                            ];
                                    };
                                    Wonder_jest.test("if highp is available, use highp", (function (param) {
                                            var match = _prepare(sandbox);
                                            var highFloat = match[4];
                                            var fakeGl = match[0];
                                            Sinon.returns({
                                                  precision: 1
                                                }, Sinon.withTwoArgs(match[2], highFloat, fakeGl.getShaderPrecisionFormat));
                                            Sinon.returns({
                                                  precision: 1
                                                }, Sinon.withTwoArgs(match[3], highFloat, fakeGl.getShaderPrecisionFormat));
                                            var state = _exec(fakeGl);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GPUDetectTool$Wonderjs.getRecord(state)[/* precision */2]), /* HIGHP */0);
                                          }));
                                    Wonder_jest.test("else if mediump is available, warn and use mediump", (function (param) {
                                            var match = _prepare(sandbox);
                                            var mediumFloat = match[5];
                                            var fakeGl = match[0];
                                            Sinon.returns({
                                                  precision: 1
                                                }, Sinon.withTwoArgs(match[2], mediumFloat, fakeGl.getShaderPrecisionFormat));
                                            Sinon.returns({
                                                  precision: 1
                                                }, Sinon.withTwoArgs(match[3], mediumFloat, fakeGl.getShaderPrecisionFormat));
                                            var state = _exec(fakeGl);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            Sinon.getCallCount(match[1]),
                                                            GPUDetectTool$Wonderjs.getRecord(state)[/* precision */2]
                                                          ]), /* tuple */[
                                                        1,
                                                        /* MEDIUMP */1
                                                      ]);
                                          }));
                                    return Wonder_jest.test("else, warn and use lowp", (function (param) {
                                                  var match = _prepare(sandbox);
                                                  var state = _exec(match[0]);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  Sinon.getCallCount(match[1]),
                                                                  GPUDetectTool$Wonderjs.getRecord(state)[/* precision */2]
                                                                ]), /* tuple */[
                                                              1,
                                                              /* LOWP */2
                                                            ]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
