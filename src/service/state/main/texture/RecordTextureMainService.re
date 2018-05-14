open StateDataMainType;

open TextureType;

open BufferTextureService;

let getRecord = ({textureRecord}) => textureRecord |> OptionService.unsafeGet;

let setDefaultTypeArrData =
    (count: int, (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates)) => {
  let defaultWrapS = getDefaultWrapS();
  let defaultWrapT = getDefaultWrapT();
  let defaultMagFilter = getDefaultMagFilter();
  let defaultMinFilter = getDefaultMinFilter();
  let defaultFormat = getDefaultFormat();
  let defaultType = getDefaultType();
  let defaultIsNeedUpdate = getDefaultIsNeedUpdate();
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates), index) => (
           OperateTypeArrayTextureService.setWrapS(index, defaultWrapS, wrapSs),
           OperateTypeArrayTextureService.setWrapT(index, defaultWrapT, wrapTs),
           OperateTypeArrayTextureService.setMagFilter(index, defaultMagFilter, magFilters),
           OperateTypeArrayTextureService.setMinFilter(index, defaultMinFilter, minFilters),
           OperateTypeArrayTextureService.setFormat(index, defaultFormat, formats),
           OperateTypeArrayTextureService.setType(index, defaultType, types),
           OperateTypeArrayTextureService.setIsNeedUpdate(
             index,
             defaultIsNeedUpdate,
             isNeedUpdates
           )
         )
       ),
       (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates)
     )
};

let _setDefaultTypeArrData =
    (count: int, (buffer, wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates)) => (
  buffer,
  setDefaultTypeArrData(
    count,
    (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates)
  )
);

let _initBufferData = (count) => {
  let buffer = createBuffer(count);
  let (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates) =
    CreateTypeArrayTextureService.createTypeArrays(buffer, count);
  (buffer, wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates)
  |> _setDefaultTypeArrData(count)
};

let create = ({settingRecord} as state) => {
  let textureCount = BufferSettingService.getTextureCount(settingRecord);
  let (buffer, (wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates)) =
    _initBufferData(textureCount);
  state.textureRecord =
    Some({
      index: 0,
      buffer,
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
        buffer,
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
    textureRecord:
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
        bindTextureUnitCacheMap: bindTextureUnitCacheMap |> SparseMapService.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
        needAddedSourceArray: needAddedSourceArray |> Js.Array.copy,
        needInitedTextureIndexArray: needInitedTextureIndexArray |> Js.Array.copy
      })
  }
};