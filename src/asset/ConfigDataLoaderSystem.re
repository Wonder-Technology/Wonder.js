open Js.Promise;

open Most;

open SettingType;

let _collectAllRecords = (stream) =>
  stream |> reduce((arr, record) => arr |> ArraySystem.push(record), [||]);

let _createFetchNoWorkerJobStreamArr = (dataDir, fetchFunc) => [|
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "no_worker/setting/setting.json"|]),
    fetchFunc
  )
  |> map((json) => NoWorkerJobConfigParseSystem.convertSettingToRecord(json)),
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "no_worker/pipeline/init_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => NoWorkerJobConfigParseSystem.convertInitPipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "no_worker/pipeline/loop_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => NoWorkerJobConfigParseSystem.convertLoopPipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "no_worker/job/init_jobs.json"|]),
    fetchFunc
  )
  |> map((json) => NoWorkerJobConfigParseSystem.convertInitJobsToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "no_worker/job/loop_jobs.json"|]),
    fetchFunc
  )
  |> map((json) => NoWorkerJobConfigParseSystem.convertLoopJobsToRecord(json))
  |> Obj.magic
|];

let _createFetchRenderConfigDataStreamArr = (dataDir, fetchFunc) => [|
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "render/shader/shaders.json"|]),
    fetchFunc
  )
  |> map((json) => RenderConfigDataParseSystem.convertShadersToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathUtils.join([|dataDir, "render/shader/shader_libs.json"|]),
    fetchFunc
  )
  |> map((json) => RenderConfigDataParseSystem.convertShaderLibsToRecord(json))
  |> Obj.magic
|];

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

let _createHandleNoWorkerJobConfigStreamArr = (dataDir, fetchFunc, state) =>
  fromPromise(
    _createFetchNoWorkerJobStreamArr(dataDir, fetchFunc)
    |> MostUtils.concatArray
    |> _collectAllRecords
    |> then_(
         (recordArr) =>
           NoWorkerJobConfigHelper.create(recordArr |> Obj.magic, state)
           |> NoWorkerJobSystem.init
           |> resolve
       )
  );

let _createHandleRenderConfigDataStreamArr = (dataDir, fetchFunc, state) =>
  fromPromise(
    _createFetchRenderConfigDataStreamArr(dataDir, fetchFunc)
    |> MostUtils.concatArray
    |> _collectAllRecords
    |> then_(
         (recordArr) => RenderConfigDataHelper.create(recordArr |> Obj.magic, state) |> resolve
       )
  );

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
    |> then_(
         (recordArr) => WorkerJobConfigHelper.create(recordArr |> Obj.magic, state) |> resolve
       )
  );

let _createHandleJobConfigStreamArr = (dataDir, fetchFunc, state) =>
  WorkerDetectSystem.isUseWorker(state) ?
    _createHandleWorkerJobConfigStreamArr(dataDir, fetchFunc, state) :
    _createHandleNoWorkerJobConfigStreamArr(dataDir, fetchFunc, state);

let load = (dataDir: string, fetchFunc, stateData) =>
  /* TODO perf: use mergeArray instead of concatArray */
  FetchCommon.createFetchJsonStream(PathUtils.join([|dataDir, "setting.json"|]), fetchFunc)
  |> flatMap(
       (json) =>
         SettingParseSystem.convertToRecord(json)
         |> _setSetting(stateData, StateSystem.getState(stateData))
         |> WorkerDetectSystem.detect
         |> _createHandleJobConfigStreamArr(dataDir, fetchFunc)
         |> Most.concatMap(
              (state) => state |> _createHandleRenderConfigDataStreamArr(dataDir, fetchFunc)
            )
         |> Most.tap((state) => state |> StateSystem.setState(stateData) |> ignore)
     );