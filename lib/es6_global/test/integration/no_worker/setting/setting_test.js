

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../tool/TestTool.js";
import * as SettingTool$Wonderjs from "../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../../tool/service/state/MainStateTool.js";
import * as StateDataMain$Wonderjs from "../../../../src/service/state/main/data/StateDataMain.js";
import * as MainStateDataTool$Wonderjs from "../../../tool/service/state/MainStateDataTool.js";

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

export {
  
}
/*  Not a pure module */
