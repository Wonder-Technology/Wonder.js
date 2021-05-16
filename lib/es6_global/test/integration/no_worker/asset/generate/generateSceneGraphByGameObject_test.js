

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$Wonderjs from "../tool/GLBTool.js";
import * as GLTFTool$Wonderjs from "../tool/GLTFTool.js";
import * as SceneAPI$Wonderjs from "../../../../../src/api/SceneAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as ImageUtils$Wonderjs from "../../../../../src/asset/utils/ImageUtils.js";
import * as ScriptTool$Wonderjs from "../../../../tool/service/script/ScriptTool.js";
import * as SkyboxTool$Wonderjs from "../../job/tool/SkyboxTool.js";
import * as ConvertTool$Wonderjs from "../tool/ConvertTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as GeometryTool$Wonderjs from "../../../../tool/service/geometry/GeometryTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as ExecIMGUITool$Wonderjs from "../../../../tool/service/imgui/ExecIMGUITool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../../../../../src/service/atom/OptionService.js";
import * as PointLightAPI$Wonderjs from "../../../../../src/api/light/PointLightAPI.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as PointLightTool$Wonderjs from "../../../../tool/service/light/PointLightTool.js";
import * as BoxGeometryTool$Wonderjs from "../../../../tool/service/geometry/BoxGeometryTool.js";
import * as ExtendIMGUITool$Wonderjs from "../../../../tool/service/imgui/ExtendIMGUITool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as BasicMaterialTool$Wonderjs from "../../../../tool/service/material/BasicMaterialTool.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../src/api/light/DirectionLightAPI.js";
import * as SetAssetIMGUITool$Wonderjs from "../../../../tool/service/imgui/SetAssetIMGUITool.js";
import * as BasicCameraViewAPI$Wonderjs from "../../../../../src/api/camera/BasicCameraViewAPI.js";
import * as DirectionLightTool$Wonderjs from "../../../../tool/service/light/DirectionLightTool.js";
import * as AssembleWDBSystemTool$Wonderjs from "../tool/AssembleWDBSystemTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as GenerateSceneGraphAPI$Wonderjs from "../../../../../src/api/asset/GenerateSceneGraphAPI.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as FlyCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/FlyCameraControllerAPI.js";
import * as FlyCameraControllerTool$Wonderjs from "../../../../tool/service/camera_controller/FlyCameraControllerTool.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as ArcballCameraControllerTool$Wonderjs from "../../../../tool/service/camera_controller/ArcballCameraControllerTool.js";
import * as GenerateSceneGraphSystemTool$Wonderjs from "../tool/GenerateSceneGraphSystemTool.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as ArrayBufferViewSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/ArrayBufferViewSourceTextureAPI.js";

