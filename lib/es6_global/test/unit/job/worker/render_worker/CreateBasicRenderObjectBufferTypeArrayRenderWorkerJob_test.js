

import * as Most from "most";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as BufferTool$Wonderjs from "../../../tool/service/buffer/BufferTool.js";
import * as CameraTool$Wonderjs from "../../../../tool/service/camera/CameraTool.js";
import * as SettingTool$Wonderjs from "../../../../tool/service/setting/SettingTool.js";
import * as MainStateTool$Wonderjs from "../../../../tool/service/state/MainStateTool.js";
import * as RenderMainTool$Wonderjs from "../../../tool/service/main/render/RenderMainTool.js";
import * as BufferSettingTool$Wonderjs from "../../../../tool/service/setting/BufferSettingTool.js";
import * as RenderBasicJobTool$Wonderjs from "../../../../tool/job/render_basic/RenderBasicJobTool.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../tool/service/state/RenderWorkerStateTool.js";
import * as SharedArrayBufferTool$Wonderjs from "../../../../tool/SharedArrayBufferTool.js";
import * as RenderRenderWorkerTool$Wonderjs from "../../../tool/service/render_worker/render/RenderRenderWorkerTool.js";
import * as GetCameraDataMainWorkerJob$Wonderjs from "../../../../../src/job/worker/main/loop/GetCameraDataMainWorkerJob.js";
import * as CreateBasicRenderObjectBufferMainWorkerJob$Wonderjs from "../../../../../src/job/worker/main/loop/CreateBasicRenderObjectBufferMainWorkerJob.js";
import * as CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs from "../../../../../src/job/worker/render/draw/CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.js";

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

export {
  
}
/*  Not a pure module */
