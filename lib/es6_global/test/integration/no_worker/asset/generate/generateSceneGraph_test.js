

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

Wonder_jest.describe("generateSceneGraph", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        Wonder_jest.beforeAllPromise(undefined, (function (param) {
                return ConvertTool$Wonderjs.buildFakeLoadImage();
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(50000, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return ConvertTool$Wonderjs.setFakeTransformCount(50);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("generate asset", (function (param) {
                return Wonder_jest.testPromise("test", undefined, (function (param) {
                              GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                            return GenerateSceneGraphSystemTool$Wonderjs.contain("\"asset\":{\"version\":\"2.0\", \"generator\":\"GLTF2WD\"}", param[0]);
                                          }), state);
                            }));
              }));
        return Wonder_jest.describe("generate scene", (function (param) {
                      return Wonder_jest.testPromise("test", undefined, (function (param) {
                                    GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                    return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                  return GenerateSceneGraphSystemTool$Wonderjs.contain("\n\"scenes\":[{\"extensions\":{\"KHR_lights\":{\"light\":0}},\"nodes\":[0],\"extras\":{\"imgui\":{\"assetData\":{},\"extendData\":{\"customControlData\":{\"funcMap\":\"{}\"},\"skinData\":{\"allSkinDataMap\":\"{}\"}},\"execData\":{\"execFuncDataArr\":[]}}}}]\n                  ", param[0]);
                                                }), state);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
