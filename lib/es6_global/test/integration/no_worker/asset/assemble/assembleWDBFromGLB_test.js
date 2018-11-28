

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as GLBTool$Wonderjs from "../tool/GLBTool.js";
import * as GLTFTool$Wonderjs from "../tool/GLTFTool.js";
import * as SceneAPI$Wonderjs from "../../../../../src/api/SceneAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ViewTool$Wonderjs from "../../../../tool/service/device/ViewTool.js";
import * as IMGUITool$Wonderjs from "../../../../tool/service/imgui/IMGUITool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as StringTool$Wonderjs from "../../../../tool/StringTool.js";
import * as ConvertTool$Wonderjs from "../tool/ConvertTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as ArrayService$Wonderjs from "../../../../../src/service/atom/ArrayService.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../../../../../src/service/atom/OptionService.js";
import * as PointLightAPI$Wonderjs from "../../../../../src/api/light/PointLightAPI.js";
import * as SerializeTool$Wonderjs from "../../../../unit/tool/service/atom/SerializeTool.js";
import * as TransformTool$Wonderjs from "../../../../tool/service/transform/TransformTool.js";
import * as ConvertGLBTool$Wonderjs from "../tool/ConvertGLBTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../src/api/light/DirectionLightAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as BasicCameraViewAPI$Wonderjs from "../../../../../src/api/camera/BasicCameraViewAPI.js";
import * as AssembleWDBSystemTool$Wonderjs from "../tool/AssembleWDBSystemTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";

