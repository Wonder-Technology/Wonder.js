'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var FakeGlTool$Wonderjs = require("../../../../tool/gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../../../tool/core/DirectorTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var RenderJobsTool$Wonderjs = require("../../../../tool/job/no_worker/loop/RenderJobsTool.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../src/api/material/BasicMaterialAPI.js");
var GLSLLocationTool$Wonderjs = require("../../../../tool/service/location/GLSLLocationTool.js");
var LoopRenderJobTool$Wonderjs = require("../../../../tool/job/no_worker/loop/LoopRenderJobTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../tool/job/render_basic/RenderBasicJobTool.js");

Wonder_jest.describe("test clear last send component", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _prepare = function (state) {
          var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
          return /* tuple */[
                  match$1[0],
                  match[1],
                  match[3]
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("clear lastSendMaterialData", (function (param) {
                return Wonder_jest.describe("test create gameObject after dispose one", (function (param) {
                              return Wonder_jest.test("should send new one's material uniform record", (function (param) {
                                            var match = _prepare(state[0]);
                                            var colorArr1 = /* array */[
                                              1.0,
                                              0.1,
                                              0.2
                                            ];
                                            var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(match[2], colorArr1, match[0]);
                                            var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_color");
                                            var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                            var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                                            var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                                            var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                            var state$5 = GameObjectTool$Wonderjs.disposeGameObject(match[1], state$4);
                                            var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state$5);
                                            var state$6 = GameObjectAPI$Wonderjs.initGameObject(match$1[1], match$1[0]);
                                            var colorArr2 = /* array */[
                                              0.0,
                                              0.5,
                                              0.0
                                            ];
                                            var state$7 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(match$1[3], colorArr2, state$6);
                                            DirectorTool$Wonderjs.runWithDefaultTime(state$7);
                                            return Sinon.toCalledWith(/* array */[0].concat(colorArr2), Wonder_jest.Expect[/* expect */0](uniform3f));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("clear lastSendGeometryData", (function (param) {
                      return Wonder_jest.describe("test create gameObject after dispose one", (function (param) {
                                    var _prepareForElementArrayBuffer = function (state) {
                                      var bindBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bindBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                                      var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                      return /* tuple */[
                                              state$2,
                                              bindBuffer,
                                              1
                                            ];
                                    };
                                    return Wonder_jest.test("should bind new one's index buffer", (function (param) {
                                                  var match = _prepare(state[0]);
                                                  var match$1 = _prepareForElementArrayBuffer(match[0]);
                                                  var element_array_buffer = match$1[2];
                                                  var bindBuffer = match$1[1];
                                                  var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(match$1[0]);
                                                  var state$2 = GameObjectTool$Wonderjs.disposeGameObject(match[1], state$1);
                                                  var match$2 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state$2);
                                                  var state$3 = GameObjectAPI$Wonderjs.initGameObject(match$2[1], match$2[0]);
                                                  var bindElementArrayBufferCallCountAfterFirstRender = Sinon.getCallCount(Sinon.withOneArg(element_array_buffer, bindBuffer));
                                                  DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                                                  var bindElementArrayBufferCallCountAfterSecondRender = Sinon.getCallCount(Sinon.withOneArg(element_array_buffer, bindBuffer));
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](bindElementArrayBufferCallCountAfterSecondRender), (bindElementArrayBufferCallCountAfterFirstRender << 1));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
