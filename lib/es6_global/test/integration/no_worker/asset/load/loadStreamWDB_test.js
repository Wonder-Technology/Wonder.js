

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as GLBTool$Wonderjs from "../tool/GLBTool.js";
import * as WDBTool$Wonderjs from "../tool/WDBTool.js";
import * as GLTFTool$Wonderjs from "../tool/GLTFTool.js";
import * as NodeTool$Wonderjs from "../../../../tool/NodeTool.js";
import * as SceneAPI$Wonderjs from "../../../../../src/api/SceneAPI.js";
import * as StateAPI$Wonderjs from "../../../../../src/api/StateAPI.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as ArrayTool$Wonderjs from "../../../../tool/service/atom/ArrayTool.js";
import * as SceneTool$Wonderjs from "../../../../tool/service/scene/SceneTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SkyboxTool$Wonderjs from "../../job/tool/SkyboxTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as PromiseTool$Wonderjs from "../../../tool/PromiseTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as ArrayService$Wonderjs from "../../../../../src/service/atom/ArrayService.js";
import * as DirectorTool$Wonderjs from "../../../../tool/core/DirectorTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as ExecIMGUITool$Wonderjs from "../../../../tool/service/imgui/ExecIMGUITool.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as ConvertGLBTool$Wonderjs from "../tool/ConvertGLBTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as ConvertGLBSystem$Wonderjs from "../../../../../src/asset/converter/ConvertGLBSystem.js";
import * as GLSLLocationTool$Wonderjs from "../../../../tool/service/location/GLSLLocationTool.js";
import * as LoadStreamWDBTool$Wonderjs from "../../../tool/asset/load/LoadStreamWDBTool.js";
import * as LoopRenderJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/LoopRenderJobTool.js";
import * as CubemapTextureTool$Wonderjs from "../../../../tool/service/texture/CubemapTextureTool.js";
import * as DirectionLightTool$Wonderjs from "../../../../tool/service/light/DirectionLightTool.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as AssembleWDBSystemTool$Wonderjs from "../tool/AssembleWDBSystemTool.js";
import * as BasicSourceTextureTool$Wonderjs from "../../../../tool/service/texture/BasicSourceTextureTool.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

