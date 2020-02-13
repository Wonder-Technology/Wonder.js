

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SkyboxTool$Wonderjs from "../../job/tool/SkyboxTool.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";

Wonder_jest.describe("test switch skybox", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = SkyboxTool$Wonderjs.initWithJobConfig(sandbox);
                return TestTool$Wonderjs.closeContractCheck(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test switch skybox's cubemap texture", (function (param) {
                      var _prepare = function (state) {
                        var createTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        Sinon.returns(11, Sinon.onCall(0, createTexture));
                        Sinon.returns(12, Sinon.onCall(1, createTexture));
                        var activeTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var bindTexture = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 8, undefined, undefined, undefined, undefined, undefined, undefined, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createTexture), Caml_option.some(activeTexture), Caml_option.some(bindTexture), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                        return /* tuple */[
                                state$1,
                                /* tuple */[
                                  8,
                                  11,
                                  12,
                                  10
                                ],
                                /* tuple */[
                                  activeTexture,
                                  bindTexture
                                ]
                              ];
                      };
                      return Wonder_jest.test("create cubemap1;\n        set cubemap1 to skybox;\n        init;\n        loopBody;\n        create cubemap2 and init it;\n        set cubemap2 to skybox;\n        loopBody;\n\n        should bind cubemap2->gl texture;\n        ", (function (param) {
                                    var match = SkyboxTool$Wonderjs.prepareCubemapTexture(state[0]);
                                    var match$1 = SkyboxTool$Wonderjs.prepareGameObject(match[0]);
                                    var match$2 = _prepare(match$1[0]);
                                    var bindTexture = match$2[2][1];
                                    var match$3 = match$2[1];
                                    var glTexture2 = match$3[2];
                                    var glTexture1 = match$3[1];
                                    var textureCubemap = match$3[0];
                                    var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(match$2[0]));
                                    var match$4 = SkyboxTool$Wonderjs.prepareCubemapTexture(state$1);
                                    var state$2 = CubemapTextureAPI$Wonderjs.initCubemapTexture(match$4[1], match$4[0]);
                                    DirectorTool$Wonderjs.runWithDefaultTime(state$2);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                    Sinon.getCallCount(Sinon.withTwoArgs(textureCubemap, glTexture1, bindTexture)),
                                                    Sinon.getCallCount(Sinon.withTwoArgs(textureCubemap, glTexture2, bindTexture)),
                                                    Sinon.calledAfter(Sinon.withTwoArgs(textureCubemap, glTexture2, bindTexture), Sinon.withTwoArgs(textureCubemap, glTexture1, bindTexture))
                                                  ]), /* tuple */[
                                                1,
                                                1,
                                                true
                                              ]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
