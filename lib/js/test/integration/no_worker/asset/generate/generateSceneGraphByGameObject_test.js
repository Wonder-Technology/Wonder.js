'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var GLTFTool$Wonderjs = require("../tool/GLTFTool.js");
var SceneAPI$Wonderjs = require("../../../../../src/api/SceneAPI.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var ImageUtils$Wonderjs = require("../../../../../src/asset/utils/ImageUtils.js");
var ConvertTool$Wonderjs = require("../tool/ConvertTool.js");
var GeometryAPI$Wonderjs = require("../../../../../src/api/geometry/GeometryAPI.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var GeometryTool$Wonderjs = require("../../../../tool/service/geometry/GeometryTool.js");
var TransformAPI$Wonderjs = require("../../../../../src/api/TransformAPI.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var PointLightAPI$Wonderjs = require("../../../../../src/api/light/PointLightAPI.js");
var GameObjectTool$Wonderjs = require("../../../../tool/service/gameObject/GameObjectTool.js");
var ManageIMGUIAPI$Wonderjs = require("../../../../../src/api/imgui/ManageIMGUIAPI.js");
var PointLightTool$Wonderjs = require("../../../../tool/service/light/PointLightTool.js");
var BoxGeometryTool$Wonderjs = require("../../../../tool/service/geometry/BoxGeometryTool.js");
var MeshRendererAPI$Wonderjs = require("../../../../../src/api/MeshRendererAPI.js");
var BasicMaterialAPI$Wonderjs = require("../../../../../src/api/material/BasicMaterialAPI.js");
var LightMaterialAPI$Wonderjs = require("../../../../../src/api/material/LightMaterialAPI.js");
var BasicMaterialTool$Wonderjs = require("../../../../tool/service/material/BasicMaterialTool.js");
var DirectionLightAPI$Wonderjs = require("../../../../../src/api/light/DirectionLightAPI.js");
var BasicCameraViewAPI$Wonderjs = require("../../../../../src/api/camera/BasicCameraViewAPI.js");
var DirectionLightTool$Wonderjs = require("../../../../tool/service/light/DirectionLightTool.js");
var AssembleWDBSystemTool$Wonderjs = require("../tool/AssembleWDBSystemTool.js");
var BasicSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/BasicSourceTextureAPI.js");
var GenerateSceneGraphAPI$Wonderjs = require("../../../../../src/api/asset/GenerateSceneGraphAPI.js");
var BasicSourceTextureTool$Wonderjs = require("../../../../tool/service/texture/BasicSourceTextureTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");
var ArcballCameraControllerAPI$Wonderjs = require("../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js");
var ArcballCameraControllerTool$Wonderjs = require("../../../../tool/service/camera_controller/ArcballCameraControllerTool.js");
var GenerateSceneGraphSystemTool$Wonderjs = require("../tool/GenerateSceneGraphSystemTool.js");
var PerspectiveCameraProjectionAPI$Wonderjs = require("../../../../../src/api/camera/PerspectiveCameraProjectionAPI.js");
var ArrayBufferViewSourceTextureAPI$Wonderjs = require("../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js");

describe("generateSceneGraph by gameObject", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        var _createTexture1 = function (state) {
          var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
          var texture = match[1];
          var name = "texture_1";
          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureName(texture, name, match[0]);
          var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(texture, /* Linear */1, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapS(texture, /* Repeat */2, state$1));
          var source = BasicSourceTextureTool$Wonderjs.buildSource(30, 50);
          var state$3 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(texture, source, state$2);
          return /* tuple */[
                  state$3,
                  /* tuple */[
                    texture,
                    name
                  ],
                  /* tuple */[
                    source,
                    30,
                    50
                  ]
                ];
        };
        var _createTexture2 = function (state) {
          var match = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture(state);
          var texture = match[1];
          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(texture, /* Linear_mipmap_linear */5, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapT(texture, /* Repeat */2, match[0]));
          var source = BasicSourceTextureTool$Wonderjs.buildSource(32, 60);
          var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(texture, source, state$1);
          return /* tuple */[
                  state$2,
                  texture,
                  /* tuple */[
                    source,
                    32,
                    60
                  ]
                ];
        };
        var _createGameObjectWithMap = function (textureName, imageName, state) {
          var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
          var material = match[1];
          var match$1 = _createTexture1(match[0]);
          var texture = match$1[1][0];
          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureName(texture, textureName, match$1[0]);
          ImageUtils$Wonderjs.setImageName(match$1[2][0], imageName);
          var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, texture, state$1);
          var match$2 = BoxGeometryTool$Wonderjs.createBoxGeometry(state$2);
          var match$3 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$2[0]);
          var match$4 = GameObjectAPI$Wonderjs.createGameObject(match$3[0]);
          var gameObject = match$4[1];
          var state$3 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, match$3[1], GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, match$2[1], GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$4[0])));
          var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$3);
          return /* tuple */[
                  state$3,
                  gameObject,
                  transform
                ];
        };
        var _createGameObjectWithShareMaterial = function (material, addGameObjectMaterialComponentFunc, state) {
          var match = BoxGeometryTool$Wonderjs.createBoxGeometry(state);
          var geometry = match[1];
          var match$1 = MeshRendererAPI$Wonderjs.createMeshRenderer(match[0]);
          var meshRenderer = match$1[1];
          var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
          var gameObject = match$2[1];
          var state$1 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, Curry._3(addGameObjectMaterialComponentFunc, gameObject, material, match$2[0])));
          var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1);
          var localPos = /* tuple */[
            0.5,
            11,
            12.5
          ];
          var localRotation = /* tuple */[
            3,
            1,
            2.5,
            1
          ];
          var localScale = /* tuple */[
            2.5,
            15.5,
            1.5
          ];
          var state$2 = TransformAPI$Wonderjs.setTransformLocalScale(transform, localScale, TransformAPI$Wonderjs.setTransformLocalRotation(transform, localRotation, TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPos, state$1)));
          return /* tuple */[
                  state$2,
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
                  material,
                  meshRenderer
                ];
        };
        var _createGameObjectWithShareGeometry = function (geometry, addGameObjectGeometryComponentFunc, state) {
          var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
          var material = match[1];
          var diffuseColor = /* array */[
            1,
            0.5,
            0.5
          ];
          var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(material, diffuseColor, match[0]);
          var match$1 = MeshRendererAPI$Wonderjs.createMeshRenderer(state$1);
          var meshRenderer = match$1[1];
          var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
          var gameObject = match$2[1];
          var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, Curry._3(addGameObjectGeometryComponentFunc, gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$2[0])));
          var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$2);
          var localPos = /* tuple */[
            0.5,
            11,
            12.5
          ];
          var localRotation = /* tuple */[
            3,
            1,
            2.5,
            1
          ];
          var localScale = /* tuple */[
            2.5,
            15.5,
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
        var _createGameObject2 = function (state) {
          var match = GeometryAPI$Wonderjs.createGeometry(state);
          var geometry = match[1];
          var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
          var gameObject = match$1[1];
          var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, match$1[0]);
          var vertices1 = new Float32Array(/* array */[
                -0.04454309865832329,
                -0.1662379950284958,
                1.0180000066757202,
                2.602089970253733e-18,
                -6.938890181594472e-18,
                1.0180000066757202,
                -0.08605089783668518,
                -0.14904500544071198,
                1.0180000066757202
              ]);
          var texCoords1 = new Float32Array(/* array */[
                0.7119140028953552,
                0.12024599313735962,
                0.7552189826965332,
                0.15945100784301758,
                0.7032840251922607,
                0.13282698392868042
              ]);
          var normals1 = new Float32Array(/* array */[
                -0.7455800175666809,
                0.47522100806236267,
                -0.4671989977359772,
                -0.7843430042266846,
                0.4080820083618164,
                -0.4671989977359772,
                0.7455800175666809,
                -0.47522100806236267,
                -0.46720001101493835
              ]);
          var indices1 = new Uint16Array(/* array */[
                0,
                2,
                1
              ]);
          var state$2 = GeometryAPI$Wonderjs.setGeometryIndices(geometry, indices1, GeometryAPI$Wonderjs.setGeometryNormals(geometry, normals1, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry, texCoords1, GeometryAPI$Wonderjs.setGeometryVertices(geometry, vertices1, state$1))));
          var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(state$2);
          var material = match$2[1];
          var match$3 = _createTexture1(match$2[0]);
          var match$4 = match$3[2];
          var match$5 = match$3[1];
          var texture = match$5[0];
          var state$3 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, texture, match$3[0]);
          var match$6 = MeshRendererAPI$Wonderjs.createMeshRenderer(state$3);
          var meshRenderer = match$6[1];
          var state$4 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$6[0]));
          var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$4);
          var localPos = /* tuple */[
            0.5,
            -1.5,
            1.5
          ];
          var localRotation = /* tuple */[
            2,
            2.5,
            5,
            4.5
          ];
          var localScale = /* tuple */[
            3,
            5.5,
            1.0
          ];
          var state$5 = TransformAPI$Wonderjs.setTransformLocalScale(transform, localScale, TransformAPI$Wonderjs.setTransformLocalRotation(transform, localRotation, TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPos, state$4)));
          return /* tuple */[
                  state$5,
                  gameObject,
                  /* tuple */[
                    transform,
                    /* tuple */[
                      localPos,
                      localRotation,
                      localScale
                    ]
                  ],
                  /* tuple */[
                    geometry,
                    /* tuple */[
                      vertices1,
                      texCoords1,
                      normals1,
                      indices1
                    ]
                  ],
                  /* tuple */[
                    material,
                    /* tuple */[
                      texture,
                      match$5[1]
                    ],
                    /* tuple */[
                      match$4[0],
                      match$4[1],
                      match$4[2]
                    ]
                  ],
                  meshRenderer
                ];
        };
        var _createGameObject3 = function (state) {
          var match = GeometryAPI$Wonderjs.createGeometry(state);
          var geometry = match[1];
          var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
          var gameObject = match$1[1];
          var state$1 = GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, match$1[0]);
          var vertices1 = new Float32Array(/* array */[
                2.602089970253733e-18,
                -6.938890181594472e-18,
                1.0180000066757202,
                -0.04454309865832329,
                -0.1662379950284958,
                1.0180000066757202,
                -0.08605089783668518,
                -0.14904500544071198,
                1.0180000066757202
              ]);
          var texCoords1 = new Float32Array(/* array */[
                0.5,
                0.15945100784301758,
                0.7119140028953552,
                0.12024599313735962,
                0.7032840251922607,
                0.13282698392868042
              ]);
          var normals1 = new Float32Array(/* array */[
                -0.7455800175666809,
                0.47522100806236267,
                -0.4671989977359772,
                0.7455800175666809,
                -0.47522100806236267,
                -0.46720001101493835,
                -0.7843430042266846,
                0.4080820083618164,
                -0.4671989977359772
              ]);
          var indices1 = new Uint16Array(/* array */[
                1,
                0,
                2
              ]);
          var state$2 = GeometryAPI$Wonderjs.setGeometryIndices(geometry, indices1, GeometryAPI$Wonderjs.setGeometryNormals(geometry, normals1, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry, texCoords1, GeometryAPI$Wonderjs.setGeometryVertices(geometry, vertices1, state$1))));
          var match$2 = LightMaterialAPI$Wonderjs.createLightMaterial(state$2);
          var material = match$2[1];
          var match$3 = _createTexture2(match$2[0]);
          var match$4 = match$3[2];
          var texture = match$3[1];
          var state$3 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, texture, match$3[0]);
          var match$5 = MeshRendererAPI$Wonderjs.createMeshRenderer(state$3);
          var meshRenderer = match$5[1];
          var state$4 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$5[0]));
          var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$4);
          var localPos = /* tuple */[
            2.5,
            -2.5,
            0.5
          ];
          var localRotation = /* tuple */[
            2,
            3.5,
            5,
            4.5
          ];
          var localScale = /* tuple */[
            3,
            8.5,
            1.0
          ];
          var state$5 = TransformAPI$Wonderjs.setTransformLocalScale(transform, localScale, TransformAPI$Wonderjs.setTransformLocalRotation(transform, localRotation, TransformAPI$Wonderjs.setTransformLocalPosition(transform, localPos, state$4)));
          return /* tuple */[
                  state$5,
                  gameObject,
                  /* tuple */[
                    transform,
                    /* tuple */[
                      localPos,
                      localRotation,
                      localScale
                    ]
                  ],
                  /* tuple */[
                    geometry,
                    /* tuple */[
                      vertices1,
                      texCoords1,
                      normals1,
                      indices1
                    ]
                  ],
                  /* tuple */[
                    material,
                    texture,
                    /* tuple */[
                      match$4[0],
                      match$4[1],
                      match$4[2]
                    ]
                  ],
                  meshRenderer
                ];
        };
        beforeAll((function () {
                return Curry._1(ConvertTool$Wonderjs.buildFakeLoadImage, /* () */0);
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(50000, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return ConvertTool$Wonderjs.setFakeTransformCount(50);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test basic", (function () {
                var _prepareGameObject = function (state) {
                  var state$1 = state[0];
                  var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match = _createGameObject1(state$1);
                  var match$1 = match[4];
                  var match$2 = match[2];
                  var match$3 = match$2[1];
                  var transform1 = match$2[0];
                  var match$4 = _createGameObject2(match[0]);
                  var match$5 = match$4[4];
                  var match$6 = match$5[2];
                  var match$7 = match$5[1];
                  var match$8 = match$4[3];
                  var match$9 = match$8[1];
                  var match$10 = match$4[2];
                  var match$11 = match$10[1];
                  var transform2 = match$10[0];
                  var match$12 = _createGameObject3(match$4[0]);
                  var match$13 = match$12[4];
                  var match$14 = match$13[2];
                  var match$15 = match$12[3];
                  var match$16 = match$15[1];
                  var match$17 = match$12[2];
                  var match$18 = match$17[1];
                  var transform3 = match$17[0];
                  var state$2 = TransformAPI$Wonderjs.setTransformParent(transform2, transform3, SceneAPI$Wonderjs.addSceneChild(transform2, SceneAPI$Wonderjs.addSceneChild(transform1, match$12[0])));
                  var match$19 = GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  var match$20 = match$19[2];
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            match[1],
                            match$4[1],
                            match$12[1]
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
                                match$11[0],
                                match$11[1],
                                match$11[2]
                              ]
                            ],
                            /* tuple */[
                              transform3,
                              /* tuple */[
                                match$18[0],
                                match$18[1],
                                match$18[2]
                              ]
                            ]
                          ],
                          /* tuple */[
                            match[3],
                            /* tuple */[
                              match$8[0],
                              /* tuple */[
                                match$9[0],
                                match$9[1],
                                match$9[2],
                                match$9[3]
                              ]
                            ],
                            /* tuple */[
                              match$15[0],
                              /* tuple */[
                                match$16[0],
                                match$16[1],
                                match$16[2],
                                match$16[3]
                              ]
                            ]
                          ],
                          /* tuple */[
                            /* tuple */[
                              match$1[0],
                              match$1[1]
                            ],
                            /* tuple */[
                              match$5[0],
                              /* tuple */[
                                match$7[0],
                                match$7[1]
                              ],
                              /* tuple */[
                                match$6[0],
                                match$6[1],
                                match$6[2]
                              ]
                            ],
                            /* tuple */[
                              match$13[0],
                              match$13[1],
                              /* tuple */[
                                match$14[0],
                                match$14[1],
                                match$14[2]
                              ]
                            ],
                            /* tuple */[
                              match$20[0],
                              match$20[1]
                            ]
                          ],
                          /* tuple */[
                            match[5],
                            match$4[5],
                            match$12[5]
                          ]
                        ];
                };
                Wonder_jest.test("test nodes", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"nodes\":[{\"children\":[1,2]},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"children\":[3],\"translation\":[0.5,-1.5,1.5],\"rotation\":[2,2.5,5,4.5],\"scale\":[3,5.5,1],\"mesh\":1,\"extras\":{\"lightMaterial\":1,\"meshRenderer\":1}},{\"translation\":[2.5,-2.5,0.5],\"rotation\":[2,3.5,5,4.5],\"scale\":[3,8.5,1],\"mesh\":2,\"extras\":{\"lightMaterial\":2,\"meshRenderer\":2}}]\n          ", match[0]);
                      }));
                Wonder_jest.test("test meshes", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0,\"NORMAL\":1,\"TEXCOORD_0\":2},\"indices\":3}]},{\"primitives\":[{\"attributes\":{\"POSITION\":4,\"NORMAL\":5,\"TEXCOORD_0\":6},\"indices\":7}]},{\"primitives\":[{\"attributes\":{\"POSITION\":8,\"NORMAL\":9,\"TEXCOORD_0\":10},\"indices\":11}]}]\n                ", match[0]);
                      }));
                Wonder_jest.test("test meshRenderers", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n              \"extras\":{\"meshRenderers\":[{\"drawMode\":4},{\"drawMode\":4},{\"drawMode\":4}]}\n                ", match[0]);
                      }));
                Wonder_jest.test("test materials", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n              \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match[5][0][1]) + ",1]}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":1}}}]\n                "), match[0]);
                      }));
                Wonder_jest.test("test textures and samplers and images", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n  \"textures\":[{\"sampler\":0,\"source\":0,\"name\":\"" + (String(match[5][1][1][1]) + "\"},{\"sampler\":1,\"source\":1}],\"samplers\":[{\"wrapS\":10497,\"wrapT\":33071,\"magFilter\":9729,\"minFilter\":9728},{\"wrapS\":33071,\"wrapT\":10497,\"magFilter\":9729,\"minFilter\":9987}],\"images\":[{\"bufferView\":12,\"mimeType\":\"image/png\"},{\"bufferView\":13,\"mimeType\":\"image/png\"}]\n                "), match[0]);
                      }));
                Wonder_jest.test("test bufferViews", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n  \"bufferViews\":[{\"buffer\":0,\"byteOffset\":0,\"byteLength\":288},{\"buffer\":0,\"byteOffset\":288,\"byteLength\":288},{\"buffer\":0,\"byteOffset\":576,\"byteLength\":192},{\"buffer\":0,\"byteOffset\":768,\"byteLength\":72},{\"buffer\":0,\"byteOffset\":840,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":876,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":912,\"byteLength\":24},{\"buffer\":0,\"byteOffset\":936,\"byteLength\":6},{\"buffer\":0,\"byteOffset\":944,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":980,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":1016,\"byteLength\":24},{\"buffer\":0,\"byteOffset\":1040,\"byteLength\":6},{\"buffer\":0,\"byteOffset\":1048,\"byteLength\":2},{\"buffer\":0,\"byteOffset\":1052,\"byteLength\":2}]\n\n                ", match[0]);
                      }));
                describe("test buffer", (function () {
                        return Wonder_jest.testPromise("test data", (function () {
                                      var match = _prepareGameObject(state);
                                      var match$1 = match[4];
                                      var match$2 = match$1[2][1];
                                      var indices3 = match$2[3];
                                      var normals3 = match$2[2];
                                      var texCoords3 = match$2[1];
                                      var vertices3 = match$2[0];
                                      var match$3 = match$1[1][1];
                                      var indices2 = match$3[3];
                                      var normals2 = match$3[2];
                                      var texCoords2 = match$3[1];
                                      var vertices2 = match$3[0];
                                      return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2], param[0])), /* array */[
                                                                /* tuple */[
                                                                  "geometry_0",
                                                                  /* tuple */[
                                                                    GLTFTool$Wonderjs.getBoxMainVertices(/* () */0),
                                                                    GLTFTool$Wonderjs.getBoxMainNormals(/* () */0),
                                                                    GLTFTool$Wonderjs.getBoxMainTexCoords(/* () */0),
                                                                    Js_primitive.some(GLTFTool$Wonderjs.getBoxMainIndices(/* () */0)),
                                                                    undefined
                                                                  ]
                                                                ],
                                                                /* tuple */[
                                                                  "geometry_1",
                                                                  /* tuple */[
                                                                    vertices2,
                                                                    normals2,
                                                                    texCoords2,
                                                                    Js_primitive.some(indices2),
                                                                    undefined
                                                                  ]
                                                                ],
                                                                /* tuple */[
                                                                  "geometry_2",
                                                                  /* tuple */[
                                                                    vertices3,
                                                                    normals3,
                                                                    texCoords3,
                                                                    Js_primitive.some(indices3),
                                                                    undefined
                                                                  ]
                                                                ]
                                                              ]);
                                                  }), match[0]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test imgui", (function () {
                var _prepareGameObject = function (state) {
                  var customData = /* tuple */[
                    1,
                    "cc"
                  ];
                  var imguiFunc = function (customData, apiJsObj, state) {
                    var imageFunc = apiJsObj.image;
                    return imageFunc(customData[0], customData[1], state);
                  };
                  var state$1 = ManageIMGUIAPI$Wonderjs.setIMGUIFunc(customData, imguiFunc, state[0]);
                  var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
                  return /* tuple */[
                          match[0],
                          /* tuple */[
                            customData,
                            imguiFunc
                          ],
                          match[1]
                        ];
                };
                return Wonder_jest.test("test customData and imguiFunc", (function () {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[2], "\n\"extras\":{\"imgui\":{\"customData\":\"[1,\\\"cc\\\"]\",\"imguiFunc\":\"function imguiFunc(customData, apiJsObj, state) {\\n        var imageFunc = apiJsObj.image;\\n        return imageFunc(customData[0], customData[1], state);\\n      }\"}}\n            ", match[0]);
                            }));
              }));
        describe("test dispose", (function () {
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = _createGameObject1(state$1);
                  var match$2 = match$1[4];
                  var match$3 = match$1[2];
                  var match$4 = match$3[1];
                  var transform1 = match$3[0];
                  var match$5 = _createGameObject2(match$1[0]);
                  var match$6 = match$5[4];
                  var match$7 = match$6[2];
                  var match$8 = match$6[1];
                  var match$9 = match$5[3];
                  var match$10 = match$9[1];
                  var match$11 = match$5[2];
                  var match$12 = match$11[1];
                  var gameObject2 = match$5[1];
                  var state$2 = GameObjectTool$Wonderjs.disposeGameObject(gameObject2, match$5[0]);
                  var match$13 = _createGameObject3(state$2);
                  var match$14 = match$13[4];
                  var match$15 = match$14[2];
                  var match$16 = match$13[3];
                  var match$17 = match$16[1];
                  var match$18 = match$13[2];
                  var match$19 = match$18[1];
                  var transform3 = match$18[0];
                  var state$3 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform3, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform1, match$13[0]));
                  var match$20 = GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  var match$21 = match$20[2];
                  return /* tuple */[
                          state$3,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            match$1[1],
                            gameObject2,
                            match$13[1]
                          ],
                          /* tuple */[
                            /* tuple */[
                              transform1,
                              /* tuple */[
                                match$4[0],
                                match$4[1],
                                match$4[2]
                              ]
                            ],
                            /* tuple */[
                              match$11[0],
                              /* tuple */[
                                match$12[0],
                                match$12[1],
                                match$12[2]
                              ]
                            ],
                            /* tuple */[
                              transform3,
                              /* tuple */[
                                match$19[0],
                                match$19[1],
                                match$19[2]
                              ]
                            ]
                          ],
                          /* tuple */[
                            match$1[3],
                            /* tuple */[
                              match$9[0],
                              /* tuple */[
                                match$10[0],
                                match$10[1],
                                match$10[2],
                                match$10[3]
                              ]
                            ],
                            /* tuple */[
                              match$16[0],
                              /* tuple */[
                                match$17[0],
                                match$17[1],
                                match$17[2],
                                match$17[3]
                              ]
                            ]
                          ],
                          /* tuple */[
                            /* tuple */[
                              match$2[0],
                              match$2[1]
                            ],
                            /* tuple */[
                              match$6[0],
                              /* tuple */[
                                match$8[0],
                                match$8[1]
                              ],
                              /* tuple */[
                                match$7[0],
                                match$7[1],
                                match$7[2]
                              ]
                            ],
                            /* tuple */[
                              match$14[0],
                              match$14[1],
                              /* tuple */[
                                match$15[0],
                                match$15[1],
                                match$15[2]
                              ]
                            ],
                            /* tuple */[
                              match$21[0],
                              match$21[1]
                            ]
                          ],
                          /* tuple */[
                            match$1[5],
                            match$5[5],
                            match$13[5]
                          ]
                        ];
                };
                Wonder_jest.test("test nodes", (function () {
                        var match = _prepareGameObject(state);
                        var match$1 = match[3];
                        var match$2 = match$1[2][1];
                        var match$3 = match$1[0][1];
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                     \"nodes\":[{\"children\":[1,2]},{\"translation\":[" + (String(match$3[0]) + ("],\"rotation\":[" + (String(match$3[1]) + ("],\"scale\":[" + (String(match$3[2]) + ("],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\" meshRenderer\":0}},{\"translation\":[" + (String(match$2[0]) + ("],\"rotation\":[" + (String(match$2[1]) + ("],\"scale\":[" + (String(match$2[2]) + "],\"mesh\":1,\"extras\":{\"lightMaterial\":1, \"meshRenderer\":1}}]\n                     "))))))))))), match[0]);
                      }));
                Wonder_jest.test("test meshes", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                   \"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0,\"NORMAL\":1,\"TEXCOORD_0\":2},\"indices\":3}]},{\"primitives\":[{\"attributes\":{\"POSITION\":4,\"NORMAL\":5,\"TEXCOORD_0\":6},\"indices\":7}]}]\n                       ", match[0]);
                      }));
                Wonder_jest.test("test materials, textures, samplers, images", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n       \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match[5][0][1]) + ",1]}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}}],\n                     \"textures\":[{\"sampler\":0,\"source\":0}],\"samplers\":[{\"wrapS\":33071,\"wrapT\":10497,\"magFilter\":9729,\"minFilter\":9987}],\"images\":[{\"bufferView\":8,\"mimeType\":\"image/png\"}]                       "), match[0]);
                      }));
                return Wonder_jest.test("test bufferViews", (function () {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"bufferViews\":[{\"buffer\":0,\"byteOffset\":0,\"byteLength\":288},{\"buffer\":0,\"byteOffset\":288,\"byteLength\":288},{\"buffer\":0,\"byteOffset\":576,\"byteLength\":192},{\"buffer\":0,\"byteOffset\":768,\"byteLength\":72},{\"buffer\":0,\"byteOffset\":840,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":876,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":912,\"byteLength\":24},{\"buffer\":0,\"byteOffset\":936,\"byteLength\":6},{\"buffer\":0,\"byteOffset\":944,\"byteLength\":2}]\n", match[0]);
                            }));
              }));
        describe("test share geometry", (function () {
                describe("test has no map", (function () {
                        var _prepareGameObject = function (state) {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var rootGameObject = match[1];
                          var state$1 = match[0];
                          var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                          var match$1 = _createGameObject1(state$1);
                          var match$2 = match$1[4];
                          var geometry1 = match$1[3];
                          var match$3 = match$1[2];
                          var match$4 = match$3[1];
                          var transform1 = match$3[0];
                          var match$5 = _createGameObjectWithShareGeometry(geometry1, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent, match$1[0]);
                          var match$6 = match$5[4];
                          var match$7 = match$5[2];
                          var match$8 = match$7[1];
                          var transform2 = match$7[0];
                          var match$9 = _createGameObject3(match$5[0]);
                          var match$10 = match$9[4];
                          var match$11 = match$10[2];
                          var match$12 = match$9[3];
                          var match$13 = match$12[1];
                          var match$14 = match$9[2];
                          var match$15 = match$14[1];
                          var transform3 = match$14[0];
                          var state$2 = TransformAPI$Wonderjs.setTransformParent(transform2, transform3, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform2, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform1, match$9[0])));
                          var match$16 = GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                          var match$17 = match$16[2];
                          return /* tuple */[
                                  state$2,
                                  /* tuple */[
                                    rootGameObject,
                                    sceneGameObjectTransform
                                  ],
                                  /* tuple */[
                                    match$1[1],
                                    match$5[1],
                                    match$9[1]
                                  ],
                                  /* tuple */[
                                    /* tuple */[
                                      transform1,
                                      /* tuple */[
                                        match$4[0],
                                        match$4[1],
                                        match$4[2]
                                      ]
                                    ],
                                    /* tuple */[
                                      transform2,
                                      /* tuple */[
                                        match$8[0],
                                        match$8[1],
                                        match$8[2]
                                      ]
                                    ],
                                    /* tuple */[
                                      transform3,
                                      /* tuple */[
                                        match$15[0],
                                        match$15[1],
                                        match$15[2]
                                      ]
                                    ]
                                  ],
                                  /* tuple */[
                                    geometry1,
                                    match$5[3],
                                    /* tuple */[
                                      match$12[0],
                                      /* tuple */[
                                        match$13[0],
                                        match$13[1],
                                        match$13[2],
                                        match$13[3]
                                      ]
                                    ]
                                  ],
                                  /* tuple */[
                                    /* tuple */[
                                      match$2[0],
                                      match$2[1]
                                    ],
                                    /* tuple */[
                                      match$6[0],
                                      match$6[1]
                                    ],
                                    /* tuple */[
                                      match$10[0],
                                      match$10[1],
                                      /* tuple */[
                                        match$11[0],
                                        match$11[1],
                                        match$11[2]
                                      ]
                                    ],
                                    /* tuple */[
                                      match$17[0],
                                      match$17[1]
                                    ]
                                  ],
                                  /* tuple */[
                                    match$1[5],
                                    match$5[5],
                                    match$9[5]
                                  ]
                                ];
                        };
                        Wonder_jest.test("test nodes", (function () {
                                var match = _prepareGameObject(state);
                                var match$1 = match[3];
                                var match$2 = match$1[2][1];
                                var match$3 = match$1[1][1];
                                var match$4 = match$1[0][1];
                                return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\"nodes\":[{\"children\":[1,2]},{\"translation\":[" + (String(match$4[0]) + ("],\"rotation\":[" + (String(match$4[1]) + ("],\"scale\":[" + (String(match$4[2]) + ("],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"children\":[3],\"translation\":[" + (String(match$3[0]) + ("],\"rotation\":[" + (String(match$3[1]) + ("],\"scale\":[" + (String(match$3[2]) + ("],\"mesh\":0,\"extras\":{\"lightMaterial\":1,\"meshRenderer\":1}},{\"translation\":[" + (String(match$2[0]) + ("],\"rotation\":[" + (String(match$2[1]) + ("],\"scale\":[" + (String(match$2[2]) + "],\"mesh\":1,\"extras\":{\"lightMaterial\":2,\"meshRenderer\":2}}]"))))))))))))))))), match[0]);
                              }));
                        Wonder_jest.test("test meshes", (function () {
                                var match = _prepareGameObject(state);
                                return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n               \"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0,\"NORMAL\":1,\"TEXCOORD_0\":2},\"indices\":3}]},{\"primitives\":[{\"attributes\":{\"POSITION\":4,\"NORMAL\":5,\"TEXCOORD_0\":6},\"indices\":7}]}]\n                   ", match[0]);
                              }));
                        describe("test buffer", (function () {
                                return Wonder_jest.testPromise("test data", (function () {
                                              var match = _prepareGameObject(state);
                                              var match$1 = match[4][2][1];
                                              var indices3 = match$1[3];
                                              var normals3 = match$1[2];
                                              var texCoords3 = match$1[1];
                                              var vertices3 = match$1[0];
                                              return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                                            GLTFTool$Wonderjs.getTruckGeometryData(/* () */0);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2], param[0])), /* array */[
                                                                        /* tuple */[
                                                                          "geometry_0",
                                                                          /* tuple */[
                                                                            GLTFTool$Wonderjs.getBoxMainVertices(/* () */0),
                                                                            GLTFTool$Wonderjs.getBoxMainNormals(/* () */0),
                                                                            GLTFTool$Wonderjs.getBoxMainTexCoords(/* () */0),
                                                                            Js_primitive.some(GLTFTool$Wonderjs.getBoxMainIndices(/* () */0)),
                                                                            undefined
                                                                          ]
                                                                        ],
                                                                        /* tuple */[
                                                                          "geometry_0",
                                                                          /* tuple */[
                                                                            GLTFTool$Wonderjs.getBoxMainVertices(/* () */0),
                                                                            GLTFTool$Wonderjs.getBoxMainNormals(/* () */0),
                                                                            GLTFTool$Wonderjs.getBoxMainTexCoords(/* () */0),
                                                                            Js_primitive.some(GLTFTool$Wonderjs.getBoxMainIndices(/* () */0)),
                                                                            undefined
                                                                          ]
                                                                        ],
                                                                        /* tuple */[
                                                                          "geometry_1",
                                                                          /* tuple */[
                                                                            vertices3,
                                                                            normals3,
                                                                            texCoords3,
                                                                            Js_primitive.some(indices3),
                                                                            undefined
                                                                          ]
                                                                        ]
                                                                      ]);
                                                          }), match[0]);
                                            }));
                              }));
                        return Wonder_jest.test("test materials, textures, samplers, images", (function () {
                                      var match = _prepareGameObject(state);
                                      var match$1 = match[5];
                                      return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match$1[0][1]) + (",1]}},{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match$1[1][1]) + ",1]}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}}],\"textures\":[{\"sampler\":0,\"source\":0}],\"samplers\":[{\"wrapS\":33071,\"wrapT\":10497,\"magFilter\":9729,\"minFilter\":9987}],\n                 \"images\":[{\"bufferView\":8,\"mimeType\":\"image/png\"}]\n                   "))), match[0]);
                                    }));
                      }));
                describe("test with map", (function () {
                        var _createGameObjectWithMapAndGeometry = function (textureName, geometry, state) {
                          var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
                          var material = match[1];
                          var match$1 = _createTexture1(match[0]);
                          var texture = match$1[1][0];
                          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureName(texture, textureName, match$1[0]);
                          var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, texture, state$1);
                          var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(state$2);
                          var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
                          var gameObject = match$3[1];
                          var state$3 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, match$2[1], GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0])));
                          var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$3);
                          return /* tuple */[
                                  state$3,
                                  gameObject,
                                  transform
                                ];
                        };
                        var _prepareGameObject = function (state) {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var rootGameObject = match[1];
                          var state$1 = match[0];
                          var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                          var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(state$1);
                          var geometry = match$1[1];
                          var textureName1 = "texture_name1";
                          var match$2 = _createGameObjectWithMapAndGeometry(textureName1, geometry, match$1[0]);
                          var textureName2 = "texture_name2";
                          var match$3 = _createGameObjectWithMapAndGeometry(textureName2, geometry, match$2[0]);
                          var state$2 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$3[2], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$2[2], match$3[0]));
                          GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                          return /* tuple */[
                                  state$2,
                                  /* tuple */[
                                    rootGameObject,
                                    sceneGameObjectTransform
                                  ],
                                  /* tuple */[
                                    match$2[1],
                                    textureName1
                                  ],
                                  /* tuple */[
                                    match$3[1],
                                    textureName2
                                  ]
                                ];
                        };
                        return Wonder_jest.testPromise("\n          1.create two gameObjects with one geometry and two materials and two maps;\n          2.generate wdb;\n          3.assemble wdb;\n\n          the assembled->rootGameObject->two gameObjects should has two different maps\n          ", (function () {
                                      var match = _prepareGameObject(state);
                                      var textureName2 = match[3][1];
                                      var textureName1 = match[2][1];
                                      return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (map) {
                                                                          return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName(map, state);
                                                                        }))), /* array */[
                                                                textureName1,
                                                                textureName2
                                                              ]);
                                                  }), match[0]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test share light material", (function () {
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = _createGameObject1(state$1);
                  var match$2 = match$1[4];
                  var match$3 = match$1[2];
                  var match$4 = match$3[1];
                  var transform1 = match$3[0];
                  var match$5 = _createGameObject2(match$1[0]);
                  var match$6 = match$5[4];
                  var match$7 = match$6[2];
                  var match$8 = match$6[1];
                  var material2 = match$6[0];
                  var match$9 = match$5[3];
                  var match$10 = match$9[1];
                  var match$11 = match$5[2];
                  var match$12 = match$11[1];
                  var transform2 = match$11[0];
                  var match$13 = _createGameObjectWithShareMaterial(material2, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent, match$5[0]);
                  var match$14 = match$13[2];
                  var match$15 = match$14[1];
                  var transform3 = match$14[0];
                  var state$2 = TransformAPI$Wonderjs.setTransformParent(transform2, transform3, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform2, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform1, match$13[0])));
                  var match$16 = GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  var match$17 = match$16[2];
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            match$1[1],
                            match$5[1],
                            match$13[1]
                          ],
                          /* tuple */[
                            /* tuple */[
                              transform1,
                              /* tuple */[
                                match$4[0],
                                match$4[1],
                                match$4[2]
                              ]
                            ],
                            /* tuple */[
                              transform2,
                              /* tuple */[
                                match$12[0],
                                match$12[1],
                                match$12[2]
                              ]
                            ],
                            /* tuple */[
                              transform3,
                              /* tuple */[
                                match$15[0],
                                match$15[1],
                                match$15[2]
                              ]
                            ]
                          ],
                          /* tuple */[
                            match$1[3],
                            /* tuple */[
                              match$9[0],
                              /* tuple */[
                                match$10[0],
                                match$10[1],
                                match$10[2],
                                match$10[3]
                              ]
                            ],
                            match$13[3]
                          ],
                          /* tuple */[
                            /* tuple */[
                              match$2[0],
                              match$2[1]
                            ],
                            /* tuple */[
                              material2,
                              /* tuple */[
                                match$8[0],
                                match$8[1]
                              ],
                              /* tuple */[
                                match$7[0],
                                match$7[1],
                                match$7[2]
                              ]
                            ],
                            match$13[4],
                            /* tuple */[
                              match$17[0],
                              match$17[1]
                            ]
                          ],
                          /* tuple */[
                            match$1[5],
                            match$5[5],
                            match$13[5]
                          ]
                        ];
                };
                Wonder_jest.test("test nodes", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"nodes\":[{\"children\":[1,2]},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"children\":[3],\"translation\":[0.5,-1.5,1.5],\"rotation\":[2,2.5,5,4.5],\"scale\":[3,5.5,1],\"mesh\":1,\"extras\":{\"lightMaterial\":1,\"meshRenderer\":1}},{\"translation\":[0.5,11,12.5],\"rotation\":[3,1,2.5,1],\"scale\":[2.5,15.5,1.5],\"mesh\":2,\"extras\":{\"lightMaterial\":1,\"meshRenderer\":2}}]\n                   ", match[0]);
                      }));
                return Wonder_jest.test("test materials, textures, samplers, images", (function () {
                              var match = _prepareGameObject(state);
                              var match$1 = match[5];
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match$1[0][1]) + (",1]}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}}],\"textures\":[{\"sampler\":0,\"source\":0,\"name\":\"" + (String(match$1[1][1][1]) + "\"}],\"samplers\":[{\"wrapS\":10497,\"wrapT\":33071,\"magFilter\":9729,\"minFilter\":9728}],\n                 \"images\":[{\"bufferView\":12,\"mimeType\":\"image/png\"}]\n                   "))), match[0]);
                            }));
              }));
        describe("test share basic material", (function () {
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = BasicMaterialAPI$Wonderjs.createBasicMaterial(state$1);
                  var match$2 = _createGameObjectWithShareMaterial(match$1[1], GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent, match$1[0]);
                  var match$3 = _createGameObject1(match$2[0]);
                  var match$4 = match$3[4];
                  var transform2 = match$3[2][0];
                  var match$5 = _createGameObject3(match$3[0]);
                  var match$6 = match$5[4];
                  var state$2 = TransformAPI$Wonderjs.setTransformParent(transform2, match$5[2][0], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform2, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$2[2][0], match$5[0])));
                  var match$7 = GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  var match$8 = match$7[2];
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            match$2[4],
                            /* tuple */[
                              match$4[0],
                              match$4[1]
                            ],
                            /* tuple */[
                              match$6[0],
                              match$6[1]
                            ],
                            /* tuple */[
                              match$8[0],
                              match$8[1]
                            ]
                          ]
                        ];
                };
                Wonder_jest.test("test materials, textures, samplers, images", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match[2][1][1]) + ",1]}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}}],\"textures\":[{\"sampler\":0,\"source\":0}],\"samplers\":[{\"wrapS\":33071,\"wrapT\":10497,\"magFilter\":9729,\"minFilter\":9987}],\n                 \"images\":[{\"bufferView\":12,\"mimeType\":\"image/png\"}]\n                   "), match[0]);
                      }));
                return Wonder_jest.test("test extras->basicMaterials", (function () {
                              var match = _prepareGameObject(state);
                              var state$1 = match[0];
                              BasicMaterialTool$Wonderjs.getDefaultColor(state$1);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"extras\":{\"basicMaterials\":[{}],\n                   ", state$1);
                            }));
              }));
        describe("test share texture, share sampler, share source", (function () {
                var _createGameObjectWithShareTexture = function (texture, state) {
                  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
                  var material = match[1];
                  var state$1 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, texture, match[0]);
                  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(state$1);
                  var geometry = match$1[1];
                  var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
                  var meshRenderer = match$2[1];
                  var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
                  var gameObject = match$3[1];
                  var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0])));
                  var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$2);
                  var localPos = /* tuple */[
                    0.5,
                    11,
                    12.5
                  ];
                  var localRotation = /* tuple */[
                    3,
                    1,
                    2.5,
                    1
                  ];
                  var localScale = /* tuple */[
                    2.5,
                    15.5,
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
                            texture
                          ],
                          meshRenderer
                        ];
                };
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = _createTexture2(state$1);
                  var newTexture1 = match$1[1];
                  var match$2 = _createTexture2(match$1[0]);
                  var newTexture2 = match$2[1];
                  var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(newTexture2, match$1[2][0], match$2[0]);
                  var match$3 = _createGameObjectWithShareTexture(newTexture1, state$2);
                  var match$4 = match$3[4];
                  var match$5 = _createGameObjectWithShareTexture(newTexture1, match$3[0]);
                  var match$6 = match$5[4];
                  var transform2 = match$5[2][0];
                  var match$7 = _createGameObjectWithShareTexture(newTexture2, match$5[0]);
                  var match$8 = match$7[4];
                  var material3 = match$8[0];
                  var match$9 = _createGameObjectWithShareMaterial(material3, GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent, match$7[0]);
                  var state$3 = TransformAPI$Wonderjs.setTransformParent(transform2, match$7[2][0], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$9[2][0], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform2, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$3[2][0], match$9[0]))));
                  var match$10 = GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  var match$11 = match$10[2];
                  return /* tuple */[
                          state$3,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            /* tuple */[
                              match$4[0],
                              match$4[1]
                            ],
                            /* tuple */[
                              match$6[0],
                              match$6[1]
                            ],
                            /* tuple */[
                              material3,
                              match$8[1]
                            ],
                            match$9[4],
                            /* tuple */[
                              match$11[0],
                              match$11[1]
                            ]
                          ]
                        ];
                };
                Wonder_jest.test("test materials, textures, samplers, images", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":1}}}],\"textures\":[{\"sampler\":0,\"source\":0},{\"sampler\":0,\"source\":0}],\"samplers\":[{\"wrapS\":33071,\"wrapT\":10497,\"magFilter\":9729,\"minFilter\":9987}],\n                 \"images\":[{\"bufferView\":16,\"mimeType\":\"image/png\"}]\n                   ", match[0]);
                      }));
                describe("contract check", (function () {
                        var _prepareGameObject = function (state) {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var rootGameObject = match[1];
                          var state$1 = match[0];
                          var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                          var match$1 = ArrayBufferViewSourceTextureAPI$Wonderjs.createArrayBufferViewSourceTexture(state$1);
                          var texture = match$1[1];
                          var state$2 = ArrayBufferViewSourceTextureAPI$Wonderjs.setArrayBufferViewSourceTextureSource(texture, new Uint8Array(/* array */[]), match$1[0]);
                          var match$2 = _createGameObjectWithShareTexture(texture, state$2);
                          var match$3 = match$2[4];
                          var state$3 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$2[2][0], match$2[0]);
                          return /* tuple */[
                                  state$3,
                                  /* tuple */[
                                    rootGameObject,
                                    sceneGameObjectTransform
                                  ],
                                  /* tuple */[
                                    match$3[0],
                                    match$3[1]
                                  ]
                                ];
                        };
                        return Wonder_jest.test("should only has basicSourceTexture", (function () {
                                      var match = _prepareGameObject(state);
                                      var rootGameObject = match[1][0];
                                      var state$1 = match[0];
                                      TestTool$Wonderjs.openContractCheck(/* () */0);
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect map be basicSourceTexture", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(rootGameObject, "", state$1);
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("if has no maps, geometry should still generate texCoords data", (function () {
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = _createGameObject1(state$1);
                  var state$2 = GameObjectTool$Wonderjs.disposeGameObjectLightMaterialComponent(match$1[1], match$1[4][0], match$1[0]);
                  var state$3 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2][0], state$2);
                  return /* tuple */[
                          state$3,
                          rootGameObject
                        ];
                };
                return Wonder_jest.test("test meshes", (function () {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n            \"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0,\"NORMAL\":1, \"TEXCOORD_0\":2},\"indices\":3}]}]\n                   ", match[0]);
                            }));
              }));
        describe("test perspectiveCameraProjection", (function () {
                var _createBasicCameraViewPerspectiveCamera = function (state) {
                  var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state);
                  var perspectiveCameraProjection = match[1];
                  var match$1 = BasicCameraViewAPI$Wonderjs.createBasicCameraView(match[0]);
                  var state$1 = PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionAspect(perspectiveCameraProjection, 1.5, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFovy(perspectiveCameraProjection, 60, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionFar(perspectiveCameraProjection, 1000.5, PerspectiveCameraProjectionAPI$Wonderjs.setPerspectiveCameraProjectionNear(perspectiveCameraProjection, 0.1, match$1[0]))));
                  return /* tuple */[
                          state$1,
                          match$1[1],
                          /* tuple */[
                            perspectiveCameraProjection,
                            0.1,
                            1000.5,
                            60,
                            1.5
                          ]
                        ];
                };
                var _createCameraGameObject = function (state) {
                  var match = _createBasicCameraViewPerspectiveCamera(state);
                  var match$1 = match[2];
                  var perspectiveCameraProjection = match$1[0];
                  var basicCameraView = match[1];
                  var match$2 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                  var gameObject = match$2[1];
                  var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent(gameObject, basicCameraView, match$2[0]);
                  var state$2 = GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent(gameObject, perspectiveCameraProjection, state$1);
                  return /* tuple */[
                          state$2,
                          gameObject,
                          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$2),
                          /* tuple */[
                            basicCameraView,
                            /* tuple */[
                              perspectiveCameraProjection,
                              match$1[1],
                              match$1[2],
                              match$1[3],
                              match$1[4]
                            ]
                          ]
                        ];
                };
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = _createCameraGameObject(state$1);
                  var match$2 = match$1[3];
                  var match$3 = match$2[1];
                  var basicCameraView1 = match$2[0];
                  var match$4 = _createGameObject1(match$1[0]);
                  var match$5 = match$4[4];
                  var transform2 = match$4[2][0];
                  var match$6 = _createCameraGameObject(match$4[0]);
                  var match$7 = match$6[3];
                  var match$8 = match$7[1];
                  var state$2 = BasicCameraViewAPI$Wonderjs.activeBasicCameraView(basicCameraView1, match$6[0]);
                  var state$3 = TransformAPI$Wonderjs.setTransformParent(transform2, match$6[2], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform2, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], state$2)));
                  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  return /* tuple */[
                          state$3,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            match$5[0],
                            match$5[1]
                          ],
                          /* tuple */[
                            basicCameraView1,
                            /* tuple */[
                              basicCameraView1,
                              /* tuple */[
                                match$3[0],
                                match$3[1],
                                match$3[2],
                                match$3[3],
                                match$3[4]
                              ]
                            ],
                            /* tuple */[
                              match$7[0],
                              /* tuple */[
                                match$8[0],
                                match$8[1],
                                match$8[2],
                                match$8[3],
                                match$8[4]
                              ]
                            ]
                          ]
                        ];
                };
                Wonder_jest.test("test nodes", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n               \"nodes\":[{\"children\":[1,2]},{\"camera\":0,\"extras\":{\"basicCameraView\":0}},{\"children\":[3],\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"camera\":1,\"extras\":{\"basicCameraView\":1}}]\n                   ", match[0]);
                      }));
                return Wonder_jest.test("test cameras", (function () {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n               \"cameras\":[{\"type\":\"perspective\",\"perspective\":{\"aspectRatio\":1.5,\"zfar\":1000.5,\"znear\":0.1,\"yfov\":1.0471975511965976}},{\"type\":\"perspective\",\"perspective\":{\"aspectRatio\":1.5,\"zfar\":1000.5,\"znear\":0.1,\"yfov\":1.0471975511965976}}]\n                   ", match[0]);
                            }));
              }));
        describe("test basicCameraView", (function () {
                var _createCameraGameObject = function (state) {
                  var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state);
                  var perspectiveCameraProjection = match[2];
                  var basicCameraView = match[1];
                  var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                  var gameObject = match$1[1];
                  var state$1 = GameObjectAPI$Wonderjs.addGameObjectBasicCameraViewComponent(gameObject, basicCameraView, match$1[0]);
                  var state$2 = GameObjectAPI$Wonderjs.addGameObjectPerspectiveCameraProjectionComponent(gameObject, perspectiveCameraProjection, state$1);
                  return /* tuple */[
                          state$2,
                          gameObject,
                          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$2),
                          /* tuple */[
                            basicCameraView,
                            perspectiveCameraProjection
                          ]
                        ];
                };
                describe("test dispose case", (function () {
                        var _prepareGameObject = function (state) {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var rootGameObject = match[1];
                          var state$1 = match[0];
                          var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                          var match$1 = _createCameraGameObject(state$1);
                          var match$2 = match$1[3];
                          var match$3 = _createGameObject1(match$1[0]);
                          var match$4 = match$3[4];
                          var state$2 = GameObjectTool$Wonderjs.disposeGameObject(match$1[1], match$3[0]);
                          var match$5 = _createCameraGameObject(state$2);
                          var match$6 = match$5[3];
                          var basicCameraView3 = match$6[0];
                          var match$7 = _createCameraGameObject(match$5[0]);
                          var match$8 = match$7[3];
                          var state$3 = BasicCameraViewAPI$Wonderjs.activeBasicCameraView(basicCameraView3, match$7[0]);
                          var state$4 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$7[2], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$5[2], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$3[2][0], state$3)));
                          return /* tuple */[
                                  state$4,
                                  /* tuple */[
                                    rootGameObject,
                                    sceneGameObjectTransform
                                  ],
                                  /* tuple */[
                                    match$4[0],
                                    match$4[1]
                                  ],
                                  /* tuple */[
                                    basicCameraView3,
                                    /* tuple */[
                                      match$2[0],
                                      match$2[1]
                                    ],
                                    /* tuple */[
                                      basicCameraView3,
                                      match$6[1]
                                    ],
                                    /* tuple */[
                                      match$8[0],
                                      match$8[1]
                                    ]
                                  ]
                                ];
                        };
                        Wonder_jest.test("test nodes", (function () {
                                var match = _prepareGameObject(state);
                                var match$1 = match[3];
                                var match$2 = match$1[3];
                                var match$3 = match$1[2];
                                return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n               \"nodes\":[{\"children\":[1,2,3]},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"camera\":" + (String(match$3[1]) + (",\"extras\":{\"basicCameraView\":" + (String(match$3[0]) + ("}},{\"camera\":" + (String(match$2[1]) + (",\"extras\":{\"basicCameraView\":" + (String(match$2[0]) + "}}]\n                   "))))))), match[0]);
                              }));
                        return Wonder_jest.test("test extras", (function () {
                                      var match = _prepareGameObject(state);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n              \"extras\":{\"meshRenderers\":[{\"drawMode\":4}],\"basicCameraViews\":[{\"isActive\":true},{\"isActive\":false}]}\n                   ", match[0]);
                                    }));
                      }));
                describe("contract check", (function () {
                        var _prepareGameObject = function (state) {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var rootGameObject = match[1];
                          var state$1 = match[0];
                          var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                          var match$1 = _createCameraGameObject(state$1);
                          var match$2 = match$1[3];
                          var basicCameraView1 = match$2[0];
                          var match$3 = _createGameObject1(match$1[0]);
                          var match$4 = match$3[4];
                          var match$5 = _createCameraGameObject(match$3[0]);
                          var match$6 = match$5[3];
                          var basicCameraView3 = match$6[0];
                          var state$2 = BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(basicCameraView3, true, BasicCameraViewAPI$Wonderjs.setActiveBasicCameraView(basicCameraView1, true, match$5[0]));
                          var state$3 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$5[2], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$3[2][0], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], state$2)));
                          return /* tuple */[
                                  state$3,
                                  /* tuple */[
                                    rootGameObject,
                                    sceneGameObjectTransform
                                  ],
                                  /* tuple */[
                                    match$4[0],
                                    match$4[1]
                                  ],
                                  /* tuple */[
                                    basicCameraView3,
                                    /* tuple */[
                                      basicCameraView1,
                                      match$2[1]
                                    ],
                                    /* tuple */[
                                      basicCameraView3,
                                      match$6[1]
                                    ]
                                  ]
                                ];
                        };
                        return Wonder_jest.test("should has at most one active", (function () {
                                      var match = _prepareGameObject(state);
                                      var rootGameObject = match[1][0];
                                      var state$1 = match[0];
                                      return Wonder_jest.Expect[/* toThrowMessage */20]("expect has at most one active", Wonder_jest.Expect[/* expect */0]((function () {
                                                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(rootGameObject, "\n                   ", state$1);
                                                      })));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test arcballCameraController", (function () {
                var _createCameraGameObject = function (isBindEvent, state) {
                  var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                  var cameraController = match[3][0];
                  var match$1 = ArcballCameraControllerTool$Wonderjs.setArcballCameraControllerData(cameraController, match[0]);
                  var match$2 = match$1[1];
                  var state$1 = match$1[0];
                  var state$2 = isBindEvent ? ArcballCameraControllerAPI$Wonderjs.bindArcballCameraControllerEvent(cameraController, state$1) : ArcballCameraControllerAPI$Wonderjs.unbindArcballCameraControllerEvent(cameraController, state$1);
                  return /* tuple */[
                          state$2,
                          match[2],
                          /* tuple */[
                            match$2[0],
                            match$2[1],
                            match$2[2],
                            match$2[3],
                            match$2[4],
                            match$2[5],
                            match$2[6],
                            match$2[7],
                            match$2[8],
                            match$2[9],
                            isBindEvent
                          ]
                        ];
                };
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = _createCameraGameObject(false, state$1);
                  var match$2 = match$1[2];
                  var match$3 = _createCameraGameObject(true, match$1[0]);
                  var match$4 = match$3[2];
                  var match$5 = _createGameObject1(match$3[0]);
                  var state$2 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$5[2][0], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$3[1], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[1], match$5[0])));
                  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            /* tuple */[
                              match$2[0],
                              match$2[1],
                              match$2[2],
                              match$2[3],
                              match$2[4],
                              match$2[5],
                              match$2[6],
                              match$2[7],
                              match$2[8],
                              match$2[9],
                              match$2[10]
                            ],
                            /* tuple */[
                              match$4[0],
                              match$4[1],
                              match$4[2],
                              match$4[3],
                              match$4[4],
                              match$4[5],
                              match$4[6],
                              match$4[7],
                              match$4[8],
                              match$4[9],
                              match$4[10]
                            ]
                          ]
                        ];
                };
                Wonder_jest.test("test nodes", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"nodes\":[{\"children\":[1,2,3]},{\"camera\":0,\"extras\":{\"cameraController\":0,\"basicCameraView\":0}},{\"camera\":1,\"extras\":{\"cameraController\":1,\"basicCameraView\":1}},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}}]\n                   ", match[0]);
                      }));
                return Wonder_jest.test("test arcballCameraController", (function () {
                              var match = _prepareGameObject(state);
                              var match$1 = match[2];
                              var match$2 = match$1[1];
                              var match$3 = match$1[0];
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n              \"extras\":{\"arcballCameraControllers\":[{\"distance\":" + (String(match$3[0]) + (",\"minDistance\": " + (String(match$3[1]) + (",\"phi\":" + (String(match$3[2]) + (",\"theta\":" + (String(match$3[3]) + (",\"thetaMargin\":" + (String(match$3[4]) + (",\"target\":[" + (String(match$3[5]) + ("],\"moveSpeedX\":" + (String(match$3[6]) + (",\"moveSpeedY\":" + (String(match$3[7]) + (",\"rotateSpeed\":" + (String(match$3[8]) + (",\"wheelSpeed\":" + (String(match$3[9]) + (",\"isBindEvent\":" + (String(match$3[10]) + ("},\n              {\"distance\":" + (String(match$2[0]) + (",\"minDistance\": " + (String(match$2[1]) + (",\"phi\":" + (String(match$2[2]) + (",\"theta\":" + (String(match$2[3]) + (",\"thetaMargin\":" + (String(match$2[4]) + (",\"target\":[" + (String(match$2[5]) + ("],\"moveSpeedX\":" + (String(match$2[6]) + (",\"moveSpeedY\":" + (String(match$2[7]) + (",\"rotateSpeed\":" + (String(match$2[8]) + (",\"wheelSpeed\":" + (String(match$2[9]) + (",\"isBindEvent\":" + (String(match$2[10]) + "}]\n                      "))))))))))))))))))))))))))))))))))))))))))), match[0]);
                            }));
              }));
        describe("test light", (function () {
                var _createDirectionLightGameObject = function (state) {
                  var match = DirectionLightTool$Wonderjs.createGameObject(state);
                  var light = match[2];
                  var gameObject = match[1];
                  var color = /* array */[
                    0,
                    0,
                    1
                  ];
                  var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(light, 1.5, DirectionLightAPI$Wonderjs.setDirectionLightColor(light, color, match[0]));
                  return /* tuple */[
                          state$1,
                          gameObject,
                          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1),
                          /* tuple */[
                            light,
                            /* tuple */[
                              color,
                              1.5
                            ]
                          ]
                        ];
                };
                var _createPointLightGameObject = function (state) {
                  var match = PointLightTool$Wonderjs.createGameObject(state);
                  var light = match[2];
                  var gameObject = match[1];
                  var color = /* array */[
                    1,
                    0,
                    0.5
                  ];
                  var state$1 = PointLightAPI$Wonderjs.setPointLightRange(light, 32, PointLightAPI$Wonderjs.setPointLightQuadratic(light, 6.5, PointLightAPI$Wonderjs.setPointLightLinear(light, 5, PointLightAPI$Wonderjs.setPointLightConstant(light, 4.5, PointLightAPI$Wonderjs.setPointLightIntensity(light, 3.5, PointLightAPI$Wonderjs.setPointLightColor(light, color, match[0]))))));
                  return /* tuple */[
                          state$1,
                          gameObject,
                          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1),
                          /* tuple */[
                            light,
                            /* tuple */[
                              color,
                              3.5,
                              4.5,
                              5,
                              6.5,
                              32
                            ]
                          ]
                        ];
                };
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var ambientLightColor = /* array */[
                    0.5,
                    0.5,
                    1
                  ];
                  var state$2 = SceneAPI$Wonderjs.setAmbientLightColor(ambientLightColor, state$1);
                  var match$1 = _createDirectionLightGameObject(state$2);
                  var match$2 = match$1[3];
                  var match$3 = match$2[1];
                  var match$4 = _createGameObject1(match$1[0]);
                  var match$5 = match$4[4];
                  var transform2 = match$4[2][0];
                  var match$6 = _createPointLightGameObject(match$4[0]);
                  var match$7 = match$6[3];
                  var match$8 = match$7[1];
                  var state$3 = TransformAPI$Wonderjs.setTransformParent(transform2, match$6[2], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform2, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], match$6[0])));
                  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  return /* tuple */[
                          state$3,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            match$5[0],
                            match$5[1]
                          ],
                          /* tuple */[
                            ambientLightColor,
                            /* tuple */[
                              match$2[0],
                              /* tuple */[
                                match$3[0],
                                match$3[1]
                              ]
                            ],
                            /* tuple */[
                              match$7[0],
                              /* tuple */[
                                match$8[0],
                                match$8[1],
                                match$8[2],
                                match$8[3],
                                match$8[4],
                                match$8[5]
                              ]
                            ]
                          ]
                        ];
                };
                Wonder_jest.test("test extensions", (function () {
                        var match = _prepareGameObject(state);
                        var match$1 = match[3];
                        var match$2 = match$1[2][1];
                        var match$3 = match$1[1][1];
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n     \"extensions\": {\n       \"KHR_lights\": {\n         \"lights\": [\n           {\n             \"intensity\": " + (String(match$3[1]) + (",\n             \"color\": [" + (String(match$3[0]) + ("],\n             \"type\": \"directional\"\n           },\n           {\n             \"range\": " + (String(match$2[5]) + (",\n             \"quadraticAttenuation\": " + (String(match$2[4]) + (",\n             \"linearAttenuation\": " + (String(match$2[3]) + (",\n             \"constantAttenuation\": " + (String(match$2[2]) + (",\n             \"intensity\": " + (String(match$2[1]) + (",\n             \"color\": [" + (String(match$2[0]) + ("],\n             \"type\": \"point\"\n           },\n           {\n             \"color\": [" + (String(match$1[0]) + "],\n             \"type\": \"ambient\"\n           }\n         ]\n       }\n     },\n                   "))))))))))))))))), match[0]);
                      }));
                Wonder_jest.test("test scenes", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"scenes\":[{\"extensions\":{\"KHR_lights\":{\"light\":2}},\"nodes\":[0],\"extras\":{}}]\n                   ", match[0]);
                      }));
                Wonder_jest.test("test nodes", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n     \"nodes\":[{\"children\":[1,2]},{\"extensions\":{\"KHR_lights\":{\"light\":0}}},{\"children\":[3],\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"extensions\":{\"KHR_lights\":{\"light\":1}}}]\n                   ", match[0]);
                      }));
                Wonder_jest.testPromise("test directionLight data", (function () {
                        var match = _prepareGameObject(state);
                        var match$1 = match[3][1][1];
                        var intensity1 = match$1[1];
                        var color1 = match$1[0];
                        return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDirectionLightData(param[2], param[0])), /* array */[/* tuple */[
                                                    color1,
                                                    intensity1
                                                  ]]);
                                    }), match[0]);
                      }));
                return Wonder_jest.testPromise("test pointLight data", (function () {
                              var match = _prepareGameObject(state);
                              var match$1 = match[3][2][1];
                              var range3 = match$1[5];
                              var quadratic3 = match$1[4];
                              var linear3 = match$1[3];
                              var constant3 = match$1[2];
                              var intensity3 = match$1[1];
                              var color3 = match$1[0];
                              return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllPointLightData(param[2], param[0])), /* array */[/* tuple */[
                                                          color3,
                                                          intensity3,
                                                          constant3,
                                                          linear3,
                                                          quadratic3,
                                                          range3
                                                        ]]);
                                          }), match[0]);
                            }));
              }));
        describe("test drawMode and basicMaterial", (function () {
                var _createBasicMaterialGameObject = function (state) {
                  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
                  var material = match[1];
                  var color = /* array */[
                    0.5,
                    0.5,
                    1
                  ];
                  var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, match[0]);
                  var match$1 = GeometryTool$Wonderjs.createGameObjectAndSetPointData(state$1);
                  var gameObject = match$1[1];
                  var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
                  var meshRenderer = match$2[1];
                  var state$2 = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(meshRenderer, /* Lines */1, match$2[0]);
                  var state$3 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, state$2));
                  var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$3);
                  return /* tuple */[
                          state$3,
                          gameObject,
                          transform,
                          /* tuple */[
                            material,
                            color
                          ],
                          /* tuple */[
                            meshRenderer,
                            /* Lines */1
                          ]
                        ];
                };
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = _createBasicMaterialGameObject(state$1);
                  var match$2 = match$1[4];
                  var match$3 = match$1[3];
                  var match$4 = _createGameObject1(match$1[0]);
                  var meshRenderer2 = match$4[5];
                  var match$5 = match$4[4];
                  var state$2 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$4[2][0], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], match$4[0]));
                  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            /* tuple */[
                              match$3[0],
                              match$3[1]
                            ],
                            /* tuple */[
                              match$5[0],
                              match$5[1]
                            ]
                          ],
                          /* tuple */[
                            /* tuple */[
                              match$2[0],
                              match$2[1]
                            ],
                            /* tuple */[
                              meshRenderer2,
                              MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(meshRenderer2, state$2)
                            ]
                          ]
                        ];
                };
                Wonder_jest.test("test extras->basicMaterials and meshRenderers", (function () {
                        var match = _prepareGameObject(state);
                        var match$1 = match[3];
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n      \"extras\":{\"basicMaterials\":[{\"colorFactor\":[" + (String(match[2][0][1]) + (",1]}],\"meshRenderers\":[{\"drawMode\":" + (String(match$1[0][1]) + ("},{\"drawMode\":" + (String(match$1[1][1]) + "}]}\n                   "))))), match[0]);
                      }));
                Wonder_jest.test("test nodes", (function () {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n      \"nodes\":[{\"children\":[1,2]},{\"mesh\":0,\"extras\":{\"basicMaterial\":0,\"meshRenderer\":0}},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":1,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":1}}]\n                   ", match[0]);
                      }));
                return Wonder_jest.test("test materials", (function () {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match[2][1][1]) + ",1]}}]\n                   "), match[0]);
                            }));
              }));
        describe("test toDataURL", (function () {
                var _prepareGameObject = function (state) {
                  var state$1 = state[0];
                  var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                  GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match = _createGameObjectWithMap("1", "1.jpg", state$1);
                  var match$1 = _createGameObjectWithMap("2", "2.png", match[0]);
                  var state$2 = SceneAPI$Wonderjs.addSceneChild(match$1[2], SceneAPI$Wonderjs.addSceneChild(match[2], match$1[0]));
                  var match$2 = GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  return /* tuple */[
                          state$2,
                          rootGameObject,
                          match$2[0]
                        ];
                };
                return Wonder_jest.test("pass mimeType to toDataURL based on source.name", (function () {
                              var match = _prepareGameObject(state);
                              var canvas = match[2];
                              GenerateSceneGraphAPI$Wonderjs.generateGLBData(match[1], SparseMapService$WonderCommonlib.createEmpty(/* () */0), match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getArgs(Sinon.getCall(0, canvas.toDataURL)),
                                              Sinon.getArgs(Sinon.getCall(1, canvas.toDataURL))
                                            ]), /* tuple */[
                                          /* :: */[
                                            "image/jpeg",
                                            /* [] */0
                                          ],
                                          /* :: */[
                                            "image/png",
                                            /* [] */0
                                          ]
                                        ]);
                            }));
              }));
        describe("test image name", (function () {
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var textureName = "texture_name";
                  var imageName = "image_name";
                  var match$1 = _createGameObjectWithMap(textureName, imageName, state$1);
                  var state$2 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], match$1[0]);
                  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          match$1[1],
                          /* tuple */[
                            textureName,
                            imageName
                          ]
                        ];
                };
                return Wonder_jest.testPromise("generate wdb->image name should equal the image name before assemble wdb", (function () {
                              var match = _prepareGameObject(state);
                              var imageName = match[3][1];
                              return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                            var state = param[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (map) {
                                                                  return ImageUtils$Wonderjs.getImageName(BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(map, state));
                                                                }))), /* array */[imageName]);
                                          }), match[0]);
                            }));
              }));
        describe("optimize", (function () {
                describe("get image base64 from map", (function () {
                        var _prepareGameObject = function (state) {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var rootGameObject = match[1];
                          var state$1 = match[0];
                          var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                          var match$1 = _createGameObject1(state$1);
                          var match$2 = match$1[4];
                          var match$3 = match$1[2];
                          var match$4 = match$3[1];
                          var transform1 = match$3[0];
                          var match$5 = _createGameObject2(match$1[0]);
                          var match$6 = match$5[4];
                          var match$7 = match$6[2];
                          var match$8 = match$6[1];
                          var match$9 = match$5[3];
                          var match$10 = match$9[1];
                          var match$11 = match$5[2];
                          var match$12 = match$11[1];
                          var transform2 = match$11[0];
                          var match$13 = _createGameObject3(match$5[0]);
                          var match$14 = match$13[4];
                          var match$15 = match$14[2];
                          var match$16 = match$13[3];
                          var match$17 = match$16[1];
                          var match$18 = match$13[2];
                          var match$19 = match$18[1];
                          var transform3 = match$18[0];
                          var state$2 = TransformAPI$Wonderjs.setTransformParent(transform2, transform3, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform2, TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, transform1, match$13[0])));
                          GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                          return /* tuple */[
                                  state$2,
                                  /* tuple */[
                                    rootGameObject,
                                    sceneGameObjectTransform
                                  ],
                                  /* tuple */[
                                    match$1[1],
                                    match$5[1],
                                    match$13[1]
                                  ],
                                  /* tuple */[
                                    /* tuple */[
                                      transform1,
                                      /* tuple */[
                                        match$4[0],
                                        match$4[1],
                                        match$4[2]
                                      ]
                                    ],
                                    /* tuple */[
                                      transform2,
                                      /* tuple */[
                                        match$12[0],
                                        match$12[1],
                                        match$12[2]
                                      ]
                                    ],
                                    /* tuple */[
                                      transform3,
                                      /* tuple */[
                                        match$19[0],
                                        match$19[1],
                                        match$19[2]
                                      ]
                                    ]
                                  ],
                                  /* tuple */[
                                    match$1[3],
                                    /* tuple */[
                                      match$9[0],
                                      /* tuple */[
                                        match$10[0],
                                        match$10[1],
                                        match$10[2],
                                        match$10[3]
                                      ]
                                    ],
                                    /* tuple */[
                                      match$16[0],
                                      /* tuple */[
                                        match$17[0],
                                        match$17[1],
                                        match$17[2],
                                        match$17[3]
                                      ]
                                    ]
                                  ],
                                  /* tuple */[
                                    /* tuple */[
                                      match$2[0],
                                      match$2[1]
                                    ],
                                    /* tuple */[
                                      match$6[0],
                                      /* tuple */[
                                        match$8[0],
                                        match$8[1]
                                      ],
                                      /* tuple */[
                                        match$7[0],
                                        match$7[1],
                                        match$7[2]
                                      ]
                                    ],
                                    /* tuple */[
                                      match$14[0],
                                      match$14[1],
                                      /* tuple */[
                                        match$15[0],
                                        match$15[1],
                                        match$15[2]
                                      ]
                                    ]
                                  ],
                                  /* tuple */[
                                    match$1[5],
                                    match$5[5],
                                    match$13[5]
                                  ]
                                ];
                        };
                        return Wonder_jest.test("test images", (function () {
                                      var match = _prepareGameObject(state);
                                      var match$1 = match[5];
                                      var uint8ArrayData1_001 = new Uint8Array(/* array */[1]);
                                      var uint8ArrayData1 = /* tuple */[
                                        "image/png",
                                        uint8ArrayData1_001
                                      ];
                                      var uint8ArrayData2_001 = new Uint8Array(/* array */[2]);
                                      var uint8ArrayData2 = /* tuple */[
                                        "image/jpeg",
                                        uint8ArrayData2_001
                                      ];
                                      var imageUint8ArrayMap = SparseMapService$WonderCommonlib.set(match$1[2][1], uint8ArrayData2, SparseMapService$WonderCommonlib.set(match$1[1][1][0], uint8ArrayData1, SparseMapService$WonderCommonlib.createEmpty(/* () */0)));
                                      return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObjectWithImageUint8ArrayDataMap(match[1][0], "\n                \"images\":[{\"bufferView\":12,\"mimeType\":\"image/png\"},{\"bufferView\":13,\"mimeType\":\"image/jpeg\"}]\n                   ", imageUint8ArrayMap, match[0]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("fix bug", (function () {
                var _createBasicMaterialGameObjectWithShareGeometry = function (geometry, state) {
                  var match = BasicMaterialAPI$Wonderjs.createBasicMaterial(state);
                  var material = match[1];
                  var color = /* array */[
                    0.5,
                    0.5,
                    1
                  ];
                  var state$1 = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, match[0]);
                  var match$1 = MeshRendererAPI$Wonderjs.createMeshRenderer(state$1);
                  var match$2 = GameObjectAPI$Wonderjs.createGameObject(match$1[0]);
                  var gameObject = match$2[1];
                  var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, match$1[1], GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, geometry, GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent(gameObject, material, match$2[0])));
                  var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$2);
                  return /* tuple */[
                          state$2,
                          gameObject,
                          transform,
                          /* tuple */[
                            material,
                            color
                          ]
                        ];
                };
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(state$1);
                  var geometry = match$1[1];
                  var match$2 = _createBasicMaterialGameObjectWithShareGeometry(geometry, match$1[0]);
                  var match$3 = _createGameObjectWithShareGeometry(geometry, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent, match$2[0]);
                  var match$4 = match$3[4];
                  var material2 = match$4[0];
                  var match$5 = _createTexture1(match$3[0]);
                  var state$2 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material2, match$5[1][0], match$5[0]);
                  var state$3 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$3[2][0], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$2[2], state$2));
                  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                  return /* tuple */[
                          state$3,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            match$2[1],
                            match$2[3][0]
                          ],
                          /* tuple */[
                            match$3[1],
                            material2,
                            match$4[1]
                          ]
                        ];
                };
                return Wonder_jest.testPromise("\n          1.create two gameObjects with one geometry and one basic material(set color to c1) and one light material(set color to c2 and set map);\n          2.generate wdb;\n          3.assemble wdb;\n\n          the assembled->rootGameObject->light material->diffuseColor should be c2\n          ", (function () {
                              var match = _prepareGameObject(state);
                              var diffuseColor2 = match[3][2];
                              return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                            var state = param[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2], state).map((function (material) {
                                                                  return LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(material, state);
                                                                }))), /* array */[diffuseColor2]);
                                          }), match[0]);
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
