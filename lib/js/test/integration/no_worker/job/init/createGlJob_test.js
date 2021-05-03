'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var ViewTool$Wonderjs = require("../../../../tool/service/device/ViewTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");

Wonder_jest.describe("test create gl job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"create_canvas\"\n        },\n        {\n          \"name\": \"create_gl\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n\n[\n        {\n          \"name\": \"create_canvas\"\n        },\n    {\n        \"name\": \"create_gl\"\n    }\n]\n        ", undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("get webgl1 context", (function (param) {
                var match = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                DirectorTool$Wonderjs.init(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0));
                return Sinon.toCalledWith(/* array */["webgl"], Wonder_jest.Expect[/* expect */0](match[0].getContext));
              }));
        Wonder_jest.describe("if pass contextConfig", (function (param) {
                return Wonder_jest.test("set webgl context option by passed record", (function (param) {
                              var match = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                              DirectorTool$Wonderjs.init(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, "\n                        {\n                 \"alpha\": false,\n                 \"depth\": true,\n                 \"stencil\": true,\n                 \"antialias\": false,\n                 \"premultiplied_alpha\": false,\n                 \"preserve_drawing_buffer\": false\n               }\n               ", undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0));
                              return Sinon.toCalledWith(/* array */[
                                          Sinon$1.match.any,
                                          {
                                            alpha: false,
                                            depth: true,
                                            stencil: true,
                                            antialias: false,
                                            premultipliedAlpha: false,
                                            preserveDrawingBuffer: false
                                          }
                                        ], Wonder_jest.Expect[/* expect */0](match[0].getContext));
                            }));
              }));
        Wonder_jest.describe("else", (function (param) {
                return Wonder_jest.test("set default webgl context option", (function (param) {
                              var match = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                              DirectorTool$Wonderjs.init(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0));
                              return Sinon.toCalledWith(/* array */[
                                          Sinon$1.match.any,
                                          {
                                            alpha: true,
                                            depth: true,
                                            stencil: false,
                                            antialias: true,
                                            premultipliedAlpha: true,
                                            preserveDrawingBuffer: false
                                          }
                                        ], Wonder_jest.Expect[/* expect */0](match[0].getContext));
                            }));
              }));
        return Wonder_jest.test("set to state", (function (param) {
                      SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                      var state = DirectorTool$Wonderjs.init(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0));
                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ViewTool$Wonderjs.unsafeGetContext(state)), /* record */[
                                  /* alpha */true,
                                  /* depth */true,
                                  /* stencil */false,
                                  /* antialias */true,
                                  /* premultipliedAlpha */true,
                                  /* preserveDrawingBuffer */false
                                ]);
                    }));
      }));

/*  Not a pure module */
