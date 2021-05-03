'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../TestTool.js");
var FakeGlTool$Wonderjs = require("../../../gl/FakeGlTool.js");
var DirectorTool$Wonderjs = require("../../../core/DirectorTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var BoxGeometryTool$Wonderjs = require("../../../service/geometry/BoxGeometryTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../src/api/MeshRendererAPI.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../src/api/material/BasicMaterialAPI.js");
var GLSLLocationTool$Wonderjs = require("../../../service/location/GLSLLocationTool.js");
var PregetGLSLDataTool$Wonderjs = require("./PregetGLSLDataTool.js");

function initWithJobConfig(sandbox, noWorkerJobRecord) {
  return DirectorTool$Wonderjs.prepare(TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, noWorkerJobRecord, undefined, undefined, /* () */0));
}

function initWithJobConfigAndBufferConfig(sandbox, noWorkerJobRecord, buffer) {
  return DirectorTool$Wonderjs.prepare(TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, buffer, noWorkerJobRecord, undefined, undefined, /* () */0));
}

function initWithJobConfigWithoutBuildFakeDom(sandbox, noWorkerJobRecord) {
  return DirectorTool$Wonderjs.prepare(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, undefined, noWorkerJobRecord, undefined, /* () */0));
}

function initWithJobConfigAndBufferConfigWithoutBuildFakeDom(sandbox, noWorkerJobRecord, buffer) {
  return DirectorTool$Wonderjs.prepare(TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, buffer, noWorkerJobRecord, undefined, /* () */0));
}

function prepareGameObject(sandbox, state) {
  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
  var material = match[1];
  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
  var geometry = match$1[1];
  var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
  var meshRenderer = match$2[1];
  var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
  var gameObject = match$3[1];
  var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$3[0])));
  return /* tuple */[
          state$1,
          gameObject,
          geometry,
          material,
          meshRenderer
        ];
}

function init(state) {
  return DirectorTool$Wonderjs.init(PregetGLSLDataTool$Wonderjs.preparePrecision(state));
}

function passGl(sandbox, state) {
  return FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
}

function buildConfigData($staropt$star, $staropt$star$1, param) {
  var flags = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : undefined;
  var shader = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : undefined;
  return /* tuple */[
          flags,
          shader
        ];
}

function prepareForUseProgramCase(sandbox, prepareFunc, state) {
  var state$1 = Curry._2(prepareFunc, sandbox, state);
  var createProgram = Sinon.returns(1, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
  var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(useProgram), undefined, /* () */0), state$1);
  return /* tuple */[
          state$2,
          1,
          useProgram
        ];
}

function testSendShaderUniformDataOnlyOnce(sandbox, name, param, state) {
  var prepareGameObject = param[2];
  var setFakeGlFunc = param[1];
  var prepareSendUinformDataFunc = param[0];
  return Wonder_jest.test("send shader uniform record only once", (function (param) {
                var match = Curry._3(prepareSendUinformDataFunc, sandbox, prepareGameObject, state[0]);
                var match$1 = Curry._2(prepareGameObject, sandbox, match[0]);
                var uniformDataStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, name);
                var state$1 = Curry._3(setFakeGlFunc, uniformDataStub, getUniformLocation, match$1[0]);
                DirectorTool$Wonderjs.runWithDefaultTime(DirectorTool$Wonderjs.init(PregetGLSLDataTool$Wonderjs.preparePrecision(state$1)));
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, uniformDataStub))), 1);
              }));
}

function testSendShaderUniformMatrix4DataOnlyOnce(sandbox, name, param, state) {
  return testSendShaderUniformDataOnlyOnce(sandbox, name, /* tuple */[
              param[0],
              (function (stub, getUniformLocation, state) {
                  return FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(stub), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                }),
              param[1]
            ], state);
}

function testSendShaderUniformMatrix3DataOnlyOnce(sandbox, name, param, state) {
  return testSendShaderUniformDataOnlyOnce(sandbox, name, /* tuple */[
              param[0],
              (function (stub, getUniformLocation, state) {
                  return FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(stub), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                }),
              param[1]
            ], state);
}

function testSendShaderUniformVec3DataOnlyOnce(sandbox, name, param, state) {
  return testSendShaderUniformDataOnlyOnce(sandbox, name, /* tuple */[
              param[0],
              (function (stub, getUniformLocation, state) {
                  return FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(stub), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state);
                }),
              param[1]
            ], state);
}

exports.initWithJobConfig = initWithJobConfig;
exports.initWithJobConfigAndBufferConfig = initWithJobConfigAndBufferConfig;
exports.initWithJobConfigWithoutBuildFakeDom = initWithJobConfigWithoutBuildFakeDom;
exports.initWithJobConfigAndBufferConfigWithoutBuildFakeDom = initWithJobConfigAndBufferConfigWithoutBuildFakeDom;
exports.prepareGameObject = prepareGameObject;
exports.init = init;
exports.passGl = passGl;
exports.buildConfigData = buildConfigData;
exports.prepareForUseProgramCase = prepareForUseProgramCase;
exports.testSendShaderUniformDataOnlyOnce = testSendShaderUniformDataOnlyOnce;
exports.testSendShaderUniformMatrix4DataOnlyOnce = testSendShaderUniformMatrix4DataOnlyOnce;
exports.testSendShaderUniformMatrix3DataOnlyOnce = testSendShaderUniformMatrix3DataOnlyOnce;
exports.testSendShaderUniformVec3DataOnlyOnce = testSendShaderUniformVec3DataOnlyOnce;
/* Sinon Not a pure module */
