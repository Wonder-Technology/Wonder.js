'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var JobTool$Wonderjs = require("../job/JobTool.js");
var TestTool$Wonderjs = require("../../TestTool.js");
var PregetGLSLDataJob$Wonderjs = require("../../../../src/job/no_worker/init/PregetGLSLDataJob.js");
var PregetGLSLDataTool$Wonderjs = require("../../job/no_worker/loop/PregetGLSLDataTool.js");
var ShaderIndicesService$Wonderjs = require("../../../../src/service/primitive/material/ShaderIndicesService.js");
var RecordLightMaterialMainService$Wonderjs = require("../../../../src/service/state/main/material/light/RecordLightMaterialMainService.js");

function pregetGLSLData(state) {
  return PregetGLSLDataJob$Wonderjs.execJob(JobTool$Wonderjs.getConfigRecord(/* () */0), PregetGLSLDataTool$Wonderjs.preparePrecision(state));
}

var prepareForInit = pregetGLSLData;

function _testRemoveFromTypeArr(state, param, param$1, param$2, defaultValue, param$3) {
  var setValueFunc = param$3[2];
  var getValueFunc = param$3[1];
  var value2 = param$2[1];
  var material2 = param$1[1];
  var material1 = param[1];
  TestTool$Wonderjs.closeContractCheck(/* () */0);
  var state$1 = Curry._3(setValueFunc, material1, param$2[0], state);
  var state$2 = Curry._3(setValueFunc, material2, value2, state$1);
  var state$3 = Curry._3(param$3[0], param[0], material1, state$2);
  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                  Curry._2(getValueFunc, material1, state$3),
                  Curry._2(getValueFunc, material2, state$3)
                ]), /* tuple */[
              defaultValue,
              value2
            ]);
}

function testRemoveFromTypeArr(state, param, defaultValue, param$1) {
  var createGameObjectFunc = param$1[1];
  var match = Curry._1(createGameObjectFunc, state[0]);
  var match$1 = Curry._1(createGameObjectFunc, match[0]);
  return _testRemoveFromTypeArr(match$1[0], /* tuple */[
              match[1],
              match[2]
            ], /* tuple */[
              match$1[1],
              match$1[2]
            ], /* tuple */[
              param[0],
              param[1]
            ], defaultValue, /* tuple */[
              param$1[0],
              param$1[2],
              param$1[3]
            ]);
}

function testRemoveFromTypeArrWithMap(state, param, defaultValue, param$1) {
  var createGameObjectFunc = param$1[1];
  var match = Curry._1(createGameObjectFunc, state[0]);
  var match$1 = Curry._1(createGameObjectFunc, match[0]);
  return _testRemoveFromTypeArr(match$1[0], /* tuple */[
              match[1],
              match[2][0]
            ], /* tuple */[
              match$1[1],
              match$1[2][0]
            ], /* tuple */[
              param[0],
              param[1]
            ], defaultValue, /* tuple */[
              param$1[0],
              param$1[2],
              param$1[3]
            ]);
}

function getShaderIndex(material, state) {
  var match = RecordLightMaterialMainService$Wonderjs.getRecord(state);
  return ShaderIndicesService$Wonderjs.getShaderIndex(material, match[/* shaderIndices */2]);
}

exports.pregetGLSLData = pregetGLSLData;
exports.prepareForInit = prepareForInit;
exports._testRemoveFromTypeArr = _testRemoveFromTypeArr;
exports.testRemoveFromTypeArr = testRemoveFromTypeArr;
exports.testRemoveFromTypeArrWithMap = testRemoveFromTypeArrWithMap;
exports.getShaderIndex = getShaderIndex;
/* Wonder_jest Not a pure module */
