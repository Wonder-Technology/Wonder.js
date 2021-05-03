

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TransformTool$Wonderjs from "../../../../tool/service/transform/TransformTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";

Wonder_jest.describe("test update transform job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildNoWorkerJobConfig = function (param) {
          return NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"update_transform\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"update_transform\"\n        }\n]\n        ", /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, _buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test special cases", (function (param) {
                      return Wonder_jest.test("shouldn't update disposed transform's data", (function (param) {
                                    var match = TransformAPI$Wonderjs.createTransform(state[0]);
                                    var transform1 = match[1];
                                    var match$1 = TransformAPI$Wonderjs.createTransform(match[0]);
                                    var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match$1[1], /* tuple */[
                                          3,
                                          1,
                                          2
                                        ], TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                                              1,
                                              2,
                                              3
                                            ], match$1[0]));
                                    var state$2 = TransformTool$Wonderjs.dispose(transform1, state$1);
                                    var state$3 = DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.getLocalToWorldMatrix(transform1, state$3)), TransformTool$Wonderjs.getDefaultLocalToWorldMatrix(state$3));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
