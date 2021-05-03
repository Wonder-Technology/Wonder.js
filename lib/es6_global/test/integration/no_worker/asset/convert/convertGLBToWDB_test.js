

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$Wonderjs from "../tool/GLBTool.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as IMGUITool$Wonderjs from "../../../../tool/service/imgui/IMGUITool.js";
import * as ConvertTool$Wonderjs from "../tool/ConvertTool.js";
import * as ConvertCommon$Wonderjs from "../../../../../src/asset/converter/ConvertCommon.js";
import * as ExecIMGUITool$Wonderjs from "../../../../tool/service/imgui/ExecIMGUITool.js";
import * as OptionService$Wonderjs from "../../../../../src/service/atom/OptionService.js";
import * as ConvertGLBTool$Wonderjs from "../tool/ConvertGLBTool.js";
import * as SceneGraphIMGUITool$Wonderjs from "../tool/SceneGraphIMGUITool.js";
import * as MutableSparseMapTool$Wonderjs from "../../../../tool/structure/MutableSparseMapTool.js";
import * as SceneGraphScriptTool$Wonderjs from "../tool/SceneGraphScriptTool.js";
import * as ConvertScriptDataUtils$Wonderjs from "../../../../../src/asset/utils/ConvertScriptDataUtils.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as ExtendIMGUIMainService$Wonderjs from "../../../../../src/service/state/main/imgui/extend/ExtendIMGUIMainService.js";
import * as BufferCubemapTextureService$Wonderjs from "../../../../../src/service/record/main/texture/cubemap/BufferCubemapTextureService.js";
import * as ConvertMultiPrimitivesSystem$Wonderjs from "../../../../../src/asset/converter/ConvertMultiPrimitivesSystem.js";
import * as ConvertGLTFJsonToRecordSystem$Wonderjs from "../../../../../src/asset/converter/ConvertGLTFJsonToRecordSystem.js";
import * as ImmutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("convert glb to wd", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return ConvertTool$Wonderjs.setFakeTransformCount(50);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test multi primitives", (function (param) {
                Wonder_jest.describe("convert multi primitives to gltf nodes", (function (param) {
                        var _prepare = function (param) {
                          return ConvertMultiPrimitivesSystem$Wonderjs.convertMultiPrimitivesToNodes(ConvertGLTFJsonToRecordSystem$Wonderjs.convert(JSON.parse(ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitivesWithName(/* () */0))));
                        };
                        Wonder_jest.test("test nodes", (function (param) {
                                var gltfRecord = _prepare(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](gltfRecord[/* nodes */10]), /* array */[
                                            ConvertGLBTool$Wonderjs.buildNode(undefined, undefined, undefined, Caml_option.some(/* array */[
                                                      3,
                                                      2,
                                                      1,
                                                      4,
                                                      5
                                                    ]), undefined, undefined, undefined, undefined, undefined, undefined, /* () */0),
                                            ConvertGLBTool$Wonderjs.buildNode("node1", undefined, 1, undefined, Caml_option.some(/* array */[
                                                      1.0,
                                                      0.0,
                                                      0.0,
                                                      0.0,
                                                      0.0,
                                                      1.0,
                                                      0.0,
                                                      0.0,
                                                      0.0,
                                                      0.0,
                                                      1.0,
                                                      0.0,
                                                      10.0,
                                                      30.0,
                                                      50.0,
                                                      1.0
                                                    ]), undefined, undefined, undefined, undefined, undefined, /* () */0),
                                            ConvertGLBTool$Wonderjs.buildNode("node2", undefined, undefined, Caml_option.some(/* array */[
                                                      1,
                                                      6,
                                                      7
                                                    ]), Caml_option.some(/* array */[
                                                      1.0,
                                                      0.0,
                                                      0.0,
                                                      0.0,
                                                      0.0,
                                                      1.0,
                                                      0.0,
                                                      0.0,
                                                      0.0,
                                                      0.0,
                                                      1.0,
                                                      0.0,
                                                      1.0,
                                                      2.0,
                                                      3.0,
                                                      1.0
                                                    ]), undefined, undefined, undefined, undefined, undefined, /* () */0),
                                            ConvertGLBTool$Wonderjs.buildNode(undefined, undefined, undefined, Caml_option.some(/* array */[
                                                      8,
                                                      9
                                                    ]), undefined, undefined, undefined, undefined, undefined, undefined, /* () */0),
                                            ConvertGLBTool$Wonderjs.buildNode(undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0),
                                            ConvertGLBTool$Wonderjs.buildNode(undefined, undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0),
                                            ConvertGLBTool$Wonderjs.buildNode("node2_0", undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0),
                                            ConvertGLBTool$Wonderjs.buildNode("node2_1", undefined, 4, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0),
                                            ConvertGLBTool$Wonderjs.buildNode(undefined, undefined, 5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0),
                                            ConvertGLBTool$Wonderjs.buildNode(undefined, undefined, 6, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)
                                          ]);
                              }));
                        return Wonder_jest.test("test meshes", (function (param) {
                                      var gltfRecord = _prepare(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](gltfRecord[/* meshes */11]), /* array */[
                                                  /* record */[
                                                    /* primitives : array */[
                                                      ConvertGLBTool$Wonderjs.buildPrimitive(/* record */[
                                                            /* position */2,
                                                            /* normal */undefined,
                                                            /* texCoord_0 */undefined,
                                                            /* texCoord_1 */undefined
                                                          ], 0, 0, undefined, /* () */0),
                                                      ConvertGLBTool$Wonderjs.buildPrimitive(/* record */[
                                                            /* position */6,
                                                            /* normal */undefined,
                                                            /* texCoord_0 */undefined,
                                                            /* texCoord_1 */undefined
                                                          ], 4, 1, undefined, /* () */0)
                                                    ],
                                                    /* name */"mesh0"
                                                  ],
                                                  /* record */[
                                                    /* primitives : array */[ConvertGLBTool$Wonderjs.buildPrimitive(/* record */[
                                                            /* position */9,
                                                            /* normal */undefined,
                                                            /* texCoord_0 */undefined,
                                                            /* texCoord_1 */undefined
                                                          ], 7, 2, undefined, /* () */0)],
                                                    /* name */undefined
                                                  ],
                                                  /* record */[
                                                    /* primitives : array */[
                                                      ConvertGLBTool$Wonderjs.buildPrimitive(/* record */[
                                                            /* position */10,
                                                            /* normal */undefined,
                                                            /* texCoord_0 */undefined,
                                                            /* texCoord_1 */undefined
                                                          ], 8, 2, undefined, /* () */0),
                                                      ConvertGLBTool$Wonderjs.buildPrimitive(/* record */[
                                                            /* position */6,
                                                            /* normal */undefined,
                                                            /* texCoord_0 */undefined,
                                                            /* texCoord_1 */undefined
                                                          ], 4, 1, undefined, /* () */0)
                                                    ],
                                                    /* name */undefined
                                                  ],
                                                  /* record */[
                                                    /* primitives : array */[ConvertGLBTool$Wonderjs.buildPrimitive(/* record */[
                                                            /* position */2,
                                                            /* normal */undefined,
                                                            /* texCoord_0 */undefined,
                                                            /* texCoord_1 */undefined
                                                          ], 0, 0, undefined, /* () */0)],
                                                    /* name */"mesh0_0"
                                                  ],
                                                  /* record */[
                                                    /* primitives : array */[ConvertGLBTool$Wonderjs.buildPrimitive(/* record */[
                                                            /* position */6,
                                                            /* normal */undefined,
                                                            /* texCoord_0 */undefined,
                                                            /* texCoord_1 */undefined
                                                          ], 4, 1, undefined, /* () */0)],
                                                    /* name */"mesh0_1"
                                                  ],
                                                  /* record */[
                                                    /* primitives : array */[ConvertGLBTool$Wonderjs.buildPrimitive(/* record */[
                                                            /* position */10,
                                                            /* normal */undefined,
                                                            /* texCoord_0 */undefined,
                                                            /* texCoord_1 */undefined
                                                          ], 8, 2, undefined, /* () */0)],
                                                    /* name */undefined
                                                  ],
                                                  /* record */[
                                                    /* primitives : array */[ConvertGLBTool$Wonderjs.buildPrimitive(/* record */[
                                                            /* position */6,
                                                            /* normal */undefined,
                                                            /* texCoord_0 */undefined,
                                                            /* texCoord_1 */undefined
                                                          ], 4, 1, undefined, /* () */0)],
                                                    /* name */undefined
                                                  ]
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("test convert to wdb", (function (param) {
                              Wonder_jest.test("test geometrys", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitives(/* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* geometrys */18]), /* array */[
                                                                ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                                /* record */[
                                                                  /* name */"geometry_1",
                                                                  /* position */0,
                                                                  /* normal */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                                  /* texCoord */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                                  /* index */1
                                                                ],
                                                                /* record */[
                                                                  /* name */"geometry_2",
                                                                  /* position */2,
                                                                  /* normal */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                                  /* texCoord */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                                  /* index */3
                                                                ],
                                                                /* record */[
                                                                  /* name */"geometry_3",
                                                                  /* position */4,
                                                                  /* normal */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                                  /* texCoord */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                                  /* index */5
                                                                ]
                                                              ]);
                                                  }), state, undefined, /* () */0);
                                    }));
                              Wonder_jest.test("test meshRenderers", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitives(/* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* meshRenderers */19]), /* array */[
                                                                /* record */[
                                                                  /* drawMode : Triangles */4,
                                                                  /* isRender */true
                                                                ],
                                                                /* record */[
                                                                  /* drawMode : Triangles */4,
                                                                  /* isRender */true
                                                                ],
                                                                /* record */[
                                                                  /* drawMode : Triangles */4,
                                                                  /* isRender */true
                                                                ],
                                                                /* record */[
                                                                  /* drawMode : Triangles */4,
                                                                  /* isRender */true
                                                                ],
                                                                /* record */[
                                                                  /* drawMode : Triangles */4,
                                                                  /* isRender */true
                                                                ]
                                                              ]);
                                                  }), state, undefined, /* () */0);
                                    }));
                              Wonder_jest.describe("test gameObjects", (function (param) {
                                      return Wonder_jest.test("test count", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitives(/* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* gameObjects */3][/* count */0]), 7);
                                                                }), state, undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test indices", (function (param) {
                                            return Wonder_jest.describe("test gameObjectIndices", (function (param) {
                                                          Wonder_jest.describe("test geometryGameObjectIndices", (function (param) {
                                                                  return Wonder_jest.test("test multi primitives geometry should has no gameObject", (function (param) {
                                                                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitives(/* () */0), (function (param) {
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* geometryGameObjectIndexData */10]), /* record */[
                                                                                                          /* gameObjectIndices : array */[
                                                                                                            1,
                                                                                                            3,
                                                                                                            4,
                                                                                                            5,
                                                                                                            6
                                                                                                          ],
                                                                                                          /* componentIndices : array */[
                                                                                                            1,
                                                                                                            2,
                                                                                                            3,
                                                                                                            2,
                                                                                                            3
                                                                                                          ]
                                                                                                        ]);
                                                                                            }), state, undefined, /* () */0);
                                                                              }));
                                                                }));
                                                          return Wonder_jest.describe("test meshRendererGameObjectIndices", (function (param) {
                                                                        return Wonder_jest.test("test multi primitives corresponding meshRenderer should has no gameObject", (function (param) {
                                                                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitives(/* () */0), (function (param) {
                                                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* meshRendererGameObjectIndexData */11]), /* record */[
                                                                                                                /* gameObjectIndices : array */[
                                                                                                                  1,
                                                                                                                  3,
                                                                                                                  4,
                                                                                                                  5,
                                                                                                                  6
                                                                                                                ],
                                                                                                                /* componentIndices : array */[
                                                                                                                  0,
                                                                                                                  1,
                                                                                                                  2,
                                                                                                                  3,
                                                                                                                  4
                                                                                                                ]
                                                                                                              ]);
                                                                                                  }), state, undefined, /* () */0);
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.test("test asset", (function (param) {
                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* asset */0]), /* record */[
                                          /* version */"2.0",
                                          /* generator */"GLTF2WD"
                                        ]);
                            }), state, undefined, /* () */0);
              }));
        Wonder_jest.describe("test scene", (function (param) {
                Wonder_jest.test("test gameObjects", (function (param) {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scene */1][/* gameObjects */0]), /* array */[0]);
                                    }), state, undefined, /* () */0);
                      }));
                Wonder_jest.test("test ambientLight", (function (param) {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scene */1][/* ambientLight */1]), /* record */[/* color : array */[
                                                    1,
                                                    0.5,
                                                    1
                                                  ]]);
                                    }), state, undefined, /* () */0);
                      }));
                Wonder_jest.test("test imgui", (function (param) {
                        var execFuncName = "e1";
                        var customData = "[1,2]";
                        var execFunc = ExecIMGUITool$Wonderjs.buildEmptyExecFuncStr(/* () */0);
                        var execData = ConvertGLBTool$Wonderjs.buildExecDataToOneExecFuncData(execFuncName, customData, undefined, execFunc, /* () */0);
                        var assetData = ConvertGLBTool$Wonderjs.buildAssetData("fnt", "aaa", "bbb", 0, /* array */[], /* () */0);
                        var extendData = ConvertGLBTool$Wonderjs.buildExtendData(Caml_option.some(ImmutableHashMapService$WonderCommonlib.set("c1", IMGUITool$Wonderjs.buildEmptyCustomControlFunc(/* () */0), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0))), Caml_option.some(ImmutableHashMapService$WonderCommonlib.set("s1", Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* createDefaultSkinData */10], /* () */0), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0))), /* () */0);
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(Caml_option.some(execData), Caml_option.some(extendData), Caml_option.some(assetData), /* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scene */1][/* imgui */2]), /* record */[
                                                  /* assetData */SceneGraphIMGUITool$Wonderjs.buildAssetData("fnt", "aaa", "bbb", 0, /* array */[], /* () */0),
                                                  /* execData */SceneGraphIMGUITool$Wonderjs.buildExecDataToOneExecFuncData(execFuncName, Caml_option.some(JSON.parse(customData)), undefined, Caml_option.some(ExecIMGUITool$Wonderjs.buildEmptyExecFunc(/* () */0)), /* () */0),
                                                  /* extendData */SceneGraphIMGUITool$Wonderjs.buildExtendData(Caml_option.some(ImmutableHashMapService$WonderCommonlib.set("c1", IMGUITool$Wonderjs.buildEmptyCustomControlFunc(/* () */0), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0))), Caml_option.some(ImmutableHashMapService$WonderCommonlib.set("s1", Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* createDefaultSkinData */10], /* () */0), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0))), /* () */0)
                                                ]);
                                    }), state, undefined, /* () */0);
                      }));
                Wonder_jest.test("test skybox", (function (param) {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scene */1][/* skybox */3]), /* record */[/* cubemap */0]);
                                    }), state, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("test isRoot", (function (param) {
                              Wonder_jest.test("if not has extras, set true", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scene */1][/* isRoot */4]), true);
                                                  }), state, undefined, /* () */0);
                                    }));
                              Wonder_jest.describe("else", (function (param) {
                                      Wonder_jest.test("if extras has no isRoot, set true", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(undefined, undefined, undefined, /* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scene */1][/* isRoot */4]), true);
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.test("else, set it", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSceneIsRoot(true), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scene */1][/* isRoot */4]), true);
                                                                }), state, undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test truck glb", (function (param) {
                                            return Wonder_jest.test("scene->isRoot should be true", (function (param) {
                                                          return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* scene */1][/* isRoot */4]), true);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test directionLights", (function (param) {
                return Wonder_jest.test("test light gltf", (function (param) {
                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* directionLights */11]), /* array */[/* record */[
                                                          /* color : array */[
                                                            0.5,
                                                            0.5,
                                                            1
                                                          ],
                                                          /* intensity */1
                                                        ]]);
                                          }), state, undefined, /* () */0);
                            }));
              }));
        Wonder_jest.describe("test pointLights", (function (param) {
                return Wonder_jest.test("test light gltf", (function (param) {
                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* pointLights */12]), /* array */[/* record */[
                                                          /* color : array */[
                                                            0,
                                                            0,
                                                            0
                                                          ],
                                                          /* intensity */2.5,
                                                          /* constantAttenuation */1,
                                                          /* linearAttenuation */1.5,
                                                          /* quadraticAttenuation */0,
                                                          /* range */55.5
                                                        ]]);
                                          }), state, undefined, /* () */0);
                            }));
              }));
        Wonder_jest.describe("test gameObjects", (function (param) {
                Wonder_jest.test("test single node gltf", (function (param) {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* gameObjects */3]), /* record */[
                                                  /* count */1,
                                                  /* names : array */["gameObject_0"],
                                                  /* isRoots */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
                                                  /* isActives */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
                                                ]);
                                    }), state, undefined, /* () */0);
                      }));
                Wonder_jest.test("test truck glb", (function (param) {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* gameObjects */3]), /* record */[
                                                  /* count */8,
                                                  /* names : array */[
                                                    "gameObject_0",
                                                    "gameObject_1",
                                                    "Wheels",
                                                    "gameObject_3",
                                                    "Wheels",
                                                    "Cesium_Milk_Truck_0",
                                                    "Cesium_Milk_Truck_1",
                                                    "Cesium_Milk_Truck_2"
                                                  ],
                                                  /* isRoots */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
                                                  /* isActives */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("test isActive", (function (param) {
                        return Wonder_jest.test("if extras has isActive, set it", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfNodeIsActive(true), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* gameObjects */3][/* isActives */3]), MutableSparseMapTool$Wonderjs.createByArr(/* array */[
                                                                    true,
                                                                    true
                                                                  ]));
                                                  }), state, undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("test isRoot", (function (param) {
                              return Wonder_jest.test("if extras has isRoot, set it", (function (param) {
                                            return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfNodeIsRoot(true), (function (param) {
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* gameObjects */3][/* isRoots */2]), MutableSparseMapTool$Wonderjs.createByArr(/* array */[
                                                                          true,
                                                                          true
                                                                        ]));
                                                        }), state, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test camera data", (function (param) {
                Wonder_jest.describe("test basicCameraViews", (function (param) {
                        Wonder_jest.test("test no data", (function (param) {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicCameraViews */13]), /* array */[]);
                                            }), state, undefined, /* () */0);
                              }));
                        return Wonder_jest.describe("test has data", (function (param) {
                                      Wonder_jest.test("default isActiveIndex is 0", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicCameraViews */13]), /* array */[
                                                                        /* record */[/* isActive */true],
                                                                        /* record */[/* isActive */false],
                                                                        /* record */[/* isActive */false]
                                                                      ]);
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.test("test extras", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicCameraViews */13]), /* array */[
                                                                              /* record */[/* isActive */false],
                                                                              /* record */[/* isActive */true],
                                                                              /* record */[/* isActive */false]
                                                                            ]);
                                                                }), state, undefined, /* () */0);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test perspectiveCameraProjections", (function (param) {
                              Wonder_jest.test("test no data", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* perspectiveCameraProjections */14]), /* array */[]);
                                                  }), state, undefined, /* () */0);
                                    }));
                              return Wonder_jest.test("test has data", (function (param) {
                                            return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* perspectiveCameraProjections */14]), /* array */[
                                                                      /* record */[
                                                                        /* near */1.0,
                                                                        /* far */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                                        /* fovy */34.37746770784939,
                                                                        /* aspect */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0)
                                                                      ],
                                                                      /* record */[
                                                                        /* near */2.0,
                                                                        /* far */1000.0,
                                                                        /* fovy */28.64788975654116,
                                                                        /* aspect */2.0
                                                                      ]
                                                                    ]);
                                                        }), state, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test cameraController data", (function (param) {
                Wonder_jest.describe("test flyCameraControllers", (function (param) {
                        Wonder_jest.test("test no data", (function (param) {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* flyCameraControllers */15]), /* array */[]);
                                            }), state, undefined, /* () */0);
                              }));
                        return Wonder_jest.test("test has data", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfFlyCameraController(undefined, /* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* flyCameraControllers */15]), /* array */[/* record */[
                                                                  /* moveSpeed */2.1,
                                                                  /* rotateSpeed */2.3,
                                                                  /* wheelSpeed */3.9,
                                                                  /* isBindEvent */true
                                                                ]]);
                                                  }), state, undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("test arcballCameraControllers", (function (param) {
                              Wonder_jest.test("test no data", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* arcballCameraControllers */16]), /* array */[]);
                                                  }), state, undefined, /* () */0);
                                    }));
                              return Wonder_jest.test("test has data", (function (param) {
                                            return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(undefined, /* () */0), (function (param) {
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* arcballCameraControllers */16]), /* array */[/* record */[
                                                                        /* distance */1.5,
                                                                        /* minDistance */1,
                                                                        /* phi */0.8,
                                                                        /* theta */0.6,
                                                                        /* thetaMargin */1.5,
                                                                        /* target : tuple */[
                                                                          0.0,
                                                                          0.5,
                                                                          0.1
                                                                        ],
                                                                        /* moveSpeedX */2.1,
                                                                        /* moveSpeedY */3.1,
                                                                        /* rotateSpeed */0.3,
                                                                        /* wheelSpeed */0.9,
                                                                        /* isBindEvent */true
                                                                      ]]);
                                                        }), state, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test script data", (function (param) {
                return Wonder_jest.describe("test scripts", (function (param) {
                              Wonder_jest.describe("test isActive", (function (param) {
                                      Wonder_jest.test("test is active", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfScript(true, Caml_option.some(undefined), Caml_option.some(undefined), /* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scripts */22]), /* array */[ConvertGLBTool$Wonderjs.buildScript(true, undefined, undefined, /* () */0)]);
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.test("test is not active", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfScript(false, Caml_option.some(undefined), Caml_option.some(undefined), /* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scripts */22]), /* array */[ConvertGLBTool$Wonderjs.buildScript(false, undefined, undefined, /* () */0)]);
                                                                }), state, undefined, /* () */0);
                                                  }));
                                    }));
                              Wonder_jest.test("test no data", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scripts */22]), /* array */[]);
                                                  }), state, undefined, /* () */0);
                                    }));
                              return Wonder_jest.describe("test has data", (function (param) {
                                            Wonder_jest.test("test only has event function data", (function (param) {
                                                    var eventFunctionDataMap = SceneGraphScriptTool$Wonderjs.buildEventFunctionDataMap(undefined, undefined, undefined, /* () */0);
                                                    var eventFunctionDataMapStr = ConvertScriptDataUtils$Wonderjs._convertEventFunctionDataMapToStr(eventFunctionDataMap);
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfScript(undefined, Caml_option.some(Caml_option.some(eventFunctionDataMap)), Caml_option.some(undefined), /* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scripts */22]), /* array */[ConvertGLBTool$Wonderjs.buildScript(undefined, Caml_option.some(JSON.parse(eventFunctionDataMapStr)), undefined, /* () */0)]);
                                                                }), state, undefined, /* () */0);
                                                  }));
                                            return Wonder_jest.test("test has event function data and attribute data", (function (param) {
                                                          var eventFunctionDataMap = SceneGraphScriptTool$Wonderjs.buildEventFunctionDataMap(undefined, undefined, undefined, /* () */0);
                                                          var attributeMap = SceneGraphScriptTool$Wonderjs.buildAttributeMap(/* () */0);
                                                          var eventFunctionDataMapStr = ConvertScriptDataUtils$Wonderjs._convertEventFunctionDataMapToStr(eventFunctionDataMap);
                                                          var attributeMapStr = ConvertScriptDataUtils$Wonderjs._convertAttributeMapToStr(attributeMap);
                                                          return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfScript(undefined, Caml_option.some(Caml_option.some(eventFunctionDataMap)), Caml_option.some(Caml_option.some(attributeMap)), /* () */0), (function (param) {
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scripts */22]), /* array */[ConvertGLBTool$Wonderjs.buildScript(undefined, Caml_option.some(JSON.parse(eventFunctionDataMapStr)), Caml_option.some(JSON.parse(attributeMapStr)), /* () */0)]);
                                                                      }), state, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test transforms", (function (param) {
                Wonder_jest.test("test matrix exist", (function (param) {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* transforms */17]), /* array */[/* record */[
                                                    /* translation *//* tuple */[
                                                      10,
                                                      20,
                                                      30
                                                    ],
                                                    /* rotation *//* tuple */[
                                                      0,
                                                      0,
                                                      0,
                                                      1
                                                    ],
                                                    /* scale *//* tuple */[
                                                      1,
                                                      1,
                                                      1
                                                    ]
                                                  ]]);
                                    }), state, undefined, /* () */0);
                      }));
                Wonder_jest.test("test transform gltf", (function (param) {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfTransform(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* transforms */17]), /* array */[
                                                  /* record */[
                                                    /* translation *//* tuple */[
                                                      11,
                                                      0.5,
                                                      -10.5
                                                    ],
                                                    /* rotation */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                    /* scale */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0)
                                                  ],
                                                  /* record */[
                                                    /* translation *//* tuple */[
                                                      10,
                                                      30,
                                                      50
                                                    ],
                                                    /* rotation *//* tuple */[
                                                      0,
                                                      0,
                                                      0,
                                                      1
                                                    ],
                                                    /* scale *//* tuple */[
                                                      1,
                                                      1,
                                                      1
                                                    ]
                                                  ],
                                                  /* record */[
                                                    /* translation */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                    /* rotation *//* tuple */[
                                                      1,
                                                      0.1,
                                                      1.5,
                                                      0.5
                                                    ],
                                                    /* scale *//* tuple */[
                                                      2.5,
                                                      2.5,
                                                      3
                                                    ]
                                                  ]
                                                ]);
                                    }), state, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("fix bug", (function (param) {
                              return Wonder_jest.test("fix get rotation bug", (function (param) {
                                            return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"matrix\": [\n            1.0,\n            0.0,\n            0.0,\n            0.0,\n            0.0,\n            0.0,\n            -1.0,\n            0.0,\n            0.0,\n            1.0,\n            0.0,\n            0.0,\n            0.0,\n            0.0,\n            0.0,\n            1.0\n          ]\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* transforms */17]), /* array */[/* record */[
                                                                        /* translation *//* tuple */[
                                                                          0,
                                                                          0,
                                                                          0
                                                                        ],
                                                                        /* rotation *//* tuple */[
                                                                          -0.7071067811865475,
                                                                          0,
                                                                          0,
                                                                          0.7071067811865476
                                                                        ],
                                                                        /* scale *//* tuple */[
                                                                          1,
                                                                          1,
                                                                          1
                                                                        ]
                                                                      ]]);
                                                        }), state, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test basicMaterials", (function (param) {
                Wonder_jest.test("test no data", (function (param) {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n        }\n    ]\n        ", undefined, undefined, undefined, undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"basicMaterial\": 0\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicMaterials */20]), /* array */[/* record */[
                                                    /* color */ConvertGLBTool$Wonderjs.getDefaultDiffuseColor(/* () */0),
                                                    /* name */"basicMaterial_0"
                                                  ]]);
                                    }), state, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("test has data", (function (param) {
                              return Wonder_jest.test("only set r,g,b components, ignore alpha component", (function (param) {
                                            return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterial(/* array */[
                                                            0.1,
                                                            0.2,
                                                            0.3,
                                                            0.4
                                                          ], "name", /* () */0), (function (param) {
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicMaterials */20]), /* array */[/* record */[
                                                                        /* color : array */[
                                                                          0.1,
                                                                          0.2,
                                                                          0.3
                                                                        ],
                                                                        /* name */"name"
                                                                      ]]);
                                                        }), state, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test lightMaterials", (function (param) {
                Wonder_jest.test("test no data", (function (param) {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* lightMaterials */21]), /* array */[/* record */[
                                                    /* diffuseColor */ConvertGLBTool$Wonderjs.getDefaultDiffuseColor(/* () */0),
                                                    /* name */"Texture"
                                                  ]]);
                                    }));
                      }));
                return Wonder_jest.describe("test has data", (function (param) {
                              return Wonder_jest.test("only set r,g,b components, ignore alpha component", (function (param) {
                                            return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* lightMaterials */21]), /* array */[
                                                                      /* record */[
                                                                        /* diffuseColor */ConvertGLBTool$Wonderjs.getDefaultDiffuseColor(/* () */0),
                                                                        /* name */"truck"
                                                                      ],
                                                                      /* record */[
                                                                        /* diffuseColor : array */[
                                                                          0.0,
                                                                          0.04050629958510399,
                                                                          0.021240700036287309
                                                                        ],
                                                                        /* name */"glass"
                                                                      ],
                                                                      /* record */[
                                                                        /* diffuseColor : array */[
                                                                          0.06400000303983689,
                                                                          0.06400000303983689,
                                                                          0.06400000303983689
                                                                        ],
                                                                        /* name */"window_trim"
                                                                      ],
                                                                      /* record */[
                                                                        /* diffuseColor */ConvertGLBTool$Wonderjs.getDefaultDiffuseColor(/* () */0),
                                                                        /* name */"wheels"
                                                                      ]
                                                                    ]);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test basicSourceTextures", (function (param) {
                Wonder_jest.describe("test flipY", (function (param) {
                        Wonder_jest.test("if not has extras, set false", (function (param) {
                                return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* basicSourceTextures */5]), /* array */[ConvertGLBTool$Wonderjs.buildBasicSourceTexture(undefined, undefined, undefined, false, /* () */0)]);
                                            }));
                              }));
                        return Wonder_jest.test("else, set from it", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicSourceTexture(undefined, undefined, true, /* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicSourceTextures */5]), /* array */[ConvertGLBTool$Wonderjs.buildBasicSourceTexture(undefined, undefined, undefined, true, /* () */0)]);
                                                  }), state, undefined, /* () */0);
                                    }));
                      }));
                Wonder_jest.describe("test format", (function (param) {
                        Wonder_jest.test("if not has extras, set format by source->mime type", (function (param) {
                                return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* basicSourceTextures */5]), /* array */[ConvertGLBTool$Wonderjs.buildBasicSourceTexture(undefined, /* Rgba */1, undefined, undefined, /* () */0)]);
                                            }));
                              }));
                        return Wonder_jest.test("else, set from it", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicSourceTexture(/* Rgbas3tcdxt1 */6, undefined, undefined, /* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicSourceTextures */5]), /* array */[ConvertGLBTool$Wonderjs.buildBasicSourceTexture(undefined, /* Rgbas3tcdxt1 */6, undefined, undefined, /* () */0)]);
                                                  }), state, undefined, /* () */0);
                                    }));
                      }));
                Wonder_jest.describe("test type", (function (param) {
                        Wonder_jest.test("if not has extras, set to 0", (function (param) {
                                return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* basicSourceTextures */5]), /* array */[ConvertGLBTool$Wonderjs.buildBasicSourceTexture(undefined, undefined, 0, undefined, /* () */0)]);
                                            }));
                              }));
                        return Wonder_jest.test("else, set from it", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicSourceTexture(undefined, 2, undefined, /* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicSourceTextures */5]), /* array */[ConvertGLBTool$Wonderjs.buildBasicSourceTexture(undefined, undefined, 2, undefined, /* () */0)]);
                                                  }), state, undefined, /* () */0);
                                    }));
                      }));
                Wonder_jest.test("test BoxTextured glb", (function (param) {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* basicSourceTextures */5]), /* array */[ConvertGLBTool$Wonderjs.buildBasicSourceTexture(undefined, undefined, undefined, false, /* () */0)]);
                                    }));
                      }));
                return Wonder_jest.test("test AlphaBlendModeTest glb", (function (param) {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* basicSourceTextures */5]), /* array */[
                                                        ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                        ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                        ConvertGLBTool$Wonderjs.buildBasicSourceTexture("basicSourceTexture_2", /* Rgb */0, undefined, false, /* () */0),
                                                        ConvertGLBTool$Wonderjs.buildBasicSourceTexture("basicSourceTexture_3", /* Rgba */1, undefined, false, /* () */0),
                                                        ConvertGLBTool$Wonderjs.buildBasicSourceTexture("basicSourceTexture_4", /* Rgba */1, undefined, false, /* () */0),
                                                        ConvertGLBTool$Wonderjs.buildBasicSourceTexture("basicSourceTexture_5", /* Rgba */1, undefined, false, /* () */0),
                                                        ConvertGLBTool$Wonderjs.buildBasicSourceTexture("basicSourceTexture_6", /* Rgba */1, undefined, false, /* () */0),
                                                        ConvertGLBTool$Wonderjs.buildBasicSourceTexture("basicSourceTexture_7", /* Rgba */1, undefined, false, /* () */0)
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test cubemapTextures", (function (param) {
                Wonder_jest.test("if not has extras, not has cubemapTexture data", (function (param) {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* cubemapTextures */6]), /* array */[]);
                                    }));
                      }));
                return Wonder_jest.describe("else", (function (param) {
                              Wonder_jest.describe("test name", (function (param) {
                                      Wonder_jest.test("if has no name, set to default", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCubemapTexture(Caml_option.some(undefined), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* cubemapTextures */6]), /* array */[ConvertGLBTool$Wonderjs.buildCubemapTexture(ConvertCommon$Wonderjs.buildDefaultCubemapTextureName(/* () */0), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)]);
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.test("else, set to it", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCubemapTexture("aaa", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* cubemapTextures */6]), /* array */[ConvertGLBTool$Wonderjs.buildCubemapTexture("aaa", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)]);
                                                                }), state, undefined, /* () */0);
                                                  }));
                                    }));
                              Wonder_jest.test("test flipY", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCubemapTexture(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, true, /* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* cubemapTextures */6]), /* array */[ConvertGLBTool$Wonderjs.buildCubemapTexture(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, true, /* () */0)]);
                                                  }), state, undefined, /* () */0);
                                    }));
                              Wonder_jest.describe("test format", (function (param) {
                                      return Wonder_jest.test("test", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCubemapTexture(undefined, BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), /* Rgb */0, /* Alpha */2, /* Alpha */2, /* Alpha */2, /* Alpha */2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* cubemapTextures */6]), /* array */[ConvertGLBTool$Wonderjs.buildCubemapTexture(undefined, BufferCubemapTextureService$Wonderjs.getDefaultFormat(/* () */0), /* Rgb */0, /* Alpha */2, /* Alpha */2, /* Alpha */2, /* Alpha */2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)]);
                                                                }), state, undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test type", (function (param) {
                                            return Wonder_jest.test("test", (function (param) {
                                                          return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCubemapTexture(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0, 0, 1, 2, 1, undefined, /* () */0), (function (param) {
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* cubemapTextures */6]), /* array */[ConvertGLBTool$Wonderjs.buildCubemapTexture(undefined, undefined, undefined, undefined, undefined, undefined, undefined, BufferCubemapTextureService$Wonderjs.getDefaultType(/* () */0), 0, 0, 1, 2, 1, undefined, /* () */0)]);
                                                                      }), state, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test samplers", (function (param) {
                return Wonder_jest.test("test", (function (param) {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* samplers */7]), /* array */[/* record */[
                                                          /* magFilter : Linear */1,
                                                          /* minFilter : Nearest_mipmap_linear */4,
                                                          /* wrapS : Repeat */2,
                                                          /* wrapT : Repeat */2
                                                        ]]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test images", (function (param) {
                Wonder_jest.test("test BoxTextured glb", (function (param) {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      var images = OptionService$Wonderjs.unsafeGet(param[0][/* images */4]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](images), /* array */[/* record */[
                                                    /* name */"CesiumLogoFlat.png",
                                                    /* bufferView */4,
                                                    /* mimeType */"image/png"
                                                  ]]);
                                    }));
                      }));
                return Wonder_jest.test("test AlphaBlendModeTest glb", (function (param) {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                            var images = OptionService$Wonderjs.unsafeGet(param[0][/* images */4]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](images), /* array */[
                                                        ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                        ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                        /* record */[
                                                          /* name */"image_2",
                                                          /* bufferView */4,
                                                          /* mimeType */"image/jpeg"
                                                        ],
                                                        /* record */[
                                                          /* name */"image_3",
                                                          /* bufferView */9,
                                                          /* mimeType */"image/png"
                                                        ]
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test bufferViews", (function (param) {
                Wonder_jest.test("test BoxTextured glb", (function (param) {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* bufferViews */9]), /* array */[
                                                  /* record */[
                                                    /* buffer */0,
                                                    /* byteOffset */0,
                                                    /* byteLength */288,
                                                    /* byteStride */12
                                                  ],
                                                  /* record */[
                                                    /* buffer */0,
                                                    /* byteOffset */288,
                                                    /* byteLength */288,
                                                    /* byteStride */12
                                                  ],
                                                  /* record */[
                                                    /* buffer */0,
                                                    /* byteOffset */576,
                                                    /* byteLength */192,
                                                    /* byteStride */8
                                                  ],
                                                  /* record */[
                                                    /* buffer */0,
                                                    /* byteOffset */768,
                                                    /* byteLength */72,
                                                    /* byteStride */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0)
                                                  ],
                                                  /* record */[
                                                    /* buffer */0,
                                                    /* byteOffset */840,
                                                    /* byteLength */23516,
                                                    /* byteStride */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0)
                                                  ]
                                                ]);
                                    }));
                      }));
                return Wonder_jest.test("test AlphaBlendModeTest glb", (function (param) {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                            var bufferViews = param[0][/* bufferViews */9];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            bufferViews.length,
                                                            Caml_array.caml_array_get(bufferViews, 37)
                                                          ]), /* tuple */[
                                                        38,
                                                        /* record */[
                                                          /* buffer */0,
                                                          /* byteOffset */772816,
                                                          /* byteLength */6,
                                                          /* byteStride */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0)
                                                        ]
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test buffers", (function (param) {
                Wonder_jest.test("test BoxTextured glb", (function (param) {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* buffers */8]), /* array */[24360]);
                                    }));
                      }));
                return Wonder_jest.test("test AlphaBlendModeTest glb", (function (param) {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* buffers */8]), /* array */[3004960]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test accessors", (function (param) {
                return Wonder_jest.test("test BoxTextured glb", (function (param) {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* accessors */10]), /* array */[
                                                        /* record */[
                                                          /* bufferView */0,
                                                          /* byteOffset */0,
                                                          /* count */24,
                                                          /* componentType : FLOAT */5,
                                                          /* type_ : VEC3 */2
                                                        ],
                                                        /* record */[
                                                          /* bufferView */1,
                                                          /* byteOffset */0,
                                                          /* count */24,
                                                          /* componentType : FLOAT */5,
                                                          /* type_ : VEC3 */2
                                                        ],
                                                        /* record */[
                                                          /* bufferView */2,
                                                          /* byteOffset */0,
                                                          /* count */24,
                                                          /* componentType : FLOAT */5,
                                                          /* type_ : VEC2 */1
                                                        ],
                                                        /* record */[
                                                          /* bufferView */3,
                                                          /* byteOffset */0,
                                                          /* count */36,
                                                          /* componentType : UNSIGNED_SHORT */3,
                                                          /* type_ : SCALAR */0
                                                        ]
                                                      ]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test geometrys", (function (param) {
                Wonder_jest.test("test single primitive", (function (param) {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* geometrys */18]), /* array */[/* record */[
                                                    /* name */"geometry_0",
                                                    /* position */0,
                                                    /* normal */1,
                                                    /* texCoord */2,
                                                    /* index */3
                                                  ]]);
                                    }), state, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("not support texCoord_1", (function (param) {
                              return Wonder_jest.describe("if attributes has texCoord_1", (function (param) {
                                            return Wonder_jest.test("should warn only once", (function (param) {
                                                          var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                                          return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfTexCoord1(/* () */0), (function (param) {
                                                                        return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg("not support texCoord_1", warn)));
                                                                      }), state, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test meshRenderers", (function (param) {
                Wonder_jest.describe("meshRenderers.length should === gameObjects.length", (function (param) {
                        return Wonder_jest.test("test single primitive", (function (param) {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* meshRenderers */19].length), 1);
                                                  }), state, undefined, /* () */0);
                                    }));
                      }));
                Wonder_jest.describe("test isRender", (function (param) {
                        Wonder_jest.describe("if has no extras, isRender should be true", (function (param) {
                                return Wonder_jest.test("test single primitive", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* meshRenderers */19]), /* array */[ConvertGLBTool$Wonderjs.buildMeshRenderer(true, undefined, /* () */0)]);
                                                          }), state, undefined, /* () */0);
                                            }));
                              }));
                        return Wonder_jest.describe("else, isRender should === extras->meshRenderers->isRender", (function (param) {
                                      return Wonder_jest.test("test", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMeshRenderer(true, false, /* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* meshRenderers */19]), /* array */[
                                                                              ConvertGLBTool$Wonderjs.buildMeshRenderer(true, /* Lines */1, /* () */0),
                                                                              ConvertGLBTool$Wonderjs.buildMeshRenderer(false, /* Line_strip */3, /* () */0)
                                                                            ]);
                                                                }), state, undefined, /* () */0);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test drawMode", (function (param) {
                              Wonder_jest.describe("if not has extras, drawMode should === gameObjects->mesh->drawMode", (function (param) {
                                      Wonder_jest.test("test single primitive", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* meshRenderers */19]), /* array */[ConvertGLBTool$Wonderjs.buildMeshRenderer(undefined, /* Triangles */4, /* () */0)]);
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.describe("test different nodes share the same mesh", (function (param) {
                                                    return Wonder_jest.test("test truck glb", (function (param) {
                                                                  return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* meshRenderers */19]), /* array */[
                                                                                            ConvertGLBTool$Wonderjs.buildMeshRenderer(undefined, /* Triangles */4, /* () */0),
                                                                                            ConvertGLBTool$Wonderjs.buildMeshRenderer(undefined, /* Triangles */4, /* () */0),
                                                                                            ConvertGLBTool$Wonderjs.buildMeshRenderer(undefined, /* Triangles */4, /* () */0),
                                                                                            ConvertGLBTool$Wonderjs.buildMeshRenderer(undefined, /* Triangles */4, /* () */0),
                                                                                            ConvertGLBTool$Wonderjs.buildMeshRenderer(undefined, /* Triangles */4, /* () */0)
                                                                                          ]);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("else, drawMode should === extras->meshRenderers->drawMode", (function (param) {
                                            return Wonder_jest.test("test", (function (param) {
                                                          return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMeshRenderer(undefined, undefined, /* () */0), (function (param) {
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* meshRenderers */19]), /* array */[
                                                                                    ConvertGLBTool$Wonderjs.buildMeshRenderer(undefined, /* Lines */1, /* () */0),
                                                                                    ConvertGLBTool$Wonderjs.buildMeshRenderer(undefined, /* Line_strip */3, /* () */0)
                                                                                  ]);
                                                                      }), state, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test indices", (function (param) {
                      Wonder_jest.describe("test gameObjectIndices", (function (param) {
                              Wonder_jest.describe("test childrenTransformIndexData", (function (param) {
                                      Wonder_jest.test("test single node gltf", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* childrenTransformIndexData */0]), /* record */[
                                                                        /* parentTransformIndices : array */[],
                                                                        /* childrenTransformIndices : array */[]
                                                                      ]);
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.test("test truck gltf", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* gameObjectIndices */0][/* childrenTransformIndexData */0]), /* record */[
                                                                              /* parentTransformIndices : array */[
                                                                                0,
                                                                                1,
                                                                                3
                                                                              ],
                                                                              /* childrenTransformIndices : array */[
                                                                                /* array */[
                                                                                  3,
                                                                                  1,
                                                                                  5,
                                                                                  6,
                                                                                  7
                                                                                ],
                                                                                /* array */[2],
                                                                                /* array */[4]
                                                                              ]
                                                                            ]);
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("test basicCameraViewGameObjectIndexData", (function (param) {
                                      Wonder_jest.test("test no data", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* basicCameraViewGameObjectIndexData */2]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[], /* array */[]));
                                                          }), state, undefined, /* () */0);
                                            }));
                                      Wonder_jest.test("test camera gltf", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* basicCameraViewGameObjectIndexData */2]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
                                                                            0,
                                                                            1
                                                                          ], /* array */[
                                                                            2,
                                                                            0
                                                                          ]));
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.test("test basicCameraView gltf", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* basicCameraViewGameObjectIndexData */2]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
                                                                                  0,
                                                                                  1,
                                                                                  2
                                                                                ], /* array */[
                                                                                  1,
                                                                                  0,
                                                                                  2
                                                                                ]));
                                                                }), state, undefined, /* () */0);
                                                  }));
                                    }));
                              Wonder_jest.describe("test perspectiveCameraProjectionGameObjectIndexData", (function (param) {
                                      Wonder_jest.test("test no data", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* perspectiveCameraProjectionGameObjectIndexData */3]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[], /* array */[]));
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.test("test camera gltf", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* perspectiveCameraProjectionGameObjectIndexData */3]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
                                                                                  0,
                                                                                  1
                                                                                ], /* array */[
                                                                                  1,
                                                                                  0
                                                                                ]));
                                                                }), state, undefined, /* () */0);
                                                  }));
                                    }));
                              Wonder_jest.describe("test meshRendererGameObjectIndexData", (function (param) {
                                      Wonder_jest.test("test extras", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMeshRenderer(undefined, undefined, /* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* meshRendererGameObjectIndexData */11]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[1]));
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.test("test truck glb", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* gameObjectIndices */0][/* meshRendererGameObjectIndexData */11]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
                                                                                  2,
                                                                                  4,
                                                                                  5,
                                                                                  6,
                                                                                  7
                                                                                ], /* array */[
                                                                                  0,
                                                                                  1,
                                                                                  2,
                                                                                  3,
                                                                                  4
                                                                                ]));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("test material GameObjectIndexData", (function (param) {
                                      Wonder_jest.describe("test basicMaterialGameObjectIndexData", (function (param) {
                                              return Wonder_jest.test("test extras", (function (param) {
                                                            return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterial(undefined, undefined, /* () */0), (function (param) {
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* basicMaterialGameObjectIndexData */6]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[0]));
                                                                        }), state, undefined, /* () */0);
                                                          }));
                                            }));
                                      Wonder_jest.describe("test lightMaterialGameObjectIndexData", (function (param) {
                                              Wonder_jest.test("test extras", (function (param) {
                                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLightMaterial(/* () */0), (function (param) {
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */7]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[1]));
                                                                  }), state, undefined, /* () */0);
                                                    }));
                                              Wonder_jest.test("test gltf", (function (param) {
                                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */7]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[0]));
                                                                  }), state, undefined, /* () */0);
                                                    }));
                                              return Wonder_jest.test("test truck glb", (function (param) {
                                                            return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */7]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
                                                                                          2,
                                                                                          4,
                                                                                          5,
                                                                                          6,
                                                                                          7
                                                                                        ], /* array */[
                                                                                          3,
                                                                                          3,
                                                                                          0,
                                                                                          1,
                                                                                          2
                                                                                        ]));
                                                                        }));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("test basicMaterial and lightMaterial gameObjectIndexData", (function (param) {
                                                    return Wonder_jest.test("test gltf", (function (param) {
                                                                  return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterialAndLightMaterial(/* () */0), (function (param) {
                                                                                var indices = param[/* indices */2];
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                indices[/* gameObjectIndices */0][/* basicMaterialGameObjectIndexData */6],
                                                                                                indices[/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */7]
                                                                                              ]), /* tuple */[
                                                                                            ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[0]),
                                                                                            ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
                                                                                                  1,
                                                                                                  2
                                                                                                ], /* array */[
                                                                                                  1,
                                                                                                  0
                                                                                                ])
                                                                                          ]);
                                                                              }), state, undefined, /* () */0);
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("test transformGameObjectIndexData", (function (param) {
                                      Wonder_jest.test("test single node gltf", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* transformGameObjectIndexData */1]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[0]));
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.test("test truck glb", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* gameObjectIndices */0][/* transformGameObjectIndexData */1]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
                                                                                  0,
                                                                                  1,
                                                                                  2,
                                                                                  3,
                                                                                  4,
                                                                                  5,
                                                                                  6,
                                                                                  7
                                                                                ], /* array */[
                                                                                  0,
                                                                                  1,
                                                                                  2,
                                                                                  3,
                                                                                  4,
                                                                                  5,
                                                                                  6,
                                                                                  7
                                                                                ]));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("test geometryGameObjectIndexData", (function (param) {
                                      Wonder_jest.test("test single node gltf", (function (param) {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* geometryGameObjectIndexData */10]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[0]));
                                                          }), state, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.test("test truck glb", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* gameObjectIndices */0][/* geometryGameObjectIndexData */10]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
                                                                                  2,
                                                                                  4,
                                                                                  5,
                                                                                  6,
                                                                                  7
                                                                                ], /* array */[
                                                                                  1,
                                                                                  1,
                                                                                  2,
                                                                                  3,
                                                                                  4
                                                                                ]));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("test directionLightGameObjectIndexData", (function (param) {
                                      return Wonder_jest.test("test light gltf", (function (param) {
                                                    return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* directionLightGameObjectIndexData */8]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[2], /* array */[0]));
                                                                }), state, undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test pointLightGameObjectIndexData", (function (param) {
                                            return Wonder_jest.test("test light gltf", (function (param) {
                                                          return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* pointLightGameObjectIndexData */9]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[3], /* array */[0]));
                                                                      }), state, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test materialIndices", (function (param) {
                              return Wonder_jest.describe("test diffuseMapMaterialIndices", (function (param) {
                                            return Wonder_jest.test("test truck glb", (function (param) {
                                                          return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* materialIndices */1][/* diffuseMapMaterialIndices */0]), /* record */[
                                                                                    /* materialIndices : array */[
                                                                                      0,
                                                                                      3
                                                                                    ],
                                                                                    /* mapIndices : array */[
                                                                                      0,
                                                                                      1
                                                                                    ]
                                                                                  ]);
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test imageBasicSourceTextureIndices", (function (param) {
                              return Wonder_jest.test("test truck glb", (function (param) {
                                            return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* imageBasicSourceTextureIndices */2]), /* record */[
                                                                      /* textureIndices : array */[
                                                                        0,
                                                                        1
                                                                      ],
                                                                      /* imageIndices : array */[
                                                                        0,
                                                                        0
                                                                      ]
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test samplerTextureIndices", (function (param) {
                                    return Wonder_jest.test("test truck glb", (function (param) {
                                                  return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* samplerTextureIndices */4]), /* record */[
                                                                            /* textureIndices : array */[
                                                                              0,
                                                                              1
                                                                            ],
                                                                            /* samplerIndices : array */[
                                                                              0,
                                                                              0
                                                                            ]
                                                                          ]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
