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
      (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates)
    ) => {
  let defaultWrapS = getDefaultWrapS();
  let defaultWrapT = getDefaultWrapT();
  let defaultMagFilter = getDefaultMagFilter();
  let defaultMinFilter = getDefaultMinFilter();
  let defaultFormat = getDefaultFormat();
  let defaultType = getDefaultType();
  let defaultIsNeedUpdate = getDefaultIsNeedUpdate();
  WonderCommonlib.ArrayService.range(0, basicSourceTextureCount - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates), indexInTypeArray) => (
           OperateTypeArrayBasicSourceTextureService.setWrapS(
             indexInTypeArray,
             defaultWrapS,
             wrapSs
           ),
           OperateTypeArrayBasicSourceTextureService.setWrapT(
             indexInTypeArray,
             defaultWrapT,
             wrapTs
           ),
           OperateTypeArrayBasicSourceTextureService.setMagFilter(
             indexInTypeArray,
             defaultMagFilter,
             magFilters
           ),
           OperateTypeArrayBasicSourceTextureService.setMinFilter(
             indexInTypeArray,
             defaultMinFilter,
             minFilters
           ),
           OperateTypeArrayBasicSourceTextureService.setFormat(
             indexInTypeArray,
             defaultFormat,
             formats
           ),
           OperateTypeArrayBasicSourceTextureService.setType(indexInTypeArray, defaultType, types),
           OperateTypeArrayBasicSourceTextureService.setIsNeedUpdate(
             indexInTypeArray,
             defaultIsNeedUpdate,
             isNeedUpdates
           )
         )
       ),
       (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates)
     )
};

let _initBufferData = (basicSourceTextureCount, buffer) => {
  let (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates) =
    CreateTypeArrayBasicSourceTextureService.createTypeArrays(buffer, basicSourceTextureCount);
  (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates)
  |> setAllTypeArrDataToDefault(basicSourceTextureCount)
};

let create = ({settingRecord} as state) => {
  let basicSourceTextureCount = BufferSettingService.getBasicSourceTextureCount(settingRecord);
  let {buffer} = RecordSourceTextureMainService.getRecord(state);
  let (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates) =
    _initBufferData(basicSourceTextureCount, buffer);
  state.basicSourceTextureRecord =
    Some
      /* index: 0, */
      /* buffer, */
      ({
        index: 0,
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        isNeedUpdates,
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
        /*
         buffer, */
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
        formats,
        types,
        isNeedUpdates,
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
    basicSourceTextureRecord:
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
        sourceMap: sourceMap |> SparseMapService.copy,
        glTextureMap: glTextureMap |> SparseMapService.copy,
        bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        needAddedSourceArray: needAddedSourceArray |> Js.Array.copy,
        needInitedTextureIndexArray: needInitedTextureIndexArray |> Js.Array.copy
      })
  }
};