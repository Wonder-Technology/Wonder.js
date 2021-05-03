'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../tool/FakeGlWorkerTool.js");
var TypeArrayPoolTool$Wonderjs = require("../../../../tool/structure/TypeArrayPoolTool.js");
var TestMainWorkerTool$Wonderjs = require("../main_worker/tool/TestMainWorkerTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("./tool/RenderJobsRenderWorkerTool.js");
var MutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableSparseMapService.js");
var RenderBasicHardwareInstanceRenderWorkerTool$Wonderjs = require("./tool/RenderBasicHardwareInstanceRenderWorkerTool.js");

Wonder_jest.describe("DisposeSourceInstanceRenderWorkerJob", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("dispose sourceInstance data", (function (param) {
                      var _test = function (judgeFunc, state) {
                        var match = RenderBasicHardwareInstanceRenderWorkerTool$Wonderjs.prepare(sandbox, state[0]);
                        var sourceInstance = match[2][3];
                        var gameObject = match[1];
                        var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        Sinon.returns(1, createBuffer);
                        var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                        var state$2 = MainStateTool$Wonderjs.setState(state$1);
                        return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (param) {
                                      var state = GameObjectAPI$Wonderjs.disposeGameObject(gameObject, MainStateTool$Wonderjs.unsafeGetState(/* () */0));
                                      return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndDispose((function (param) {
                                                    var renderWorkerState = RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                    return Promise.resolve(Curry._2(judgeFunc, sourceInstance, renderWorkerState));
                                                  }), state, sandbox, undefined, /* () */0);
                                    }), state$2, sandbox, undefined, /* () */0);
                      };
                      Wonder_jest.testPromise("add matrixFloat32ArrayMap->typeArray to pool", undefined, (function (param) {
                              return _test((function (sourceInstance, renderWorkerState) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MutableSparseMapService$WonderCommonlib.unsafeGet(1024, TypeArrayPoolTool$Wonderjs.getFloat32ArrayPoolMap(renderWorkerState[/* typeArrayPoolRecord */24])).length), 1);
                                          }), state);
                            }));
                      return Wonder_jest.testPromise("remove from matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap, isSendTransformMatrixDataMap", undefined, (function (param) {
                                    return _test((function (sourceInstance, renderWorkerState) {
                                                  var match = renderWorkerState[/* sourceInstanceRecord */11];
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                  MutableSparseMapService$WonderCommonlib.unsafeGet(sourceInstance, match[/* matrixFloat32ArrayMap */4]),
                                                                  MutableSparseMapService$WonderCommonlib.unsafeGet(sourceInstance, match[/* matrixInstanceBufferCapacityMap */3]),
                                                                  MutableSparseMapService$WonderCommonlib.unsafeGet(sourceInstance, match[/* isSendTransformMatrixDataMap */5])
                                                                ]), /* tuple */[
                                                              undefined,
                                                              undefined,
                                                              undefined
                                                            ]);
                                                }), state);
                                  }));
                    }));
      }));

/*  Not a pure module */
