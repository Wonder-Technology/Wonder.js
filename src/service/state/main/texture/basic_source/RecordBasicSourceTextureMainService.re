open StateDataMainType;

open SourceTextureType;

open BufferSourceSizeTextureService;

open BasicSourceTextureType;

open BufferBasicSourceTextureService;

let getRecord = ({basicSourceTextureRecord}) =>
  basicSourceTextureRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      basicSourceTextureCount: int,
      (
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        isNeedUpdates,
        flipYs,
      ),
    ) => {
  let defaultWrapS = getDefaultWrapS() |> SourceTextureType.wrapToUint8;
  let defaultWrapT = getDefaultWrapT() |> SourceTextureType.wrapToUint8;
  let defaultMagFilter =
    getDefaultMagFilter() |> SourceTextureType.filterToUint8;
  let defaultMinFilter =
    getDefaultMinFilter() |> SourceTextureType.filterToUint8;
  let defaultFormat = getDefaultFormat() |> SourceTextureType.formatToUint8;
  let defaultType = getDefaultType();
  let defaultIsNeedUpdate = getDefaultIsNeedUpdate();
  let defaultFlipY = getDefaultFlipY();
  WonderCommonlib.ArrayService.range(0, basicSourceTextureCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (
           wrapSs,
           wrapTs,
           magFilters,
           minFilters,
           formats,
           types,
           isNeedUpdates,
           flipYs,
         ),
         indexInTypeArray,
       ) => (
         OperateTypeArrayBasicSourceTextureService.setWrapS(
           indexInTypeArray,
           defaultWrapS,
           wrapSs,
         ),
         OperateTypeArrayBasicSourceTextureService.setWrapT(
           indexInTypeArray,
           defaultWrapT,
           wrapTs,
         ),
         OperateTypeArrayBasicSourceTextureService.setMagFilter(
           indexInTypeArray,
           defaultMagFilter,
           magFilters,
         ),
         OperateTypeArrayBasicSourceTextureService.setMinFilter(
           indexInTypeArray,
           defaultMinFilter,
           minFilters,
         ),
         OperateTypeArrayBasicSourceTextureService.setFormat(
           indexInTypeArray,
           defaultFormat,
           formats,
         ),
         OperateTypeArrayBasicSourceTextureService.setType(
           indexInTypeArray,
           defaultType,
           types,
         ),
         OperateTypeArrayBasicSourceTextureService.setIsNeedUpdate(
           indexInTypeArray,
           defaultIsNeedUpdate,
           isNeedUpdates,
         ),
         OperateTypeArrayBasicSourceTextureService.setFlipY(
           indexInTypeArray,
           defaultFlipY,
           flipYs,
         ),
       ),
       (
         wrapSs,
         wrapTs,
         magFilters,
         minFilters,
         formats,
         types,
         isNeedUpdates,
         flipYs,
       ),
     );
};

let _initBufferData = (basicSourceTextureCount, buffer) => {
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
  (
    wrapSs,
    wrapTs,
    magFilters,
    minFilters,
    formats,
    types,
    isNeedUpdates,
    flipYs,
  )
  |> setAllTypeArrDataToDefault(basicSourceTextureCount);
};

let create = ({settingRecord} as state) => {
  let basicSourceTextureCount =
    BufferSettingService.getBasicSourceTextureCount(settingRecord);
  let {buffer} = RecordSourceTextureMainService.getRecord(state);
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
    _initBufferData(basicSourceTextureCount, buffer);
  state.basicSourceTextureRecord =
    Some({
      index: 0,
      wrapSs,
      wrapTs,
      magFilters,
      minFilters,
      formats,
      types,
      isNeedUpdates,
      flipYs,
      nameMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      materialsMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      sourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      bindTextureUnitCacheMap:
        WonderCommonlib.MutableSparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      needAddedSourceArray: WonderCommonlib.ArrayService.createEmpty(),
      needInitedTextureIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      needDisposedTextureIndexArray:
        WonderCommonlib.ArrayService.createEmpty(),
    });
  state;
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
        index,
        /*
         buffer, */
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        isNeedUpdates,
        flipYs,
        nameMap,
        materialsMap,
        sourceMap,
        glTextureMap,
        bindTextureUnitCacheMap,
        disposedIndexArray,
        needAddedSourceArray,
        needInitedTextureIndexArray,
        needDisposedTextureIndexArray,
      } as record =
    state |> getRecord;
  {
    ...state,
    basicSourceTextureRecord:
      Some({
        ...record,
        index,
        wrapSs:
          wrapSs
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getWrapSsSize(),
             ),
        wrapTs:
          wrapTs
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getWrapTsSize(),
             ),
        magFilters:
          magFilters
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getMagFiltersSize(),
             ),
        minFilters:
          minFilters
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getMinFiltersSize(),
             ),
        formats:
          formats
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFormatsSize(),
             ),
        types:
          types
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getTypesSize(),
             ),
        isNeedUpdates:
          isNeedUpdates
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getIsNeedUpdatesSize(),
             ),
        flipYs:
          flipYs
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(
               index * getFlipYsSize(),
             ),
        nameMap: nameMap |> WonderCommonlib.MutableSparseMapService.copy,
        /* TODO test */
        materialsMap:
          materialsMap |> WonderCommonlib.MutableSparseMapService.copy,
        sourceMap: sourceMap |> WonderCommonlib.MutableSparseMapService.copy,
        glTextureMap:
          glTextureMap |> WonderCommonlib.MutableSparseMapService.copy,
        bindTextureUnitCacheMap:
          WonderCommonlib.MutableSparseMapService.createEmpty(),
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        needAddedSourceArray: needAddedSourceArray |> Js.Array.copy,
        needInitedTextureIndexArray:
          needInitedTextureIndexArray |> Js.Array.copy,
        /* TODO test */
        needDisposedTextureIndexArray:
          needDisposedTextureIndexArray |> Js.Array.copy,
      }),
  };
};