

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ABBufferViewUtils$Wonderjs from "../../../../../src/asset_bundle/all/utils/ABBufferViewUtils.js";
import * as GenerateSingleRABTool$Wonderjs from "../tool/GenerateSingleRABTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as GenerateSingleRABSystem$Wonderjs from "../../../../../src/asset_bundle/single/rab/generate/GenerateSingleRABSystem.js";
import * as ImmutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

Wonder_jest.describe("generate single rab", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return GenerateSingleRABTool$Wonderjs.prepare(sandbox[0]);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test images", (function (param) {
                Wonder_jest.test("test from basic source texture", (function (param) {
                        var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, undefined, undefined, /* () */0);
                        var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                        var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], "texture1", undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                        var resourceData = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                        var rab = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData, match[0]);
                        var content = GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* getResourceAssetBundleContent */0](rab);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](content[/* images */2]), /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1[/* name */1], image1[/* mimeType */2], 0, /* () */0)]);
                      }));
                return Wonder_jest.test("test from cubemap texture", (function (param) {
                              var match = GenerateSingleRABTool$Wonderjs.Test[/* createCubemapTextureResourceData */1](state[0], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              var match$1 = match[3];
                              var match$2 = match$1[1];
                              var image6 = match$2[5];
                              var image5 = match$2[4];
                              var image4 = match$2[3];
                              var image3 = match$2[2];
                              var image2 = match$2[1];
                              var image1 = match$2[0];
                              var resourceData = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, match$1[0], /* () */0);
                              var rab = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData, match[0]);
                              var content = GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* getResourceAssetBundleContent */0](rab);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](content[/* images */2]), /* array */[
                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1[/* name */1], image1[/* mimeType */2], 0, /* () */0),
                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image2[/* name */1], image2[/* mimeType */2], 1, /* () */0),
                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image3[/* name */1], image3[/* mimeType */2], 2, /* () */0),
                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image4[/* name */1], image4[/* mimeType */2], 3, /* () */0),
                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image5[/* name */1], image5[/* mimeType */2], 4, /* () */0),
                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image6[/* name */1], image6[/* mimeType */2], 5, /* () */0)
                                        ]);
                            }));
              }));
        Wonder_jest.describe("test lightMaterials and basicSourceTextures", (function (param) {
                Wonder_jest.test("if lightMaterial->maps not contain in resourceData->textures, contract error", (function (param) {
                        var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, undefined, undefined, /* () */0);
                        var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                        var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], "texture1", undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                        var match$1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createLightMaterialResourceData */5](match[0], Caml_option.some(match[1][/* textureComponent */0]), undefined, undefined, "lightMaterial1", /* () */0);
                        var state$1 = match$1[0];
                        var resourceData = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, /* array */[match$1[1]], /* array */[], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                        return Wonder_jest.Expect[/* toThrowMessage */21]("expect lightMaterial->maps contain in resourceData->basicSourceTextures", Wonder_jest.Expect[/* expect */0]((function (param) {
                                          return GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData, state$1);
                                        })));
                      }));
                return Wonder_jest.describe("test basicSourceTexture resource data not contain in lightMaterial resource data", (function (param) {
                              Wonder_jest.test("test lightMaterial has no diffuseMap", (function (param) {
                                      var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, undefined, undefined, /* () */0);
                                      var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                      var texture1Name = "texture1";
                                      var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], texture1Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                                      var lightMaterial1Name = "lightMaterial1";
                                      var match$1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createLightMaterialResourceData */5](match[0], Caml_option.some(undefined), undefined, undefined, lightMaterial1Name, /* () */0);
                                      var resourceData = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, /* array */[match$1[1]], /* array */[match[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                                      var rab = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData, match$1[0]);
                                      var content = GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* getResourceAssetBundleContent */0](rab);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      content[/* basicSourceTextures */0],
                                                      content[/* lightMaterials */4]
                                                    ]), /* tuple */[
                                                  /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildBasicSourceTextureData */2](texture1Name, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)],
                                                  /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildLightMaterialData */4](lightMaterial1Name, Caml_option.some(undefined), undefined, undefined, /* () */0)]
                                                ]);
                                    }));
                              return Wonder_jest.test("test lightMaterial has one diffuseMap", (function (param) {
                                            var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, undefined, undefined, /* () */0);
                                            var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                            var texture1Name = "texture1";
                                            var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], texture1Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                                            var texture2Name = "texture2";
                                            var match$1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](match[0], texture2Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                                            var textureResourceData2 = match$1[1];
                                            var lightMaterial1Name = "lightMaterial1";
                                            var match$2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createLightMaterialResourceData */5](match$1[0], Caml_option.some(textureResourceData2[/* textureComponent */0]), undefined, undefined, lightMaterial1Name, /* () */0);
                                            var resourceData = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, /* array */[match$2[1]], /* array */[
                                                  match[1],
                                                  textureResourceData2
                                                ], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                                            var rab = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData, match$2[0]);
                                            var content = GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* getResourceAssetBundleContent */0](rab);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            content[/* basicSourceTextures */0],
                                                            content[/* lightMaterials */4]
                                                          ]), /* tuple */[
                                                        /* array */[
                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildBasicSourceTextureData */2](texture1Name, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0),
                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildBasicSourceTextureData */2](texture2Name, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)
                                                        ],
                                                        /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildLightMaterialData */4](lightMaterial1Name, 1, undefined, undefined, /* () */0)]
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test cubemapTextures", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              var match = GenerateSingleRABTool$Wonderjs.Test[/* createCubemapTextureResourceData */1](state[0], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              var resourceData = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, match[3][0], /* () */0);
                              var rab = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData, match[0]);
                              var content = GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* getResourceAssetBundleContent */0](rab);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](content[/* cubemapTextures */1]), /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildCubemapTextureData */3](match[2], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, 1, 2, 3, 4, 5, undefined, /* () */0)]);
                            }));
              }));
        return Wonder_jest.describe("test geometrys", (function (param) {
                      return Wonder_jest.test("test", (function (param) {
                                    var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createGeometryResourceData */6](state[0], undefined, undefined, undefined, undefined, Caml_option.some(undefined), Caml_option.some(Caml_option.some(new Uint32Array(/* array */[2]))), /* () */0);
                                    var resourceData = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, /* array */[match[2]], undefined, undefined, undefined, undefined, /* () */0);
                                    var rab = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData, match[0]);
                                    var content = GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* getResourceAssetBundleContent */0](rab);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](content[/* geometrys */5]), /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildGeometryData */5](match[3], /* Index32 */1, 0, ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), 1, /* () */0)]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
