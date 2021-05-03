'use strict';

var List = require("bs-platform/lib/js/list.js");
var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var GlTool$Wonderjs = require("../../../../../tool/gl/GlTool.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var WorkerJobTool$Wonderjs = require("../../../../../tool/service/workerJob/WorkerJobTool.js");
var FakeGlWorkerTool$Wonderjs = require("../../../tool/FakeGlWorkerTool.js");
var HandleJobService$Wonderjs = require("../../../../../../src/service/primitive/job/HandleJobService.js");
var WorkerWorkerTool$Wonderjs = require("../../../tool/WorkerWorkerTool.js");
var WorkerJobWorkerTool$Wonderjs = require("../../../tool/WorkerJobWorkerTool.js");
var MostRenderWorkerTool$Wonderjs = require("./MostRenderWorkerTool.js");
var CommitRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/CommitRenderWorkerJob.js");
var RenderWorkerStateTool$Wonderjs = require("../../../../../tool/service/state/RenderWorkerStateTool.js");
var WorkerJobHandleSystem$Wonderjs = require("../../../../../../src/job/worker/WorkerJobHandleSystem.js");
var CreateGlRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/CreateGlRenderWorkerJob.js");
var InitIMGUIRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitIMGUIRenderWorkerJob.js");
var InitStateRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitStateRenderWorkerJob.js");
var DisposeVboRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/dispose/DisposeVboRenderWorkerJob.js");
var GPUDetectRenderWorkerTool$Wonderjs = require("../../../tool/GPUDetectRenderWorkerTool.js");
var MainInitJobMainWorkerTool$Wonderjs = require("../../main_worker/tool/MainInitJobMainWorkerTool.js");
var DisposeRenderWorkerJobTool$Wonderjs = require("./DisposeRenderWorkerJobTool.js");
var InitTextureRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitTextureRenderWorkerJob.js");
var RenderBasicRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/render_basic/RenderBasicRenderWorkerJob.js");
var RenderIMGUIRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/RenderIMGUIRenderWorkerJob.js");
var SetViewportRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/SetViewportRenderWorkerJob.js");
var InitGeometryRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitGeometryRenderWorkerJob.js");
var InitInstanceRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitInstanceRenderWorkerJob.js");
var RenderSkyboxRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/RenderSkyboxRenderWorkerJob.js");
var SendRenderDataMainWorkerJob$Wonderjs = require("../../../../../../src/job/worker/main/loop/SendRenderDataMainWorkerJob.js");
var GetCameraDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/GetCameraDataRenderWorkerJob.js");
var GetCustomDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/GetCustomDataRenderWorkerJob.js");
var InitTransformRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitTransformRenderWorkerJob.js");
var WorkerInstanceMainWorkerTool$Wonderjs = require("../../main_worker/tool/WorkerInstanceMainWorkerTool.js");
var DisposeTextureRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/dispose/DisposeTextureRenderWorkerJob.js");
var GetSettingDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/GetSettingDataRenderWorkerJob.js");
var InitPointLightRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitPointLightRenderWorkerJob.js");
var PregetGLSLDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/PregetGLSLDataRenderWorkerJob.js");
var GetInstanceDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/GetInstanceDataRenderWorkerJob.js");
var GetMaterialDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/GetMaterialDataRenderWorkerJob.js");
var FrontRenderLightRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/front_render_light/FrontRenderLightRenderWorkerJob.js");
var InitMeshRendererRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitMeshRendererRenderWorkerJob.js");
var SendInitRenderDataMainWorkerJob$Wonderjs = require("../../../../../../src/job/worker/main/init/SendInitRenderDataMainWorkerJob.js");
var GetPointLightDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/GetPointLightDataRenderWorkerJob.js");
var InitBasicMaterialRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitBasicMaterialRenderWorkerJob.js");
var InitLightMaterialRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitLightMaterialRenderWorkerJob.js");
var InitDirectionLightRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitDirectionLightRenderWorkerJob.js");
var GetAmbientLightDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/GetAmbientLightDataRenderWorkerJob.js");
var GetRenderConfigDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/GetRenderConfigDataRenderWorkerJob.js");
var GetBrowserDetectDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/GetBrowserDetectDataRenderWorkerJob.js");
var InitNoMaterialShaderRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/init/InitNoMaterialShaderRenderWorkerJob.js");
var InitTextureForRenderRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/InitTextureForRenderRenderWorkerJob.js");
var SendFinishRenderDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/SendFinishRenderDataRenderWorkerJob.js");
var DisposeSourceInstanceRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/dispose/DisposeSourceInstanceRenderWorkerJob.js");
var GetDirectionLightDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/GetDirectionLightDataRenderWorkerJob.js");
var InitMaterialForRenderRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/InitMaterialForRenderRenderWorkerJob.js");
var SendUniformShaderDataRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/SendUniformShaderDataRenderWorkerJob.js");
var CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.js");
var CreateLightRenderObjectBufferTypeArrayRenderWorkerJob$Wonderjs = require("../../../../../../src/job/worker/render/draw/CreateLightRenderObjectBufferTypeArrayRenderWorkerJob.js");

function stubSelfPostMessage (sandbox){
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
  var state$2 = FakeGlWorkerTool$Wonderjs.setFakeGl(FakeGlWorkerTool$Wonderjs.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(createProgram), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, Caml_option.some(useProgram), undefined, undefined, undefined, undefined, /* () */0), state$1);
  return /* tuple */[
          state$2,
          1,
          useProgram
        ];
}

