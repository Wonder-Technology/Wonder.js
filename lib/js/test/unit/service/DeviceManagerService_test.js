'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var TestTool$Wonderjs = require("../../tool/TestTool.js");
var SinonTool$Wonderjs = require("../../integration/no_worker/tool/sinon/SinonTool.js");
var FakeGlTool$Wonderjs = require("../../tool/gl/FakeGlTool.js");
var MainStateTool$Wonderjs = require("../../tool/service/state/MainStateTool.js");
var DeviceManagerAPI$Wonderjs = require("../../../src/api/DeviceManagerAPI.js");
var DeviceManagerTool$Wonderjs = require("../../tool/service/device/DeviceManagerTool.js");

describe("DeviceManagerService", (function () {
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
        describe("setViewport", (function () {
                return Wonder_jest.test("if target viewport data === old viewport data, not set gl viewport", (function () {
                              var viewport = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(viewport), undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
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
        describe("setScissorTest", (function () {
                return Wonder_jest.test("if target test === old test, not enable", (function () {
                              var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(enable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              var state$1 = DeviceManagerTool$Wonderjs.setGl(gl, state[0]);
                              var state$2 = DeviceManagerAPI$Wonderjs.setScissorTest(true, state$1);
                              DeviceManagerAPI$Wonderjs.setScissorTest(true, state$2);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](enable));
                            }));
              }));
        describe("setScissor", (function () {
                return Wonder_jest.test("if target scissor data === old scissor data, not set gl scissor", (function () {
                              var scissor = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(scissor), undefined, undefined, undefined, undefined, undefined, /* () */0);
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
        describe("setSide", (function () {
                Wonder_jest.test("if target side === old side, not set gl side", (function () {
                        var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                        var record = DeviceManagerTool$Wonderjs.setSide(gl, /* FRONT */2, state[0][/* deviceManagerRecord */9]);
                        DeviceManagerTool$Wonderjs.setSide(gl, /* FRONT */2, record);
                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](cullFace));
                      }));
                describe("else", (function () {
                        Wonder_jest.test("test set NONE side", (function () {
                                var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 10, 9, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(enable), undefined, Js_primitive.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                DeviceManagerTool$Wonderjs.setSide(gl, /* NONE */0, state[0][/* deviceManagerRecord */9]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                SinonTool$Wonderjs.calledWith(enable, 9),
                                                SinonTool$Wonderjs.calledWith(cullFace, 10)
                                              ]), /* tuple */[
                                            true,
                                            true
                                          ]);
                              }));
                        Wonder_jest.test("test set BOTH side", (function () {
                                var disable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 9, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(disable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                DeviceManagerTool$Wonderjs.setSide(gl, /* BOTH */1, state[0][/* deviceManagerRecord */9]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SinonTool$Wonderjs.calledWith(disable, 9)), true);
                              }));
                        Wonder_jest.test("test set FRONT side", (function () {
                                var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 10, undefined, undefined, 9, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(enable), undefined, Js_primitive.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                DeviceManagerTool$Wonderjs.setSide(gl, /* FRONT */2, state[0][/* deviceManagerRecord */9]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                SinonTool$Wonderjs.calledWith(enable, 9),
                                                SinonTool$Wonderjs.calledWith(cullFace, 10)
                                              ]), /* tuple */[
                                            true,
                                            true
                                          ]);
                              }));
                        return Wonder_jest.test("test set BACK side", (function () {
                                      var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var gl = FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 10, undefined, 9, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(enable), undefined, Js_primitive.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      DeviceManagerTool$Wonderjs.setSide(gl, /* BACK */3, state[0][/* deviceManagerRecord */9]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      SinonTool$Wonderjs.calledWith(enable, 9),
                                                      SinonTool$Wonderjs.calledWith(cullFace, 10)
                                                    ]), /* tuple */[
                                                  true,
                                                  true
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
