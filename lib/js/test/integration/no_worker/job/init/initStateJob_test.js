'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var InitStateJobTool$Wonderjs = require("../../../../tool/job/no_worker/init/InitStateJobTool.js");

describe("test init_state job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("set gl state", (function () {
                describe("set side to FRONT", (function () {
                        var _exec = function (state) {
                          var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var cullFace = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 2, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(enable), undefined, Js_primitive.some(cullFace), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                          var state$2 = InitStateJobTool$Wonderjs.exec(state$1);
                          return /* tuple */[
                                  state$2,
                                  /* tuple */[
                                    enable,
                                    cullFace
                                  ],
                                  /* tuple */[
                                    1,
                                    2
                                  ]
                                ];
                        };
                        Wonder_jest.test("enable cull face", (function () {
                                var match = _exec(state);
                                return Sinon.toCalledWith(/* array */[match[2][0]], Wonder_jest.Expect[/* expect */0](match[1][0]));
                              }));
                        return Wonder_jest.test("cull back face", (function () {
                                      var match = _exec(state);
                                      return Sinon.toCalledWith(/* array */[match[2][1]], Wonder_jest.Expect[/* expect */0](match[1][1]));
                                    }));
                      }));
                return Wonder_jest.test("enable depth test", (function () {
                              var enable = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(enable), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                              InitStateJobTool$Wonderjs.exec(state$1);
                              return Sinon.toCalledWith(/* array */[1], Wonder_jest.Expect[/* expect */0](enable));
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
