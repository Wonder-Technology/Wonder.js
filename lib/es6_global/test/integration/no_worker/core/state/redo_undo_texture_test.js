

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as StateAPI$Wonderjs from "../../../../../src/api/StateAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as AllMaterialTool$Wonderjs from "../../../../tool/service/material/AllMaterialTool.js";
import * as DeviceManagerAPI$Wonderjs from "../../../../../src/api/DeviceManagerAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as CubemapTextureTool$Wonderjs from "../../../../tool/service/texture/CubemapTextureTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js";
import * as ArrayBufferViewSourceTextureTool$Wonderjs from "../../../../tool/service/texture/ArrayBufferViewSourceTextureTool.js";

Wonder_jest.describe("test redo,undo texture", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                state[0] = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("deep copy texture record", (function (param) {
                Wonder_jest.describe("deep copy basic source texture record", (function (param) {
                        return Wonder_jest.test("shadow copy sourceMap,glTextureMap, \n                     disposedIndexArray,needAddedSourceArray,needInitedTextureIndexArray\n            materialsMap, needDisposedTextureIndexArray\n            \n                    \n                    ", (function (param) {
                                      return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                    var match = BasicSourceTextureTool$Wonderjs.getRecord(state);
                                                    return /* array */[
                                                            match[/* sourceMap */9],
                                                            match[/* glTextureMap */10],
                                                            match[/* disposedIndexArray */11],
                                                            match[/* needAddedSourceArray */12],
                                                            match[/* needInitedTextureIndexArray */13],
                                                            match[/* materialsMap */16],
                                                            match[/* needDisposedTextureIndexArray */14]
                                                          ];
                                                  }), state[0]);
                                    }));
                      }));
                Wonder_jest.describe("deep copy arrayBufferView source texture record", (function (param) {
                        return Wonder_jest.test("shadow copy sourceMap,glTextureMap, \n                     disposedIndexArray,needAddedSourceArray,needInitedTextureIndexArray, materialsMap, needDisposedTextureIndexArray\n                    \n                    ", (function (param) {
                                      return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                    var match = ArrayBufferViewSourceTextureTool$Wonderjs.getRecord(state);
                                                    return /* array */[
                                                            match[/* sourceMap */11],
                                                            match[/* glTextureMap */12],
                                                            match[/* disposedIndexArray */13],
                                                            match[/* needAddedSourceArray */14],
                                                            match[/* needInitedTextureIndexArray */15],
                                                            match[/* materialsMap */18],
                                                            match[/* needDisposedTextureIndexArray */16]
                                                          ];
                                                  }), state[0]);
                                    }));
                      }));
                return Wonder_jest.describe("deep copy cubemap texture record", (function (param) {
                              return Wonder_jest.test("shadow copy pxSourceMap,nxSourceMap,pySourceMap,nySourceMap, pzSourceMap,nzSourceMap,\n\n          glTextureMap, \n                     disposedIndexArray,\n\n          needAddedPXSourceArray,\n          needAddedNXSourceArray,\n          needAddedPYSourceArray,\n          needAddedNYSourceArray,\n          needAddedPZSourceArray,\n          needAddedNZSourceArray,\n\n          needInitedTextureIndexArray\n            materialsMap, needDisposedTextureIndexArray\n            \n                    \n                    ", (function (param) {
                                            return MainStateTool$Wonderjs.testShadowCopyArrayLikeMapData((function (state) {
                                                          var match = CubemapTextureTool$Wonderjs.getRecord(state);
                                                          return /* array */[
                                                                  match[/* pxSourceMap */20],
                                                                  match[/* nxSourceMap */21],
                                                                  match[/* pySourceMap */22],
                                                                  match[/* nySourceMap */23],
                                                                  match[/* pzSourceMap */24],
                                                                  match[/* nzSourceMap */25],
                                                                  match[/* glTextureMap */26],
                                                                  match[/* disposedIndexArray */27],
                                                                  match[/* needAddedPXSourceArray */28],
                                                                  match[/* needAddedNXSourceArray */29],
                                                                  match[/* needAddedPYSourceArray */30],
                                                                  match[/* needAddedNYSourceArray */31],
                                                                  match[/* needAddedPZSourceArray */32],
                                                                  match[/* needAddedNZSourceArray */33],
                                                                  match[/* needInitedTextureIndexArray */34],
                                                                  match[/* materialsMap */37],
                                                                  match[/* needDisposedTextureIndexArray */35]
                                                                ];
                                                        }), state[0]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("restore texture record to target state", (function (param) {
                Wonder_jest.describe("test restore basic source texture record", (function (param) {
                        var _prepareBasicSourceTextureData = function (state) {
                          var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
                          var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match[0]);
                          var texture2 = match$1[1];
                          var match$2 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(match$1[0]);
                          var state$1 = AllMaterialTool$Wonderjs.prepareForInit(match$2[0]);
                          var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapS(texture2, /* Mirrored_repeat */1, state$1);
                          var state$3 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapT(texture2, /* Mirrored_repeat */1, state$2);
                          var state$4 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(texture2, /* Linear */1, state$3);
                          var state$5 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(texture2, /* Linear */1, state$4);
                          var state$6 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureType(texture2, 1, state$5);
                          var state$7 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFormat(texture2, /* Alpha */2, state$6);
                          return /* tuple */[
                                  state$7,
                                  match[1],
                                  texture2,
                                  match$2[1]
                                ];
                        };
                        return Wonder_jest.test("test restore typeArrays", (function (param) {
                                      state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                      var match = _prepareBasicSourceTextureData(state[0]);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                      var match$1 = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state$1);
                                      var currentState = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapT(match$1[1], /* Mirrored_repeat */1, match$1[0]);
                                      var currentState$1 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState);
                                      MainStateTool$Wonderjs.restore(currentState$1, copiedState);
                                      var defaultWrapS = BasicSourceTextureTool$Wonderjs.getDefaultWrapS(/* () */0);
                                      var defaultWrapT = BasicSourceTextureTool$Wonderjs.getDefaultWrapT(/* () */0);
                                      var defaultMagFilter = BasicSourceTextureTool$Wonderjs.getDefaultMagFilter(/* () */0);
                                      var defaultMinFilter = BasicSourceTextureTool$Wonderjs.getDefaultMinFilter(/* () */0);
                                      var defaultFormat = BasicSourceTextureTool$Wonderjs.getDefaultFormat(/* () */0);
                                      var defaultType = BasicSourceTextureTool$Wonderjs.getDefaultType(/* () */0);
                                      var defaultIsNeedUpdate = BasicSourceTextureTool$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
                                      var match$2 = BasicSourceTextureTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$2[/* wrapSs */1],
                                                      match$2[/* wrapTs */2],
                                                      match$2[/* magFilters */3],
                                                      match$2[/* minFilters */4],
                                                      match$2[/* formats */5],
                                                      match$2[/* types */6],
                                                      match$2[/* isNeedUpdates */7]
                                                    ]), /* tuple */[
                                                  new Uint8Array(/* array */[
                                                        defaultWrapS,
                                                        1,
                                                        defaultWrapS,
                                                        defaultWrapS
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultWrapT,
                                                        1,
                                                        defaultWrapT,
                                                        defaultWrapT
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultMagFilter,
                                                        1,
                                                        defaultMagFilter,
                                                        defaultMagFilter
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultMinFilter,
                                                        1,
                                                        defaultMinFilter,
                                                        defaultMinFilter
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultFormat,
                                                        2,
                                                        defaultFormat,
                                                        defaultFormat
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultType,
                                                        1,
                                                        defaultType,
                                                        defaultType
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultIsNeedUpdate,
                                                        defaultIsNeedUpdate,
                                                        defaultIsNeedUpdate,
                                                        defaultIsNeedUpdate
                                                      ])
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("test restore arrayBufferView source texture record", (function (param) {
                        var _prepareArrayBufferViewSourceTextureData = function (state) {
                          var match = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state);
                          var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match[0]);
                          var texture2 = match$1[1];
                          var match$2 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(match$1[0]);
                          var state$1 = AllMaterialTool$Wonderjs.prepareForInit(match$2[0]);
                          var state$2 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapS(texture2, /* Mirrored_repeat */1, state$1);
                          var state$3 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapT(texture2, /* Mirrored_repeat */1, state$2);
                          var state$4 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMagFilter(texture2, /* Linear */1, state$3);
                          var state$5 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureMinFilter(texture2, /* Linear */1, state$4);
                          var state$6 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureType(texture2, 1, state$5);
                          var state$7 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureFormat(texture2, /* Alpha */2, state$6);
                          var state$8 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWidth(texture2, 2, state$7);
                          var state$9 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureHeight(texture2, 4, state$8);
                          return /* tuple */[
                                  state$9,
                                  match[1],
                                  texture2,
                                  match$2[1]
                                ];
                        };
                        return Wonder_jest.test("test restore typeArrays", (function (param) {
                                      state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 4, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                      var match = _prepareArrayBufferViewSourceTextureData(state[0]);
                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                      var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                      var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state$1);
                                      var currentState = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureWrapT(match$1[1], /* Mirrored_repeat */1, match$1[0]);
                                      var currentState$1 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState);
                                      MainStateTool$Wonderjs.restore(currentState$1, copiedState);
                                      var defaultWrapS = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultWrapS(/* () */0);
                                      var defaultWrapT = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultWrapT(/* () */0);
                                      var defaultMagFilter = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultMagFilter(/* () */0);
                                      var defaultMinFilter = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultMinFilter(/* () */0);
                                      var defaultFormat = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultFormat(/* () */0);
                                      var defaultType = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultType(/* () */0);
                                      var defaultIsNeedUpdate = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
                                      var defaultWidth = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultWidth(/* () */0);
                                      var defaultHeight = ArrayBufferViewSourceTextureTool$Wonderjs.getDefaultHeight(/* () */0);
                                      var match$2 = ArrayBufferViewSourceTextureTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      match$2[/* wrapSs */1],
                                                      match$2[/* wrapTs */2],
                                                      match$2[/* magFilters */3],
                                                      match$2[/* minFilters */4],
                                                      match$2[/* formats */5],
                                                      match$2[/* types */6],
                                                      match$2[/* isNeedUpdates */7],
                                                      match$2[/* widths */9],
                                                      match$2[/* heights */10]
                                                    ]), /* tuple */[
                                                  new Uint8Array(/* array */[
                                                        defaultWrapS,
                                                        1,
                                                        defaultWrapS,
                                                        defaultWrapS
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultWrapT,
                                                        1,
                                                        defaultWrapT,
                                                        defaultWrapT
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultMagFilter,
                                                        1,
                                                        defaultMagFilter,
                                                        defaultMagFilter
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultMinFilter,
                                                        1,
                                                        defaultMinFilter,
                                                        defaultMinFilter
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultFormat,
                                                        2,
                                                        defaultFormat,
                                                        defaultFormat
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultType,
                                                        1,
                                                        defaultType,
                                                        defaultType
                                                      ]),
                                                  new Uint8Array(/* array */[
                                                        defaultIsNeedUpdate,
                                                        defaultIsNeedUpdate,
                                                        defaultIsNeedUpdate,
                                                        defaultIsNeedUpdate
                                                      ]),
                                                  new Uint16Array(/* array */[
                                                        defaultWidth,
                                                        2,
                                                        defaultWidth,
                                                        defaultWidth
                                                      ]),
                                                  new Uint16Array(/* array */[
                                                        defaultHeight,
                                                        4,
                                                        defaultHeight,
                                                        defaultHeight
                                                      ])
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("test restore cubemap texture record", (function (param) {
                              return Wonder_jest.describe("test restore typeArrays", (function (param) {
                                            beforeEach((function () {
                                                    state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 4, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                                    state[0] = AllMaterialTool$Wonderjs.prepareForInit(FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]));
                                                    return /* () */0;
                                                  }));
                                            Wonder_jest.test("test restore wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates, flipYs", (function (param) {
                                                    var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                                    var match$1 = CubemapTextureAPI$Wonderjs.createCubemapTexture(match[0]);
                                                    var texture2 = match$1[1];
                                                    var match$2 = CubemapTextureAPI$Wonderjs.createCubemapTexture(match$1[0]);
                                                    var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureWrapS(texture2, /* Mirrored_repeat */1, match$2[0]);
                                                    var state$2 = CubemapTextureAPI$Wonderjs.setCubemapTextureWrapT(texture2, /* Mirrored_repeat */1, state$1);
                                                    var state$3 = CubemapTextureAPI$Wonderjs.setCubemapTextureMagFilter(texture2, /* Linear */1, state$2);
                                                    var state$4 = CubemapTextureAPI$Wonderjs.setCubemapTextureMinFilter(texture2, /* Linear */1, state$3);
                                                    var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$4);
                                                    var match$3 = CubemapTextureAPI$Wonderjs.createCubemapTexture(state$4);
                                                    var texture4 = match$3[1];
                                                    var currentState = CubemapTextureAPI$Wonderjs.setCubemapTextureWrapT(texture4, /* Mirrored_repeat */1, match$3[0]);
                                                    var currentState$1 = CubemapTextureAPI$Wonderjs.setCubemapTextureMagFilter(texture4, /* Linear_mipmap_linear */5, currentState);
                                                    var currentState$2 = CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(texture4, true, currentState$1);
                                                    var currentState$3 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState$2);
                                                    MainStateTool$Wonderjs.restore(currentState$3, copiedState);
                                                    var defaultWrapS = CubemapTextureTool$Wonderjs.getDefaultWrapS(/* () */0);
                                                    var defaultWrapT = CubemapTextureTool$Wonderjs.getDefaultWrapT(/* () */0);
                                                    var defaultMagFilter = CubemapTextureTool$Wonderjs.getDefaultMagFilter(/* () */0);
                                                    var defaultMinFilter = CubemapTextureTool$Wonderjs.getDefaultMinFilter(/* () */0);
                                                    var defaultIsNeedUpdate = CubemapTextureTool$Wonderjs.getDefaultIsNeedUpdate(/* () */0);
                                                    var defaultFlipY = CubemapTextureTool$Wonderjs.getDefaultFlipY(/* () */0);
                                                    var match$4 = CubemapTextureTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    match$4[/* wrapSs */2],
                                                                    match$4[/* wrapTs */3],
                                                                    match$4[/* magFilters */4],
                                                                    match$4[/* minFilters */5],
                                                                    match$4[/* isNeedUpdates */18],
                                                                    match$4[/* flipYs */19]
                                                                  ]), /* tuple */[
                                                                new Uint8Array(/* array */[
                                                                      defaultWrapS,
                                                                      1,
                                                                      defaultWrapS,
                                                                      defaultWrapS
                                                                    ]),
                                                                new Uint8Array(/* array */[
                                                                      defaultWrapT,
                                                                      1,
                                                                      defaultWrapT,
                                                                      defaultWrapT
                                                                    ]),
                                                                new Uint8Array(/* array */[
                                                                      defaultMagFilter,
                                                                      1,
                                                                      defaultMagFilter,
                                                                      defaultMagFilter
                                                                    ]),
                                                                new Uint8Array(/* array */[
                                                                      defaultMinFilter,
                                                                      1,
                                                                      defaultMinFilter,
                                                                      defaultMinFilter
                                                                    ]),
                                                                new Uint8Array(/* array */[
                                                                      defaultIsNeedUpdate,
                                                                      defaultIsNeedUpdate,
                                                                      defaultIsNeedUpdate,
                                                                      defaultIsNeedUpdate
                                                                    ]),
                                                                new Uint8Array(/* array */[
                                                                      defaultFlipY,
                                                                      defaultFlipY,
                                                                      defaultFlipY,
                                                                      defaultFlipY
                                                                    ])
                                                              ]);
                                                  }));
                                            return Wonder_jest.test("test restore formats and types", (function (param) {
                                                          var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                                          var match$1 = CubemapTextureAPI$Wonderjs.createCubemapTexture(match[0]);
                                                          var texture2 = match$1[1];
                                                          var match$2 = CubemapTextureAPI$Wonderjs.createCubemapTexture(match$1[0]);
                                                          var state$1 = CubemapTextureAPI$Wonderjs.setCubemapTexturePXFormat(texture2, /* Rgbas3tcdxt3 */7, match$2[0]);
                                                          var state$2 = CubemapTextureAPI$Wonderjs.setCubemapTexturePYFormat(texture2, /* LuminanceAlpha */4, state$1);
                                                          var state$3 = CubemapTextureAPI$Wonderjs.setCubemapTextureNZFormat(texture2, /* Rgbs3tcdxt1 */5, state$2);
                                                          var state$4 = CubemapTextureAPI$Wonderjs.setCubemapTexturePXType(texture2, 1, state$3);
                                                          var state$5 = CubemapTextureAPI$Wonderjs.setCubemapTexturePYType(texture2, 2, state$4);
                                                          var state$6 = CubemapTextureAPI$Wonderjs.setCubemapTextureNZType(texture2, 1, state$5);
                                                          var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$6);
                                                          var match$3 = CubemapTextureAPI$Wonderjs.createCubemapTexture(state$6);
                                                          var texture4 = match$3[1];
                                                          var currentState = CubemapTextureAPI$Wonderjs.setCubemapTexturePZFormat(texture4, /* Alpha */2, match$3[0]);
                                                          var currentState$1 = CubemapTextureAPI$Wonderjs.setCubemapTexturePZType(texture4, 2, currentState);
                                                          var currentState$2 = AllMaterialTool$Wonderjs.pregetGLSLData(currentState$1);
                                                          MainStateTool$Wonderjs.restore(currentState$2, copiedState);
                                                          var defaultFormat = CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0);
                                                          var defaultType = CubemapTextureTool$Wonderjs.getDefaultType(/* () */0);
                                                          var match$4 = CubemapTextureTool$Wonderjs.getRecord(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          match$4[/* pxFormats */6],
                                                                          match$4[/* pyFormats */8],
                                                                          match$4[/* nzFormats */11],
                                                                          match$4[/* pxTypes */12],
                                                                          match$4[/* pyTypes */14],
                                                                          match$4[/* nzTypes */17]
                                                                        ]), /* tuple */[
                                                                      new Uint8Array(/* array */[
                                                                            defaultFormat,
                                                                            /* Rgbas3tcdxt3 */7,
                                                                            defaultFormat,
                                                                            defaultFormat
                                                                          ]),
                                                                      new Uint8Array(/* array */[
                                                                            defaultFormat,
                                                                            /* LuminanceAlpha */4,
                                                                            defaultFormat,
                                                                            defaultFormat
                                                                          ]),
                                                                      new Uint8Array(/* array */[
                                                                            defaultFormat,
                                                                            /* Rgbs3tcdxt1 */5,
                                                                            defaultFormat,
                                                                            defaultFormat
                                                                          ]),
                                                                      new Uint8Array(/* array */[
                                                                            defaultType,
                                                                            1,
                                                                            defaultType,
                                                                            defaultType
                                                                          ]),
                                                                      new Uint8Array(/* array */[
                                                                            defaultType,
                                                                            2,
                                                                            defaultType,
                                                                            defaultType
                                                                          ]),
                                                                      new Uint8Array(/* array */[
                                                                            defaultType,
                                                                            1,
                                                                            defaultType,
                                                                            defaultType
                                                                          ])
                                                                    ]);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test basic source texture", (function (param) {
                return Wonder_jest.describe("\n    create texture t1;\n    set t1->glTexture to g1;\n    copy state to s1;\n    dispose t1;\n    restore state to s1;\n    ", (function (param) {
                              var _prepareAndExec = function (state) {
                                var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state[0]);
                                var texture = match[1];
                                var state$1 = BasicSourceTextureTool$Wonderjs.setGlTexture(texture, 2, match[0]);
                                var copiedState = StateAPI$Wonderjs.deepCopyForRestore(state$1);
                                var state$2 = BasicSourceTextureAPI$Wonderjs.disposeBasicSourceTexture(texture, false, state$1);
                                var restoredState = MainStateTool$Wonderjs.restore(state$2, copiedState);
                                return /* tuple */[
                                        restoredState,
                                        texture,
                                        2
                                      ];
                              };
                              Wonder_jest.test("t1->glTexture should be g1", (function (param) {
                                      var match = _prepareAndExec(state);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureTool$Wonderjs.unsafeGetTexture(match[1], match[0])), match[2]);
                                    }));
                              return Wonder_jest.test("t1->glTexture shouldn't be deleted", (function (param) {
                                            var deleteTexture = DeviceManagerAPI$Wonderjs.unsafeGetGl(state[0]).deleteTexture;
                                            var match = _prepareAndExec(state);
                                            return Sinon.toCalledWith(/* array */[match[2]], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](deleteTexture)));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test array buffer view source texture", (function (param) {
                return Wonder_jest.describe("\n            create material m1;\n    create texture t1, t2;\n    set t1,t2 to be m1->map;\n    set t1->glTexture to g1;\n    set t2->glTexture to g2;\n    copy state to s1;\n    dispose m1;\n    restore state to s1;\n    ", (function (param) {
                              var _prepareAndExec = function (state) {
                                var match = LightMaterialTool$Wonderjs.createMaterialWithArrayBufferViewMap(state[0]);
                                var match$1 = match[2];
                                var specularMap1 = match$1[1];
                                var diffuseMap1 = match$1[0];
                                var state$1 = ArrayBufferViewSourceTextureTool$Wonderjs.setGlTexture(diffuseMap1, 2, match[0]);
                                var state$2 = ArrayBufferViewSourceTextureTool$Wonderjs.setGlTexture(specularMap1, 3, state$1);
                                var copiedState = StateAPI$Wonderjs.deepCopyForRestore(state$2);
                                var state$3 = LightMaterialAPI$Wonderjs.batchDisposeLightMaterial(/* array */[match[1]], state$2);
                                var restoredState = MainStateTool$Wonderjs.restore(state$3, copiedState);
                                return /* tuple */[
                                        restoredState,
                                        diffuseMap1,
                                        specularMap1,
                                        2,
                                        3
                                      ];
                              };
                              beforeEach((function () {
                                      state[0] = AllMaterialTool$Wonderjs.pregetGLSLData(state[0]);
                                      return /* () */0;
                                    }));
                              Wonder_jest.test("t1->glTexture should be g1", (function (param) {
                                      var match = _prepareAndExec(state);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayBufferViewSourceTextureTool$Wonderjs.unsafeGetTexture(match[1], match[0])), match[3]);
                                    }));
                              return Wonder_jest.test("t1->glTexture shouldn't be deleted", (function (param) {
                                            var deleteTexture = DeviceManagerAPI$Wonderjs.unsafeGetGl(state[0]).deleteTexture;
                                            var match = _prepareAndExec(state);
                                            return Sinon.toCalledWith(/* array */[match[3]], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](deleteTexture)));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test cubemap texture", (function (param) {
                      return Wonder_jest.describe("\n    create texture t1;\n    set t1->glTexture to g1;\n    copy state to s1;\n    dispose t1;\n    restore state to s1;\n    ", (function (param) {
                                    var _prepareAndExec = function (state) {
                                      var match = CubemapTextureAPI$Wonderjs.createCubemapTexture(state[0]);
                                      var texture = match[1];
                                      var state$1 = CubemapTextureTool$Wonderjs.setGlTexture(texture, 2, match[0]);
                                      var copiedState = StateAPI$Wonderjs.deepCopyForRestore(state$1);
                                      var state$2 = CubemapTextureAPI$Wonderjs.disposeCubemapTexture(texture, false, state$1);
                                      var restoredState = MainStateTool$Wonderjs.restore(state$2, copiedState);
                                      return /* tuple */[
                                              restoredState,
                                              texture,
                                              2
                                            ];
                                    };
                                    Wonder_jest.test("t1->glTexture should be g1", (function (param) {
                                            var match = _prepareAndExec(state);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureTool$Wonderjs.unsafeGetTexture(match[1], match[0])), match[2]);
                                          }));
                                    return Wonder_jest.test("t1->glTexture shouldn't be deleted", (function (param) {
                                                  var deleteTexture = DeviceManagerAPI$Wonderjs.unsafeGetGl(state[0]).deleteTexture;
                                                  var match = _prepareAndExec(state);
                                                  return Sinon.toCalledWith(/* array */[match[2]], Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](deleteTexture)));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
