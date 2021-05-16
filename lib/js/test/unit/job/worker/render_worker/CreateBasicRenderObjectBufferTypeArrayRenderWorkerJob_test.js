'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var BufferTool$Wonderjs = require("../../../tool/service/buffer/BufferTool.js");
var CameraTool$Wonderjs = require("../../../../tool/service/camera/CameraTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var RenderMainTool$Wonderjs = require("../../../tool/service/main/render/RenderMainTool.js");
var BufferSettingTool$Wonderjs = require("../../../../tool/service/setting/BufferSettingTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../tool/job/render_basic/RenderBasicJobTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var SharedArrayBufferTool$Wonderjs = require("../../../../tool/SharedArrayBufferTool.js");
var RenderRenderWorkerTool$Wonderjs = require("../../../tool/service/render_worker/render/RenderRenderWorkerTool.js");
var GetCameraDataMainWorkerJob$Wonderjs = require("../../../../../src/job/worker/main/loop/GetCameraDataMainWorkerJob.js");
var CreateBasicRenderObjectBufferMainWorkerJob$Wonderjs = require("../../../../../src/job/worker/main/loop/CreateBasicRenderObjectBufferMainWorkerJob.js");
var CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs = require("../../../../../src/job/worker/render/draw/CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.js");

Wonder_jest.describe("CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                Curry._1(SharedArrayBufferTool$Wonderjs.setSharedArrayBufferToBeArrayBuffer, /* () */0);
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      return Wonder_jest.testPromise("renderRecord->basicRenderObjectRecord should be correct ", undefined, (function (param) {
                                    var state = SettingTool$Wonderjs.createStateAndSetToStateData(undefined, undefined, undefined, undefined, "true", SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, 8, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                    var match = CameraTool$Wonderjs.createCameraGameObject(state);
                                    var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                                    var match$2 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match$1[0]);
                                    var match$3 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithGeometry(sandbox, match$2[0]);
                                    MainStateTool$Wonderjs.setState(match$3[0]);
                                    return Most.drain(GetCameraDataMainWorkerJob$Wonderjs.execJob(undefined, MainStateTool$Wonderjs.getStateData(/* () */0)).concat(CreateBasicRenderObjectBufferMainWorkerJob$Wonderjs.execJob(undefined, MainStateTool$Wonderjs.getStateData(/* () */0)))).then((function (param) {
                                                  var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                  var match = RenderMainTool$Wonderjs.unsafeGetBasicRenderObjectRecord(state);
                                                  RenderWorkerStateTool$Wonderjs.createStateAndSetToStateData(/* () */0);
                                                  return Most.drain(CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs.execJob(undefined, {
                                                                    data: {
                                                                      renderData: {
                                                                        isRender: true,
                                                                        basic: {
                                                                          buffer: match[/* buffer */0],
                                                                          renderIndexArray: match[/* renderIndexArray */1],
                                                                          bufferCount: BufferSettingTool$Wonderjs.getBasicMaterialCount(state)
                                                                        }
                                                                      }
                                                                    }
                                                                  }, RenderWorkerStateTool$Wonderjs.getStateData(/* () */0))).then((function (param) {
                                                                var renderWorkerState = RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                                var match = RenderRenderWorkerTool$Wonderjs.unsafeGetBasicRenderObjectRecord(renderWorkerState);
                                                                BufferTool$Wonderjs.getDefaultShaderIndex(/* () */0);
                                                                var defaultSourceInstance = BufferTool$Wonderjs.getDefaultSourceInstance(/* () */0);
                                                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                                    match[/* renderIndexArray */0],
                                                                                    match[/* transformIndices */1],
                                                                                    match[/* materialIndices */2],
                                                                                    match[/* geometryIndices */4],
                                                                                    match[/* sourceInstanceIndices */5]
                                                                                  ]), /* tuple */[
                                                                                /* array */[
                                                                                  0,
                                                                                  1,
                                                                                  2
                                                                                ],
                                                                                new Uint32Array(/* array */[
                                                                                      2,
                                                                                      3,
                                                                                      4,
                                                                                      0,
                                                                                      0,
                                                                                      0,
                                                                                      0,
                                                                                      0
                                                                                    ]),
                                                                                new Uint32Array(/* array */[
                                                                                      0,
                                                                                      1,
                                                                                      2,
                                                                                      0,
                                                                                      0,
                                                                                      0,
                                                                                      0,
                                                                                      0
                                                                                    ]),
                                                                                new Uint32Array(/* array */[
                                                                                      0,
                                                                                      1,
                                                                                      2,
                                                                                      0,
                                                                                      0,
                                                                                      0,
                                                                                      0,
                                                                                      0
                                                                                    ]),
                                                                                new Uint32Array(/* array */[
                                                                                      defaultSourceInstance,
                                                                                      defaultSourceInstance,
                                                                                      defaultSourceInstance,
                                                                                      defaultSourceInstance,
                                                                                      defaultSourceInstance,
                                                                                      defaultSourceInstance,
                                                                                      defaultSourceInstance,
                                                                                      defaultSourceInstance
                                                                                    ])
                                                                              ]));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