Wonder_jest.describe("generateSceneGraph by gameObject", (function (param) {
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
          var state$2 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry, indices1, GeometryAPI$Wonderjs.setGeometryNormals(geometry, normals1, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry, texCoords1, GeometryAPI$Wonderjs.setGeometryVertices(geometry, vertices1, state$1))));
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
          var state$2 = GeometryAPI$Wonderjs.setGeometryIndices16(geometry, indices1, GeometryAPI$Wonderjs.setGeometryNormals(geometry, normals1, GeometryAPI$Wonderjs.setGeometryTexCoords(geometry, texCoords1, GeometryAPI$Wonderjs.setGeometryVertices(geometry, vertices1, state$1))));
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
        Wonder_jest.beforeAllPromise(undefined, (function (param) {
                return ConvertTool$Wonderjs.buildFakeLoadImage();
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(50000, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return ConvertTool$Wonderjs.setFakeTransformCount(50);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test basic", (function (param) {
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
                Wonder_jest.test("test nodes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"nodes\":[{\"children\":[1,2]},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"children\":[3],\"translation\":[0.5,-1.5,1.5],\"rotation\":[2,2.5,5,4.5],\"scale\":[3,5.5,1],\"mesh\":1,\"extras\":{\"lightMaterial\":1,\"meshRenderer\":1}},{\"translation\":[2.5,-2.5,0.5],\"rotation\":[2,3.5,5,4.5],\"scale\":[3,8.5,1],\"mesh\":2,\"extras\":{\"lightMaterial\":2,\"meshRenderer\":2}}]\n          ", match[0]);
                      }));
                Wonder_jest.test("test meshes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0,\"NORMAL\":1,\"TEXCOORD_0\":2},\"indices\":3}]},{\"primitives\":[{\"attributes\":{\"POSITION\":4,\"NORMAL\":5,\"TEXCOORD_0\":6},\"indices\":7}]},{\"primitives\":[{\"attributes\":{\"POSITION\":8,\"NORMAL\":9,\"TEXCOORD_0\":10},\"indices\":11}]}]\n                ", match[0]);
                      }));
                Wonder_jest.test("test meshRenderers", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n\"extras\":{\"meshRenderers\":[{\"isRen\nder\":true,\"drawMode\":4},{\"isRender\":true,\"drawMode\":4},{\"isRender\":true,\"drawMode\":4}]}\n                ", match[0]);
                      }));
                Wonder_jest.test("test materials", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n              \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match[5][0][1]) + ",1]}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":1}}}]\n                "), match[0]);
                      }));
                Wonder_jest.test("test textures and samplers and images", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n  \"textures\":[{\"extras\":{\n        \"flipY\": true,\n        \"format\": 1,\n        \"type_\": 0\n      },\"sampler\":0,\"source\":0,\"name\":\"" + (String(match[5][1][1][1]) + "\"},{\"extras\":{\n        \"flipY\": true,\n        \"format\": 1,\n        \"type_\": 0\n      },\"sampler\":1,\"source\":1}],\"samplers\":[{\"wrapS\":10497,\"wrapT\":33071,\"magFilter\":9729,\"minFilter\":9728},{\"wrapS\":33071,\"wrapT\":10497,\"magFilter\":9729,\"minFilter\":9987}],\"images\":[{\"bufferView\":12,\"mimeType\":\"image/png\"},{\"bufferView\":13,\"mimeType\":\"image/png\"}]\n                "), match[0]);
                      }));
                Wonder_jest.test("test bufferViews", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n\"bufferViews\":[{\"buffer\":0,\"byteOffset\":0,\"byteLength\":288},{\"buffer\":0,\"byteOffset\":288,\"byteLength\":288},{\"buffer\":0,\"byteOffset\":576,\"byteLength\":192},{\"buffer\":0,\"byteOffset\":768,\"byteLength\":72},{\"buffer\":0,\"byteOffset\":840,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":876,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":912,\"byteLength\":24},{\"buffer\":0,\"byteOffset\":936,\"byteLength\":6},{\"buffer\":0,\"byteOffset\":944,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":980,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":1016,\"byteLength\":24},{\"buffer\":0,\"byteOffset\":1040,\"byteLength\":6},{\"buffer\":0,\"byteOffset\":1048,\"byteLength\":227},{\"buffer\":0,\"byteOffset\":1276,\"byteLength\":167}]\n                ", match[0]);
                      }));
                return Wonder_jest.describe("test buffer", (function (param) {
                              return Wonder_jest.testPromise("test data", undefined, (function (param) {
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
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2][0], param[0])), /* array */[
                                                                      /* tuple */[
                                                                        "geometry_0",
                                                                        /* tuple */[
                                                                          GLTFTool$Wonderjs.getBoxMainVertices(/* () */0),
                                                                          GLTFTool$Wonderjs.getBoxMainNormals(/* () */0),
                                                                          GLTFTool$Wonderjs.getBoxMainTexCoords(/* () */0),
                                                                          Caml_option.some(GLTFTool$Wonderjs.getBoxMainIndices(/* () */0)),
                                                                          undefined
                                                                        ]
                                                                      ],
                                                                      /* tuple */[
                                                                        "geometry_1",
                                                                        /* tuple */[
                                                                          vertices2,
                                                                          normals2,
                                                                          texCoords2,
                                                                          Caml_option.some(indices2),
                                                                          undefined
                                                                        ]
                                                                      ],
                                                                      /* tuple */[
                                                                        "geometry_2",
                                                                        /* tuple */[
                                                                          vertices3,
                                                                          normals3,
                                                                          texCoords3,
                                                                          Caml_option.some(indices3),
                                                                          undefined
                                                                        ]
                                                                      ]
                                                                    ]);
                                                        }), match[0]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test imgui", (function (param) {
                Wonder_jest.describe("test execData", (function (param) {
                        Wonder_jest.describe("test one exec func data", (function (param) {
                                var _prepareGameObject = function (state) {
                                  var execFunc = function (customData, imguiAPIJsObj, state) {
                                    var imageFunc = imguiAPIJsObj.image;
                                    return imageFunc(customData[0], customData[1], state);
                                  };
                                  var state$1 = ExecIMGUITool$Wonderjs.addExecFuncData(state[0], undefined, /* tuple */[
                                        1,
                                        "cc"
                                      ], undefined, Caml_option.some(execFunc), /* () */0);
                                  var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                  return /* tuple */[
                                          match[0],
                                          match[1]
                                        ];
                                };
                                return Wonder_jest.test("test", (function (param) {
                                              var match = _prepareGameObject(state);
                                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"extras\":{\"imgui\":{\"assetData\":{},\"extendData\":{\"customControlData\":{\"funcMap\":\"{}\"},\"skinData\":{\"allSkinDataMap\":\"{}\"}},\"execData\":{\"execFuncDataArr\":[{\"execFunc\":\"function(customData,imguiAPIJsObj,state){\\nvarimageFunc=imguiAPIJsObj.image;\\nreturnimageFunc(customData[0],customData[1],state);\\n}\",\"customData\":\"[1,\\\"cc\\\"]\",\"execOrder\":0,\"name\":\"exec\"}]}}\n          ", match[0]);
                                            }));
                              }));
                        return Wonder_jest.describe("test two exec func data", (function (param) {
                                      var _prepareGameObject = function (state) {
                                        var execFunc1 = function (customData, imguiAPIJsObj, state) {
                                          var imageFunc = imguiAPIJsObj.image;
                                          return imageFunc(customData[0], customData[1], state);
                                        };
                                        var execFunc2 = function (customData, imguiAPIJsObj, state) {
                                          return state;
                                        };
                                        var __x = ExecIMGUITool$Wonderjs.addExecFuncData(state[0], "e1", /* tuple */[
                                              1,
                                              "cc"
                                            ], 2, Caml_option.some(execFunc1), /* () */0);
                                        var state$1 = ExecIMGUITool$Wonderjs.addExecFuncData(__x, "e2", -1, 0, Caml_option.some(execFunc2), /* () */0);
                                        var match = GameObjectAPI$Wonderjs.createGameObject(state$1);
                                        return /* tuple */[
                                                match[0],
                                                match[1]
                                              ];
                                      };
                                      return Wonder_jest.test("test", (function (param) {
                                                    var match = _prepareGameObject(state);
                                                    return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"extras\":{\"imgui\":{\"assetData\":{},\"extendData\":{\"customControlData\":{\"funcMap\":\"{}\"},\"skinData\":{\"allSkinDataMap\":\"{}\"}},\"execData\":{\"execFuncDataArr\":[{\"execFunc\":\"function(customData,imguiAPIJsObj,state){\\nreturnstate;\\n}\",\"customData\":\"-1\",\"execOrder\":0,\"name\":\"e2\"},{\"execFunc\":\"function(customData,imguiAPIJsObj,state){\\nvarimageFunc=imguiAPIJsObj.image;\\nreturnimageFunc(customData[0],customData[1],state);\\n}\",\"customData\":\"[1,\\\"cc\\\"]\",\"execOrder\":2,\"name\":\"e1\"}]}}}\n          ", match[0]);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test extendData", (function (param) {
                        var _prepareGameObject = function (state) {
                          var match = ExtendIMGUITool$Wonderjs.addExtendData(state[0]);
                          var state$1 = ExecIMGUITool$Wonderjs.addExecFuncData(match[0], undefined, undefined, undefined, undefined, /* () */0);
                          var match$1 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                          return /* tuple */[
                                  match$1[0],
                                  match$1[1]
                                ];
                        };
                        return Wonder_jest.test("test", (function (param) {
                                      var match = _prepareGameObject(state);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"extras\":{\"imgui\":{\"assetData\":{},\"extendData\":{\"customControlData\":{\"funcMap\":\"{\\\"A1\\\":\\\"function(customControlFuncData,showData,apiJsObj,record){\\\\nvardrawBox=apiJsObj.drawBox;\\\\nvarparseShowData=apiJsObj.parseShowData;\\\\nvarunsafeGetSkinData=apiJsObj.unsafeGetSkinData;\\\\nvarunsafeGetSingleCustomStyleDataMap=apiJsObj.unsafeGetSingleCustomStyleDataMap;\\\\nvarunsafeGetCustomStyleData=apiJsObj.unsafeGetCustomStyleData;\\\\nvarhasSingleCustomStyleName=apiJsObj.hasSingleCustomStyleName;\\\\nvarparseSingleCustomStyleName=apiJsObj.parseSingleCustomStyleName;\\\\nvarhasCustomStyleData=apiJsObj.hasCustomStyleData;\\\\nvarmatch=parseShowData(showData);\\\\nvarsingleCustomStyleNameNullable=match[1];\\\\nvardefaultColor=\\\\n/*array*/\\\\n[0.5,0.1,0.2];\\\\nvarmatch$1=hasSingleCustomStyleName(singleCustomStyleNameNullable);\\\\nvarcolor;\\\\n\\\\nif(match$1){\\\\nvarsingleCustomStyleName=parseSingleCustomStyleName(singleCustomStyleNameNullable);\\\\nvarsingleCustomStyleDataMap=unsafeGetSingleCustomStyleDataMap(singleCustomStyleName,unsafeGetSkinData(match[0],record));\\\\nvarmatch$2=hasCustomStyleData(\\\\\\\"color\\\\\\\",singleCustomStyleDataMap);\\\\ncolor=match$2?unsafeGetCustomStyleData(\\\\\\\"color\\\\\\\",singleCustomStyleDataMap):defaultColor;\\\\n}else{\\\\ncolor=defaultColor;\\\\n}\\\\n\\\\nvarrecord$1=drawBox(customControlFuncData,color,record);\\\\nreturn(\\\\n/*tuple*/\\\\n[record$1,true]\\\\n);\\\\n}\\\"}\"},\"skinData\":{\"allSkinDataMap\":\"{\\\"Skin1\\\":[[[0.35,0.1,0.1],[0.4,0.1,0.1],[0.5,0.1,0.1],null,null,null,1,[1,1,1]],{\\\"CustomStyle1\\\":{\\\"color\\\":[0.5,1,2]}}]}\"}},\"execData\":{\"execFuncDataArr\":[{\"execFunc\":\"function(customData,imguiAPIJsObj,state){returnstate;}\",\"customData\":\"-1\",\"execOrder\":0,\"name\":\"exec\"}]}}}\n          ", match[0]);
                                    }));
                      }));
                return Wonder_jest.describe("test assetData", (function (param) {
                              var _prepareGameObject = function (state) {
                                var state$1 = SetAssetIMGUITool$Wonderjs.buildAndSetAssetData(state[0]);
                                var state$2 = ExecIMGUITool$Wonderjs.addExecFuncData(state$1, undefined, undefined, undefined, undefined, /* () */0);
                                var match = GameObjectAPI$Wonderjs.createGameObject(state$2);
                                return /* tuple */[
                                        match[0],
                                        match[1]
                                      ];
                              };
                              Wonder_jest.test("test imgui->assetData", (function (param) {
                                      var match = _prepareGameObject(state);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"extras\":{\"imgui\":{\"assetData\":{\"customImages\":{\"customImages\":[{\"id\":\"c1\",\"bufferView\":1,\"mimeType\":\"image/png\"},{\"id\":\"c2\",\"bufferView\":2,\"mimeType\":\"image/jpeg\"}]},\"fontData\":{\"fntData\":{\"name\":\"fnt\",\"content\":\"infoface=\\\"Lato-Regular\\\"size=64bold=0italic=0charset=\\\"\\\"unicode=1stretchH=100smooth=1aa=2padding=0,0,0,0spacing=0,0\\ncommonlineHeight=77base=63scaleW=512scaleH=512pages=1packed=0alphaChnl=0redChnl=0greenChnl=0blueChnl=0\\npageid=0file=\\\"lato.png\\\"\\ncharscount=0\"},\"bitmapData\":{\"name\":\"bitmap\",\"bufferView\":0}}}\n          ", match[0]);
                                    }));
                              return Wonder_jest.test("should add bitmap array buffer, customImagesData array buffer to bufferViews", (function (param) {
                                            var match = _prepareGameObject(state);
                                            return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n            \"bufferViews\":[{\"buffer\":0,\"byteOffset\":0,\"byteLength\":10},{\"buffer\":0,\"byteOffset\":12,\"byteLength\":20},{\"buffer\":0,\"byteOffset\":32,\"byteLength\":30}]\n          ", match[0]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test skybox", (function (param) {
                Wonder_jest.describe("test gltf", (function (param) {
                        Wonder_jest.describe("scenes->extras should has skybox data", (function (param) {
                                var _prepareGameObject = function (state) {
                                  var state$1 = state[0];
                                  var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                                  var match = SkyboxTool$Wonderjs.prepareCubemapTextureAndSetAllSources(state$1);
                                  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvasForCubemapTexture(sandbox);
                                  return /* tuple */[
                                          match[0],
                                          rootGameObject,
                                          match[1]
                                        ];
                                };
                                return Wonder_jest.test("test", (function (param) {
                                              var match = _prepareGameObject(state);
                                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"scenes\":[{\"extensions\":{\"KHR_lights\":{\"light\":0}},\"nodes\":[0],\"extras\":{\"skybox\":{\"cubemap\":0}\n          ", match[0]);
                                            }));
                              }));
                        Wonder_jest.describe("test cubemapTextures data", (function (param) {
                                var _prepareGameObject = function (state) {
                                  var state$1 = state[0];
                                  var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                                  var match = SkyboxTool$Wonderjs.prepareCubemapTextureAndSetAllSources(state$1);
                                  var cubemapTexture = match[1];
                                  var state$2 = CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(cubemapTexture, true, match[0]);
                                  var state$3 = CubemapTextureAPI$Wonderjs.setCubemapTexturePZFormat(cubemapTexture, /* Rgba */1, CubemapTextureAPI$Wonderjs.setCubemapTextureNXFormat(cubemapTexture, /* Rgbs3tcdxt1 */5, CubemapTextureAPI$Wonderjs.setCubemapTexturePXFormat(cubemapTexture, /* Rgbas3tcdxt1 */6, state$2)));
                                  var state$4 = CubemapTextureAPI$Wonderjs.setCubemapTexturePZType(cubemapTexture, 2, CubemapTextureAPI$Wonderjs.setCubemapTextureNXType(cubemapTexture, 2, CubemapTextureAPI$Wonderjs.setCubemapTexturePXType(cubemapTexture, 1, state$3)));
                                  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvasForCubemapTexture(sandbox);
                                  return /* tuple */[
                                          state$4,
                                          rootGameObject,
                                          cubemapTexture
                                        ];
                                };
                                Wonder_jest.test("extras should has cubemapTextures data", (function (param) {
                                        var match = _prepareGameObject(state);
                                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"extras\":{\"cubemapTextures\":[{\"sampler\":0,\"flipY\":true,\"pxSource\":0,\"nxSource\":1,\"pySource\":2,\"nySource\":3,\"pzSource\":4,\"nzSource\":5,\"pxFormat\":6,\"nxFormat\":5,\"pyFormat\":0,\"nyFormat\":0,\"pzFormat\":1,\"nzFormat\":0,\"pxType\":1,\"nxType\":2,\"pyType\":0,\"nyType\":0,\"pzType\":2,\"nzType\":0}]}\n          ", match[0]);
                                      }));
                                return Wonder_jest.test("test samplers, images", (function (param) {
                                              var match = _prepareGameObject(state);
                                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"samplers\":[{\"wrapS\":33071,\"wrapT\":33071,\"magFilter\":9729,\"minFilter\":9728}],\"images\":[{\"name\":\"i1\",\"bufferView\":0,\"mimeType\":\"image/png\"},{\"name\":\"i2\",\"bufferView\":1,\"mimeType\":\"image/png\"},{\"name\":\"i3\",\"bufferView\":2,\"mimeType\":\"image/png\"},{\"name\":\"i4\",\"bufferView\":3,\"mimeType\":\"image/png\"},{\"name\":\"i5\",\"bufferView\":4,\"mimeType\":\"image/png\"},{\"name\":\"i6\",\"bufferView\":5,\"mimeType\":\"image/jpeg\"}]\n          ", match[0]);
                                            }));
                              }));
                        Wonder_jest.describe("test has one basicSourceTexture and one cubemapTexture", (function (param) {
                                var _prepareGameObject = function (state) {
                                  var state$1 = state[0];
                                  var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                                  var match = SkyboxTool$Wonderjs.prepareCubemapTextureAndSetAllSources(state$1);
                                  var cubemapTexture = match[1];
                                  var cubemapTextureName = "cubemap_texture_name";
                                  var state$2 = CubemapTextureAPI$Wonderjs.setCubemapTextureName(cubemapTexture, cubemapTextureName, match[0]);
                                  var state$3 = CubemapTextureAPI$Wonderjs.setCubemapTextureFlipY(cubemapTexture, true, state$2);
                                  var state$4 = CubemapTextureAPI$Wonderjs.setCubemapTexturePZFormat(cubemapTexture, /* Rgba */1, CubemapTextureAPI$Wonderjs.setCubemapTextureNXFormat(cubemapTexture, /* Rgbs3tcdxt1 */5, CubemapTextureAPI$Wonderjs.setCubemapTexturePXFormat(cubemapTexture, /* Rgbas3tcdxt1 */6, state$3)));
                                  var state$5 = CubemapTextureAPI$Wonderjs.setCubemapTexturePZType(cubemapTexture, 2, CubemapTextureAPI$Wonderjs.setCubemapTextureNXType(cubemapTexture, 2, CubemapTextureAPI$Wonderjs.setCubemapTexturePXType(cubemapTexture, 1, state$4)));
                                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$5);
                                  var basicSourceTextureImageName = "image_name";
                                  var match$1 = _createGameObjectWithMap("texture_name", basicSourceTextureImageName, state$5);
                                  var state$6 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], match$1[0]);
                                  GenerateSceneGraphSystemTool$Wonderjs.prepareCanvasForCubemapTexture(sandbox);
                                  return /* tuple */[
                                          state$6,
                                          rootGameObject,
                                          /* tuple */[
                                            cubemapTexture,
                                            cubemapTextureName
                                          ],
                                          basicSourceTextureImageName
                                        ];
                                };
                                Wonder_jest.test("test extras->cubemapTextures", (function (param) {
                                        var match = _prepareGameObject(state);
                                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"extras\":{\"cubemapTextures\":[{\"sampler\":1,\"flipY\":true,\"pxSource\":1,\"nxSource\":2,\"pySource\":3,\"nySource\":4,\"pzSource\":5,\"nzSource\":6,\"pxFormat\":6,\"nxFormat\":5,\"pyFormat\":0,\"nyFormat\":0,\"pzFormat\":1,\"nzFormat\":0,\"pxType\":1,\"nxType\":2,\"pyType\":0,\"nyType\":0,\"pzType\":2,\"nzType\":0,\"name\":\"" + (String(match[2][1]) + "\"}]\n          "), match[0]);
                                      }));
                                return Wonder_jest.test("test samplers, images", (function (param) {
                                              var match = _prepareGameObject(state);
                                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"samplers\":[{\"wrapS\":10497,\"wrapT\":33071,\"magFilter\":9729,\"minFilter\":9728},{\"wrapS\":33071,\"wrapT\":33071,\"magFilter\":9729,\"minFilter\":9728}],\"images\":[{\"name\":\"image_name\",\"bufferView\":4,\"mimeType\":\"image/png\"},{\"name\":\"i1\",\"bufferView\":5,\"mimeType\":\"image/png\"},{\"name\":\"i2\",\"bufferView\":6,\"mimeType\":\"image/png\"},{\"name\":\"i3\",\"bufferView\":7,\"mimeType\":\"image/png\"},{\"name\":\"i4\",\"bufferView\":8,\"mimeType\":\"image/png\"},{\"name\":\"i5\",\"bufferView\":9,\"mimeType\":\"image/jpeg\"},{\"name\":\"i6\",\"bufferView\":10,\"mimeType\":\"image/png\"}]\n          ", match[0]);
                                            }));
                              }));
                        return Wonder_jest.describe("test isBuildCubemapFromSceneSkybox = false", (function (param) {
                                      return Wonder_jest.describe("not has skybox data", (function (param) {
                                                    var _prepareGameObject = function (state) {
                                                      var state$1 = state[0];
                                                      var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                                                      var match = SkyboxTool$Wonderjs.prepareCubemapTextureAndSetAllSources(state$1);
                                                      GenerateSceneGraphSystemTool$Wonderjs.prepareCanvasForCubemapTexture(sandbox);
                                                      return /* tuple */[
                                                              match[0],
                                                              rootGameObject,
                                                              match[1]
                                                            ];
                                                    };
                                                    return Wonder_jest.test("test", (function (param) {
                                                                  var match = _prepareGameObject(state);
                                                                  return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObjectWithConfig(match[1], "\n\"scenes\":[{\"extensions\":{\"KHR_lights\":{\"light\":0}},\"nodes\":[0],\"extras\":{\"imgui\":{\"assetData\":{},\"extendData\":{\"customControlData\":{\"funcMap\":\"{}\"},\"skinData\":{\"allSkinDataMap\":\"{}\"}},\"execData\":{\"execFuncDataArr\":[]}}}\n          ", match[0], false, /* () */0);
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test assemble result", (function (param) {
                              return Wonder_jest.describe("test has one basicSourceTexture and one cubemapTexture", (function (param) {
                                            var _prepareGameObject = function (state) {
                                              var state$1 = state[0];
                                              var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                                              var match = SkyboxTool$Wonderjs.prepareCubemapTextureAndSetAllSources(state$1);
                                              var cubemapTexture = match[1];
                                              var cubemapTextureName = "cubemap_texture_name";
                                              var state$2 = CubemapTextureAPI$Wonderjs.setCubemapTextureName(cubemapTexture, cubemapTextureName, match[0]);
                                              var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$2);
                                              var basicSourceTextureName = "texture_name";
                                              var basicSourceTextureImageName = "image_name";
                                              var match$1 = _createGameObjectWithMap(basicSourceTextureName, basicSourceTextureImageName, state$2);
                                              var state$3 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], match$1[0]);
                                              GenerateSceneGraphSystemTool$Wonderjs.prepareCanvasForCubemapTexture(sandbox);
                                              return /* tuple */[
                                                      state$3,
                                                      rootGameObject,
                                                      /* tuple */[
                                                        cubemapTexture,
                                                        cubemapTextureName
                                                      ],
                                                      /* tuple */[
                                                        basicSourceTextureName,
                                                        basicSourceTextureImageName
                                                      ]
                                                    ];
                                            };
                                            Wonder_jest.testPromise("test set cubemapTexture and basicSourceTexture->name", undefined, (function (param) {
                                                    var match = _prepareGameObject(state);
                                                    var basicSourceTextureName = match[3][0];
                                                    var cubemapTextureName = match[2][1];
                                                    return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1], (function (param) {
                                                                  var match = param[2];
                                                                  var state = param[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureName(OptionService$Wonderjs.unsafeGet(match[1]), state),
                                                                                  AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(match[0], state).map((function (map) {
                                                                                          return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName(map, state);
                                                                                        }))
                                                                                ]), /* tuple */[
                                                                              cubemapTextureName,
                                                                              /* array */[basicSourceTextureName]
                                                                            ]);
                                                                }), match[0]);
                                                  }));
                                            return Wonder_jest.testPromise("test set cubemapTexture and basicSourceTexture->source", undefined, (function (param) {
                                                          var match = _prepareGameObject(state);
                                                          var basicSourceTextureImageName = match[3][1];
                                                          return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1], (function (param) {
                                                                        var match = param[2];
                                                                        var state = param[0];
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                        CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePXSource(OptionService$Wonderjs.unsafeGet(match[1]), state),
                                                                                        AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(match[0], state).map((function (map) {
                                                                                                return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(map, state);
                                                                                              }))
                                                                                      ]), /* tuple */[
                                                                                    GLBTool$Wonderjs.createFakeImage("i1", "object_url1", undefined, undefined, /* () */0),
                                                                                    /* array */[GLBTool$Wonderjs.createFakeImage(basicSourceTextureImageName, "object_url0", undefined, undefined, /* () */0)]
                                                                                  ]);
                                                                      }), match[0]);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test dispose", (function (param) {
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
                Wonder_jest.test("test nodes", (function (param) {
                        var match = _prepareGameObject(state);
                        var match$1 = match[3];
                        var match$2 = match$1[2][1];
                        var match$3 = match$1[0][1];
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                     \"nodes\":[{\"children\":[1,2]},{\"translation\":[" + (String(match$3[0]) + ("],\"rotation\":[" + (String(match$3[1]) + ("],\"scale\":[" + (String(match$3[2]) + ("],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\" meshRenderer\":0}},{\"translation\":[" + (String(match$2[0]) + ("],\"rotation\":[" + (String(match$2[1]) + ("],\"scale\":[" + (String(match$2[2]) + "],\"mesh\":1,\"extras\":{\"lightMaterial\":1, \"meshRenderer\":1}}]\n                     "))))))))))), match[0]);
                      }));
                Wonder_jest.test("test meshes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                   \"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0,\"NORMAL\":1,\"TEXCOORD_0\":2},\"indices\":3}]},{\"primitives\":[{\"attributes\":{\"POSITION\":4,\"NORMAL\":5,\"TEXCOORD_0\":6},\"indices\":7}]}]\n                       ", match[0]);
                      }));
                Wonder_jest.test("test materials, textures, samplers, images", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[0,0.5,1,1]}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}}],\"textures\":[{\"extras\":{\n        \"flipY\": true,\n        \"format\": 1,\n        \"type_\": 0\n      },\"sampler\":0,\"source\":0}],\"samplers\":[{\"wrapS\":33071,\"wrapT\":10497,\"magFilter\":9729,\"minFilter\":9987}],\"images\":[{\"bufferView\":8,\"mimeType\":\"image/png\"}]\n                     ", match[0]);
                      }));
                return Wonder_jest.test("test bufferViews", (function (param) {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n\"bufferViews\":[{\"buffer\":0,\"byteOffset\":0,\"byteLength\":288},{\"buffer\":0,\"byteOffset\":288,\"byteLength\":288},{\"buffer\":0,\"byteOffset\":576,\"byteLength\":192},{\"buffer\":0,\"byteOffset\":768,\"byteLength\":72},{\"buffer\":0,\"byteOffset\":840,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":876,\"byteLength\":36},{\"buffer\":0,\"byteOffset\":912,\"byteLength\":24},{\"buffer\":0,\"byteOffset\":936,\"byteLength\":6},{\"buffer\":0,\"byteOffset\":944,\"byteLength\":227}]\n", match[0]);
                            }));
              }));
        Wonder_jest.describe("test share geometry", (function (param) {
                Wonder_jest.describe("test has no map", (function (param) {
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
                        Wonder_jest.test("test nodes", (function (param) {
                                var match = _prepareGameObject(state);
                                var match$1 = match[3];
                                var match$2 = match$1[2][1];
                                var match$3 = match$1[1][1];
                                var match$4 = match$1[0][1];
                                return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\"nodes\":[{\"children\":[1,2]},{\"translation\":[" + (String(match$4[0]) + ("],\"rotation\":[" + (String(match$4[1]) + ("],\"scale\":[" + (String(match$4[2]) + ("],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"children\":[3],\"translation\":[" + (String(match$3[0]) + ("],\"rotation\":[" + (String(match$3[1]) + ("],\"scale\":[" + (String(match$3[2]) + ("],\"mesh\":0,\"extras\":{\"lightMaterial\":1,\"meshRenderer\":1}},{\"translation\":[" + (String(match$2[0]) + ("],\"rotation\":[" + (String(match$2[1]) + ("],\"scale\":[" + (String(match$2[2]) + "],\"mesh\":1,\"extras\":{\"lightMaterial\":2,\"meshRenderer\":2}}]"))))))))))))))))), match[0]);
                              }));
                        Wonder_jest.test("test meshes", (function (param) {
                                var match = _prepareGameObject(state);
                                return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n               \"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0,\"NORMAL\":1,\"TEXCOORD_0\":2},\"indices\":3}]},{\"primitives\":[{\"attributes\":{\"POSITION\":4,\"NORMAL\":5,\"TEXCOORD_0\":6},\"indices\":7}]}]\n                   ", match[0]);
                              }));
                        Wonder_jest.describe("test buffer", (function (param) {
                                return Wonder_jest.testPromise("test data", undefined, (function (param) {
                                              var match = _prepareGameObject(state);
                                              var match$1 = match[4][2][1];
                                              var indices3 = match$1[3];
                                              var normals3 = match$1[2];
                                              var texCoords3 = match$1[1];
                                              var vertices3 = match$1[0];
                                              return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                                            GLTFTool$Wonderjs.getTruckGeometryData(/* () */0);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2][0], param[0])), /* array */[
                                                                        /* tuple */[
                                                                          "geometry_0",
                                                                          /* tuple */[
                                                                            GLTFTool$Wonderjs.getBoxMainVertices(/* () */0),
                                                                            GLTFTool$Wonderjs.getBoxMainNormals(/* () */0),
                                                                            GLTFTool$Wonderjs.getBoxMainTexCoords(/* () */0),
                                                                            Caml_option.some(GLTFTool$Wonderjs.getBoxMainIndices(/* () */0)),
                                                                            undefined
                                                                          ]
                                                                        ],
                                                                        /* tuple */[
                                                                          "geometry_0",
                                                                          /* tuple */[
                                                                            GLTFTool$Wonderjs.getBoxMainVertices(/* () */0),
                                                                            GLTFTool$Wonderjs.getBoxMainNormals(/* () */0),
                                                                            GLTFTool$Wonderjs.getBoxMainTexCoords(/* () */0),
                                                                            Caml_option.some(GLTFTool$Wonderjs.getBoxMainIndices(/* () */0)),
                                                                            undefined
                                                                          ]
                                                                        ],
                                                                        /* tuple */[
                                                                          "geometry_1",
                                                                          /* tuple */[
                                                                            vertices3,
                                                                            normals3,
                                                                            texCoords3,
                                                                            Caml_option.some(indices3),
                                                                            undefined
                                                                          ]
                                                                        ]
                                                                      ]);
                                                          }), match[0]);
                                            }));
                              }));
                        return Wonder_jest.test("test materials, textures, samplers, images", (function (param) {
                                      var match = _prepareGameObject(state);
                                      var match$1 = match[5];
                                      return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match$1[0][1]) + (",1]}},{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match$1[1][1]) + ",1]}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}}],\"textures\":[{\"extras\":{\n        \"flipY\": true,\n        \"format\": 1,\n        \"type_\": 0\n      },\"sampler\":0,\"source\":0}],\"samplers\":[{\"wrapS\":33071,\"wrapT\":10497,\"magFilter\":9729,\"minFilter\":9987}],\n                 \"images\":[{\"bufferView\":8,\"mimeType\":\"image/png\"}]\n                   "))), match[0]);
                                    }));
                      }));
                return Wonder_jest.describe("test with map", (function (param) {
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
                                var texture1Name = "texture_name1";
                                var match$2 = _createGameObjectWithMapAndGeometry(texture1Name, geometry, match$1[0]);
                                var texture2Name = "texture_name2";
                                var match$3 = _createGameObjectWithMapAndGeometry(texture2Name, geometry, match$2[0]);
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
                                          texture1Name
                                        ],
                                        /* tuple */[
                                          match$3[1],
                                          texture2Name
                                        ]
                                      ];
                              };
                              return Wonder_jest.testPromise("\n          1.create two gameObjects with one geometry and two materials and two maps;\n          2.generate wdb;\n          3.assemble wdb;\n\n          the assembled->rootGameObject->two gameObjects should has two different maps\n          ", undefined, (function (param) {
                                            var match = _prepareGameObject(state);
                                            var texture2Name = match[3][1];
                                            var texture1Name = match[2][1];
                                            return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                                          var state = param[0];
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (map) {
                                                                                return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName(map, state);
                                                                              }))), /* array */[
                                                                      texture1Name,
                                                                      texture2Name
                                                                    ]);
                                                        }), match[0]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test share light material", (function (param) {
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
                Wonder_jest.test("test nodes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"nodes\":[{\"children\":[1,2]},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"children\":[3],\"translation\":[0.5,-1.5,1.5],\"rotation\":[2,2.5,5,4.5],\"scale\":[3,5.5,1],\"mesh\":1,\"extras\":{\"lightMaterial\":1,\"meshRenderer\":1}},{\"translation\":[0.5,11,12.5],\"rotation\":[3,1,2.5,1],\"scale\":[2.5,15.5,1.5],\"mesh\":2,\"extras\":{\"lightMaterial\":1,\"meshRenderer\":2}}]\n                   ", match[0]);
                      }));
                return Wonder_jest.test("test materials, textures, samplers, images", (function (param) {
                              var match = _prepareGameObject(state);
                              var match$1 = match[5];
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match$1[0][1]) + (",1]}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}}],\"textures\":[{\"extras\":{\n        \"flipY\": true,\n        \"format\": 1,\n        \"type_\": 0\n      },\"sampler\":0,\"source\":0,\"name\":\"" + (String(match$1[1][1][1]) + "\"}],\"samplers\":[{\"wrapS\":10497,\"wrapT\":33071,\"magFilter\":9729,\"minFilter\":9728}],\n                 \"images\":[{\"bufferView\":12,\"mimeType\":\"image/png\"}]\n                   "))), match[0]);
                            }));
              }));
        Wonder_jest.describe("test share basic material", (function (param) {
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
                Wonder_jest.test("test materials, textures, samplers, images", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match[2][1][1]) + ",1]}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}}],\"textures\":[{\"extras\":{\n        \"flipY\": true,\n        \"format\": 1,\n        \"type_\": 0\n      },\"sampler\":0,\"source\":0}],\"samplers\":[{\"wrapS\":33071,\"wrapT\":10497,\"magFilter\":9729,\"minFilter\":9987}],\n                 \"images\":[{\"bufferView\":12,\"mimeType\":\"image/png\"}]\n                   "), match[0]);
                      }));
                return Wonder_jest.test("test extras->basicMaterials", (function (param) {
                              var match = _prepareGameObject(state);
                              var state$1 = match[0];
                              BasicMaterialTool$Wonderjs.getDefaultColor(state$1);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"extras\":{\"basicMaterials\":[{}],\n                   ", state$1);
                            }));
              }));
        Wonder_jest.describe("test share texture, share sampler, share source", (function (param) {
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
                Wonder_jest.test("test materials, textures, samplers, images", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n                 \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":0}}},{\"pbrMetallicRoughness\":{\"baseColorTexture\":{\"index\":1}}}],\"textures\":[{\"extras\":{\n        \"flipY\": true,\n        \"format\": 1,\n        \"type_\": 0\n      },\"sampler\":0,\"source\":0},{\"extras\":{\n        \"flipY\": true,\n        \"format\": 1,\n        \"type_\": 0\n      },\"sampler\":0,\"source\":0}],\"samplers\":[{\"wrapS\":33071,\"wrapT\":10497,\"magFilter\":9729,\"minFilter\":9987}],\n                 \"images\":[{\"bufferView\":16,\"mimeType\":\"image/png\"}]\n                   ", match[0]);
                      }));
                return Wonder_jest.describe("contract check", (function (param) {
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
                              return Wonder_jest.test("should only has basicSourceTexture", (function (param) {
                                            var match = _prepareGameObject(state);
                                            var rootGameObject = match[1][0];
                                            var state$1 = match[0];
                                            TestTool$Wonderjs.openContractCheck(/* () */0);
                                            return Wonder_jest.Expect[/* toThrowMessage */21]("expect map be basicSourceTexture", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(rootGameObject, "", state$1);
                                                            })));
                                          }));
                            }));
              }));
        Wonder_jest.describe("if has no maps, geometry should still generate texCoords data", (function (param) {
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
                return Wonder_jest.test("test meshes", (function (param) {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n            \"meshes\":[{\"primitives\":[{\"attributes\":{\"POSITION\":0,\"NORMAL\":1, \"TEXCOORD_0\":2},\"indices\":3}]}]\n                   ", match[0]);
                            }));
              }));
        Wonder_jest.describe("test basicSourceTextures", (function (param) {
                Wonder_jest.describe("test flipY", (function (param) {
                        var _createGameObjectWithMap = function (textureName, state) {
                          var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
                          var material = match[1];
                          var match$1 = _createTexture1(match[0]);
                          var texture = match$1[1][0];
                          var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(texture, true, match$1[0]);
                          var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureName(texture, textureName, state$1);
                          var state$3 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, texture, state$2);
                          var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(state$3);
                          var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
                          var gameObject = match$3[1];
                          var state$4 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, match$2[1], GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0]));
                          var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$4);
                          return /* tuple */[
                                  state$4,
                                  gameObject,
                                  transform
                                ];
                        };
                        var _prepareGameObject = function (state) {
                          var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                          var rootGameObject = match[1];
                          var state$1 = match[0];
                          var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                          var texture1Name = "texture_name1";
                          var match$1 = _createGameObjectWithMap(texture1Name, state$1);
                          var state$2 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], match$1[0]);
                          GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                          return /* tuple */[
                                  state$2,
                                  /* tuple */[
                                    rootGameObject,
                                    sceneGameObjectTransform
                                  ],
                                  /* tuple */[
                                    match$1[1],
                                    texture1Name
                                  ]
                                ];
                        };
                        return Wonder_jest.testPromise("\n          1.create one gameObject g1 with one map whose flipY is true;\n          2.generate wdb;\n          3.assemble wdb;\n\n          the assembled->rootGameObject->g1->map->flipY should be true\n          ", undefined, (function (param) {
                                      var match = _prepareGameObject(state);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (map) {
                                                                          return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(map, state);
                                                                        }))), /* array */[true]);
                                                  }), match[0]);
                                    }));
                      }));
                return Wonder_jest.describe("test format, type_", (function (param) {
                              var _createGameObjectWithMap = function (textureName, state) {
                                var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
                                var material = match[1];
                                var match$1 = _createTexture1(match[0]);
                                var texture = match$1[1][0];
                                var state$1 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureType(texture, 2, BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFormat(texture, /* Luminance */3, match$1[0]));
                                var state$2 = BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureName(texture, textureName, state$1);
                                var state$3 = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseMap(material, texture, state$2);
                                var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(state$3);
                                var match$3 = GameObjectAPI$Wonderjs.createGameObject(match$2[0]);
                                var gameObject = match$3[1];
                                var state$4 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, match$2[1], GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, material, match$3[0]));
                                var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$4);
                                return /* tuple */[
                                        state$4,
                                        gameObject,
                                        transform,
                                        /* tuple */[
                                          /* Luminance */3,
                                          2
                                        ]
                                      ];
                              };
                              var _prepareGameObject = function (state) {
                                var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                                var rootGameObject = match[1];
                                var state$1 = match[0];
                                var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                                var texture1Name = "texture_name1";
                                var match$1 = _createGameObjectWithMap(texture1Name, state$1);
                                var match$2 = match$1[3];
                                var state$2 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], match$1[0]);
                                GenerateSceneGraphSystemTool$Wonderjs.prepareCanvas(sandbox);
                                return /* tuple */[
                                        state$2,
                                        /* tuple */[
                                          rootGameObject,
                                          sceneGameObjectTransform
                                        ],
                                        /* tuple */[
                                          match$1[1],
                                          texture1Name
                                        ],
                                        /* tuple */[
                                          match$2[0],
                                          match$2[1]
                                        ]
                                      ];
                              };
                              return Wonder_jest.testPromise("\n          1.create one gameObject g1 with one map whose format is f1 and type is t1;\n          2.generate wdb;\n          3.assemble wdb;\n\n          the assembled->rootGameObject->g1->map->format,type should be f1,t1\n          ", undefined, (function (param) {
                                            var match = _prepareGameObject(state);
                                            var match$1 = match[3];
                                            var type1_ = match$1[1];
                                            var format1 = match$1[0];
                                            return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                                          var state = param[0];
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (map) {
                                                                                return /* tuple */[
                                                                                        BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFormat(map, state),
                                                                                        BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureType(map, state)
                                                                                      ];
                                                                              }))), /* array */[/* tuple */[
                                                                        format1,
                                                                        type1_
                                                                      ]]);
                                                        }), match[0]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test perspectiveCameraProjection", (function (param) {
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
                Wonder_jest.test("test nodes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n               \"nodes\":[{\"children\":[1,2]},{\"camera\":0,\"extras\":{\"basicCameraView\":0}},{\"children\":[3],\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"camera\":1,\"extras\":{\"basicCameraView\":1}}]\n                   ", match[0]);
                      }));
                return Wonder_jest.test("test cameras", (function (param) {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n               \"cameras\":[{\"type\":\"perspective\",\"perspective\":{\"aspectRatio\":1.5,\"zfar\":1000.5,\"znear\":0.1,\"yfov\":1.0471975511965976}},{\"type\":\"perspective\",\"perspective\":{\"aspectRatio\":1.5,\"zfar\":1000.5,\"znear\":0.1,\"yfov\":1.0471975511965976}}]\n                   ", match[0]);
                            }));
              }));
        Wonder_jest.describe("test basicCameraView", (function (param) {
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
                Wonder_jest.describe("test dispose case", (function (param) {
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
                        Wonder_jest.test("test nodes", (function (param) {
                                var match = _prepareGameObject(state);
                                var match$1 = match[3];
                                var match$2 = match$1[3];
                                var match$3 = match$1[2];
                                return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n               \"nodes\":[{\"children\":[1,2,3]},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"camera\":" + (String(match$3[1]) + (",\"extras\":{\"basicCameraView\":" + (String(match$3[0]) + ("}},{\"camera\":" + (String(match$2[1]) + (",\"extras\":{\"basicCameraView\":" + (String(match$2[0]) + "}}]\n                   "))))))), match[0]);
                              }));
                        return Wonder_jest.test("test extras", (function (param) {
                                      var match = _prepareGameObject(state);
                                      return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n              \"extras\":{\"meshRenderers\":[{\"isRender\":true,\"drawMode\":4}],\"basicCameraViews\":[{\"isActive\":true},{\"isActive\":false}]}\n                   ", match[0]);
                                    }));
                      }));
                return Wonder_jest.describe("contract check", (function (param) {
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
                              return Wonder_jest.test("should has at most one active", (function (param) {
                                            var match = _prepareGameObject(state);
                                            var rootGameObject = match[1][0];
                                            var state$1 = match[0];
                                            return Wonder_jest.Expect[/* toThrowMessage */21]("expect has at most one active", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(rootGameObject, "\n                   ", state$1);
                                                            })));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test flyCameraController", (function (param) {
                var _createCameraGameObject = function (isBindEvent, state) {
                  var match = FlyCameraControllerTool$Wonderjs.createGameObject(state);
                  var cameraController = match[3][0];
                  var match$1 = FlyCameraControllerTool$Wonderjs.setFlyCameraControllerData(cameraController, match[0]);
                  var match$2 = match$1[1];
                  var state$1 = match$1[0];
                  var state$2 = isBindEvent ? FlyCameraControllerAPI$Wonderjs.bindFlyCameraControllerEvent(cameraController, state$1) : FlyCameraControllerAPI$Wonderjs.unbindFlyCameraControllerEvent(cameraController, state$1);
                  return /* tuple */[
                          state$2,
                          match[2],
                          /* tuple */[
                            match$2[0],
                            match$2[1],
                            match$2[2],
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
                              match$2[3]
                            ],
                            /* tuple */[
                              match$4[0],
                              match$4[1],
                              match$4[2],
                              match$4[3]
                            ]
                          ]
                        ];
                };
                Wonder_jest.test("test nodes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"nodes\":[{\"children\":[1,2,3]},{\"camera\":0,\"extras\":{\"flyCameraController\":0,\"basicCameraView\":0}},{\"camera\":1,\"extras\":{\"flyCameraController\":1,\"basicCameraView\":1}},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}}]\n                   ", match[0]);
                      }));
                return Wonder_jest.test("test flyCameraController", (function (param) {
                              var match = _prepareGameObject(state);
                              var match$1 = match[2];
                              var match$2 = match$1[1];
                              var match$3 = match$1[0];
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n              \"extras\":{\"flyCameraControllers\":[{\"moveSpeed\":" + (String(match$3[0]) + (",\"rotateSpeed\":" + (String(match$3[1]) + (",\"wheelSpeed\":" + (String(match$3[2]) + ("},\n              {\"moveSpeed\":" + (String(match$2[0]) + (",\"rotateSpeed\":" + (String(match$2[1]) + (",\"wheelSpeed\":" + (String(match$2[2]) + "}]\n                      "))))))))))), match[0]);
                            }));
              }));
        Wonder_jest.describe("test arcballCameraController", (function (param) {
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
                Wonder_jest.test("test nodes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"nodes\":[{\"children\":[1,2,3]},{\"camera\":0,\"extras\":{\"arcballCameraController\":0,\"basicCameraView\":0}},{\"camera\":1,\"extras\":{\"arcballCameraController\":1,\"basicCameraView\":1}},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}}]\n                   ", match[0]);
                      }));
                return Wonder_jest.test("test arcballCameraController", (function (param) {
                              var match = _prepareGameObject(state);
                              var match$1 = match[2];
                              var match$2 = match$1[1];
                              var match$3 = match$1[0];
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n              \"extras\":{\"arcballCameraControllers\":[{\"distance\":" + (String(match$3[0]) + (",\"minDistance\": " + (String(match$3[1]) + (",\"phi\":" + (String(match$3[2]) + (",\"theta\":" + (String(match$3[3]) + (",\"thetaMargin\":" + (String(match$3[4]) + (",\"target\":[" + (String(match$3[5]) + ("],\"moveSpeedX\":" + (String(match$3[6]) + (",\"moveSpeedY\":" + (String(match$3[7]) + (",\"rotateSpeed\":" + (String(match$3[8]) + (",\"wheelSpeed\":" + (String(match$3[9]) + ("},\n              {\"distance\":" + (String(match$2[0]) + (",\"minDistance\": " + (String(match$2[1]) + (",\"phi\":" + (String(match$2[2]) + (",\"theta\":" + (String(match$2[3]) + (",\"thetaMargin\":" + (String(match$2[4]) + (",\"target\":[" + (String(match$2[5]) + ("],\"moveSpeedX\":" + (String(match$2[6]) + (",\"moveSpeedY\":" + (String(match$2[7]) + (",\"rotateSpeed\":" + (String(match$2[8]) + (",\"wheelSpeed\":" + (String(match$2[9]) + "}]\n                      "))))))))))))))))))))))))))))))))))))))), match[0]);
                            }));
              }));
        Wonder_jest.describe("test meshRenderer", (function (param) {
                var _createMeshRendererGameObject = function (isRender, state) {
                  var match = LightMaterialAPI$Wonderjs.createLightMaterial(state);
                  var match$1 = BoxGeometryTool$Wonderjs.createBoxGeometry(match[0]);
                  var match$2 = MeshRendererAPI$Wonderjs.createMeshRenderer(match$1[0]);
                  var meshRenderer = match$2[1];
                  var state$1 = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer, isRender, match$2[0]);
                  var match$3 = GameObjectAPI$Wonderjs.createGameObject(state$1);
                  var gameObject = match$3[1];
                  var state$2 = GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent(gameObject, meshRenderer, GameObjectAPI$Wonderjs.addGameObjectGeometryComponent(gameObject, match$1[1], GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent(gameObject, match[1], match$3[0])));
                  return /* tuple */[
                          state$2,
                          gameObject,
                          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$2),
                          meshRenderer
                        ];
                };
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = _createMeshRendererGameObject(true, state$1);
                  var match$2 = _createMeshRendererGameObject(false, match$1[0]);
                  var state$2 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$2[2], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], match$2[0]));
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            match$1[3],
                            match$2[3]
                          ]
                        ];
                };
                return Wonder_jest.test("test meshRenderers", (function (param) {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n\"extras\":{\"meshRenderers\":[{\"isRender\":true,\"drawMode\":4},{\"isRender\":false,\"drawMode\":4}]}\n                ", match[0]);
                            }));
              }));
        Wonder_jest.describe("test script", (function (param) {
                var _createScriptGameObject = function (state) {
                  var match = ScriptTool$Wonderjs.createGameObject(state);
                  var script = match[2];
                  var gameObject = match[1];
                  var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script, match[0], undefined, undefined, undefined, /* () */0);
                  return /* tuple */[
                          state$1,
                          gameObject,
                          GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, state$1),
                          script
                        ];
                };
                var _prepareGameObject = function (state) {
                  var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                  var rootGameObject = match[1];
                  var state$1 = match[0];
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match$1 = _createScriptGameObject(state$1);
                  var match$2 = _createGameObject1(match$1[0]);
                  var match$3 = match$2[4];
                  var state$2 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$2[2][0], TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], match$2[0]));
                  return /* tuple */[
                          state$2,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            match$3[0],
                            match$3[1]
                          ],
                          match$1[3]
                        ];
                };
                Wonder_jest.test("test nodes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n\"nodes\":[{\"children\":[1,2]},{\"extras\":{\"script\":" + (String(match[3]) + "}},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}}]\n                   "), match[0]);
                      }));
                Wonder_jest.test("test extras", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\"extras\":{\"scripts\":[{\"isActive\":true,\"eventFunctionDataMap\":{\"scriptEventFunctionData1\":[\"function(script,api,state){\\nvarscriptAttributeName=\\\"scriptAttribute1\\\";\\nvarunsafeGetScriptAttribute=api.unsafeGetScriptAttribute;\\nvarscriptAttribute=unsafeGetScriptAttribute(script,scriptAttributeName,state);\\nvarunsafeGetScriptAttributeFieldValue=api.unsafeGetScriptAttributeFieldValue;\\nvarsetScriptAttributeFieldValue=api.setScriptAttributeFieldValue;\\nreturnsetScriptAttributeFieldValue(script,\\n/*tuple*/\\n[scriptAttributeName,\\\"a\\\",unsafeGetScriptAttributeFieldValue(\\\"a\\\",scriptAttribute)+1|0],state);\\n}\",\"function(script,api,state){\\nvarscriptAttributeName=\\\"scriptAttribute1\\\";\\nvarunsafeGetScriptAttribute=api.unsafeGetScriptAttribute;\\nvarscriptAttribute=unsafeGetScriptAttribute(script,scriptAttributeName,state);\\nreturnsetScriptAttributeFloatFieldValue(api,script,scriptAttributeName,\\\"b\\\",unsafeGetScriptAttributeFloatFieldValue$1(api,\\\"b\\\",scriptAttribute)+10,state);\\n}\",\"function(script,api,state){\\nvarunsafeGetScriptGameObject=api.unsafeGetScriptGameObject;\\nvarunsafeGetGameObjectTransformComponent=api.unsafeGetGameObjectTransformComponent;\\nvargetTransformLocalPosition=api.getTransformLocalPosition;\\nvarsetTransformLocalPosition=api.setTransformLocalPosition;\\nvartransform=unsafeGetGameObjectTransformComponent(unsafeGetScriptGameObject(script,state),state);\\nvarmatch=getTransformLocalPosition(transform,state);\\nreturnsetTransformLocalPosition(transform,\\n/*tuple*/\\n[match[0]+10,match[1],match[2]],state);\\n}\"]},\"attributeMap\":{\"scriptAttribute1\":{\"a\":[0,1,1],\"b\":[1,0.1,0.1]}}}]", match[0]);
                      }));
                return Wonder_jest.describe("test event function", (function (param) {
                              return Wonder_jest.testPromise("test exec init event function", undefined, (function (param) {
                                            var match = _prepareGameObject(state);
                                            return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                                          var state = ScriptTool$Wonderjs.ExecEventFunction[/* execAllInitEventFunction */0](param[0]);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllScripts(param[2][0], state).map((function (script) {
                                                                                return ScriptTool$Wonderjs.unsafeGetScriptAttributeIntFieldValue(script, ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getScriptAttributeName */3](/* () */0), ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getScriptAttributeFieldAName */5](/* () */0), state);
                                                                              }))), /* array */[ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValueAfterExecInitEventFunc */15](/* () */0)]);
                                                        }), match[0]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test light", (function (param) {
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
                Wonder_jest.test("test extensions", (function (param) {
                        var match = _prepareGameObject(state);
                        var match$1 = match[3];
                        var match$2 = match$1[2][1];
                        var match$3 = match$1[1][1];
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n     \"extensions\": {\n       \"KHR_lights\": {\n         \"lights\": [\n           {\n             \"intensity\": " + (String(match$3[1]) + (",\n             \"color\": [" + (String(match$3[0]) + ("],\n             \"type\": \"directional\"\n           },\n           {\n             \"range\": " + (String(match$2[5]) + (",\n             \"quadraticAttenuation\": " + (String(match$2[4]) + (",\n             \"linearAttenuation\": " + (String(match$2[3]) + (",\n             \"constantAttenuation\": " + (String(match$2[2]) + (",\n             \"intensity\": " + (String(match$2[1]) + (",\n             \"color\": [" + (String(match$2[0]) + ("],\n             \"type\": \"point\"\n           },\n           {\n             \"color\": [" + (String(match$1[0]) + "],\n             \"type\": \"ambient\"\n           }\n         ]\n       }\n     },\n                   "))))))))))))))))), match[0]);
                      }));
                Wonder_jest.test("test scenes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"scenes\":[{\"extensions\":{\"KHR_lights\":{\"light\":2}}\n                   ", match[0]);
                      }));
                Wonder_jest.test("test nodes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n     \"nodes\":[{\"children\":[1,2]},{\"extensions\":{\"KHR_lights\":{\"light\":0}}},{\"children\":[3],\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":0}},{\"extensions\":{\"KHR_lights\":{\"light\":1}}}]\n                   ", match[0]);
                      }));
                Wonder_jest.testPromise("test directionLight data", undefined, (function (param) {
                        var match = _prepareGameObject(state);
                        var match$1 = match[3][1][1];
                        var intensity1 = match$1[1];
                        var color1 = match$1[0];
                        return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDirectionLightData(param[2][0], param[0])), /* array */[/* tuple */[
                                                    color1,
                                                    intensity1
                                                  ]]);
                                    }), match[0]);
                      }));
                return Wonder_jest.testPromise("test pointLight data", undefined, (function (param) {
                              var match = _prepareGameObject(state);
                              var match$1 = match[3][2][1];
                              var range3 = match$1[5];
                              var quadratic3 = match$1[4];
                              var linear3 = match$1[3];
                              var constant3 = match$1[2];
                              var intensity3 = match$1[1];
                              var color3 = match$1[0];
                              return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllPointLightData(param[2][0], param[0])), /* array */[/* tuple */[
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
        Wonder_jest.describe("test drawMode and basicMaterial", (function (param) {
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
                Wonder_jest.test("test extras->basicMaterials and meshRenderers", (function (param) {
                        var match = _prepareGameObject(state);
                        var match$1 = match[3];
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n      \"extras\":{\"basicMaterials\":[{\"colorFactor\":[" + (String(match[2][0][1]) + (",1]}],\"meshRenderers\":[{\"isRender\":true, \"drawMode\":" + (String(match$1[0][1]) + ("},{\"isRender\":true,\"drawMode\":" + (String(match$1[1][1]) + "}]}\n                   "))))), match[0]);
                      }));
                Wonder_jest.test("test nodes", (function (param) {
                        var match = _prepareGameObject(state);
                        return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n      \"nodes\":[{\"children\":[1,2]},{\"mesh\":0,\"extras\":{\"basicMaterial\":0,\"meshRenderer\":0}},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":1,\"extras\":{\"lightMaterial\":0,\"meshRenderer\":1}}]\n                   ", match[0]);
                      }));
                return Wonder_jest.test("test materials", (function (param) {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n            \"materials\":[{\"pbrMetallicRoughness\":{\"baseColorFactor\":[" + (String(match[2][1][1]) + ",1]}}]\n                   "), match[0]);
                            }));
              }));
        Wonder_jest.describe("test toDataURL", (function (param) {
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
                return Wonder_jest.test("pass mimeType to toDataURL based on source.name", (function (param) {
                              var match = _prepareGameObject(state);
                              var canvas = match[2];
                              GenerateSceneGraphAPI$Wonderjs.generateGLBData(match[1], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0), true, match[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
        Wonder_jest.describe("test image name", (function (param) {
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
                return Wonder_jest.testPromise("generate wdb->image name should equal the image name before assemble wdb", undefined, (function (param) {
                              var match = _prepareGameObject(state);
                              var imageName = match[3][1];
                              return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                            var state = param[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (map) {
                                                                  return ImageUtils$Wonderjs.getImageName(BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(map, state));
                                                                }))), /* array */[imageName]);
                                          }), match[0]);
                            }));
              }));
        Wonder_jest.describe("optimize", (function (param) {
                return Wonder_jest.describe("get image base64 from map", (function (param) {
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
                              return Wonder_jest.test("test images", (function (param) {
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
                                            var imageUint8ArrayMap = MutableSparseMapService$WonderCommonlib.set(match$1[2][1], uint8ArrayData2, MutableSparseMapService$WonderCommonlib.set(match$1[1][1][0], uint8ArrayData1, MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)));
                                            return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObjectWithImageUint8ArrayDataMap(match[1][0], "\n                \"images\":[{\"bufferView\":12,\"mimeType\":\"image/png\"},{\"bufferView\":13,\"mimeType\":\"image/jpeg\"}]\n                   ", imageUint8ArrayMap, match[0]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test gameObject->isActive", (function (param) {
                var _prepareGameObject = function (state) {
                  var state$1 = state[0];
                  var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                  var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                  var match = _createGameObject1(state$1);
                  var gameObject1 = match[1];
                  var state$2 = GameObjectAPI$Wonderjs.setGameObjectIsActive(gameObject1, false, match[0]);
                  var match$1 = _createGameObject1(state$2);
                  var gameObject2 = match$1[1];
                  var state$3 = GameObjectAPI$Wonderjs.setGameObjectIsActive(gameObject2, false, match$1[0]);
                  var state$4 = SceneAPI$Wonderjs.addSceneChild(match$1[2][0], SceneAPI$Wonderjs.addSceneChild(match[2][0], state$3));
                  return /* tuple */[
                          state$4,
                          /* tuple */[
                            rootGameObject,
                            sceneGameObjectTransform
                          ],
                          /* tuple */[
                            gameObject1,
                            gameObject2
                          ]
                        ];
                };
                return Wonder_jest.test("test nodes", (function (param) {
                              var match = _prepareGameObject(state);
                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1][0], "\n\"nodes\":[{\"children\":[1,2]},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"isActive\":false,\"lightMaterial\":0,\"meshRenderer\":0}},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":1,\"extras\":{\"isActive\":false,\"lightMaterial\":1,\"meshRenderer\":1}}]\n          ", match[0]);
                            }));
              }));
        Wonder_jest.describe("test isRoot", (function (param) {
                return Wonder_jest.describe("test gltf", (function (param) {
                              Wonder_jest.describe("if scene only has one child", (function (param) {
                                      var _prepareGameObject = function (state) {
                                        var state$1 = state[0];
                                        var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                                        GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                                        var match = _createGameObject1(state$1);
                                        var state$2 = SceneAPI$Wonderjs.addSceneChild(match[2][0], match[0]);
                                        var state$3 = GameObjectAPI$Wonderjs.setGameObjectIsRoot(rootGameObject, true, state$2);
                                        var state$4 = GameObjectAPI$Wonderjs.setGameObjectIsRoot(match[1], false, state$3);
                                        return /* tuple */[
                                                state$4,
                                                rootGameObject,
                                                /* tuple */[
                                                  true,
                                                  false
                                                ]
                                              ];
                                      };
                                      Wonder_jest.test("scenes shouldn't has isRoot data", (function (param) {
                                              var match = _prepareGameObject(state);
                                              return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"scenes\":[{\"extensions\":{\"KHR_lights\":{\"light\":0}}\n          ", match[0]);
                                            }));
                                      return Wonder_jest.test("nodes->first one->isRoot should be scene->isRoot;\n               second one->isRoot should be scene->child->isRoot;", (function (param) {
                                                    var match = _prepareGameObject(state);
                                                    var match$1 = match[2];
                                                    return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"nodes\":[{\"children\":[1],\"extras\":{\"isRoot\":" + (String(match$1[0]) + ("}},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"isRoot\":" + (String(match$1[1]) + ",\"lightMaterial\":0,\"meshRenderer\":0}}]\n          "))), match[0]);
                                                  }));
                                    }));
                              return Wonder_jest.describe("else", (function (param) {
                                            var _prepareGameObject = function (state) {
                                              var state$1 = state[0];
                                              var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state$1);
                                              GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                                              var match = _createGameObject1(state$1);
                                              var match$1 = _createGameObject1(match[0]);
                                              var state$2 = SceneAPI$Wonderjs.addSceneChild(match$1[2][0], SceneAPI$Wonderjs.addSceneChild(match[2][0], match$1[0]));
                                              var state$3 = GameObjectAPI$Wonderjs.setGameObjectIsRoot(rootGameObject, false, state$2);
                                              var state$4 = GameObjectAPI$Wonderjs.setGameObjectIsRoot(match[1], false, state$3);
                                              var state$5 = GameObjectAPI$Wonderjs.setGameObjectIsRoot(match$1[1], true, state$4);
                                              return /* tuple */[
                                                      state$5,
                                                      rootGameObject,
                                                      /* tuple */[
                                                        false,
                                                        false,
                                                        true
                                                      ]
                                                    ];
                                            };
                                            Wonder_jest.test("scenes shouldn't has isRoot data", (function (param) {
                                                    var match = _prepareGameObject(state);
                                                    return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n\"scenes\":[{\"extensions\":{\"KHR_lights\":{\"light\":0}}\n          ", match[0]);
                                                  }));
                                            return Wonder_jest.test("nodes->first one->isRoot should be scene->isRoot;\n               second one->isRoot should be scene->first child->isRoot;\n               third one->isRoot should be scene->second child->isRoot;\n               ", (function (param) {
                                                          var match = _prepareGameObject(state);
                                                          var match$1 = match[2];
                                                          return GenerateSceneGraphSystemTool$Wonderjs.testGLTFResultByGameObject(match[1], "\n  \"nodes\":[{\"children\":[1,2],\"extras\":{\"isRoot\":" + (String(match$1[0]) + ("}},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":0,\"extras\":{\"isRoot\":" + (String(match$1[1]) + (",\"lightMaterial\":0,\"meshRenderer\":0}},{\"translation\":[10,11,12.5],\"rotation\":[0,1,2.5,1],\"scale\":[2,3.5,1.5],\"mesh\":1,\"extras\":{\"isRoot\":" + (String(match$1[2]) + ",\"lightMaterial\":1,\"meshRenderer\":1}}]\n          "))))), match[0]);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
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
                      return Wonder_jest.testPromise("\n          1.create two gameObjects with one geometry and one basic material(set color to c1) and one light material(set color to c2 and set map);\n          2.generate wdb;\n          3.assemble wdb;\n\n          the assembled->rootGameObject->light material->diffuseColor should be c2\n          ", undefined, (function (param) {
                                    var match = _prepareGameObject(state);
                                    var diffuseColor2 = match[3][2];
                                    return GenerateSceneGraphSystemTool$Wonderjs.testAssembleResultByGameObject(sandbox[0], match[1][0], (function (param) {
                                                  var state = param[0];
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2][0], state).map((function (material) {
                                                                        return LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(material, state);
                                                                      }))), /* array */[diffuseColor2]);
                                                }), match[0]);
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
