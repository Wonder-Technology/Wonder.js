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
/* TODO add deepCopy, restore */