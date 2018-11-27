

import * as List from "../../../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Most from "most";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as GlTool$Wonderjs from "../../../../../tool/gl/GlTool.js";
import * as MainStateTool$Wonderjs from "../../../../../tool/service/state/MainStateTool.js";
import * as WorkerJobTool$Wonderjs from "../../../../../tool/service/workerJob/WorkerJobTool.js";
import * as FakeGlWorkerTool$Wonderjs from "../../../tool/FakeGlWorkerTool.js";
import * as WorkerWorkerTool$Wonderjs from "../../../tool/WorkerWorkerTool.js";
import * as WorkerJobWorkerTool$Wonderjs from "../../../tool/WorkerJobWorkerTool.js";
import * as MostRenderWorkerTool$Wonderjs from "./MostRenderWorkerTool.js";
import * as CommitRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/CommitRenderWorkerJob.js";
import * as RenderWorkerStateTool$Wonderjs from "../../../../../tool/service/state/RenderWorkerStateTool.js";
import * as WorkerJobHandleSystem$Wonderjs from "../../../../../../src/job/worker/WorkerJobHandleSystem.js";
import * as CreateGlRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/CreateGlRenderWorkerJob.js";
import * as InitIMGUIRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitIMGUIRenderWorkerJob.js";
import * as InitStateRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitStateRenderWorkerJob.js";
import * as DisposeVboRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/dispose/DisposeVboRenderWorkerJob.js";
import * as MainInitJobMainWorkerTool$Wonderjs from "../../main_worker/tool/MainInitJobMainWorkerTool.js";
import * as InitTextureRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitTextureRenderWorkerJob.js";
import * as RenderBasicRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/render_basic/RenderBasicRenderWorkerJob.js";
import * as RenderIMGUIRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/RenderIMGUIRenderWorkerJob.js";
import * as SetViewportRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/SetViewportRenderWorkerJob.js";
import * as InitGeometryRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitGeometryRenderWorkerJob.js";
import * as InitInstanceRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitInstanceRenderWorkerJob.js";
import * as SendRenderDataMainWorkerJob$Wonderjs from "../../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js";
import * as GetCameraDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/GetCameraDataRenderWorkerJob.js";
import * as GetCustomDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/GetCustomDataRenderWorkerJob.js";
import * as InitTransformRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitTransformRenderWorkerJob.js";
import * as WorkerInstanceMainWorkerTool$Wonderjs from "../../main_worker/tool/WorkerInstanceMainWorkerTool.js";
import * as GetSettingDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/GetSettingDataRenderWorkerJob.js";
import * as InitPointLightRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitPointLightRenderWorkerJob.js";
import * as PregetGLSLDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/PregetGLSLDataRenderWorkerJob.js";
import * as GetInstanceDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/GetInstanceDataRenderWorkerJob.js";
import * as GetMaterialDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/GetMaterialDataRenderWorkerJob.js";
import * as FrontRenderLightRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/front_render_light/FrontRenderLightRenderWorkerJob.js";
import * as InitMeshRendererRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitMeshRendererRenderWorkerJob.js";
import * as SendInitRenderDataMainWorkerJob$Wonderjs from "../../../../../../src/job/worker/main/init/SendInitRenderDataMainWorkerJob.js";
import * as GetPointLightDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/GetPointLightDataRenderWorkerJob.js";
import * as InitBasicMaterialRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitBasicMaterialRenderWorkerJob.js";
import * as InitLightMaterialRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitLightMaterialRenderWorkerJob.js";
import * as InitDirectionLightRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/InitDirectionLightRenderWorkerJob.js";
import * as GetAmbientLightDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/GetAmbientLightDataRenderWorkerJob.js";
import * as GetRenderConfigDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/GetRenderConfigDataRenderWorkerJob.js";
import * as GetBrowserDetectDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/init/GetBrowserDetectDataRenderWorkerJob.js";
import * as InitTextureForRenderRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/InitTextureForRenderRenderWorkerJob.js";
import * as SendFinishRenderDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/SendFinishRenderDataRenderWorkerJob.js";
import * as DisposeSourceInstanceRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/dispose/DisposeSourceInstanceRenderWorkerJob.js";
import * as GetDirectionLightDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/GetDirectionLightDataRenderWorkerJob.js";
import * as InitMaterialForRenderRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/InitMaterialForRenderRenderWorkerJob.js";
import * as SendUniformShaderDataRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/SendUniformShaderDataRenderWorkerJob.js";
import * as CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.js";
import * as CreateLightRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs from "../../../../../../src/job/worker/render/draw/CreateLightRenderObjectBufferTypeArrayRenderWorkerJob.js";

