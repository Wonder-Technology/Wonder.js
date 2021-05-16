'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var SkyboxTool$Wonderjs = require("../../job/tool/SkyboxTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var CubemapTextureAPI$Wonderjs = require("../../../../../src/api/texture/CubemapTextureAPI.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");

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

/*  Not a pure module */
