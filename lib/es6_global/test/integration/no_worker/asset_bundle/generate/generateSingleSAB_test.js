

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SceneAPI$Wonderjs from "../../../../../src/api/SceneAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as BufferUtils$Wonderjs from "../../../../../src/asset/utils/BufferUtils.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as GenerateSABTool$Wonderjs from "../tool/GenerateSABTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as GenerateSingleSABTool$Wonderjs from "../tool/GenerateSingleSABTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as GenerateSingleSABSystem$Wonderjs from "../../../../../src/asset_bundle/single/sab/generate/GenerateSingleSABSystem.js";
import * as GenerateSceneGraphSystemTool$Wonderjs from "../../asset/tool/GenerateSceneGraphSystemTool.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("generate single sab", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, undefined, /* () */0);
                return GenerateSingleSABTool$Wonderjs.prepare(sandbox[0]);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("generate single wdb", (function (param) {
                      Wonder_jest.describe("test basic", (function (param) {
                              var _createGameObject1 = function (state) {
                                var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
                                var material = match[1];
                                var diffuseColor = /* array */[
                                  0,
                                  0.5,
                                  1
                                ];
                                var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, diffuseColor, match[0]);
                                var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(state$1);
                                var geometry = match$1[1];
                                var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
                                var meshRenderer = match$2[1];
                                var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
                                var gameObject = match$3[1];
                                var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0])));
                                var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$2);
                                var localPos = /* tuple */[
                                  10,
                                  11,
                                  12.5
                                ];
                                var localRotation = /* tuple */[
                                  0,
                                  1,
                                  2.5,
                                  1
                                ];
                                var localScale = /* tuple */[
                                  2,
                                  3.5,
                                  1.5
                                ];
                                var state$3 = TransformAPI$Wonderjs.setTransformLocalScale(transform, localScale, TransformAPI$Wonderjs.setTransformLocalRotation(transform, localRotation, TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPos, state$2)));
                                return /* tuple */[
                                        state$3,
                                        gameObject,
                                        /* tuple */[
                                          transform,
                                          /* tuple */[
                                            localPos,
                                            localRotation,
                                            localScale
                                          ]
                                        ],
                                        geometry,
                                        /* tuple */[
                                          material,
                                          diffuseColor
                                        ],
                                        meshRenderer
                                      ];
                              };
                              var _prepareGameObject = function (state) {
                                var state$1 = state[0];
                                var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                                var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                                var match = _createGameObject1(state$1);
                                var match$1 = match[4];
                                var match$2 = match[2];
                                var match$3 = match$2[1];
                                var transform1 = match$2[0];
                                var match$4 = _createGameObject1(match[0]);
                                var match$5 = match$4[4];
                                var match$6 = match$4[2];
                                var match$7 = match$6[1];
                                var transform2 = match$6[0];
                                var state$2 = SceneAPI$Wonderjs.addSceneChild(transform2, SceneAPI$Wonderjs.addSceneChild(transform1, match$4[0]));
                                return /* tuple */[
                                        state$2,
                                        /* tuple */[
                                          rootGameObject,
                                          sceneGameObjectTransform
                                        ],
                                        /* tuple */[
                                          match[1],
                                          match$4[1]
                                        ],
                                        /* tuple */[
                                          /* tuple */[
                                            transform1,
                                            /* tuple */[
                                              match$3[0],
                                              match$3[1],
                                              match$3[2]
                                            ]
                                          ],
                                          /* tuple */[
                                            transform2,
                                            /* tuple */[
                                              match$7[0],
                                              match$7[1],
                                              match$7[2]
                                            ]
                                          ]
                                        ],
                                        /* tuple */[
                                          match[3],
                                          match$4[3]
                                        ],
                                        /* tuple */[
                                          /* tuple */[
                                            match$1[0],
                                            match$1[1]
                                          ],
                                          /* tuple */[
                                            match$5[0],
                                            match$5[1]
                                          ]
                                        ],
                                        /* tuple */[
                                          match[5],
                                          match$4[5]
                                        ]
                                      ];
                              };
                              return Wonder_jest.test("test gameObjects", (function (param) {
                                            var match = _prepareGameObject(state);
                                            var sab = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(match[1][0], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, match[0]);
                                            var content = GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* getSceneAssetBundleContent */0](sab);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](content[/* gameObjects */3]), /* record */[
                                                        /* count */3,
                                                        /* names : array */[
                                                          "gameObject_0",
                                                          "gameObject_1",
                                                          "gameObject_2"
                                                        ],
                                                        /* isRoots */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
                                                        /* isActives */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("test image", (function (param) {
                                    return Wonder_jest.describe("test image from basicSourceTexture", (function (param) {
                                                  var _prepareGameObject = function (state) {
                                                    var state$1 = state[0];
                                                    var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                                                    GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                                                    var imageName = "image1";
                                                    var match = GenerateSABTool$Wonderjs.createGameObjectWithMap(imageName, state$1);
                                                    var state$2 = SceneAPI$Wonderjs.addSceneChild(match[2], match[0]);
                                                    var match$1 = GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                                    return /* tuple */[
                                                            state$2,
                                                            rootGameObject,
                                                            /* tuple */[
                                                              imageName,
                                                              match$1[2][0]
                                                            ]
                                                          ];
                                                  };
                                                  Wonder_jest.test("test images", (function (param) {
                                                          var match = _prepareGameObject(state);
                                                          var sab = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(match[1], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, match[0]);
                                                          var content = GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* getSceneAssetBundleContent */0](sab);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](content[/* images */4]), /* array */[/* record */[
                                                                        /* name */match[2][0],
                                                                        /* bufferView */4,
                                                                        /* mimeType */"image/png"
                                                                      ]]);
                                                        }));
                                                  return Wonder_jest.test("test image buffer data", (function (param) {
                                                                var match = _prepareGameObject(state);
                                                                var sab = GenerateSingleSABSystem$Wonderjs.generateSingleSAB(match[1], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, match[0]);
                                                                var content = GenerateSingleSABTool$Wonderjs.SceneAssetBundleContent[/* getSceneAssetBundleContent */0](sab);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](content[/* bufferViews */9][4][/* byteLength */2]), BufferUtils$Wonderjs.convertBase64ToBinary(match[2][1]).byteLength);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
