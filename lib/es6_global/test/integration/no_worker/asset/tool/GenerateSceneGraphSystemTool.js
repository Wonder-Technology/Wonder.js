

import * as Fs from "fs";
import * as Most from "most";
import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$Wonderjs from "./GLBTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as ConvertGLBSystem$Wonderjs from "../../../../../src/asset/converter/ConvertGLBSystem.js";
import * as AssembleWholeWDBAPI$Wonderjs from "../../../../../src/api/asset/AssembleWholeWDBAPI.js";
import * as GenerateSceneGraphAPI$Wonderjs from "../../../../../src/api/asset/GenerateSceneGraphAPI.js";
import * as AssembleWholeWDBSystem$Wonderjs from "../../../../../src/asset/assemble/AssembleWholeWDBSystem.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _emptyBufferUriData(jsonStr) {
  return jsonStr.replace((/"buffers"\:\[\{"byteLength"\:(\d+),\"uri"\:".+?"/img), "\"buffers\":[{\"byteLength\":$1,\"uri\":\"\"");
}

function _removeSpaces(str) {
  return str.replace((/\s/img), "");
}

function contain(targetJsonStr, json) {
  return Wonder_jest.Expect[/* toContainString */11](_removeSpaces(targetJsonStr), Wonder_jest.Expect[/* expect */0](_removeSpaces(_emptyBufferUriData(JSON.stringify(json)))));
}

function testGLTFResultByGLBWithConfig(sandbox, glbFilePath, testFunc, state, $staropt$star, param) {
  var isBuildCubemapFromSceneSkybox = $staropt$star !== undefined ? $staropt$star : true;
  var result = /* record */[/* contents */1];
  var buffer = Fs.readFileSync(glbFilePath);
  GLBTool$Wonderjs.prepare(sandbox);
  return Most.forEach((function (data) {
                  result[0] = data;
                  return /* () */0;
                }), AssembleWholeWDBAPI$Wonderjs.assembleWholeGLB(buffer.buffer, true, true, true, true, true, state[0])).then((function (param) {
                var match = result[0];
                var match$1 = GenerateSceneGraphAPI$Wonderjs.generateGLBData(match[2][0], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), isBuildCubemapFromSceneSkybox, match[0]);
                return Promise.resolve(Curry._1(testFunc, /* tuple */[
                                match$1[0],
                                match$1[1],
                                match$1[2]
                              ]));
              }));
}

function testGLTFResultByGLB(sandbox, glbFilePath, testFunc, state) {
  return testGLTFResultByGLBWithConfig(sandbox, glbFilePath, testFunc, state, undefined, /* () */0);
}

function testAssembleResultByGLBWithConfig(sandbox, glbFilePath, testFunc, state, $staropt$star, param) {
  var isBuildCubemapFromSceneSkybox = $staropt$star !== undefined ? $staropt$star : true;
  var result = /* record */[/* contents */1];
  GLBTool$Wonderjs.prepare(sandbox);
  var buffer = Fs.readFileSync(glbFilePath);
  return Most.forEach((function (data) {
                    result[0] = data;
                    return /* () */0;
                  }), AssembleWholeWDBAPI$Wonderjs.assembleWholeGLB(buffer.buffer, true, true, true, true, true, state[0])).then((function (param) {
                  var match = result[0];
                  return Promise.resolve(GenerateSceneGraphAPI$Wonderjs.generateWDB(match[2][0], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), isBuildCubemapFromSceneSkybox, match[0]));
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
                                ], param[0])).then((function (param) {
                              return Promise.resolve(Curry._1(testFunc, result[0]));
                            }));
              }));
}

function testAssembleResultByGLB(sandbox, glbFilePath, testFunc, state) {
  return testAssembleResultByGLBWithConfig(sandbox, glbFilePath, testFunc, state, undefined, /* () */0);
}

function testGLTFResultByGLTF(sandbox, embeddedGLTFJsonStr, targetJsonStr, state, $staropt$star, $staropt$star$1, param) {
  var binBuffer = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : GLBTool$Wonderjs.buildBinBuffer(/* () */0);
  var isBuildCubemapFromSceneSkybox = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
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
                  ], state[0])).then((function (param) {
                var match = result[0];
                var match$1 = GenerateSceneGraphAPI$Wonderjs.generateGLBData(match[2][0], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), isBuildCubemapFromSceneSkybox, match[0]);
                return Promise.resolve(contain(targetJsonStr, match$1[0]));
              }));
}

function testGLTFResultByGameObjectWithConfig(rootGameObject, targetJsonStr, state, $staropt$star, param) {
  var isBuildCubemapFromSceneSkybox = $staropt$star !== undefined ? $staropt$star : true;
  var match = GenerateSceneGraphAPI$Wonderjs.generateGLBData(rootGameObject, MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), isBuildCubemapFromSceneSkybox, state);
  return contain(targetJsonStr, match[0]);
}

function testGLTFResultByGameObject(rootGameObject, targetJsonStr, state) {
  return testGLTFResultByGameObjectWithConfig(rootGameObject, targetJsonStr, state, undefined, /* () */0);
}

function testGLTFResultByGameObjectWithImageUint8ArrayDataMapWithConfig(rootGameObject, targetJsonStr, imageUint8ArrayDataMap, state, $staropt$star, param) {
  var isBuildCubemapFromSceneSkybox = $staropt$star !== undefined ? $staropt$star : true;
  var match = GenerateSceneGraphAPI$Wonderjs.generateGLBData(rootGameObject, imageUint8ArrayDataMap, isBuildCubemapFromSceneSkybox, state);
  return contain(targetJsonStr, match[0]);
}

