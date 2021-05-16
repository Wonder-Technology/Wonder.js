

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as CloneTool$Wonderjs from "../../tool/core/CloneTool.js";
import * as ScriptAPI$Wonderjs from "../../../../../src/api/script/ScriptAPI.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as ScriptTool$Wonderjs from "../../../../tool/service/script/ScriptTool.js";
import * as GeometryAPI$Wonderjs from "../../../../../src/api/geometry/GeometryAPI.js";
import * as GeometryTool$Wonderjs from "../../../../tool/service/geometry/GeometryTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../src/api/GameObjectAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as PointLightAPI$Wonderjs from "../../../../../src/api/light/PointLightAPI.js";
import * as TransformTool$Wonderjs from "../../../../tool/service/transform/TransformTool.js";
import * as TypeArrayTool$Wonderjs from "../../../../tool/service/primitive/TypeArrayTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as PointLightTool$Wonderjs from "../../../../tool/service/light/PointLightTool.js";
import * as Vector3Service$Wonderjs from "../../../../../src/service/atom/Vector3Service.js";
import * as AllMaterialTool$Wonderjs from "../../../../tool/service/material/AllMaterialTool.js";
import * as MeshRendererAPI$Wonderjs from "../../../../../src/api/MeshRendererAPI.js";
import * as BasicMaterialAPI$Wonderjs from "../../../../../src/api/material/BasicMaterialAPI.js";
import * as LightMaterialAPI$Wonderjs from "../../../../../src/api/material/LightMaterialAPI.js";
import * as MeshRendererTool$Wonderjs from "../../../../tool/service/meshRenderer/MeshRendererTool.js";
import * as BasicMaterialTool$Wonderjs from "../../../../tool/service/material/BasicMaterialTool.js";
import * as DirectionLightAPI$Wonderjs from "../../../../../src/api/light/DirectionLightAPI.js";
import * as LightMaterialTool$Wonderjs from "../../../../tool/service/material/LightMaterialTool.js";
import * as BasicCameraViewAPI$Wonderjs from "../../../../../src/api/camera/BasicCameraViewAPI.js";
import * as DirectionLightTool$Wonderjs from "../../../../tool/service/light/DirectionLightTool.js";
import * as ObjectInstanceTool$Wonderjs from "../../../../tool/service/instance/ObjectInstanceTool.js";
import * as SourceInstanceTool$Wonderjs from "../../../../tool/service/instance/SourceInstanceTool.js";
import * as FlyCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/FlyCameraControllerAPI.js";
import * as FlyCameraControllerTool$Wonderjs from "../../../../tool/service/camera_controller/FlyCameraControllerTool.js";
import * as ArcballCameraControllerAPI$Wonderjs from "../../../../../src/api/camera_controller/ArcballCameraControllerAPI.js";
import * as ArcballCameraControllerTool$Wonderjs from "../../../../tool/service/camera_controller/ArcballCameraControllerTool.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as RecordBasicMaterialMainService$Wonderjs from "../../../../../src/service/state/main/material/basic/RecordBasicMaterialMainService.js";
import * as PerspectiveCameraProjectionTool$Wonderjs from "../../../../tool/service/camera/PerspectiveCameraProjectionTool.js";