var stubSelfPostMessage = function (sandbox){
              if(typeof window.fake_self_wonder !== "undefined"){
                return window.fake_self_wonder.postMessage;
              }

              var postMessage = sandbox.stub();

                window.fake_self_wonder = {
                  "postMessage": postMessage
                }

                return postMessage
              };

function prepareForUseProgramCase(sandbox, prepareFunc, state) {
  var state$1 = Curry._2(prepareFunc, sandbox, state);
  var createProgram = Sinon.returns(1, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
  var useProgram = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
  var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Js_primitive.some(useProgram), undefined, undefined, /* () */0), state$1);
  return /* tuple */[
          state$2,
          1,
          useProgram
        ];
}

function init(completeFunc, state) {
  var initData = {
    data: SendInitRenderDataMainWorkerJob$Wonderjs._buildData("", {
          getContext: (function () {
              return GlTool$Wonderjs.unsafeGetGl(state);
            })
        }, MainStateTool$Wonderjs.getStateData(/* () */0))
  };
  var renderWorkerState = RenderWorkerStateTool$Wonderjs.getState(/* () */0);
  renderWorkerState[/* workerDetectRecord */25] = /* record */[/* isUseWorker */true];
  RenderWorkerStateTool$Wonderjs.setState(renderWorkerState);
  var state$1 = WorkerJobTool$Wonderjs.create(WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, WorkerJobTool$Wonderjs.buildMainInitPipelinesConfigWithoutCreateWorkerInstanceAndMessage(/* () */0), WorkerJobTool$Wonderjs.buildMainLoopPipelinesConfigWithoutMessageExceptDisposeMessage(/* () */0), undefined, undefined, undefined, undefined, /* () */0), state);
  MainStateTool$Wonderjs.setState(state$1);
  return Most.drain(WorkerJobWorkerTool$Wonderjs.getMainInitJobStream(MainStateTool$Wonderjs.getStateData(/* () */0), /* tuple */[
                    WorkerJobHandleSystem$Wonderjs.createMainInitJobHandleMap,
                    WorkerJobHandleSystem$Wonderjs.getMainInitJobHandle
                  ], MainStateTool$Wonderjs.unsafeGetState(/* () */0))).then((function () {
                return Most.drain(MostRenderWorkerTool$Wonderjs.concatStreamFuncArray(initData, RenderWorkerStateTool$Wonderjs.getStateData(/* () */0), /* array */[
                                  (function (param, param$1) {
                                      return CreateGlRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return SetViewportRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitTransformRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitStateRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return GetRenderConfigDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return GetSettingDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return GetMaterialDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return GetBrowserDetectDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return PregetGLSLDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitInstanceRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitGeometryRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitMeshRendererRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitBasicMaterialRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitBasicMaterialRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitDirectionLightRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitPointLightRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitLightMaterialRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitTextureRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    }),
                                  (function (param, param$1) {
                                      return InitIMGUIRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                                    })
                                ])).then((function () {
                              return Curry._1(completeFunc, MainStateTool$Wonderjs.setState(SendInitRenderDataMainWorkerJob$Wonderjs._clearData(MainStateTool$Wonderjs.unsafeGetState(/* () */0))));
                            }));
              }));
}

