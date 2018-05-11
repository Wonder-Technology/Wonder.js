open StateDataMainType;

open TextureType;

open BufferTextureService;

let getRecord = ({textureRecord}) => textureRecord |> OptionService.unsafeGet;

let setDefaultTypeArrData = (count: int, (wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates)) => {
  let defaultWrapS = getDefaultWrapS();
  let defaultWrapT = getDefaultWrapT();
  let defaultMagFilter = getDefaultMagFilter();
  let defaultMinFilter = getDefaultMinFilter();
  let defaultIsNeedUpdate = getDefaultIsNeedUpdate();
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates), index) => (
           OperateTypeArrayTextureService.setWrapS(index, defaultWrapS, wrapSs),
           OperateTypeArrayTextureService.setWrapT(index, defaultWrapT, wrapTs),
           OperateTypeArrayTextureService.setMagFilter(index, defaultMagFilter, magFilters),
           OperateTypeArrayTextureService.setMinFilter(index, defaultMinFilter, minFilters),
           OperateTypeArrayTextureService.setIsNeedUpdate(
             index,
             defaultIsNeedUpdate,
             isNeedUpdates
           )
         )
       ),
       (wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates)
     )
};

let _setDefaultTypeArrData =
    (count: int, (buffer, wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates)) => (
  buffer,
  setDefaultTypeArrData(count, (wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates))
);

let _initBufferData = (count) => {
  let buffer = createBuffer(count);
  let (wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates) =
    CreateTypeArrayTextureService.createTypeArrays(buffer, count);
  (buffer, wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates) |> _setDefaultTypeArrData(count)
};

let create = ({settingRecord} as state) => {
  let textureDataBufferCount = BufferSettingService.getTextureDataBufferCount(settingRecord);
  let (buffer, (wrapSs, wrapTs, magFilters, minFilters, isNeedUpdates)) =
    _initBufferData(textureDataBufferCount);
  state.textureRecord =
    Some({
      index: 0,
      buffer,
      wrapSs,
      wrapTs,
      magFilters,
      minFilters,
      isNeedUpdates,
      sourceMap: WonderCommonlib.SparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.SparseMapService.createEmpty(),
      bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
    });
  state
};
/* TODO add deepCopy, restore */