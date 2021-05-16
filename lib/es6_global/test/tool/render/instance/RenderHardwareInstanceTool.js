

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_int32 from "../../../../../../node_modules/bs-platform/lib/es6/caml_int32.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as FakeGlTool$Wonderjs from "../../gl/FakeGlTool.js";
import * as DirectorTool$Wonderjs from "../../core/DirectorTool.js";
import * as GeometryTool$Wonderjs from "../../service/geometry/GeometryTool.js";
import * as InstanceTool$Wonderjs from "../../service/instance/InstanceTool.js";
import * as RenderJobsTool$Wonderjs from "../../job/no_worker/loop/RenderJobsTool.js";
import * as GLSLLocationTool$Wonderjs from "../../service/location/GLSLLocationTool.js";
import * as CreateRenderStateMainService$Wonderjs from "../../../../src/service/state/main/render/CreateRenderStateMainService.js";

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

export {
  testProgram ,
  testAttachBufferToAttribute ,
  testSendShaderUniformData ,
  testDrawElementsInstancedANGLE ,
  
}
/* Sinon Not a pure module */
