'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLBTool$Wonderjs = require("../tool/GLBTool.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var ConvertTool$Wonderjs = require("../tool/ConvertTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");
var GenerateSceneGraphSystemTool$Wonderjs = require("../tool/GenerateSceneGraphSystemTool.js");

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

/*  Not a pure module */
