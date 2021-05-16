'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var DomTool$Wonderjs = require("../../../../tool/service/primitive/DomTool.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var ViewTool$Wonderjs = require("../../../../tool/service/device/ViewTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");

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

/*  Not a pure module */
