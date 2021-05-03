

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as RootTool$Wonderjs from "../../../tool/RootTool.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

Wonder_jest.describe("test set full screen job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"set_viewport\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n\n[\n        {\n          \"name\": \"set_viewport\"\n        }\n]\n        ", undefined, /* () */0);
        };
        var _exec = function (param) {
          var match = RootTool$Wonderjs.setRoot(undefined, undefined, /* () */0);
          var match$1 = SettingTool$Wonderjs.buildFakeDomForNotPassCanvasId(sandbox);
          var fakeGl = match$1[1];
          DirectorTool$Wonderjs.init(FakeGlTool$Wonderjs.setFakeGl(fakeGl, TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, _buildNoWorkerJobConfig(/* () */0), undefined, /* () */0)));
          return /* tuple */[
                  match$1[0],
                  fakeGl,
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
        return Wonder_jest.test("set gl viewport", (function (param) {
                      var match = _exec(/* () */0);
                      return Sinon.toCalledWith(/* array */[
                                  0,
                                  0,
                                  100,
                                  200
                                ], Wonder_jest.Expect[/* expect */0](match[1].viewport));
                    }));
      }));

export {
  
}
/*  Not a pure module */
