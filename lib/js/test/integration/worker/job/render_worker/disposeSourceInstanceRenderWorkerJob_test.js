'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../tool/FakeGlWorkerTool.js");
var SparseMapService$Wonderjs = require("../../../../../src/service/atom/SparseMapService.js");
var TypeArrayPoolTool$Wonderjs = require("../../../../tool/structure/TypeArrayPoolTool.js");
var TestMainWorkerTool$Wonderjs = require("../main_worker/tool/TestMainWorkerTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var SparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/SparseMapService.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("./tool/RenderJobsRenderWorkerTool.js");
var RenderBasicHardwareInstanceRenderWorkerTool$Wonderjs = require("./tool/RenderBasicHardwareInstanceRenderWorkerTool.js");

describe("DisposeSourceInstanceRenderWorkerJob", (function () {
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
        describe("dispose sourceInstance data", (function () {
                var _test = function (judgeFunc, state) {
                  var match = RenderBasicHardwareInstanceRenderWorkerTool$Wonderjs.prepare(sandbox, state[0]);
                  var sourceInstance = match[2][3];
                  var gameObject = match[1];
                  var createBuffer = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  Sinon.returns(1, createBuffer);
                  var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createBuffer), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                  var state$2 = MainStateTool$Wonderjs.setState(state$1);
                  return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function () {
                                MainStateTool$Wonderjs.setState(GameObjectAPI$Wonderjs.disposeGameObject(gameObject, MainStateTool$Wonderjs.unsafeGetState(/* () */0)));
                                return RenderJobsRenderWorkerTool$Wonderjs.mainLoopAndDispose((function () {
                                              var renderWorkerState = RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0);
                                              return Promise.resolve(Curry._2(judgeFunc, sourceInstance, renderWorkerState));
                                            }), state$2, sandbox, undefined, /* () */0);
                              }), state$2, sandbox, undefined, /* () */0);
                };
                Wonder_jest.testPromise("add matrixFloat32ArrayMap->typeArray to pool", (function () {
                        return _test((function (_, renderWorkerState) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SparseMapService$Wonderjs.length(Caml_array.caml_array_get(TypeArrayPoolTool$Wonderjs.getFloat32ArrayPoolMap(renderWorkerState[/* typeArrayPoolRecord */22]), 1024))), 1);
                                    }), state);
                      }));
                return Wonder_jest.testPromise("remove from matrixFloat32ArrayMap, matrixInstanceBufferCapacityMap, isSendTransformMatrixDataMap", (function () {
                              return _test((function (sourceInstance, renderWorkerState) {
                                            var match = renderWorkerState[/* sourceInstanceRecord */11];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                            SparseMapService$WonderCommonlib.unsafeGet(sourceInstance, match[/* matrixFloat32ArrayMap */4]),
                                                            SparseMapService$WonderCommonlib.unsafeGet(sourceInstance, match[/* matrixInstanceBufferCapacityMap */3]),
                                                            SparseMapService$WonderCommonlib.unsafeGet(sourceInstance, match[/* isSendTransformMatrixDataMap */5])
                                                          ]), /* tuple */[
                                                        undefined,
                                                        undefined,
                                                        undefined
                                                      ]);
                                          }), state);
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