function testGLTFResultByGameObjectWithImageUint8ArrayDataMap(rootGameObject, targetJsonStr, imageUint8ArrayDataMap, state) {
  return testGLTFResultByGameObjectWithImageUint8ArrayDataMapWithConfig(rootGameObject, targetJsonStr, imageUint8ArrayDataMap, state, undefined, /* () */0);
}

function testAssembleResultByGameObjectWithConfig(sandbox, rootGameObject, testFunc, state, $staropt$star, param) {
  var isBuildCubemapFromSceneSkybox = $staropt$star !== undefined ? $staropt$star : true;
  GLBTool$Wonderjs.prepare(sandbox);
  var result = /* record */[/* contents */1];
  var match = GenerateSceneGraphAPI$Wonderjs.generateWDB(rootGameObject, MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), isBuildCubemapFromSceneSkybox, state);
  return Most.forEach((function (data) {
                  result[0] = data;
                  return /* () */0;
                }), AssembleWholeWDBSystem$Wonderjs.assemble(match[2], /* tuple */[
                    true,
                    true,
                    true,
                    true,
                    true
                  ], match[0])).then((function (param) {
                return Promise.resolve(Curry._1(testFunc, result[0]));
              }));
}

function testAssembleResultByGameObject(sandbox, rootGameObject, testFunc, state) {
  return testAssembleResultByGameObjectWithConfig(sandbox, rootGameObject, testFunc, state, undefined, /* () */0);
}

function _buildFakeContext(sandbox) {
  return {
          drawImage: Sinon.createEmptyStubWithJsObjSandbox(sandbox)
        };
}

function _buildToDataURL(sandbox, param) {
  return Sinon.returns(param[1], Sinon.onCall(1, Sinon.returns(param[0], Sinon.onCall(0, Sinon.createEmptyStubWithJsObjSandbox(sandbox)))));
}

function _buildToDataURLForCubemapTexture(sandbox, param) {
  return Sinon.returns(param[6], Sinon.onCall(6, Sinon.returns(param[5], Sinon.onCall(5, Sinon.returns(param[4], Sinon.onCall(4, Sinon.returns(param[3], Sinon.onCall(3, Sinon.returns(param[2], Sinon.onCall(2, Sinon.returns(param[1], Sinon.onCall(1, Sinon.returns(param[0], Sinon.onCall(0, Sinon.createEmptyStubWithJsObjSandbox(sandbox)))))))))))))));
}

function _buildFakeCanvas(sandbox, context, toDataURL) {
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

function buildBase64Str1(param) {
  return "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
}

function buildBase64Str2(param) {
  return "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
}

function buildBase64Str3(param) {
  return "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
}

function buildBase64Str4(param) {
  return "data:image/png;base64,cccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
}

function buildBase64Str5(param) {
  return "data:image/png;base64,cccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccccaaaaaaa";
}

function buildBase64Str6(param) {
  return "data:image/jpeg;base64,cccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccdd";
}

function buildBase64Str7(param) {
  return "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccdd";
}

function prepareCanvas(sandbox) {
  var context = _buildFakeContext(sandbox);
  var base64Str1 = "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  var base64Str2 = "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  var canvas = SettingTool$Wonderjs.buildFakeCanvasForNotPassCanvasIdWithCanvas(sandbox, _buildFakeCanvas(sandbox, context, _buildToDataURL(sandbox, /* tuple */[
                base64Str1,
                base64Str2
              ])));
  return /* tuple */[
          canvas,
          context,
          /* tuple */[
            base64Str1,
            base64Str2
          ]
        ];
}

function prepareCanvasForCubemapTexture(sandbox) {
  var context = _buildFakeContext(sandbox);
  var base64Str1 = "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  var base64Str2 = "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  var base64Str3 = "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  var base64Str4 = "data:image/png;base64,cccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  var base64Str5 = "data:image/png;base64,cccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccccaaaaaaa";
  var base64Str6 = "data:image/jpeg;base64,cccccccccccccccccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccdd";
  var base64Str7 = "data:image/png;base64,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccdd";
  var canvas = SettingTool$Wonderjs.buildFakeCanvasForNotPassCanvasIdWithCanvas(sandbox, _buildFakeCanvas(sandbox, context, _buildToDataURLForCubemapTexture(sandbox, /* tuple */[
                base64Str1,
                base64Str2,
                base64Str3,
                base64Str4,
                base64Str5,
                base64Str6,
                base64Str7
              ])));
  return /* tuple */[
          canvas,
          context,
          /* tuple */[
            base64Str1,
            base64Str2,
            base64Str3,
            base64Str4,
            base64Str5,
            base64Str6,
            base64Str7
          ]
        ];
}

export {
  _emptyBufferUriData ,
  _removeSpaces ,
  contain ,
  testGLTFResultByGLBWithConfig ,
  testGLTFResultByGLB ,
  testAssembleResultByGLBWithConfig ,
  testAssembleResultByGLB ,
  testGLTFResultByGLTF ,
  testGLTFResultByGameObjectWithConfig ,
  testGLTFResultByGameObject ,
  testGLTFResultByGameObjectWithImageUint8ArrayDataMapWithConfig ,
  testGLTFResultByGameObjectWithImageUint8ArrayDataMap ,
  testAssembleResultByGameObjectWithConfig ,
  testAssembleResultByGameObject ,
  _buildFakeContext ,
  _buildToDataURL ,
  _buildToDataURLForCubemapTexture ,
  _buildFakeCanvas ,
  buildBase64Str1 ,
  buildBase64Str2 ,
  buildBase64Str3 ,
  buildBase64Str4 ,
  buildBase64Str5 ,
  buildBase64Str6 ,
  buildBase64Str7 ,
  prepareCanvas ,
  prepareCanvasForCubemapTexture ,
  
}
/* fs Not a pure module */
