open StateDataRenderWorkerType;

open Js.Promise;

let _createTypeArrays = (buffer, basicSourceTextureCount, arrayBufferViewSourceTextureCount, state) => {
  let (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates) =
    CreateTypeArrayBasicSourceTextureService.createTypeArrays(buffer, basicSourceTextureCount);
  state.basicSourceTextureRecord =
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
  let (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, widths, heights) =
    CreateTypeArrayArrayBufferViewSourceTextureService.createTypeArrays(
      buffer,
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount
    );
  state.arrayBufferViewSourceTextureRecord =
    Some({
      wrapSs: Some(wrapSs),
      wrapTs: Some(wrapTs),
      magFilters: Some(magFilters),
      minFilters: Some(minFilters),
      formats: Some(formats),
      types: Some(types),
      isNeedUpdates: Some(isNeedUpdates),
      widths: Some(widths),
      heights: Some(heights),
      sourceMap: None,
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
        let {settingRecord} as state = StateRenderWorkerService.unsafeGetState(stateData);
        let data = MessageService.getRecord(e);
        let textureData = data##textureData;
        let basicSourceTextureCount =
          BufferRenderWorkerSettingService.unsafeGetBasicSourceTextureCount(settingRecord);
        let arrayBufferViewSourceTextureCount =
          BufferRenderWorkerSettingService.unsafeGetArrayBufferViewSourceTextureCount(
            settingRecord
          );
        state
        |> _createTypeArrays(
             textureData##buffer,
             basicSourceTextureCount,
             arrayBufferViewSourceTextureCount
           )
        |> StateRenderWorkerService.setState(stateData)
      }
    ),
    SourceMapBasicSourceTextureRenderWorkerService.addSourceFromImageDataStream(
      textureData##basicSourceTextureData##needAddedImageDataArray,
      state
    ),
    MostUtils.callFunc(
      () => {
        let state = StateRenderWorkerService.unsafeGetState(stateData);
        let data = MessageService.getRecord(e);
        let textureData = data##textureData;
        let sourceMap = textureData##arrayBufferViewSourceTextureData##sourceMap;
        SourceMapArrayBufferViewSourceTextureRenderWorkerService.setSourceMap(
          sourceMap |> ArrayBufferViewSourceTextureType.arrayArrayBufferViewSourceToSparseMap,
          state
        )
        |> StateRenderWorkerService.setState(stateData)
      }
    ),
    MostUtils.callFunc(
      () => {
        let state = StateRenderWorkerService.unsafeGetState(stateData);
        let data = MessageService.getRecord(e);
        let textureData = data##textureData;
        let basicSourceTextureRecord =
          RecordBasicSourceTextureRenderWorkerService.getRecord(state);
        let arrayBufferViewSourceTextureRecord =
          RecordArrayBufferViewSourceTextureRenderWorkerService.getRecord(state);
        state.basicSourceTextureRecord =
          Some({
            ...basicSourceTextureRecord,
            glTextureMap:
              InitTextureService.initTextures(
                [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
                ArrayService.range(0, textureData##basicSourceTextureData##index - 1),
                basicSourceTextureRecord.glTextureMap
              )
          });
        state.arrayBufferViewSourceTextureRecord =
          Some({
            ...arrayBufferViewSourceTextureRecord,
            glTextureMap:
              InitTextureService.initTextures(
                [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
                ArrayService.range(0, textureData##arrayBufferViewSourceTextureData##index - 1),
                arrayBufferViewSourceTextureRecord.glTextureMap
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