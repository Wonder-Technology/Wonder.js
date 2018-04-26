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
  let renderWorkerState = RenderWorkerStateTool.getState();
  renderWorkerState.workerDetectRecord = Some({isUseWorker: true});
  RenderWorkerStateTool.setState(renderWorkerState);
  let state =
    state
    |> WorkerJobTool.create(
         WorkerJobTool.buildWorkerJobConfig(
           ~mainInitPipelines=
             WorkerJobTool.buildMainInitPipelinesConfigWithoutCreateWorkerInstanceAndMessage(),
           ~mainLoopPipelines=
             WorkerJobTool.buildMainLoopPipelinesConfigWithoutMessageExceptDisposeMessage(),
           ()
         )
       );
  let state = MainStateTool.setState(state);
  MainStateTool.unsafeGetState()
  |> WorkerJobToolWorker.getMainInitJobStream(
       MainStateTool.getStateData(),
       (
         WorkerJobHandleSystem.createMainInitJobHandleMap,
         WorkerJobHandleSystem.getMainInitJobHandle
       )
     )
  |> Most.drain
  |> then_(
       (_) =>
         [|
           CreateGlRenderWorkerJob.execJob(None),
           InitTransformRenderWorkerJob.execJob(None),
           GetRenderConfigDataRenderWorkerJob.execJob(None),
           GetSettingDataRenderWorkerJob.execJob(None),
           PregetGLSLDataRenderWorkerJob.execJob(None),
           InitCustomGeometryRenderWorkerJob.execJob(None),
           InitBasicMaterialRenderWorkerJob.execJob(None),
           InitAmbientLightRenderWorkerJob.execJob(None),
           InitDirectionLightRenderWorkerJob.execJob(None),
           InitPointLightRenderWorkerJob.execJob(None),
           InitLightMaterialRenderWorkerJob.execJob(None)
         |]
         |> concatStreamFuncArray(initData, RenderWorkerStateTool.getStateData())
         |> Most.drain
         |> then_((_) => completeFunc(MainStateTool.unsafeGetState()))
     )
};

let execMainLoopJobs = (sandbox, completeFunc) => {
  let state = MainInitJobToolMainWorker.prepare();
  let renderWorker = WorkerInstanceToolMainWorker.unsafeGetRenderWorker(state);
  let postMessageToRenderWorker = WorkerToolWorker.stubPostMessage(sandbox, renderWorker);
  state
  |> WorkerJobToolWorker.getMainLoopJobStream(
       MainStateTool.getStateData(),
       (
         WorkerJobHandleSystem.createMainLoopJobHandleMap,
         WorkerJobHandleSystem.getMainLoopJobHandle
       )
     )
  |> Most.drain
  |> then_(() => completeFunc(postMessageToRenderWorker))
};

let render = (postMessageToRenderWorker, completeFunc) => {
  let state = MainStateTool.unsafeGetState();
  let drawData = {
    "data": SendRenderDataMainWorkerJob._buildData("", MainStateTool.getStateData())
  };
  [|
    GetDirectionLightDataRenderWorkerJob.execJob(None),
    GetPointLightDataRenderWorkerJob.execJob(None),
    GetInstanceDataRenderWorkerJob.execJob(None),
    CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.execJob(None),
    CreateLightRenderObjectBufferTypeArrayRenderWorkerJob.execJob(None),
    GetCameraDataRenderWorkerJob.execJob(None),
    SendUniformShaderDataRenderWorkerJob.execJob(None),
    RenderBasicRenderWorkerJob.execJob(None),
    FrontRenderLightRenderWorkerJob.execJob(None),
    CommitRenderWorkerJob.execJob(None)
  |]
  |> concatStreamFuncArray(drawData, RenderWorkerStateTool.getStateData())
  |> Most.drain
  |> then_(() => completeFunc(postMessageToRenderWorker))
};

let mainLoopAndRender =
    (~completeFunc, ~state, ~sandbox, ~beforeExecRenderRenderWorkerJobsFunc=(state) => (), ()) =>
  execMainLoopJobs(
    sandbox,
    (postMessageToRenderWorker) => {
      beforeExecRenderRenderWorkerJobsFunc(postMessageToRenderWorker);
      render(postMessageToRenderWorker, completeFunc)
    }
  );

let initAndMainLoopAndRender =
    (~completeFunc, ~state, ~sandbox, ~beforeExecRenderRenderWorkerJobsFunc=(state) => (), ()) =>
  init(
    (state) =>
      mainLoopAndRender(
        ~completeFunc,
        ~state,
        ~sandbox,
        ~beforeExecRenderRenderWorkerJobsFunc,
        ()
      ),
    state
  );