Wonder_jest.describe("clone gameObject", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        var _cloneGameObject = function (gameObject, count, state) {
          return CloneTool$Wonderjs.cloneGameObject(gameObject, count, false, state);
        };
        var _cloneAndGetClonedTransformMatrixDataArr = function (gameObject, count, state) {
          var match = _cloneGameObject(gameObject, count, state);
          var clonedGameObjectArr = match[1];
          var state$1 = match[0];
          return /* tuple */[
                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(clonedGameObject, state$1);
                        }))
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("clone gameObject", (function (param) {
                Wonder_jest.test("cloned gameObjects are new gameObjects", (function (param) {
                        var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                        var match$1 = _cloneGameObject(match[1], 2, match[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1]), /* array */[/* array */[
                                      2,
                                      3
                                    ]]);
                      }));
                Wonder_jest.test("test name", (function (param) {
                        var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                        var gameObject1 = match[1];
                        var name = "name1";
                        var state$1 = GameObjectAPI$Wonderjs.setGameObjectName(gameObject1, name, match[0]);
                        var match$1 = _cloneGameObject(gameObject1, 2, state$1);
                        var state$2 = match$1[0];
                        var clonedGameObjectArr = CloneTool$Wonderjs.getFlattenClonedGameObjectArr(match$1[1]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        GameObjectAPI$Wonderjs.unsafeGetGameObjectName(Caml_array.caml_array_get(clonedGameObjectArr, 0), state$2),
                                        GameObjectAPI$Wonderjs.unsafeGetGameObjectName(Caml_array.caml_array_get(clonedGameObjectArr, 1), state$2)
                                      ]), /* tuple */[
                                    name,
                                    name
                                  ]);
                      }));
                return Wonder_jest.test("test isRoot", (function (param) {
                              var match = GameObjectAPI$Wonderjs.createGameObject(state[0]);
                              var gameObject1 = match[1];
                              var state$1 = GameObjectAPI$Wonderjs.setGameObjectIsRoot(gameObject1, true, match[0]);
                              var match$1 = _cloneGameObject(gameObject1, 2, state$1);
                              var state$2 = match$1[0];
                              var clonedGameObjectArr = CloneTool$Wonderjs.getFlattenClonedGameObjectArr(match$1[1]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              GameObjectAPI$Wonderjs.unsafeGetGameObjectIsRoot(Caml_array.caml_array_get(clonedGameObjectArr, 0), state$2),
                                              GameObjectAPI$Wonderjs.unsafeGetGameObjectIsRoot(Caml_array.caml_array_get(clonedGameObjectArr, 1), state$2)
                                            ]), /* tuple */[
                                          true,
                                          true
                                        ]);
                            }));
              }));
        Wonder_jest.describe("clone components", (function (param) {
                Wonder_jest.describe("contract check", (function (param) {
                        Wonder_jest.test("shouldn't clone sourceInstance gameObject", (function (param) {
                                var match = SourceInstanceTool$Wonderjs.createSourceInstanceGameObject(state[0]);
                                var gameObject = match[1];
                                var state$1 = match[0];
                                return Wonder_jest.Expect[/* toThrowMessage */21]("expect not clone sourceInstance gameObject, but actual do", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                  _cloneGameObject(gameObject, 2, state$1);
                                                  return /* () */0;
                                                })));
                              }));
                        return Wonder_jest.test("shouldn't clone objectInstance gameObject", (function (param) {
                                      var match = ObjectInstanceTool$Wonderjs.createObjectInstanceGameObject(state[0]);
                                      var objectInstanceGameObject = match[3];
                                      var state$1 = match[0];
                                      return Wonder_jest.Expect[/* toThrowMessage */21]("expect not clone objectInstance gameObject, but actual do", Wonder_jest.Expect[/* expect */0]((function (param) {
                                                        _cloneGameObject(objectInstanceGameObject, 2, state$1);
                                                        return /* () */0;
                                                      })));
                                    }));
                      }));
                Wonder_jest.describe("test clone meshRenderer component", (function (param) {
                        Wonder_jest.test("test clone specific count", (function (param) {
                                var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                var match$1 = _cloneGameObject(match[1], 2, match[0]);
                                var state$1 = match$1[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CloneTool$Wonderjs.getFlattenClonedGameObjectArr(match$1[1]).map((function (clonedGameObject) {
                                                      return GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(clonedGameObject, state$1);
                                                    })).length), 2);
                              }));
                        Wonder_jest.test("add cloned gameObject to renderGameObjectArray", (function (param) {
                                var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                var gameObject1 = match[1];
                                var match$1 = _cloneGameObject(gameObject1, 2, match[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererTool$Wonderjs.getBasicMaterialRenderGameObjectArray(match$1[0])), /* array */[gameObject1].concat(CloneTool$Wonderjs.getFlattenClonedGameObjectArr(match$1[1])));
                              }));
                        Wonder_jest.describe("cloned one' data === source one's data", (function (param) {
                                var _cloneGameObject = function (gameObject, count, state) {
                                  return CloneTool$Wonderjs.cloneGameObject(gameObject, count, false, state);
                                };
                                var _prepare = function (param) {
                                  var match = MeshRendererTool$Wonderjs.createLightMaterialGameObject(state[0]);
                                  return /* tuple */[
                                          match[0],
                                          match[1],
                                          match[2]
                                        ];
                                };
                                var _clone = function (gameObject, state) {
                                  var match = _cloneGameObject(gameObject, 2, state);
                                  var clonedGameObjectArr = match[1];
                                  var state$1 = match[0];
                                  return /* tuple */[
                                          state$1,
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(clonedGameObject, state$1);
                                                }))
                                        ];
                                };
                                Wonder_jest.test("test drawMode", (function (param) {
                                        var match = _prepare(/* () */0);
                                        var meshRenderer = match[2];
                                        var drawMode = MeshRendererTool$Wonderjs.getPoints(/* () */0);
                                        var state = MeshRendererAPI$Wonderjs.setMeshRendererDrawMode(meshRenderer, drawMode, match[0]);
                                        var match$1 = _clone(match[1], state);
                                        var clonedMeshRendererArr = match$1[2];
                                        var state$1 = match$1[0];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(meshRenderer, state$1),
                                                        MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(Caml_array.caml_array_get(clonedMeshRendererArr, 0), state$1),
                                                        MeshRendererAPI$Wonderjs.getMeshRendererDrawMode(Caml_array.caml_array_get(clonedMeshRendererArr, 1), state$1)
                                                      ]), /* tuple */[
                                                    drawMode,
                                                    drawMode,
                                                    drawMode
                                                  ]);
                                      }));
                                return Wonder_jest.test("set isRender to true", (function (param) {
                                              var match = _prepare(/* () */0);
                                              var meshRenderer = match[2];
                                              var state = MeshRendererAPI$Wonderjs.setMeshRendererIsRender(meshRenderer, false, match[0]);
                                              var match$1 = _clone(match[1], state);
                                              var clonedMeshRendererArr = match$1[2];
                                              var state$1 = match$1[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              MeshRendererAPI$Wonderjs.getMeshRendererIsRender(meshRenderer, state$1),
                                                              MeshRendererAPI$Wonderjs.getMeshRendererIsRender(Caml_array.caml_array_get(clonedMeshRendererArr, 0), state$1),
                                                              MeshRendererAPI$Wonderjs.getMeshRendererIsRender(Caml_array.caml_array_get(clonedMeshRendererArr, 1), state$1)
                                                            ]), /* tuple */[
                                                          false,
                                                          true,
                                                          true
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.describe("fix bug", (function (param) {
                                      return Wonder_jest.test("test clone hierachy gameObjects", (function (param) {
                                                    var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state[0]);
                                                    var gameObject1 = match[1];
                                                    var match$1 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match[0]);
                                                    var gameObject2 = match$1[1];
                                                    var match$2 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match$1[0]);
                                                    var match$3 = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(match$2[0]);
                                                    var state$1 = GameObjectTool$Wonderjs.addChild(gameObject1, match$3[1], GameObjectTool$Wonderjs.addChild(gameObject2, match$2[1], GameObjectTool$Wonderjs.addChild(gameObject1, gameObject2, match$3[0])));
                                                    var match$4 = CloneTool$Wonderjs.cloneGameObject(gameObject1, 1, true, state$1);
                                                    var clonedGameObjectArr = match$4[1];
                                                    var state$2 = match$4[0];
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                    CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                                                    CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                                            return GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(clonedGameObject, state$2);
                                                                          }))
                                                                  ]), /* tuple */[
                                                                /* array */[
                                                                  5,
                                                                  6,
                                                                  7,
                                                                  8
                                                                ],
                                                                /* array */[
                                                                  4,
                                                                  5,
                                                                  6,
                                                                  7
                                                                ]
                                                              ]);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test clone script component", (function (param) {
                        var _clone = function (gameObject, state, $staropt$star, param) {
                          var count = $staropt$star !== undefined ? $staropt$star : 2;
                          var match = _cloneGameObject(gameObject, count, state);
                          var clonedGameObjectArr = match[1];
                          var state$1 = match[0];
                          return /* tuple */[
                                  state$1,
                                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectScriptComponent(clonedGameObject, state$1);
                                        }))
                                ];
                        };
                        Wonder_jest.test("create new script component", (function (param) {
                                var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                var script1 = match[2];
                                var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match[0], undefined, undefined, undefined, /* () */0);
                                var match$1 = _clone(match[1], state$1, undefined, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[2]), /* array */[
                                            script1 + 1 | 0,
                                            script1 + 2 | 0
                                          ]);
                              }));
                        Wonder_jest.test("if source one has no scriptAllEventFunctionData, cloned one also has no", (function (param) {
                                var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                var match$1 = _clone(match[1], match[0], 1, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptTool$Wonderjs.hasScriptAllEventFunctionData(Caml_array.caml_array_get(match$1[2], 0), match$1[0])), false);
                              }));
                        Wonder_jest.test("if source one has no scriptAllAttributes, cloned one also has no", (function (param) {
                                var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                var match$1 = _clone(match[1], match[0], 1, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptTool$Wonderjs.hasScriptAllAttributes(Caml_array.caml_array_get(match$1[2], 0), match$1[0])), false);
                              }));
                        Wonder_jest.test("cloned gameObject should has script component", (function (param) {
                                var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                var match$1 = _clone(match[1], match[0], 1, /* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectAPI$Wonderjs.hasGameObjectScriptComponent(Caml_array.caml_array_get(match$1[1], 0), match$1[0])), true);
                              }));
                        Wonder_jest.test("cloned gameObject->script component should has script event function", (function (param) {
                                var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                var script1 = match[2];
                                var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match[0], undefined, undefined, undefined, /* () */0);
                                var allEventFunctionData = ScriptTool$Wonderjs.unsafeGetScriptAllEventFunctionData(script1, state$1);
                                var match$1 = _clone(match[1], state$1, 1, /* () */0);
                                var state$2 = match$1[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptTool$Wonderjs.unsafeGetScriptAllEventFunctionData(GameObjectAPI$Wonderjs.unsafeGetGameObjectScriptComponent(Caml_array.caml_array_get(match$1[1], 0), state$2), state$2)), allEventFunctionData);
                              }));
                        Wonder_jest.test("cloned gameObject->script component should has script attribute", (function (param) {
                                var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](match[2], match[0], undefined, undefined, undefined, /* () */0);
                                var match$1 = _clone(match[1], state$1, 1, /* () */0);
                                var state$2 = match$1[0];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptTool$Wonderjs.hasScriptAllAttributes(GameObjectAPI$Wonderjs.unsafeGetGameObjectScriptComponent(Caml_array.caml_array_get(match$1[1], 0), state$2), state$2)), true);
                              }));
                        Wonder_jest.describe("test cloned one' data === source one's data", (function (param) {
                                Wonder_jest.test("cloned gameObject->script component should set isActive", (function (param) {
                                        var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                        var script1 = match[2];
                                        var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match[0], undefined, undefined, undefined, /* () */0);
                                        var state$2 = ScriptAPI$Wonderjs.setScriptIsActive(script1, false, state$1);
                                        var match$1 = _clone(match[1], state$2, undefined, /* () */0);
                                        var clonedComponentArr = match$1[2];
                                        var state$3 = match$1[0];
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        ScriptAPI$Wonderjs.unsafeGetScriptIsActive(Caml_array.caml_array_get(clonedComponentArr, 0), state$3),
                                                        ScriptAPI$Wonderjs.unsafeGetScriptIsActive(Caml_array.caml_array_get(clonedComponentArr, 1), state$3)
                                                      ]), /* tuple */[
                                                    false,
                                                    false
                                                  ]);
                                      }));
                                return Wonder_jest.test("test scriptAllEventFunctionData", (function (param) {
                                              var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                              var script1 = match[2];
                                              var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match[0], undefined, undefined, undefined, /* () */0);
                                              var allEventFunctionData = ScriptTool$Wonderjs.unsafeGetScriptAllEventFunctionData(script1, state$1);
                                              var match$1 = _clone(match[1], state$1, undefined, /* () */0);
                                              var clonedComponentArr = match$1[2];
                                              var state$2 = match$1[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              ScriptTool$Wonderjs.unsafeGetScriptAllEventFunctionData(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                              ScriptTool$Wonderjs.unsafeGetScriptAllEventFunctionData(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                            ]), /* tuple */[
                                                          allEventFunctionData,
                                                          allEventFunctionData
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.describe("test cloned one' data !== source one's data", (function (param) {
                                return Wonder_jest.test("reset scriptAllAttributes->value to defaultValue", (function (param) {
                                              var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                              var script1 = match[2];
                                              var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match[0], undefined, undefined, undefined, /* () */0);
                                              var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* setScriptAttributeFieldAValue */19](script1, 3, state$1);
                                              var match$1 = _clone(match[1], state$2, undefined, /* () */0);
                                              var clonedComponentArr = match$1[2];
                                              var state$3 = match$1[0];
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                              ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValue */12](Caml_array.caml_array_get(clonedComponentArr, 0), state$3),
                                                              ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValue */12](Caml_array.caml_array_get(clonedComponentArr, 1), state$3)
                                                            ]), /* tuple */[
                                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldADefaultValue */1](/* () */0),
                                                          ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldADefaultValue */1](/* () */0)
                                                        ]);
                                            }));
                              }));
                        return Wonder_jest.describe("change cloned one's attribute shouldn't affect source one's attribute", (function (param) {
                                      return Wonder_jest.test("test change int attribute field", (function (param) {
                                                    var match = ScriptTool$Wonderjs.createGameObject(state[0]);
                                                    var script1 = match[2];
                                                    var state$1 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* buildScriptData */11](script1, match[0], undefined, undefined, undefined, /* () */0);
                                                    var match$1 = _clone(match[1], state$1, undefined, /* () */0);
                                                    var state$2 = ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* setScriptAttributeFieldAValue */19](Caml_array.caml_array_get(match$1[2], 0), 3, match$1[0]);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldAValue */12](script1, state$2)), ScriptTool$Wonderjs.TestCaseWithOneEventFuncAndOneAttribute[/* getAttributeFieldADefaultValue */1](/* () */0));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test clone light component", (function (param) {
                        Wonder_jest.describe("test clone direction light component", (function (param) {
                                var _clone = function (gameObject, state) {
                                  var match = _cloneGameObject(gameObject, 2, state);
                                  var clonedGameObjectArr = match[1];
                                  var state$1 = match[0];
                                  return /* tuple */[
                                          state$1,
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectDirectionLightComponent(clonedGameObject, state$1);
                                                }))
                                        ];
                                };
                                Wonder_jest.test("test clone specific count", (function (param) {
                                        var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                        var match$1 = _clone(match[1], match[0]);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[2].length), 2);
                                      }));
                                return Wonder_jest.describe("set cloned record", (function (param) {
                                              Wonder_jest.test("set color", (function (param) {
                                                      var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                                      var color1 = /* array */[
                                                        1,
                                                        0,
                                                        1
                                                      ];
                                                      var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightColor(match[2], color1, match[0]);
                                                      var match$1 = _clone(match[1], state$1);
                                                      var clonedComponentArr = match$1[2];
                                                      var state$2 = match$1[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      DirectionLightAPI$Wonderjs.getDirectionLightColor(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                      DirectionLightAPI$Wonderjs.getDirectionLightColor(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                    ]), /* tuple */[
                                                                  color1,
                                                                  color1
                                                                ]);
                                                    }));
                                              Wonder_jest.test("set intensity", (function (param) {
                                                      var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                                      var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIntensity(match[2], 2, match[0]);
                                                      var match$1 = _clone(match[1], state$1);
                                                      var clonedComponentArr = match$1[2];
                                                      var state$2 = match$1[0];
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      DirectionLightAPI$Wonderjs.getDirectionLightIntensity(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                      DirectionLightAPI$Wonderjs.getDirectionLightIntensity(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                    ]), /* tuple */[
                                                                  2,
                                                                  2
                                                                ]);
                                                    }));
                                              return Wonder_jest.test("set isRender to true", (function (param) {
                                                            var match = DirectionLightTool$Wonderjs.createGameObject(state[0]);
                                                            var state$1 = DirectionLightAPI$Wonderjs.setDirectionLightIsRender(match[2], false, match[0]);
                                                            var match$1 = _clone(match[1], state$1);
                                                            var clonedComponentArr = match$1[2];
                                                            var state$2 = match$1[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            DirectionLightAPI$Wonderjs.getDirectionLightIsRender(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                            DirectionLightAPI$Wonderjs.getDirectionLightIsRender(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                          ]), /* tuple */[
                                                                        true,
                                                                        true
                                                                      ]);
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.describe("test clone point light component", (function (param) {
                                      var _clone = function (gameObject, state) {
                                        var match = _cloneGameObject(gameObject, 2, state);
                                        var clonedGameObjectArr = match[1];
                                        var state$1 = match[0];
                                        return /* tuple */[
                                                state$1,
                                                CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                                CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                        return GameObjectAPI$Wonderjs.unsafeGetGameObjectPointLightComponent(clonedGameObject, state$1);
                                                      }))
                                              ];
                                      };
                                      Wonder_jest.test("test clone specific count", (function (param) {
                                              var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                              var match$1 = _clone(match[1], match[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[2].length), 2);
                                            }));
                                      return Wonder_jest.describe("set cloned record", (function (param) {
                                                    Wonder_jest.test("set color", (function (param) {
                                                            var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                            var color1 = /* array */[
                                                              1,
                                                              0,
                                                              1
                                                            ];
                                                            var state$1 = PointLightAPI$Wonderjs.setPointLightColor(match[2], color1, match[0]);
                                                            var match$1 = _clone(match[1], state$1);
                                                            var clonedComponentArr = match$1[2];
                                                            var state$2 = match$1[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            PointLightAPI$Wonderjs.getPointLightColor(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                            PointLightAPI$Wonderjs.getPointLightColor(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                          ]), /* tuple */[
                                                                        color1,
                                                                        color1
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("set intensity", (function (param) {
                                                            var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                            var state$1 = PointLightAPI$Wonderjs.setPointLightIntensity(match[2], 2, match[0]);
                                                            var match$1 = _clone(match[1], state$1);
                                                            var clonedComponentArr = match$1[2];
                                                            var state$2 = match$1[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            PointLightAPI$Wonderjs.getPointLightIntensity(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                            PointLightAPI$Wonderjs.getPointLightIntensity(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                          ]), /* tuple */[
                                                                        2,
                                                                        2
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("set constant", (function (param) {
                                                            var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                            var state$1 = PointLightAPI$Wonderjs.setPointLightConstant(match[2], 2, match[0]);
                                                            var match$1 = _clone(match[1], state$1);
                                                            var clonedComponentArr = match$1[2];
                                                            var state$2 = match$1[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            PointLightAPI$Wonderjs.getPointLightConstant(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                            PointLightAPI$Wonderjs.getPointLightConstant(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                          ]), /* tuple */[
                                                                        2,
                                                                        2
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("set linear", (function (param) {
                                                            var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                            var state$1 = PointLightAPI$Wonderjs.setPointLightLinear(match[2], 2, match[0]);
                                                            var match$1 = _clone(match[1], state$1);
                                                            var clonedComponentArr = match$1[2];
                                                            var state$2 = match$1[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            PointLightAPI$Wonderjs.getPointLightLinear(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                            PointLightAPI$Wonderjs.getPointLightLinear(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                          ]), /* tuple */[
                                                                        2,
                                                                        2
                                                                      ]);
                                                          }));
                                                    Wonder_jest.test("set quadratic", (function (param) {
                                                            var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                            var state$1 = PointLightAPI$Wonderjs.setPointLightQuadratic(match[2], 2, match[0]);
                                                            var match$1 = _clone(match[1], state$1);
                                                            var clonedComponentArr = match$1[2];
                                                            var state$2 = match$1[0];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            PointLightAPI$Wonderjs.getPointLightQuadratic(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                            PointLightAPI$Wonderjs.getPointLightQuadratic(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                          ]), /* tuple */[
                                                                        2,
                                                                        2
                                                                      ]);
                                                          }));
                                                    return Wonder_jest.test("set range", (function (param) {
                                                                  var match = PointLightTool$Wonderjs.createGameObject(state[0]);
                                                                  var state$1 = PointLightAPI$Wonderjs.setPointLightRange(match[2], 2, match[0]);
                                                                  var match$1 = _clone(match[1], state$1);
                                                                  var clonedComponentArr = match$1[2];
                                                                  var state$2 = match$1[0];
                                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                  PointLightAPI$Wonderjs.getPointLightRange(Caml_array.caml_array_get(clonedComponentArr, 0), state$2),
                                                                                  PointLightAPI$Wonderjs.getPointLightRange(Caml_array.caml_array_get(clonedComponentArr, 1), state$2)
                                                                                ]), /* tuple */[
                                                                              2,
                                                                              2
                                                                            ]);
                                                                }));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test clone geometry component", (function (param) {
                        var _createAndInitGameObject = function (state) {
                          var match = GeometryTool$Wonderjs.createGameObject(state);
                          var gameObject1 = match[1];
                          var state$1 = GameObjectAPI$Wonderjs.initGameObject(gameObject1, match[0]);
                          return /* tuple */[
                                  state$1,
                                  gameObject1,
                                  match[2]
                                ];
                        };
                        var _prepare = function (state) {
                          var match = _createAndInitGameObject(state);
                          return CloneTool$Wonderjs.cloneWithGeometry(match[0], match[1], match[2], 2);
                        };
                        Wonder_jest.test("test clone specific count of geometrys", (function (param) {
                                var match = _prepare(state[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                              }));
                        Wonder_jest.test("cloned one == source one", (function (param) {
                                var match = _prepare(state[0]);
                                var geometry = match[2];
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                            geometry,
                                            geometry
                                          ]);
                              }));
                        Wonder_jest.test("cloned one's gameObjects should be gameObjects who add the geometry", (function (param) {
                                var match = _prepare(state[0]);
                                var clonedGeometryArr = match[4];
                                var state$1 = match[0];
                                var result = /* array */[match[1]].concat(match[3]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(Caml_array.caml_array_get(clonedGeometryArr, 0), state$1),
                                                GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects(Caml_array.caml_array_get(clonedGeometryArr, 1), state$1)
                                              ]), /* tuple */[
                                            result,
                                            result
                                          ]);
                              }));
                        return Wonder_jest.test("test name", (function (param) {
                                      var match = GeometryTool$Wonderjs.createGameObject(state[0]);
                                      var geometry1 = match[2];
                                      var name = "name1";
                                      var state$1 = GeometryAPI$Wonderjs.setGeometryName(geometry1, name, match[0]);
                                      var match$1 = CloneTool$Wonderjs.cloneWithGeometry(state$1, match[1], geometry1, 2);
                                      var clonedGeometryArr = match$1[4];
                                      var state$2 = match$1[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      GeometryAPI$Wonderjs.unsafeGetGeometryName(Caml_array.caml_array_get(clonedGeometryArr, 0), state$2),
                                                      GeometryAPI$Wonderjs.unsafeGetGeometryName(Caml_array.caml_array_get(clonedGeometryArr, 1), state$2)
                                                    ]), /* tuple */[
                                                  name,
                                                  name
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("test clone material component", (function (param) {
                        Wonder_jest.describe("test clone basic material component", (function (param) {
                                var _cloneGameObject = function (gameObject, isShareMaterial, count, state) {
                                  return CloneTool$Wonderjs.cloneGameObject(gameObject, count, isShareMaterial, state);
                                };
                                var _prepare = function (isShareMaterial, state) {
                                  var match = BasicMaterialTool$Wonderjs.createGameObject(state);
                                  var material1 = match[2];
                                  var gameObject1 = match[1];
                                  var state$1 = BasicMaterialTool$Wonderjs.setShaderIndex(material1, 1, match[0]);
                                  var match$1 = _cloneGameObject(gameObject1, isShareMaterial, 2, state$1);
                                  var clonedGameObjectArr = match$1[1];
                                  var state$2 = match$1[0];
                                  return /* tuple */[
                                          state$2,
                                          gameObject1,
                                          material1,
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                          CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state$2);
                                                }))
                                        ];
                                };
                                Wonder_jest.describe("test clone shared material", (function (param) {
                                        Wonder_jest.test("cloned one== source one", (function (param) {
                                                var match = _prepare(true, state[0]);
                                                var material = match[2];
                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                            material,
                                                            material
                                                          ]);
                                              }));
                                        return Wonder_jest.test("cloned one's gameObjects should be gameObjects who add the material", (function (param) {
                                                      var match = _prepare(true, state[0]);
                                                      var clonedBasicMaterialArr = match[4];
                                                      var state$1 = match[0];
                                                      var result = /* array */[match[1]].concat(match[3]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects(Caml_array.caml_array_get(clonedBasicMaterialArr, 0), state$1),
                                                                      BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects(Caml_array.caml_array_get(clonedBasicMaterialArr, 1), state$1)
                                                                    ]), /* tuple */[
                                                                  result,
                                                                  result
                                                                ]);
                                                    }));
                                      }));
                                return Wonder_jest.describe("test clone not shared material", (function (param) {
                                              Wonder_jest.test("cloned ones are new created ones", (function (param) {
                                                      var match = _prepare(false, state[0]);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                                  1,
                                                                  2
                                                                ]);
                                                    }));
                                              Wonder_jest.test("cloned one's gameObject should be the cloned gameObject", (function (param) {
                                                      var match = _prepare(false, state[0]);
                                                      var clonedBasicMaterialArr = match[4];
                                                      var clonedGameObjectArr = match[3];
                                                      var state$1 = match[0];
                                                      /* array */[match[1]].concat(clonedGameObjectArr);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects(Caml_array.caml_array_get(clonedBasicMaterialArr, 0), state$1),
                                                                      BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialGameObjects(Caml_array.caml_array_get(clonedBasicMaterialArr, 1), state$1)
                                                                    ]), /* tuple */[
                                                                  /* array */[Caml_array.caml_array_get(clonedGameObjectArr, 0)],
                                                                  /* array */[Caml_array.caml_array_get(clonedGameObjectArr, 1)]
                                                                ]);
                                                    }));
                                              Wonder_jest.describe("cloned one' data === source one's data", (function (param) {
                                                      var _prepare = function (param) {
                                                        var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                                        return /* tuple */[
                                                                match[0],
                                                                match[1],
                                                                match[2]
                                                              ];
                                                      };
                                                      var _clone = function (gameObject, state) {
                                                        var match = _cloneGameObject(gameObject, false, 2, state);
                                                        var clonedGameObjectArr = match[1];
                                                        var state$1 = match[0];
                                                        return /* tuple */[
                                                                state$1,
                                                                CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                                                CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                                        return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicMaterialComponent(clonedGameObject, state$1);
                                                                      }))
                                                              ];
                                                      };
                                                      Wonder_jest.test("test name", (function (param) {
                                                              var match = _prepare(/* () */0);
                                                              var name = "name1";
                                                              var state = BasicMaterialAPI$Wonderjs.setBasicMaterialName(match[2], name, match[0]);
                                                              var match$1 = _clone(match[1], state);
                                                              var clonedMaterialArr = match$1[2];
                                                              var state$1 = match$1[0];
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName(Caml_array.caml_array_get(clonedMaterialArr, 0), state$1),
                                                                              BasicMaterialAPI$Wonderjs.unsafeGetBasicMaterialName(Caml_array.caml_array_get(clonedMaterialArr, 1), state$1)
                                                                            ]), /* tuple */[
                                                                          name,
                                                                          name
                                                                        ]);
                                                            }));
                                                      Wonder_jest.test("test color", (function (param) {
                                                              var match = _prepare(/* () */0);
                                                              var material = match[2];
                                                              var color = /* array */[
                                                                1,
                                                                0.2,
                                                                0.3
                                                              ];
                                                              var state = BasicMaterialAPI$Wonderjs.setBasicMaterialColor(material, color, match[0]);
                                                              var match$1 = _clone(match[1], state);
                                                              var clonedMaterialArr = match$1[2];
                                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                              var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(material, state$2)),
                                                                              TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2)),
                                                                              TypeArrayTool$Wonderjs.truncateArray(BasicMaterialAPI$Wonderjs.getBasicMaterialColor(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2))
                                                                            ]), /* tuple */[
                                                                          color,
                                                                          color,
                                                                          color
                                                                        ]);
                                                            }));
                                                      Wonder_jest.test("test isDepthTest", (function (param) {
                                                              var match = _prepare(/* () */0);
                                                              var material = match[2];
                                                              var state = BasicMaterialAPI$Wonderjs.setBasicMaterialIsDepthTest(material, false, match[0]);
                                                              var match$1 = _clone(match[1], state);
                                                              var clonedMaterialArr = match$1[2];
                                                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                              var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              BasicMaterialAPI$Wonderjs.getBasicMaterialIsDepthTest(material, state$2),
                                                                              BasicMaterialAPI$Wonderjs.getBasicMaterialIsDepthTest(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2),
                                                                              BasicMaterialAPI$Wonderjs.getBasicMaterialIsDepthTest(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2)
                                                                            ]), /* tuple */[
                                                                          false,
                                                                          false,
                                                                          false
                                                                        ]);
                                                            }));
                                                      return Wonder_jest.test("test alpha", (function (param) {
                                                                    var match = _prepare(/* () */0);
                                                                    var material = match[2];
                                                                    var state = BasicMaterialAPI$Wonderjs.setBasicMaterialAlpha(material, 0.5, match[0]);
                                                                    var match$1 = _clone(match[1], state);
                                                                    var clonedMaterialArr = match$1[2];
                                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                                    var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    BasicMaterialAPI$Wonderjs.getBasicMaterialAlpha(material, state$2),
                                                                                    BasicMaterialAPI$Wonderjs.getBasicMaterialAlpha(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2),
                                                                                    BasicMaterialAPI$Wonderjs.getBasicMaterialAlpha(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2)
                                                                                  ]), /* tuple */[
                                                                                0.5,
                                                                                0.5,
                                                                                0.5
                                                                              ]);
                                                                  }));
                                                    }));
                                              Wonder_jest.describe("test init cloned material", (function (param) {
                                                      return Wonder_jest.test("can correctly set cloned one's shader index", (function (param) {
                                                                    var match = _prepare(false, state[0]);
                                                                    var clonedMaterialArr = match[4];
                                                                    var clonedGameObjectArr = match[3];
                                                                    var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                                    var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                                    var state$3 = GameObjectAPI$Wonderjs.initGameObject(Caml_array.caml_array_get(clonedGameObjectArr, 1), GameObjectAPI$Wonderjs.initGameObject(Caml_array.caml_array_get(clonedGameObjectArr, 0), state$2));
                                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    BasicMaterialTool$Wonderjs.getShaderIndex(Caml_array.caml_array_get(clonedMaterialArr, 0), state$3),
                                                                                    BasicMaterialTool$Wonderjs.getShaderIndex(Caml_array.caml_array_get(clonedMaterialArr, 1), state$3)
                                                                                  ]), /* tuple */[
                                                                                1,
                                                                                1
                                                                              ]);
                                                                  }));
                                                    }));
                                              return Wonder_jest.describe("fix bug", (function (param) {
                                                            return Wonder_jest.test("basicMaterialRecord.index should be correct after clone", (function (param) {
                                                                          var match = BasicMaterialTool$Wonderjs.createGameObject(state[0]);
                                                                          var match$1 = _cloneGameObject(match[1], false, 2, match[0]);
                                                                          var match$2 = RecordBasicMaterialMainService$Wonderjs.getRecord(match$1[0]);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* == */0], Wonder_jest.Expect[/* expect */0](match$2[/* index */0]), 3);
                                                                        }));
                                                          }));
                                            }));
                              }));
                        return Wonder_jest.describe("test clone light material component", (function (param) {
                                      var _cloneGameObject = function (gameObject, isShareMaterial, count, state) {
                                        return CloneTool$Wonderjs.cloneGameObject(gameObject, count, isShareMaterial, state);
                                      };
                                      var _prepare = function (isShareMaterial) {
                                        var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                        var material1 = match[2];
                                        var gameObject1 = match[1];
                                        var state$1 = LightMaterialTool$Wonderjs.setShaderIndex(material1, 1, match[0]);
                                        var match$1 = _cloneGameObject(gameObject1, isShareMaterial, 2, state$1);
                                        var clonedGameObjectArr = match$1[1];
                                        var state$2 = match$1[0];
                                        return /* tuple */[
                                                state$2,
                                                gameObject1,
                                                material1,
                                                CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                                CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                        return GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(clonedGameObject, state$2);
                                                      }))
                                              ];
                                      };
                                      Wonder_jest.describe("test clone shared material", (function (param) {
                                              return Wonder_jest.test("cloned one === source one", (function (param) {
                                                            var match = _prepare(true);
                                                            var material = match[2];
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                                        material,
                                                                        material
                                                                      ]);
                                                          }));
                                            }));
                                      return Wonder_jest.describe("test clone not shared material", (function (param) {
                                                    Wonder_jest.test("cloned ones are new created ones", (function (param) {
                                                            var match = _prepare(false);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4]), /* array */[
                                                                        1,
                                                                        2
                                                                      ]);
                                                          }));
                                                    return Wonder_jest.describe("cloned one' data === source one's data", (function (param) {
                                                                  var _prepare = function (param) {
                                                                    var match = LightMaterialTool$Wonderjs.createGameObject(state[0]);
                                                                    return /* tuple */[
                                                                            match[0],
                                                                            match[1],
                                                                            match[2]
                                                                          ];
                                                                  };
                                                                  var _clone = function (gameObject, state) {
                                                                    var match = _cloneGameObject(gameObject, false, 2, state);
                                                                    var clonedGameObjectArr = match[1];
                                                                    var state$1 = match[0];
                                                                    return /* tuple */[
                                                                            state$1,
                                                                            CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr),
                                                                            CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                                                    return GameObjectAPI$Wonderjs.unsafeGetGameObjectLightMaterialComponent(clonedGameObject, state$1);
                                                                                  }))
                                                                          ];
                                                                  };
                                                                  Wonder_jest.test("test name", (function (param) {
                                                                          var match = _prepare(/* () */0);
                                                                          var name = "name1";
                                                                          var state = LightMaterialAPI$Wonderjs.setLightMaterialName(match[2], name, match[0]);
                                                                          var match$1 = _clone(match[1], state);
                                                                          var clonedMaterialArr = match$1[2];
                                                                          var state$1 = match$1[0];
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                          LightMaterialAPI$Wonderjs.unsafeGetLightMaterialName(Caml_array.caml_array_get(clonedMaterialArr, 0), state$1),
                                                                                          LightMaterialAPI$Wonderjs.unsafeGetLightMaterialName(Caml_array.caml_array_get(clonedMaterialArr, 1), state$1)
                                                                                        ]), /* tuple */[
                                                                                      name,
                                                                                      name
                                                                                    ]);
                                                                        }));
                                                                  Wonder_jest.test("test diffuse color", (function (param) {
                                                                          var match = _prepare(/* () */0);
                                                                          var color = /* array */[
                                                                            1,
                                                                            0.2,
                                                                            0.3
                                                                          ];
                                                                          var state = LightMaterialAPI$Wonderjs.setLightMaterialDiffuseColor(match[2], color, match[0]);
                                                                          var match$1 = _clone(match[1], state);
                                                                          var clonedMaterialArr = match$1[2];
                                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                                          var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                          TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2)),
                                                                                          TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialDiffuseColor(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2))
                                                                                        ]), /* tuple */[
                                                                                      color,
                                                                                      color
                                                                                    ]);
                                                                        }));
                                                                  Wonder_jest.test("test specular color", (function (param) {
                                                                          var match = _prepare(/* () */0);
                                                                          var color = /* array */[
                                                                            1,
                                                                            0.2,
                                                                            0.3
                                                                          ];
                                                                          var state = LightMaterialAPI$Wonderjs.setLightMaterialSpecularColor(match[2], color, match[0]);
                                                                          var match$1 = _clone(match[1], state);
                                                                          var clonedMaterialArr = match$1[2];
                                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                                          var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                          TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2)),
                                                                                          TypeArrayTool$Wonderjs.truncateArray(LightMaterialAPI$Wonderjs.getLightMaterialSpecularColor(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2))
                                                                                        ]), /* tuple */[
                                                                                      color,
                                                                                      color
                                                                                    ]);
                                                                        }));
                                                                  Wonder_jest.test("test shininess", (function (param) {
                                                                          var match = _prepare(/* () */0);
                                                                          var state = LightMaterialAPI$Wonderjs.setLightMaterialShininess(match[2], 28.5, match[0]);
                                                                          var match$1 = _clone(match[1], state);
                                                                          var clonedMaterialArr = match$1[2];
                                                                          var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[0]);
                                                                          var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                          LightMaterialAPI$Wonderjs.getLightMaterialShininess(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2),
                                                                                          LightMaterialAPI$Wonderjs.getLightMaterialShininess(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2)
                                                                                        ]), /* tuple */[
                                                                                      28.5,
                                                                                      28.5
                                                                                    ]);
                                                                        }));
                                                                  return Wonder_jest.test("test diffuse map + specular map", (function (param) {
                                                                                var match = LightMaterialTool$Wonderjs.createGameObjectWithMap(state[0]);
                                                                                var match$1 = match[2];
                                                                                var match$2 = match$1[1];
                                                                                var map2 = match$2[1];
                                                                                var map1 = match$2[0];
                                                                                var material = match$1[0];
                                                                                var match$3 = _clone(match[1], match[0]);
                                                                                var clonedMaterialArr = match$3[2];
                                                                                var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$3[0]);
                                                                                var state$2 = AllMaterialTool$Wonderjs.prepareForInit(state$1);
                                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                                LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(material, state$2),
                                                                                                LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2),
                                                                                                LightMaterialAPI$Wonderjs.unsafeGetLightMaterialDiffuseMap(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2),
                                                                                                LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(material, state$2),
                                                                                                LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(Caml_array.caml_array_get(clonedMaterialArr, 0), state$2),
                                                                                                LightMaterialAPI$Wonderjs.unsafeGetLightMaterialSpecularMap(Caml_array.caml_array_get(clonedMaterialArr, 1), state$2)
                                                                                              ]), /* tuple */[
                                                                                            map1,
                                                                                            map1,
                                                                                            map1,
                                                                                            map2,
                                                                                            map2,
                                                                                            map2
                                                                                          ]);
                                                                              }));
                                                                }));
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test clone transform component", (function (param) {
                        var _prepare = function (param) {
                          var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                          var gameObject1 = match[1];
                          var state$1 = match[0];
                          var match$1 = _cloneAndGetClonedTransformMatrixDataArr(gameObject1, 2, state$1);
                          return /* tuple */[
                                  state$1,
                                  gameObject1,
                                  match[2],
                                  match$1[0],
                                  match$1[1]
                                ];
                        };
                        Wonder_jest.test("test clone specific count of transforms", (function (param) {
                                var match = _prepare(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                              }));
                        Wonder_jest.describe("set cloned transform's localPosition by source transform's localPosition", (function (param) {
                                Wonder_jest.test("test", (function (param) {
                                        var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                        var pos1 = /* tuple */[
                                          1,
                                          2,
                                          3
                                        ];
                                        var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[2], pos1, match[0]);
                                        var match$1 = _cloneAndGetClonedTransformMatrixDataArr(match[1], 2, state$1);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1].map((function (transform) {
                                                              return TransformAPI$Wonderjs.getTransformLocalPosition(transform, state$1);
                                                            }))), /* array */[
                                                    pos1,
                                                    pos1
                                                  ]);
                                      }));
                                return Wonder_jest.describe("fix bug", (function (param) {
                                              return Wonder_jest.test("source transform,cloned transforms shouldn't affect each other", (function (param) {
                                                            var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                                            var transform1 = match[2];
                                                            var pos1 = /* tuple */[
                                                              1,
                                                              2,
                                                              3
                                                            ];
                                                            var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, pos1, match[0]);
                                                            var match$1 = _cloneAndGetClonedTransformMatrixDataArr(match[1], 2, state$1);
                                                            var clonedTransformArr = match$1[1];
                                                            var pos2 = /* tuple */[
                                                              2,
                                                              4,
                                                              6
                                                            ];
                                                            var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(Caml_array.caml_array_get(clonedTransformArr, 1), pos2, state$1);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                            TransformAPI$Wonderjs.getTransformLocalPosition(transform1, state$2),
                                                                            clonedTransformArr.map((function (transform) {
                                                                                    return TransformAPI$Wonderjs.getTransformLocalPosition(transform, state$2);
                                                                                  }))
                                                                          ]), /* tuple */[
                                                                        pos1,
                                                                        /* array */[
                                                                          pos1,
                                                                          pos2
                                                                        ]
                                                                      ]);
                                                          }));
                                            }));
                              }));
                        Wonder_jest.describe("set cloned transform's localRotation by source transform's localRotation", (function (param) {
                                return Wonder_jest.test("test", (function (param) {
                                              var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                              var rotation1 = /* tuple */[
                                                1,
                                                2,
                                                3,
                                                1
                                              ];
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalRotation(match[2], rotation1, match[0]);
                                              var match$1 = _cloneAndGetClonedTransformMatrixDataArr(match[1], 2, state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1].map((function (transform) {
                                                                    return TransformAPI$Wonderjs.getTransformLocalRotation(transform, state$1);
                                                                  }))), /* array */[
                                                          rotation1,
                                                          rotation1
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.describe("set cloned transform's localScale by source transform's localScale", (function (param) {
                                return Wonder_jest.test("test", (function (param) {
                                              var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                              var scale1 = /* tuple */[
                                                1,
                                                2,
                                                3
                                              ];
                                              var state$1 = TransformAPI$Wonderjs.setTransformLocalScale(match[2], scale1, match[0]);
                                              var match$1 = _cloneAndGetClonedTransformMatrixDataArr(match[1], 2, state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1].map((function (transform) {
                                                                    return TransformAPI$Wonderjs.getTransformLocalScale(transform, state$1);
                                                                  }))), /* array */[
                                                          scale1,
                                                          scale1
                                                        ]);
                                            }));
                              }));
                        Wonder_jest.test("mark cloned transform dirty", (function (param) {
                                var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                var state$1 = match[0];
                                var match$1 = _cloneAndGetClonedTransformMatrixDataArr(match[1], 2, state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1].map((function (transform) {
                                                      return TransformTool$Wonderjs.isDirty(transform, state$1);
                                                    }))), /* array */[
                                            true,
                                            true
                                          ]);
                              }));
                        return Wonder_jest.test("add cloned transform's gameObject to map", (function (param) {
                                      var match = _prepare(/* () */0);
                                      var clonedTransformArr = match[4];
                                      var clonedGameObjectArr = match[3];
                                      var state = match[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      TransformAPI$Wonderjs.unsafeGetTransformGameObject(Caml_array.caml_array_get(clonedTransformArr, 0), state),
                                                      TransformAPI$Wonderjs.unsafeGetTransformGameObject(Caml_array.caml_array_get(clonedTransformArr, 1), state)
                                                    ]), /* tuple */[
                                                  Caml_array.caml_array_get(clonedGameObjectArr, 0),
                                                  Caml_array.caml_array_get(clonedGameObjectArr, 1)
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("test clone basicCameraView component", (function (param) {
                        var _prepare = function (state) {
                          var match = BasicCameraViewAPI$Wonderjs.createBasicCameraView(state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          var gameObject1 = match$1[1];
                          var match$2 = _cloneGameObject(gameObject1, 2, match$1[0]);
                          var clonedGameObjectArr = match$2[1];
                          var state$1 = match$2[0];
                          return /* tuple */[
                                  state$1,
                                  gameObject1,
                                  match$1[3][0],
                                  clonedGameObjectArr,
                                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectBasicCameraViewComponent(clonedGameObject, state$1);
                                        }))
                                ];
                        };
                        Wonder_jest.test("test clone specific count of basicCameraViews", (function (param) {
                                var match = _prepare(state[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                              }));
                        return Wonder_jest.test("cloned one's isActive should be false", (function (param) {
                                      var match = _prepare(state[0]);
                                      var state$1 = match[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (basicCameraView) {
                                                            return BasicCameraViewAPI$Wonderjs.isActiveBasicCameraView(basicCameraView, state$1);
                                                          }))), /* array */[
                                                  false,
                                                  false
                                                ]);
                                    }));
                      }));
                Wonder_jest.describe("test clone perspectiveCameraProjection component", (function (param) {
                        var _prepare = function (state) {
                          var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state);
                          var match$1 = CameraTool$Wonderjs.createCameraGameObject(match[0]);
                          var gameObject1 = match$1[1];
                          var match$2 = _cloneGameObject(gameObject1, 2, match$1[0]);
                          var clonedGameObjectArr = match$2[1];
                          var state$1 = match$2[0];
                          return /* tuple */[
                                  state$1,
                                  gameObject1,
                                  match$1[3][1],
                                  clonedGameObjectArr,
                                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(clonedGameObject, state$1);
                                        }))
                                ];
                        };
                        Wonder_jest.test("test clone specific count of perspectiveCameraProjections", (function (param) {
                                var match = _prepare(state[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                              }));
                        Wonder_jest.test("set cloned perspectiveCameraProjection's near by source one's near", (function (param) {
                                var match = _prepare(state[0]);
                                var state$1 = match[0];
                                var sourceNear = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear(match[2], state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (perspectiveCameraProjection) {
                                                      return PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear(perspectiveCameraProjection, state$1);
                                                    }))), /* array */[
                                            sourceNear,
                                            sourceNear
                                          ]);
                              }));
                        Wonder_jest.test("set cloned perspectiveCameraProjection's far by source one's far", (function (param) {
                                var match = _prepare(state[0]);
                                var state$1 = match[0];
                                var sourceFar = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar(match[2], state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (perspectiveCameraProjection) {
                                                      return PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar(perspectiveCameraProjection, state$1);
                                                    }))), /* array */[
                                            sourceFar,
                                            sourceFar
                                          ]);
                              }));
                        Wonder_jest.test("set cloned perspectiveCameraProjection's fovy by source one's fovy", (function (param) {
                                var match = _prepare(state[0]);
                                var state$1 = match[0];
                                var sourceFovy = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy(match[2], state$1);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (perspectiveCameraProjection) {
                                                      return PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy(perspectiveCameraProjection, state$1);
                                                    }))), /* array */[
                                            sourceFovy,
                                            sourceFovy
                                          ]);
                              }));
                        return Wonder_jest.describe("set cloned perspectiveCameraProjection's aspect by source one's aspect", (function (param) {
                                      Wonder_jest.test("test has aspect", (function (param) {
                                              var match = _prepare(state[0]);
                                              var state$1 = match[0];
                                              var sourceAspect = PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect(match[2], state$1);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (perspectiveCameraProjection) {
                                                                    return PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect(perspectiveCameraProjection, state$1);
                                                                  }))), /* array */[
                                                          sourceAspect,
                                                          sourceAspect
                                                        ]);
                                            }));
                                      return Wonder_jest.test("if not has aspect, not set it", (function (param) {
                                                    var match = PerspectiveCameraProjectionAPI$Wonderjs.createPerspectiveCameraProjection(state[0]);
                                                    var match$1 = CameraTool$Wonderjs.createCameraGameObjectWithFunc(CameraTool$Wonderjs.createBasicCameraViewPerspectiveCameraWithoutAspect, match[0]);
                                                    var match$2 = _cloneGameObject(match$1[1], 2, match$1[0]);
                                                    var state$1 = match$2[0];
                                                    var clonedPerspectiveCameraProjectionArr = CloneTool$Wonderjs.getFlattenClonedGameObjectArr(match$2[1]).map((function (clonedGameObject) {
                                                            return GameObjectAPI$Wonderjs.unsafeGetGameObjectPerspectiveCameraProjectionComponent(clonedGameObject, state$1);
                                                          }));
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](clonedPerspectiveCameraProjectionArr.map((function (perspectiveCameraProjection) {
                                                                          return PerspectiveCameraProjectionTool$Wonderjs.getAspect(perspectiveCameraProjection, state$1);
                                                                        }))), /* array */[
                                                                undefined,
                                                                undefined
                                                              ]);
                                                  }));
                                    }));
                      }));
                Wonder_jest.describe("test clone fly cameraController component", (function (param) {
                        var _prepare = function (state) {
                          var match = FlyCameraControllerTool$Wonderjs.createGameObject(state);
                          var cameraController1 = match[3][0];
                          var gameObject1 = match[1];
                          var state$1 = match[0];
                          FlyCameraControllerAPI$Wonderjs.setFlyCameraControllerMoveSpeed(cameraController1, 12.2, state$1);
                          var match$1 = _cloneGameObject(gameObject1, 2, state$1);
                          var clonedGameObjectArr = match$1[1];
                          var state$2 = match$1[0];
                          return /* tuple */[
                                  state$2,
                                  gameObject1,
                                  cameraController1,
                                  clonedGameObjectArr,
                                  CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                          return GameObjectAPI$Wonderjs.unsafeGetGameObjectFlyCameraControllerComponent(clonedGameObject, state$2);
                                        })),
                                  2,
                                  12.2
                                ];
                        };
                        Wonder_jest.test("test clone specific count of cameraControllers", (function (param) {
                                var match = _prepare(state[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), match[5]);
                              }));
                        return Wonder_jest.test("set cloned cameraController's moveSpeed by source one's moveSpeed", (function (param) {
                                      var match = _prepare(state[0]);
                                      var moveSpeed = match[6];
                                      var state$1 = match[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (cameraController) {
                                                            return FlyCameraControllerAPI$Wonderjs.unsafeGetFlyCameraControllerMoveSpeed(cameraController, state$1);
                                                          }))), /* array */[
                                                  moveSpeed,
                                                  moveSpeed
                                                ]);
                                    }));
                      }));
                return Wonder_jest.describe("test clone arcball cameraController component", (function (param) {
                              var _prepare = function (state) {
                                var match = ArcballCameraControllerTool$Wonderjs.createGameObject(state);
                                var cameraController1 = match[3][0];
                                var gameObject1 = match[1];
                                var state$1 = match[0];
                                ArcballCameraControllerAPI$Wonderjs.setArcballCameraControllerDistance(cameraController1, 2.2, state$1);
                                var match$1 = _cloneGameObject(gameObject1, 2, state$1);
                                var clonedGameObjectArr = match$1[1];
                                var state$2 = match$1[0];
                                return /* tuple */[
                                        state$2,
                                        gameObject1,
                                        cameraController1,
                                        clonedGameObjectArr,
                                        CloneTool$Wonderjs.getFlattenClonedGameObjectArr(clonedGameObjectArr).map((function (clonedGameObject) {
                                                return GameObjectAPI$Wonderjs.unsafeGetGameObjectArcballCameraControllerComponent(clonedGameObject, state$2);
                                              })),
                                        2.2
                                      ];
                              };
                              Wonder_jest.test("test clone specific count of cameraControllers", (function (param) {
                                      var match = _prepare(state[0]);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].length), 2);
                                    }));
                              return Wonder_jest.test("set cloned cameraController's distance by source one's distance", (function (param) {
                                            var match = _prepare(state[0]);
                                            var distance = match[5];
                                            var state$1 = match[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match[4].map((function (cameraController) {
                                                                  return ArcballCameraControllerAPI$Wonderjs.unsafeGetArcballCameraControllerDistance(cameraController, state$1);
                                                                }))), /* array */[
                                                        distance,
                                                        distance
                                                      ]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("clone children", (function (param) {
                      Wonder_jest.describe("test clone gameObject", (function (param) {
                              return Wonder_jest.test("get all cloned gameObjects(include cloned children)", (function (param) {
                                            var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                            var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                            var state$1 = TransformAPI$Wonderjs.setTransformParent(match[2], match$1[2], match$1[0]);
                                            var match$2 = _cloneGameObject(match[1], 2, state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$2[1]), /* array */[
                                                        /* array */[
                                                          3,
                                                          4
                                                        ],
                                                        /* array */[
                                                          5,
                                                          6
                                                        ]
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("cloned children's components", (function (param) {
                                    Wonder_jest.test("test clone meshRenderer component", (function (param) {
                                            var _createMeshRendererGameObject = function (state) {
                                              var match = MeshRendererTool$Wonderjs.createBasicMaterialGameObject(state);
                                              var gameObject1 = match[1];
                                              var state$1 = match[0];
                                              return /* tuple */[
                                                      state$1,
                                                      gameObject1,
                                                      match[2],
                                                      GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject1, state$1)
                                                    ];
                                            };
                                            var match = _createMeshRendererGameObject(state[0]);
                                            var match$1 = _createMeshRendererGameObject(match[0]);
                                            var state$1 = TransformAPI$Wonderjs.setTransformParent(match[3], match$1[3], match$1[0]);
                                            var match$2 = _cloneGameObject(match[1], 2, state$1);
                                            var state$2 = match$2[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](CloneTool$Wonderjs.getFlattenClonedGameObjectArr(match$2[1]).map((function (clonedGameObject) {
                                                                  return GameObjectAPI$Wonderjs.unsafeGetGameObjectMeshRendererComponent(clonedGameObject, state$2);
                                                                })).length), 4);
                                          }));
                                    return Wonder_jest.describe("test clone transform component", (function (param) {
                                                  var _prepare = function (param) {
                                                    var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                                    var transform1 = match[2];
                                                    var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                                    var transform2 = match$1[2];
                                                    var match$2 = GameObjectTool$Wonderjs.createGameObject(match$1[0]);
                                                    var transform3 = match$2[2];
                                                    var match$3 = GameObjectTool$Wonderjs.createGameObject(match$2[0]);
                                                    var transform4 = match$3[2];
                                                    var state$1 = TransformAPI$Wonderjs.setTransformParent(transform3, transform4, TransformAPI$Wonderjs.setTransformParent(transform1, transform3, TransformAPI$Wonderjs.setTransformParent(transform1, transform2, match$3[0])));
                                                    return /* tuple */[
                                                            state$1,
                                                            match[1],
                                                            transform1,
                                                            match$1[1],
                                                            transform2,
                                                            match$2[1],
                                                            transform3,
                                                            match$3[1],
                                                            transform4
                                                          ];
                                                  };
                                                  Wonder_jest.test("set parent", (function (param) {
                                                          var match = _prepare(/* () */0);
                                                          var state = match[0];
                                                          var match$1 = _cloneAndGetClonedTransformMatrixDataArr(match[1], 2, state);
                                                          var clonedTransformArr = match$1[1];
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                          TransformTool$Wonderjs.getTransformParent(Caml_array.caml_array_get(clonedTransformArr, 0), state),
                                                                          TransformTool$Wonderjs.getTransformParent(Caml_array.caml_array_get(clonedTransformArr, 1), state),
                                                                          TransformTool$Wonderjs.getTransformParent(Caml_array.caml_array_get(clonedTransformArr, 2), state),
                                                                          TransformTool$Wonderjs.getTransformParent(Caml_array.caml_array_get(clonedTransformArr, 3), state),
                                                                          TransformTool$Wonderjs.getTransformParent(Caml_array.caml_array_get(clonedTransformArr, 4), state),
                                                                          TransformTool$Wonderjs.getTransformParent(Caml_array.caml_array_get(clonedTransformArr, 5), state),
                                                                          TransformTool$Wonderjs.getTransformParent(Caml_array.caml_array_get(clonedTransformArr, 6), state),
                                                                          TransformTool$Wonderjs.getTransformParent(Caml_array.caml_array_get(clonedTransformArr, 7), state)
                                                                        ]), /* tuple */[
                                                                      undefined,
                                                                      undefined,
                                                                      Caml_array.caml_array_get(clonedTransformArr, 0),
                                                                      Caml_array.caml_array_get(clonedTransformArr, 1),
                                                                      Caml_array.caml_array_get(clonedTransformArr, 0),
                                                                      Caml_array.caml_array_get(clonedTransformArr, 1),
                                                                      Caml_array.caml_array_get(clonedTransformArr, 4),
                                                                      Caml_array.caml_array_get(clonedTransformArr, 5)
                                                                    ]);
                                                        }));
                                                  return Wonder_jest.test("test set cloned transform's localPosition by corresponding source transform's localPosition", (function (param) {
                                                                var match = _prepare(/* () */0);
                                                                var pos1 = /* tuple */[
                                                                  1,
                                                                  2,
                                                                  3
                                                                ];
                                                                var pos2 = /* tuple */[
                                                                  2,
                                                                  2,
                                                                  3
                                                                ];
                                                                var pos3 = /* tuple */[
                                                                  3,
                                                                  20,
                                                                  3
                                                                ];
                                                                var pos4 = /* tuple */[
                                                                  4,
                                                                  2,
                                                                  3
                                                                ];
                                                                var state = TransformAPI$Wonderjs.setTransformLocalPosition(match[2], pos1, match[0]);
                                                                var state$1 = TransformAPI$Wonderjs.setTransformLocalPosition(match[4], pos2, state);
                                                                var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(match[6], pos3, state$1);
                                                                var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(match[8], pos4, state$2);
                                                                var match$1 = _cloneAndGetClonedTransformMatrixDataArr(match[1], 1, state$3);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](match$1[1].map((function (transform) {
                                                                                      return TransformAPI$Wonderjs.getTransformPosition(transform, state$3);
                                                                                    }))), /* array */[
                                                                            pos1,
                                                                            Vector3Service$Wonderjs.add(/* Float */0, pos1, pos2),
                                                                            Vector3Service$Wonderjs.add(/* Float */0, pos1, pos3),
                                                                            Vector3Service$Wonderjs.add(/* Float */0, Vector3Service$Wonderjs.add(/* Float */0, pos1, pos3), pos4)
                                                                          ]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
