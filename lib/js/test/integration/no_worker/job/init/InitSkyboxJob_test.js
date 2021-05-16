'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SceneAPI$Wonderjs = require("../../../../../src/api/SceneAPI.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var SkyboxTool$Wonderjs = require("../tool/SkyboxTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var CubemapTextureAPI$Wonderjs = require("../../../../../src/api/texture/CubemapTextureAPI.js");
var InitRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/init/InitRenderJobTool.js");
var CubemapTextureTool$Wonderjs = require("../../../../tool/service/texture/CubemapTextureTool.js");
var NoWorkerJobConfigTool$Wonderjs = require("../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");

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

/*  Not a pure module */
