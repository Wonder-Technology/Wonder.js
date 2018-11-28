'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var GLBTool$Wonderjs = require("../tool/GLBTool.js");
var TestTool$Wonderjs = require("../../../../tool/TestTool.js");
var IMGUITool$Wonderjs = require("../../../../tool/service/imgui/IMGUITool.js");
var ConvertTool$Wonderjs = require("../tool/ConvertTool.js");
var OptionService$Wonderjs = require("../../../../../src/service/atom/OptionService.js");
var ConvertGLBTool$Wonderjs = require("../tool/ConvertGLBTool.js");
var CreateStateMainService$Wonderjs = require("../../../../../src/service/state/main/state/CreateStateMainService.js");
var ConvertMultiPrimitivesSystem$Wonderjs = require("../../../../../src/asset/converter/ConvertMultiPrimitivesSystem.js");
var ConvertGLTFJsonToRecordSystem$Wonderjs = require("../../../../../src/asset/converter/ConvertGLTFJsonToRecordSystem.js");

describe("convert glb to wd", (function () {
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
        describe("test multi primitives", (function () {
                describe("convert multi primitives to gltf nodes", (function () {
                        var _prepare = function () {
                          return ConvertMultiPrimitivesSystem$Wonderjs.convertMultiPrimitivesToNodes(ConvertGLTFJsonToRecordSystem$Wonderjs.convert(JSON.parse(ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitivesWithName(/* () */0))));
                        };
                        Wonder_jest.test("test nodes", (function () {
                                var gltfRecord = _prepare(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](gltfRecord[/* nodes */10]), /* array */[
                                            ConvertGLBTool$Wonderjs.buildNode(undefined, undefined, undefined, Js_primitive.some(/* array */[
                                                      3,
                                                      2,
                                                      1,
                                                      4,
                                                      5
                                                    ]), undefined, undefined, undefined, undefined, undefined, undefined, /* () */0),
                                            ConvertGLBTool$Wonderjs.buildNode("node1", undefined, 1, undefined, Js_primitive.some(/* array */[
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
                                            ConvertGLBTool$Wonderjs.buildNode("node2", undefined, undefined, Js_primitive.some(/* array */[
                                                      1,
                                                      6,
                                                      7
                                                    ]), Js_primitive.some(/* array */[
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
                                            ConvertGLBTool$Wonderjs.buildNode(undefined, undefined, undefined, Js_primitive.some(/* array */[
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
                        return Wonder_jest.test("test meshes", (function () {
                                      var gltfRecord = _prepare(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](gltfRecord[/* meshes */11]), /* array */[
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
                describe("test convert to wdb", (function () {
                        Wonder_jest.test("test geometrys", (function () {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitives(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* geometrys */16]), /* array */[
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
                        Wonder_jest.test("test meshRenderers", (function () {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitives(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* meshRenderers */17]), /* array */[
                                                          /* record */[/* drawMode : Triangles */4],
                                                          /* record */[/* drawMode : Triangles */4],
                                                          /* record */[/* drawMode : Triangles */4],
                                                          /* record */[/* drawMode : Triangles */4],
                                                          /* record */[/* drawMode : Triangles */4]
                                                        ]);
                                            }), state, undefined, /* () */0);
                              }));
                        describe("test gameObjects", (function () {
                                return Wonder_jest.test("test count", (function () {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitives(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* gameObjects */3][/* count */0]), 7);
                                                          }), state, undefined, /* () */0);
                                            }));
                              }));
                        describe("test indices", (function () {
                                describe("test gameObjectIndices", (function () {
                                        describe("test geometryGameObjectIndices", (function () {
                                                return Wonder_jest.test("test multi primitives geometry should has no gameObject", (function () {
                                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitives(/* () */0), (function (param) {
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* geometryGameObjectIndexData */9]), /* record */[
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
                                        describe("test meshRendererGameObjectIndices", (function () {
                                                return Wonder_jest.test("test multi primitives corresponding meshRenderer should has no gameObject", (function () {
                                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMultiPrimitives(/* () */0), (function (param) {
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* meshRendererGameObjectIndexData */10]), /* record */[
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
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test set default material", (function () {
                describe("test if node has any one material extras", (function () {
                        return Wonder_jest.test("not add default lightMaterial", (function () {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "[\n    {\n      \"mesh\" : 0,\n      \"extras\": {\n        \"lightMaterial\": 0\n      }\n    }\n  ] ", "[\n    {\n      \"primitives\" : [ {\n        \"attributes\" : {\n          \"POSITION\" : 1\n        },\n        \"indices\" : 0\n      } ]\n    }\n  ]", undefined, "[\n        {\n            \"pbrMetallicRoughness\": {\n            },\n            \"name\": \"material\"\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Caml_array.caml_array_get(param[/* lightMaterials */19], 0)[/* name */1]), "material");
                                                  }), state, undefined, /* () */0);
                                    }));
                      }));
                describe("else, test mesh has no material", (function () {
                        Wonder_jest.test("add default lightMaterial", (function () {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCameras(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* lightMaterials */19]), /* array */[/* record */[
                                                            /* diffuseColor */ConvertGLBTool$Wonderjs.getDefaultDiffuseColor(/* () */0),
                                                            /* name */"defaultLightMaterial"
                                                          ]]);
                                            }), state, undefined, /* () */0);
                              }));
                        Wonder_jest.test("test geometrys", (function () {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCameras(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* geometrys */16]), /* array */[/* record */[
                                                            /* name */"geometry_0",
                                                            /* position */0,
                                                            /* normal */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                            /* texCoord */ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                            /* index */1
                                                          ]]);
                                            }), state, undefined, /* () */0);
                              }));
                        return Wonder_jest.test("test default material's lightMaterialGameObjectIndexData", (function () {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCameras(/* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */6]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[0]));
                                                  }), state, undefined, /* () */0);
                                    }));
                      }));
                return /* () */0;
              }));
        Wonder_jest.test("test asset", (function () {
                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* asset */0]), /* record */[
                                          /* version */"2.0",
                                          /* generator */"GLTF2WD"
                                        ]);
                            }), state, undefined, /* () */0);
              }));
        describe("test scene", (function () {
                Wonder_jest.test("test gameObjects", (function () {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scene */1][/* gameObjects */0]), /* array */[0]);
                                    }), state, undefined, /* () */0);
                      }));
                Wonder_jest.test("test ambientLight", (function () {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scene */1][/* ambientLight */1]), /* record */[/* color : array */[
                                                    1,
                                                    0.5,
                                                    1
                                                  ]]);
                                    }), state, undefined, /* () */0);
                      }));
                return Wonder_jest.test("test imgui", (function () {
                              var customData = " [1, 2] ";
                              var imguiFunc = IMGUITool$Wonderjs.buildEmptyIMGUIFuncStr(/* () */0);
                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(customData, imguiFunc), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* scene */1][/* imgui */2]), /* record */[
                                                        /* imguiFunc */imguiFunc,
                                                        /* customData */customData
                                                      ]);
                                          }), state, undefined, /* () */0);
                            }));
              }));
        describe("test directionLights", (function () {
                return Wonder_jest.test("test light gltf", (function () {
                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* directionLights */10]), /* array */[/* record */[
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
        describe("test pointLights", (function () {
                return Wonder_jest.test("test light gltf", (function () {
                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* pointLights */11]), /* array */[/* record */[
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
        describe("test gameObjects", (function () {
                Wonder_jest.test("test single node gltf", (function () {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* gameObjects */3]), /* record */[
                                                  /* count */1,
                                                  /* names : array */["gameObject_0"]
                                                ]);
                                    }), state, undefined, /* () */0);
                      }));
                return Wonder_jest.test("test truck glb", (function () {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* gameObjects */3]), /* record */[
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
                                                        ]
                                                      ]);
                                          }));
                            }));
              }));
        describe("test camera data", (function () {
                describe("test basicCameraViews", (function () {
                        Wonder_jest.test("test no data", (function () {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicCameraViews */12]), /* array */[]);
                                            }), state, undefined, /* () */0);
                              }));
                        describe("test has data", (function () {
                                Wonder_jest.test("default isActiveIndex is 0", (function () {
                                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicCameraViews */12]), /* array */[
                                                                  /* record */[/* isActive */true],
                                                                  /* record */[/* isActive */false],
                                                                  /* record */[/* isActive */false]
                                                                ]);
                                                    }), state, undefined, /* () */0);
                                      }));
                                return Wonder_jest.test("test extras", (function () {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicCameraViews */12]), /* array */[
                                                                        /* record */[/* isActive */false],
                                                                        /* record */[/* isActive */true],
                                                                        /* record */[/* isActive */false]
                                                                      ]);
                                                          }), state, undefined, /* () */0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test perspectiveCameraProjections", (function () {
                        Wonder_jest.test("test no data", (function () {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* perspectiveCameraProjections */13]), /* array */[]);
                                            }), state, undefined, /* () */0);
                              }));
                        return Wonder_jest.test("test has data", (function () {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* perspectiveCameraProjections */13]), /* array */[
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
                return /* () */0;
              }));
        describe("test cameraController data", (function () {
                describe("test arcballCameraControllers", (function () {
                        Wonder_jest.test("test no data", (function () {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* arcballCameraControllers */14]), /* array */[]);
                                            }), state, undefined, /* () */0);
                              }));
                        return Wonder_jest.test("test has data", (function () {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(undefined, /* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* arcballCameraControllers */14]), /* array */[/* record */[
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
                return /* () */0;
              }));
        describe("test transforms", (function () {
                Wonder_jest.test("test matrix exist", (function () {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* transforms */15]), /* array */[/* record */[
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
                Wonder_jest.test("test transform gltf", (function () {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfTransform(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* transforms */15]), /* array */[
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
                describe("fix bug", (function () {
                        return Wonder_jest.test("fix get rotation bug", (function () {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, " [\n        {\n            \"matrix\": [\n            1.0,\n            0.0,\n            0.0,\n            0.0,\n            0.0,\n            0.0,\n            -1.0,\n            0.0,\n            0.0,\n            1.0,\n            0.0,\n            0.0,\n            0.0,\n            0.0,\n            0.0,\n            1.0\n          ]\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* transforms */15]), /* array */[/* record */[
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
                return /* () */0;
              }));
        describe("test basicMaterials", (function () {
                Wonder_jest.test("test no data", (function () {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJson(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "\n[\n        {\n        }\n    ]\n        ", undefined, " [\n        {\n            \"mesh\": 0,\n            \"extras\": {\n                \"basicMaterial\": 0\n            }\n        }\n    ]", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicMaterials */18]), /* array */[/* record */[
                                                    /* color */ConvertGLBTool$Wonderjs.getDefaultDiffuseColor(/* () */0),
                                                    /* name */"basicMaterial_0"
                                                  ]]);
                                    }), state, undefined, /* () */0);
                      }));
                describe("test has data", (function () {
                        return Wonder_jest.test("only set r,g,b components, ignore alpha component", (function () {
                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterial(/* array */[
                                                      0.1,
                                                      0.2,
                                                      0.3,
                                                      0.4
                                                    ], "name", /* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* basicMaterials */18]), /* array */[/* record */[
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
                return /* () */0;
              }));
        describe("test lightMaterials", (function () {
                Wonder_jest.test("test no data", (function () {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* lightMaterials */19]), /* array */[/* record */[
                                                    /* diffuseColor */ConvertGLBTool$Wonderjs.getDefaultDiffuseColor(/* () */0),
                                                    /* name */"Texture"
                                                  ]]);
                                    }));
                      }));
                describe("test has data", (function () {
                        return Wonder_jest.test("only set r,g,b components, ignore alpha component", (function () {
                                      return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* lightMaterials */19]), /* array */[
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
                return /* () */0;
              }));
        describe("test basicSourceTextures", (function () {
                Wonder_jest.test("test BoxTextured glb", (function () {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* basicSourceTextures */5]), /* array */[/* record */[
                                                    /* name */"texture_0",
                                                    /* format : Rgba */1
                                                  ]]);
                                    }));
                      }));
                return Wonder_jest.test("test basicSourceTextures", (function () {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* basicSourceTextures */5]), /* array */[
                                                        ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                        ConvertTool$Wonderjs.getJsonSerializedNone(/* () */0),
                                                        /* record */[
                                                          /* name */"texture_2",
                                                          /* format : Rgb */0
                                                        ],
                                                        /* record */[
                                                          /* name */"texture_3",
                                                          /* format : Rgba */1
                                                        ],
                                                        /* record */[
                                                          /* name */"texture_4",
                                                          /* format : Rgba */1
                                                        ],
                                                        /* record */[
                                                          /* name */"texture_5",
                                                          /* format : Rgba */1
                                                        ],
                                                        /* record */[
                                                          /* name */"texture_6",
                                                          /* format : Rgba */1
                                                        ],
                                                        /* record */[
                                                          /* name */"texture_7",
                                                          /* format : Rgba */1
                                                        ]
                                                      ]);
                                          }));
                            }));
              }));
        describe("test samplers", (function () {
                return Wonder_jest.test("test", (function () {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* samplers */6]), /* array */[/* record */[
                                                          /* magFilter : Linear */1,
                                                          /* minFilter : Nearest_mipmap_linear */4,
                                                          /* wrapS : Repeat */2,
                                                          /* wrapT : Repeat */2
                                                        ]]);
                                          }));
                            }));
              }));
        describe("test images", (function () {
                Wonder_jest.test("test BoxTextured glb", (function () {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      var images = OptionService$Wonderjs.unsafeGet(param[0][/* images */4]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](images), /* array */[/* record */[
                                                    /* name */"CesiumLogoFlat.png",
                                                    /* bufferView */4,
                                                    /* mimeType */"image/png"
                                                  ]]);
                                    }));
                      }));
                return Wonder_jest.test("test AlphaBlendModeTest glb", (function () {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                            var images = OptionService$Wonderjs.unsafeGet(param[0][/* images */4]);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](images), /* array */[
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
        describe("test bufferViews", (function () {
                Wonder_jest.test("test BoxTextured glb", (function () {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* bufferViews */8]), /* array */[
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
                return Wonder_jest.test("test AlphaBlendModeTest glb", (function () {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                            var bufferViews = param[0][/* bufferViews */8];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
        describe("test buffers", (function () {
                Wonder_jest.test("test BoxTextured glb", (function () {
                        return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* buffers */7]), /* array */[24360]);
                                    }));
                      }));
                return Wonder_jest.test("test AlphaBlendModeTest glb", (function () {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* buffers */7]), /* array */[3004960]);
                                          }));
                            }));
              }));
        describe("test accessors", (function () {
                return Wonder_jest.test("test BoxTextured glb", (function () {
                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* accessors */9]), /* array */[
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
        describe("test geometrys", (function () {
                Wonder_jest.test("test single primitive", (function () {
                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* geometrys */16]), /* array */[/* record */[
                                                    /* name */"geometry_0",
                                                    /* position */0,
                                                    /* normal */1,
                                                    /* texCoord */2,
                                                    /* index */3
                                                  ]]);
                                    }), state, undefined, /* () */0);
                      }));
                describe("not support texCoord_1", (function () {
                        describe("if attributes has texCoord_1", (function () {
                                return Wonder_jest.test("should warn only once", (function () {
                                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfTexCoord1(/* () */0), (function () {
                                                            return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](Sinon.withOneArg("not support texCoord_1", warn)));
                                                          }), state, undefined, /* () */0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test meshRenderers", (function () {
                describe("meshRenderers.length should === custom geometry gameObjects.length;\nmeshRenderers->drawMode should === custom geometry gameObjects->mesh->drawMode;\n", (function () {
                        Wonder_jest.test("test single primitive", (function () {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* meshRenderers */17]), /* array */[/* record */[/* drawMode : Triangles */4]]);
                                            }), state, undefined, /* () */0);
                              }));
                        Wonder_jest.test("test extras", (function () {
                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMeshRenderer(/* () */0), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* meshRenderers */17]), /* array */[
                                                          /* record */[/* drawMode : Lines */1],
                                                          /* record */[/* drawMode : Line_strip */3]
                                                        ]);
                                            }), state, undefined, /* () */0);
                              }));
                        describe("test different nodes share the same mesh", (function () {
                                return Wonder_jest.test("test truck glb", (function () {
                                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* meshRenderers */17]), /* array */[
                                                                        /* record */[/* drawMode : Triangles */4],
                                                                        /* record */[/* drawMode : Triangles */4],
                                                                        /* record */[/* drawMode : Triangles */4],
                                                                        /* record */[/* drawMode : Triangles */4],
                                                                        /* record */[/* drawMode : Triangles */4]
                                                                      ]);
                                                          }));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test indices", (function () {
                describe("test gameObjectIndices", (function () {
                        describe("test childrenTransformIndexData", (function () {
                                Wonder_jest.test("test single node gltf", (function () {
                                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* childrenTransformIndexData */0]), /* record */[
                                                                  /* parentTransformIndices : array */[],
                                                                  /* childrenTransformIndices : array */[]
                                                                ]);
                                                    }), state, undefined, /* () */0);
                                      }));
                                return Wonder_jest.test("test truck gltf", (function () {
                                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* gameObjectIndices */0][/* childrenTransformIndexData */0]), /* record */[
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
                        describe("test basicCameraViewGameObjectIndexData", (function () {
                                Wonder_jest.test("test no data", (function () {
                                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* basicCameraViewGameObjectIndexData */2]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[], /* array */[]));
                                                    }), state, undefined, /* () */0);
                                      }));
                                Wonder_jest.test("test camera gltf", (function () {
                                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* basicCameraViewGameObjectIndexData */2]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
                                                                      0,
                                                                      1
                                                                    ], /* array */[
                                                                      2,
                                                                      0
                                                                    ]));
                                                    }), state, undefined, /* () */0);
                                      }));
                                return Wonder_jest.test("test basicCameraView gltf", (function () {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* basicCameraViewGameObjectIndexData */2]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
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
                        describe("test perspectiveCameraProjectionGameObjectIndexData", (function () {
                                Wonder_jest.test("test no data", (function () {
                                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* perspectiveCameraProjectionGameObjectIndexData */3]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[], /* array */[]));
                                                    }), state, undefined, /* () */0);
                                      }));
                                return Wonder_jest.test("test camera gltf", (function () {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* perspectiveCameraProjectionGameObjectIndexData */3]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
                                                                            0,
                                                                            1
                                                                          ], /* array */[
                                                                            1,
                                                                            0
                                                                          ]));
                                                          }), state, undefined, /* () */0);
                                            }));
                              }));
                        describe("test meshRendererGameObjectIndexData", (function () {
                                Wonder_jest.test("test extras", (function () {
                                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMeshRenderer(/* () */0), (function (param) {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* meshRendererGameObjectIndexData */10]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[1]));
                                                    }), state, undefined, /* () */0);
                                      }));
                                return Wonder_jest.test("test truck glb", (function () {
                                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* gameObjectIndices */0][/* meshRendererGameObjectIndexData */10]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
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
                        describe("test material GameObjectIndexData", (function () {
                                describe("test basicMaterialGameObjectIndexData", (function () {
                                        return Wonder_jest.test("test extras", (function () {
                                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterial(undefined, undefined, /* () */0), (function (param) {
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* basicMaterialGameObjectIndexData */5]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[0]));
                                                                  }), state, undefined, /* () */0);
                                                    }));
                                      }));
                                describe("test lightMaterialGameObjectIndexData", (function () {
                                        Wonder_jest.test("test extras", (function () {
                                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLightMaterial(/* () */0), (function (param) {
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */6]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[1]));
                                                            }), state, undefined, /* () */0);
                                              }));
                                        Wonder_jest.test("test gltf", (function () {
                                                return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */6]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[0]));
                                                            }), state, undefined, /* () */0);
                                              }));
                                        return Wonder_jest.test("test truck glb", (function () {
                                                      return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */6]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
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
                                describe("test basicMaterial and lightMaterial gameObjectIndexData", (function () {
                                        return Wonder_jest.test("test gltf", (function () {
                                                      return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterialAndLightMaterial(/* () */0), (function (param) {
                                                                    var indices = param[/* indices */2];
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    indices[/* gameObjectIndices */0][/* basicMaterialGameObjectIndexData */5],
                                                                                    indices[/* gameObjectIndices */0][/* lightMaterialGameObjectIndexData */6]
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
                                return /* () */0;
                              }));
                        describe("test transformGameObjectIndexData", (function () {
                                Wonder_jest.test("test single node gltf", (function () {
                                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* transformGameObjectIndexData */1]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[0]));
                                                    }), state, undefined, /* () */0);
                                      }));
                                return Wonder_jest.test("test truck glb", (function () {
                                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* gameObjectIndices */0][/* transformGameObjectIndexData */1]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
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
                        describe("test geometryGameObjectIndexData", (function () {
                                Wonder_jest.test("test single node gltf", (function () {
                                        return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* geometryGameObjectIndexData */9]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[0], /* array */[0]));
                                                    }), state, undefined, /* () */0);
                                      }));
                                return Wonder_jest.test("test truck glb", (function () {
                                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* gameObjectIndices */0][/* geometryGameObjectIndexData */9]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[
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
                        describe("test directionLightGameObjectIndexData", (function () {
                                return Wonder_jest.test("test light gltf", (function () {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* directionLightGameObjectIndexData */7]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[2], /* array */[0]));
                                                          }), state, undefined, /* () */0);
                                            }));
                              }));
                        describe("test pointLightGameObjectIndexData", (function () {
                                return Wonder_jest.test("test light gltf", (function () {
                                              return ConvertGLBTool$Wonderjs.testGLTFResultByGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[/* indices */2][/* gameObjectIndices */0][/* pointLightGameObjectIndexData */8]), ConvertGLBTool$Wonderjs.buildComponentIndexData(/* array */[3], /* array */[0]));
                                                          }), state, undefined, /* () */0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test materialIndices", (function () {
                        describe("test diffuseMapMaterialIndices", (function () {
                                return Wonder_jest.test("test truck glb", (function () {
                                              return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* materialIndices */1][/* diffuseMapMaterialIndices */0]), /* record */[
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
                        return /* () */0;
                      }));
                describe("test imageTextureIndices", (function () {
                        return Wonder_jest.test("test truck glb", (function () {
                                      return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* imageTextureIndices */2]), /* record */[
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
                describe("test samplerTextureIndices", (function () {
                        return Wonder_jest.test("test truck glb", (function () {
                                      return ConvertGLBTool$Wonderjs.testResult(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[0][/* indices */2][/* samplerTextureIndices */3]), /* record */[
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
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
