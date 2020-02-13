'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MostTool$Wonderjs = require("../tool/MostTool.js");
var SceneAPI$Wonderjs = require("../../../../../src/api/SceneAPI.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var Copyright$Wonderjs = require("../../../../../src/Copyright.js");
var SkyboxTool$Wonderjs = require("../../job/tool/SkyboxTool.js");
var PrepareABTool$Wonderjs = require("../tool/PrepareABTool.js");
var ABBufferViewUtils$Wonderjs = require("../../../../../src/asset_bundle/all/utils/ABBufferViewUtils.js");
var GenerateAllABTool$Wonderjs = require("../tool/GenerateAllABTool.js");
var CubemapTextureTool$Wonderjs = require("../../../../tool/service/texture/CubemapTextureTool.js");
var GenerateSingleRABTool$Wonderjs = require("../tool/GenerateSingleRABTool.js");
var GenerateSingleSABTool$Wonderjs = require("../tool/GenerateSingleSABTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");
var GenerateSingleRABSystem$Wonderjs = require("../../../../../src/asset_bundle/single/rab/generate/GenerateSingleRABSystem.js");
var GenerateSingleSABSystem$Wonderjs = require("../../../../../src/asset_bundle/single/sab/generate/GenerateSingleSABSystem.js");
var GenerateSceneGraphSystemTool$Wonderjs = require("../../asset/tool/GenerateSceneGraphSystemTool.js");
var ImmutableHashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableHashMapService.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");
var ImmutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableSparseMapService.js");

Wonder_jest.describe("generate new abs from rabs and sabs", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, undefined, /* () */0);
                PrepareABTool$Wonderjs.prepare(sandbox[0]);
                return GenerateAllABTool$Wonderjs.Manifest[/* prepareDigest */4](sandbox[0]);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("remove duplicate buffer data", (function (param) {
                Wonder_jest.describe("remove duplicate buffer data from rab", (function (param) {
                        Wonder_jest.describe("remove duplicate image buffer data", (function (param) {
                                return Wonder_jest.describe("judge duplicate by image name", (function (param) {
                                              Wonder_jest.describe("test image from basicSourceTexture", (function (param) {
                                                      Wonder_jest.testPromise("test with textures", undefined, (function (param) {
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
                                                                            var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getNewRabContents */4](data);
                                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                match[0][/* images */2],
                                                                                                match[1][/* images */2]
                                                                                              ]), /* tuple */[
                                                                                            /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1[/* name */1], image1[/* mimeType */2], 0, /* () */0)],
                                                                                            /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image2[/* name */1], image2[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0)]
                                                                                          ]));
                                                                          }), GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateAllAB */2](/* tuple */[
                                                                              rab1,
                                                                              rab2
                                                                            ], state$2));
                                                            }));
                                                      return Wonder_jest.testPromise("test with lightMaterials", undefined, (function (param) {
                                                                    var imageName = "image1";
                                                                    var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, imageName, undefined, /* () */0);
                                                                    var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                                                    var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                                                                    var textureResourceData1 = match[1];
                                                                    var match$1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createLightMaterialResourceData */5](match[0], Caml_option.some(textureResourceData1[/* textureComponent */0]), undefined, undefined, "lightMaterial1", /* () */0);
                                                                    var state$1 = match$1[0];
                                                                    var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, /* array */[match$1[1]], /* array */[textureResourceData1], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                                                                    var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                                                    var image2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, imageName, undefined, /* () */0);
                                                                    ImmutableSparseMapService$WonderCommonlib.set(0, image2, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                                                    var match$2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state$1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                                                                    var state$2 = match$2[0];
                                                                    var resourceData2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, /* array */[match$2[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                                                                    var rab2 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData2, state$2);
                                                                    return MostTool$Wonderjs.testStream((function (data) {
                                                                                  var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getNewRabContents */4](data);
                                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                      match[0][/* images */2],
                                                                                                      match[1][/* images */2]
                                                                                                    ]), /* tuple */[
                                                                                                  /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1[/* name */1], image1[/* mimeType */2], 0, /* () */0)],
                                                                                                  /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image2[/* name */1], image2[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0)]
                                                                                                ]));
                                                                                }), GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateAllAB */2](/* tuple */[
                                                                                    rab1,
                                                                                    rab2
                                                                                  ], state$2));
                                                                  }));
                                                    }));
                                              return Wonder_jest.describe("test image from cubemapTexture", (function (param) {
                                                            return Wonder_jest.testPromise("test with cubemapTextures", undefined, (function (param) {
                                                                          var image1Name = "i1";
                                                                          var image2Name = "i2";
                                                                          var image3Name = "i3";
                                                                          var image4Name = "i4";
                                                                          var image5Name = "i5";
                                                                          var image6Name = "i6";
                                                                          var match = GenerateSingleRABTool$Wonderjs.Test[/* createCubemapTextureResourceData */1](state[0], image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                          var match$1 = match[3];
                                                                          var match$2 = match$1[1];
                                                                          var image1_6 = match$2[5];
                                                                          var image1_5 = match$2[4];
                                                                          var image1_4 = match$2[3];
                                                                          var image1_3 = match$2[2];
                                                                          var image1_2 = match$2[1];
                                                                          var image1_1 = match$2[0];
                                                                          var state$1 = match[0];
                                                                          var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, match$1[0], /* () */0);
                                                                          var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                                                          var match$3 = GenerateSingleRABTool$Wonderjs.Test[/* createCubemapTextureResourceData */1](state$1, image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                          var match$4 = match$3[3];
                                                                          var match$5 = match$4[1];
                                                                          var image2_6 = match$5[5];
                                                                          var image2_5 = match$5[4];
                                                                          var image2_4 = match$5[3];
                                                                          var image2_3 = match$5[2];
                                                                          var image2_2 = match$5[1];
                                                                          var image2_1 = match$5[0];
                                                                          var state$2 = match$3[0];
                                                                          var resourceData2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match$3[1]], undefined, undefined, undefined, undefined, match$4[0], /* () */0);
                                                                          var rab2 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData2, state$2);
                                                                          return MostTool$Wonderjs.testStream((function (data) {
                                                                                        var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getNewRabContents */4](data);
                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                            match[0][/* images */2],
                                                                                                            match[1][/* images */2]
                                                                                                          ]), /* tuple */[
                                                                                                        /* array */[
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_1[/* name */1], image1_1[/* mimeType */2], 0, /* () */0),
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_2[/* name */1], image1_2[/* mimeType */2], 1, /* () */0),
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_3[/* name */1], image1_3[/* mimeType */2], 2, /* () */0),
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_4[/* name */1], image1_4[/* mimeType */2], 3, /* () */0),
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_5[/* name */1], image1_5[/* mimeType */2], 4, /* () */0),
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_6[/* name */1], image1_6[/* mimeType */2], 5, /* () */0)
                                                                                                        ],
                                                                                                        /* array */[
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image2_1[/* name */1], image2_1[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image2_2[/* name */1], image2_2[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image2_3[/* name */1], image2_3[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image2_4[/* name */1], image2_4[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image2_5[/* name */1], image2_5[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                          GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image2_6[/* name */1], image2_6[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0)
                                                                                                        ]
                                                                                                      ]));
                                                                                      }), GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateAllAB */2](/* tuple */[
                                                                                          rab1,
                                                                                          rab2
                                                                                        ], state$2));
                                                                        }));
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.describe("remove duplicate geometry buffer data", (function (param) {
                                      return Wonder_jest.describe("judge duplicate by geometry name", (function (param) {
                                                    return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                  var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createGeometryResourceData */6](state[0], "geometry1", undefined, undefined, undefined, Caml_option.some(undefined), Caml_option.some(Caml_option.some(new Uint32Array(/* array */[2]))), /* () */0);
                                                                  var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, /* array */[match[2]], undefined, undefined, undefined, undefined, /* () */0);
                                                                  var match$1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createGeometryResourceData */6](match[0], "geometry1", undefined, undefined, undefined, Caml_option.some(undefined), Caml_option.some(Caml_option.some(new Uint32Array(/* array */[2]))), /* () */0);
                                                                  var match$2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* createGeometryResourceData */6](match$1[0], "geometry3", undefined, undefined, undefined, Caml_option.some(undefined), Caml_option.some(Caml_option.some(new Uint32Array(/* array */[3]))), /* () */0);
                                                                  var state$1 = match$2[0];
                                                                  var resourceData2 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, /* array */[
                                                                        match$1[2],
                                                                        match$2[2]
                                                                      ], undefined, undefined, undefined, undefined, /* () */0);
                                                                  var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                                                  var rab2 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData2, state$1);
                                                                  return MostTool$Wonderjs.testStream((function (data) {
                                                                                var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getNewRabContents */4](data);
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                    match[0][/* geometrys */5],
                                                                                                    match[1][/* geometrys */5]
                                                                                                  ]), /* tuple */[
                                                                                                /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildGeometryData */5]("geometry1", /* Index32 */1, 0, ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), 1, /* () */0)],
                                                                                                /* array */[
                                                                                                  GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildGeometryData */5]("geometry1", /* Index32 */1, ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                  GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildGeometryData */5]("geometry3", /* Index32 */1, 0, ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), 1, /* () */0)
                                                                                                ]
                                                                                              ]));
                                                                              }), GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateAllAB */2](/* tuple */[
                                                                                  rab1,
                                                                                  rab2
                                                                                ], state$1));
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("remove duplicate buffer data from sab", (function (param) {
                              Wonder_jest.describe("remove duplicate image buffer data", (function (param) {
                                      return Wonder_jest.describe("judge duplicate by image name", (function (param) {
                                                    Wonder_jest.testPromise("test image from basicSourceTexture", undefined, (function (param) {
                                                            var imageName = "image1";
                                                            var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, imageName, undefined, /* () */0);
                                                            var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                                            var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, /* () */0);
                                                            var state$1 = match[0];
                                                            var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                                                            var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                                            var match$1 = Curry._2(GenerateAllABTool$Wonderjs.TestDuplicateDataForSAB[/* TestDuplicateImageData */0][/* createGameObject1 */0], imageName, state$1);
                                                            var state$2 = SceneAPI$Wonderjs.addSceneChild(match$1[2], match$1[0]);
                                                            GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                                            var sab1 = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(SceneAPI$Wonderjs.getSceneGameObject(state$2), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, state$2);
                                                            return MostTool$Wonderjs.testStream((function (data) {
                                                                          var match = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getNewABContents */4](data);
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              match[0][/* images */2],
                                                                                              match[1][/* images */4]
                                                                                            ]), /* tuple */[
                                                                                          /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1[/* name */1], image1[/* mimeType */2], 0, /* () */0)],
                                                                                          /* array */[GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* buildImageData */1](image1[/* name */1], image1[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0)]
                                                                                        ]));
                                                                        }), GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* generateAllAB */2](/* tuple */[
                                                                            rab1,
                                                                            sab1
                                                                          ], state$2));
                                                          }));
                                                    return Wonder_jest.testPromise("test image from cubemapTexture", undefined, (function (param) {
                                                                  var image1Name = "i1";
                                                                  var image2Name = "i2";
                                                                  var image3Name = "i3";
                                                                  var image4Name = "i4";
                                                                  var image5Name = "i5";
                                                                  var image6Name = "i6";
                                                                  var match = GenerateSingleRABTool$Wonderjs.Test[/* createCubemapTextureResourceData */1](state[0], image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, undefined, undefined, undefined, undefined, undefined, "image/jpeg", undefined, /* () */0);
                                                                  var match$1 = match[3];
                                                                  var match$2 = match$1[1];
                                                                  var image1_6 = match$2[5];
                                                                  var image1_5 = match$2[4];
                                                                  var image1_4 = match$2[3];
                                                                  var image1_3 = match$2[2];
                                                                  var image1_2 = match$2[1];
                                                                  var image1_1 = match$2[0];
                                                                  var state$1 = match[0];
                                                                  var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, match$1[0], /* () */0);
                                                                  var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                                                  var match$3 = SkyboxTool$Wonderjs.prepareCubemapTexture(state$1);
                                                                  var state$2 = CubemapTextureTool$Wonderjs.setAllSources(match$3[0], match$3[1], undefined, undefined, image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, /* () */0);
                                                                  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvasForCubemapTexture(sandbox);
                                                                  var sab1 = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(SceneAPI$Wonderjs.getSceneGameObject(state$2), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, state$2);
                                                                  return MostTool$Wonderjs.testStream((function (data) {
                                                                                var match = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getNewABContents */4](data);
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                    match[0][/* images */2],
                                                                                                    match[1][/* images */4]
                                                                                                  ]), /* tuple */[
                                                                                                /* array */[
                                                                                                  GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_1[/* name */1], image1_1[/* mimeType */2], 0, /* () */0),
                                                                                                  GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_2[/* name */1], image1_2[/* mimeType */2], 1, /* () */0),
                                                                                                  GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_3[/* name */1], image1_3[/* mimeType */2], 2, /* () */0),
                                                                                                  GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_4[/* name */1], image1_4[/* mimeType */2], 3, /* () */0),
                                                                                                  GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_5[/* name */1], image1_5[/* mimeType */2], 4, /* () */0),
                                                                                                  GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildImageData */1](image1_6[/* name */1], image1_6[/* mimeType */2], 5, /* () */0)
                                                                                                ],
                                                                                                /* array */[
                                                                                                  GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* buildImageData */1](image1_1[/* name */1], image1_1[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                  GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* buildImageData */1](image1_2[/* name */1], image1_2[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                  GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* buildImageData */1](image1_3[/* name */1], image1_3[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                  GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* buildImageData */1](image1_4[/* name */1], image1_4[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                  GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* buildImageData */1](image1_5[/* name */1], image1_5[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0),
                                                                                                  GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* buildImageData */1](image1_6[/* name */1], image1_6[/* mimeType */2], ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), /* () */0)
                                                                                                ]
                                                                                              ]));
                                                                              }), GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* generateAllAB */2](/* tuple */[
                                                                                  rab1,
                                                                                  sab1
                                                                                ], state$2));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("remove duplicate geometry buffer data", (function (param) {
                                            return Wonder_jest.describe("judge duplicate by geometry name", (function (param) {
                                                          return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                        var geometryName = "geometry1";
                                                                        var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createGeometryResourceData */6](state[0], geometryName, undefined, undefined, undefined, Caml_option.some(undefined), Caml_option.some(Caml_option.some(new Uint32Array(/* array */[2]))), /* () */0);
                                                                        var state$1 = match[0];
                                                                        var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, /* array */[match[2]], undefined, undefined, undefined, undefined, /* () */0);
                                                                        var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                                                        var match$1 = Curry._2(GenerateAllABTool$Wonderjs.TestDuplicateDataForSAB[/* TestDuplicateGeometryData */1][/* createGameObject1 */1], geometryName, state$1);
                                                                        var state$2 = SceneAPI$Wonderjs.addSceneChild(match$1[2], match$1[0]);
                                                                        var sab1 = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(SceneAPI$Wonderjs.getSceneGameObject(state$2), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, state$2);
                                                                        return MostTool$Wonderjs.testStream((function (data) {
                                                                                      var match = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getNewABContents */4](data);
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                          match[0][/* geometrys */5],
                                                                                                          match[1][/* geometrys */18]
                                                                                                        ]), /* tuple */[
                                                                                                      /* array */[GenerateSingleRABTool$Wonderjs.ResourceAssetBundleContent[/* buildGeometryData */5]("geometry1", /* Index32 */1, 0, ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), ABBufferViewUtils$Wonderjs.buildNoneBufferViewIndex(/* () */0), 1, /* () */0)],
                                                                                                      /* array */[GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* buildGeometryData */2](geometryName, ABBufferViewUtils$Wonderjs.buildNoneAccessorIndex(/* () */0), undefined, undefined, ABBufferViewUtils$Wonderjs.buildNoneAccessorIndex(/* () */0), /* () */0)]
                                                                                                    ]));
                                                                                    }), GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* generateAllAB */2](/* tuple */[
                                                                                        rab1,
                                                                                        sab1
                                                                                      ], state$2));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("add manifest data", (function (param) {
                Wonder_jest.describe("rab add manifest data", (function (param) {
                        Wonder_jest.describe("add hashId", (function (param) {
                                return Wonder_jest.testPromise("test", undefined, (function (param) {
                                              var hashIdData = GenerateAllABTool$Wonderjs.Manifest[/* buildHashIdData */0](/* () */0);
                                              GenerateAllABTool$Wonderjs.Manifest[/* stubDigestForGenerateHashId */3](sandbox[0], hashIdData);
                                              var rab1 = GenerateSingleRABTool$Wonderjs.generateOneRAB(state[0]);
                                              return MostTool$Wonderjs.testStream((function (data) {
                                                            var manifest = GenerateAllABTool$Wonderjs.TestWithOneRAB[/* getNewRabManifest */4](data);
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](manifest[/* hashId */0]), GenerateAllABTool$Wonderjs.Manifest[/* getFirstHashId */1](hashIdData)));
                                                          }), GenerateAllABTool$Wonderjs.TestWithOneRAB[/* generateAllAB */2](rab1, state[0]));
                                            }));
                              }));
                        return Wonder_jest.describe("add dependencyRelation", (function (param) {
                                      return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                    var hashIdData = GenerateAllABTool$Wonderjs.Manifest[/* buildHashIdData */0](/* () */0);
                                                    GenerateAllABTool$Wonderjs.Manifest[/* stubDigestForGenerateHashId */3](sandbox[0], hashIdData);
                                                    var rab1 = GenerateSingleRABTool$Wonderjs.generateOneRAB(state[0]);
                                                    var rab2 = GenerateSingleRABTool$Wonderjs.generateOneRAB(state[0]);
                                                    return MostTool$Wonderjs.testStream((function (data) {
                                                                  var match = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getNewRabManifests */5](data);
                                                                  var match$1 = GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* getRabRelativePaths */1](/* () */0);
                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                      match[0][/* dependencyRelation */1],
                                                                                      match[1][/* dependencyRelation */1]
                                                                                    ]), /* tuple */[
                                                                                  /* array */[],
                                                                                  /* array */[match$1[0]]
                                                                                ]));
                                                                }), GenerateAllABTool$Wonderjs.TestWithTwoRAB[/* generateAllAB */2](/* tuple */[
                                                                    rab1,
                                                                    rab2
                                                                  ], state[0]));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("sab add manifest data", (function (param) {
                              Wonder_jest.describe("add hashId", (function (param) {
                                      return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                    var hashIdData = GenerateAllABTool$Wonderjs.Manifest[/* buildHashIdData */0](/* () */0);
                                                    GenerateAllABTool$Wonderjs.Manifest[/* stubDigestForGenerateHashId */3](sandbox[0], hashIdData);
                                                    var rab1 = GenerateSingleRABTool$Wonderjs.generateOneRAB(state[0]);
                                                    var sab1 = GenerateSingleSABTool$Wonderjs.generateOneSAB(state[0]);
                                                    return MostTool$Wonderjs.testStream((function (data) {
                                                                  var match = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getNewRabManifests */5](data);
                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1][/* hashId */0]), GenerateAllABTool$Wonderjs.Manifest[/* getSecondHashId */2](hashIdData)));
                                                                }), GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* generateAllAB */2](/* tuple */[
                                                                    rab1,
                                                                    sab1
                                                                  ], state[0]));
                                                  }));
                                    }));
                              return Wonder_jest.describe("add dependencyRelation", (function (param) {
                                            return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                          var hashIdData = GenerateAllABTool$Wonderjs.Manifest[/* buildHashIdData */0](/* () */0);
                                                          GenerateAllABTool$Wonderjs.Manifest[/* stubDigestForGenerateHashId */3](sandbox[0], hashIdData);
                                                          var rab1 = GenerateSingleRABTool$Wonderjs.generateOneRAB(state[0]);
                                                          var sab1 = GenerateSingleSABTool$Wonderjs.generateOneSAB(state[0]);
                                                          return MostTool$Wonderjs.testStream((function (data) {
                                                                        var match = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getNewRabManifests */5](data);
                                                                        var match$1 = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getABRelativePaths */1](/* () */0);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[1][/* dependencyRelation */1]), /* array */[match$1[0]]));
                                                                      }), GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* generateAllAB */2](/* tuple */[
                                                                          rab1,
                                                                          sab1
                                                                        ], state[0]));
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("generate one wab", (function (param) {
                      return Wonder_jest.describe("test manifest", (function (param) {
                                    Wonder_jest.describe("test version", (function (param) {
                                            return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                          var rab1 = GenerateSingleRABTool$Wonderjs.generateOneRAB(state[0]);
                                                          var sab1 = GenerateSingleSABTool$Wonderjs.generateOneSAB(state[0]);
                                                          return MostTool$Wonderjs.testStream((function (data) {
                                                                        var newWabManifest = GenerateAllABTool$Wonderjs.TestWABWithOneSABAndOneRAB[/* getNewWabManifest */2](data);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](newWabManifest[/* version */0]), Copyright$Wonderjs.getVersion(/* () */0)));
                                                                      }), GenerateAllABTool$Wonderjs.TestWABWithOneSABAndOneRAB[/* generateAllAB */1](/* tuple */[
                                                                          rab1,
                                                                          sab1
                                                                        ], state[0]));
                                                        }));
                                          }));
                                    Wonder_jest.describe("test wholeHashIdMap", (function (param) {
                                            return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                          var hashIdData = GenerateAllABTool$Wonderjs.Manifest[/* buildHashIdData */0](/* () */0);
                                                          GenerateAllABTool$Wonderjs.Manifest[/* stubDigestForGenerateHashId */3](sandbox[0], hashIdData);
                                                          var rab1 = GenerateSingleRABTool$Wonderjs.generateOneRAB(state[0]);
                                                          var sab1 = GenerateSingleSABTool$Wonderjs.generateOneSAB(state[0]);
                                                          return MostTool$Wonderjs.testStream((function (data) {
                                                                        var newWabManifest = GenerateAllABTool$Wonderjs.TestWABWithOneSABAndOneRAB[/* getNewWabManifest */2](data);
                                                                        var match = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getABRelativePaths */1](/* () */0);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](newWabManifest[/* wholeHashIdMap */1]), ImmutableHashMapService$WonderCommonlib.set(match[1], GenerateAllABTool$Wonderjs.Manifest[/* getSecondHashId */2](hashIdData), ImmutableHashMapService$WonderCommonlib.set(match[0], GenerateAllABTool$Wonderjs.Manifest[/* getFirstHashId */1](hashIdData), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0)))));
                                                                      }), GenerateAllABTool$Wonderjs.TestWABWithOneSABAndOneRAB[/* generateAllAB */1](/* tuple */[
                                                                          rab1,
                                                                          sab1
                                                                        ], state[0]));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("test wholeDependencyRelationMap", (function (param) {
                                                  return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                var hashIdData = GenerateAllABTool$Wonderjs.Manifest[/* buildHashIdData */0](/* () */0);
                                                                GenerateAllABTool$Wonderjs.Manifest[/* stubDigestForGenerateHashId */3](sandbox[0], hashIdData);
                                                                var rab1 = GenerateSingleRABTool$Wonderjs.generateOneRAB(state[0]);
                                                                var sab1 = GenerateSingleSABTool$Wonderjs.generateOneSAB(state[0]);
                                                                return MostTool$Wonderjs.testStream((function (data) {
                                                                              var newWabManifest = GenerateAllABTool$Wonderjs.TestWABWithOneSABAndOneRAB[/* getNewWabManifest */2](data);
                                                                              var match = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getABRelativePaths */1](/* () */0);
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](newWabManifest[/* wholeDependencyRelationMap */2]), ImmutableHashMapService$WonderCommonlib.set(match[1], /* array */[match[0]], ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0))));
                                                                            }), GenerateAllABTool$Wonderjs.TestWABWithOneSABAndOneRAB[/* generateAllAB */1](/* tuple */[
                                                                                rab1,
                                                                                sab1
                                                                              ], state[0]));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
