open StateDataMainType;

open Js.Promise;

open WonderBsMost.Most;

open SettingType;

let _collectAllRecords = stream =>
  stream |> reduce((arr, record) => arr |> ArrayService.push(record), [||]);

let _createFetchNoWorkerJobStreamArr = (dataDir, fetchFunc) => [|
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "no_worker/setting/setting.json"|]),
    fetchFunc,
  )
  |> map(json => ParseNoWorkerJobService.convertSettingToRecord(json)),
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "no_worker/pipeline/init_pipelines.json"|]),
    fetchFunc,
  )
  |> map(json => ParseNoWorkerJobService.convertInitPipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "no_worker/pipeline/loop_pipelines.json"|]),
    fetchFunc,
  )
  |> map(json => ParseNoWorkerJobService.convertLoopPipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "no_worker/job/init_jobs.json"|]),
    fetchFunc,
  )
  |> map(json => ParseNoWorkerJobService.convertInitJobsToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "no_worker/job/loop_jobs.json"|]),
    fetchFunc,
  )
  |> map(json => ParseNoWorkerJobService.convertLoopJobsToRecord(json))
  |> Obj.magic,
|];

let _createFetchRenderConfigStreamArr = (dataDir, fetchFunc) => [|
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "render/shader/shaders.json"|]),
    fetchFunc,
  )
  |> map(json => ParseRenderConfigService.convertShadersToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "render/shader/shader_libs.json"|]),
    fetchFunc,
  )
  |> map(json => ParseRenderConfigService.convertShaderLibsToRecord(json))
  |> Obj.magic,
|];

let _setSetting = (stateData, state: StateDataMainType.state, setting) => {
  IsDebugMainService.setIsDebug(
    stateData,
    OperateSettingService.unsafeGetIsDebug(setting),
  )
  |> ignore;
  {...state, settingRecord: OperateSettingService.setSetting(setting)};
};

let _createHandleNoWorkerJobConfigStreamArr = (dataDir, fetchFunc, state) =>
  fromPromise(
    _createFetchNoWorkerJobStreamArr(dataDir, fetchFunc)
    |> MostUtils.concatArray
    |> _collectAllRecords
    |> then_(recordArr =>
         {
           ...state,
           noWorkerJobRecord:
             RecordNoWorkerJobService.create(recordArr |> Obj.magic),
         }
         |> resolve
       ),
  );

let _createHandleRenderConfigStreamArr = (dataDir, fetchFunc, state) =>
  fromPromise(
    _createFetchRenderConfigStreamArr(dataDir, fetchFunc)
    |> MostUtils.concatArray
    |> _collectAllRecords
    |> then_(recordArr =>
         {
           ...state,
           renderConfigRecord:
             RecordRenderConfigService.create(recordArr |> Obj.magic),
         }
         |> resolve
       ),
  );

let _createFetchWorkerJobStreamArr = (dataDir, fetchFunc) => [|
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "worker/setting/setting.json"|]),
    fetchFunc,
  )
  |> map(json => ParseWorkerJobService.convertSettingToRecord(json)),
  FetchCommon.createFetchJsonStream(
    PathService.join([|
      dataDir,
      "worker/pipeline/main/main_init_pipelines.json",
    |]),
    fetchFunc,
  )
  |> map(json =>
       ParseWorkerJobService.convertMainInitPipelinesToRecord(json)
     )
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathService.join([|
      dataDir,
      "worker/pipeline/main/main_loop_pipelines.json",
    |]),
    fetchFunc,
  )
  |> map(json =>
       ParseWorkerJobService.convertMainLoopPipelinesToRecord(json)
     )
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "worker/job/main/main_init_jobs.json"|]),
    fetchFunc,
  )
  |> map(json => ParseWorkerJobService.convertMainInitJobsToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "worker/job/main/main_loop_jobs.json"|]),
    fetchFunc,
  )
  |> map(json => ParseWorkerJobService.convertMainLoopJobsToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathService.join([|
      dataDir,
      "worker/pipeline/worker/worker_pipelines.json",
    |]),
    fetchFunc,
  )
  |> map(json => ParseWorkerJobService.convertWorkerPipelinesToRecord(json))
  |> Obj.magic,
  FetchCommon.createFetchJsonStream(
    PathService.join([|dataDir, "worker/job/worker/worker_jobs.json"|]),
    fetchFunc,
  )
  |> map(json => ParseWorkerJobService.convertWorkerJobsToRecord(json))
  |> Obj.magic,
|];

let _createHandleWorkerJobConfigStreamArr = (dataDir, fetchFunc, state) =>
  fromPromise(
    _createFetchWorkerJobStreamArr(dataDir, fetchFunc)
    |> MostUtils.concatArray
    |> _collectAllRecords
    |> then_(recordArr =>
         {
           ...state,
           workerJobRecord:
             RecordWorkerJobService.create(recordArr |> Obj.magic),
         }
         |> resolve
       ),
  );

let _createHandleJobConfigStreamArr = (dataDir, fetchFunc, state) =>
  WorkerDetectMainService.isUseWorker(state) ?
    _createHandleWorkerJobConfigStreamArr(dataDir, fetchFunc, state) :
    _createHandleNoWorkerJobConfigStreamArr(dataDir, fetchFunc, state);

let _createRecordWithState = state =>
  state
  |> RecordTransformMainService.create
  |> RecordBasicMaterialMainService.create
  |> RecordLightMaterialMainService.create
  |> RecordDirectionLightMainService.create
  |> RecordPointLightMainService.create
  |> RecordMeshRendererMainService.create
  |> RecordSourceTextureMainService.create
  |> RecordBasicSourceTextureMainService.create
  |> RecordArrayBufferViewSourceTextureMainService.create
  |> RecordCubemapTextureMainService.create
  |> RecordSourceInstanceMainService.create
  |> RecordGeometryMainService.create
  |> RecordRenderMainService.create
  |> RecordSceneMainService.create;

let _createAndSetState = stateData =>
  StateDataMainService.setState(
    stateData,
    CreateStateMainService.createState(),
  )
  |> ignore;

let load = (jsonPathArr: array(string), fetchFunc, stateData) => {
  let settingFilePath = Array.unsafe_get(jsonPathArr, 0);
  let dataDir = Array.unsafe_get(jsonPathArr, 1);
  _createAndSetState(stateData);
  /* TODO perf: use mergeArray instead of concatArray */
  FetchCommon.createFetchJsonStream(settingFilePath, fetchFunc)
  |> flatMap(json =>
       ParseSettingService.convertToRecord(json)
       |> _setSetting(
            stateData,
            StateDataMainService.unsafeGetState(stateData),
          )
       |> WorkerDetectMainService.detect
       |> BrowserDetectMainService.detect
       |> _createRecordWithState
       |> _createHandleJobConfigStreamArr(dataDir, fetchFunc)
       |> WonderBsMost.Most.concatMap(state =>
            state |> _createHandleRenderConfigStreamArr(dataDir, fetchFunc)
          )
       |> WonderBsMost.Most.tap(state =>
            state |> StateDataMainService.setState(stateData) |> ignore
          )
     );
};