Wonder_jest.describe("load stream wdb", (function (param) {
        var boxTexturedWDBArrayBuffer = /* record */[/* contents */-1];
        var cesiumMilkTruckWDBArrayBuffer = /* record */[/* contents */-1];
        var alphaBlendModeTestWDBArrayBuffer = /* record */[/* contents */-1];
        var stoveWDBArrayBuffer = /* record */[/* contents */-1];
        var skyboxWDBArrayBuffer = /* record */[/* contents */-1];
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _buildFakeBlob = function (){
  var Blob = function(arrayBufferArr, param){
      if( typeof window.blobData_wonder_forTest === "undefined"){
window.blobData_wonder_forTest = [
  [arrayBufferArr[0], param]
];
      } else{
window.blobData_wonder_forTest.push(
[arrayBufferArr[0], param]
);
      }
  };

window.Blob = Blob;
  };
        var _getBlobData = function (){
 return window.blobData_wonder_forTest;
    };
        var _clearBlobData = function (){
 delete window.blobData_wonder_forTest;
    };
        beforeAll((function () {
                boxTexturedWDBArrayBuffer[0] = NodeTool$Wonderjs.convertGLBToWDB("BoxTextured");
                cesiumMilkTruckWDBArrayBuffer[0] = NodeTool$Wonderjs.convertGLBToWDB("CesiumMilkTruck");
                alphaBlendModeTestWDBArrayBuffer[0] = NodeTool$Wonderjs.convertGLBToWDB("AlphaBlendModeTest");
                stoveWDBArrayBuffer[0] = NodeTool$Wonderjs.convertGLBToWDB("SuperLowPolyStove");
                return /* () */0;
              }));
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfigAndBufferConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0), SettingTool$Wonderjs.buildBufferConfigStr(100000, 100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                _clearBlobData();
                _buildFakeBlob();
                return TestTool$Wonderjs.closeContractCheck(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test load", (function (param) {
                      var _buildFakeRequestAnimationFrame = function (unsafeGetStateFunc,setStateFunc,runWithDefaultTimeFunc){
            window.requestAnimationFrame = function(func){
setStateFunc(runWithDefaultTimeFunc(unsafeGetStateFunc()));
            };
            };
                      var _prepare = function (sandbox, wdbArrayBuffer, state) {
                        var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(wdbArrayBuffer), undefined, /* () */0), Sinon.onCall(0, readStub))));
                        return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                      };
                      var _getBoxTexturedMeshGameObject = function (rootGameObject, state) {
                        return GameObjectTool$Wonderjs.getChildren(rootGameObject, state)[0];
                      };
                      var _getAllGeometrys = function (rootGameObject, state) {
                        return AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, state).filter((function (gameObject) {
                                        return GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent(gameObject, state);
                                      })).map((function (gameObject) {
                                      return GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(gameObject, state);
                                    }));
                      };
                      beforeEach((function () {
                              GLBTool$Wonderjs.prepare(sandbox[0]);
                              return _buildFakeRequestAnimationFrame(StateAPI$Wonderjs.unsafeGetState, StateAPI$Wonderjs.setState, DirectorTool$Wonderjs.runWithDefaultTime);
                            }));
                      Wonder_jest.describe("trigger handleWhenLoadingFunc", (function (param) {
                              var _prepare = function (sandbox, state) {
                                var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(boxTexturedWDBArrayBuffer[0].slice(1000)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(boxTexturedWDBArrayBuffer[0].slice(0, 1000)), undefined, /* () */0), Sinon.onCall(0, readStub))))));
                                return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                              };
                              return Wonder_jest.testPromise("trigger when load each chunk data", undefined, (function (param) {
                                            var totalLoadedByteLengthArr = /* array */[];
                                            var contentLengthArr = /* array */[];
                                            var wdbPathArr = /* array */[];
                                            var handleWhenLoadingFunc = function (totalLoadedByteLength, contentLength, wdbPath) {
                                              ArrayService$Wonderjs.push(totalLoadedByteLength, totalLoadedByteLengthArr);
                                              ArrayService$Wonderjs.push(contentLength, contentLengthArr);
                                              ArrayService$Wonderjs.push(wdbPath, wdbPathArr);
                                              return /* () */0;
                                            };
                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                            var match = _prepare(sandbox, state$1);
                                            return LoadStreamWDBTool$Wonderjs.readWithHandleWhenLoadingFunc(/* tuple */[
                                                          match[0],
                                                          LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                          /* tuple */[
                                                            1,
                                                            "./BoxTextured.wdb",
                                                            handleWhenLoadingFunc
                                                          ],
                                                          match[2],
                                                          match[3]
                                                        ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              totalLoadedByteLengthArr,
                                                                              contentLengthArr,
                                                                              wdbPathArr
                                                                            ]), /* tuple */[
                                                                          /* array */[
                                                                            1000,
                                                                            25092
                                                                          ],
                                                                          /* array */[
                                                                            1,
                                                                            1
                                                                          ],
                                                                          /* array */[
                                                                            "./BoxTextured.wdb",
                                                                            "./BoxTextured.wdb"
                                                                          ]
                                                                        ]));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test before start loop", (function (param) {
                              return Wonder_jest.describe("set default source to all textures", (function (param) {
                                            var _testSetDefaultSource = function (sandbox, wdbArrayBuffer, getTextureSourceArrFunc, state) {
                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                              var match = _prepare(sandbox, wdbArrayBuffer[0], state$1);
                                              var default11Image = match[0];
                                              var sourcesBeforeStartLoop = /* record */[/* contents : array */[]];
                                              var handleBeforeStartLoop = function (state, rootGameObject) {
                                                sourcesBeforeStartLoop[0] = Curry._2(getTextureSourceArrFunc, rootGameObject, state);
                                                var match = DirectionLightTool$Wonderjs.createGameObject(state);
                                                return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                                              };
                                              return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                            default11Image,
                                                            LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                            handleBeforeStartLoop,
                                                            match[3]
                                                          ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                            var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                            DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                            return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](sourcesBeforeStartLoop[0]), ArrayTool$Wonderjs.range(0, sourcesBeforeStartLoop[0].length - 1 | 0).map((function (param) {
                                                                                  return default11Image;
                                                                                }))));
                                                          }));
                                            };
                                            Wonder_jest.describe("set default source to all basicSourceTextures", (function (param) {
                                                    var _testSetDefaultSource$1 = function (sandbox, wdbArrayBuffer, state) {
                                                      return _testSetDefaultSource(sandbox, wdbArrayBuffer, LoadStreamWDBTool$Wonderjs.getAllDiffuseMapSources, state);
                                                    };
                                                    Wonder_jest.testPromise("test BoxTextured wdb", undefined, (function (param) {
                                                            return _testSetDefaultSource$1(sandbox, boxTexturedWDBArrayBuffer, state);
                                                          }));
                                                    Wonder_jest.describe("test CesiumMilkTruck wdb", (function (param) {
                                                            beforeEach((function () {
                                                                    state[0] = RenderJobsTool$Wonderjs.initWithJobConfigAndBufferConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0), SettingTool$Wonderjs.buildBufferConfigStr(30000, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                                    return TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                                  }));
                                                            return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                          return _testSetDefaultSource$1(sandbox, cesiumMilkTruckWDBArrayBuffer, state);
                                                                        }));
                                                          }));
                                                    Wonder_jest.testPromise("test AlphaBlendModeTest wdb", undefined, (function (param) {
                                                            return _testSetDefaultSource$1(sandbox, alphaBlendModeTestWDBArrayBuffer, state);
                                                          }));
                                                    return Wonder_jest.testPromise("test SuperLowPolyStove wdb", undefined, (function (param) {
                                                                  return _testSetDefaultSource$1(sandbox, stoveWDBArrayBuffer, state);
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("set default source to all cubemapTextures", (function (param) {
                                                          beforeAll((function () {
                                                                  skyboxWDBArrayBuffer[0] = WDBTool$Wonderjs.generateWDB((function (state) {
                                                                          var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state);
                                                                          var match = SkyboxTool$Wonderjs.prepareCubemapTextureAndSetAllSources(state);
                                                                          return /* tuple */[
                                                                                  match[0],
                                                                                  rootGameObject
                                                                                ];
                                                                        }));
                                                                  return /* () */0;
                                                                }));
                                                          return Wonder_jest.testPromise("test skybox wdb", undefined, (function (param) {
                                                                        var sandbox$1 = sandbox;
                                                                        var wdbArrayBuffer = skyboxWDBArrayBuffer;
                                                                        var state$1 = state;
                                                                        return _testSetDefaultSource(sandbox$1, wdbArrayBuffer, LoadStreamWDBTool$Wonderjs.getSkyboxCubemapSourceArr, state$1);
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test load all data in first chunk", (function (param) {
                              var _testAddGeometryComponents = function (sandbox, wdbArrayBuffer, param, state) {
                                var resultGeometrysWhenDone = param[1];
                                var resultGeometrysBeforeStartLoop = param[0];
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                var match = _prepare(sandbox, wdbArrayBuffer[0], state$1);
                                var geometrysBeforeStartLoop = /* record */[/* contents : array */[]];
                                var geometrysWhenDone = /* record */[/* contents : array */[]];
                                var handleBeforeStartLoop = function (state, rootGameObject) {
                                  geometrysBeforeStartLoop[0] = _getAllGeometrys(rootGameObject, state);
                                  var match = DirectionLightTool$Wonderjs.createGameObject(state);
                                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                                };
                                var handleWhenDoneFunc = function (state, rootGameObject) {
                                  geometrysWhenDone[0] = _getAllGeometrys(rootGameObject, state);
                                  return state;
                                };
                                return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                              match[0],
                                              LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                              handleBeforeStartLoop,
                                              handleWhenDoneFunc
                                            ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                              var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                              DirectorTool$Wonderjs.runWithDefaultTime(state);
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  geometrysBeforeStartLoop[0],
                                                                  geometrysWhenDone[0]
                                                                ]), /* tuple */[
                                                              resultGeometrysBeforeStartLoop,
                                                              resultGeometrysWhenDone
                                                            ]));
                                            }));
                              };
                              var _testLoadBlobImage = function (sandbox, wdbArrayBuffer, param, getTextureSourceArrFunc, state) {
                                var resultSourcesWhenDone = param[1];
                                var resultBlobData = param[0];
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                var match = _prepare(sandbox, wdbArrayBuffer[0], state$1);
                                var sourcesWhenDone = /* record */[/* contents : array */[]];
                                var handleWhenDoneFunc = function (state, rootGameObject) {
                                  sourcesWhenDone[0] = Curry._2(getTextureSourceArrFunc, rootGameObject, state);
                                  var match = DirectionLightTool$Wonderjs.createGameObject(state);
                                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                                };
                                return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                              match[0],
                                              LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                              match[2],
                                              handleWhenDoneFunc
                                            ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                              var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                              DirectorTool$Wonderjs.runWithDefaultTime(state);
                                              var blobData = _getBlobData();
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  blobData.map((function (param) {
                                                                          return /* tuple */[
                                                                                  param[0].byteLength,
                                                                                  param[1]
                                                                                ];
                                                                        })),
                                                                  sourcesWhenDone[0]
                                                                ]), /* tuple */[
                                                              resultBlobData,
                                                              resultSourcesWhenDone
                                                            ]));
                                            }));
                              };
                              var _testDraw = function (sandbox, wdbArrayBuffer, drawCount, state) {
                                var drawElements = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(drawElements), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                var match = _prepare(sandbox, wdbArrayBuffer[0], state$1);
                                return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                              match[0],
                                              LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                              match[2],
                                              match[3]
                                            ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                              var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                              var drawElementsCallCount = Sinon.getCallCount(drawElements);
                                              DirectorTool$Wonderjs.runWithDefaultTime(state);
                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(drawElements) - drawElementsCallCount | 0), drawCount));
                                            }));
                              };
                              Wonder_jest.describe("test skybox wdb", (function (param) {
                                      beforeEach((function () {
                                              state[0] = LoadStreamWDBTool$Wonderjs.prepareStateForSkybox(sandbox);
                                              return TestTool$Wonderjs.closeContractCheck(/* () */0);
                                            }));
                                      beforeAll((function () {
                                              skyboxWDBArrayBuffer[0] = WDBTool$Wonderjs.generateWDB((function (state) {
                                                      var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state);
                                                      var match = SkyboxTool$Wonderjs.prepareCubemapTextureAndSetAllSources(state);
                                                      return /* tuple */[
                                                              match[0],
                                                              rootGameObject
                                                            ];
                                                    }));
                                              return /* () */0;
                                            }));
                                      Wonder_jest.testPromise("load blob image and set it to be source", undefined, (function (param) {
                                              var sandbox$1 = sandbox;
                                              var wdbArrayBuffer = skyboxWDBArrayBuffer;
                                              var param$1 = /* tuple */[
                                                /* array */[
                                                  /* tuple */[
                                                    227,
                                                    {
                                                      type: "image/png"
                                                    }
                                                  ],
                                                  /* tuple */[
                                                    167,
                                                    {
                                                      type: "image/png"
                                                    }
                                                  ],
                                                  /* tuple */[
                                                    145,
                                                    {
                                                      type: "image/png"
                                                    }
                                                  ],
                                                  /* tuple */[
                                                    143,
                                                    {
                                                      type: "image/png"
                                                    }
                                                  ],
                                                  /* tuple */[
                                                    161,
                                                    {
                                                      type: "image/png"
                                                    }
                                                  ],
                                                  /* tuple */[
                                                    151,
                                                    {
                                                      type: "image/jpeg"
                                                    }
                                                  ]
                                                ],
                                                /* array */[
                                                  GLBTool$Wonderjs.createFakeImage("i1", "object_url0", undefined, undefined, /* () */0),
                                                  GLBTool$Wonderjs.createFakeImage("i2", "object_url1", undefined, undefined, /* () */0),
                                                  GLBTool$Wonderjs.createFakeImage("i3", "object_url2", undefined, undefined, /* () */0),
                                                  GLBTool$Wonderjs.createFakeImage("i4", "object_url3", undefined, undefined, /* () */0),
                                                  GLBTool$Wonderjs.createFakeImage("i5", "object_url4", undefined, undefined, /* () */0),
                                                  GLBTool$Wonderjs.createFakeImage("i6", "object_url5", undefined, undefined, /* () */0)
                                                ]
                                              ];
                                              var state$1 = state;
                                              return _testLoadBlobImage(sandbox$1, wdbArrayBuffer, /* tuple */[
                                                          param$1[0],
                                                          param$1[1]
                                                        ], LoadStreamWDBTool$Wonderjs.getSkyboxCubemapSourceArr, state$1);
                                            }));
                                      Wonder_jest.testPromise("draw the gameObject", undefined, (function (param) {
                                              return _testDraw(sandbox, skyboxWDBArrayBuffer, 1, state);
                                            }));
                                      return Wonder_jest.testPromise("mark skybox->cubemap texture need update", undefined, (function (param) {
                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                    var match = _prepare(sandbox, skyboxWDBArrayBuffer[0], state$1);
                                                    var handleWhenDoneFunc = function (state, rootGameObject) {
                                                      return state;
                                                    };
                                                    return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                  match[0],
                                                                  LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                                  match[2],
                                                                  handleWhenDoneFunc
                                                                ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                  var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                  return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CubemapTextureTool$Wonderjs.getIsNeedUpdate(SceneTool$Wonderjs.unsafeGetCubemapTexture(state), state)), true));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test glb->wdb", (function (param) {
                                            var _testLoadBlobImage$1 = function (sandbox, wdbArrayBuffer, param, state) {
                                              return _testLoadBlobImage(sandbox, wdbArrayBuffer, /* tuple */[
                                                          param[0],
                                                          param[1]
                                                        ], LoadStreamWDBTool$Wonderjs.getAllDiffuseMapSources, state);
                                            };
                                            Wonder_jest.describe("test BoxTextured wdb", (function (param) {
                                                    Wonder_jest.testPromise("add geometry component", undefined, (function (param) {
                                                            return _testAddGeometryComponents(sandbox, boxTexturedWDBArrayBuffer, /* tuple */[
                                                                        /* array */[],
                                                                        /* array */[0]
                                                                      ], state);
                                                          }));
                                                    Wonder_jest.testPromise("test set geometry point data", undefined, (function (param) {
                                                            var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, 2, undefined, undefined, 3, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                            var match = _prepare(sandbox, boxTexturedWDBArrayBuffer[0], state$1);
                                                            var geometryWhenDone = /* record */[/* contents */-1];
                                                            var handleWhenDoneFunc = function (state, rootGameObject) {
                                                              geometryWhenDone[0] = GameObjectAPI$Wonderjs.unsafeGetGameObjectGeometryComponent(_getBoxTexturedMeshGameObject(rootGameObject, state), state);
                                                              return state;
                                                            };
                                                            return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                          match[0],
                                                                          LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                                          match[2],
                                                                          handleWhenDoneFunc
                                                                        ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                          var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                          var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                                          var geometry = geometryWhenDone[0];
                                                                          var vertices = GeometryAPI$Wonderjs.getGeometryVertices(geometry, state$1);
                                                                          var normals = GeometryAPI$Wonderjs.getGeometryNormals(geometry, state$1);
                                                                          var texCoords = GeometryAPI$Wonderjs.getGeometryTexCoords(geometry, state$1);
                                                                          var indices = GeometryAPI$Wonderjs.getGeometryIndices16(geometry, state$1);
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              /* tuple */[
                                                                                                vertices,
                                                                                                normals,
                                                                                                texCoords,
                                                                                                Caml_option.some(indices),
                                                                                                undefined
                                                                                              ],
                                                                                              /* tuple */[
                                                                                                Sinon.getCallCount(Sinon.withThreeArgs(1, vertices, 3, bufferData)),
                                                                                                Sinon.getCallCount(Sinon.withThreeArgs(1, normals, 3, bufferData)),
                                                                                                Sinon.getCallCount(Sinon.withThreeArgs(1, texCoords, 3, bufferData)),
                                                                                                Sinon.getCallCount(Sinon.withThreeArgs(2, indices, 3, bufferData))
                                                                                              ]
                                                                                            ]), /* tuple */[
                                                                                          GLTFTool$Wonderjs.getBoxTexturedGeometryData(/* () */0),
                                                                                          /* tuple */[
                                                                                            1,
                                                                                            1,
                                                                                            1,
                                                                                            1
                                                                                          ]
                                                                                        ]));
                                                                        }));
                                                          }));
                                                    Wonder_jest.testPromise("load blob image and set it to be source", undefined, (function (param) {
                                                            return _testLoadBlobImage$1(sandbox, boxTexturedWDBArrayBuffer, /* tuple */[
                                                                        /* array */[/* tuple */[
                                                                            23516,
                                                                            {
                                                                              type: "image/png"
                                                                            }
                                                                          ]],
                                                                        /* array */[GLBTool$Wonderjs.createFakeImage("CesiumLogoFlat.png", "object_url0", undefined, undefined, /* () */0)]
                                                                      ], state);
                                                          }));
                                                    return Wonder_jest.testPromise("draw the gameObject", undefined, (function (param) {
                                                                  return _testDraw(sandbox, boxTexturedWDBArrayBuffer, 1, state);
                                                                }));
                                                  }));
                                            Wonder_jest.describe("test CesiumMilkTruck wdb", (function (param) {
                                                    beforeEach((function () {
                                                            state[0] = RenderJobsTool$Wonderjs.initWithJobConfigAndBufferConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0), SettingTool$Wonderjs.buildBufferConfigStr(30000, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                                            return TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                          }));
                                                    Wonder_jest.testPromise("add geometry component", undefined, (function (param) {
                                                            return _testAddGeometryComponents(sandbox, cesiumMilkTruckWDBArrayBuffer, /* tuple */[
                                                                        /* array */[],
                                                                        /* array */[
                                                                          1,
                                                                          2,
                                                                          3,
                                                                          0,
                                                                          0
                                                                        ]
                                                                      ], state);
                                                          }));
                                                    Wonder_jest.testPromise("test set geometry point data", undefined, (function (param) {
                                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                            var match = _prepare(sandbox, cesiumMilkTruckWDBArrayBuffer[0], state$1);
                                                            var rootGameObjectWhenDone = /* record */[/* contents */-1];
                                                            var handleWhenDoneFunc = function (state, rootGameObject) {
                                                              rootGameObjectWhenDone[0] = rootGameObject;
                                                              return state;
                                                            };
                                                            return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                          match[0],
                                                                          LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                                          match[2],
                                                                          handleWhenDoneFunc
                                                                        ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                          var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                          var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                                          var dataArr = AssembleWDBSystemTool$Wonderjs.getAllGeometryData(rootGameObjectWhenDone[0], state$1);
                                                                          var dataMap = GLTFTool$Wonderjs.getTruckGeometryData(/* () */0);
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](dataArr), /* array */[
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
                                                                                        ]));
                                                                        }));
                                                          }));
                                                    Wonder_jest.testPromise("load blob image and set it to be source", undefined, (function (param) {
                                                            return _testLoadBlobImage$1(sandbox, cesiumMilkTruckWDBArrayBuffer, /* tuple */[
                                                                        /* array */[/* tuple */[
                                                                            427633,
                                                                            {
                                                                              type: "image/png"
                                                                            }
                                                                          ]],
                                                                        /* array */[
                                                                          GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0),
                                                                          GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0),
                                                                          GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0)
                                                                        ]
                                                                      ], state);
                                                          }));
                                                    return Wonder_jest.testPromise("draw the gameObject", undefined, (function (param) {
                                                                  return _testDraw(sandbox, cesiumMilkTruckWDBArrayBuffer, 5, state);
                                                                }));
                                                  }));
                                            Wonder_jest.describe("test AlphaBlendModeTest wdb", (function (param) {
                                                    Wonder_jest.testPromise("add geometry component", undefined, (function (param) {
                                                            return _testAddGeometryComponents(sandbox, alphaBlendModeTestWDBArrayBuffer, /* tuple */[
                                                                        /* array */[],
                                                                        /* array */[
                                                                          4,
                                                                          7,
                                                                          5,
                                                                          1,
                                                                          8,
                                                                          0,
                                                                          3,
                                                                          6,
                                                                          2
                                                                        ]
                                                                      ], state);
                                                          }));
                                                    Wonder_jest.testPromise("test set geometry point data", undefined, (function (param) {
                                                            var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                            var match = _prepare(sandbox, alphaBlendModeTestWDBArrayBuffer[0], state$1);
                                                            var rootGameObjectWhenDone = /* record */[/* contents */-1];
                                                            var handleWhenDoneFunc = function (state, rootGameObject) {
                                                              rootGameObjectWhenDone[0] = rootGameObject;
                                                              return state;
                                                            };
                                                            return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                          match[0],
                                                                          LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                                          match[2],
                                                                          handleWhenDoneFunc
                                                                        ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                          var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                          var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                                          var dataArr = AssembleWDBSystemTool$Wonderjs.getAllGeometryData(rootGameObjectWhenDone[0], state$1);
                                                                          var dataMap = GLTFTool$Wonderjs.getAlphaBlendModeTestGeometryData(/* () */0);
                                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                              dataArr.length,
                                                                                              Caml_array.caml_array_get(dataArr, 1)
                                                                                            ]), /* tuple */[
                                                                                          9,
                                                                                          /* tuple */[
                                                                                            "DecalBlendMesh",
                                                                                            MutableHashMapService$WonderCommonlib.unsafeGet("DecalBlendMesh", dataMap)
                                                                                          ]
                                                                                        ]));
                                                                        }));
                                                          }));
                                                    Wonder_jest.testPromise("load blob image and set it to be source", undefined, (function (param) {
                                                            return _testLoadBlobImage$1(sandbox, alphaBlendModeTestWDBArrayBuffer, /* tuple */[
                                                                        /* array */[
                                                                          /* tuple */[
                                                                            702714,
                                                                            {
                                                                              type: "image/jpeg"
                                                                            }
                                                                          ],
                                                                          /* tuple */[
                                                                            65522,
                                                                            {
                                                                              type: "image/png"
                                                                            }
                                                                          ]
                                                                        ],
                                                                        /* array */[
                                                                          GLBTool$Wonderjs.createFakeImage("image_3", "object_url1", undefined, undefined, /* () */0),
                                                                          GLBTool$Wonderjs.createFakeImage("image_3", "object_url1", undefined, undefined, /* () */0),
                                                                          GLBTool$Wonderjs.createFakeImage("image_3", "object_url1", undefined, undefined, /* () */0),
                                                                          GLBTool$Wonderjs.createFakeImage("image_3", "object_url1", undefined, undefined, /* () */0),
                                                                          GLBTool$Wonderjs.createFakeImage("image_3", "object_url1", undefined, undefined, /* () */0),
                                                                          GLBTool$Wonderjs.createFakeImage("image_3", "object_url1", undefined, undefined, /* () */0),
                                                                          GLBTool$Wonderjs.createFakeImage("image_3", "object_url1", undefined, undefined, /* () */0),
                                                                          GLBTool$Wonderjs.createFakeImage("image_3", "object_url1", undefined, undefined, /* () */0),
                                                                          GLBTool$Wonderjs.createFakeImage("image_2", "object_url0", undefined, undefined, /* () */0)
                                                                        ]
                                                                      ], state);
                                                          }));
                                                    return Wonder_jest.testPromise("draw the gameObject", undefined, (function (param) {
                                                                  return _testDraw(sandbox, alphaBlendModeTestWDBArrayBuffer, 9, state);
                                                                }));
                                                  }));
                                            return Wonder_jest.describe("test SuperLowPolyStove wdb", (function (param) {
                                                          Wonder_jest.testPromise("add geometry component", undefined, (function (param) {
                                                                  return _testAddGeometryComponents(sandbox, stoveWDBArrayBuffer, /* tuple */[
                                                                              /* array */[],
                                                                              /* array */[
                                                                                0,
                                                                                1
                                                                              ]
                                                                            ], state);
                                                                }));
                                                          Wonder_jest.testPromise("test set geometry point data", undefined, (function (param) {
                                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                                  var match = _prepare(sandbox, stoveWDBArrayBuffer[0], state$1);
                                                                  var rootGameObjectWhenDone = /* record */[/* contents */-1];
                                                                  var handleWhenDoneFunc = function (state, rootGameObject) {
                                                                    rootGameObjectWhenDone[0] = rootGameObject;
                                                                    return state;
                                                                  };
                                                                  return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                                match[0],
                                                                                LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                                                match[2],
                                                                                handleWhenDoneFunc
                                                                              ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                                var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                                var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                                                var dataArr = AssembleWDBSystemTool$Wonderjs.getAllGeometryData(rootGameObjectWhenDone[0], state$1);
                                                                                var dataMap = GLTFTool$Wonderjs.getSuperLowPolyStoveGeometryData(/* () */0);
                                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                    dataArr.length,
                                                                                                    Caml_array.caml_array_get(dataArr, 1)
                                                                                                  ]), /* tuple */[
                                                                                                2,
                                                                                                /* tuple */[
                                                                                                  "Stove_1",
                                                                                                  MutableHashMapService$WonderCommonlib.unsafeGet("Stove_1", dataMap)
                                                                                                ]
                                                                                              ]));
                                                                              }));
                                                                }));
                                                          return Wonder_jest.testPromise("draw the gameObject", undefined, (function (param) {
                                                                        return _testDraw(sandbox, stoveWDBArrayBuffer, 2, state);
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test load in multiple chunks", (function (param) {
                              Wonder_jest.describe("test skybox and one gameObject with map(basic source texture) wdb", (function (param) {
                                      return Wonder_jest.describe("\n            load blob image;\n            set it to be source;\n            ", (function (param) {
                                                    beforeEach((function () {
                                                            state[0] = LoadStreamWDBTool$Wonderjs.prepareStateForSkybox(sandbox);
                                                            return TestTool$Wonderjs.closeContractCheck(/* () */0);
                                                          }));
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
                                                    return Wonder_jest.describe("\n            chunk1: header + json + stream + stream_chunk1-stream_chunk4\n            chunk2: stream_chunk5->stream_chunk11 + a part of stream_chunk12(all are image chunks)\n            chunk3: other stream_chunk12(basic source texture image chunk)\n            done\n            ", (function (param) {
                                                                  var _prepare = function (sandbox, state) {
                                                                    var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                    var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(3, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(skyboxWDBArrayBuffer[0].slice(2927)), undefined, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(1912, 2927)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(skyboxWDBArrayBuffer[0].slice(0, 1912)), undefined, /* () */0), Sinon.onCall(0, readStub))))))));
                                                                    return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                                  };
                                                                  return Wonder_jest.testPromise("test", undefined, (function (param) {
                                                                                var sandbox$1 = sandbox;
                                                                                var param$1 = /* tuple */[
                                                                                  /* array */[
                                                                                    /* tuple */[
                                                                                      227,
                                                                                      {
                                                                                        type: "image/png"
                                                                                      }
                                                                                    ],
                                                                                    /* tuple */[
                                                                                      167,
                                                                                      {
                                                                                        type: "image/png"
                                                                                      }
                                                                                    ],
                                                                                    /* tuple */[
                                                                                      145,
                                                                                      {
                                                                                        type: "image/png"
                                                                                      }
                                                                                    ],
                                                                                    /* tuple */[
                                                                                      143,
                                                                                      {
                                                                                        type: "image/png"
                                                                                      }
                                                                                    ],
                                                                                    /* tuple */[
                                                                                      161,
                                                                                      {
                                                                                        type: "image/png"
                                                                                      }
                                                                                    ],
                                                                                    /* tuple */[
                                                                                      151,
                                                                                      {
                                                                                        type: "image/jpeg"
                                                                                      }
                                                                                    ],
                                                                                    /* tuple */[
                                                                                      129,
                                                                                      {
                                                                                        type: "image/png"
                                                                                      }
                                                                                    ]
                                                                                  ],
                                                                                  /* array */[
                                                                                    GLBTool$Wonderjs.createFakeImage("i1", "object_url1", undefined, undefined, /* () */0),
                                                                                    GLBTool$Wonderjs.createFakeImage("i2", "object_url2", undefined, undefined, /* () */0),
                                                                                    GLBTool$Wonderjs.createFakeImage("i3", "object_url3", undefined, undefined, /* () */0),
                                                                                    GLBTool$Wonderjs.createFakeImage("i4", "object_url4", undefined, undefined, /* () */0),
                                                                                    GLBTool$Wonderjs.createFakeImage("i5", "object_url5", undefined, undefined, /* () */0),
                                                                                    GLBTool$Wonderjs.createFakeImage("i6", "object_url6", undefined, undefined, /* () */0),
                                                                                    GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0)
                                                                                  ]
                                                                                ];
                                                                                var prepareFunc = _prepare;
                                                                                var state$1 = state;
                                                                                var resultSourcesWhenDone = param$1[1];
                                                                                var resultBlobData = param$1[0];
                                                                                var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox$1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1[0]);
                                                                                var match = Curry._2(prepareFunc, sandbox$1, state$2);
                                                                                var sourcesWhenDone = /* record */[/* contents : array */[]];
                                                                                var handleWhenDoneFunc = function (state, rootGameObject) {
                                                                                  sourcesWhenDone[0] = LoadStreamWDBTool$Wonderjs.getSkyboxCubemapSourceAndAllDiffuseMapSourcesArr(rootGameObject, state);
                                                                                  var match = DirectionLightTool$Wonderjs.createGameObject(state);
                                                                                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                                                                                };
                                                                                return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                                              match[0],
                                                                                              LoadStreamWDBTool$Wonderjs.buildController(sandbox$1),
                                                                                              match[2],
                                                                                              handleWhenDoneFunc
                                                                                            ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                                              var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                                              DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                                                              var blobData = _getBlobData();
                                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                                  blobData.map((function (param) {
                                                                                                                          return /* tuple */[
                                                                                                                                  param[0].byteLength,
                                                                                                                                  param[1]
                                                                                                                                ];
                                                                                                                        })),
                                                                                                                  sourcesWhenDone[0]
                                                                                                                ]), /* tuple */[
                                                                                                              resultBlobData,
                                                                                                              resultSourcesWhenDone
                                                                                                            ]));
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              Wonder_jest.describe("test CesiumMilkTruck wdb", (function (param) {
                                      var _testSetGeometryPointData = function (sandbox, dataCount, prepareFunc, state) {
                                        var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                        var match = Curry._2(prepareFunc, sandbox, state$1);
                                        var rootGameObjectWhenDone = /* record */[/* contents */-1];
                                        var handleWhenDoneFunc = function (state, rootGameObject) {
                                          rootGameObjectWhenDone[0] = rootGameObject;
                                          return state;
                                        };
                                        return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                      match[0],
                                                      LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                      match[2],
                                                      handleWhenDoneFunc
                                                    ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                      var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                      var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                      var dataArr = AssembleWDBSystemTool$Wonderjs.getAllGeometryData(rootGameObjectWhenDone[0], state$1);
                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](dataArr.length), dataCount));
                                                    }));
                                      };
                                      beforeEach((function () {
                                              state[0] = RenderJobsTool$Wonderjs.initWithJobConfigAndBufferConfigWithoutBuildFakeDom(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0), SettingTool$Wonderjs.buildBufferConfigStr(30000, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
                                              return TestTool$Wonderjs.closeContractCheck(/* () */0);
                                            }));
                                      Wonder_jest.describe("\n            1.chunk1: header + json + stream + stream_chunk1-stream_chunk4 + a part of stream_chunk5(image chunk)\n            2.chunk2: a part of stream_chunk5(image chunk)\n            3.chunk3: other stream_chunk5 + stream_chunk6 + a part of stream_chunk7\n            4.chunk4: other stream chunk data\n            5.done\n            ", (function (param) {
                                              var _testLoadBlobImage = function (sandbox, param, prepareFunc, state) {
                                                var resultSourcesWhenDone = param[1];
                                                var blobDataLength = param[0];
                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                var match = Curry._2(prepareFunc, sandbox, state$1);
                                                var sourcesWhenDone = /* record */[/* contents : array */[]];
                                                var handleWhenDoneFunc = function (state, rootGameObject) {
                                                  sourcesWhenDone[0] = LoadStreamWDBTool$Wonderjs.getAllDiffuseMapSources(rootGameObject, state);
                                                  GameObjectAPI$Wonderjs.hasGameObjectGeometryComponent(_getBoxTexturedMeshGameObject(rootGameObject, state), state);
                                                  var match = DirectionLightTool$Wonderjs.createGameObject(state);
                                                  return CameraTool$Wonderjs.createCameraGameObject(match[0])[0];
                                                };
                                                return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                              match[0],
                                                              LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                              match[2],
                                                              handleWhenDoneFunc
                                                            ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                              var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                              DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                              var blobData = _getBlobData();
                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  (blobData == null) ? 0 : blobData.length,
                                                                                  sourcesWhenDone[0]
                                                                                ]), /* tuple */[
                                                                              blobDataLength,
                                                                              resultSourcesWhenDone
                                                                            ]));
                                                            }));
                                              };
                                              Wonder_jest.describe("test 1,5", (function (param) {
                                                      var _prepare = function (sandbox, state) {
                                                        var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                        var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 32768)), undefined, /* () */0), Sinon.onCall(0, readStub))));
                                                        return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                      };
                                                      Wonder_jest.testPromise("set geometry point data", undefined, (function (param) {
                                                              return _testSetGeometryPointData(sandbox, 2, _prepare, state);
                                                            }));
                                                      return Wonder_jest.testPromise("not load blob image", undefined, (function (param) {
                                                                    return _testLoadBlobImage(sandbox, /* tuple */[
                                                                                0,
                                                                                /* array */[
                                                                                  LoadStreamWDBTool$Wonderjs.getDefault11Image(/* () */0),
                                                                                  LoadStreamWDBTool$Wonderjs.getDefault11Image(/* () */0),
                                                                                  LoadStreamWDBTool$Wonderjs.getDefault11Image(/* () */0)
                                                                                ]
                                                                              ], _prepare, state);
                                                                  }));
                                                    }));
                                              Wonder_jest.describe("test 1,2,5", (function (param) {
                                                      var _prepare = function (sandbox, state) {
                                                        var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                        var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(32768, 40000)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 32768)), undefined, /* () */0), Sinon.onCall(0, readStub))))));
                                                        return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                      };
                                                      Wonder_jest.testPromise("not set new geometry point data", undefined, (function (param) {
                                                              return _testSetGeometryPointData(sandbox, 2, _prepare, state);
                                                            }));
                                                      return Wonder_jest.testPromise("not load blob image", undefined, (function (param) {
                                                                    return _testLoadBlobImage(sandbox, /* tuple */[
                                                                                0,
                                                                                /* array */[
                                                                                  LoadStreamWDBTool$Wonderjs.getDefault11Image(/* () */0),
                                                                                  LoadStreamWDBTool$Wonderjs.getDefault11Image(/* () */0),
                                                                                  LoadStreamWDBTool$Wonderjs.getDefault11Image(/* () */0)
                                                                                ]
                                                                              ], _prepare, state);
                                                                  }));
                                                    }));
                                              Wonder_jest.describe("test 1,2,3,5", (function (param) {
                                                      var _prepare = function (sandbox, state) {
                                                        var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                        var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(3, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(40000, 470000)), undefined, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(32768, 40000)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 32768)), undefined, /* () */0), Sinon.onCall(0, readStub))))))));
                                                        return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                      };
                                                      Wonder_jest.testPromise("not set new geometry point data", undefined, (function (param) {
                                                              return _testSetGeometryPointData(sandbox, 2, _prepare, state);
                                                            }));
                                                      return Wonder_jest.testPromise("\n                     load blob image;\n                     set it to be source;\n                     ", undefined, (function (param) {
                                                                    return _testLoadBlobImage(sandbox, /* tuple */[
                                                                                1,
                                                                                /* array */[
                                                                                  GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0),
                                                                                  GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0),
                                                                                  GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0)
                                                                                ]
                                                                              ], _prepare, state);
                                                                  }));
                                                    }));
                                              return Wonder_jest.describe("test 1,2,3,4,5", (function (param) {
                                                            var _prepare = function (sandbox, state) {
                                                              var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(4, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(80000)), undefined, /* () */0), Sinon.onCall(3, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(40000, 80000)), undefined, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(32768, 40000)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 32768)), undefined, /* () */0), Sinon.onCall(0, readStub))))))))));
                                                              return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                            };
                                                            Wonder_jest.testPromise("set new geometry point data", undefined, (function (param) {
                                                                    return _testSetGeometryPointData(sandbox, 5, _prepare, state);
                                                                  }));
                                                            return Wonder_jest.testPromise("\n                     load blob image;\n                     set it to be source;\n                     ", undefined, (function (param) {
                                                                          return _testLoadBlobImage(sandbox, /* tuple */[
                                                                                      1,
                                                                                      /* array */[
                                                                                        GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0),
                                                                                        GLBTool$Wonderjs.createFakeImage("image_0", "object_url0", undefined, undefined, /* () */0)
                                                                                      ]
                                                                                    ], _prepare, state);
                                                                        }));
                                                          }));
                                            }));
                                      return Wonder_jest.describe("\n            1.chunk1: header + a part of json\n            2.chunk2: other json + a part of stream\n            3.chunk3: other stream + a part of stream_chunk1\n            4.chunk4: other stream_chunk1 + stream_chunk2\n            5.chunk5: stream_chunk3-stream_chunk5 + a part of stream_chunk6\n            6.chunk6: other stream_chunk6 + stream_chunkk7-stream_chunk10 + a part of stream_chunk11\n            7.chunk7: other stream chunk data\n            8.done\n            ", (function (param) {
                                                    var _testContractError = function (sandbox, prepareFunc, state) {
                                                      TestTool$Wonderjs.openContractCheck(/* () */0);
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                      var match = Curry._2(prepareFunc, sandbox, state$1);
                                                      var rootGameObjectWhenDone = /* record */[/* contents */-1];
                                                      var handleWhenDoneFunc = function (state, rootGameObject) {
                                                        rootGameObjectWhenDone[0] = rootGameObject;
                                                        return state;
                                                      };
                                                      return PromiseTool$Wonderjs.judgeErrorMessage("expect load all data", LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                      match[0],
                                                                      LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                                      match[2],
                                                                      handleWhenDoneFunc
                                                                    ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])));
                                                    };
                                                    var _testNotSendAttributeData = function (sandbox, prepareFunc, state) {
                                                      var bufferData = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                      var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(bufferData), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                      var match = Curry._2(prepareFunc, sandbox, state$1);
                                                      return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                    match[0],
                                                                    LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                                    match[2],
                                                                    match[3]
                                                                  ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(bufferData)), 0));
                                                                  }));
                                                    };
                                                    Wonder_jest.describe("test 1,8", (function (param) {
                                                            var _prepare = function (sandbox, state) {
                                                              var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 300)), undefined, /* () */0), Sinon.onCall(0, readStub))));
                                                              return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                            };
                                                            return Wonder_jest.testPromise("contract error", undefined, (function (param) {
                                                                          return _testContractError(sandbox, _prepare, state);
                                                                        }));
                                                          }));
                                                    Wonder_jest.describe("test 1,2,8", (function (param) {
                                                            var _prepare = function (sandbox, state) {
                                                              var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(300, 1650)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 300)), undefined, /* () */0), Sinon.onCall(0, readStub))))));
                                                              return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                            };
                                                            return Wonder_jest.testPromise("contract error", undefined, (function (param) {
                                                                          return _testContractError(sandbox, _prepare, state);
                                                                        }));
                                                          }));
                                                    Wonder_jest.describe("test 1,2,3,8", (function (param) {
                                                            var _prepare = function (sandbox, state) {
                                                              var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(3, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(1650, 3000)), undefined, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(300, 1650)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 300)), undefined, /* () */0), Sinon.onCall(0, readStub))))))));
                                                              return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                            };
                                                            Wonder_jest.describe("assemble and start loop", (function (param) {
                                                                    Wonder_jest.describe("send light data", (function (param) {
                                                                            return Wonder_jest.testPromise("send u_ambient", undefined, (function (param) {
                                                                                          var uniform3f = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                                          var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_ambient");
                                                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniform3f), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                                                          var match = _prepare(sandbox, state$1);
                                                                                          return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                                                        match[0],
                                                                                                        LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                                                                        match[2],
                                                                                                        match[3]
                                                                                                      ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                                                        return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withFourArgs(0, 0, 0, 0, uniform3f))), 2));
                                                                                                      }));
                                                                                        }));
                                                                          }));
                                                                    return Wonder_jest.describe("send camera data", (function (param) {
                                                                                  return Wonder_jest.testPromise("send u_vMatrix", undefined, (function (param) {
                                                                                                var uniformMatrix4fv = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                                                var getUniformLocation = GLSLLocationTool$Wonderjs.getUniformLocation(0, sandbox, "u_vMatrix");
                                                                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(getUniformLocation), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(uniformMatrix4fv), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state[0]);
                                                                                                var match = _prepare(sandbox, state$1);
                                                                                                return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                                                              match[0],
                                                                                                              LoadStreamWDBTool$Wonderjs.buildController(sandbox),
                                                                                                              match[2],
                                                                                                              match[3]
                                                                                                            ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Sinon.getCallCount(Sinon.withOneArg(0, uniformMatrix4fv))), 2));
                                                                                                            }));
                                                                                              }));
                                                                                }));
                                                                  }));
                                                            Wonder_jest.testPromise("not set geometry point data", undefined, (function (param) {
                                                                    return _testSetGeometryPointData(sandbox, 0, _prepare, state);
                                                                  }));
                                                            return Wonder_jest.testPromise("not send attribute data", undefined, (function (param) {
                                                                          return _testNotSendAttributeData(sandbox, _prepare, state);
                                                                        }));
                                                          }));
                                                    Wonder_jest.describe("test 1,2,3,4,8", (function (param) {
                                                            var _prepare = function (sandbox, state) {
                                                              var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(4, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(3000, 10000)), undefined, /* () */0), Sinon.onCall(3, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(1650, 3000)), undefined, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(300, 1650)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 300)), undefined, /* () */0), Sinon.onCall(0, readStub))))))))));
                                                              return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                            };
                                                            Wonder_jest.testPromise("not set geometry point data", undefined, (function (param) {
                                                                    return _testSetGeometryPointData(sandbox, 0, _prepare, state);
                                                                  }));
                                                            return Wonder_jest.testPromise("not send attribute data", undefined, (function (param) {
                                                                          return _testNotSendAttributeData(sandbox, _prepare, state);
                                                                        }));
                                                          }));
                                                    Wonder_jest.describe("test 1,2,3,4,5,8", (function (param) {
                                                            var _prepare = function (sandbox, state) {
                                                              var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(5, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(10000, 50000)), undefined, /* () */0), Sinon.onCall(4, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(3000, 10000)), undefined, /* () */0), Sinon.onCall(3, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(1650, 3000)), undefined, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(300, 1650)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 300)), undefined, /* () */0), Sinon.onCall(0, readStub))))))))))));
                                                              return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                            };
                                                            return Wonder_jest.testPromise("set geometry point data", undefined, (function (param) {
                                                                          return _testSetGeometryPointData(sandbox, 2, _prepare, state);
                                                                        }));
                                                          }));
                                                    Wonder_jest.describe("test 1,2,3,4,5,6,8", (function (param) {
                                                            var _prepare = function (sandbox, state) {
                                                              var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                              var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(6, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(50000, 523828)), undefined, /* () */0), Sinon.onCall(5, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(10000, 50000)), undefined, /* () */0), Sinon.onCall(4, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(3000, 10000)), undefined, /* () */0), Sinon.onCall(3, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(1650, 3000)), undefined, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(300, 1650)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 300)), undefined, /* () */0), Sinon.onCall(0, readStub))))))))))))));
                                                              return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                            };
                                                            return Wonder_jest.testPromise("set geometry point data", undefined, (function (param) {
                                                                          return _testSetGeometryPointData(sandbox, 3, _prepare, state);
                                                                        }));
                                                          }));
                                                    return Wonder_jest.describe("test 1,2,3,4,5,6,7,8", (function (param) {
                                                                  var _prepare = function (sandbox, state) {
                                                                    var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                    var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(7, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(523828)), undefined, /* () */0), Sinon.onCall(6, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(50000, 523828)), undefined, /* () */0), Sinon.onCall(5, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(10000, 50000)), undefined, /* () */0), Sinon.onCall(4, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(3000, 10000)), undefined, /* () */0), Sinon.onCall(3, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(1650, 3000)), undefined, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(300, 1650)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(cesiumMilkTruckWDBArrayBuffer[0].slice(0, 300)), undefined, /* () */0), Sinon.onCall(0, readStub))))))))))))))));
                                                                    return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                                  };
                                                                  return Wonder_jest.testPromise("set geometry point data", undefined, (function (param) {
                                                                                return _testSetGeometryPointData(sandbox, 5, _prepare, state);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                              return Wonder_jest.describe("test AlphaBlendModeTest wdb", (function (param) {
                                            return Wonder_jest.describe("\n            1.chunk1: header + json + stream + stream_chunk1-stream_chunk4 + a part of stream_chunk5(image chunk)\n            ...\n            2.done\n            ", (function (param) {
                                                          return Wonder_jest.describe("test 1,2", (function (param) {
                                                                        var _prepare = function (sandbox, state) {
                                                                          var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                                          var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(alphaBlendModeTestWDBArrayBuffer[0].slice(0, 65536)), undefined, /* () */0), Sinon.onCall(0, readStub))));
                                                                          return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                                        };
                                                                        return Wonder_jest.testPromise("set geometry point data", undefined, (function (param) {
                                                                                      var sandbox$1 = sandbox;
                                                                                      var dataCount = 1;
                                                                                      var prepareFunc = _prepare;
                                                                                      var state$1 = state;
                                                                                      var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox$1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1[0]);
                                                                                      var match = Curry._2(prepareFunc, sandbox$1, state$2);
                                                                                      var rootGameObjectWhenDone = /* record */[/* contents */-1];
                                                                                      var handleWhenDoneFunc = function (state, rootGameObject) {
                                                                                        rootGameObjectWhenDone[0] = rootGameObject;
                                                                                        return state;
                                                                                      };
                                                                                      return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                                                    match[0],
                                                                                                    LoadStreamWDBTool$Wonderjs.buildController(sandbox$1),
                                                                                                    match[2],
                                                                                                    handleWhenDoneFunc
                                                                                                  ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                                                    var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                                                    var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                                                                    var dataArr = AssembleWDBSystemTool$Wonderjs.getAllGeometryData(rootGameObjectWhenDone[0], state$1);
                                                                                                    return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](dataArr.length), dataCount));
                                                                                                  }));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test set bin buffer chunk data", (function (param) {
                              return Wonder_jest.describe("test set basic source texture->image data", (function (param) {
                                            return Wonder_jest.test("mark need update", (function (param) {
                                                          var basicSourceTextureArr = /* array */[
                                                            0,
                                                            1
                                                          ];
                                                          var state$1 = ArrayService$WonderCommonlib.reduceOneParam((function (state, basicSourceTexture) {
                                                                  return BasicSourceTextureTool$Wonderjs.setIsNeedUpdate(basicSourceTexture, false, state);
                                                                }), state[0], basicSourceTextureArr);
                                                          var state$2 = LoadStreamWDBTool$Wonderjs.setImageData(/* record */[
                                                                /* imageIndex */0,
                                                                /* image */51
                                                              ], /* tuple */[
                                                                /* tuple */[
                                                                  basicSourceTextureArr,
                                                                  /* record */[
                                                                    /* textureIndices : array */[
                                                                      0,
                                                                      1
                                                                    ],
                                                                    /* imageIndices : array */[
                                                                      0,
                                                                      0
                                                                    ]
                                                                  ]
                                                                ],
                                                                /* tuple */[
                                                                  /* array */[],
                                                                  /* record */[
                                                                    /* cubemapTextureIndices : array */[],
                                                                    /* pxImageIndices : array */[],
                                                                    /* nxImageIndices : array */[],
                                                                    /* pyImageIndices : array */[],
                                                                    /* nyImageIndices : array */[],
                                                                    /* pzImageIndices : array */[],
                                                                    /* nzImageIndices : array */[]
                                                                  ]
                                                                ]
                                                              ], state$1);
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](basicSourceTextureArr.map((function (basicSourceTexture) {
                                                                                return BasicSourceTextureTool$Wonderjs.getIsNeedUpdate(basicSourceTexture, state$2);
                                                                              }))), /* array */[
                                                                      true,
                                                                      true
                                                                    ]);
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test imgui", (function (param) {
                              var imguiWDBArrayBuffer = /* record */[/* contents */-1];
                              beforeAll((function () {
                                      imguiWDBArrayBuffer[0] = WDBTool$Wonderjs.generateWDB((function (state) {
                                              var rootGameObject = SceneAPI$Wonderjs.getSceneGameObject(state);
                                              var state$1 = ExecIMGUITool$Wonderjs.addExecFuncData(state, undefined, undefined, undefined, undefined, /* () */0);
                                              var match = SkyboxTool$Wonderjs.prepareCubemapTextureAndSetAllSources(state$1);
                                              return /* tuple */[
                                                      match[0],
                                                      rootGameObject
                                                    ];
                                            }));
                                      return /* () */0;
                                    }));
                              return Wonder_jest.describe("\n            1.chunk1: header + json +  a part of first stream_chunk\n            2.chunk2: other stream chunk data\n            3.done\n            ", (function (param) {
                                            return Wonder_jest.describe("test 1,2,3", (function (param) {
                                                          var _prepare = function (sandbox, state) {
                                                            var readStub = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                                            var readStub$1 = Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(undefined, true, /* () */0), Sinon.onCall(2, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(imguiWDBArrayBuffer[0].slice(800)), undefined, /* () */0), Sinon.onCall(1, Sinon.returns(LoadStreamWDBTool$Wonderjs.buildChunkData(Caml_option.some(imguiWDBArrayBuffer[0].slice(0, 800)), undefined, /* () */0), Sinon.onCall(0, readStub))))));
                                                            return LoadStreamWDBTool$Wonderjs.prepareWithReadStub(sandbox, readStub$1, state);
                                                          };
                                                          return Wonder_jest.testPromise("should handle imgui", undefined, (function (param) {
                                                                        var sandbox$1 = sandbox;
                                                                        var hasExecFunc = true;
                                                                        var prepareFunc = _prepare;
                                                                        var state$1 = state;
                                                                        var state$2 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox$1, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), state$1[0]);
                                                                        var match = Curry._2(prepareFunc, sandbox$1, state$2);
                                                                        var rootGameObjectWhenDone = /* record */[/* contents */-1];
                                                                        var handleWhenDoneFunc = function (state, rootGameObject) {
                                                                          rootGameObjectWhenDone[0] = rootGameObject;
                                                                          return state;
                                                                        };
                                                                        return LoadStreamWDBTool$Wonderjs.read(/* tuple */[
                                                                                      match[0],
                                                                                      LoadStreamWDBTool$Wonderjs.buildController(sandbox$1),
                                                                                      match[2],
                                                                                      handleWhenDoneFunc
                                                                                    ], LoadStreamWDBTool$Wonderjs.buildReader(match[1])).then((function (param) {
                                                                                      var state = StateAPI$Wonderjs.unsafeGetState(/* () */0);
                                                                                      var state$1 = DirectorTool$Wonderjs.runWithDefaultTime(state);
                                                                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ExecIMGUITool$Wonderjs.hasExecFuncData(state$1)), hasExecFunc));
                                                                                    }));
                                                                      }));
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("if load error", (function (param) {
                              var _buildFakeFetchReturnResponse = function (ok, status, statusText) {
                                return Promise.resolve({
                                            ok: ok,
                                            status: status,
                                            statusText: statusText
                                          });
                              };
                              var _buildFakeFetch = function (sandbox, status, statusText) {
                                var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                Sinon.returns(_buildFakeFetchReturnResponse(false, status, statusText), Sinon.onCall(0, fetch));
                                return fetch;
                              };
                              beforeEach((function () {
                                      return GLBTool$Wonderjs.prepare(sandbox[0]);
                                    }));
                              return Wonder_jest.testPromise("throw error", undefined, (function (param) {
                                            var status = "aaa";
                                            var statusText = "bbb";
                                            var fetchFunc = _buildFakeFetch(sandbox, status, statusText);
                                            return PromiseTool$Wonderjs.judgeErrorMessage("" + (String(status) + (" " + (String(statusText) + ""))), LoadStreamWDBTool$Wonderjs.load(NodeTool$Wonderjs.buildWDBPath("BoxTextured"), fetchFunc, undefined, undefined, /* () */0));
                                          }));
                            }));
                      return Wonder_jest.describe("if not support stream load", (function (param) {
                                    var _buildFakeFetchReturnResponse = function (sandbox, contentLength, ok, arrayBuffer) {
                                      return Promise.resolve({
                                                  ok: true,
                                                  headers: {
                                                    get: Sinon.returns(contentLength, Sinon.withOneArg("content-length", Sinon.createEmptyStubWithJsObjSandbox(sandbox)))
                                                  },
                                                  arrayBuffer: (function (param) {
                                                      return Promise.resolve(arrayBuffer);
                                                    })
                                                });
                                    };
                                    var _buildFakeFetch = function (sandbox, contentLength, gltfJsonStr, binBuffer) {
                                      var fetch = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      Sinon.returns(_buildFakeFetchReturnResponse(sandbox, contentLength, true, ConvertGLBSystem$Wonderjs.convertGLBData(JSON.parse(gltfJsonStr), binBuffer)), Sinon.onCall(0, fetch));
                                      return fetch;
                                    };
                                    beforeEach((function () {
                                            GLBTool$Wonderjs.prepare(sandbox[0]);
                                            return /* () */0;
                                          }));
                                    Wonder_jest.testPromise("warn", undefined, (function (param) {
                                            var warnStub = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                                            var fetchFunc = _buildFakeFetch(sandbox, 0, ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), GLBTool$Wonderjs.buildBinBuffer(/* () */0));
                                            return LoadStreamWDBTool$Wonderjs.load(NodeTool$Wonderjs.buildWDBPath("BoxTextured"), fetchFunc, undefined, undefined, /* () */0).then((function (param) {
                                                          return Promise.resolve(Sinon.toCalledWith(/* array */["your browser does not seem to have the Streams API yet, fallback to load whole wdb"], Wonder_jest.Expect[/* expect */0](warnStub)));
                                                        }));
                                          }));
                                    Wonder_jest.testPromise("trigger handleWhenLoadingFunc", undefined, (function (param) {
                                            var totalLoadedByteLengthArr = /* array */[];
                                            var contentLengthArr = /* array */[];
                                            var wdbPathArr = /* array */[];
                                            var fetchFunc = _buildFakeFetch(sandbox, 1, ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), GLBTool$Wonderjs.buildBinBuffer(/* () */0));
                                            return LoadStreamWDBTool$Wonderjs.load(NodeTool$Wonderjs.buildWDBPath("BoxTextured"), fetchFunc, (function (totalLoadedByteLength, contentLength, wdbPath) {
                                                            ArrayService$Wonderjs.push(totalLoadedByteLength, totalLoadedByteLengthArr);
                                                            ArrayService$Wonderjs.push(contentLength, contentLengthArr);
                                                            ArrayService$Wonderjs.push(wdbPath, wdbPathArr);
                                                            return /* () */0;
                                                          }), undefined, /* () */0).then((function (param) {
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              totalLoadedByteLengthArr,
                                                                              contentLengthArr,
                                                                              wdbPathArr.length,
                                                                              ArrayService$Wonderjs.unsafeGetFirst(wdbPathArr).includes("BoxTextured.wdb")
                                                                            ]), /* tuple */[
                                                                          /* array */[25036],
                                                                          /* array */[1],
                                                                          1,
                                                                          true
                                                                        ]));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("fallback to load whole wdb", (function (param) {
                                                  return Wonder_jest.testPromise("load wdb and assemble", undefined, (function (param) {
                                                                var stateRef = /* record */[/* contents */-1];
                                                                var rootGameObjectRef = /* record */[/* contents */-1];
                                                                var fetchFunc = _buildFakeFetch(sandbox, 0, ConvertGLBTool$Wonderjs.buildGLTFJsonOfSingleNode(/* () */0), GLBTool$Wonderjs.buildBinBuffer(/* () */0));
                                                                return LoadStreamWDBTool$Wonderjs.load(NodeTool$Wonderjs.buildWDBPath("BoxTextured"), fetchFunc, undefined, (function (state, param, param$1) {
                                                                                stateRef[0] = state;
                                                                                rootGameObjectRef[0] = param$1[0];
                                                                                return /* () */0;
                                                                              }), /* () */0).then((function (param) {
                                                                              var rootGameObject = rootGameObjectRef[0];
                                                                              return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](AssembleWDBSystemTool$Wonderjs.getAllGameObjects(rootGameObject, stateRef[0])), /* array */[rootGameObject]));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
