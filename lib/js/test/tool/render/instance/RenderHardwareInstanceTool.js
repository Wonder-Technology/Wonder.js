'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var FakeGlTool$Wonderjs = require("../../gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../core/DirectorTool.js");
var GeometryTool$Wonderjs = require("../../service/geometry/GeometryTool.js");
var InstanceTool$Wonderjs = require("../../service/instance/InstanceTool.js");
var RenderJobsTool$Wonderjs = require("../../job/no_worker/loop/RenderJobsTool.js");
var GLSLLocationTool$Wonderjs = require("../../service/location/GLSLLocationTool.js");
var CreateRenderStateMainService$Wonderjs = require("../../../../src/service/state/main/render/CreateRenderStateMainService.js");

function testProgram(sandbox, prepareFunc, state) {
  var _prepareForUseProgram = function (sandbox, state) {
    var match = Curry._2(prepareFunc, sandbox, state);
    var createProgram = Sinon.returns(1, Sinon.onCall(0, Sinon.createEmptyStubWithJsObjSandbox(sandbox)));
    var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(useProgram), undefined, /* () */0), match[0]);
    return /* tuple */[
            state$1,
            1,
            createProgram,
            useProgram
          ];
  };
  Wonder_jest.test("create program and use program only once", (function (param) {
          var match = _prepareForUseProgram(sandbox, state[0]);
          DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(match[2])), 1);
        }));
  return Wonder_jest.test("only use sourceInstance's gameObject's program", (function (param) {
                var match = _prepareForUseProgram(sandbox, state[0]);
                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(match[0]));
                return Sinon.toCalledWith(/* array */[match[1]], Wonder_jest.Expect[/* expect */0](match[3]));
              }));
}

function testAttachBufferToAttribute(sandbox, param, prepareFunc, state) {
  var size = param[2];
  var callIndex = param[1];
  var name = param[0];
  return Wonder_jest.test("test attach buffer to attribute", (function (param) {
                var match = Curry._2(prepareFunc, sandbox, state[0]);
                var vertexAttribPointer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                var getAttribLocation = GLSLLocationTool$Wonderjs.getAttribLocation(0, sandbox, name);
                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getAttribLocation), undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(vertexAttribPointer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                return Sinon.toCalledWith(/* array */[
                            0,
                            size,
                            1,
                            false,
                            0,
                            0
                          ], Wonder_jest.Expect[/* expect */0](Sinon.getCall(callIndex, vertexAttribPointer)));
              }));
}

function testSendShaderUniformData(sandbox, param, state) {
  var createSourceInstanceGameObjectFunc = param[1];
  var prepareFunc = param[0];
  return Wonder_jest.test("send shader uniform record only once per shader", (function (param) {
                var match = Curry._2(prepareFunc, sandbox, state[0]);
                var match$1 = Curry._2(createSourceInstanceGameObjectFunc, sandbox, match[0]);
                var match$2 = RenderJobsTool$Wonderjs.prepareGameObject(sandbox, match$1[0]);
                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(1, sandbox, "u_vMatrix");
                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[0]);
                DirectorTool$Wonderjs.runWithDefaultTime(RenderJobsTool$Wonderjs.init(state$1));
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(1, uniformMatrix4fv))), 2);
              }));
}

function testDrawElementsInstancedANGLE(sandbox, prepareFunc, getIndicesCountFunc, state) {
  return Wonder_jest.test("drawElementsInstancedANGLE", (function (param) {
                var match = Curry._2(prepareFunc, sandbox, state[0]);
                var state$1 = match[0];
                var drawElementsInstancedANGLE = InstanceTool$Wonderjs.getExtensionInstancedArrays(state$1).drawElementsInstancedANGLE;
                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1);
                var state$3 = RenderJobsTool$Wonderjs.init(state$2);
                var state$4 = DirectorTool$Wonderjs.runWithDefaultTime(state$3);
                return Sinon.toCalledWith(/* array */[
                            1,
                            Curry._2(getIndicesCountFunc, match[2][0], CreateRenderStateMainService$Wonderjs.createRenderState(state$4)),
                            GeometryTool$Wonderjs.getIndexType(CreateRenderStateMainService$Wonderjs.createRenderState(state$4)),
                            Caml_int32.imul(GeometryTool$Wonderjs.getIndexTypeSize(CreateRenderStateMainService$Wonderjs.createRenderState(state$4)), 0),
                            2
                          ], Wonder_jest.Expect[/* expect */0](drawElementsInstancedANGLE));
              }));
}

exports.testProgram = testProgram;
exports.testAttachBufferToAttribute = testAttachBufferToAttribute;
exports.testSendShaderUniformData = testSendShaderUniformData;
exports.testDrawElementsInstancedANGLE = testDrawElementsInstancedANGLE;
/* Sinon Not a pure module */
