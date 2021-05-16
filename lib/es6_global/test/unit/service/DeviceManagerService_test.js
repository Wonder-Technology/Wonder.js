

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../tool/TestTool.js";
import * as SinonTool$Wonderjs from "../../integration/no_worker/tool/sinon/SinonTool.js";
import * as FakeGlTool$Wonderjs from "../../tool/gl/FakeGlTool.js";
import * as MainStateTool$Wonderjs from "../../tool/service/state/MainStateTool.js";
import * as DeviceManagerAPI$Wonderjs from "../../../src/api/DeviceManagerAPI.js";
import * as DeviceManagerTool$Wonderjs from "../../tool/service/device/DeviceManagerTool.js";

Wonder_jest.describe("AllDeviceManagerService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("setViewport", (function (param) {
                return Wonder_jest.test("if target viewport data === old viewport data, not set gl viewport", (function (param) {
                              var viewport = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(viewport), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              var state$1 = DeviceManagerTool$Wonderjs.setGl(gl, state[0]);
                              var viewportData = /* tuple */[
                                1,
                                2,
                                10,
                                20
                              ];
                              var state$2 = DeviceManagerAPI$Wonderjs.setViewport(viewportData, state$1);
                              DeviceManagerAPI$Wonderjs.setViewport(viewportData, state$2);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](viewport));
                            }));
              }));
        Wonder_jest.describe("setScissorTest", (function (param) {
                return Wonder_jest.test("if target test === old test, not enable", (function (param) {
                              var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              var state$1 = DeviceManagerTool$Wonderjs.setGl(gl, state[0]);
                              var state$2 = DeviceManagerAPI$Wonderjs.setScissorTest(true, state$1);
                              DeviceManagerAPI$Wonderjs.setScissorTest(true, state$2);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](enable));
                            }));
              }));
        Wonder_jest.describe("setScissor", (function (param) {
                return Wonder_jest.test("if target scissor data === old scissor data, not set gl scissor", (function (param) {
                              var scissor = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(scissor), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              var state$1 = DeviceManagerTool$Wonderjs.setGl(gl, state[0]);
                              var scissorData = /* tuple */[
                                1,
                                2,
                                10,
                                20
                              ];
                              var state$2 = DeviceManagerAPI$Wonderjs.setScissor(scissorData, state$1);
                              DeviceManagerAPI$Wonderjs.setScissor(scissorData, state$2);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](scissor));
                            }));
              }));
        Wonder_jest.describe("setSide", (function (param) {
                Wonder_jest.test("if target side === old side, not set gl side", (function (param) {
                        var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                        var record = DeviceManagerTool$Wonderjs.setSide(gl, /* FRONT */2, state[0][/* deviceManagerRecord */9]);
                        DeviceManagerTool$Wonderjs.setSide(gl, /* FRONT */2, record);
                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](cullFace));
                      }));
                return Wonder_jest.describe("else", (function (param) {
                              Wonder_jest.test("test set NONE side", (function (param) {
                                      var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 9, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enable), undefined, Caml_option.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      DeviceManagerTool$Wonderjs.setSide(gl, /* NONE */0, state[0][/* deviceManagerRecord */9]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      SinonTool$Wonderjs.calledWith(enable, 9),
                                                      SinonTool$Wonderjs.calledWith(cullFace, 10)
                                                    ]), /* tuple */[
                                                  true,
                                                  true
                                                ]);
                                    }));
                              Wonder_jest.test("test set BOTH side", (function (param) {
                                      var disable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 9, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(disable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      DeviceManagerTool$Wonderjs.setSide(gl, /* BOTH */1, state[0][/* deviceManagerRecord */9]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SinonTool$Wonderjs.calledWith(disable, 9)), true);
                                    }));
                              Wonder_jest.test("test set FRONT side", (function (param) {
                                      var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 9, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enable), undefined, Caml_option.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      DeviceManagerTool$Wonderjs.setSide(gl, /* FRONT */2, state[0][/* deviceManagerRecord */9]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      SinonTool$Wonderjs.calledWith(enable, 9),
                                                      SinonTool$Wonderjs.calledWith(cullFace, 10)
                                                    ]), /* tuple */[
                                                  true,
                                                  true
                                                ]);
                                    }));
                              return Wonder_jest.test("test set BACK side", (function (param) {
                                            var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 9, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enable), undefined, Caml_option.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            DeviceManagerTool$Wonderjs.setSide(gl, /* BACK */3, state[0][/* deviceManagerRecord */9]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            SinonTool$Wonderjs.calledWith(enable, 9),
                                                            SinonTool$Wonderjs.calledWith(cullFace, 10)
                                                          ]), /* tuple */[
                                                        true,
                                                        true
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test stencil", (function (param) {
                      Wonder_jest.describe("setStencilTest", (function (param) {
                              return Wonder_jest.test("enable stencil test", (function (param) {
                                            var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(enable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            var state$1 = DeviceManagerTool$Wonderjs.setGl(gl, state[0]);
                                            DeviceManagerAPI$Wonderjs.setStencilTest(true, state$1);
                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](enable));
                                          }));
                            }));
                      Wonder_jest.describe("setStencilMask", (function (param) {
                              return Wonder_jest.test("set stencil mask", (function (param) {
                                            var stencilMask = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(stencilMask), undefined, undefined, undefined, undefined, /* () */0);
                                            var state$1 = DeviceManagerTool$Wonderjs.setGl(gl, state[0]);
                                            DeviceManagerAPI$Wonderjs.setStencilMask(255, state$1);
                                            return Sinon.toCalledWith(/* array */[255], Wonder_jest.Expect[/* expect */0](stencilMask));
                                          }));
                            }));
                      Wonder_jest.describe("setStencilFunc", (function (param) {
                              return Wonder_jest.test("set stencil func", (function (param) {
                                            var stencilFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(stencilFunc), undefined, undefined, undefined, /* () */0);
                                            var state$1 = DeviceManagerTool$Wonderjs.setGl(gl, state[0]);
                                            DeviceManagerAPI$Wonderjs.setStencilFunc(0, 1, 0, state$1);
                                            return Sinon.toCalledWith(/* array */[
                                                        0,
                                                        1,
                                                        0
                                                      ], Wonder_jest.Expect[/* expect */0](stencilFunc));
                                          }));
                            }));
                      return Wonder_jest.describe("setStencilOp", (function (param) {
                                    return Wonder_jest.test("set stencil op", (function (param) {
                                                  var stencilOp = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                  var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, undefined, 1, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(stencilOp), undefined, undefined, /* () */0);
                                                  var state$1 = DeviceManagerTool$Wonderjs.setGl(gl, state[0]);
                                                  DeviceManagerAPI$Wonderjs.setStencilOp(0, 1, 2, state$1);
                                                  return Sinon.toCalledWith(/* array */[
                                                              0,
                                                              1,
                                                              2
                                                            ], Wonder_jest.Expect[/* expect */0](stencilOp));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
