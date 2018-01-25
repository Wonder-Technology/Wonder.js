open Js.Promise;

open Most;

let _createFetchJsonStream = (jsonFilePath, fetchFunc) =>
  fromPromise([@bs] fetchFunc(jsonFilePath) |> then_(Fetch.Response.json));

let load = (dataDir: string, fetchFunc, state: StateDataType.state) =>
  /* TODO load gloal_resources */
  /* TODO refactor:
     remove Obj.magic?
     */
  mergeArray([|
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
    _createFetchJsonStream(
      PathUtils.join([|dataDir, "render/shader/shader_libs.json"|]),
      fetchFunc
    )
    |> map((json) => RenderConfigParseUtils.convertShaderLibsToRecord(json))
    |> Obj.magic
  |])
  |> reduce((arr, record) => arr |> ArraySystem.push(record), [||])
  |> then_((recordArr) => RenderConfigHelper.initData(recordArr |> Obj.magic, state) |> resolve);