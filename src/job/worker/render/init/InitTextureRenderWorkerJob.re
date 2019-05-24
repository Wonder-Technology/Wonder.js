open StateDataRenderWorkerType;

open Js.Promise;

let _createTypeArrays =
    (
      buffer,
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount,
      state,
    ) => {
  let (
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    flipYs,
  ) =
    CreateTypeArrayBasicSourceTextureService.createTypeArrays(
      buffer,
      basicSourceTextureCount,
    );
  state.basicSourceTextureRecord =
    Some({
      wrapSs: Some(wrapSs),
      wrapTs: Some(wrapTs),
      magFilters: Some(magFilters),
      minFilters: Some(minFilters),
      formats: Some(formats),
      types: Some(types),
      isNeedUpdates: Some(isNeedUpdates),
      flipYs: Some(flipYs),
      sourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      bindTextureUnitCacheMap:
        WonderCommonlib.MutableSparseMapService.createEmpty(),
    });
  let (
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    flipYs,
    widths,
    heights,
  ) =
    CreateTypeArrayArrayBufferViewSourceTextureService.createTypeArrays(
      buffer,
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount,
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
      flipYs: Some(flipYs),
      widths: Some(widths),
      heights: Some(heights),
      sourceMap: None,
      glTextureMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      bindTextureUnitCacheMap:
        WonderCommonlib.MutableSparseMapService.createEmpty(),
    });
  state;
};

let _buildCreateTypeArraysStream = (e, stateData) =>
  MostUtils.callFunc(() => {
    let {settingRecord} as state =
      StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let textureData = data##textureData;
    let basicSourceTextureCount =
      BufferRenderWorkerSettingService.unsafeGetBasicSourceTextureCount(
        settingRecord,
      );
    let arrayBufferViewSourceTextureCount =
      BufferRenderWorkerSettingService.unsafeGetArrayBufferViewSourceTextureCount(
        settingRecord,
      );
    state
    |> _createTypeArrays(
         textureData##buffer,
         basicSourceTextureCount,
         arrayBufferViewSourceTextureCount,
       )
    |> StateRenderWorkerService.setState(stateData);
  });

let _buildAddArrayBufferViewSourceStream = (e, stateData) =>
  MostUtils.callFunc(() => {
    let state = StateRenderWorkerService.unsafeGetState(stateData);
    let data = MessageService.getRecord(e);
    let textureData = data##textureData;
    let sourceMap = textureData##arrayBufferViewSourceTextureData##sourceMap;
    SourceMapArrayBufferViewSourceTextureRenderWorkerService.setSourceMap(
      sourceMap
      |> ArrayBufferViewSourceTextureType.arrayArrayBufferViewSourceToSparseMap,
      state,
    )
    |> StateRenderWorkerService.setState(stateData);
  });

let _buildInitTextureStream = (e, stateData) =>
  MostUtils.callFunc(() => {
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
            DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            ArrayService.range(
              0,
              textureData##basicSourceTextureData##index - 1,
            ),
            basicSourceTextureRecord.glTextureMap,
          ),
      });
    state.arrayBufferViewSourceTextureRecord =
      Some({
        ...arrayBufferViewSourceTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            IndexArrayBufferViewSourceTextureService.getAllArrayBufferViewSourceTextureIndexWhenInit(
              textureData##arrayBufferViewSourceTextureData##index,
              state.settingRecord
              |> BufferRenderWorkerSettingService.unsafeGetBasicSourceTextureCount,
            ),
            arrayBufferViewSourceTextureRecord.glTextureMap,
          ),
      });
    state;
  });

let execJob = (_, e, stateData) => {
  let state = StateRenderWorkerService.unsafeGetState(stateData);
  let data = MessageService.getRecord(e);
  let textureData = data##textureData;
  [|
    _buildCreateTypeArraysStream(e, stateData),
    SourceMapBasicSourceTextureRenderWorkerService.addSourceFromImageDataStream(
      textureData##basicSourceTextureData##needAddedImageDataArray,
      state,
    ),
    _buildAddArrayBufferViewSourceStream(e, stateData),
    _buildInitTextureStream(e, stateData),
  |]
  |> MostUtils.concatArray
  |> WonderBsMost.Most.forEach(state =>
       state |> StateRenderWorkerService.setState(stateData) |> ignore
     )
  |> then_(() => e |> resolve)
  |> WonderBsMost.Most.fromPromise;
};