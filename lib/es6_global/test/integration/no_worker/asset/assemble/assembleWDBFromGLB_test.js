

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "./../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "./../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$Wonderjs from "../tool/GLBTool.js";
import * as WDBTool$Wonderjs from "../tool/WDBTool.js";
import * as GLTFTool$Wonderjs from "../tool/GLTFTool.js";
import * as SceneAPI$Wonderjs from "../../../../../src/api/SceneAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ViewTool$Wonderjs from "../../../../tool/service/device/ViewTool.js";
import * as IMGUITool$Wonderjs from "../../../../tool/service/imgui/IMGUITool.js";
import * as JudgeTool$Wonderjs from "../../../../tool/JudgeTool.js";
import * as SceneTool$Wonderjs from "../../../../tool/service/scene/SceneTool.js";
import * as ScriptAPI$Wonderjs from "../../../../../src/api/script/ScriptAPI.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as ScriptTool$Wonderjs from "../../../../tool/service/script/ScriptTool.js";
import * as SkyboxTool$Wonderjs from "../../job/tool/SkyboxTool.js";
import * as StringTool$Wonderjs from "../../../../tool/StringTool.js";
import * as ConvertTool$Wonderjs from "../tool/ConvertTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as ArrayService$Wonderjs from "../../../../../src/service/atom/ArrayService.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as ExecIMGUITool$Wonderjs from "../../../../tool/service/imgui/ExecIMGUITool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../../../../../src/service/atom/OptionService.js";
import * as PointLightAPI$Wonderjs from "../../../../../src/api/light/PointLightAPI.js";
import * as SerializeTool$Wonderjs from "../../../../unit/tool/service/atom/SerializeTool.js";
import * as TransformTool$Wonderjs from "../../../../tool/service/transform/TransformTool.js";
import * as ConvertGLBTool$Wonderjs from "../tool/ConvertGLBTool.js";
import * as IOIMGUITool$WonderImgui from "./../../../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/IOIMGUITool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as CubemapTextureAPI$Wonderjs from "../../../../../src/api/texture/CubemapTextureAPI.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../src/api/light/DirectionLightAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as LoadStreamWDBTool$Wonderjs from "../../../tool/asset/load/LoadStreamWDBTool.js";
import * as SceneGraphDomTool$Wonderjs from "../tool/SceneGraphDomTool.js";
import * as BasicCameraViewAPI$Wonderjs from "../../../../../src/api/camera/BasicCameraViewAPI.js";
import * as CubemapTextureTool$Wonderjs from "../../../../tool/service/texture/CubemapTextureTool.js";
import * as SceneGraphIMGUITool$Wonderjs from "../tool/SceneGraphIMGUITool.js";
import * as SceneGraphScriptTool$Wonderjs from "../tool/SceneGraphScriptTool.js";
import * as AssembleWDBSystemTool$Wonderjs from "../tool/AssembleWDBSystemTool.js";
import * as BasicSourceTextureAPI$Wonderjs from "../../../../../src/api/texture/BasicSourceTextureAPI.js";
import * as NoWorkerJobConfigTool$Wonderjs from "../../../../tool/service/noWorkerJob/NoWorkerJobConfigTool.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as ExtendIMGUIMainService$Wonderjs from "../../../../../src/service/state/main/imgui/extend/ExtendIMGUIMainService.js";
import * as FlyCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/FlyCameraControllerAPI.js";
import * as SerializeAllIMGUIService$Wonderjs from "../../../../../src/service/record/all/imgui/SerializeAllIMGUIService.js";
import * as SetAssetIMGUIMainService$Wonderjs from "../../../../../src/service/state/main/imgui/SetAssetIMGUIMainService.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as ImmutableHashMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";

