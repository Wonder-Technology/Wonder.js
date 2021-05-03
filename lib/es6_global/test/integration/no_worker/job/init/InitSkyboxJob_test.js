

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SceneAPI$Wonderjs from "../../../../../src/api/SceneAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SkyboxTool$Wonderjs from "../tool/SkyboxTool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as InitRenderJobTool$Wonderjs from "../../../../tool/job/no_worker/init/InitRenderJobTool.js";
import * as CubemapTextureTool$Wonderjs from "../../../../tool/service/texture/CubemapTextureTool.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("test init skybox job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n        [\n    {\n      \"name\": \"default\",\n      \"jobs\": [\n        {\n          \"name\": \"init_skybox\"\n        }\n      ]\n    }\n  ]\n        ", undefined, "\n[\n        {\n          \"name\": \"init_skybox\"\n        }\n]\n        ", undefined, /* () */0), undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("prepare skybox gameObject to scene", (function (param) {
                return Wonder_jest.describe("create skybox gameObject to scene", (function (param) {
                              return Wonder_jest.test("gameObject has box geometry", (function (param) {
                                            var state$1 = InitRenderJobTool$Wonderjs.exec(state[0]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BoxGeometryTool$Wonderjs.isBoxGeometry(GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(SkyboxTool$Wonderjs.unsafeGetSkyboxGameObject(state$1), state$1), state$1)), true);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("if skybox has cubemap texture", (function (param) {
                      return Wonder_jest.describe("init texture", (function (param) {
                                    return Wonder_jest.describe("create gl texture, save to glTextureMap", (function (param) {
                                                  return Wonder_jest.test("test", (function (param) {
                                                                var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                                                var map = match[1];
                                                                var state$1 = SceneAPI$Wonderjs.setCubemapTexture(map, match[0]);
                                                                var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                Sinon.returns(1, createTexture);
                                                                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                                                var state$3 = InitRenderJobTool$Wonderjs.exec(state$2);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureTool$Wonderjs.unsafeGetTexture(map, state$3)), 1);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
