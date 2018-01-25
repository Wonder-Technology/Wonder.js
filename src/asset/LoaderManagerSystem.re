open Js.Promise;

open Most;

let _createFetchJsonStream = (jsonFilePath, fetchFunc) =>
  fromPromise([@bs] fetchFunc(jsonFilePath) |> then_(Fetch.Response.json));

let _createFetchLogicJobStreamArr = (dataDir, fetchFunc) => [|
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/setting/logic_setting.json"|]),
    fetchFunc
  )
  |> map((json) => LogicConfigParseUtils.convertLogicSettingToRecord(json)),
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/pipeline/init_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => LogicConfigParseUtils.convertInitPipelinesToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "logic/pipeline/update_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => LogicConfigParseUtils.convertUpdatePipelinesToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "logic/job/init_jobs.json"|]), fetchFunc)
  |> map((json) => LogicConfigParseUtils.convertInitJobsToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "logic/job/update_jobs.json"|]), fetchFunc)
  |> map((json) => LogicConfigParseUtils.convertUpdateJobsToRecord(json))
  |> Obj.magic
|];

let _createFetchRenderJobStreamArr = (dataDir, fetchFunc) => [|
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "render/setting/render_setting.json"|]),
    fetchFunc
  )
  |> map((json) => RenderConfigParseUtils.convertRenderSettingToRecord(json)),
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "render/pipeline/init_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => RenderConfigParseUtils.convertInitPipelinesToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(
    PathUtils.join([|dataDir, "render/pipeline/render_pipelines.json"|]),
    fetchFunc
  )
  |> map((json) => RenderConfigParseUtils.convertRenderPipelinesToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "render/job/init_jobs.json"|]), fetchFunc)
  |> map((json) => RenderConfigParseUtils.convertInitJobsToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "render/job/render_jobs.json"|]), fetchFunc)
  |> map((json) => RenderConfigParseUtils.convertRenderJobsToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "render/shader/shaders.json"|]), fetchFunc)
  |> map((json) => RenderConfigParseUtils.convertShadersToRecord(json))
  |> Obj.magic,
  _createFetchJsonStream(PathUtils.join([|dataDir, "render/shader/shader_libs.json"|]), fetchFunc)
  |> map((json) => RenderConfigParseUtils.convertShaderLibsToRecord(json))
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
      |> then_((recordArr) => (recordArr, LogicConfigHelper.initData) |> resolve)
    ),
    fromPromise(
      mergeArray(_createFetchRenderJobStreamArr(dataDir, fetchFunc))
      |> reduce((arr, record) => arr |> ArraySystem.push(record), [||])
      |> then_((recordArr) => (recordArr, RenderConfigHelper.initData) |> resolve)
    )
    |> Obj.magic
  |])
  |> reduce(
       (state, (recordArr, initDataFunc)) => initDataFunc(recordArr |> Obj.magic, state),
       state
     )
  |> then_((state) => state |> JobSystem.init |> resolve);