'use strict';

var Fs = require("fs");
var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var GLBTool$Wonderjs = require("./GLBTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var ConvertGLBSystem$Wonderjs = require("../../../../../src/asset/converter/ConvertGLBSystem.js");
var AssembleWholeWDBAPI$Wonderjs = require("../../../../../src/api/asset/AssembleWholeWDBAPI.js");
var GenerateSceneGraphAPI$Wonderjs = require("../../../../../src/api/asset/GenerateSceneGraphAPI.js");
var AssembleWholeWDBSystem$Wonderjs = require("../../../../../src/asset/assemble/AssembleWholeWDBSystem.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");

function _emptyBufferUriData(jsonStr) {
  return jsonStr.replace((/"buffers"\:\[\{"byteLength"\:(\d+),\"uri"\:".+?"/img), "\"buffers\":[{\"byteLength\":$1,\"uri\":\"\"");
}

function _removeSpaces(str) {
  return str.replace((/\s/img), "");
}

function contain(targetJsonStr, json) {
  return Wonder_jest.Expect[/* toContainString */11](_removeSpaces(targetJsonStr))(Wonder_jest.Expect[/* expect */0](_removeSpaces(_emptyBufferUriData(JSON.stringify(json)))));
}

function testGLTFResultByGLB(sandbox, glbFilePath, testFunc, state) {
  var result = /* record */[/* contents */1];
  var buffer = Fs.readFileSync(glbFilePath);
  GLBTool$Wonderjs.prepare(sandbox);
  return Most.forEach((function (data) {
                  result[0] = data;
                  return /* () */0;
                }), AssembleWholeWDBAPI$Wonderjs.assembleWholeGLB(buffer.buffer, true, true, true, true, true, state[0])).then((function () {
                var match = result[0];
                var match$1 = GenerateSceneGraphAPI$Wonderjs.generateGLBData(match[2], SparseMapService$WonderCommonlib.createEmpty(/* () */0), match[0]);
                return Promise.resolve(Curry._1(testFunc, /* tuple */[
                                match$1[0],
                                match$1[1],
                                match$1[2]
                              ]));
              }));
}

function testAssembleResultByGLB(sandbox, glbFilePath, testFunc, state) {
  var result = /* record */[/* contents */1];
  GLBTool$Wonderjs.prepare(sandbox);
  var buffer = Fs.readFileSync(glbFilePath);
  return Most.forEach((function (data) {
                    result[0] = data;
                    return /* () */0;
                  }), AssembleWholeWDBAPI$Wonderjs.assembleWholeGLB(buffer.buffer, true, true, true, true, true, state[0])).then((function () {
                  var match = result[0];
                  return Promise.resolve(GenerateSceneGraphAPI$Wonderjs.generateWDB(match[2], SparseMapService$WonderCommonlib.createEmpty(/* () */0), match[0]));
                })).then((function (param) {
                return Most.forEach((function (data) {
                                result[0] = data;
                                return /* () */0;
                              }), AssembleWholeWDBSystem$Wonderjs.assemble(param[2], /* tuple */[
                                  true,
                                  true,
                                  true,
                                  true,
                                  true
                                ], param[0])).then((function () {
                              return Promise.resolve(Curry._1(testFunc, result[0]));
                            }));
              }));
}

function testGLTFResultByGLTF(sandbox, embeddedGLTFJsonStr, targetJsonStr, state, $staropt$star, _) {
  var binBuffer = $staropt$star !== undefined ? Js_primitive.valFromOption($staropt$star) : GLBTool$Wonderjs.buildBinBuffer(/* () */0);
  var result = /* record */[/* contents */1];
  GLBTool$Wonderjs.prepare(sandbox);
  return Most.forEach((function (data) {
                  result[0] = data;
                  return /* () */0;
                }), AssembleWholeWDBSystem$Wonderjs.assemble(ConvertGLBSystem$Wonderjs.convertGLBData(JSON.parse(embeddedGLTFJsonStr), binBuffer), /* tuple */[
                    true,
                    true,
                    true,
                    true,
                    true
                  ], state[0])).then((function () {
                var match = result[0];
                var match$1 = GenerateSceneGraphAPI$Wonderjs.generateGLBData(match[2], SparseMapService$WonderCommonlib.createEmpty(/* () */0), match[0]);
                return Promise.resolve(contain(targetJsonStr, match$1[0]));
              }));
}

function testGLTFResultByGameObject(rootGameObject, targetJsonStr, state) {
  var match = GenerateSceneGraphAPI$Wonderjs.generateGLBData(rootGameObject, SparseMapService$WonderCommonlib.createEmpty(/* () */0), state);
  return contain(targetJsonStr, match[0]);
}

function testGLTFResultByGameObjectWithImageUint8ArrayDataMap(rootGameObject, targetJsonStr, imageUint8ArrayDataMap, state) {
  var match = GenerateSceneGraphAPI$Wonderjs.generateGLBData(rootGameObject, imageUint8ArrayDataMap, state);
  return contain(targetJsonStr, match[0]);
}

function testAssembleResultByGameObject(sandbox, rootGameObject, testFunc, state) {
  GLBTool$Wonderjs.prepare(sandbox);
  var result = /* record */[/* contents */1];
  var match = GenerateSceneGraphAPI$Wonderjs.generateWDB(rootGameObject, SparseMapService$WonderCommonlib.createEmpty(/* () */0), state);
  return Most.forEach((function (data) {
                  result[0] = data;
                  return /* () */0;
                }), AssembleWholeWDBSystem$Wonderjs.assemble(match[2], /* tuple */[
                    true,
                    true,
                    true,
                    true,
                    true
                  ], match[0])).then((function () {
                return Promise.resolve(Curry._1(testFunc, result[0]));
              }));
}

function _buildFakeContext(sandbox) {
  return {
          drawImage: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
        };
}

function _buildFakeCanvas(sandbox, context, param) {
  var toDataURL = Sinon.returns(param[1], Sinon.onCall(1, Sinon.returns(param[0], Sinon.onCall(0, Sinon.createEmptyStubWithJsObjSandbox(sandbox)))));
  return {
          width: 0,
          height: 0,
          style: {
            left: "",
            top: "",
            width: "",
            height: "",
            position: "static"
          },
          getContext: Sinon.returns(context, Sinon.createEmptyStubWithJsObjSandbox(sandbox)),
          toDataURL: toDataURL
        };
}

function buildBase64Str1() {
  return "data:image/png;base64,aaa";
}

function buildBase64Str2() {
  return "data:image/png;base64,bbb";
}

function prepareCanvas(sandbox) {
  var context = _buildFakeContext(sandbox);
  var base64Str1 = "data:image/png;base64,aaa";
  var base64Str2 = "data:image/png;base64,bbb";
  var canvas = SettingTool$Wonderjs.buildFakeCanvasForNotPassCanvasIdWithCanvas(sandbox, _buildFakeCanvas(sandbox, context, /* tuple */[
            base64Str1,
            base64Str2
          ]));
  return /* tuple */[
          canvas,
          context,
          /* tuple */[
            base64Str1,
            base64Str2
          ]
        ];
}

exports._emptyBufferUriData = _emptyBufferUriData;
exports._removeSpaces = _removeSpaces;
exports.contain = contain;
exports.testGLTFResultByGLB = testGLTFResultByGLB;
exports.testAssembleResultByGLB = testAssembleResultByGLB;
exports.testGLTFResultByGLTF = testGLTFResultByGLTF;
exports.testGLTFResultByGameObject = testGLTFResultByGameObject;
exports.testGLTFResultByGameObjectWithImageUint8ArrayDataMap = testGLTFResultByGameObjectWithImageUint8ArrayDataMap;
exports.testAssembleResultByGameObject = testAssembleResultByGameObject;
exports._buildFakeContext = _buildFakeContext;
exports._buildFakeCanvas = _buildFakeCanvas;
exports.buildBase64Str1 = buildBase64Str1;
exports.buildBase64Str2 = buildBase64Str2;
exports.prepareCanvas = prepareCanvas;
/* fs Not a pure module */
