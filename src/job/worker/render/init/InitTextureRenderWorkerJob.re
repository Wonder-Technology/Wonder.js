open StateDataRenderWorkerType;

open RenderWorkerTextureType;

open Js.Promise;

let _createTypeArrays = (buffer, count, state) => {
  let (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates) =
    CreateTypeArrayTextureService.createTypeArrays(buffer, count);
  state.textureRecord =
    Some({
      wrapSs: Some(wrapSs),
      wrapTs: Some(wrapTs),
      magFilters: Some(magFilters),
      minFilters: Some(minFilters),
      formats: Some(formats),
      types: Some(types),
      isNeedUpdates: Some(isNeedUpdates),
      sourceMap: WonderCommonlib.SparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.SparseMapService.createEmpty(),
      bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.createEmpty()
    });
  state
};

let execJob = (_, e, stateData) => {
  let state = StateRenderWorkerService.unsafeGetState(stateData);
  let data = MessageService.getRecord(e);
  let textureData = data##textureData;
  [|
    MostUtils.callFunc(
      () => {
        let state = StateRenderWorkerService.unsafeGetState(stateData);
        let data = MessageService.getRecord(e);
        let textureData = data##textureData;
        let count = data##bufferData##textureCount;
        state
        |> _createTypeArrays(textureData##buffer, count)
        |> StateRenderWorkerService.setState(stateData)
      }
    ),
    SourceMapTextureRenderWorkerService.addSourceFromImageDataStream(
      textureData##needAddedImageDataArray,
      state
    ),
    MostUtils.callFunc(
      () => {
        let state = StateRenderWorkerService.unsafeGetState(stateData);
        let data = MessageService.getRecord(e);
        let textureData = data##textureData;
        let {glTextureMap} as textureRecord = RecordTextureRenderWorkerService.getRecord(state);
        state.textureRecord =
          Some({
            ...textureRecord,
            glTextureMap:
              InitTextureService.initTextures(
                [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
                textureData##index,
                glTextureMap
              )
          });
        state
      }
    )
  |]
  |> MostUtils.concatArray
  |> Most.forEach((state) => state |> StateRenderWorkerService.setState(stateData) |> ignore)
  |> then_(() => e |> resolve)
  |> Most.fromPromise
};