describe("assemble wdb from glb", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(10000, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return ConvertTool$Wonderjs.setFakeTransformCount(50);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("build scene gameObject", (function () {
                Wonder_jest.testPromise("test single scene gameObject", (function () {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[2]), 1);
                                    }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.testPromise("test multi scene gameObjects", (function () {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], AssembleWDBSystemTool$Wonderjs.buildGLTFJsonOfMultiSceneGameObjects(/* () */0), (function (param) {
                                            var rootGameObject = param[2];
                                            var state = param[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            rootGameObject,
                                                            TransformAPI$Wonderjs.unsafeGetTransformChildren(GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state), state)
                                                          ]), /* tuple */[
                                                        3,
                                                        /* array */[
                                                          1,
                                                          2
                                                        ]
                                                      ]);
                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                            }));
              }));
        describe("test imgui", (function () {
                describe("if isSetIMGUIFunc === true, set imgui func and custom data", (function () {
                        describe("test return hasIMGUIFunc", (function () {
                                return Wonder_jest.testPromise("return true", (function () {
                                              var imguiFunc = IMGUITool$Wonderjs.buildEmptyIMGUIFuncStr(/* () */0);
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI("[ 1, \\\"function (a) { return a; }\\\" ]", imguiFunc), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[1][1]), true);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        describe("test customData", (function () {
                                return Wonder_jest.testPromise("test value with function", (function () {
                                              var imguiFunc = IMGUITool$Wonderjs.buildEmptyIMGUIFuncStr(/* () */0);
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI("[ 1, \\\"function (a) { return a; }\\\" ]", imguiFunc), (function (param) {
                                                            var match = OptionService$Wonderjs.unsafeGet(IMGUITool$Wonderjs.getCustomData(param[0]));
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._1(match[1], 10)), 10);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        Wonder_jest.testPromise("test empty imgui func", (function () {
                                var customData = "1";
                                var imguiFunc = IMGUITool$Wonderjs.buildEmptyIMGUIFuncStr(/* () */0);
                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(customData, imguiFunc), (function (param) {
                                              var state = param[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              SerializeTool$Wonderjs.serializeFunction(OptionService$Wonderjs.unsafeGet(IMGUITool$Wonderjs.getIMGUIFunc(state))),
                                                              OptionService$Wonderjs.unsafeGet(IMGUITool$Wonderjs.getCustomData(state))
                                                            ]), /* tuple */[
                                                          imguiFunc,
                                                          JSON.parse(customData)
                                                        ]);
                                            }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        return Wonder_jest.testPromise("test use apiJsObj", (function () {
                                      var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                      var gameObject = match[1];
                                      var customData = JSON.stringify(/* array */[gameObject]);
                                      var imguiFunc = StringTool$Wonderjs.removeNewLines(SerializeTool$Wonderjs.serializeFunction((function (customData, apiJsObj, state) {
                                                  var gameObject = customData[0];
                                                  var unsafeGetGameObjectLightMaterialComponent = apiJsObj.unsafeGetGameObjectLightMaterialComponent;
                                                  unsafeGetGameObjectLightMaterialComponent(gameObject, state);
                                                  return state;
                                                })));
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(customData, imguiFunc), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    StringTool$Wonderjs.removeSpaces(StringTool$Wonderjs.removeNewLines(SerializeTool$Wonderjs.serializeFunction(OptionService$Wonderjs.unsafeGet(IMGUITool$Wonderjs.getIMGUIFunc(state))))),
                                                                    OptionService$Wonderjs.unsafeGet(IMGUITool$Wonderjs.getCustomData(state))
                                                                  ]), /* tuple */[
                                                                StringTool$Wonderjs.removeSpaces(StringTool$Wonderjs.removeNewLines("\n                         function (customData, apiJsObj, state) {\n                           var gameObject = customData[0];\n                           var unsafeGetGameObjectLightMaterialComponent = apiJsObj.unsafeGetGameObjectLightMaterialComponent;\n                           unsafeGetGameObjectLightMaterialComponent(gameObject, state);\n                           return state;\n                         }\n                       ")),
                                                                /* array */[gameObject]
                                                              ]);
                                                  }), /* record */[/* contents */match[0]], undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                describe("else, not set", (function () {
                        describe("test return hasIMGUIFunc", (function () {
                                return Wonder_jest.testPromise("return true", (function () {
                                              var imguiFunc = IMGUITool$Wonderjs.buildEmptyIMGUIFuncStr(/* () */0);
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI("[ 1, \\\"function (a) { return a; }\\\" ]", imguiFunc), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](param[1][1]), true);
                                                          }), state, undefined, false, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        return Wonder_jest.testPromise("test no customData", (function () {
                                      var imguiFunc = IMGUITool$Wonderjs.buildEmptyIMGUIFuncStr(/* () */0);
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI("[ 1, \\\"function (a) { return a; }\\\" ]", imguiFunc), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(IMGUITool$Wonderjs.getCustomData(param[0]))), true);
                                                  }), state, undefined, false, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test gameObject", (function () {
                describe("set gameObject name", (function () {
                        return Wonder_jest.testPromise("test", (function () {
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2], state).map((function (gameObject) {
                                                                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectName(gameObject, state);
                                                                        }))), /* array */[
                                                                "gameObject_0",
                                                                "gameObject_3",
                                                                "gameObject_1",
                                                                "Cesium_Milk_Truck_0",
                                                                "Cesium_Milk_Truck_1",
                                                                "Cesium_Milk_Truck_2",
                                                                "Wheels",
                                                                "Wheels"
                                                              ]);
                                                  }), state[0]);
                                    }));
                      }));
                describe("test gameObject count", (function () {
                        return Wonder_jest.testPromise("test 2CylinderEngine glb", (function () {
                                      ConvertTool$Wonderjs.setFakeTransformCount(1000);
                                      state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(300000, 50, 500, undefined, 500, undefined, undefined, 500, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("2CylinderEngine.glb"), (function (param) {
                                                    GLTFTool$Wonderjs.getTruckGeometryData(/* () */0);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2], param[0]).length), 159);
                                                  }), state[0]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test transforms", (function () {
                describe("test set parent", (function () {
                        Wonder_jest.testPromise("test children", (function () {
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                              var allTransformChildren = AssembleWDBSystemTool$Wonderjs.getAllChildrenTransform(param[2], param[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](allTransformChildren), /* array */[
                                                          4,
                                                          2,
                                                          6,
                                                          7,
                                                          8,
                                                          5,
                                                          3
                                                        ]);
                                            }), state[0]);
                              }));
                        return Wonder_jest.testPromise("test parent", (function () {
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    var state = param[0];
                                                    AssembleWDBSystemTool$Wonderjs.getAllChildrenTransform(param[2], state);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.getRecord(state)[/* parentMap */15]), /* array */[
                                                                undefined,
                                                                undefined,
                                                                1,
                                                                2,
                                                                1,
                                                                4,
                                                                1,
                                                                1,
                                                                1
                                                              ]);
                                                  }), state[0]);
                                    }));
                      }));
                describe("test set data", (function () {
                        return Wonder_jest.testPromise("test set localPosition, localRotation, localScale", (function () {
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllSortedTransforms(param[2], state).map((function (transform) {
                                                                          return /* tuple */[
                                                                                  TransformAPI$Wonderjs.getTransformLocalPosition(transform, state),
                                                                                  TransformAPI$Wonderjs.getTransformLocalRotation(transform, state),
                                                                                  TransformAPI$Wonderjs.getTransformLocalScale(transform, state)
                                                                                ];
                                                                        }))), /* array */[
                                                                /* tuple */[
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0
                                                                  ],
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ],
                                                                  /* tuple */[
                                                                    1,
                                                                    1,
                                                                    1
                                                                  ]
                                                                ],
                                                                /* tuple */[
                                                                  /* tuple */[
                                                                    -1.352329969406128,
                                                                    0.4277220070362091,
                                                                    -2.98022992950564e-8
                                                                  ],
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ],
                                                                  /* tuple */[
                                                                    1,
                                                                    1,
                                                                    1
                                                                  ]
                                                                ],
                                                                /* tuple */[
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0
                                                                  ],
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0.08848590403795242,
                                                                    -0.9960774183273315
                                                                  ],
                                                                  /* tuple */[
                                                                    1,
                                                                    1,
                                                                    1
                                                                  ]
                                                                ],
                                                                /* tuple */[
                                                                  /* tuple */[
                                                                    1.432669997215271,
                                                                    0.4277220070362091,
                                                                    -2.98022992950564e-8
                                                                  ],
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ],
                                                                  /* tuple */[
                                                                    1,
                                                                    1,
                                                                    1
                                                                  ]
                                                                ],
                                                                /* tuple */[
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0
                                                                  ],
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0.08848590403795242,
                                                                    -0.9960774183273315
                                                                  ],
                                                                  /* tuple */[
                                                                    1,
                                                                    1,
                                                                    1
                                                                  ]
                                                                ],
                                                                /* tuple */[
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0
                                                                  ],
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ],
                                                                  /* tuple */[
                                                                    1,
                                                                    1,
                                                                    1
                                                                  ]
                                                                ],
                                                                /* tuple */[
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0
                                                                  ],
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ],
                                                                  /* tuple */[
                                                                    1,
                                                                    1,
                                                                    1
                                                                  ]
                                                                ],
                                                                /* tuple */[
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0
                                                                  ],
                                                                  /* tuple */[
                                                                    0,
                                                                    0,
                                                                    0,
                                                                    1
                                                                  ],
                                                                  /* tuple */[
                                                                    1,
                                                                    1,
                                                                    1
                                                                  ]
                                                                ]
                                                              ]);
                                                  }), state[0]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test geometrys", (function () {
                describe("test set point data", (function () {
                        Wonder_jest.testPromise("test single node gltf", (function () {
                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                              var state = param[0];
                                              var geometry = GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(param[2], state);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              GeometryAPI$Wonderjs.getGeometryVertices(geometry, state),
                                                              GeometryAPI$Wonderjs.getGeometryNormals(geometry, state),
                                                              GeometryAPI$Wonderjs.getGeometryTexCoords(geometry, state),
                                                              Js_primitive.some(GeometryAPI$Wonderjs.getGeometryIndices(geometry, state)),
                                                              undefined
                                                            ]), GLTFTool$Wonderjs.getBoxTexturedGeometryData(/* () */0));
                                            }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        Wonder_jest.testPromise("test truck glb", (function () {
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                              var dataMap = GLTFTool$Wonderjs.getTruckGeometryData(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2], param[0])), /* array */[
                                                          /* tuple */[
                                                            "Cesium_Milk_Truck_0",
                                                            HashMapService$WonderCommonlib.unsafeGet("Cesium_Milk_Truck_0", dataMap)
                                                          ],
                                                          /* tuple */[
                                                            "Cesium_Milk_Truck_1",
                                                            HashMapService$WonderCommonlib.unsafeGet("Cesium_Milk_Truck_1", dataMap)
                                                          ],
                                                          /* tuple */[
                                                            "Cesium_Milk_Truck_2",
                                                            HashMapService$WonderCommonlib.unsafeGet("Cesium_Milk_Truck_2", dataMap)
                                                          ],
                                                          /* tuple */[
                                                            "Wheels",
                                                            HashMapService$WonderCommonlib.unsafeGet("Wheels", dataMap)
                                                          ],
                                                          /* tuple */[
                                                            "Wheels",
                                                            HashMapService$WonderCommonlib.unsafeGet("Wheels", dataMap)
                                                          ]
                                                        ]);
                                            }), state[0]);
                              }));
                        Wonder_jest.testPromise("test AlphaBlendModeTest glb", (function () {
                                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(8000000, 50, 500, undefined, 500, undefined, undefined, 500, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                              var allGeometryData = AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2], param[0]);
                                              var dataMap = GLTFTool$Wonderjs.getAlphaBlendModeTestGeometryData(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              allGeometryData.length,
                                                              Caml_array.caml_array_get(allGeometryData, 1)
                                                            ]), /* tuple */[
                                                          9,
                                                          /* tuple */[
                                                            "DecalBlendMesh",
                                                            HashMapService$WonderCommonlib.unsafeGet("DecalBlendMesh", dataMap)
                                                          ]
                                                        ]);
                                            }), state[0]);
                              }));
                        Wonder_jest.testPromise("test SuperLowPolyStove glb", (function () {
                                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(100000, 100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                              var allGeometryData = AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2], param[0]);
                                              var dataMap = GLTFTool$Wonderjs.getSuperLowPolyStoveGeometryData(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              allGeometryData.length,
                                                              Caml_array.caml_array_get(allGeometryData, 1)
                                                            ]), /* tuple */[
                                                          2,
                                                          /* tuple */[
                                                            "Stove_1",
                                                            HashMapService$WonderCommonlib.unsafeGet("Stove_1", dataMap)
                                                          ]
                                                        ]);
                                            }), state[0]);
                              }));
                        return Wonder_jest.testPromise("test gameObjects which has no cutomGeometry component", (function () {
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllSortedTransforms(param[2], state).map((function (transform) {
                                                                            return TransformAPI$Wonderjs.unsafeGetTransformGameObject(transform, state);
                                                                          })).map((function (gameObject) {
                                                                          return GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent(gameObject, state);
                                                                        }))), /* array */[
                                                                false,
                                                                false,
                                                                true,
                                                                false,
                                                                true,
                                                                true,
                                                                true,
                                                                true
                                                              ]);
                                                  }), state[0]);
                                    }));
                      }));
                describe("set geometry name", (function () {
                        Wonder_jest.testPromise("test BoxTextured glb", (function () {
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                              var state = param[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometrys(param[2], state).map((function (geometry) {
                                                                    return GeometryAPI$Wonderjs.unsafeGetGeometryName(geometry, state);
                                                                  }))), /* array */["Mesh"]);
                                            }), state[0]);
                              }));
                        return Wonder_jest.testPromise("test truck glb", (function () {
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometrys(param[2], state).map((function (geometry) {
                                                                          return GeometryAPI$Wonderjs.unsafeGetGeometryName(geometry, state);
                                                                        }))), /* array */[
                                                                "Cesium_Milk_Truck_0",
                                                                "Cesium_Milk_Truck_1",
                                                                "Cesium_Milk_Truck_2",
                                                                "Wheels",
                                                                "Wheels"
                                                              ]);
                                                  }), state[0]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test basicCameraViews", (function () {
                describe("test add basicCameraView components", (function () {
                        return Wonder_jest.testPromise("test", (function () {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2], state).map((function (gameObject) {
                                                                          return GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent(gameObject, state);
                                                                        }))), /* array */[
                                                                true,
                                                                true,
                                                                false
                                                              ]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                describe("test set active", (function () {
                        var _getAllBasicCameraViewGameObjects = function (rootGameObject, state) {
                          return AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                                        return GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent(gameObject, state);
                                      }));
                        };
                        describe("test no extras", (function () {
                                describe("active the one whose cameraViewIndex === 0", (function () {
                                        Wonder_jest.testPromise("if isActiveCamera === false, not active", (function () {
                                                var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state[0]);
                                                var basicCameraView = match[1];
                                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                              var state = param[0];
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.push(basicCameraView, _getAllBasicCameraViewGameObjects(param[2], state).map((function (gameObject) {
                                                                                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent(gameObject, state);
                                                                                        }))).map((function (cameraView) {
                                                                                    return /* tuple */[
                                                                                            cameraView,
                                                                                            BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView, state)
                                                                                          ];
                                                                                  }))), /* array */[
                                                                          /* tuple */[
                                                                            3,
                                                                            false
                                                                          ],
                                                                          /* tuple */[
                                                                            1,
                                                                            false
                                                                          ],
                                                                          /* tuple */[
                                                                            0,
                                                                            false
                                                                          ]
                                                                        ]);
                                                            }), /* record */[/* contents */match[0]], undefined, undefined, undefined, false, undefined, undefined, /* () */0);
                                              }));
                                        describe("else", (function () {
                                                return Wonder_jest.testPromise("unactive other ones", (function () {
                                                              var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state[0]);
                                                              var basicCameraView = match[1];
                                                              var state$1 = BasicCameraViewAPI$Wonderjs.activeBasicCameraView(basicCameraView, match[0]);
                                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                                            var state = param[0];
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.push(basicCameraView, _getAllBasicCameraViewGameObjects(param[2], state).map((function (gameObject) {
                                                                                                        return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent(gameObject, state);
                                                                                                      }))).map((function (cameraView) {
                                                                                                  return /* tuple */[
                                                                                                          cameraView,
                                                                                                          BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView, state)
                                                                                                        ];
                                                                                                }))), /* array */[
                                                                                        /* tuple */[
                                                                                          3,
                                                                                          false
                                                                                        ],
                                                                                        /* tuple */[
                                                                                          1,
                                                                                          true
                                                                                        ],
                                                                                        /* tuple */[
                                                                                          0,
                                                                                          false
                                                                                        ]
                                                                                      ]);
                                                                          }), /* record */[/* contents */state$1], undefined, undefined, undefined, true, undefined, undefined, /* () */0);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test extras", (function () {
                                Wonder_jest.testPromise("if isActiveCamera === false, not active", (function () {
                                        var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state[0]);
                                        var basicCameraView = match[1];
                                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), (function (param) {
                                                      var state = param[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.push(basicCameraView, _getAllBasicCameraViewGameObjects(param[2], state).map((function (gameObject) {
                                                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent(gameObject, state);
                                                                                }))).map((function (cameraView) {
                                                                            return /* tuple */[
                                                                                    cameraView,
                                                                                    BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView, state)
                                                                                  ];
                                                                          }))), /* array */[
                                                                  /* tuple */[
                                                                    2,
                                                                    false
                                                                  ],
                                                                  /* tuple */[
                                                                    1,
                                                                    false
                                                                  ],
                                                                  /* tuple */[
                                                                    3,
                                                                    false
                                                                  ],
                                                                  /* tuple */[
                                                                    0,
                                                                    false
                                                                  ]
                                                                ]);
                                                    }), /* record */[/* contents */match[0]], undefined, undefined, undefined, false, undefined, undefined, /* () */0);
                                      }));
                                describe("else", (function () {
                                        return Wonder_jest.testPromise("unactive other ones", (function () {
                                                      var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state[0]);
                                                      var basicCameraView = match[1];
                                                      var state$1 = BasicCameraViewAPI$Wonderjs.activeBasicCameraView(basicCameraView, match[0]);
                                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), (function (param) {
                                                                    var state = param[0];
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.push(basicCameraView, _getAllBasicCameraViewGameObjects(param[2], state).map((function (gameObject) {
                                                                                                return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent(gameObject, state);
                                                                                              }))).map((function (cameraView) {
                                                                                          return /* tuple */[
                                                                                                  cameraView,
                                                                                                  BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView, state)
                                                                                                ];
                                                                                        }))), /* array */[
                                                                                /* tuple */[
                                                                                  2,
                                                                                  true
                                                                                ],
                                                                                /* tuple */[
                                                                                  1,
                                                                                  false
                                                                                ],
                                                                                /* tuple */[
                                                                                  3,
                                                                                  false
                                                                                ],
                                                                                /* tuple */[
                                                                                  0,
                                                                                  false
                                                                                ]
                                                                              ]);
                                                                  }), /* record */[/* contents */state$1], undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test perspectiveCameraProjections", (function () {
                describe("test set data", (function () {
                        var _getAllPerspectiveCameraProjectionComponent = function (rootGameObject, state) {
                          return AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                                          return GameObjectAPI$Wonderjs.hasGameObjectPerspectiveCameraProjectionComponent(gameObject, state);
                                        })).map((function (gameObject) {
                                        return GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(gameObject, state);
                                      }));
                        };
                        Wonder_jest.testPromise("test set near, fovy", (function () {
                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                              var state = param[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllPerspectiveCameraProjectionComponent(param[2], state).map((function (cameraProjection) {
                                                                    return /* tuple */[
                                                                            PerspectiveCameraProjectionTool$Wonderjs.unsafeGetNear(cameraProjection, state),
                                                                            PerspectiveCameraProjectionTool$Wonderjs.unsafeGetFovy(cameraProjection, state)
                                                                          ];
                                                                  }))), /* array */[
                                                          /* tuple */[
                                                            2,
                                                            28.64788975654116
                                                          ],
                                                          /* tuple */[
                                                            1,
                                                            34.37746770784939
                                                          ]
                                                        ]);
                                            }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        describe("test set far", (function () {
                                return Wonder_jest.testPromise("if no far, set infinite", (function () {
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                            var state = param[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllPerspectiveCameraProjectionComponent(param[2], state).map((function (cameraProjection) {
                                                                                  return PerspectiveCameraProjectionTool$Wonderjs.unsafeGetFar(cameraProjection, state);
                                                                                }))), /* array */[
                                                                        1000,
                                                                        100000
                                                                      ]);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        describe("test set aspect", (function () {
                                return Wonder_jest.testPromise("if has no aspect data, not set aspect", (function () {
                                              var state = RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n       [\n           {\n             \"name\": \"default\",\n             \"jobs\": [\n               {\n                 \"name\": \"init_camera\"\n               }\n               ]\n           }\n       ]\n               ", undefined, undefined, undefined, /* () */0));
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                            var state = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), param[0]);
                                                            var canvas = {
                                                              width: 100,
                                                              height: 200
                                                            };
                                                            var state$1 = ViewTool$Wonderjs.setCanvas(canvas, state);
                                                            var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllPerspectiveCameraProjectionComponent(param[2], state$2).map((function (cameraProjection) {
                                                                                  return PerspectiveCameraProjectionTool$Wonderjs.getAspect(cameraProjection, state$2);
                                                                                }))), /* array */[
                                                                        2,
                                                                        undefined
                                                                      ]);
                                                          }), /* record */[/* contents */state], undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test arcballCameraControllers", (function () {
                describe("test set data", (function () {
                        var _getAllArcballCameraControllerComponent = function (rootGameObject, state) {
                          return AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                                          return GameObjectAPI$Wonderjs.hasGameObjectArcballCameraControllerComponent(gameObject, state);
                                        })).map((function (gameObject) {
                                        return GameObjectAPI$Wonderjs.unsafeGetGameObjectArcballCameraControllerComponent(gameObject, state);
                                      }));
                        };
                        Wonder_jest.testPromise("test set distance", (function () {
                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(undefined, /* () */0), (function (param) {
                                              var state = param[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2], state).map((function (cameraController) {
                                                                    return ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state);
                                                                  }))), /* array */[1.5]);
                                            }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        Wonder_jest.testPromise("test set minDistance", (function () {
                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(undefined, /* () */0), (function (param) {
                                              var state = param[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2], state).map((function (cameraController) {
                                                                    return ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMinDistance(cameraController, state);
                                                                  }))), /* array */[1]);
                                            }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        Wonder_jest.testPromise("test set wheelSpeed", (function () {
                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(undefined, /* () */0), (function (param) {
                                              var state = param[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2], state).map((function (cameraController) {
                                                                    return ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerWheelSpeed(cameraController, state);
                                                                  }))), /* array */[0.9]);
                                            }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        describe("test set isBindEvent", (function () {
                                Wonder_jest.testPromise("if isBindEvent===false, not bind event", (function () {
                                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(undefined, /* () */0), (function (param) {
                                                      var state = param[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2], state).map((function (cameraController) {
                                                                            return ArcballCameraControllerAPI$Wonderjs.isBindArcballCameraControllerEvent(cameraController, state);
                                                                          }))), /* array */[false]);
                                                    }), state, undefined, undefined, false, undefined, undefined, undefined, /* () */0);
                                      }));
                                describe("else, judge by data", (function () {
                                        Wonder_jest.testPromise("test not bind", (function () {
                                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(false, /* () */0), (function (param) {
                                                              var state = param[0];
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2], state).map((function (cameraController) {
                                                                                    return ArcballCameraControllerAPI$Wonderjs.isBindArcballCameraControllerEvent(cameraController, state);
                                                                                  }))), /* array */[false]);
                                                            }), state, undefined, undefined, true, undefined, undefined, undefined, /* () */0);
                                              }));
                                        return Wonder_jest.testPromise("test bind", (function () {
                                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(true, /* () */0), (function (param) {
                                                                    var state = param[0];
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2], state).map((function (cameraController) {
                                                                                          return ArcballCameraControllerAPI$Wonderjs.isBindArcballCameraControllerEvent(cameraController, state);
                                                                                        }))), /* array */[true]);
                                                                  }), state, undefined, undefined, true, undefined, undefined, undefined, /* () */0);
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test materials", (function () {
                describe("test basicMaterials", (function () {
                        describe("test set material name", (function () {
                                return Wonder_jest.testPromise("test", (function () {
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterial(undefined, undefined, /* () */0), (function (param) {
                                                            var state = param[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllBasicMaterials(param[2], state).map((function (basicMaterial) {
                                                                                  return BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName(basicMaterial, state);
                                                                                }))), /* array */["basicMaterial"]);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        describe("test set color", (function () {
                                return Wonder_jest.testPromise("test", (function () {
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterial(/* array */[
                                                              0,
                                                              0,
                                                              1,
                                                              1
                                                            ], undefined, /* () */0), (function (param) {
                                                            var state = param[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllBasicMaterials(param[2], state).map((function (basicMaterial) {
                                                                                  return BasicMaterialAPI$Wonderjs.getBasicMaterialColor(basicMaterial, state);
                                                                                }))), /* array */[/* array */[
                                                                          0,
                                                                          0,
                                                                          1
                                                                        ]]);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                describe("test lightMaterials", (function () {
                        describe("test set material name", (function () {
                                return Wonder_jest.testPromise("test", (function () {
                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                            var state = param[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2], state).map((function (material) {
                                                                                  return LightMaterialAPI$Wonderjs.unsafeGetLightMaterialName(material, state);
                                                                                }))), /* array */[
                                                                        "truck",
                                                                        "glass",
                                                                        "window_trim",
                                                                        "wheels",
                                                                        "wheels"
                                                                      ]);
                                                          }), state[0]);
                                            }));
                              }));
                        describe("test pbrMetallicRoughness", (function () {
                                Wonder_jest.testPromise("test set diffuseColor", (function () {
                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                      var state = param[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2], state).map((function (lightMaterial) {
                                                                            return LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(lightMaterial, state);
                                                                          }))), /* array */[
                                                                  LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state),
                                                                  /* array */[
                                                                    0,
                                                                    0.04050629958510399,
                                                                    0.021240700036287308
                                                                  ],
                                                                  /* array */[
                                                                    0.06400000303983688,
                                                                    0.06400000303983688,
                                                                    0.06400000303983688
                                                                  ],
                                                                  LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state),
                                                                  LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state)
                                                                ]);
                                                    }), state[0]);
                                      }));
                                Wonder_jest.testPromise("test set diffuseMap", (function () {
                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                      var state = param[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2], state).filter((function (lightMaterial) {
                                                                              return LightMaterialAPI$Wonderjs.hasLightMaterialDiffuseMap(lightMaterial, state);
                                                                            })).map((function (lightMaterial) {
                                                                            return LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(lightMaterial, state);
                                                                          }))), /* array */[
                                                                  0,
                                                                  1,
                                                                  1
                                                                ]);
                                                    }), state[0]);
                                      }));
                                describe("test diffuseMaps", (function () {
                                        describe("test BoxTextured glb", (function () {
                                                describe("test set texture name", (function () {
                                                        return Wonder_jest.testPromise("test", (function () {
                                                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                                    var state = param[0];
                                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                                          return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName(diffuseMap, state);
                                                                                                        }))), /* array */["texture_0"]);
                                                                                  }), state[0]);
                                                                    }));
                                                      }));
                                                Wonder_jest.testPromise("set not flipY", (function () {
                                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                      var state = param[0];
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                            return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(diffuseMap, state);
                                                                                          }))), /* array */[false]);
                                                                    }), state[0]);
                                                      }));
                                                Wonder_jest.testPromise("test set other data", (function () {
                                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                      var state = param[0];
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                            return /* tuple */[
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMagFilter(diffuseMap, state),
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMinFilter(diffuseMap, state),
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapS(diffuseMap, state),
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapT(diffuseMap, state)
                                                                                                  ];
                                                                                          }))), /* array */[/* tuple */[
                                                                                    /* Linear */1,
                                                                                    /* Nearest_mipmap_linear */4,
                                                                                    /* Repeat */2,
                                                                                    /* Repeat */2
                                                                                  ]]);
                                                                    }), state[0]);
                                                      }));
                                                describe("test set source", (function () {
                                                        Wonder_jest.testPromise("if isLoadImage === true, set source", (function () {
                                                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                              var state = param[0];
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                                    return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state);
                                                                                                  }))), /* array */[{
                                                                                            name: "CesiumLogoFlat.png",
                                                                                            src: "object_url0"
                                                                                          }]);
                                                                            }), state[0]);
                                                              }));
                                                        return Wonder_jest.testPromise("else, not set source", (function () {
                                                                      return AssembleWDBSystemTool$Wonderjs.testGLBWithConfig(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                                    var state = param[0];
                                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                                          return Js_primitive.nullable_to_opt(BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state));
                                                                                                        }))), /* array */[undefined]);
                                                                                  }), state[0], undefined, undefined, undefined, undefined, false, /* () */0);
                                                                    }));
                                                      }));
                                                Wonder_jest.testPromise("test release blobs", (function () {
                                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function () {
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Curry._1(GLBTool$Wonderjs.getURL, /* () */0).revokeObjectURL)), 1);
                                                                    }), state[0]);
                                                      }));
                                                describe("test set format", (function () {
                                                        Wonder_jest.testPromise("png source should set Rgba format", (function () {
                                                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                              var state = param[0];
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                                    return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFormat(diffuseMap, state);
                                                                                                  }))), /* array */[/* Rgba */1]);
                                                                            }), state[0]);
                                                              }));
                                                        return Wonder_jest.testPromise("jpeg source should set Rgb format", (function () {
                                                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                                                                    var state = param[0];
                                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                                          return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFormat(diffuseMap, state);
                                                                                                        }))), /* array */[
                                                                                                /* Rgba */1,
                                                                                                /* Rgba */1,
                                                                                                /* Rgba */1,
                                                                                                /* Rgba */1,
                                                                                                /* Rgba */1,
                                                                                                /* Rgba */1,
                                                                                                /* Rgba */1,
                                                                                                /* Rgba */1,
                                                                                                /* Rgb */0
                                                                                              ]);
                                                                                  }), state[0]);
                                                                    }));
                                                      }));
                                                return /* () */0;
                                              }));
                                        describe("test truck glb", (function () {
                                                describe("test set texture name", (function () {
                                                        return Wonder_jest.testPromise("test", (function () {
                                                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                                    var state = param[0];
                                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                                          return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName(diffuseMap, state);
                                                                                                        }))), /* array */[
                                                                                                "texture_0",
                                                                                                "texture_1",
                                                                                                "texture_1"
                                                                                              ]);
                                                                                  }), state[0]);
                                                                    }));
                                                      }));
                                                Wonder_jest.testPromise("set not flipY", (function () {
                                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                      var state = param[0];
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                            return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(diffuseMap, state);
                                                                                          }))), /* array */[
                                                                                  false,
                                                                                  false,
                                                                                  false
                                                                                ]);
                                                                    }), state[0]);
                                                      }));
                                                Wonder_jest.testPromise("test set other data", (function () {
                                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                      var state = param[0];
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                            return /* tuple */[
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMagFilter(diffuseMap, state),
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMinFilter(diffuseMap, state),
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapS(diffuseMap, state),
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapT(diffuseMap, state)
                                                                                                  ];
                                                                                          }))), /* array */[
                                                                                  /* tuple */[
                                                                                    /* Linear */1,
                                                                                    /* Nearest_mipmap_linear */4,
                                                                                    /* Repeat */2,
                                                                                    /* Repeat */2
                                                                                  ],
                                                                                  /* tuple */[
                                                                                    /* Linear */1,
                                                                                    /* Nearest_mipmap_linear */4,
                                                                                    /* Repeat */2,
                                                                                    /* Repeat */2
                                                                                  ],
                                                                                  /* tuple */[
                                                                                    /* Linear */1,
                                                                                    /* Nearest_mipmap_linear */4,
                                                                                    /* Repeat */2,
                                                                                    /* Repeat */2
                                                                                  ]
                                                                                ]);
                                                                    }), state[0]);
                                                      }));
                                                return Wonder_jest.testPromise("test set source", (function () {
                                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                            var state = param[0];
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                                  return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state);
                                                                                                }))), /* array */[
                                                                                        {
                                                                                          name: "image_0",
                                                                                          src: "object_url0"
                                                                                        },
                                                                                        {
                                                                                          name: "image_0",
                                                                                          src: "object_url0"
                                                                                        },
                                                                                        {
                                                                                          name: "image_0",
                                                                                          src: "object_url0"
                                                                                        }
                                                                                      ]);
                                                                          }), state[0]);
                                                            }));
                                              }));
                                        describe("test AlphaBlendModeTest glb", (function () {
                                                return Wonder_jest.testPromise("test release blobs", (function () {
                                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function () {
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Curry._1(GLBTool$Wonderjs.getURL, /* () */0).revokeObjectURL)), 2);
                                                                          }), state[0]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("khrMaterialsPBRSpecularGlossiness", (function () {
                                Wonder_jest.testPromise("test set diffuseColor", (function () {
                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                      var state = param[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2], state).map((function (lightMaterial) {
                                                                            return LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(lightMaterial, state);
                                                                          }))), /* array */[
                                                                  LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state),
                                                                  LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state)
                                                                ]);
                                                    }), state[0]);
                                      }));
                                Wonder_jest.testPromise("test set diffuseMap", (function () {
                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                      var state = param[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2], state).filter((function (lightMaterial) {
                                                                              return LightMaterialAPI$Wonderjs.hasLightMaterialDiffuseMap(lightMaterial, state);
                                                                            })).map((function (lightMaterial) {
                                                                            return LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(lightMaterial, state);
                                                                          }))), /* array */[
                                                                  0,
                                                                  1
                                                                ]);
                                                    }), state[0]);
                                      }));
                                describe("test diffuseMaps", (function () {
                                        describe("test SuperLowPolyStove glb", (function () {
                                                describe("test set texture name", (function () {
                                                        return Wonder_jest.testPromise("test", (function () {
                                                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                                                    var state = param[0];
                                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                                          return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName(diffuseMap, state);
                                                                                                        }))), /* array */[
                                                                                                "texture_0",
                                                                                                "texture_2"
                                                                                              ]);
                                                                                  }), state[0]);
                                                                    }));
                                                      }));
                                                Wonder_jest.testPromise("set not flipY", (function () {
                                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                                      var state = param[0];
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                            return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(diffuseMap, state);
                                                                                          }))), /* array */[
                                                                                  false,
                                                                                  false
                                                                                ]);
                                                                    }), state[0]);
                                                      }));
                                                Wonder_jest.testPromise("test set other data", (function () {
                                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                                      var state = param[0];
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                            return /* tuple */[
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMagFilter(diffuseMap, state),
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMinFilter(diffuseMap, state),
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapS(diffuseMap, state),
                                                                                                    BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapT(diffuseMap, state)
                                                                                                  ];
                                                                                          }))), /* array */[
                                                                                  /* tuple */[
                                                                                    /* Linear */1,
                                                                                    /* Linear_mipmap_linear */5,
                                                                                    /* Repeat */2,
                                                                                    /* Repeat */2
                                                                                  ],
                                                                                  /* tuple */[
                                                                                    /* Linear */1,
                                                                                    /* Linear_mipmap_linear */5,
                                                                                    /* Repeat */2,
                                                                                    /* Repeat */2
                                                                                  ]
                                                                                ]);
                                                                    }), state[0]);
                                                      }));
                                                Wonder_jest.testPromise("test set source", (function () {
                                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                                      var state = param[0];
                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2], state).map((function (diffuseMap) {
                                                                                            return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state);
                                                                                          }))), /* array */[
                                                                                  {
                                                                                    name: "MetalBrillante_diffuse.png",
                                                                                    src: "object_url0"
                                                                                  },
                                                                                  {
                                                                                    name: "MetalNegro_diffuse.png",
                                                                                    src: "object_url1"
                                                                                  }
                                                                                ]);
                                                                    }), state[0]);
                                                      }));
                                                return Wonder_jest.testPromise("test release blobs", (function () {
                                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function () {
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Curry._1(GLBTool$Wonderjs.getURL, /* () */0).revokeObjectURL)), 2);
                                                                          }), state[0]);
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        return /* () */0;
                      }));
                describe("test basicMaterials and lightMaterials", (function () {
                        describe("test set material name", (function () {
                                return Wonder_jest.testPromise("test", (function () {
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterialAndLightMaterial(/* () */0), (function (param) {
                                                            var rootGameObject = param[2];
                                                            var state = param[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            AssembleWDBSystemTool$Wonderjs.getAllBasicMaterials(rootGameObject, state).map((function (basicMaterial) {
                                                                                    return BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName(basicMaterial, state);
                                                                                  })),
                                                                            AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(rootGameObject, state).map((function (lightMaterial) {
                                                                                    return LightMaterialAPI$Wonderjs.unsafeGetLightMaterialName(lightMaterial, state);
                                                                                  }))
                                                                          ]), /* tuple */[
                                                                        /* array */["basicMaterial_0"],
                                                                        /* array */[
                                                                          "lightMaterial_1",
                                                                          "lightMaterial_0"
                                                                        ]
                                                                      ]);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("test meshRenderers", (function () {
                Wonder_jest.testPromise("each gameObject with geometry component should has one meshRenderer", (function () {
                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2], state).filter((function (gameObject) {
                                                            return GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent(gameObject, state);
                                                          })).length), 5);
                                    }), state[0]);
                      }));
                Wonder_jest.testPromise("test gameObjects which has no meshRenderer component", (function () {
                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllSortedTransforms(param[2], state).map((function (transform) {
                                                              return TransformAPI$Wonderjs.unsafeGetTransformGameObject(transform, state);
                                                            })).map((function (gameObject) {
                                                            return GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent(gameObject, state);
                                                          }))), /* array */[
                                                  false,
                                                  false,
                                                  true,
                                                  false,
                                                  true,
                                                  true,
                                                  true,
                                                  true
                                                ]);
                                    }), state[0]);
                      }));
                return Wonder_jest.testPromise("test set drawMode", (function () {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMeshRenderer(/* () */0), (function (param) {
                                            var state = param[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2], state).map((function (gameObject) {
                                                                    return GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(gameObject, state);
                                                                  })).map((function (meshRenderer) {
                                                                  return MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(meshRenderer, state);
                                                                }))), /* array */[3]);
                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                            }));
              }));
        describe("test directionLights", (function () {
                Wonder_jest.testPromise("if isRenderLight === false, set light not render", (function () {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDirectionLights(param[2], state).map((function (light) {
                                                            return DirectionLightAPI$Wonderjs.getDirectionLightIsRender(light, state);
                                                          }))), /* array */[false]);
                                    }), state, undefined, undefined, undefined, undefined, false, undefined, /* () */0);
                      }));
                return Wonder_jest.testPromise("test set color, intensity", (function () {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDirectionLightData(param[2], param[0])), /* array */[/* tuple */[
                                                          /* array */[
                                                            0.5,
                                                            0.5,
                                                            1
                                                          ],
                                                          1
                                                        ]]);
                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                            }));
              }));
        describe("test pointLights", (function () {
                Wonder_jest.testPromise("if isRenderLight === false, set light not render", (function () {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllPointLights(param[2], state).map((function (light) {
                                                            return PointLightAPI$Wonderjs.getPointLightIsRender(light, state);
                                                          }))), /* array */[false]);
                                    }), state, undefined, undefined, undefined, undefined, false, undefined, /* () */0);
                      }));
                return Wonder_jest.testPromise("test set color, intensity, constant, linear, quadratic, range", (function () {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllPointLightData(param[2], param[0])), /* array */[/* tuple */[
                                                          /* array */[
                                                            0,
                                                            0,
                                                            0
                                                          ],
                                                          2.5,
                                                          1,
                                                          1.5,
                                                          0,
                                                          55.5
                                                        ]]);
                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                            }));
              }));
        describe("test ambientLight", (function () {
                return Wonder_jest.testPromise("test set color", (function () {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SceneAPI$Wonderjs.getAmbientLightColor(param[0])), /* array */[
                                                        1,
                                                        0.5,
                                                        1
                                                      ]);
                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                            }));
              }));
        describe("test imageUint8ArrayDataMap", (function () {
                Wonder_jest.testPromise("return imageUint8ArrayDataMap with mimeType and uint8Array", (function () {
                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.isImageUint8ArrayMapEqual(param[1][0], SparseMapService$WonderCommonlib.set(0, /* tuple */[
                                                              "image/png",
                                                              23516
                                                            ], SparseMapService$WonderCommonlib.createEmpty(/* () */0)))), true);
                                    }), state[0]);
                      }));
                return Wonder_jest.testPromise("imageUint8ArrayDataMap's key should be basicSourceTexture", (function () {
                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.isImageUint8ArrayMapEqual(param[1][0], SparseMapService$WonderCommonlib.set(1, /* tuple */[
                                                                    "image/png",
                                                                    427633
                                                                  ], SparseMapService$WonderCommonlib.set(0, /* tuple */[
                                                                        "image/png",
                                                                        427633
                                                                      ], SparseMapService$WonderCommonlib.createEmpty(/* () */0))))), true);
                                          }), state[0]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
