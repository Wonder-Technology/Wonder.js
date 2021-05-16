

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as ViewTool$Wonderjs from "../../tool/service/device/ViewTool.js";
import * as SettingTool$Wonderjs from "../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../tool/service/state/MainStateTool.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../tool/service/camera/PerspectiveCameraProjectionTool.js";

Wonder_jest.describe("UpdatePerspectiveCameraProjectionMainService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("updateCameraProjection", (function (param) {
                      return Wonder_jest.test("if not has fovy/near/far value, error", (function (param) {
                                    var __x = SettingTool$Wonderjs.buildFakeCanvasWithSize(SettingTool$Wonderjs.buildFakeGl(sandbox), sandbox, undefined, undefined, undefined, /* () */0);
                                    state[0] = ViewTool$Wonderjs.setCanvas(__x, state[0]);
                                    return Wonder_jest.Expect[/* toThrowMessage */21]("fovy,near,far should all exist", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                      return PerspectiveCameraProjectionTool$Wonderjs.updateCameraProjection(0, state[0]);
                                                    })));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
