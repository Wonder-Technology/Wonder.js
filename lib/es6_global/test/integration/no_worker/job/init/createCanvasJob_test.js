

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as DomTool$Wonderjs from "../../../../tool/service/primitive/DomTool.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ViewTool$Wonderjs from "../../../../tool/service/device/ViewTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

Wonder_jest.describe("test create canvas job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"create_canvas\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n\n[\n    {\n        \"name\": \"create_canvas\"\n    }\n]\n        ", undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("if pass canvas id", (function (param) {
                Wonder_jest.test("if correspond canvas don't exist, error", (function (param) {
                        return Wonder_jest.Expect[/* toThrowMessage */21]("canvas whose id is a should exist", Wonder_jest.Expect[/* expect */0]((function (param) {
                                          return DirectorTool$Wonderjs.init(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, "true", "a", undefined, undefined, undefined, undefined, undefined, /* () */0));
                                        })));
                      }));
                return Wonder_jest.describe("else", (function (param) {
                              beforeEach((function () {
                                      var canvasDom = SettingTool$Wonderjs.buildFakeCanvas("a", SettingTool$Wonderjs.buildFakeGl(sandbox), sandbox);
                                      var querySelectorAll = Curry._3(Sinon.createMethodStub, sandbox[0], document, "querySelectorAll");
                                      Sinon.returns(/* array */[], querySelectorAll);
                                      Sinon.returns(/* array */[canvasDom], Sinon.withOneArg("#a", querySelectorAll));
                                      return /* () */0;
                                    }));
                              Wonder_jest.test("save canvas to state and get webgl1 context from it", (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DomTool$Wonderjs.getId(ViewTool$Wonderjs.unsafeGetCanvas(DirectorTool$Wonderjs.init(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, "a", undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0))))), "a");
                                    }));
                              return Wonder_jest.test("suppport pass canvas id which starts with #", (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DomTool$Wonderjs.getId(ViewTool$Wonderjs.unsafeGetCanvas(DirectorTool$Wonderjs.init(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, "#a", undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0))))), "a");
                                          }));
                            }));
              }));
        return Wonder_jest.describe("else", (function (param) {
                      var exec = function (param) {
                        var match = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                        DirectorTool$Wonderjs.init(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0));
                        return /* tuple */[
                                match[0],
                                match[2],
                                match[3]
                              ];
                      };
                      Wonder_jest.test("test create canvas", (function (param) {
                              exec(/* () */0);
                              return Sinon.toCalledWith(/* array */["canvas"], Wonder_jest.Expect[/* expect */0](document.createElement));
                            }));
                      return Wonder_jest.test("prepend to body", (function (param) {
                                    var match = exec(/* () */0);
                                    return Sinon.toCalledWith(/* array */[match[0]], Wonder_jest.Expect[/* expect */0](match[2].prepend));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