function initWithJob(jobFuncArr, completeFunc, state) {
  var state$1 = MainStateTool$Wonderjs.setState(state);
  var initData = {
    data: SendInitRenderDataMainWorkerJob$Wonderjs._buildData("", {
          getContext: (function (param) {
              return GlTool$Wonderjs.unsafeGetGl(state$1);
            })
        }, MainStateTool$Wonderjs.getStateData(/* () */0))
  };
  var renderWorkerState = RenderWorkerStateTool$Wonderjs.getState(/* () */0);
  renderWorkerState[/* workerDetectRecord */27] = /* record */[/* isUseWorker */true];
  var renderWorkerState$1 = GPUDetectRenderWorkerTool$Wonderjs.setMaxTextureUnit(16, renderWorkerState);
  RenderWorkerStateTool$Wonderjs.setState(renderWorkerState$1);
  var state$2 = WorkerJobTool$Wonderjs.create(WorkerJobTool$Wonderjs.buildWorkerJobConfig(undefined, WorkerJobTool$Wonderjs.buildMainInitPipelinesConfigWithoutCreateWorkerInstanceAndMessage(/* () */0), WorkerJobTool$Wonderjs.buildMainLoopPipelinesConfigWithoutMessageExceptDisposeMessage(/* () */0), undefined, undefined, undefined, undefined, /* () */0), state$1);
  MainStateTool$Wonderjs.setState(state$2);
  return Most.drain(WorkerJobWorkerTool$Wonderjs.getMainInitJobStream(MainStateTool$Wonderjs.getStateData(/* () */0), /* tuple */[
                    WorkerJobHandleSystem$Wonderjs.createMainInitJobHandleMap,
                    WorkerJobHandleSystem$Wonderjs.getMainInitJobHandle
                  ], MainStateTool$Wonderjs.unsafeGetState(/* () */0))).then((function (param) {
                return Most.drain(MostRenderWorkerTool$Wonderjs.concatStreamFuncArray(initData, RenderWorkerStateTool$Wonderjs.getStateData(/* () */0), jobFuncArr)).then((function (param) {
                              return Curry._1(completeFunc, MainStateTool$Wonderjs.setState(SendInitRenderDataMainWorkerJob$Wonderjs._clearData(MainStateTool$Wonderjs.unsafeGetState(/* () */0))));
                            }));
              }));
}

function getJobFuncArrExceptInitNoMaterialShader(param) {
  return /* array */[
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
        ];
}

function getJobFuncArr(param) {
  return /* array */[
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
              return InitNoMaterialShaderRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
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
        ];
}

function init(completeFunc, state) {
  return initWithJob(getJobFuncArr(/* () */0), completeFunc, state);
}

function execMainLoopJobsWithJobHandleMap(sandbox, jobHandleMap, completeFunc) {
  var state = MainInitJobMainWorkerTool$Wonderjs.prepare(/* () */0);
  var renderWorker = WorkerInstanceMainWorkerTool$Wonderjs.unsafeGetRenderWorker(state);
  var postMessageToRenderWorker = WorkerWorkerTool$Wonderjs.stubPostMessage(sandbox, renderWorker);
  return Most.drain(WorkerJobWorkerTool$Wonderjs.getMainLoopJobStream(MainStateTool$Wonderjs.getStateData(/* () */0), /* tuple */[
                    (function (param) {
                        return jobHandleMap;
                      }),
                    WorkerJobHandleSystem$Wonderjs.getMainLoopJobHandle
                  ], state)).then((function (param) {
                return Curry._1(completeFunc, postMessageToRenderWorker);
              }));
}

