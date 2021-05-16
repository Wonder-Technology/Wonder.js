'use strict';

var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var SettingTool$Wonderjs = require("../../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var TestWorkerTool$Wonderjs = require("../../../tool/TestWorkerTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var TestMainWorkerTool$Wonderjs = require("../tool/TestMainWorkerTool.js");
var RenderJobsRenderWorkerTool$Wonderjs = require("../../render_worker/tool/RenderJobsRenderWorkerTool.js");
var ReallocateGeometryCPUMemoryTool$Wonderjs = require("../../../../../tool/reallocate/ReallocateGeometryCPUMemoryTool.js");
var ReallocateGameObjectCPUMemoryTool$Wonderjs = require("../../../../../tool/reallocate/ReallocateGameObjectCPUMemoryTool.js");

Wonder_jest.describe("test reallocate cpu memory main worker job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestMainWorkerTool$Wonderjs.initWithJobConfig(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return TestWorkerTool$Wonderjs.clear(sandbox);
              }));
        return Wonder_jest.describe("should only reallocate once in one loop", (function (param) {
                      Wonder_jest.testPromise("test reallocate gameObject", undefined, (function (param) {
                              var match = ReallocateGameObjectCPUMemoryTool$Wonderjs.prepareForOptimize(state);
                              var gameObject3 = match[3];
                              var gameObject2 = match[2];
                              var gameObject1 = match[1];
                              var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                              var state$2 = MainStateTool$Wonderjs.setState(state$1);
                              return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (postMessageToRenderWorker) {
                                            var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                            return Promise.resolve(ReallocateGameObjectCPUMemoryTool$Wonderjs.judgeForOptimize(state, gameObject1, gameObject2, gameObject3));
                                          }), state$2, sandbox, undefined, /* () */0);
                            }));
                      return Wonder_jest.testPromise("test reallocate geometry", undefined, (function (param) {
                                    var match = ReallocateGeometryCPUMemoryTool$Wonderjs.prepareForOptimize(state);
                                    var match$1 = match[6];
                                    var match$2 = match$1[1];
                                    var indices32_3 = match$2[2];
                                    var indices32_2 = match$2[1];
                                    var indices32_1 = match$2[0];
                                    var match$3 = match$1[0];
                                    var indices3 = match$3[2];
                                    var indices2 = match$3[1];
                                    var indices1 = match$3[0];
                                    var match$4 = match[5];
                                    var normals3 = match$4[2];
                                    var normals2 = match$4[1];
                                    var normals1 = match$4[0];
                                    var match$5 = match[4];
                                    var texCoords3 = match$5[2];
                                    var texCoords2 = match$5[1];
                                    var texCoords1 = match$5[0];
                                    var match$6 = match[3];
                                    var vertices3 = match$6[2];
                                    var vertices2 = match$6[1];
                                    var vertices1 = match$6[0];
                                    var match$7 = match[2];
                                    var geometry3 = match$7[2];
                                    var geometry2 = match$7[1];
                                    var geometry1 = match$7[0];
                                    var match$8 = match[1];
                                    var gameObject3 = match$8[2];
                                    var gameObject2 = match$8[1];
                                    var gameObject1 = match$8[0];
                                    var state$1 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match[0]);
                                    var state$2 = MainStateTool$Wonderjs.setState(state$1);
                                    return RenderJobsRenderWorkerTool$Wonderjs.initAndMainLoopAndRender((function (postMessageToRenderWorker) {
                                                  var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                  return Promise.resolve(ReallocateGeometryCPUMemoryTool$Wonderjs.judgeForOptimize(state, /* tuple */[
                                                                  gameObject1,
                                                                  gameObject2,
                                                                  gameObject3
                                                                ], /* tuple */[
                                                                  geometry1,
                                                                  geometry2,
                                                                  geometry3
                                                                ], /* tuple */[
                                                                  vertices1,
                                                                  vertices2,
                                                                  vertices3
                                                                ], /* tuple */[
                                                                  texCoords1,
                                                                  texCoords2,
                                                                  texCoords3
                                                                ], /* tuple */[
                                                                  normals1,
                                                                  normals2,
                                                                  normals3
                                                                ], /* tuple */[
                                                                  /* tuple */[
                                                                    indices1,
                                                                    indices2,
                                                                    indices3
                                                                  ],
                                                                  /* tuple */[
                                                                    indices32_1,
                                                                    indices32_2,
                                                                    indices32_3
                                                                  ]
                                                                ]));
                                                }), state$2, sandbox, undefined, /* () */0);
                                  }));
                    }));
      }));

/*  Not a pure module */
