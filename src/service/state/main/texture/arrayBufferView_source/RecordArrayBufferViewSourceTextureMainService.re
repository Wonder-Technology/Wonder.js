/* TODO duplicate */
open StateDataMainType;

open SourceTextureType;

open ArrayBufferViewSourceTextureType;

open BufferSourceSizeTextureService;

open BufferArrayBufferViewSourceTextureService;

let getRecord = ({arrayBufferViewSourceTextureRecord}) =>
  arrayBufferViewSourceTextureRecord |> OptionService.unsafeGet;

let setAllTypeArrDataToDefault =
    (
      arrayBufferViewSourceTextureCount: int,
      (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, widths, heights)
    ) => {
  let defaultWrapS = getDefaultWrapS();
  let defaultWrapT = getDefaultWrapT();
  let defaultMagFilter = getDefaultMagFilter();
  let defaultMinFilter = getDefaultMinFilter();
  let defaultFormat = getDefaultFormat();
  let defaultType = getDefaultType();
  let defaultIsNeedUpdate = getDefaultIsNeedUpdate();
  let defaultWidth = getDefaultWidth();
  let defaultHeight = getDefaultHeight();
  WonderCommonlib.ArrayService.range(0, arrayBufferViewSourceTextureCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (
           (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, widths, heights),
           index
         ) => (
           OperateTypeArrayArrayBufferViewSourceTextureService.setWrapS(
             index,
             defaultWrapS,
             wrapSs
           ),
           OperateTypeArrayArrayBufferViewSourceTextureService.setWrapT(
             index,
             defaultWrapT,
             wrapTs
           ),
           OperateTypeArrayArrayBufferViewSourceTextureService.setMagFilter(
             index,
             defaultMagFilter,
             magFilters
           ),
           OperateTypeArrayArrayBufferViewSourceTextureService.setMinFilter(
             index,
             defaultMinFilter,
             minFilters
           ),
           OperateTypeArrayArrayBufferViewSourceTextureService.setFormat(
             index,
             defaultFormat,
             formats
           ),
           OperateTypeArrayArrayBufferViewSourceTextureService.setType(index, defaultType, types),
           OperateTypeArrayArrayBufferViewSourceTextureService.setIsNeedUpdate(
             index,
             defaultIsNeedUpdate,
             isNeedUpdates
           ),
           OperateTypeArrayArrayBufferViewSourceTextureService.setWidth(
             index,
             defaultWidth,
             widths
           ),
           OperateTypeArrayArrayBufferViewSourceTextureService.setHeight(
             index,
             defaultHeight,
             heights
           )
         )
       ),
       (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, widths, heights)
     )
};

let _setAllTypeArrDataToDefault =
    (
      arrayBufferViewSourceTextureCount: int,
      (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, widths, heights)
    ) =>
  setAllTypeArrDataToDefault(
    arrayBufferViewSourceTextureCount,
    (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, widths, heights)
  );

let _initBufferData = (basicSourceTextureCount, arrayBufferViewSourceTextureCount, buffer) => {
  let (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, widths, heights) =
    CreateTypeArrayArrayBufferViewSourceTextureService.createTypeArrays(
      buffer,
      basicSourceTextureCount,
      arrayBufferViewSourceTextureCount
    );
  (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, widths, heights)
  |> _setAllTypeArrDataToDefault(arrayBufferViewSourceTextureCount)
};

let create = ({settingRecord} as state) => {
  let basicSourceTextureCount = BufferSettingService.getBasicSourceTextureCount(settingRecord);
  let arrayBufferViewSourceTextureCount =
    BufferSettingService.getArrayBufferViewSourceTextureCount(settingRecord);
  let {buffer} = RecordSourceTextureMainService.getRecord(state);
  let (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, widths, heights) =
    _initBufferData(basicSourceTextureCount, arrayBufferViewSourceTextureCount, buffer);
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
      widths,
      heights,
      sourceMap: WonderCommonlib.SparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.SparseMapService.createEmpty(),
      bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
      needAddedSourceArray: [||],
      needInitedTextureIndexArray: [||]
    });
  state
};

let deepCopyForRestore = ({settingRecord} as state) => {
  let {
        index,
        /* index,
           buffer, */
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        isNeedUpdates,
        widths,
        heights,
        sourceMap,
        glTextureMap,
        bindTextureUnitCacheMap,
        disposedIndexArray,
        needAddedSourceArray,
        needInitedTextureIndexArray
      } as record =
    state |> getRecord;
  {
    ...state,
    arrayBufferViewSourceTextureRecord:
      Some({
        ...record,
        index,
        wrapSs: wrapSs |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(index * getWrapSsSize()),
        wrapTs: wrapTs |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(index * getWrapTsSize()),
        magFilters:
          magFilters
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(index * getMagFiltersSize()),
        minFilters:
          minFilters
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(index * getMinFiltersSize()),
        formats:
          formats |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(index * getFormatsSize()),
        types: types |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(index * getTypesSize()),
        isNeedUpdates:
          isNeedUpdates
          |> CopyTypeArrayService.copyUint8ArrayWithEndIndex(index * getIsNeedUpdatesSize()),
        /* TODO test */
        widths: widths |> CopyTypeArrayService.copyUint16ArrayWithEndIndex(index * getWidthsSize()),
        heights:
          heights |> CopyTypeArrayService.copyUint16ArrayWithEndIndex(index * getHeightsSize()),
        sourceMap: sourceMap |> SparseMapService.copy,
        glTextureMap: glTextureMap |> SparseMapService.copy,
        bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        needAddedSourceArray: needAddedSourceArray |> Js.Array.copy,
        needInitedTextureIndexArray: needInitedTextureIndexArray |> Js.Array.copy
      })
  }
};