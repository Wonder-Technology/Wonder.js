open StateDataMainType;

open Js.Promise;

open MostRenderWorkerTool;

let prepareForUseProgramCase = (sandbox, prepareFunc, state) => {
  open Sinon;
  let state = prepareFunc(sandbox, state);
  let program = Obj.magic(1);
  let createProgram = createEmptyStubWithJsObjSandbox(sandbox) |> returns(program);
  let useProgram = createEmptyStubWithJsObjSandbox(sandbox);
  let state =
    state
    |> FakeGlWorkerTool.setFakeGl(
         FakeGlWorkerTool.buildFakeGl(~sandbox, ~createProgram, ~useProgram, ())
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
  /* let renderWorkerState = RenderWorkerStateTool.createStateAndSetToStateData(); */
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
  |> WorkerJobWorkerTool.getMainInitJobStream(
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
           SetViewportRenderWorkerJob.execJob(None),
           InitTransformRenderWorkerJob.execJob(None),
           InitStateRenderWorkerJob.execJob(None),
           GetRenderConfigDataRenderWorkerJob.execJob(None),
           GetSettingDataRenderWorkerJob.execJob(None),
           GetMaterialDataRenderWorkerJob.execJob(None),
           GetBrowserDetectDataRenderWorkerJob.execJob(None),
           PregetGLSLDataRenderWorkerJob.execJob(None),
           InitInstanceRenderWorkerJob.execJob(None),
           InitCustomGeometryRenderWorkerJob.execJob(None),
           InitBasicMaterialRenderWorkerJob.execJob(None),
           InitDirectionLightRenderWorkerJob.execJob(None),
           InitPointLightRenderWorkerJob.execJob(None),
           InitLightMaterialRenderWorkerJob.execJob(None),
           InitTextureRenderWorkerJob.execJob(None)
         |]
         |> concatStreamFuncArray(initData, RenderWorkerStateTool.getStateData())
         |> Most.drain
         |> then_(
              (_) =>
                MainStateTool.unsafeGetState()
                |> SendInitRenderDataMainWorkerJob._clearData
                |> MainStateTool.setState
                |> completeFunc
            )
     )
};

let execMainLoopJobs = (sandbox, completeFunc) => {
  let state = MainInitJobMainWorkerTool.prepare();
  let renderWorker = WorkerInstanceMainWorkerTool.unsafeGetRenderWorker(state);
  let postMessageToRenderWorker = WorkerWorkerTool.stubPostMessage(sandbox, renderWorker);
  state
  |> WorkerJobWorkerTool.getMainLoopJobStream(
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
    InitMaterialForRenderRenderWorkerJob.execJob(None),
    InitTextureForRenderRenderWorkerJob.execJob(None),
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

let dispose = (postMessageToRenderWorker, completeFunc) => {
  open Sinon;
  let args =
    postMessageToRenderWorker
    |> withOneArg({
         "operateType": "DISPOSE",
         "boxGeometryNeedDisposeVboBufferArr": Sinon.matchAny,
         "customGeometryNeedDisposeVboBufferArr": Sinon.matchAny,
         "sourceInstanceNeedDisposeVboBufferArr": Sinon.matchAny
       })
    |> Obj.magic
    |> getSpecificArg(0)
    |> List.hd;
  let disposeData = {
    "data": args
    /* DisposeAndSendDisposeDataMainWorkerJob._buildData(
         "",
         (
           boxGeometryNeedDisposeVboBufferArr,
           customGeometryNeedDisposeVboBufferArr,
           sourceInstanceNeedDisposeVboBufferArr
         )
       ) */
  };
  [|DisposeVboRenderWorkerJob.execJob(None), DisposeSourceInstanceRenderWorkerJob.execJob(None)|]
  |> concatStreamFuncArray(disposeData, RenderWorkerStateTool.getStateData())
  |> Most.drain
  |> then_(() => completeFunc(postMessageToRenderWorker))
};

let mainLoopAndDispose =
    (~completeFunc, ~state, ~sandbox, ~beforeExecRenderRenderWorkerJobsFunc=(state) => (), ()) =>
  execMainLoopJobs(
    sandbox,
    (postMessageToRenderWorker) => {
      beforeExecRenderRenderWorkerJobsFunc(postMessageToRenderWorker);
      dispose(postMessageToRenderWorker, completeFunc)
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