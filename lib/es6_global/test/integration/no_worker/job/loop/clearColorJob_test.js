

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ColorTool$Wonderjs from "../../../../tool/service/atom/ColorTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

Wonder_jest.describe("test clear color job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _buildNoWorkerJobConfig = function (colorHexStr) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"clear_color\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n        \"name\": \"clear_color\",\n        \"flags\": [\n            \"" + (String(colorHexStr) + "\"\n        ]\n    }\n]\n        "), /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("clear gl color", (function (param) {
                var colorHexStr = "#123456";
                var state = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig(colorHexStr));
                var clearColor = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(clearColor), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                var match = ColorTool$Wonderjs.convert16HexToRGBA(colorHexStr);
                return Sinon.toCalledWith(/* array */[
                            match[0],
                            match[1],
                            match[2],
                            match[3]
                          ], Wonder_jest.Expect[/* expect */0](clearColor));
              }));
        return Wonder_jest.test("if color is the same as the last one, not clear", (function (param) {
                      var state = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig("#123456"));
                      var clearColor = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(clearColor), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                      var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                      var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                      DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(clearColor)), 1);
                    }));
      }));

export {
  
}
/*  Not a pure module */
