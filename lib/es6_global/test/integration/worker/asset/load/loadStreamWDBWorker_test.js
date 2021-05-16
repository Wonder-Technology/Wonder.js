

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as StateAPI$Wonderjs from "../../../../../src/api/StateAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TestWorkerTool$Wonderjs from "../../tool/TestWorkerTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../tool/FakeGlWorkerTool.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as BrowserDetectTool$Wonderjs from "../../../../tool/service/browserDetect/BrowserDetectTool.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as RenderJobsRenderWorkerTool$Wonderjs from "../../job/render_worker/tool/RenderJobsRenderWorkerTool.js";
import * as BasicSourceTextureRenderWorkerTool$Wonderjs from "../../tool/texture/BasicSourceTextureRenderWorkerTool.js";

Wonder_jest.describe("load stream wdb in worker", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        MainStateTool$Wonderjs.createState(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        Wonder_jest.beforeAllPromise(undefined, (function (param) {
                return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.buildFakeCreateImageBitmapFunc, /* () */0);
              }));
        Wonder_jest.afterAllPromise(undefined, (function (param) {
                return Curry._1(BasicSourceTextureRenderWorkerTool$Wonderjs.clearFakeCreateImageBitmapFunc, /* () */0);
              }));
        return Wonder_jest.testPromise("test set the same texture's source which has set the default source before", undefined, (function (param) {
                      var match = BasicSourceTextureRenderWorkerTool$Wonderjs.prepareStateAndCreateTwoMaps(sandbox);
                      var source2 = match[4][1];
                      var map1 = match[3][0];
                      var state = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                      var match$1 = LightMaterialTool$Wonderjs.createGameObject(state);
                      var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(match$1[2], map1, match$1[0]);
                      var state$2 = BrowserDetectTool$Wonderjs.setChrome(state$1);
                      return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                    var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                    var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(map1, source2, state);
                                    return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndRender((function (param) {
                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(map1, state$1)), source2));
                                                }), state$1, sandbox, undefined, /* () */0);
                                  }), state$2, sandbox, undefined, /* () */0);
                    }));
      }));

export {
  
}
/*  Not a pure module */
