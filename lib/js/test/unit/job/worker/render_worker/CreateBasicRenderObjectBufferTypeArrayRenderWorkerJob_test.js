'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var BufferTool$Wonderjs = require("../../../tool/service/buffer/BufferTool.js");
var SettingTool$Wonderjs = require("../../../../tool/service/setting/SettingTool.js");
var MainStateTool$Wonderjs = require("../../../../tool/service/state/MainStateTool.js");
var RenderMainTool$Wonderjs = require("../../../tool/service/main/render/RenderMainTool.js");
var BufferSettingTool$Wonderjs = require("../../../../tool/service/setting/BufferSettingTool.js");
var RenderBasicJobTool$Wonderjs = require("../../../../tool/job/render_basic/RenderBasicJobTool.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../tool/service/state/RenderWorkerStateTool.js");
var SharedArrayBufferTool$Wonderjs = require("../../../../tool/SharedArrayBufferTool.js");
var RenderRenderWorkerTool$Wonderjs = require("../../../tool/service/render_worker/render/RenderRenderWorkerTool.js");
var CreateBasicRenderObjectBufferMainWorkerJob$Wonderjs = require("../../../../../src/job/worker/main/loop/CreateBasicRenderObjectBufferMainWorkerJob.js");
var CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs = require("../../../../../src/job/worker/render/draw/CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.js");

describe("CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                SharedArrayBufferTool$Wonderjs.setSharedArrayBufferToBeArrayBuffer();
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("fix bug", (function () {
                return Wonder_jest.testPromise("renderRecord->basicRenderObjectRecord should be correct ", (function () {
                              var state = SettingTool$Wonderjs.createStateAndSetToStateData(undefined, undefined, undefined, undefined, "true", SettingTool$Wonderjs.buildBufferConfigStr(undefined, undefined, undefined, 5, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                              var match = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, state);
                              var match$1 = RenderBasicJobTool$Wonderjs.prepareGameObject(sandbox, match[0]);
                              var match$2 = RenderBasicJobTool$Wonderjs.prepareGameObjectWithCustomGeometry(sandbox, match$1[0]);
                              MainStateTool$Wonderjs.setState(match$2[0]);
                              return Most.drain(CreateBasicRenderObjectBufferMainWorkerJob$Wonderjs.execJob(undefined, MainStateTool$Wonderjs.getStateData(/* () */0))).then((function () {
                                            var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
                                            var match = RenderMainTool$Wonderjs.unsafeGetBasicRenderObjectRecord(state);
                                            RenderWorkerStateTool$Wonderjs.createStateAndSetToStateData(/* () */0);
                                            return Most.drain(CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs.execJob(undefined, {
                                                              data: {
                                                                renderData: {
                                                                  isRender: true,
                                                                  basic: {
                                                                    buffer: match[/* buffer */0],
                                                                    count: match[/* count */1],
                                                                    bufferCount: BufferSettingTool$Wonderjs.getBasicMaterialCount(state)
                                                                  }
                                                                }
                                                              }
                                                            }, RenderWorkerStateTool$Wonderjs.getStateData(/* () */0))).then((function () {
                                                          var renderWorkerState = RenderWorkerStateTool$Wonderjs.unsafeGetState(/* () */0);
                                                          var match = RenderRenderWorkerTool$Wonderjs.unsafeGetBasicRenderObjectRecord(renderWorkerState);
                                                          BufferTool$Wonderjs.getDefaultShaderIndex(/* () */0);
                                                          var defaultSourceInstance = BufferTool$Wonderjs.getDefaultSourceInstance(/* () */0);
                                                          return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                              match[/* count */0],
                                                                              match[/* transformIndices */1],
                                                                              match[/* materialIndices */2],
                                                                              match[/* geometryIndices */3],
                                                                              match[/* sourceInstanceIndices */5],
                                                                              match[/* geometryTypes */4]
                                                                            ]), /* tuple */[
                                                                          3,
                                                                          new Uint32Array(/* array */[
                                                                                1,
                                                                                2,
                                                                                3,
                                                                                0,
                                                                                0
                                                                              ]),
                                                                          new Uint32Array(/* array */[
                                                                                0,
                                                                                1,
                                                                                2,
                                                                                0,
                                                                                0
                                                                              ]),
                                                                          new Uint32Array(/* array */[
                                                                                0,
                                                                                1,
                                                                                0,
                                                                                0,
                                                                                0
                                                                              ]),
                                                                          new Uint32Array(/* array */[
                                                                                defaultSourceInstance,
                                                                                defaultSourceInstance,
                                                                                defaultSourceInstance,
                                                                                defaultSourceInstance,
                                                                                defaultSourceInstance
                                                                              ]),
                                                                          new Uint8Array(/* array */[
                                                                                0,
                                                                                0,
                                                                                1,
                                                                                0,
                                                                                0
                                                                              ])
                                                                        ]));
                                                        }));
                                          }));
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
