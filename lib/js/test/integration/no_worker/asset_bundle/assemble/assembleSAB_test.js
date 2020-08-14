'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var GLBTool$Wonderjs = require("../../asset/tool/GLBTool.js");
var MostTool$Wonderjs = require("../tool/MostTool.js");
var SceneAPI$Wonderjs = require("../../../../../src/api/SceneAPI.js");
var StateAPI$Wonderjs = require("../../../../../src/api/StateAPI.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var SceneTool$Wonderjs = require("../../../../tool/service/scene/SceneTool.js");
var SkyboxTool$Wonderjs = require("../../job/tool/SkyboxTool.js");
var GeometryAPI$Wonderjs = require("../../../../../src/api/geometry/GeometryAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var PrepareABTool$Wonderjs = require("../tool/PrepareABTool.js");
var DisposeJobTool$Wonderjs = require("../../job/loop/tool/DisposeJobTool.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var ImportABSystem$Wonderjs = require("../../../../../src/asset_bundle/import/ImportABSystem.js");
var AssembleSABTool$Wonderjs = require("../tool/AssembleSABTool.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var CubemapTextureAPI$Wonderjs = require("../../../../../src/api/texture/CubemapTextureAPI.js");
var GenerateAllABTool$Wonderjs = require("../tool/GenerateAllABTool.js");
var CubemapTextureTool$Wonderjs = require("../../../../tool/service/texture/CubemapTextureTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var GenerateSingleRABTool$Wonderjs = require("../tool/GenerateSingleRABTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");
var GenerateSingleRABSystem$Wonderjs = require("../../../../../src/asset_bundle/single/rab/generate/GenerateSingleRABSystem.js");
var GenerateSingleSABSystem$Wonderjs = require("../../../../../src/asset_bundle/single/sab/generate/GenerateSingleSABSystem.js");
var GenerateSceneGraphSystemTool$Wonderjs = require("../../asset/tool/GenerateSceneGraphSystemTool.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");
var ImmutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableSparseMapService.js");
var OperateRABAssetBundleMainService$Wonderjs = require("../../../../../src/service/state/main/assetBundle/OperateRABAssetBundleMainService.js");
var OperateSABAssetBundleMainService$Wonderjs = require("../../../../../src/service/state/main/assetBundle/OperateSABAssetBundleMainService.js");

Wonder_jest.describe("assemble sab", (function (param) {
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
                                                    var match$1 = Curry._2(GenerateAllABTool$Wonderjs.TestDuplicateDataForSAB[/* TestDuplicateImageData */0][/* createGameObject1 */0], imageName, state$1);
                                                    var gameObject2 = match$1[1];
                                                    var gameObject2Name = "g2";
                                                    var state$2 = GameObjectAPI$Wonderjs.setGameObjectName(gameObject2, gameObject2Name, match$1[0]);
                                                    var state$3 = SceneAPI$Wonderjs.addSceneChild(gameObject2, state$2);
                                                    GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                                    var sab1 = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(SceneAPI$Wonderjs.getSceneGameObject(state$3), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, state$3);
                                                    return MostTool$Wonderjs.testStream((function (data) {
                                                                  GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getABRelativePaths */1](/* () */0);
                                                                  return MostTool$Wonderjs.testStream((function (param) {
                                                                                var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                                var __x = GameObjectTool$Wonderjs.unsafeFindGameObjectByName(param[0], gameObject2Name, state);
                                                                                var __x$1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(__x, state);
                                                                                var __x$2 = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(__x$1, state);
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(__x$2, state)), GLBTool$Wonderjs.createFakeImage(imageName, "object_url0", undefined, undefined, /* () */0)));
                                                                              }), AssembleSABTool$Wonderjs.TestWithOneSABAndOneRAB[/* assemble */0](data));
                                                                }), GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* generateAllAB */2](/* tuple */[
                                                                    rab1,
                                                                    sab1
                                                                  ], state$3));
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
                                                          var match$1 = SkyboxTool$Wonderjs.prepareCubemapTexture(state$1);
                                                          var state$2 = CubemapTextureTool$Wonderjs.setAllSources(match$1[0], match$1[1], undefined, undefined, image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, /* () */0);
                                                          GenerateSceneGraphSystemTool$Wonderjs.prepareCanvasForCubemapTexture(sandbox);
                                                          var sab1 = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(SceneAPI$Wonderjs.getSceneGameObject(state$2), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, state$2);
                                                          return MostTool$Wonderjs.testStream((function (data) {
                                                                        GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getABRelativePaths */1](/* () */0);
                                                                        return MostTool$Wonderjs.testStream((function (param) {
                                                                                      var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                                      var cubemapTexture = SceneTool$Wonderjs.unsafeGetCubemapTexture(state);
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                          CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePXSource(cubemapTexture, state),
                                                                                                          CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNXSource(cubemapTexture, state),
                                                                                                          CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePYSource(cubemapTexture, state),
                                                                                                          CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNYSource(cubemapTexture, state),
                                                                                                          CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePZSource(cubemapTexture, state),
                                                                                                          CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNZSource(cubemapTexture, state)
                                                                                                        ]), /* tuple */[
                                                                                                      GLBTool$Wonderjs.createFakeImage(image1Name, "px", 4, undefined, /* () */0),
                                                                                                      GLBTool$Wonderjs.createFakeImage(image2Name, "nx", 4, undefined, /* () */0),
                                                                                                      GLBTool$Wonderjs.createFakeImage(image3Name, "py", 4, undefined, /* () */0),
                                                                                                      GLBTool$Wonderjs.createFakeImage(image4Name, "ny", 4, undefined, /* () */0),
                                                                                                      GLBTool$Wonderjs.createFakeImage(image5Name, "pz", 4, undefined, /* () */0),
                                                                                                      GLBTool$Wonderjs.createFakeImage(image6Name, "nz", 4, undefined, /* () */0)
                                                                                                    ]));
                                                                                    }), AssembleSABTool$Wonderjs.TestWithOneSABAndOneRAB[/* assemble */0](data));
                                                                      }), GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* generateAllAB */2](/* tuple */[
                                                                          rab1,
                                                                          sab1
                                                                        ], state$2));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("build basicSourceTexture data", (function (param) {
                return Wonder_jest.describe("test flipY", (function (param) {
                              return Wonder_jest.testPromise("assembled sab gameObjects->texture->flipY not affected by dependency rab->texture->flipY", undefined, (function (param) {
                                            var imageName = "image1";
                                            var image1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildImageData */1](undefined, imageName, undefined, /* () */0);
                                            var basicSourceTextureImageDataMap = ImmutableSparseMapService$WonderCommonlib.set(0, image1, ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0));
                                            var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createBasicSourceTextureResourceData */2](state[0], undefined, undefined, undefined, undefined, undefined, undefined, undefined, false, 0, /* () */0);
                                            var state$1 = match[0];
                                            var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, basicSourceTextureImageDataMap, undefined, /* () */0);
                                            var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                            var match$1 = Curry._2(GenerateAllABTool$Wonderjs.TestDuplicateDataForSAB[/* TestDuplicateImageData */0][/* createGameObject1 */0], imageName, state$1);
                                            var gameObject2 = match$1[1];
                                            var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(match$1[3][1], true, match$1[0]);
                                            var gameObject2Name = "g2";
                                            var state$3 = GameObjectAPI$Wonderjs.setGameObjectName(gameObject2, gameObject2Name, state$2);
                                            var state$4 = SceneAPI$Wonderjs.addSceneChild(gameObject2, state$3);
                                            GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                            var sab1 = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(SceneAPI$Wonderjs.getSceneGameObject(state$4), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, state$4);
                                            return MostTool$Wonderjs.testStream((function (data) {
                                                          GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getABRelativePaths */1](/* () */0);
                                                          return MostTool$Wonderjs.testStream((function (param) {
                                                                        var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                        var __x = GameObjectTool$Wonderjs.unsafeFindGameObjectByName(param[0], gameObject2Name, state);
                                                                        var __x$1 = GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(__x, state);
                                                                        var __x$2 = LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(__x$1, state);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(__x$2, state)), true));
                                                                      }), AssembleSABTool$Wonderjs.TestWithOneSABAndOneRAB[/* assemble */0](data));
                                                        }), GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* generateAllAB */2](/* tuple */[
                                                            rab1,
                                                            sab1
                                                          ], state$4));
                                          }));
                            }));
              }));
        Wonder_jest.describe("build cubemapTexture data", (function (param) {
                return Wonder_jest.describe("test flipY", (function (param) {
                              return Wonder_jest.testPromise("assembled sab gameObjects->texture->flipY not affected by dependency rab->texture->flipY", undefined, (function (param) {
                                            var image1Name = "i1";
                                            var image2Name = "i2";
                                            var image3Name = "i3";
                                            var image4Name = "i4";
                                            var image5Name = "i5";
                                            var image6Name = "i6";
                                            var match = GenerateSingleRABTool$Wonderjs.Test[/* createCubemapTextureResourceData */1](state[0], image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, undefined, undefined, undefined, undefined, undefined, undefined, true, /* () */0);
                                            var state$1 = match[0];
                                            var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, /* array */[match[1]], undefined, undefined, undefined, undefined, match[3][0], /* () */0);
                                            var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                                            var match$1 = SkyboxTool$Wonderjs.prepareCubemapTexture(state$1);
                                            var state$2 = CubemapTextureTool$Wonderjs.setAllSources(match$1[0], match$1[1], undefined, undefined, image1Name, image2Name, image3Name, image4Name, image5Name, image6Name, /* () */0);
                                            GenerateSceneGraphSystemTool$Wonderjs.prepareCanvasForCubemapTexture(sandbox);
                                            var sab1 = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(SceneAPI$Wonderjs.getSceneGameObject(state$2), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, state$2);
                                            return MostTool$Wonderjs.testStream((function (data) {
                                                          GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getABRelativePaths */1](/* () */0);
                                                          return MostTool$Wonderjs.testStream((function (param) {
                                                                        var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                        var cubemapTexture = SceneTool$Wonderjs.unsafeGetCubemapTexture(state);
                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureFlipY(cubemapTexture, state)), false));
                                                                      }), AssembleSABTool$Wonderjs.TestWithOneSABAndOneRAB[/* assemble */0](data));
                                                        }), GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* generateAllAB */2](/* tuple */[
                                                            rab1,
                                                            sab1
                                                          ], state$2));
                                          }));
                            }));
              }));
        Wonder_jest.describe("build geometry data", (function (param) {
                var _prepare = function (param) {
                  var geometryName = "geometry1";
                  var match = GenerateSingleRABTool$Wonderjs.ResourceData[/* createGeometryResourceData */6](state[0], geometryName, undefined, undefined, undefined, Caml_option.some(undefined), Caml_option.some(Caml_option.some(new Uint32Array(/* array */[0]))), /* () */0);
                  var state$1 = match[0];
                  var resourceData1 = GenerateSingleRABTool$Wonderjs.ResourceData[/* buildResourceData */9](undefined, undefined, undefined, undefined, /* array */[match[2]], undefined, undefined, undefined, undefined, /* () */0);
                  var rab1 = GenerateSingleRABSystem$Wonderjs.generateSingleRAB(resourceData1, state$1);
                  var gameObject2Name = "gameObject2";
                  var match$1 = Curry._2(GenerateAllABTool$Wonderjs.TestDuplicateDataForSAB[/* TestDuplicateGeometryData */1][/* createGameObject1 */1], geometryName, state$1);
                  var gameObject2 = match$1[1];
                  var state$2 = GameObjectAPI$Wonderjs.setGameObjectName(gameObject2, gameObject2Name, match$1[0]);
                  var gameObject3Name = "gameObject3";
                  var geometry3Name = "geometry3";
                  var match$2 = Curry._2(GenerateAllABTool$Wonderjs.TestDuplicateDataForSAB[/* TestDuplicateGeometryData */1][/* createGameObject2 */2], geometry3Name, state$2);
                  var match$3 = match$2[3][1];
                  var gameObject3 = match$2[1];
                  var state$3 = GameObjectAPI$Wonderjs.setGameObjectName(gameObject3, gameObject3Name, match$2[0]);
                  var state$4 = SceneAPI$Wonderjs.addSceneChild(gameObject3, SceneAPI$Wonderjs.addSceneChild(gameObject2, state$3));
                  var sab1 = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(SceneAPI$Wonderjs.getSceneGameObject(state$4), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, state$4);
                  return /* tuple */[
                          state$4,
                          /* tuple */[
                            rab1,
                            sab1
                          ],
                          /* tuple */[
                            gameObject2Name,
                            gameObject3Name
                          ],
                          /* tuple */[
                            geometryName,
                            geometry3Name
                          ],
                          /* tuple */[
                            match$3[0],
                            match$3[1],
                            match$3[2],
                            match$3[3]
                          ]
                        ];
                };
                var _execAndJudge = function (param) {
                  var match = param[4];
                  var indices3 = match[3];
                  var normals3 = match[2];
                  var texCoords3 = match[1];
                  var vertices3 = match[0];
                  var geometryName = param[3][0];
                  var match$1 = param[2];
                  var gameObject3Name = match$1[1];
                  var gameObject2Name = match$1[0];
                  var match$2 = param[1];
                  return MostTool$Wonderjs.testStream((function (data) {
                                var match = GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* getABRelativePaths */1](/* () */0);
                                var rab1RelativePath = match[0];
                                return MostTool$Wonderjs.testStream((function (param) {
                                              var rootGameObject = param[0];
                                              var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                              var __x = GameObjectTool$Wonderjs.unsafeFindGameObjectByName(rootGameObject, gameObject2Name, state);
                                              var geometry2 = GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(__x, state);
                                              var __x$1 = GameObjectTool$Wonderjs.unsafeFindGameObjectByName(rootGameObject, gameObject3Name, state);
                                              var geometry3 = GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(__x$1, state);
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  geometry2,
                                                                  GeometryAPI$Wonderjs.getGeometryVertices(geometry3, state),
                                                                  GeometryAPI$Wonderjs.getGeometryNormals(geometry3, state),
                                                                  GeometryAPI$Wonderjs.getGeometryTexCoords(geometry3, state),
                                                                  GeometryAPI$Wonderjs.getGeometryIndices16(geometry3, state),
                                                                  GeometryAPI$Wonderjs.hasGeometryIndices32(geometry3, state)
                                                                ]), /* tuple */[
                                                              OperateRABAssetBundleMainService$Wonderjs.unsafeFindGeometryByName(rab1RelativePath, geometryName, state),
                                                              vertices3,
                                                              texCoords3,
                                                              normals3,
                                                              indices3,
                                                              false
                                                            ]));
                                            }), AssembleSABTool$Wonderjs.TestWithOneSABAndOneRAB[/* assemble */0](data));
                              }), GenerateAllABTool$Wonderjs.TestWithOneSABAndOneRAB[/* generateAllAB */2](/* tuple */[
                                  match$2[0],
                                  match$2[1]
                                ], param[0]));
                };
                Wonder_jest.describe("test has duplicate data", (function (param) {
                        return Wonder_jest.testPromise("test1", undefined, (function (param) {
                                      return _execAndJudge(_prepare(/* () */0));
                                    }));
                      }));
                return Wonder_jest.describe("test dispose before assemble", (function (param) {
                              return Wonder_jest.testPromise("test1", undefined, (function (param) {
                                            var match = _prepare(/* () */0);
                                            var match$1 = match[4];
                                            var match$2 = match[3];
                                            var match$3 = match[2];
                                            var match$4 = match[1];
                                            var state = DisposeJobTool$Wonderjs.disposeAndReallocate(ImportABSystem$Wonderjs.disposeSceneAllChildren(match[0]));
                                            return _execAndJudge(/* tuple */[
                                                        state,
                                                        /* tuple */[
                                                          match$4[0],
                                                          match$4[1]
                                                        ],
                                                        /* tuple */[
                                                          match$3[0],
                                                          match$3[1]
                                                        ],
                                                        /* tuple */[
                                                          match$2[0],
                                                          match$2[1]
                                                        ],
                                                        /* tuple */[
                                                          match$1[0],
                                                          match$1[1],
                                                          match$1[2],
                                                          match$1[3]
                                                        ]
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("mark is assembled", (function (param) {
                      return Wonder_jest.testPromise("test", undefined, (function (param) {
                                    var sab1 = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(SceneAPI$Wonderjs.getSceneGameObject(state[0]), MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, state[0]);
                                    return MostTool$Wonderjs.testStream((function (data) {
                                                  var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                  var sab1RelativePath = GenerateAllABTool$Wonderjs.TestWithOneSAB[/* getSABRelativePath */1](/* () */0);
                                                  var isAssembledBeforeAssemble = OperateSABAssetBundleMainService$Wonderjs.isAssembled(sab1RelativePath, state);
                                                  return MostTool$Wonderjs.testStream((function (param) {
                                                                var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    isAssembledBeforeAssemble,
                                                                                    OperateSABAssetBundleMainService$Wonderjs.isAssembled(sab1RelativePath, state)
                                                                                  ]), /* tuple */[
                                                                                false,
                                                                                true
                                                                              ]));
                                                              }), AssembleSABTool$Wonderjs.TestWithOneSAB[/* assemble */0](data));
                                                }), GenerateAllABTool$Wonderjs.TestWithOneSAB[/* generateAllAB */2](sab1, state[0]));
                                  }));
                    }));
      }));

/*  Not a pure module */
