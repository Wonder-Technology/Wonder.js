open StateDataMainType;

open Js.Promise;

open MostRenderWorkerTool;

let prepareForUseProgram = (sandbox, prepareFunc, state) => {
  open Sinon;
  let state = prepareFunc(sandbox, state);
  let program = Obj.magic(1);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox) |> returns(program);
  let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlToolWorker.setFakeGl(
         FakeGlToolWorker.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ())
       );
  let state = MainStateTool.setState(state);
  (state, program, useProgram)
};

let init = (completeFunc, state) => {
  let initData = {
    "data":
      SendInitRenderDataMainWorkerJob._buildData(
        "",
        {"getContext": (_) => [@bs] GlTool.unsafeGetGl(state) |> Obj.magic},
        MainStateTool.getStateData()
      )
  };
  let renderWorkerState = RenderWorkerStateTool.createStateAndSetToStateData();
  renderWorkerState.workerDetectRecord = Some({isUseWorker: true});
  let state =
    state
    |> WorkerJobTool.create(
         WorkerJobTool.buildWorkerJobConfig(
           ~mainInitPipelines=
             WorkerJobTool.buildMainInitPipelinesConfigWithoutCreateWorkerInstanceAndMessage(),
           ~mainLoopPipelines=WorkerJobTool.buildMainLoopPipelinesConfigWithoutMessage(),
           ()
         )
       );
  let state = MainStateTool.setState(state);
  MainStateTool.unsafeGetState()
  |> WorkerJobToolWorker.getMainInitJobStream(MainStateTool.getStateData())
  |> Most.drain
  |> then_(
       (_) =>
         [|
           CreateGlRenderWorkerJob.execJob(None),
           InitTransformRenderWorkerJob.execJob(None),
           GetRenderConfigDataRenderWorkerJob.execJob(None),
           PregetGLSLDataRenderWorkerJob.execJob(None),
           InitBasicMaterialRenderWorkerJob.execJob(None)
         |]
         |> concatStreamFuncArray(initData, RenderWorkerStateTool.getStateData())
         |> Most.drain
         |> then_((_) => completeFunc(MainStateTool.unsafeGetState()))
     )
};

let loop = (~completeFunc, ~state, ~beforeExecRenderRenderWorkerJobsFunc=(state) => (), ()) =>
  state
  |> WorkerJobToolWorker.getMainLoopJobStream(MainStateTool.getStateData())
  |> Most.drain
  |> then_
       (
         (_) => {
           beforeExecRenderRenderWorkerJobsFunc(state);
           let state = MainStateTool.unsafeGetState();
           let {vMatrix, pMatrix, position}: RenderCameraType.renderCameraRecord =
             OperateRenderMainService.unsafeGetCameraRecord(state);
           let drawData = {
             "data": SendRenderDataMainWorkerJob._buildData("", MainStateTool.getStateData())
           };
           [|
             CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.execJob(None),
             GetCameraDataRenderWorkerJob.execJob(None),
             RenderBasicRenderWorkerJob.execJob(None)
           |]
           |> concatStreamFuncArray(drawData, RenderWorkerStateTool.getStateData())
           |> Most.drain
           |> then_(() => completeFunc(MainStateTool.unsafeGetState()))
         }
       )
       /* beforeExecRenderRenderWorkerJobsFunc(state)
          |> Most.drain
          |> then_(
               (_) => {
                 let state = MainStateTool.unsafeGetState();
                 let {vMatrix, pMatrix, position}: RenderCameraType.renderCameraRecord =
                   OperateRenderMainService.unsafeGetCameraRecord(state);
                 let drawData = {
                   "data": SendRenderDataMainWorkerJob._buildData("", MainStateTool.getStateData())
                 };
                 [|
                   CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.execJob(None),
                   GetCameraDataRenderWorkerJob.execJob(None),
                   RenderBasicRenderWorkerJob.execJob(None)
                 |]
                 |> concatStreamFuncArray(drawData, RenderWorkerStateTool.getStateData())
                 |> Most.drain
                 |> then_(() => completeFunc(MainStateTool.unsafeGetState()))
               }
             ) */;

let initAndLoop = (~completeFunc, ~state, ~beforeExecRenderRenderWorkerJobsFunc=(state) => (), ()) =>
  init((state) => loop(~completeFunc, ~state, ~beforeExecRenderRenderWorkerJobsFunc, ()), state);