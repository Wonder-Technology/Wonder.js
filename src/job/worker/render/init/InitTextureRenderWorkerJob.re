open StateDataRenderWorkerType;

open Js.Promise;

let _createTypeArrays =
    (
      buffer,
      (
        basicSourceTextureCount,
        arrayBufferViewSourceTextureCount,
        cubemapTextureCount,
      ),
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
    CreateTypeArrayAllBasicSourceTextureService.createTypeArrays(
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
    CreateTypeArrayAllArrayBufferViewSourceTextureService.createTypeArrays(
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
    });

  let (
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    pxFormats,
    nxFormats,
    pyFormats,
    nyFormats,
    pzFormats,
    nzFormats,
    pxTypes,
    nxTypes,
    pyTypes,
    nyTypes,
    pzTypes,
    nzTypes,
    isNeedUpdates,
    flipYs,
  ) =
    CreateTypeArrayAllCubemapTextureService.createTypeArrays(
      buffer,
      cubemapTextureCount,
    );
  state.cubemapTextureRecord =
    Some({
      wrapSs: Some(wrapSs),
      wrapTs: Some(wrapTs),
      magFilters: Some(magFilters),
      minFilters: Some(minFilters),
      pxFormats: Some(pxFormats),
      nxFormats: Some(nxFormats),
      pyFormats: Some(pyFormats),
      nyFormats: Some(nyFormats),
      pzFormats: Some(pzFormats),
      nzFormats: Some(nzFormats),
      pxTypes: Some(pxTypes),
      nxTypes: Some(nxTypes),
      pyTypes: Some(pyTypes),
      nyTypes: Some(nyTypes),
      pzTypes: Some(pzTypes),
      nzTypes: Some(nzTypes),
      isNeedUpdates: Some(isNeedUpdates),
      flipYs: Some(flipYs),
      pxSourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      nxSourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      pySourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      nySourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      pzSourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      nzSourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
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
    let cubemapTextureCount =
      BufferRenderWorkerSettingService.unsafeGetCubemapTextureCount(
        settingRecord,
      );

    state
    |> _createTypeArrays(
         textureData##buffer,
         (
           basicSourceTextureCount,
           arrayBufferViewSourceTextureCount,
           cubemapTextureCount,
         ),
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
    let cubemapTextureRecord =
      RecordCubemapTextureRenderWorkerService.getRecord(state);

    state.basicSourceTextureRecord =
      Some({
        ...basicSourceTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
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
            AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            IndexAllArrayBufferViewSourceTextureService.getAllArrayBufferViewSourceTextureIndexWhenInit(
              textureData##arrayBufferViewSourceTextureData##index,
              state.settingRecord
              |> BufferRenderWorkerSettingService.unsafeGetBasicSourceTextureCount,
            ),
            arrayBufferViewSourceTextureRecord.glTextureMap,
          ),
      });
    state.cubemapTextureRecord =
      Some({
        ...cubemapTextureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord),
            ArrayService.range(0, textureData##cubemapTextureData##index - 1),
            cubemapTextureRecord.glTextureMap,
          ),
      });

    state.allTextureRecord =
      Some({
        activableTextureUnitArray:
          OperateAllTextureRenderWorkerService.createActivableTextureUnitArray(
            state,
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
    SourceMapCubemapTextureRenderWorkerService.addSourceFromImageDataStream(
      (
        textureData##cubemapTextureData##needAddedPXImageDataArray,
        textureData##cubemapTextureData##needAddedNXImageDataArray,
        textureData##cubemapTextureData##needAddedPYImageDataArray,
        textureData##cubemapTextureData##needAddedNYImageDataArray,
        textureData##cubemapTextureData##needAddedPZImageDataArray,
        textureData##cubemapTextureData##needAddedNZImageDataArray,
      ),
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