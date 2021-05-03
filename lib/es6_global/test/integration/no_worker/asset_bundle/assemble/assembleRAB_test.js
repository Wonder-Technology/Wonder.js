

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$Wonderjs from "../../asset/tool/GLBTool.js";
import * as MostTool$Wonderjs from "../tool/MostTool.js";
import * as StateAPI$Wonderjs from "../../../../../src/api/StateAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ScriptTool$Wonderjs from "../../../../tool/service/script/ScriptTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as PrepareABTool$Wonderjs from "../tool/PrepareABTool.js";
import * as AssembleRABTool$Wonderjs from "../tool/AssembleRABTool.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as SerializeService$Wonderjs from "../../../../../src/service/atom/SerializeService.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as GenerateAllABTool$Wonderjs from "../tool/GenerateAllABTool.js";
import * as ScriptAttributeAPI$Wonderjs from "../../../../../src/api/script/ScriptAttributeAPI.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as GenerateSingleRABTool$Wonderjs from "../tool/GenerateSingleRABTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as GenerateSingleRABSystem$Wonderjs from "../../../../../src/asset_bundle/single/rab/generate/GenerateSingleRABSystem.js";
import * as ImmutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateRABAssetBundleMainService$Wonderjs from "../../../../../src/service/state/main/assetBundle/OperateRABAssetBundleMainService.js";