Wonder_jest.describe("assemble wdb from glb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(10000, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                Curry._1(SceneGraphDomTool$Wonderjs.buildFakeImage, /* () */0);
                return ConvertTool$Wonderjs.setFakeTransformCount(50);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("build scene gameObject", (function (param) {
                Wonder_jest.testPromise("test single scene gameObject", undefined, (function (param) {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[2][0]), 1);
                                    }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                      }));
                Wonder_jest.testPromise("test multi scene gameObjects", undefined, (function (param) {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], AssembleWDBSystemTool$Wonderjs.buildGLTFJsonOfMultiSceneGameObjects(/* () */0), (function (param) {
                                      var rootGameObject = param[2][0];
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                return Wonder_jest.describe("test set isRoot", (function (param) {
                              Wonder_jest.describe("if scene gameObject only has one child, its isRoot should be decided by the child", (function (param) {
                                      Wonder_jest.testPromise("test1", undefined, (function (param) {
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSceneAndOneNodeIsRoot(true, false), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectIsRoot(param[2][0], param[0])), false);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                                      Wonder_jest.testPromise("test2", undefined, (function (param) {
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSceneAndOneNodeIsRoot(false, true), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectIsRoot(param[2][0], param[0])), true);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                                      return Wonder_jest.testPromise("test3", undefined, (function (param) {
                                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSceneAndOneNodeIsRoot(true, true), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectIsRoot(param[2][0], param[0])), true);
                                                                }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                              Wonder_jest.describe("else, its isRoot should decided by the itself", (function (param) {
                                      return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSceneAndTwoNodeIsRoot(true, false), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectIsRoot(param[2][0], param[0])), true);
                                                                }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test truck glb", (function (param) {
                                            return Wonder_jest.testPromise("root gameObject->isRoot should be true", undefined, (function (param) {
                                                          return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.unsafeGetGameObjectIsRoot(param[2][0], param[0])), true);
                                                                      }), state[0]);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test imgui", (function (param) {
                Wonder_jest.describe("if isHandleIMGUI === true, handle imgui data", (function (param) {
                        Wonder_jest.describe("test return hasIMGUIData", (function (param) {
                                return Wonder_jest.testPromise("return true", undefined, (function (param) {
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(undefined, undefined, undefined, /* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[1][1]), true);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        Wonder_jest.describe("test execData", (function (param) {
                                Wonder_jest.describe("test customData", (function (param) {
                                        return Wonder_jest.testPromise("test value with function", undefined, (function (param) {
                                                      var name = "e1";
                                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(Caml_option.some(ConvertGLBTool$Wonderjs.buildExecDataToOneExecFuncData(name, "[ 1, \"function (a) { return a; }\" ]", undefined, undefined, /* () */0)), undefined, undefined, /* () */0), (function (param) {
                                                                    var match = OptionService$Wonderjs.unsafeGet(ExecIMGUITool$Wonderjs.getCustomData(name, param[0]));
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Curry._1(match[1], 10)), 10);
                                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                    }));
                                      }));
                                Wonder_jest.testPromise("test empty imgui func", undefined, (function (param) {
                                        var customData = "1";
                                        var execFunc = ExecIMGUITool$Wonderjs.buildEmptyExecFuncStr(/* () */0);
                                        var name = "e1";
                                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(Caml_option.some(ConvertGLBTool$Wonderjs.buildExecDataToOneExecFuncData(name, customData, undefined, execFunc, /* () */0)), undefined, undefined, /* () */0), (function (param) {
                                                      var state = param[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      SerializeTool$Wonderjs.serializeFunction(OptionService$Wonderjs.unsafeGet(ExecIMGUITool$Wonderjs.getExecFunc(name, state))),
                                                                      OptionService$Wonderjs.unsafeGet(ExecIMGUITool$Wonderjs.getCustomData(name, state))
                                                                    ]), /* tuple */[
                                                                  execFunc,
                                                                  JSON.parse(customData)
                                                                ]);
                                                    }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      }));
                                Wonder_jest.testPromise("test use imguiAPIJsObj", undefined, (function (param) {
                                        var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                        var gameObject = match[1];
                                        var name = "e1";
                                        var customData = JSON.stringify(/* array */[gameObject]);
                                        var execFunc = StringTool$Wonderjs.removeNewLines(SerializeTool$Wonderjs.serializeFunction((function (customData, imguiAPIJsObj, state) {
                                                    var gameObject = customData[0];
                                                    var unsafeGetGameObjectLightMaterialComponent = imguiAPIJsObj.unsafeGetGameObjectLightMaterialComponent;
                                                    unsafeGetGameObjectLightMaterialComponent(gameObject, state);
                                                    return state;
                                                  })));
                                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(Caml_option.some(ConvertGLBTool$Wonderjs.buildExecDataToOneExecFuncData(name, customData, undefined, execFunc, /* () */0)), undefined, undefined, /* () */0), (function (param) {
                                                      var state = param[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      StringTool$Wonderjs.removeSpaces(StringTool$Wonderjs.removeNewLines(SerializeTool$Wonderjs.serializeFunction(OptionService$Wonderjs.unsafeGet(ExecIMGUITool$Wonderjs.getExecFunc(name, state))))),
                                                                      OptionService$Wonderjs.unsafeGet(ExecIMGUITool$Wonderjs.getCustomData(name, state))
                                                                    ]), /* tuple */[
                                                                  StringTool$Wonderjs.removeSpaces(StringTool$Wonderjs.removeNewLines("\n                         function (customData, imguiAPIJsObj, state) {\n                           var gameObject = customData[0];\n                           var unsafeGetGameObjectLightMaterialComponent = imguiAPIJsObj.unsafeGetGameObjectLightMaterialComponent;\n                           unsafeGetGameObjectLightMaterialComponent(gameObject, state);\n                           return state;\n                         }\n                       ")),
                                                                  /* array */[gameObject]
                                                                ]);
                                                    }), /* record */[/* contents */match[0]], undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                      }));
                                return Wonder_jest.describe("test multi exec func data", (function (param) {
                                              return Wonder_jest.describe("test execOrder", (function (param) {
                                                            return Wonder_jest.testPromise("the execFuncDataArr is sorted by execOrder", undefined, (function (param) {
                                                                          var execFunc1 = ExecIMGUITool$Wonderjs.buildEmptyExecFuncStr(/* () */0);
                                                                          var name1 = "e1";
                                                                          var name2 = "e2";
                                                                          return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(Caml_option.some(ConvertGLBTool$Wonderjs.buildExecData(/* array */[
                                                                                                  ConvertGLBTool$Wonderjs.buildExecFuncData(name1, "1", 2, execFunc1, /* () */0),
                                                                                                  ConvertGLBTool$Wonderjs.buildExecFuncData(name2, "2", 0, "function (customData, imguiAPIJsObj, state){ var a = 1; return state; }", /* () */0)
                                                                                                ])), undefined, undefined, /* () */0), (function (param) {
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ExecIMGUITool$Wonderjs.getExecFuncDataArr(param[0]).map((function (param) {
                                                                                                              return param[/* name */3];
                                                                                                            }))), /* array */[
                                                                                                    name2,
                                                                                                    name1
                                                                                                  ]);
                                                                                      }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                                        }));
                                                          }));
                                            }));
                              }));
                        Wonder_jest.testPromise("test extendData", undefined, (function (param) {
                                var customControlName = "c1";
                                var extendData = ConvertGLBTool$Wonderjs.buildExtendData(Caml_option.some(ImmutableHashMapService$WonderCommonlib.set(customControlName, IMGUITool$Wonderjs.buildEmptyCustomControlFunc(/* () */0), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0))), Caml_option.some(ImmutableHashMapService$WonderCommonlib.set("s1", Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* createDefaultSkinData */10], /* () */0), ImmutableHashMapService$WonderCommonlib.createEmpty(/* () */0))), /* () */0);
                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(undefined, Caml_option.some(extendData), undefined, /* () */0), (function (param) {
                                              var state = param[0];
                                              var funcMap = Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* CustomControl */1][/* getFuncMap */0], state);
                                              var allSkinDataMap = Curry._1(ExtendIMGUIMainService$Wonderjs.ExtendData[/* Skin */2][/* getAllSkinDataMap */0], state);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              /* tuple */[
                                                                JudgeTool$Wonderjs.isFunction(ImmutableHashMapService$WonderCommonlib.unsafeGet(customControlName, funcMap)),
                                                                SerializeAllIMGUIService$Wonderjs.CustomControl[/* serializeFuncMap */0](funcMap)
                                                              ],
                                                              SerializeAllIMGUIService$Wonderjs.Skin[/* serializeAllSkinDataMap */0](allSkinDataMap)
                                                            ]), /* tuple */[
                                                          /* tuple */[
                                                            true,
                                                            extendData.customControlData.funcMap
                                                          ],
                                                          extendData.skinData.allSkinDataMap
                                                        ]);
                                            }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        return Wonder_jest.testPromise("test assetData", undefined, (function (param) {
                                      IOIMGUITool$WonderImgui.buildFakeURL(sandbox[0]);
                                      IOIMGUITool$WonderImgui.buildFakeLoadImage();
                                      var bitmapName = "bbb";
                                      var assetData = ConvertGLBTool$Wonderjs.buildAssetData(SceneGraphIMGUITool$Wonderjs.buildFakeFntName(/* () */0), SceneGraphIMGUITool$Wonderjs.buildFakeFntContent(/* () */0), bitmapName, 0, /* array */[ConvertGLBTool$Wonderjs.buildCustomImageData("c1", 2, "image/png", /* () */0)], /* () */0);
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(undefined, undefined, Caml_option.some(assetData), /* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    SetAssetIMGUIMainService$Wonderjs.unsafeGetSettedAssetFntName(state),
                                                                    SetAssetIMGUIMainService$Wonderjs.unsafeGetSettedAssetFntContent(state),
                                                                    SetAssetIMGUIMainService$Wonderjs.unsafeGetSettedAssetBitmapName(state),
                                                                    SetAssetIMGUIMainService$Wonderjs.unsafeGetSettedAssetBitmapArrayBuffer(state).byteLength,
                                                                    SceneGraphIMGUITool$Wonderjs.getSettedAssetCustomImageDataArrForTest(state)
                                                                  ]), /* tuple */[
                                                                SceneGraphIMGUITool$Wonderjs.buildFakeFntName(/* () */0),
                                                                SceneGraphIMGUITool$Wonderjs.buildFakeFntContent(/* () */0),
                                                                bitmapName,
                                                                288,
                                                                /* array */[/* tuple */[
                                                                    192,
                                                                    "c1",
                                                                    "image/png"
                                                                  ]]
                                                              ]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("else, not handle", (function (param) {
                              Wonder_jest.describe("test return hasIMGUIData", (function (param) {
                                      return Wonder_jest.testPromise("return true", undefined, (function (param) {
                                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(undefined, undefined, undefined, /* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](param[1][1]), true);
                                                                }), state, undefined, false, undefined, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.testPromise("should has no customData", undefined, (function (param) {
                                            var name = "e1";
                                            return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfIMGUI(Caml_option.some(ConvertGLBTool$Wonderjs.buildExecDataToOneExecFuncData(name, "[ 1, \\\"function (a) { return a; }\\\" ]", undefined, undefined, /* () */0)), undefined, undefined, /* () */0), (function (param) {
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(ExecIMGUITool$Wonderjs.getCustomData(name, param[0]))), true);
                                                        }), state, undefined, false, undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test skybox", (function (param) {
                Wonder_jest.testPromise("get skybox->cubemap", undefined, (function (param) {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isSome(param[2][1])), true);
                                    }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                      }));
                Wonder_jest.testPromise("not set to skybox", undefined, (function (param) {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SceneTool$Wonderjs.getCubemapTexture(param[0])), undefined);
                                    }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("test skybox->cubemap texture", (function (param) {
                              Wonder_jest.describe("test set texture name", (function (param) {
                                      return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(undefined, "aaa", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureName(OptionService$Wonderjs.unsafeGet(param[2][1]), param[0])), "aaa");
                                                                }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                              Wonder_jest.testPromise("test set flipY", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, true, /* () */0), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureAPI$Wonderjs.getCubemapTextureFlipY(OptionService$Wonderjs.unsafeGet(param[2][1]), param[0])), true);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              Wonder_jest.testPromise("test set sampler data", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                    var state = param[0];
                                                    var cubemapTexture = OptionService$Wonderjs.unsafeGet(param[2][1]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    CubemapTextureAPI$Wonderjs.getCubemapTextureMagFilter(cubemapTexture, state),
                                                                    CubemapTextureAPI$Wonderjs.getCubemapTextureMinFilter(cubemapTexture, state),
                                                                    CubemapTextureAPI$Wonderjs.getCubemapTextureWrapS(cubemapTexture, state),
                                                                    CubemapTextureAPI$Wonderjs.getCubemapTextureWrapT(cubemapTexture, state)
                                                                  ]), /* tuple */[
                                                                /* Linear */1,
                                                                /* Nearest_mipmap_linear */4,
                                                                /* Repeat */2,
                                                                /* Repeat */2
                                                              ]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              Wonder_jest.describe("test set source", (function (param) {
                                      Wonder_jest.testPromise("if isLoadImage === false, not set source", undefined, (function (param) {
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isNone(CubemapTextureTool$Wonderjs.getCubemapTexturePXSource(OptionService$Wonderjs.unsafeGet(param[2][1]), param[0]))), true);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, false, /* () */0);
                                            }));
                                      return Wonder_jest.testPromise("else, set source", undefined, (function (param) {
                                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                                  var state = param[0];
                                                                  var cubemapTexture = OptionService$Wonderjs.unsafeGet(param[2][1]);
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePXSource(cubemapTexture, state),
                                                                                  CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNXSource(cubemapTexture, state),
                                                                                  CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePYSource(cubemapTexture, state),
                                                                                  CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNYSource(cubemapTexture, state),
                                                                                  CubemapTextureAPI$Wonderjs.unsafeGetCubemapTexturePZSource(cubemapTexture, state),
                                                                                  CubemapTextureAPI$Wonderjs.unsafeGetCubemapTextureNZSource(cubemapTexture, state)
                                                                                ]), /* tuple */[
                                                                              GLBTool$Wonderjs.createFakeImage("pxSource.png", "object_url1", undefined, undefined, /* () */0),
                                                                              GLBTool$Wonderjs.createFakeImage("nxSource.jpg", "object_url2", undefined, undefined, /* () */0),
                                                                              GLBTool$Wonderjs.createFakeImage("pySource.png", "object_url3", undefined, undefined, /* () */0),
                                                                              GLBTool$Wonderjs.createFakeImage("nySource.jpg", "object_url4", undefined, undefined, /* () */0),
                                                                              GLBTool$Wonderjs.createFakeImage("pzSource.png", "object_url5", undefined, undefined, /* () */0),
                                                                              GLBTool$Wonderjs.createFakeImage("nzSource.jpg", "object_url6", undefined, undefined, /* () */0)
                                                                            ]);
                                                                }), state, undefined, undefined, undefined, undefined, undefined, true, /* () */0);
                                                  }));
                                    }));
                              Wonder_jest.testPromise("test release blobs", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                    OptionService$Wonderjs.unsafeGet(param[2][1]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(GLBTool$Wonderjs.getURL().revokeObjectURL)), 7);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, true, /* () */0);
                                    }));
                              Wonder_jest.testPromise("test set format", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(undefined, undefined, undefined, undefined, /* Alpha */2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                    var state = param[0];
                                                    var cubemapTexture = OptionService$Wonderjs.unsafeGet(param[2][1]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    CubemapTextureAPI$Wonderjs.getCubemapTexturePXFormat(cubemapTexture, state),
                                                                    CubemapTextureAPI$Wonderjs.getCubemapTextureNXFormat(cubemapTexture, state),
                                                                    CubemapTextureAPI$Wonderjs.getCubemapTexturePYFormat(cubemapTexture, state),
                                                                    CubemapTextureAPI$Wonderjs.getCubemapTextureNYFormat(cubemapTexture, state),
                                                                    CubemapTextureAPI$Wonderjs.getCubemapTexturePZFormat(cubemapTexture, state),
                                                                    CubemapTextureAPI$Wonderjs.getCubemapTextureNZFormat(cubemapTexture, state)
                                                                  ]), /* tuple */[
                                                                CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0),
                                                                CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0),
                                                                /* Alpha */2,
                                                                CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0),
                                                                CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0),
                                                                CubemapTextureTool$Wonderjs.getDefaultFormat(/* () */0)
                                                              ]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.testPromise("test set type", undefined, (function (param) {
                                            return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSkyboxAndOneCubemap(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3, undefined, undefined, undefined, undefined, /* () */0), (function (param) {
                                                          var state = param[0];
                                                          var cubemapTexture = OptionService$Wonderjs.unsafeGet(param[2][1]);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          CubemapTextureAPI$Wonderjs.getCubemapTexturePXType(cubemapTexture, state),
                                                                          CubemapTextureAPI$Wonderjs.getCubemapTextureNXType(cubemapTexture, state),
                                                                          CubemapTextureAPI$Wonderjs.getCubemapTexturePYType(cubemapTexture, state),
                                                                          CubemapTextureAPI$Wonderjs.getCubemapTextureNYType(cubemapTexture, state),
                                                                          CubemapTextureAPI$Wonderjs.getCubemapTexturePZType(cubemapTexture, state),
                                                                          CubemapTextureAPI$Wonderjs.getCubemapTextureNZType(cubemapTexture, state)
                                                                        ]), /* tuple */[
                                                                      CubemapTextureTool$Wonderjs.getDefaultType(/* () */0),
                                                                      CubemapTextureTool$Wonderjs.getDefaultType(/* () */0),
                                                                      3,
                                                                      CubemapTextureTool$Wonderjs.getDefaultType(/* () */0),
                                                                      CubemapTextureTool$Wonderjs.getDefaultType(/* () */0),
                                                                      CubemapTextureTool$Wonderjs.getDefaultType(/* () */0)
                                                                    ]);
                                                        }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test gameObject", (function (param) {
                Wonder_jest.describe("set gameObject name", (function (param) {
                        return Wonder_jest.testPromise("test", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2][0], state).map((function (gameObject) {
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
                Wonder_jest.describe("set gameObject isActive", (function (param) {
                        Wonder_jest.testPromise("if gltf->node->extras has no isActive, set true", undefined, (function (param) {
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllChildrenData(AssembleWDBSystemTool$Wonderjs.getAllGameObjectsIsActive(param[2][0], param[0]))), /* array */[
                                                          true,
                                                          true,
                                                          true,
                                                          true,
                                                          true,
                                                          true,
                                                          true
                                                        ]);
                                            }), state[0]);
                              }));
                        return Wonder_jest.testPromise("else, set it", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfNodeIsActive(false), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjectsIsActive(param[2][0], param[0])), /* array */[
                                                                false,
                                                                false
                                                              ]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                Wonder_jest.describe("set gameObject isRoot", (function (param) {
                        Wonder_jest.testPromise("if gltf->node->extras has no isRoot, set false", undefined, (function (param) {
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllChildrenData(AssembleWDBSystemTool$Wonderjs.getAllGameObjectsIsRoot(param[2][0], param[0]))), /* array */[
                                                          false,
                                                          false,
                                                          false,
                                                          false,
                                                          false,
                                                          false,
                                                          false
                                                        ]);
                                            }), state[0]);
                              }));
                        return Wonder_jest.testPromise("else, set it", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfNodeIsRoot(true), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjectsIsRoot(param[2][0], param[0])), /* array */[
                                                                true,
                                                                true
                                                              ]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("test gameObject count", (function (param) {
                              return Wonder_jest.testPromise("test 2CylinderEngine glb", undefined, (function (param) {
                                            ConvertTool$Wonderjs.setFakeTransformCount(1000);
                                            state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(300000, 50, 500, undefined, 480, undefined, undefined, 500, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                            return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("2CylinderEngine.glb"), (function (param) {
                                                          GLTFTool$Wonderjs.getTruckGeometryData(/* () */0);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2][0], param[0]).length), 159);
                                                        }), state[0]);
                                          }));
                            }));
              }));
        Wonder_jest.describe("test transforms", (function (param) {
                Wonder_jest.describe("test set parent", (function (param) {
                        Wonder_jest.testPromise("test children", undefined, (function (param) {
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                              var allTransformChildren = AssembleWDBSystemTool$Wonderjs.getAllChildrenTransform(param[2][0], param[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](allTransformChildren), /* array */[
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
                        return Wonder_jest.testPromise("test parent", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    var state = param[0];
                                                    AssembleWDBSystemTool$Wonderjs.getAllChildrenTransform(param[2][0], state);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformTool$Wonderjs.getRecord(state)[/* parentMap */15]), /* array */[
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
                return Wonder_jest.describe("test set data", (function (param) {
                              return Wonder_jest.testPromise("test set localPosition, localRotation, localScale", undefined, (function (param) {
                                            return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                          var state = param[0];
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllSortedTransforms(param[2][0], state).map((function (transform) {
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
              }));
        Wonder_jest.describe("test geometrys", (function (param) {
                Wonder_jest.describe("test set point data", (function (param) {
                        Wonder_jest.testPromise("test single node gltf", undefined, (function (param) {
                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), (function (param) {
                                              var state = param[0];
                                              var geometry = GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(param[2][0], state);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              GeometryAPI$Wonderjs.getGeometryVertices(geometry, state),
                                                              GeometryAPI$Wonderjs.getGeometryNormals(geometry, state),
                                                              GeometryAPI$Wonderjs.getGeometryTexCoords(geometry, state),
                                                              Caml_option.some(GeometryAPI$Wonderjs.getGeometryIndices16(geometry, state)),
                                                              undefined
                                                            ]), GLTFTool$Wonderjs.getBoxTexturedGeometryData(/* () */0));
                                            }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                              }));
                        Wonder_jest.testPromise("test truck glb", undefined, (function (param) {
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                              var dataMap = GLTFTool$Wonderjs.getTruckGeometryData(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2][0], param[0])), /* array */[
                                                          /* tuple */[
                                                            "Cesium_Milk_Truck_0",
                                                            MutableHashMapService$WonderCommonlib.unsafeGet("Cesium_Milk_Truck_0", dataMap)
                                                          ],
                                                          /* tuple */[
                                                            "Cesium_Milk_Truck_1",
                                                            MutableHashMapService$WonderCommonlib.unsafeGet("Cesium_Milk_Truck_1", dataMap)
                                                          ],
                                                          /* tuple */[
                                                            "Cesium_Milk_Truck_2",
                                                            MutableHashMapService$WonderCommonlib.unsafeGet("Cesium_Milk_Truck_2", dataMap)
                                                          ],
                                                          /* tuple */[
                                                            "Wheels",
                                                            MutableHashMapService$WonderCommonlib.unsafeGet("Wheels", dataMap)
                                                          ],
                                                          /* tuple */[
                                                            "Wheels",
                                                            MutableHashMapService$WonderCommonlib.unsafeGet("Wheels", dataMap)
                                                          ]
                                                        ]);
                                            }), state[0]);
                              }));
                        Wonder_jest.testPromise("test AlphaBlendModeTest glb", undefined, (function (param) {
                                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(8000000, 50, 500, undefined, 480, undefined, undefined, 500, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                              var allGeometryData = AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2][0], param[0]);
                                              var dataMap = GLTFTool$Wonderjs.getAlphaBlendModeTestGeometryData(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              allGeometryData.length,
                                                              Caml_array.caml_array_get(allGeometryData, 1)
                                                            ]), /* tuple */[
                                                          9,
                                                          /* tuple */[
                                                            "DecalBlendMesh",
                                                            MutableHashMapService$WonderCommonlib.unsafeGet("DecalBlendMesh", dataMap)
                                                          ]
                                                        ]);
                                            }), state[0]);
                              }));
                        Wonder_jest.testPromise("test SuperLowPolyStove glb", undefined, (function (param) {
                                state[0] = TestTool$Wonderjs.initWithoutBuildFakeDom(sandbox, undefined, SettingTool$Wonderjs.buildBufferConfigStr(100000, 100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                              var allGeometryData = AssembleWDBSystemTool$Wonderjs.getAllGeometryData(param[2][0], param[0]);
                                              var dataMap = GLTFTool$Wonderjs.getSuperLowPolyStoveGeometryData(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              allGeometryData.length,
                                                              Caml_array.caml_array_get(allGeometryData, 1)
                                                            ]), /* tuple */[
                                                          2,
                                                          /* tuple */[
                                                            "Stove_1",
                                                            MutableHashMapService$WonderCommonlib.unsafeGet("Stove_1", dataMap)
                                                          ]
                                                        ]);
                                            }), state[0]);
                              }));
                        return Wonder_jest.testPromise("test gameObjects which has no cutomGeometry component", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllSortedTransforms(param[2][0], state).map((function (transform) {
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
                return Wonder_jest.describe("set geometry name", (function (param) {
                              Wonder_jest.testPromise("test BoxTextured glb", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometrys(param[2][0], state).map((function (geometry) {
                                                                          return GeometryAPI$Wonderjs.unsafeGetGeometryName(geometry, state);
                                                                        }))), /* array */["Mesh"]);
                                                  }), state[0]);
                                    }));
                              return Wonder_jest.testPromise("test truck glb", undefined, (function (param) {
                                            return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                          var state = param[0];
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGeometrys(param[2][0], state).map((function (geometry) {
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
              }));
        Wonder_jest.describe("test basicCameraViews", (function (param) {
                Wonder_jest.describe("test add basicCameraView components", (function (param) {
                        return Wonder_jest.testPromise("test", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2][0], state).map((function (gameObject) {
                                                                          return GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent(gameObject, state);
                                                                        }))), /* array */[
                                                                true,
                                                                true,
                                                                false
                                                              ]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("test set active", (function (param) {
                              var _getAllBasicCameraViewGameObjects = function (rootGameObject, state) {
                                return AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                                              return GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent(gameObject, state);
                                            }));
                              };
                              Wonder_jest.describe("test no extras", (function (param) {
                                      return Wonder_jest.describe("active the one whose cameraViewIndex === 0", (function (param) {
                                                    Wonder_jest.testPromise("if isActiveCamera === false, not active", undefined, (function (param) {
                                                            var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state[0]);
                                                            var basicCameraView = match[1];
                                                            return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                                          var state = param[0];
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.push(basicCameraView, _getAllBasicCameraViewGameObjects(param[2][0], state).map((function (gameObject) {
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
                                                    return Wonder_jest.describe("else", (function (param) {
                                                                  return Wonder_jest.testPromise("unactive other ones", undefined, (function (param) {
                                                                                var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state[0]);
                                                                                var basicCameraView = match[1];
                                                                                var state$1 = BasicCameraViewAPI$Wonderjs.activeBasicCameraView(basicCameraView, match[0]);
                                                                                return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                                                              var state = param[0];
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.push(basicCameraView, _getAllBasicCameraViewGameObjects(param[2][0], state).map((function (gameObject) {
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
                                                  }));
                                    }));
                              return Wonder_jest.describe("test extras", (function (param) {
                                            Wonder_jest.testPromise("if isActiveCamera === false, not active", undefined, (function (param) {
                                                    var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state[0]);
                                                    var basicCameraView = match[1];
                                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), (function (param) {
                                                                  var state = param[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.push(basicCameraView, _getAllBasicCameraViewGameObjects(param[2][0], state).map((function (gameObject) {
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
                                            Wonder_jest.describe("else", (function (param) {
                                                    return Wonder_jest.testPromise("unactive other ones", undefined, (function (param) {
                                                                  var match = CameraTool$Wonderjs.createBasicCameraViewPerspectiveCamera(state[0]);
                                                                  var basicCameraView = match[1];
                                                                  var state$1 = BasicCameraViewAPI$Wonderjs.activeBasicCameraView(basicCameraView, match[0]);
                                                                  return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), (function (param) {
                                                                                var state = param[0];
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArrayService$Wonderjs.push(basicCameraView, _getAllBasicCameraViewGameObjects(param[2][0], state).map((function (gameObject) {
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
                                            return Wonder_jest.describe("fix bug", (function (param) {
                                                          return Wonder_jest.testPromise("shouldn't affect by isLoadImage", undefined, (function (param) {
                                                                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicCameraView(/* () */0), (function (param) {
                                                                                      var state = param[0];
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllBasicCameraViewGameObjects(param[2][0], state).map((function (gameObject) {
                                                                                                              return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent(gameObject, state);
                                                                                                            })).map((function (cameraView) {
                                                                                                            return /* tuple */[
                                                                                                                    cameraView,
                                                                                                                    BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(cameraView, state)
                                                                                                                  ];
                                                                                                          }))), /* array */[
                                                                                                  /* tuple */[
                                                                                                    1,
                                                                                                    true
                                                                                                  ],
                                                                                                  /* tuple */[
                                                                                                    0,
                                                                                                    false
                                                                                                  ],
                                                                                                  /* tuple */[
                                                                                                    2,
                                                                                                    false
                                                                                                  ]
                                                                                                ]);
                                                                                    }), /* record */[/* contents */state[0]], undefined, undefined, undefined, true, undefined, false, /* () */0);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test perspectiveCameraProjections", (function (param) {
                return Wonder_jest.describe("test set data", (function (param) {
                              var _getAllPerspectiveCameraProjectionComponent = function (rootGameObject, state) {
                                return AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                                                return GameObjectAPI$Wonderjs.hasGameObjectPerspectiveCameraProjectionComponent(gameObject, state);
                                              })).map((function (gameObject) {
                                              return GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(gameObject, state);
                                            }));
                              };
                              Wonder_jest.testPromise("test set near, fovy", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllPerspectiveCameraProjectionComponent(param[2][0], state).map((function (cameraProjection) {
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
                              Wonder_jest.describe("test set far", (function (param) {
                                      return Wonder_jest.testPromise("if no far, set infinite", undefined, (function (param) {
                                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                                  var state = param[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllPerspectiveCameraProjectionComponent(param[2][0], state).map((function (cameraProjection) {
                                                                                        return PerspectiveCameraProjectionTool$Wonderjs.unsafeGetFar(cameraProjection, state);
                                                                                      }))), /* array */[
                                                                              1000,
                                                                              100000
                                                                            ]);
                                                                }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.describe("test set aspect", (function (param) {
                                            return Wonder_jest.testPromise("if has no aspect data, not set aspect", undefined, (function (param) {
                                                          var state = RenderJobsTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, NoWorkerJobConfigTool$Wonderjs.buildNoWorkerJobConfig(undefined, "\n       [\n           {\n             \"name\": \"default\",\n             \"jobs\": [\n               {\n                 \"name\": \"init_camera\"\n               }\n               ]\n           }\n       ]\n               ", undefined, undefined, undefined, /* () */0));
                                                          return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfCamera(/* () */0), (function (param) {
                                                                        var state = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), param[0]);
                                                                        var canvas = {
                                                                          width: 100,
                                                                          height: 200
                                                                        };
                                                                        var state$1 = ViewTool$Wonderjs.setCanvas(canvas, state);
                                                                        var state$2 = RenderJobsTool$Wonderjs.init(state$1);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllPerspectiveCameraProjectionComponent(param[2][0], state$2).map((function (cameraProjection) {
                                                                                              return PerspectiveCameraProjectionTool$Wonderjs.getAspect(cameraProjection, state$2);
                                                                                            }))), /* array */[
                                                                                    2,
                                                                                    undefined
                                                                                  ]);
                                                                      }), /* record */[/* contents */state], undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test flyCameraControllers", (function (param) {
                return Wonder_jest.describe("test set data", (function (param) {
                              var _getAllFlyCameraControllerComponent = function (rootGameObject, state) {
                                return AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                                                return GameObjectAPI$Wonderjs.hasGameObjectFlyCameraControllerComponent(gameObject, state);
                                              })).map((function (gameObject) {
                                              return GameObjectAPI$Wonderjs.unsafeGetGameObjectFlyCameraControllerComponent(gameObject, state);
                                            }));
                              };
                              Wonder_jest.testPromise("test set moveSpeed", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfFlyCameraController(undefined, /* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllFlyCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                          return FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerMoveSpeed(cameraController, state);
                                                                        }))), /* array */[2.1]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              Wonder_jest.testPromise("test set rotateSpeed", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfFlyCameraController(undefined, /* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllFlyCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                          return FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerRotateSpeed(cameraController, state);
                                                                        }))), /* array */[2.3]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              Wonder_jest.testPromise("test set wheelSpeed", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfFlyCameraController(undefined, /* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllFlyCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                          return FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerWheelSpeed(cameraController, state);
                                                                        }))), /* array */[3.9]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.describe("test set isBindEvent", (function (param) {
                                            Wonder_jest.testPromise("if isBindEvent===false, not bind event", undefined, (function (param) {
                                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfFlyCameraController(undefined, /* () */0), (function (param) {
                                                                  var state = param[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllFlyCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                                        return FlyCameraControllerAPI$Wonderjs.isBindFlyCameraControllerEvent(cameraController, state);
                                                                                      }))), /* array */[false]);
                                                                }), state, undefined, undefined, false, undefined, undefined, undefined, /* () */0);
                                                  }));
                                            return Wonder_jest.describe("else, judge by data", (function (param) {
                                                          Wonder_jest.testPromise("test not bind", undefined, (function (param) {
                                                                  return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfFlyCameraController(false, /* () */0), (function (param) {
                                                                                var state = param[0];
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllFlyCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                                                      return FlyCameraControllerAPI$Wonderjs.isBindFlyCameraControllerEvent(cameraController, state);
                                                                                                    }))), /* array */[false]);
                                                                              }), state, undefined, undefined, true, undefined, undefined, undefined, /* () */0);
                                                                }));
                                                          return Wonder_jest.testPromise("test bind", undefined, (function (param) {
                                                                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfFlyCameraController(true, /* () */0), (function (param) {
                                                                                      var state = param[0];
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllFlyCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                                                            return FlyCameraControllerAPI$Wonderjs.isBindFlyCameraControllerEvent(cameraController, state);
                                                                                                          }))), /* array */[true]);
                                                                                    }), state, undefined, undefined, true, undefined, undefined, undefined, /* () */0);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test arcballCameraControllers", (function (param) {
                return Wonder_jest.describe("test set data", (function (param) {
                              var _getAllArcballCameraControllerComponent = function (rootGameObject, state) {
                                return AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                                                return GameObjectAPI$Wonderjs.hasGameObjectArcballCameraControllerComponent(gameObject, state);
                                              })).map((function (gameObject) {
                                              return GameObjectAPI$Wonderjs.unsafeGetGameObjectArcballCameraControllerComponent(gameObject, state);
                                            }));
                              };
                              Wonder_jest.testPromise("test set distance", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(undefined, /* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                          return ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state);
                                                                        }))), /* array */[1.5]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              Wonder_jest.testPromise("test set minDistance", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(undefined, /* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                          return ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerMinDistance(cameraController, state);
                                                                        }))), /* array */[1]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              Wonder_jest.testPromise("test set wheelSpeed", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(undefined, /* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                          return ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerWheelSpeed(cameraController, state);
                                                                        }))), /* array */[0.9]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.describe("test set isBindEvent", (function (param) {
                                            Wonder_jest.testPromise("if isBindEvent===false, not bind event", undefined, (function (param) {
                                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(undefined, /* () */0), (function (param) {
                                                                  var state = param[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                                        return ArcballCameraControllerAPI$Wonderjs.isBindArcballCameraControllerEvent(cameraController, state);
                                                                                      }))), /* array */[false]);
                                                                }), state, undefined, undefined, false, undefined, undefined, undefined, /* () */0);
                                                  }));
                                            return Wonder_jest.describe("else, judge by data", (function (param) {
                                                          Wonder_jest.testPromise("test not bind", undefined, (function (param) {
                                                                  return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(false, /* () */0), (function (param) {
                                                                                var state = param[0];
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                                                      return ArcballCameraControllerAPI$Wonderjs.isBindArcballCameraControllerEvent(cameraController, state);
                                                                                                    }))), /* array */[false]);
                                                                              }), state, undefined, undefined, true, undefined, undefined, undefined, /* () */0);
                                                                }));
                                                          return Wonder_jest.testPromise("test bind", undefined, (function (param) {
                                                                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfArcballCameraController(true, /* () */0), (function (param) {
                                                                                      var state = param[0];
                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getAllArcballCameraControllerComponent(param[2][0], state).map((function (cameraController) {
                                                                                                            return ArcballCameraControllerAPI$Wonderjs.isBindArcballCameraControllerEvent(cameraController, state);
                                                                                                          }))), /* array */[true]);
                                                                                    }), state, undefined, undefined, true, undefined, undefined, undefined, /* () */0);
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test materials", (function (param) {
                Wonder_jest.describe("test basicMaterials", (function (param) {
                        Wonder_jest.describe("test set material name", (function (param) {
                                return Wonder_jest.testPromise("test", undefined, (function (param) {
                                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterial(undefined, undefined, /* () */0), (function (param) {
                                                            var state = param[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllBasicMaterials(param[2][0], state).map((function (basicMaterial) {
                                                                                  return BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName(basicMaterial, state);
                                                                                }))), /* array */["basicMaterial"]);
                                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                            }));
                              }));
                        return Wonder_jest.describe("test set color", (function (param) {
                                      return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                    return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterial(/* array */[
                                                                    0,
                                                                    0,
                                                                    1,
                                                                    1
                                                                  ], undefined, /* () */0), (function (param) {
                                                                  var state = param[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllBasicMaterials(param[2][0], state).map((function (basicMaterial) {
                                                                                        return BasicMaterialAPI$Wonderjs.getBasicMaterialColor(basicMaterial, state);
                                                                                      }))), /* array */[/* array */[
                                                                                0,
                                                                                0,
                                                                                1
                                                                              ]]);
                                                                }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test lightMaterials", (function (param) {
                        Wonder_jest.describe("test set material name", (function (param) {
                                return Wonder_jest.testPromise("test", undefined, (function (param) {
                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                            var state = param[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2][0], state).map((function (material) {
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
                        Wonder_jest.describe("test pbrMetallicRoughness", (function (param) {
                                Wonder_jest.testPromise("test set diffuseColor", undefined, (function (param) {
                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                      var state = param[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2][0], state).map((function (lightMaterial) {
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
                                Wonder_jest.testPromise("test set diffuseMap", undefined, (function (param) {
                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                      var state = param[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2][0], state).filter((function (lightMaterial) {
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
                                return Wonder_jest.describe("test diffuseMaps", (function (param) {
                                              Wonder_jest.describe("test BoxTextured glb", (function (param) {
                                                      Wonder_jest.describe("test set texture name", (function (param) {
                                                              return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                            return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                                          var state = param[0];
                                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                                return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName(diffuseMap, state);
                                                                                                              }))), /* array */["basicSourceTexture_0"]);
                                                                                        }), state[0]);
                                                                          }));
                                                            }));
                                                      Wonder_jest.testPromise("set not flipY", undefined, (function (param) {
                                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                            var state = param[0];
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                  return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(diffuseMap, state);
                                                                                                }))), /* array */[false]);
                                                                          }), state[0]);
                                                            }));
                                                      Wonder_jest.testPromise("test set sampler data", undefined, (function (param) {
                                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                            var state = param[0];
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
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
                                                      Wonder_jest.describe("test set source", (function (param) {
                                                              Wonder_jest.testPromise("if isLoadImage === true, set source", undefined, (function (param) {
                                                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                                    var state = param[0];
                                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                          return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state);
                                                                                                        }))), /* array */[GLBTool$Wonderjs.createFakeImage("CesiumLogoFlat.png", "object_url0", undefined, undefined, /* () */0)]);
                                                                                  }), state[0]);
                                                                    }));
                                                              return Wonder_jest.testPromise("else, not set source", undefined, (function (param) {
                                                                            return AssembleWDBSystemTool$Wonderjs.testGLBWithConfig(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                                          var state = param[0];
                                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                                return Caml_option.nullable_to_opt(BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state));
                                                                                                              }))), /* array */[undefined]);
                                                                                        }), state[0], undefined, undefined, undefined, undefined, false, /* () */0);
                                                                          }));
                                                            }));
                                                      Wonder_jest.testPromise("test release blobs", undefined, (function (param) {
                                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(GLBTool$Wonderjs.getURL().revokeObjectURL)), 1);
                                                                          }), state[0]);
                                                            }));
                                                      Wonder_jest.describe("test set format", (function (param) {
                                                              Wonder_jest.testPromise("png source should set Rgba format", undefined, (function (param) {
                                                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                                    var state = param[0];
                                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                          return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFormat(diffuseMap, state);
                                                                                                        }))), /* array */[/* Rgba */1]);
                                                                                  }), state[0]);
                                                                    }));
                                                              return Wonder_jest.testPromise("jpeg source should set Rgb format", undefined, (function (param) {
                                                                            return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                                                                          var state = param[0];
                                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
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
                                                      return Wonder_jest.describe("test set type", (function (param) {
                                                                    return Wonder_jest.testPromise("set default type", undefined, (function (param) {
                                                                                  return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                                                                var state = param[0];
                                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                                      return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureType(diffuseMap, state);
                                                                                                                    }))), /* array */[BasicSourceTextureTool$Wonderjs.getDefaultType(/* () */0)]);
                                                                                              }), state[0]);
                                                                                }));
                                                                  }));
                                                    }));
                                              Wonder_jest.describe("test truck glb", (function (param) {
                                                      Wonder_jest.describe("test set texture name", (function (param) {
                                                              return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                            return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                                          var state = param[0];
                                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                                return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName(diffuseMap, state);
                                                                                                              }))), /* array */[
                                                                                                      "basicSourceTexture_0",
                                                                                                      "basicSourceTexture_1",
                                                                                                      "basicSourceTexture_1"
                                                                                                    ]);
                                                                                        }), state[0]);
                                                                          }));
                                                            }));
                                                      Wonder_jest.testPromise("set not flipY", undefined, (function (param) {
                                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                            var state = param[0];
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                  return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(diffuseMap, state);
                                                                                                }))), /* array */[
                                                                                        false,
                                                                                        false,
                                                                                        false
                                                                                      ]);
                                                                          }), state[0]);
                                                            }));
                                                      Wonder_jest.testPromise("test set sampler data", undefined, (function (param) {
                                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                            var state = param[0];
                                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
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
                                                      return Wonder_jest.testPromise("test set source", undefined, (function (param) {
                                                                    return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                                                  var state = param[0];
                                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                        return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state);
                                                                                                      }))), /* array */[
                                                                                              GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0),
                                                                                              GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0),
                                                                                              GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0)
                                                                                            ]);
                                                                                }), state[0]);
                                                                  }));
                                                    }));
                                              return Wonder_jest.describe("test AlphaBlendModeTest glb", (function (param) {
                                                            return Wonder_jest.testPromise("test release blobs", undefined, (function (param) {
                                                                          return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("AlphaBlendModeTest.glb"), (function (param) {
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(GLBTool$Wonderjs.getURL().revokeObjectURL)), 2);
                                                                                      }), state[0]);
                                                                        }));
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.describe("khrMaterialsPBRSpecularGlossiness", (function (param) {
                                      Wonder_jest.testPromise("test set diffuseColor", undefined, (function (param) {
                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                            var state = param[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2][0], state).map((function (lightMaterial) {
                                                                                  return LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(lightMaterial, state);
                                                                                }))), /* array */[
                                                                        LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state),
                                                                        LightMaterialTool$Wonderjs.getDefaultDiffuseColor(state)
                                                                      ]);
                                                          }), state[0]);
                                            }));
                                      Wonder_jest.testPromise("test set diffuseMap", undefined, (function (param) {
                                              return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                            var state = param[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllLightMaterials(param[2][0], state).filter((function (lightMaterial) {
                                                                                    return LightMaterialAPI$Wonderjs.hasLightMaterialDiffuseMap(lightMaterial, state);
                                                                                  })).map((function (lightMaterial) {
                                                                                  return LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(lightMaterial, state);
                                                                                }))), /* array */[
                                                                        0,
                                                                        1
                                                                      ]);
                                                          }), state[0]);
                                            }));
                                      return Wonder_jest.describe("test diffuseMaps", (function (param) {
                                                    return Wonder_jest.describe("test SuperLowPolyStove glb", (function (param) {
                                                                  Wonder_jest.describe("test set texture name", (function (param) {
                                                                          return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                                                                      var state = param[0];
                                                                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                                            return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName(diffuseMap, state);
                                                                                                                          }))), /* array */[
                                                                                                                  "basicSourceTexture_0",
                                                                                                                  "basicSourceTexture_2"
                                                                                                                ]);
                                                                                                    }), state[0]);
                                                                                      }));
                                                                        }));
                                                                  Wonder_jest.testPromise("set not flipY", undefined, (function (param) {
                                                                          return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                                                        var state = param[0];
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                              return BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY(diffuseMap, state);
                                                                                                            }))), /* array */[
                                                                                                    false,
                                                                                                    false
                                                                                                  ]);
                                                                                      }), state[0]);
                                                                        }));
                                                                  Wonder_jest.testPromise("test set sampler data", undefined, (function (param) {
                                                                          return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                                                        var state = param[0];
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
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
                                                                  Wonder_jest.testPromise("test set source", undefined, (function (param) {
                                                                          return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                                                        var state = param[0];
                                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDiffuseMaps(param[2][0], state).map((function (diffuseMap) {
                                                                                                              return BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource(diffuseMap, state);
                                                                                                            }))), /* array */[
                                                                                                    GLBTool$Wonderjs.createFakeImage("MetalBrillante_diffuse.png", "object_url0", undefined, undefined, /* () */0),
                                                                                                    GLBTool$Wonderjs.createFakeImage("MetalNegro_diffuse.png", "object_url1", undefined, undefined, /* () */0)
                                                                                                  ]);
                                                                                      }), state[0]);
                                                                        }));
                                                                  return Wonder_jest.testPromise("test release blobs", undefined, (function (param) {
                                                                                return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("SuperLowPolyStove.glb"), (function (param) {
                                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(GLBTool$Wonderjs.getURL().revokeObjectURL)), 2);
                                                                                            }), state[0]);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                      }));
                return Wonder_jest.describe("test basicMaterials and lightMaterials", (function (param) {
                              return Wonder_jest.describe("test set material name", (function (param) {
                                            return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                          return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfBasicMaterialAndLightMaterial(/* () */0), (function (param) {
                                                                        var rootGameObject = param[2][0];
                                                                        var state = param[0];
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                            }));
              }));
        Wonder_jest.describe("test meshRenderers", (function (param) {
                Wonder_jest.testPromise("each gameObject with geometry component should has one meshRenderer", undefined, (function (param) {
                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2][0], state).filter((function (gameObject) {
                                                            return GameObjectAPI$Wonderjs.hasGameObjectMeshRendererComponent(gameObject, state);
                                                          })).length), 5);
                                    }), state[0]);
                      }));
                Wonder_jest.testPromise("test gameObjects which has no meshRenderer component", undefined, (function (param) {
                        return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllSortedTransforms(param[2][0], state).map((function (transform) {
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
                Wonder_jest.testPromise("test set isRender", undefined, (function (param) {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMeshRenderer(true, false, /* () */0), (function (param) {
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2][0], state).map((function (gameObject) {
                                                              return GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(gameObject, state);
                                                            })).map((function (meshRenderer) {
                                                            return MeshRendererAPI$Wonderjs.getMeshRendererIsRender(meshRenderer, state);
                                                          }))), /* array */[false]);
                                    }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.testPromise("test set drawMode", undefined, (function (param) {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfMeshRenderer(undefined, undefined, /* () */0), (function (param) {
                                            var state = param[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2][0], state).map((function (gameObject) {
                                                                    return GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(gameObject, state);
                                                                  })).map((function (meshRenderer) {
                                                                  return MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(meshRenderer, state);
                                                                }))), /* array */[3]);
                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                            }));
              }));
        Wonder_jest.describe("test directionLights", (function (param) {
                Wonder_jest.testPromise("if isRenderLight === false, set light not render", undefined, (function (param) {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDirectionLights(param[2][0], state).map((function (light) {
                                                            return DirectionLightAPI$Wonderjs.getDirectionLightIsRender(light, state);
                                                          }))), /* array */[false]);
                                    }), state, undefined, undefined, undefined, undefined, false, undefined, /* () */0);
                      }));
                return Wonder_jest.testPromise("test set color, intensity", undefined, (function (param) {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllDirectionLightData(param[2][0], param[0])), /* array */[/* tuple */[
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
        Wonder_jest.describe("test pointLights", (function (param) {
                Wonder_jest.testPromise("if isRenderLight === false, set light not render", undefined, (function (param) {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllPointLights(param[2][0], state).map((function (light) {
                                                            return PointLightAPI$Wonderjs.getPointLightIsRender(light, state);
                                                          }))), /* array */[false]);
                                    }), state, undefined, undefined, undefined, undefined, false, undefined, /* () */0);
                      }));
                return Wonder_jest.testPromise("test set color, intensity, constant, linear, quadratic, range", undefined, (function (param) {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllPointLightData(param[2][0], param[0])), /* array */[/* tuple */[
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
        Wonder_jest.describe("test ambientLight", (function (param) {
                return Wonder_jest.testPromise("test set color", undefined, (function (param) {
                              return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfLight(/* () */0), (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SceneAPI$Wonderjs.getAmbientLightColor(param[0])), /* array */[
                                                        1,
                                                        0.5,
                                                        1
                                                      ]);
                                          }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                            }));
              }));
        Wonder_jest.describe("test scripts", (function (param) {
                Wonder_jest.describe("test add script components", (function (param) {
                        return Wonder_jest.testPromise("test", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfScript(undefined, undefined, undefined, /* () */0), (function (param) {
                                                    var state = param[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(param[2][0], state).map((function (gameObject) {
                                                                          return GameObjectAPI$Wonderjs.hasGameObjectScriptComponent(gameObject, state);
                                                                        }))), /* array */[true]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                      }));
                Wonder_jest.testPromise("test set isActive", undefined, (function (param) {
                        return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfScript(false, Caml_option.some(undefined), Caml_option.some(undefined), /* () */0), (function (param) {
                                      var state = param[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllScripts(param[2][0], state).map((function (script) {
                                                            return ScriptAPI$Wonderjs.unsafeGetScriptIsActive(script, state);
                                                          }))), /* array */[false]);
                                    }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                      }));
                return Wonder_jest.describe("test event function", (function (param) {
                              Wonder_jest.testPromise("test exec init event function", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfScript(undefined, Caml_option.some(Caml_option.some(SceneGraphScriptTool$Wonderjs.buildEventFunctionDataMap(Caml_option.some(Caml_option.some(SceneGraphScriptTool$Wonderjs.buildEventFunc(/* () */0))), undefined, undefined, /* () */0))), Caml_option.some(Caml_option.some(SceneGraphScriptTool$Wonderjs.buildAttributeMap(/* () */0))), /* () */0), (function (param) {
                                                    var state = ScriptTool$Wonderjs.ExecEventFunction[/* execAllInitEventFunction */0](param[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllScripts(param[2][0], state).map((function (script) {
                                                                          return ScriptTool$Wonderjs.unsafeGetScriptAttributeIntFieldValue(script, SceneGraphScriptTool$Wonderjs.getScriptAttributeName(/* () */0), SceneGraphScriptTool$Wonderjs.getScriptAttributeFieldName(/* () */0), state);
                                                                        }))), /* array */[SceneGraphScriptTool$Wonderjs.getAttributeFieldAValueAfterExecEventeFunc(/* () */0)]);
                                                  }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                    }));
                              return Wonder_jest.testPromise("test exec update event function", undefined, (function (param) {
                                            return AssembleWDBSystemTool$Wonderjs.testGLTF(sandbox[0], ConvertGLBTool$Wonderjs.buildGLTFJsonOfScript(undefined, Caml_option.some(Caml_option.some(SceneGraphScriptTool$Wonderjs.buildEventFunctionDataMap(undefined, Caml_option.some(Caml_option.some(SceneGraphScriptTool$Wonderjs.buildEventFunc2(/* () */0))), undefined, /* () */0))), Caml_option.some(Caml_option.some(SceneGraphScriptTool$Wonderjs.buildAttributeMap(/* () */0))), /* () */0), (function (param) {
                                                          var state = ScriptTool$Wonderjs.ExecEventFunction[/* execAllUpdateEventFunction */1](param[0]);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllScripts(param[2][0], state).map((function (script) {
                                                                                return ScriptTool$Wonderjs.unsafeGetScriptAttributeIntFieldValue(script, SceneGraphScriptTool$Wonderjs.getScriptAttributeName(/* () */0), SceneGraphScriptTool$Wonderjs.getScriptAttributeFieldName(/* () */0), state);
                                                                              }))), /* array */[SceneGraphScriptTool$Wonderjs.getAttributeFieldAValueAfterExecEventeFunc2(/* () */0)]);
                                                        }), state, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test imageUint8ArrayDataMap", (function (param) {
                      Wonder_jest.describe("test basicSourceTextureImageUint8ArrayMap", (function (param) {
                              Wonder_jest.testPromise("return imageUint8ArrayDataMap with mimeType and uint8Array", undefined, (function (param) {
                                      return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("BoxTextured.glb"), (function (param) {
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.isImageUint8ArrayMapEqual(param[1][0][0], MutableSparseMapService$WonderCommonlib.set(0, /* tuple */[
                                                                            "image/png",
                                                                            23516
                                                                          ], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)))), true);
                                                  }), state[0]);
                                    }));
                              return Wonder_jest.testPromise("imageUint8ArrayDataMap's key should be basicSourceTexture", undefined, (function (param) {
                                            return AssembleWDBSystemTool$Wonderjs.testGLB(sandbox[0], GLBTool$Wonderjs.buildGLBFilePath("CesiumMilkTruck.glb"), (function (param) {
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.isImageUint8ArrayMapEqual(param[1][0][0], MutableSparseMapService$WonderCommonlib.set(1, /* tuple */[
                                                                                  "image/png",
                                                                                  427633
                                                                                ], MutableSparseMapService$WonderCommonlib.set(0, /* tuple */[
                                                                                      "image/png",
                                                                                      427633
                                                                                    ], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0))))), true);
                                                        }), state[0]);
                                          }));
                            }));
                      return Wonder_jest.describe("test cubemapTextureImageUint8ArrayDataMap", (function (param) {
                                    var skyboxWDBArrayBuffer = /* record */[/* contents */-1];
                                    beforeAll((function () {
                                            skyboxWDBArrayBuffer[0] = WDBTool$Wonderjs.generateWDB((function (state) {
                                                    var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state);
                                                    var match = SkyboxTool$Wonderjs.prepareCubemapTextureAndSetAllSources(state);
                                                    var state$1 = match[0];
                                                    var sceneGameObjectTransform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(rootGameObject, state$1);
                                                    var match$1 = LoadStreamWDBTool$Wonderjs.createGameObjectWithDiffuseMap(state$1);
                                                    var state$2 = TransformAPI$Wonderjs.setTransformParent(sceneGameObjectTransform, match$1[2], match$1[0]);
                                                    return /* tuple */[
                                                            state$2,
                                                            rootGameObject
                                                          ];
                                                  }));
                                            return /* () */0;
                                          }));
                                    Wonder_jest.testPromise("test basicSourceTextureImageUint8ArrayDataMap and cubemapTextureImageUint8ArrayDataMap->length", undefined, (function (param) {
                                            return AssembleWDBSystemTool$Wonderjs.testWDB(sandbox[0], skyboxWDBArrayBuffer[0], (function (param) {
                                                          var match = param[1][0];
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          MutableSparseMapService$WonderCommonlib.length(match[0]),
                                                                          MutableSparseMapService$WonderCommonlib.length(match[1])
                                                                        ]), /* tuple */[
                                                                      1,
                                                                      1
                                                                    ]);
                                                        }), state[0], undefined, undefined, undefined, undefined, undefined, /* () */0);
                                          }));
                                    return Wonder_jest.testPromise("return cubemapTextureImageUint8ArrayMap with all face sources' mimeType and uint8Array", undefined, (function (param) {
                                                  return AssembleWDBSystemTool$Wonderjs.testWDB(sandbox[0], skyboxWDBArrayBuffer[0], (function (param) {
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.isCubemapTextureImageUint8ArrayMapEqual(param[1][0][1], MutableSparseMapService$WonderCommonlib.set(0, /* record */[
                                                                                        /* pxImageUint8ArrayData : tuple */[
                                                                                          "image/png",
                                                                                          167
                                                                                        ],
                                                                                        /* nxImageUint8ArrayData : tuple */[
                                                                                          "image/png",
                                                                                          145
                                                                                        ],
                                                                                        /* pyImageUint8ArrayData : tuple */[
                                                                                          "image/png",
                                                                                          143
                                                                                        ],
                                                                                        /* nyImageUint8ArrayData : tuple */[
                                                                                          "image/png",
                                                                                          161
                                                                                        ],
                                                                                        /* pzImageUint8ArrayData : tuple */[
                                                                                          "image/jpeg",
                                                                                          151
                                                                                        ],
                                                                                        /* nzImageUint8ArrayData : tuple */[
                                                                                          "image/png",
                                                                                          129
                                                                                        ]
                                                                                      ], MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)))), true);
                                                              }), state[0], undefined, undefined, undefined, undefined, undefined, /* () */0);
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
