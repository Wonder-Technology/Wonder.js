

import * as Curry from "./../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "./../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "./../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$Wonderjs from "../../../../tool/TestTool.js";
import * as FakeGlTool$Wonderjs from "../../../../tool/gl/FakeGlTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as TransformAPI$Wonderjs from "../../../../../src/api/TransformAPI.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as TransformTool$Wonderjs from "../../../../tool/service/transform/TransformTool.js";
import * as GameObjectTool$Wonderjs from "../../../../tool/service/gameObject/GameObjectTool.js";
import * as RenderJobsTool$Wonderjs from "../../../../tool/job/no_worker/loop/RenderJobsTool.js";
import * as LoopRenderJobTool$Wonderjs from "../../../../tool/job/no_worker/loop/LoopRenderJobTool.js";
import * as CreateStateMainService$Wonderjs from "../../../../../src/service/state/main/state/CreateStateMainService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

Wonder_jest.describe("test redo,undo transform", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */CreateStateMainService$Wonderjs.createState(/* () */0)];
        var _prepareTransformMatrixData = function (state) {
          var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
          var transform1 = match[2];
          var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
          var transform2 = match$1[2];
          var match$2 = GameObjectTool$Wonderjs.createGameObject(match$1[0]);
          var transform3 = match$2[2];
          var gameObject3 = match$2[1];
          var state$1 = TransformAPI$Wonderjs.setTransformParent(transform1, transform2, match$2[0]);
          var state$2 = TransformAPI$Wonderjs.setTransformLocalPosition(transform1, /* tuple */[
                1,
                2,
                3
              ], state$1);
          var state$3 = TransformAPI$Wonderjs.setTransformLocalPosition(transform2, /* tuple */[
                2,
                4,
                10
              ], state$2);
          var state$4 = TransformAPI$Wonderjs.setTransformLocalPosition(transform3, /* tuple */[
                -1,
                4,
                5
              ], state$3);
          var state$5 = TransformAPI$Wonderjs.setTransformLocalScale(transform1, /* tuple */[
                2,
                2,
                2.5
              ], TransformAPI$Wonderjs.setTransformLocalRotation(transform1, /* tuple */[
                    -2.5,
                    1,
                    0,
                    1
                  ], state$4));
          var state$6 = GameObjectTool$Wonderjs.disposeGameObjectTransformComponent(gameObject3, transform3, false, state$5);
          return /* tuple */[
                  state$6,
                  match[1],
                  match$1[1],
                  gameObject3,
                  transform1,
                  transform2,
                  transform3
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = RenderJobsTool$Wonderjs.initWithJobConfig(sandbox, LoopRenderJobTool$Wonderjs.buildNoWorkerJobConfig(/* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("deep copy transform record", (function (param) {
                Wonder_jest.test("deep copy childMap", (function (param) {
                        var match = _prepareTransformMatrixData(state);
                        var transform2 = match[5];
                        var state$1 = match[0];
                        TransformAPI$Wonderjs.getTransformPosition(transform2, state$1);
                        var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                        var match$1 = TransformAPI$Wonderjs.createTransform(copiedState);
                        TransformAPI$Wonderjs.setTransformParent(match$1[1], transform2, match$1[0]);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(match[4], state$1)), /* array */[transform2]);
                      }));
                Wonder_jest.test("clear localToWorldMatrixCacheMap, normalMatrixCacheMap", (function (param) {
                        var match = _prepareTransformMatrixData(state);
                        var state$1 = match[0];
                        TransformTool$Wonderjs.updateAndGetNormalMatrixTypeArray(match[5], state$1);
                        var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                        var match$1 = TransformAPI$Wonderjs.createTransform(copiedState);
                        var match$2 = TransformTool$Wonderjs.getRecord(match$1[0]);
                        var localToWorldMatrixCacheMap = match$2[/* localToWorldMatrixCacheMap */19];
                        var normalMatrixCacheMap = match$2[/* normalMatrixCacheMap */20];
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        localToWorldMatrixCacheMap,
                                        normalMatrixCacheMap
                                      ]), /* tuple */[
                                    MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
                                    MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)
                                  ]);
                      }));
                return Wonder_jest.describe("fix bug", (function (param) {
                              return Wonder_jest.test("\n              create transform t1,t2;\n              copy state to copiedState1;\n              copy state to copiedState2;\n              set t1 to be t2's parent with state;\n\n              t1->children should be empty with copiedState2.\n              ", (function (param) {
                                            var match = GameObjectTool$Wonderjs.createGameObject(state[0]);
                                            var transform1 = match[2];
                                            var match$1 = GameObjectTool$Wonderjs.createGameObject(match[0]);
                                            var state$1 = match$1[0];
                                            MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                            var copiedState2 = MainStateTool$Wonderjs.deepCopyForRestore(state$1);
                                            TransformAPI$Wonderjs.setTransformParent(transform1, match$1[2], state$1);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.unsafeGetTransformChildren(transform1, copiedState2)), /* array */[]);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("restore transform record to target state", (function (param) {
                      var _test = function (state) {
                        var match = TransformTool$Wonderjs.getRecord(state);
                        var localToWorldMatrices = match[/* localToWorldMatrices */2];
                        var localPositions = match[/* localPositions */3];
                        var localRotations = match[/* localRotations */4];
                        var localScales = match[/* localScales */5];
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        localToWorldMatrices,
                                        localPositions,
                                        localRotations,
                                        localScales
                                      ]), /* tuple */[
                                    new Float32Array(/* array */[
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          -2,
                                          -10,
                                          -4,
                                          0,
                                          -10,
                                          -23,
                                          -10,
                                          0,
                                          5,
                                          12.5,
                                          -33.75,
                                          0,
                                          1,
                                          2,
                                          3,
                                          1,
                                          -2,
                                          -10,
                                          -4,
                                          0,
                                          -10,
                                          -23,
                                          -10,
                                          0,
                                          5,
                                          12.5,
                                          -33.75,
                                          0,
                                          7,
                                          15,
                                          -382.5,
                                          1,
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          0,
                                          1
                                        ]),
                                    new Float32Array(/* array */[
                                          0,
                                          0,
                                          0,
                                          1,
                                          2,
                                          3,
                                          2,
                                          4,
                                          10,
                                          0,
                                          0,
                                          0,
                                          0,
                                          0,
                                          0
                                        ]),
                                    new Float32Array(/* array */[
                                          0,
                                          0,
                                          0,
                                          1,
                                          -2.5,
                                          1,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          1,
                                          0,
                                          0,
                                          0,
                                          1
                                        ]),
                                    new Float32Array(/* array */[
                                          1,
                                          1,
                                          1,
                                          2,
                                          2,
                                          2.5,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1
                                        ])
                                  ]);
                      };
                      Wonder_jest.test("test restore typeArrays", (function (param) {
                              state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, 5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                              var match = _prepareTransformMatrixData(state);
                              var transform1 = match[4];
                              var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                              var state$2 = TransformTool$Wonderjs.update(transform1, state$1);
                              var state$3 = TransformTool$Wonderjs.update(match[5], state$2);
                              var copiedState = MainStateTool$Wonderjs.deepCopyForRestore(state$3);
                              var match$1 = GameObjectTool$Wonderjs.createGameObject(state$3);
                              var transform4 = match$1[2];
                              var currentState = TransformAPI$Wonderjs.setTransformLocalScale(transform4, /* tuple */[
                                    2,
                                    2,
                                    2.5
                                  ], TransformAPI$Wonderjs.setTransformLocalRotation(transform4, /* tuple */[
                                        -2.5,
                                        1,
                                        0,
                                        1
                                      ], TransformAPI$Wonderjs.setTransformLocalPosition(transform4, /* tuple */[
                                            -2,
                                            3,
                                            1
                                          ], match$1[0])));
                              var currentState$1 = TransformTool$Wonderjs.update(transform1, currentState);
                              MainStateTool$Wonderjs.restore(currentState$1, copiedState);
                              return _test(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                            }));
                      return Wonder_jest.describe("test restore to the same state", (function (param) {
                                    return Wonder_jest.test("should not change typeArrays", (function (param) {
                                                  state[0] = TestTool$Wonderjs.initWithJobConfigWithoutBuildFakeDom(sandbox, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, 5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, /* () */0);
                                                  var match = _prepareTransformMatrixData(state);
                                                  var state$1 = FakeGlTool$Wonderjs.setFakeGl(FakeGlTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                                  var state$2 = TransformTool$Wonderjs.update(match[4], state$1);
                                                  var state$3 = TransformTool$Wonderjs.update(match[5], state$2);
                                                  MainStateTool$Wonderjs.restore(state$3, state$3);
                                                  return _test(MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                                }));
                                  }));
                    }));
      }));

export {
  
}
/*  Not a pure module */