Wonder_jest.describe("assemble rab", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                PrepareABTool$Wonderjs.prepare(sandbox[0]);
                return GenerateAllABTool$Wonderjs.Manifest[/* prepareDigest */4](sandbox[0]);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("build image data", (function (param) {
                return Wonder_jest.describe("test has duplicate data", (function (param) {
                              Wonder_jest.describe("test image from basicSourceTexture", (function (param) {
                                      return Wonder_jest.testPromise("test1", undefined, (function (param) {
                                                    var imageName = "image1";
                                                    var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, imageName, undefined, /* () */0);
                                                    var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                                    var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                                                    var state$1 = match[0];
                                                    var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                                                    var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                                    var image2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, imageName, undefined, /* () */0);
                                                    var basicSourceTextureImageDataMap$1 = ImmutableSparseMapService$WonderCommonlib.set(0, image2, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                                    var match$1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state$1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                                                    var state$2 = match$1[0];
                                                    var resourceData2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, /* array */[match$1[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap$1, undefined, /* () */0);
                                                    var rab2 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData2, state$2);
                                                    return MostTool$Wonderjs.testStream((function (data) {
                                                                  var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getRabRelativePaths */1](/* () */0);
                                                                  var rab2RelativePath = match[1];
                                                                  return MostTool$Wonderjs.testStream((function (param) {
                                                                                var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OperateRABAssetBundleMainService$Wonderjs.unsafeFindImageByName(rab2RelativePath, imageName, state)), GLBTool$Wonderjs.createFakeImage(imageName, "object_url0", undefined, undefined, /* () */0)));
                                                                              }), AssembleRABTool$Wonderjs.TestWithTwoRABs[/* assemble */0](data));
                                                                }), GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateAllAB */2](/* tuple */[
                                                                    rab1,
                                                                    rab2
                                                                  ], state$2));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test image from cubemapTexture", (function (param) {
                                            return Wonder_jest.testPromise("test1", undefined, (function (param) {
                                                          var image1Name = "i1";
                                                          var image2Name = "i2";
                                                          var image3Name = "i3";
                                                          var image4Name = "i4";
                                                          var image5Name = "i5";
                                                          var image6Name = "i6";
                                                          var match = GenerateSingleRABTool$Wonderjs.Test[/* createCubemapTextureResourceData */1](state[0], image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                          var state$1 = match[0];
                                                          var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, match[3][0], /* () */0);
                                                          var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                                          var match$1 = GenerateSingleRABTool$Wonderjs.Test[/* createCubemapTextureResourceData */1](state$1, image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                          var state$2 = match$1[0];
                                                          var resourceData2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match$1[1]], undefined, undefined, undefined, undefined, match$1[3][0], /* () */0);
                                                          var rab2 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData2, state$2);
                                                          return MostTool$Wonderjs.testStream((function (data) {
                                                                        var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getRabRelativePaths */1](/* () */0);
                                                                        var rab2RelativePath = match[1];
                                                                        return MostTool$Wonderjs.testStream((function (param) {
                                                                                      var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                          OperateRABAssetBundleMainService$Wonderjs.unsafeFindImageByName(rab2RelativePath, image1Name, state),
                                                                                                          OperateRABAssetBundleMainService$Wonderjs.unsafeFindImageByName(rab2RelativePath, image2Name, state),
                                                                                                          OperateRABAssetBundleMainService$Wonderjs.unsafeFindImageByName(rab2RelativePath, image3Name, state),
                                                                                                          OperateRABAssetBundleMainService$Wonderjs.unsafeFindImageByName(rab2RelativePath, image4Name, state),
                                                                                                          OperateRABAssetBundleMainService$Wonderjs.unsafeFindImageByName(rab2RelativePath, image5Name, state),
                                                                                                          OperateRABAssetBundleMainService$Wonderjs.unsafeFindImageByName(rab2RelativePath, image6Name, state)
                                                                                                        ]), /* tuple */[
                                                                                                      GLBTool$Wonderjs.createFakeImage(image1Name, "object_url0", undefined, undefined, /* () */0),
                                                                                                      GLBTool$Wonderjs.createFakeImage(image2Name, "object_url1", undefined, undefined, /* () */0),
                                                                                                      GLBTool$Wonderjs.createFakeImage(image3Name, "object_url2", undefined, undefined, /* () */0),
                                                                                                      GLBTool$Wonderjs.createFakeImage(image4Name, "object_url3", undefined, undefined, /* () */0),
                                                                                                      GLBTool$Wonderjs.createFakeImage(image5Name, "object_url4", undefined, undefined, /* () */0),
                                                                                                      GLBTool$Wonderjs.createFakeImage(image6Name, "object_url5", undefined, undefined, /* () */0)
                                                                                                    ]));
                                                                                    }), AssembleRABTool$Wonderjs.TestWithTwoRABs[/* assemble */0](data));
                                                                      }), GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateAllAB */2](/* tuple */[
                                                                          rab1,
                                                                          rab2
                                                                        ], state$2));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("build basicSourceTexture data", (function (param) {
                Wonder_jest.describe("set source", (function (param) {
                        return Wonder_jest.testPromise("test use image with duplicate data as source", undefined, (function (param) {
                                      var imageName = "image1";
                                      var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, imageName, undefined, /* () */0);
                                      var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                      var texture1Name = "texture1";
                                      var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], texture1Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                                      var state$1 = match[0];
                                      var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                                      var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                      var image2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, imageName, undefined, /* () */0);
                                      var basicSourceTextureImageDataMap$1 = ImmutableSparseMapService$WonderCommonlib.set(0, image2, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                      var texture2Name = "texture2";
                                      var match$1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state$1, texture2Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                                      var state$2 = match$1[0];
                                      var resourceData2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, /* array */[match$1[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap$1, undefined, /* () */0);
                                      var rab2 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData2, state$2);
                                      return MostTool$Wonderjs.testStream((function (data) {
                                                    var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getRabRelativePaths */1](/* () */0);
                                                    var rab2RelativePath = match[1];
                                                    var rab1RelativePath = match[0];
                                                    return MostTool$Wonderjs.testStream((function (param) {
                                                                  var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                  var texture1 = OperateRABAssetBundleMainService$Wonderjs.unsafeFindBasicSourceTextureByName(rab1RelativePath, texture1Name, state);
                                                                  var texture2 = OperateRABAssetBundleMainService$Wonderjs.unsafeFindBasicSourceTextureByName(rab2RelativePath, texture2Name, state);
                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                      BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(texture1, state),
                                                                                      BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(texture2, state)
                                                                                    ]), /* tuple */[
                                                                                  GLBTool$Wonderjs.createFakeImage(imageName, "object_url0", undefined, undefined, /* () */0),
                                                                                  GLBTool$Wonderjs.createFakeImage(imageName, "object_url0", undefined, undefined, /* () */0)
                                                                                ]));
                                                                }), AssembleRABTool$Wonderjs.TestWithTwoRABs[/* assemble */0](data));
                                                  }), GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateAllAB */2](/* tuple */[
                                                      rab1,
                                                      rab2
                                                    ], state$2));
                                    }));
                      }));
                return Wonder_jest.testPromise("test set parameter and name", undefined, (function (param) {
                              var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, "image1", undefined, /* () */0);
                              var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                              var texture1Name = "texture1";
                              var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], texture1Name, /* Nearest */0, /* Nearest_mipmap_nearest */2, /* Mirrored_repeat */1, /* Repeat */2, /* Rgbas3tcdxt1 */6, 0, false, 0, /* () */0);
                              var state$1 = match[0];
                              var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                              var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                              return MostTool$Wonderjs.testStream((function (data) {
                                            var rab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getRabRelativePath */1](/* () */0);
                                            return MostTool$Wonderjs.testStream((function (param) {
                                                          var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                          var texture1 = OperateRABAssetBundleMainService$Wonderjs.unsafeFindBasicSourceTextureByName(rab1RelativePath, texture1Name, state);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName(texture1, state),
                                                                              BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapS(texture1, state),
                                                                              BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapT(texture1, state),
                                                                              BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMagFilter(texture1, state),
                                                                              BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMinFilter(texture1, state),
                                                                              BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFormat(texture1, state),
                                                                              BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureType(texture1, state),
                                                                              BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(texture1, state)
                                                                            ]), /* tuple */[
                                                                          texture1Name,
                                                                          /* Mirrored_repeat */1,
                                                                          /* Repeat */2,
                                                                          /* Nearest */0,
                                                                          /* Nearest_mipmap_nearest */2,
                                                                          /* Rgbas3tcdxt1 */6,
                                                                          0,
                                                                          false
                                                                        ]));
                                                        }), AssembleRABTool$Wonderjs.TestWithOneRAB[/* assemble */0](data));
                                          }), GenerateAllABTool$Wonderjs.TestWithOneRAB[/* generateAllAB */2](rab1, state$1));
                            }));
              }));
        Wonder_jest.describe("build cubemapTexture data", (function (param) {
                return Wonder_jest.describe("set source", (function (param) {
                              return Wonder_jest.testPromise("test use image with duplicate data as source", undefined, (function (param) {
                                            var image1Name = "i1";
                                            var image2Name = "i2";
                                            var image3Name = "i3";
                                            var image4Name = "i4";
                                            var image5Name = "i5";
                                            var image6Name = "i6";
                                            var match = GenerateSingleRABTool$Wonderjs.Test[/* createCubemapTextureResourceData */1](state[0], image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            var texture1Name = match[2];
                                            var state$1 = match[0];
                                            var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, match[3][0], /* () */0);
                                            var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                            var match$1 = GenerateSingleRABTool$Wonderjs.Test[/* createCubemapTextureResourceData */1](state$1, image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            var texture2Name = match$1[2];
                                            var state$2 = match$1[0];
                                            var resourceData2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match$1[1]], undefined, undefined, undefined, undefined, match$1[3][0], /* () */0);
                                            var rab2 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData2, state$2);
                                            return MostTool$Wonderjs.testStream((function (data) {
                                                          var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getRabRelativePaths */1](/* () */0);
                                                          var rab2RelativePath = match[1];
                                                          var rab1RelativePath = match[0];
                                                          return MostTool$Wonderjs.testStream((function (param) {
                                                                        var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                        var texture1 = OperateRABAssetBundleMainService$Wonderjs.unsafeFindCubemapTextureByName(rab1RelativePath, texture1Name, state);
                                                                        var texture2 = OperateRABAssetBundleMainService$Wonderjs.unsafeFindCubemapTextureByName(rab2RelativePath, texture2Name, state);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePXSource(texture1, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNXSource(texture1, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePYSource(texture1, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNYSource(texture1, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePZSource(texture1, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNZSource(texture1, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePXSource(texture2, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNXSource(texture2, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePYSource(texture2, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNYSource(texture2, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePZSource(texture2, state),
                                                                                            CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNZSource(texture2, state)
                                                                                          ]), /* tuple */[
                                                                                        GLBTool$Wonderjs.createFakeImage(image1Name, "object_url0", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image2Name, "object_url1", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image3Name, "object_url2", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image4Name, "object_url3", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image5Name, "object_url4", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image6Name, "object_url5", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image1Name, "object_url0", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image2Name, "object_url1", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image3Name, "object_url2", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image4Name, "object_url3", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image5Name, "object_url4", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage(image6Name, "object_url5", undefined, undefined, /* () */0)
                                                                                      ]));
                                                                      }), AssembleRABTool$Wonderjs.TestWithTwoRABs[/* assemble */0](data));
                                                        }), GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateAllAB */2](/* tuple */[
                                                            rab1,
                                                            rab2
                                                          ], state$2));
                                          }));
                            }));
              }));
        Wonder_jest.testPromise("test set parameter and name", undefined, (function (param) {
                var match = GenerateSingleRABTool$Wonderjs.Test[/* prepareCubemapTextureResourceData */0](undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                var texture1Name = "texture1";
                var match$1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createCubemapTextureResourceData */3](state[0], texture1Name, /* Nearest */0, /* Nearest_mipmap_nearest */2, /* Mirrored_repeat */1, /* Repeat */2, /* Rgbas3tcdxt1 */6, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, false, undefined, /* () */0);
                var state$1 = match$1[0];
                var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match$1[1]], undefined, undefined, undefined, undefined, match[1][0], /* () */0);
                var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                return MostTool$Wonderjs.testStream((function (data) {
                              var rab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getRabRelativePath */1](/* () */0);
                              return MostTool$Wonderjs.testStream((function (param) {
                                            var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                            var texture1 = OperateRABAssetBundleMainService$Wonderjs.unsafeFindCubemapTextureByName(rab1RelativePath, texture1Name, state);
                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureName(texture1, state),
                                                                CubemapTextureAPI$Wonderjs.getCubemapTextureWrapS(texture1, state),
                                                                CubemapTextureAPI$Wonderjs.getCubemapTextureWrapT(texture1, state),
                                                                CubemapTextureAPI$Wonderjs.getCubemapTextureMagFilter(texture1, state),
                                                                CubemapTextureAPI$Wonderjs.getCubemapTextureMinFilter(texture1, state),
                                                                CubemapTextureAPI$Wonderjs.getCubemapTexturePXFormat(texture1, state),
                                                                CubemapTextureAPI$Wonderjs.getCubemapTexturePYType(texture1, state),
                                                                CubemapTextureAPI$Wonderjs.getCubemapTextureFlipY(texture1, state)
                                                              ]), /* tuple */[
                                                            texture1Name,
                                                            /* Mirrored_repeat */1,
                                                            /* Repeat */2,
                                                            /* Nearest */0,
                                                            /* Nearest_mipmap_nearest */2,
                                                            /* Rgbas3tcdxt1 */6,
                                                            0,
                                                            false
                                                          ]));
                                          }), AssembleRABTool$Wonderjs.TestWithOneRAB[/* assemble */0](data));
                            }), GenerateAllABTool$Wonderjs.TestWithOneRAB[/* generateAllAB */2](rab1, state$1));
              }));
        Wonder_jest.describe("build basicMaterial data", (function (param) {
                return Wonder_jest.testPromise("test set name and color", undefined, (function (param) {
                              var name = "bm1";
                              var color = /* array */[
                                0.5,
                                0.5,
                                1
                              ];
                              var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicMaterialResourceData */4](state[0], color, name, /* () */0);
                              var state$1 = match[0];
                              var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](/* array */[match[1]], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                              return MostTool$Wonderjs.testStream((function (data) {
                                            var rab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getRabRelativePath */1](/* () */0);
                                            return MostTool$Wonderjs.testStream((function (param) {
                                                          var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                          var material = OperateRABAssetBundleMainService$Wonderjs.unsafeFindBasicMaterialByName(rab1RelativePath, name, state);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName(material, state),
                                                                              BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state)
                                                                            ]), /* tuple */[
                                                                          name,
                                                                          color
                                                                        ]));
                                                        }), AssembleRABTool$Wonderjs.TestWithOneRAB[/* assemble */0](data));
                                          }), GenerateAllABTool$Wonderjs.TestWithOneRAB[/* generateAllAB */2](rab1, state$1));
                            }));
              }));
        Wonder_jest.describe("build lightMaterial data", (function (param) {
                Wonder_jest.testPromise("test set name and diffuseColor and shininess", undefined, (function (param) {
                        var name = "lm1";
                        var color = /* array */[
                          0.5,
                          0.5,
                          1
                        ];
                        var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createLightMaterialResourceData */5](state[0], undefined, color, 10, name, /* () */0);
                        var state$1 = match[0];
                        var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                        var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                        return MostTool$Wonderjs.testStream((function (data) {
                                      var rab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getRabRelativePath */1](/* () */0);
                                      return MostTool$Wonderjs.testStream((function (param) {
                                                    var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                    var material = OperateRABAssetBundleMainService$Wonderjs.unsafeFindLightMaterialByName(rab1RelativePath, name, state);
                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                        LightMaterialAPI$Wonderjs.unsafeGetLightMaterialName(material, state),
                                                                        LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(material, state),
                                                                        LightMaterialAPI$Wonderjs.getLightMaterialShininess(material, state)
                                                                      ]), /* tuple */[
                                                                    name,
                                                                    color,
                                                                    10
                                                                  ]));
                                                  }), AssembleRABTool$Wonderjs.TestWithOneRAB[/* assemble */0](data));
                                    }), GenerateAllABTool$Wonderjs.TestWithOneRAB[/* generateAllAB */2](rab1, state$1));
                      }));
                return Wonder_jest.testPromise("test set diffuseMap", undefined, (function (param) {
                              var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, "image1", undefined, /* () */0);
                              var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                              var texture1Name = "t1";
                              var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], texture1Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                              var textureResourceData1 = match[1];
                              var lightMaterial1Name = "lightMaterial1";
                              var match$1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createLightMaterialResourceData */5](match[0], Caml_option.some(textureResourceData1[/* textureComponent */0]), undefined, undefined, lightMaterial1Name, /* () */0);
                              var state$1 = match$1[0];
                              var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, /* array */[match$1[1]], /* array */[textureResourceData1], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                              var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                              return MostTool$Wonderjs.testStream((function (data) {
                                            var rab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getRabRelativePath */1](/* () */0);
                                            return MostTool$Wonderjs.testStream((function (param) {
                                                          var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                          var material = OperateRABAssetBundleMainService$Wonderjs.unsafeFindLightMaterialByName(rab1RelativePath, lightMaterial1Name, state);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state)), OperateRABAssetBundleMainService$Wonderjs.unsafeFindBasicSourceTextureByName(rab1RelativePath, texture1Name, state)));
                                                        }), AssembleRABTool$Wonderjs.TestWithOneRAB[/* assemble */0](data));
                                          }), GenerateAllABTool$Wonderjs.TestWithOneRAB[/* generateAllAB */2](rab1, state$1));
                            }));
              }));
        Wonder_jest.describe("build geometry data", (function (param) {
                beforeEach((function () {
                        state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(10, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                        return /* () */0;
                      }));
                return Wonder_jest.describe("test has duplicate data", (function (param) {
                              return Wonder_jest.testPromise("test1", undefined, (function (param) {
                                            var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createGeometryResourceData */6](state[0], "geometry1", Caml_option.some(new Float32Array(/* array */[
                                                          10,
                                                          11,
                                                          12
                                                        ])), undefined, undefined, Caml_option.some(undefined), Caml_option.some(Caml_option.some(new Uint32Array(/* array */[0]))), /* () */0);
                                            var match$1 = match[4];
                                            var indices32_1 = match$1[4];
                                            var normals1 = match$1[2];
                                            var texCoords1 = match$1[1];
                                            var vertices1 = match$1[0];
                                            var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, /* array */[match[2]], undefined, undefined, undefined, undefined, /* () */0);
                                            var match$2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createGeometryResourceData */6](match[0], "geometry1", Caml_option.some(new Float32Array(/* array */[
                                                          5,
                                                          6,
                                                          11
                                                        ])), Caml_option.some(Caml_option.some(new Float32Array(/* array */[
                                                              8,
                                                              1,
                                                              2
                                                            ]))), undefined, Caml_option.some(undefined), Caml_option.some(Caml_option.some(new Uint32Array(/* array */[0]))), /* () */0);
                                            var match$3 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createGeometryResourceData */6](match$2[0], "geometry3", Caml_option.some(new Float32Array(/* array */[
                                                          1,
                                                          2,
                                                          3,
                                                          4,
                                                          5,
                                                          6
                                                        ])), undefined, Caml_option.some(Caml_option.some(new Float32Array(/* array */[
                                                              1.5,
                                                              2,
                                                              0,
                                                              0
                                                            ]))), Caml_option.some(Caml_option.some(new Uint16Array(/* array */[
                                                              1,
                                                              0
                                                            ]))), Caml_option.some(undefined), /* () */0);
                                            var match$4 = match$3[4];
                                            var indices16_3 = match$4[3];
                                            var normals3 = match$4[2];
                                            var texCoords3 = match$4[1];
                                            var vertices3 = match$4[0];
                                            var state$1 = match$3[0];
                                            var resourceData2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, /* array */[
                                                  match$2[2],
                                                  match$3[2]
                                                ], undefined, undefined, undefined, undefined, /* () */0);
                                            var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                            var rab2 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData2, state$1);
                                            return MostTool$Wonderjs.testStream((function (data) {
                                                          var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getRabRelativePaths */1](/* () */0);
                                                          var rab2RelativePath = match[1];
                                                          var rab1RelativePath = match[0];
                                                          return MostTool$Wonderjs.testStream((function (param) {
                                                                        var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                        var geometry1_1 = OperateRABAssetBundleMainService$Wonderjs.unsafeFindGeometryByName(rab1RelativePath, "geometry1", state);
                                                                        var geometry2_2 = OperateRABAssetBundleMainService$Wonderjs.unsafeFindGeometryByName(rab2RelativePath, "geometry1", state);
                                                                        var geometry2_3 = OperateRABAssetBundleMainService$Wonderjs.unsafeFindGeometryByName(rab2RelativePath, "geometry3", state);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                            geometry2_2,
                                                                                            GeometryAPI$Wonderjs.getGeometryVertices(geometry1_1, state),
                                                                                            GeometryAPI$Wonderjs.getGeometryNormals(geometry1_1, state),
                                                                                            GeometryAPI$Wonderjs.getGeometryTexCoords(geometry1_1, state),
                                                                                            GeometryAPI$Wonderjs.hasGeometryIndices16(geometry1_1, state),
                                                                                            GeometryAPI$Wonderjs.getGeometryIndices32(geometry1_1, state),
                                                                                            GeometryAPI$Wonderjs.getGeometryVertices(geometry2_3, state),
                                                                                            GeometryAPI$Wonderjs.getGeometryNormals(geometry2_3, state),
                                                                                            GeometryAPI$Wonderjs.getGeometryTexCoords(geometry2_3, state),
                                                                                            GeometryAPI$Wonderjs.getGeometryIndices16(geometry2_3, state),
                                                                                            GeometryAPI$Wonderjs.hasGeometryIndices32(geometry2_3, state)
                                                                                          ]), /* tuple */[
                                                                                        geometry1_1,
                                                                                        vertices1,
                                                                                        normals1,
                                                                                        texCoords1,
                                                                                        false,
                                                                                        indices32_1,
                                                                                        vertices3,
                                                                                        normals3,
                                                                                        texCoords3,
                                                                                        indices16_3,
                                                                                        false
                                                                                      ]));
                                                                      }), AssembleRABTool$Wonderjs.TestWithTwoRABs[/* assemble */0](data));
                                                        }), GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateAllAB */2](/* tuple */[
                                                            rab1,
                                                            rab2
                                                          ], state$1));
                                          }));
                            }));
              }));
        Wonder_jest.describe("build script event function data", (function (param) {
                return Wonder_jest.testPromise("test", undefined, (function (param) {
                              var scriptEventFunctionData1Name = "s1";
                              var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createScriptEventFunctionDataResourceData */7](state[0], scriptEventFunctionData1Name, undefined, undefined, undefined, /* () */0);
                              var state$1 = match[0];
                              var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, /* () */0);
                              var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                              return MostTool$Wonderjs.testStream((function (data) {
                                            var rab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getRabRelativePath */1](/* () */0);
                                            return MostTool$Wonderjs.testStream((function (param) {
                                                          var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                          var eventFunctionData = OperateRABAssetBundleMainService$Wonderjs.unsafeFindScriptEventFunctionDataByName(rab1RelativePath, scriptEventFunctionData1Name, state);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              SerializeService$Wonderjs.serializeFunction(eventFunctionData[/* init */0]),
                                                                              SerializeService$Wonderjs.serializeFunction(eventFunctionData[/* update */1]),
                                                                              SerializeService$Wonderjs.serializeFunction(eventFunctionData[/* dispose */2])
                                                                            ]), /* tuple */[
                                                                          SerializeService$Wonderjs.serializeFunction(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildInitEventFunc */6](/* () */0)),
                                                                          SerializeService$Wonderjs.serializeFunction(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildUpdateEventFunc */7](/* () */0)),
                                                                          SerializeService$Wonderjs.serializeFunction(ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildSetLocalPositionEventFunc */4](/* () */0))
                                                                        ]));
                                                        }), AssembleRABTool$Wonderjs.TestWithOneRAB[/* assemble */0](data));
                                          }), GenerateAllABTool$Wonderjs.TestWithOneRAB[/* generateAllAB */2](rab1, state$1));
                            }));
              }));
        Wonder_jest.describe("build script attribute", (function (param) {
                return Wonder_jest.testPromise("test", undefined, (function (param) {
                              var scriptAttribute1Name = "s1";
                              var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createScriptAttributeResourceData */8](state[0], scriptAttribute1Name, /* () */0);
                              var state$1 = match[0];
                              var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, undefined, undefined, /* array */[match[1]], undefined, undefined, /* () */0);
                              var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                              return MostTool$Wonderjs.testStream((function (data) {
                                            var rab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getRabRelativePath */1](/* () */0);
                                            return MostTool$Wonderjs.testStream((function (param) {
                                                          var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                          var attribute = OperateRABAssetBundleMainService$Wonderjs.unsafeFindScriptAttributeByName(rab1RelativePath, scriptAttribute1Name, state);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptAttributeAPI$Wonderjs.getScriptAttributeEntries(attribute).length), 2));
                                                        }), AssembleRABTool$Wonderjs.TestWithOneRAB[/* assemble */0](data));
                                          }), GenerateAllABTool$Wonderjs.TestWithOneRAB[/* generateAllAB */2](rab1, state$1));
                            }));
              }));
        return Wonder_jest.describe("mark is assembled", (function (param) {
                      return Wonder_jest.testPromise("test", undefined, (function (param) {
                                    var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state[0]);
                                    return MostTool$Wonderjs.testStream((function (data) {
                                                  var rab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getRabRelativePath */1](/* () */0);
                                                  var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                  var isAssembledBeforeAssemble = OperateRABAssetBundleMainService$Wonderjs.isAssembled(rab1RelativePath, state);
                                                  return MostTool$Wonderjs.testStream((function (param) {
                                                                var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    isAssembledBeforeAssemble,
                                                                                    OperateRABAssetBundleMainService$Wonderjs.isAssembled(rab1RelativePath, state)
                                                                                  ]), /* tuple */[
                                                                                false,
                                                                                true
                                                                              ]));
                                                              }), AssembleRABTool$Wonderjs.TestWithOneRAB[/* assemble */0](data));
                                                }), GenerateAllABTool$Wonderjs.TestWithOneRAB[/* generateAllAB */2](rab1, state[0]));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
