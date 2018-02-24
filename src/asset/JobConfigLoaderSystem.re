open Js.Promise;

open Most;

open SettingType;

/* let _createFetchLogicJobStreamArr = (dataDir, fetchFunc) => [|
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "logic/setting/logic_setting.json"|]),
       fetchFunc
     )
     |> map((json) => LogicJobConfigParseSystem.convertLogicSettingToRecord(json)),
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "logic/pipeline/init_pipelines.json"|]),
       fetchFunc
     )
     |> map((json) => LogicJobConfigParseSystem.convertInitPipelinesToRecord(json))
     |> Obj.magic,
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "logic/pipeline/update_pipelines.json"|]),
       fetchFunc
     )
     |> map((json) => LogicJobConfigParseSystem.convertUpdatePipelinesToRecord(json))
     |> Obj.magic,
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "logic/job/init_jobs.json"|]),
       fetchFunc
     )
     |> map((json) => LogicJobConfigParseSystem.convertInitJobsToRecord(json))
     |> Obj.magic,
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "logic/job/update_jobs.json"|]),
       fetchFunc
     )
     |> map((json) => LogicJobConfigParseSystem.convertUpdateJobsToRecord(json))
     |> Obj.magic
   |]; */
/* let _createFetchRenderJobStreamArr = (dataDir, fetchFunc) => [|
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "render/setting/render_setting.json"|]),
       fetchFunc
     )
     |> map((json) => RenderJobConfigParseSystem.convertRenderSettingToRecord(json)),
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "render/pipeline/init_pipelines.json"|]),
       fetchFunc
     )
     |> map((json) => RenderJobConfigParseSystem.convertInitPipelinesToRecord(json))
     |> Obj.magic,
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "render/pipeline/render_pipelines.json"|]),
       fetchFunc
     )
     |> map((json) => RenderJobConfigParseSystem.convertRenderPipelinesToRecord(json))
     |> Obj.magic,
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "render/job/init_jobs.json"|]),
       fetchFunc
     )
     |> map((json) => RenderJobConfigParseSystem.convertInitJobsToRecord(json))
     |> Obj.magic,
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "render/job/render_jobs.json"|]),
       fetchFunc
     )
     |> map((json) => RenderJobConfigParseSystem.convertRenderJobsToRecord(json))
     |> Obj.magic,
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "render/shader/shaders.json"|]),
       fetchFunc
     )
     |> map((json) => RenderJobConfigParseSystem.convertShadersToRecord(json))
     |> Obj.magic,
     FetchCommon.createFetchJsonStream(
       PathUtils.join([|dataDir, "render/shader/shader_libs.json"|]),
       fetchFunc
     )
     |> map((json) => RenderJobConfigParseSystem.convertShaderLibsToRecord(json))
     |> Obj.magic
   |]; */
let _collectAllRecords = (stream) =>
  stream |> reduce((arr, record) => arr |> ArraySystem.push(record), [||]);

/* let _addInitDataFunc = (initDataFunc, promise) =>
   promise |> then_((recordArr) => (recordArr, initDataFunc) |> resolve); */
/* TODO set all setting to one state->xxx(set together) */
let _setSetting =
    (stateData, state: StateDataType.state, {canvasId, isDebug, context, gpu, worker}) => {
  InitConfigSystem.setIsDebug(isDebug, stateData) |> ignore;
  state
  |> CanvasConfigSystem.setConfig(canvasId)
  |> GpuConfigSystem.setConfig(gpu)
  |> ViewSystem.setContextConfig(context)
  |> WorkerConfigSystem.setConfig(worker)
};

/* let _createHandleSingleJobConfigStreamArr = (state: StateDataType.state) =>
   mergeArray([|
     fromPromise(
       _createFetchLogicJobStreamArr(dataDir, fetchFunc)
       |> MostUtils.concatArray
       |> _collectAllRecords
       |> _addInitDataFunc(LogicJobConfigHelper.initData)
     ),
     fromPromise(
       _createFetchRenderJobStreamArr(dataDir, fetchFunc)
       |> MostUtils.concatArray
       |> _collectAllRecords
       |> _addInitDataFunc(RenderJobConfigHelper.initData)
     )
     |> Obj.magic
   |])
   |> reduce(
        (state, (recordArr, initDataFunc)) => initDataFunc(recordArr |> Obj.magic, state),
        state
      )
   |> then_((state) => state |> AllJobSystem.init |> resolve); */
let _createFetchWorkerJobStreamArr = (dataDir, fetchFunc) => [|
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "worker/setting/setting.json"|]),
    fetchFunc
  )
  |> map((json) => WorkerJobConfigParseSystem.convertSettingToRecord(json)),
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "worker/pipeline/main/main_init_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => WorkerJobConfigParseSystem.convertMainInitPipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "worker/job/main/main_init_jobs.json"|]),
    fetchFunc
  )
  |> map((json) => WorkerJobConfigParseSystem.convertMainInitJobsToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "worker/pipeline/worker/worker_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => WorkerJobConfigParseSystem.convertWorkerPipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "worker/job/worker/worker_jobs.json"|]),
    fetchFunc
  )
  |> map((json) => WorkerJobConfigParseSystem.convertWorkerJobsToRecord(json))
  |> Obj.magic
|];

let _createHandleWorkerJobConfigStreamArr = (dataDir, fetchFunc, state) =>
  fromPromise(
    _createFetchWorkerJobStreamArr(dataDir, fetchFunc)
    |> MostUtils.concatArray
    |> _collectAllRecords
    /* |> _addInitDataFunc(WorkerJobConfigHelper.initData) */
    |> then_(
         (recordArr) => WorkerJobConfigHelper.initData(recordArr |> Obj.magic, state) |> resolve
       )
  );

/* |> reduce(
     (state, (recordArr, initDataFunc)) => initDataFunc(recordArr |> Obj.magic, state),
     state
   ); */
/* |> then_((state) => state |> WorkerJobSystem.init(StateData.stateData) |> resolve); */
let _createHandleJobConfigStreamArr = (dataDir, fetchFunc, state) =>
  /* TODO create single stream */
  /* WorkerDetectSystem.isUseWorker(state) ?
     _createHandleWorkerJobConfigStreamArr(state) : _createHandleSingleJobConfigStreamArr(state); */
  _createHandleWorkerJobConfigStreamArr(dataDir, fetchFunc, state);

let load = (dataDir: string, fetchFunc, stateData) =>
  /* TODO load gloal_resources */
  /* TODO perf: use mergeArray instead of concatArray */
  FetchCommon.createFetchJsonStream(PathUtils.join([|dataDir, "setting.json"|]), fetchFunc)
  |> flatMap(
       (json) =>
         SettingParseSystem.convertToRecord(json)
         |> _setSetting(stateData, StateSystem.getState(stateData))
         |> WorkerDetectSystem.detect
         |> _createHandleJobConfigStreamArr(dataDir, fetchFunc)
         |> Most.tap((state) => state |> StateSystem.setState(stateData) |> ignore)
     );
/* |> reduce(
     (state, (recordArr, initDataFunc)) => initDataFunc(recordArr |> Obj.magic, state),
     StateSystem.getState(stateData)
   ); */