function execMainLoopJobs(sandbox, completeFunc) {
  var state = MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0);
  var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(state);
  var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
  return Most.drain(WorkerJobWorkerTool$Wonderjs.getMainLoopJobStream(MainStateTool$Wonderjs.getStateData(/* () */0), /* tuple */[
                    WorkerJobHandleSystem$Wonderjs.createMainLoopJobHandleMap,
                    WorkerJobHandleSystem$Wonderjs.getMainLoopJobHandle
                  ], state)).then((function () {
                return Curry._1(completeFunc, postMessageToRenderWorker);
              }));
}

function render(sandbox, postMessageToRenderWorker, completeFunc) {
  var state = MainStateTool$Wonderjs.unsafeGetState(/* () */0);
  var match = SendRenderDataMainWorkerJob$Wonderjs._buildData("", state);
  var drawData = {
    data: match[1]
  };
  stubSelfPostMessage(sandbox[0]);
  var partial_arg = /* array */["FINISH_RENDER"];
  return Most.drain(MostRenderWorkerTool$Wonderjs.concatStreamFuncArray(drawData, RenderWorkerStateTool$Wonderjs.getStateData(/* () */0), /* array */[
                    (function (param, param$1) {
                        return GetCustomDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return GetAmbientLightDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return GetDirectionLightDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return GetPointLightDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return GetInstanceDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return InitMaterialForRenderRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return InitTextureForRenderRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return CreateLightRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return GetCameraDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return SendUniformShaderDataRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return RenderBasicRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return FrontRenderLightRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return RenderIMGUIRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return CommitRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return SendFinishRenderDataRenderWorkerJob$Wonderjs.execJob(partial_arg, param, param$1);
                      })
                  ])).then((function () {
                return Curry._1(completeFunc, postMessageToRenderWorker);
              }));
}

function mainLoopAndRender(completeFunc, _, sandbox, $staropt$star, _$1) {
  var beforeExecRenderRenderWorkerJobsFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  return execMainLoopJobs(sandbox, (function (postMessageToRenderWorker) {
                Curry._1(beforeExecRenderRenderWorkerJobsFunc, postMessageToRenderWorker);
                return render(sandbox, postMessageToRenderWorker, completeFunc);
              }));
}

function dispose(postMessageToRenderWorker, completeFunc) {
  var args = List.hd(Sinon.getSpecificArg(0, Sinon.withOneArg({
                operateType: "DISPOSE",
                geometryNeedDisposeVboBufferArr: Sinon$1.match.any,
                sourceInstanceNeedDisposeVboBufferArr: Sinon$1.match.any
              }, postMessageToRenderWorker)));
  var disposeData = {
    data: args
  };
  return Most.drain(MostRenderWorkerTool$Wonderjs.concatStreamFuncArray(disposeData, RenderWorkerStateTool$Wonderjs.getStateData(/* () */0), /* array */[
                    (function (param, param$1) {
                        return DisposeVboRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return DisposeSourceInstanceRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      })
                  ])).then((function () {
                return Curry._1(completeFunc, postMessageToRenderWorker);
              }));
}

function mainLoopAndDispose(completeFunc, _, sandbox, $staropt$star, _$1) {
  var beforeExecRenderRenderWorkerJobsFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  return execMainLoopJobs(sandbox, (function (postMessageToRenderWorker) {
                Curry._1(beforeExecRenderRenderWorkerJobsFunc, postMessageToRenderWorker);
                return dispose(postMessageToRenderWorker, completeFunc);
              }));
}

function initAndMainLoopAndRender(completeFunc, state, sandbox, $staropt$star, _) {
  var beforeExecRenderRenderWorkerJobsFunc = $staropt$star !== undefined ? $staropt$star : (function () {
        return /* () */0;
      });
  return init((function (state) {
                return mainLoopAndRender(completeFunc, state, sandbox, beforeExecRenderRenderWorkerJobsFunc, /* () */0);
              }), state);
}

export {
  stubSelfPostMessage ,
  prepareForUseProgramCase ,
  init ,
  execMainLoopJobs ,
  render ,
  mainLoopAndRender ,
  dispose ,
  mainLoopAndDispose ,
  initAndMainLoopAndRender ,
  
}
/* most Not a pure module */