function execMainLoopJobs(sandbox, completeFunc) {
  return execMainLoopJobsWithJobHandleMap(sandbox, WorkerJobHandleSystem$Wonderjs.createMainLoopJobHandleMap(/* () */0), completeFunc);
}

var createMainLoopJobHandleMap = HandleJobService$Wonderjs.createJobHandleMap;

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
                        return RenderSkyboxRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
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
                  ])).then((function (param) {
                return Curry._1(completeFunc, postMessageToRenderWorker);
              }));
}

function mainLoopAndRender(completeFunc, state, sandbox, $staropt$star, param) {
  var beforeExecRenderRenderWorkerJobsFunc = $staropt$star !== undefined ? $staropt$star : (function (state) {
        return /* () */0;
      });
  MainStateTool$Wonderjs.setState(state);
  return execMainLoopJobs(sandbox, (function (postMessageToRenderWorker) {
                Curry._1(beforeExecRenderRenderWorkerJobsFunc, postMessageToRenderWorker);
                return render(sandbox, postMessageToRenderWorker, completeFunc);
              }));
}

function dispose(postMessageToRenderWorker, completeFunc) {
  var args = List.hd(Sinon.getSpecificArg(0, Sinon.withOneArg(DisposeRenderWorkerJobTool$Wonderjs.buildDisposeData(Sinon$1.match.any, Sinon$1.match.any, Sinon$1.match.any, Sinon$1.match.any, /* () */0), postMessageToRenderWorker)));
  var disposeData = {
    data: args
  };
  return Most.drain(MostRenderWorkerTool$Wonderjs.concatStreamFuncArray(disposeData, RenderWorkerStateTool$Wonderjs.getStateData(/* () */0), /* array */[
                    (function (param, param$1) {
                        return DisposeVboRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return DisposeSourceInstanceRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      }),
                    (function (param, param$1) {
                        return DisposeTextureRenderWorkerJob$Wonderjs.execJob(undefined, param, param$1);
                      })
                  ])).then((function (param) {
                return Curry._1(completeFunc, postMessageToRenderWorker);
              }));
}

function mainLoopAndDispose(completeFunc, state, sandbox, $staropt$star, param) {
  var beforeExecRenderRenderWorkerJobsFunc = $staropt$star !== undefined ? $staropt$star : (function (state) {
        return /* () */0;
      });
  MainStateTool$Wonderjs.setState(state);
  return execMainLoopJobs(sandbox, (function (postMessageToRenderWorker) {
                Curry._1(beforeExecRenderRenderWorkerJobsFunc, postMessageToRenderWorker);
                return dispose(postMessageToRenderWorker, completeFunc);
              }));
}

function initWithJobAndMainLoopAndRender(completeFunc, state, sandbox, jobFuncArr, $staropt$star, param) {
  var beforeExecRenderRenderWorkerJobsFunc = $staropt$star !== undefined ? $staropt$star : (function (state) {
        return /* () */0;
      });
  return initWithJob(jobFuncArr, (function (state) {
                return mainLoopAndRender(completeFunc, state, sandbox, beforeExecRenderRenderWorkerJobsFunc, /* () */0);
              }), state);
}

function initAndMainLoopAndRender(completeFunc, state, sandbox, $staropt$star, param) {
  var beforeExecRenderRenderWorkerJobsFunc = $staropt$star !== undefined ? $staropt$star : (function (state) {
        return /* () */0;
      });
  return initWithJobAndMainLoopAndRender(completeFunc, state, sandbox, getJobFuncArr(/* () */0), beforeExecRenderRenderWorkerJobsFunc, /* () */0);
}

exports.stubSelfPostMessage = stubSelfPostMessage;
exports.prepareForUseProgramCase = prepareForUseProgramCase;
exports.initWithJob = initWithJob;
exports.getJobFuncArrExceptInitNoMaterialShader = getJobFuncArrExceptInitNoMaterialShader;
exports.getJobFuncArr = getJobFuncArr;
exports.init = init;
exports.execMainLoopJobsWithJobHandleMap = execMainLoopJobsWithJobHandleMap;
exports.execMainLoopJobs = execMainLoopJobs;
exports.createMainLoopJobHandleMap = createMainLoopJobHandleMap;
exports.render = render;
exports.mainLoopAndRender = mainLoopAndRender;
exports.dispose = dispose;
exports.mainLoopAndDispose = mainLoopAndDispose;
exports.initWithJobAndMainLoopAndRender = initWithJobAndMainLoopAndRender;
exports.initAndMainLoopAndRender = initAndMainLoopAndRender;
/* most Not a pure module */
