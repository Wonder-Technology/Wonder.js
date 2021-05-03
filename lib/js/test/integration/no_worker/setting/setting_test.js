'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../tool/TestTool.js");
var SettingTool$Wonderjs = require("../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../tool/service/state/MainStateTool.js");
var StateDataMain$Wonderjs = require("../../../../src/service/state/main/data/StateDataMain.js");
var MainStateDataTool$Wonderjs = require("../../../tool/service/state/MainStateDataTool.js");

Wonder_jest.describe("test setting record", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("isDebug", (function (param) {
                return Wonder_jest.describe("if true", (function (param) {
                              return Wonder_jest.test("it will open contract check", (function (param) {
                                            SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                                            SettingTool$Wonderjs.createStateAndSetToStateData("true", undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainStateDataTool$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData)), true);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("gpu config", (function (param) {
                      var _buildExpectedGPUConfig = function ($staropt$star, param) {
                        var useHardwareInstance = $staropt$star !== undefined ? $staropt$star : true;
                        return /* record */[/* useHardwareInstance */useHardwareInstance];
                      };
                      Wonder_jest.describe("if pass gpu config", (function (param) {
                              return Wonder_jest.test("set to setting", (function (param) {
                                            SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                                            var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, "false", undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SettingTool$Wonderjs.unsafeGetGPU(state)), _buildExpectedGPUConfig(false, /* () */0));
                                          }));
                            }));
                      return Wonder_jest.describe("else", (function (param) {
                                    return Wonder_jest.test("set default data", (function (param) {
                                                  SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                                                  var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                  var useHardwareInstance = true;
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SettingTool$Wonderjs.unsafeGetGPU(state)), /* record */[/* useHardwareInstance */useHardwareInstance]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
