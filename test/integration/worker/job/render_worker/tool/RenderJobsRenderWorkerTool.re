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
           ~mainLoopPipelines=WorkerJobTool.buildMainLoopPipelinesConfigWithoutMessageExceptDisposeMessage(),
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
           PregetGLSLDataRenderWorkerJob.execJob(None),
           InitBasicMaterialRenderWorkerJob.execJob(None)
         |]
         |> concatStreamFuncArray(initData, RenderWorkerStateTool.getStateData())
         |> Most.drain
         |> then_((_) => completeFunc(MainStateTool.unsafeGetState()))
     )
};

let execMainLoopJobs = (completeFunc) =>{
  MainInitJobToolMainWorker.prepare();
  MainStateTool.unsafeGetState()
  |> WorkerJobToolWorker.getMainLoopJobStream(
       MainStateTool.getStateData(),
       (
         WorkerJobHandleSystem.createMainLoopJobHandleMap,
         WorkerJobHandleSystem.getMainLoopJobHandle
       )
     )
  |> Most.drain
  |> then_(() => completeFunc(MainStateTool.unsafeGetState()));
};

let render = (completeFunc) => {
  let state = MainStateTool.unsafeGetState();
  let drawData = {
    "data": SendRenderDataMainWorkerJob._buildData("", MainStateTool.getStateData())
  };
  [|
    CreateBasicRenderObjectBufferTypeArrayRenderWorkerJob.execJob(None),
    GetCameraDataRenderWorkerJob.execJob(None),
    SendUniformShaderDataRenderWorkerJob.execJob(None),
    RenderBasicRenderWorkerJob.execJob(None)
  |]
  |> concatStreamFuncArray(drawData, RenderWorkerStateTool.getStateData())
  |> Most.drain
  |> then_(() => completeFunc(MainStateTool.unsafeGetState()))
};

let loop = (~completeFunc, ~state, ~beforeExecRenderRenderWorkerJobsFunc=(state) => (), ()) =>
  execMainLoopJobs(
    (state) => {
      beforeExecRenderRenderWorkerJobsFunc(state);
      render(completeFunc)
    }
  );

let initAndLoop = (~completeFunc, ~state, ~beforeExecRenderRenderWorkerJobsFunc=(state) => (), ()) =>
  init((state) => loop(~completeFunc, ~state, ~beforeExecRenderRenderWorkerJobsFunc, ()), state);