'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RootTool$Wonderjs = require("../../../tool/RootTool.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");

Wonder_jest.describe("test set full screen job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"create_canvas\"\n        },\n        {\n          \"name\": \"set_full_screen\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n\n[\n\n        {\n          \"name\": \"create_canvas\"\n        },\n        {\n          \"name\": \"set_full_screen\"\n        }\n]\n        ", undefined, /* () */0);
        };
        var _exec = function (param) {
          var match = RootTool$Wonderjs.setRoot(undefined, undefined, /* () */0);
          var match$1 = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
          DirectorTool$Wonderjs.init(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0));
          return /* tuple */[
                  match$1[0],
                  match$1[1],
                  match[0],
                  match[1]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.test("set canvas", (function (param) {
                      var match = _exec(/* () */0);
                      var canvasDom = match[0];
                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                      canvasDom.width,
                                      canvasDom.height,
                                      canvasDom.style.position,
                                      canvasDom.style.left,
                                      canvasDom.style.top,
                                      canvasDom.style.width,
                                      canvasDom.style.height
                                    ]), /* tuple */[
                                  match[2],
                                  match[3],
                                  "absolute",
                                  "0px",
                                  "0px",
                                  "100%",
                                  "100%"
                                ]);
                    }));
      }));

/*  Not a pure module */
