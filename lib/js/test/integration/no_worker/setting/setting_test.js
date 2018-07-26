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

describe("test setting record", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("isDebug", (function () {
                describe("if true", (function () {
                        return Wonder_jest.test("it will open contract check", (function () {
                                      SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                                      SettingTool$Wonderjs.createStateAndSetToStateData("true", undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainStateDataTool$Wonderjs.getIsDebug(StateDataMain$Wonderjs.stateData)), true);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("gpu config", (function () {
                var _buildExpectedGPUConfig = function ($staropt$star, _) {
                  var useHardwareInstance = $staropt$star !== undefined ? $staropt$star : true;
                  return /* record */[/* useHardwareInstance */useHardwareInstance];
                };
                describe("if pass gpu config", (function () {
                        return Wonder_jest.test("set to setting", (function () {
                                      SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                                      var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, "false", undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SettingTool$Wonderjs.unsafeGetGPU(state)), _buildExpectedGPUConfig(false, /* () */0));
                                    }));
                      }));
                describe("else", (function () {
                        return Wonder_jest.test("set default data", (function () {
                                      SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
                                      var state = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      var useHardwareInstance = true;
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SettingTool$Wonderjs.unsafeGetGPU(state)), /* record */[/* useHardwareInstance */useHardwareInstance]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
