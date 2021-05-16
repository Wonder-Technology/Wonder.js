'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLSLTool$Wonderjs = require("../../../render/core/GLSLTool.js");
var FakeGlTool$Wonderjs = require("../../../gl/FakeGlTool.js");
var GLSLLocationTool$Wonderjs = require("../../../service/location/GLSLLocationTool.js");

function testGetLocation(sandbox, name, param, state) {
  var match = Curry._2(param[0], sandbox, state[0]);
  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(undefined, sandbox, name);
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
  Curry._1(param[1], state$1);
  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, name, getUniformLocation)));
}

function testLocationCache(sandbox, name, param, state) {
  var prepareGameObjectFunc = param[0];
  var match = Curry._2(prepareGameObjectFunc, sandbox, state[0]);
  var match$1 = Curry._2(prepareGameObjectFunc, sandbox, match[0]);
  var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(undefined, sandbox, name);
  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
  Curry._1(param[1], state$1);
  return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withTwoArgs(Sinon$1.match.any, name, getUniformLocation)));
}

function testOnlySeGlPositionGlFragColorOnce(sandbox, prepareForJudgeGLSLFunc, state) {
  var match = Curry._2(prepareForJudgeGLSLFunc, sandbox, state[0]);
  var shaderSource = match[1];
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                  GLSLTool$Wonderjs.containSpecifyCount(GLSLTool$Wonderjs.getVsSource(shaderSource), "gl_Position =", 1, /* () */0),
                  GLSLTool$Wonderjs.containSpecifyCount(GLSLTool$Wonderjs.getFsSource(shaderSource), "gl_FragColor =", 1, /* () */0)
                ]), /* tuple */[
              true,
              true
            ]);
}

function testCommonShaderLibGlsl(sandbox, prepareForJudgeGLSLFunc, state) {
  var match = Curry._2(prepareForJudgeGLSLFunc, sandbox, state[0]);
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.containMultiline(GLSLTool$Wonderjs.getVsSource(match[1]), /* :: */[
                      "uniform mat4 u_vMatrix;\n",
                      /* :: */[
                        "uniform mat4 u_pMatrix;\n",
                        /* [] */0
                      ]
                    ])), true);
}

function testVertexShaderLibGlsl(sandbox, prepareForJudgeGLSLFunc, state) {
  var match = Curry._2(prepareForJudgeGLSLFunc, sandbox, state[0]);
  return Wonder_jest.Expect[/* toContainString */11]("attribute vec3 a_position;\n", Wonder_jest.Expect[/* expect */0](GLSLTool$Wonderjs.getVsSource(match[1])));
}

exports.testGetLocation = testGetLocation;
exports.testLocationCache = testLocationCache;
exports.testOnlySeGlPositionGlFragColorOnce = testOnlySeGlPositionGlFragColorOnce;
exports.testCommonShaderLibGlsl = testCommonShaderLibGlsl;
exports.testVertexShaderLibGlsl = testVertexShaderLibGlsl;
/* Sinon Not a pure module */
