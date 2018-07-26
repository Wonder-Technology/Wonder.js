

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$Wonderjs from "../tool/GLBTool.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ConvertTool$Wonderjs from "../tool/ConvertTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as GenerateSceneGraphSystemTool$Wonderjs from "../tool/GenerateSceneGraphSystemTool.js";

describe("generateSceneGraph", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeAll((function () {
                return Curry._1(ConvertTool$Wonderjs.buildFakeLoadImage, /* () */0);
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(50000, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("generate asset", (function () {
                return Wonder_jest.testPromise("test", (function () {
                              GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                            return GenerateSceneGraphSystemTool$Wonderjs.contain("\"asset\":{\"version\":\"2.0\", \"generator\":\"GLTF2WD\"}", param[0]);
                                          }), state);
                            }));
              }));
        describe("generate scene", (function () {
                return Wonder_jest.testPromise("test", (function () {
                              GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                            return GenerateSceneGraphSystemTool$Wonderjs.contain("\"scene\": 0, \"scenes\":[{\"extensions\":{\"KHR_lights\":{\"light\":0}},\"nodes\":[0]}]", param[0]);
                                          }), state);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
