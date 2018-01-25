open Js.Promise;

open Most;

let _createFetchJsonStream = (jsonFilePath, fetchFunc) =>
  fromPromise([@bs] fetchFunc(jsonFilePath) |> then_(Fetch.Response.json));

let _createFetchLogicJobStreamArr = (dataDir, fetchFunc) => [|
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/setting/logic_setting.json"|]),
    fetchFunc
  )
  |> map((json) => LogicJobConfigParseUtils.convertLogicSettingToRecord(json)),
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/pipeline/init_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => LogicJobConfigParseUtils.convertInitPipelinesToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/pipeline/update_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => LogicJobConfigParseUtils.convertUpdatePipelinesToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "logic/job/init_jobs.json"|]), fetchFunc)
  |> map((json) => LogicJobConfigParseUtils.convertInitJobsToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "logic/job/update_jobs.json"|]), fetchFunc)
  |> map((json) => LogicJobConfigParseUtils.convertUpdateJobsToRecord(json))
  |> Obj.magic
|];

let _createFetchRenderJobStreamArr = (dataDir, fetchFunc) => [|
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "render/setting/render_setting.json"|]),
    fetchFunc
  )
  |> map((json) => RenderJobConfigParseUtils.convertRenderSettingToRecord(json)),
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "render/pipeline/init_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => RenderJobConfigParseUtils.convertInitPipelinesToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "render/pipeline/render_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => RenderJobConfigParseUtils.convertRenderPipelinesToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "render/job/init_jobs.json"|]), fetchFunc)
  |> map((json) => RenderJobConfigParseUtils.convertInitJobsToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "render/job/render_jobs.json"|]), fetchFunc)
  |> map((json) => RenderJobConfigParseUtils.convertRenderJobsToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "render/shader/shaders.json"|]), fetchFunc)
  |> map((json) => RenderJobConfigParseUtils.convertShadersToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "render/shader/shader_libs.json"|]), fetchFunc)
  |> map((json) => RenderJobConfigParseUtils.convertShaderLibsToRecord(json))
  |> Obj.magic
|];

let load = (dataDir: string, fetchFunc, state: StateDataType.state) =>
  /* TODO load gloal_resources */
  /* TODO refactor:
     remove Obj.magic?
     */
  /* TODO refactor: use System instead of Utils,Helper */
  mergeArray([|
    fromPromise(
      mergeArray(_createFetchLogicJobStreamArr(dataDir, fetchFunc))
      /* TODO duplicate */
      |> reduce((arr, record) => arr |> ArraySystem.push(record), [||])
      |> then_((recordArr) => (recordArr, LogicJobConfigHelper.initData) |> resolve)
    ),
    fromPromise(
      mergeArray(_createFetchRenderJobStreamArr(dataDir, fetchFunc))
      |> reduce((arr, record) => arr |> ArraySystem.push(record), [||])
      |> then_((recordArr) => (recordArr, RenderJobConfigHelper.initData) |> resolve)
    )
    |> Obj.magic
  |])
  |> reduce(
       (state, (recordArr, initDataFunc)) => initDataFunc(recordArr |> Obj.magic, state),
       state
     )
  |> then_((state) => state |> JobSystem.init |> resolve);