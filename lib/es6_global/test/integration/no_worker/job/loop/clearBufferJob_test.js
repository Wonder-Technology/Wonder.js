

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

Wonder_jest.describe("test clear buffer job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        var _buildNoWorkerJobConfig = function (flags) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"clear_buffer\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n\n    {\n        \"name\": \"clear_buffer\",\n        \"flags\": " + (String(flags) + "\n    }\n]\n        "), /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("clear gl buffer", (function (param) {
                return Wonder_jest.describe("clear which buffer is decide by flags", (function (param) {
                              Wonder_jest.test("test pass COLOR_BUFFER flag", (function (param) {
                                      var state = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig("[\"COLOR_BUFFER\"]"));
                                      var clear = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(clear), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                      return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](clear));
                                    }));
                              Wonder_jest.test("test pass DEPTH_BUFFER flag", (function (param) {
                                      var state = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig("[\"DEPTH_BUFFER\"]"));
                                      var clear = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(clear), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                      return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](clear));
                                    }));
                              Wonder_jest.test("test pass STENCIL_BUFFER flag", (function (param) {
                                      var state = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig("[\"STENCIL_BUFFER\"]"));
                                      var clear = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(clear), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                      DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                      return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](clear));
                                    }));
                              return Wonder_jest.test("test pass all flags", (function (param) {
                                            var state = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig("[\"COLOR_BUFFER\", \"DEPTH_BUFFER\", \"STENCIL_BUFFER\"]"));
                                            var clear = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, 2, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(clear), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                            DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                            return Sinon.toCalledWith(/* array */[3], Wonder_jest.Expect[/* expect */0](clear));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("set color write", (function (param) {
                      Wonder_jest.test("set to all true", (function (param) {
                              var state = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig("[\"COLOR_BUFFER\"]"));
                              var colorMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(colorMask), undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                              DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                              return Sinon.toCalledWith(/* array */[
                                          true,
                                          true,
                                          true,
                                          true
                                        ], Wonder_jest.Expect[/* expect */0](colorMask));
                            }));
                      return Wonder_jest.test("if color write is the same as the last one, not set", (function (param) {
                                    var state = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig("[\"COLOR_BUFFER\"]"));
                                    var colorMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(colorMask), undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                    var state$2 = DirectorTool$Wonderjs.runWithDefaultTime(state$1);
                                    var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                    DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(colorMask)), 1);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
