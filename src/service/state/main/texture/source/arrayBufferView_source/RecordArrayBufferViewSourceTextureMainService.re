open StateDataMainType;

open TextureType;

open ArrayBufferViewSourceTextureType;

open BufferSourceSizeTextureService;

open BufferSizeTextureService;

open BufferArrayBufferViewSourceTextureService;

let getRecord = ({arrayBufferViewSourceTextureRecord}) =>
  arrayBufferViewSourceTextureRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      arrayBufferViewSourceTextureCount: int,
      arrayBufferViewSourceTextureIndexOffset,
      (
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
      ),
    ) => {
  let defaultWrapS = getDefaultWrapS() |> TextureType.wrapToUint8;
  let defaultWrapT = getDefaultWrapT() |> TextureType.wrapToUint8;
  let defaultMagFilter = getDefaultMagFilter() |> TextureType.filterToUint8;
  let defaultMinFilter = getDefaultMinFilter() |> TextureType.filterToUint8;
  let defaultFormat = getDefaultFormat() |> TextureType.formatToUint8;
  let defaultType = getDefaultType();
  let defaultIsNeedUpdate = getDefaultIsNeedUpdate();
  let defaultFlipY = getDefaultFlipY();
  let defaultWidth = getDefaultWidth();
  let defaultHeight = getDefaultHeight();
  ArrayService.range(0, arrayBufferViewSourceTextureCount - 1)
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
           widths,
           heights,
         ),
         indexInTypeArray,
       ) => (
         OperateTypeArrayAllArrayBufferViewSourceTextureService.setWrapS(
           indexInTypeArray,
           defaultWrapS,
           wrapSs,
         ),
         OperateTypeArrayAllArrayBufferViewSourceTextureService.setWrapT(
           indexInTypeArray,
           defaultWrapT,
           wrapTs,
         ),
         OperateTypeArrayAllArrayBufferViewSourceTextureService.setMagFilter(
           indexInTypeArray,
           defaultMagFilter,
           magFilters,
         ),
         OperateTypeArrayAllArrayBufferViewSourceTextureService.setMinFilter(
           indexInTypeArray,
           defaultMinFilter,
           minFilters,
         ),
         OperateTypeArrayAllArrayBufferViewSourceTextureService.setFormat(
           indexInTypeArray,
           defaultFormat,
           formats,
         ),
         OperateTypeArrayAllArrayBufferViewSourceTextureService.setType(
           indexInTypeArray,
           defaultType,
           types,
         ),
         OperateTypeArrayAllArrayBufferViewSourceTextureService.setIsNeedUpdate(
           indexInTypeArray,
           defaultIsNeedUpdate,
           isNeedUpdates,
         ),
         OperateTypeArrayAllArrayBufferViewSourceTextureService.setFlipY(
           indexInTypeArray,
           defaultFlipY,
           flipYs,
         ),
         OperateTypeArrayAllArrayBufferViewSourceTextureService.setWidth(
           indexInTypeArray,
           defaultWidth,
           widths,
         ),
         OperateTypeArrayAllArrayBufferViewSourceTextureService.setHeight(
           indexInTypeArray,
           defaultHeight,
           heights,
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
         widths,
         heights,
       ),
     );
};

let _initBufferData =
    (
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount,
      buffer,
      arrayBufferViewSourceTextureIndexOffset,
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
    widths,
    heights,
  ) =
    CreateTypeArrayAllArrayBufferViewSourceTextureService.createTypeArrays(
      buffer,
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount,
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
    widths,
    heights,
  )
  |> setAllTypeArrDataToDefault(
       arrayBufferViewSourceTextureCount,
       arrayBufferViewSourceTextureIndexOffset,
     );
};

let create = ({settingRecord} as state) => {
  let basicSourceTextureCount =
    BufferSettingService.getBasicSourceTextureCount(settingRecord);
  let arrayBufferViewSourceTextureCount =
    BufferSettingService.getArrayBufferViewSourceTextureCount(settingRecord);
  let {buffer}: SourceTextureType.sourceTextureRecord =
    RecordSourceTextureMainService.getRecord(state);
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
    _initBufferData(
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount,
      buffer,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    );
  state.arrayBufferViewSourceTextureRecord =
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
      widths,
      heights,
      sourceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      nameMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      materialsMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
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
        nameMap,
        materialsMap,
        sourceMap,
        glTextureMap,
        disposedIndexArray,
        needAddedSourceArray,
        needInitedTextureIndexArray,
        needDisposedTextureIndexArray,
      } as record =
    state |> getRecord;
  {
    ...state,
    arrayBufferViewSourceTextureRecord:
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
        widths:
          widths
          |> CopyTypeArrayService.copyUint16ArrayWithEndIndex(
               index * getWidthsSize(),
             ),
        heights:
          heights
          |> CopyTypeArrayService.copyUint16ArrayWithEndIndex(
               index * getHeightsSize(),
             ),
        nameMap: nameMap |> WonderCommonlib.MutableSparseMapService.copy,
        materialsMap:
          materialsMap |> WonderCommonlib.MutableSparseMapService.copy,
        sourceMap: sourceMap |> WonderCommonlib.MutableSparseMapService.copy,
        glTextureMap:
          glTextureMap |> WonderCommonlib.MutableSparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        needAddedSourceArray: needAddedSourceArray |> Js.Array.copy,
        needInitedTextureIndexArray:
          needInitedTextureIndexArray |> Js.Array.copy,
        needDisposedTextureIndexArray:
          needDisposedTextureIndexArray |> Js.Array.copy,
      }),
  };
};