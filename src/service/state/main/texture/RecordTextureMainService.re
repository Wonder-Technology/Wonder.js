open StateDataMainType;

open TextureType;

open BufferTextureService;

let getRecord = ({textureRecord}) => textureRecord |> OptionService.unsafeGet;

let setDefaultTypeArrData = (count: int, (widths, heights, isNeedUpdates)) => {
  let defaultWidth = getDefaultWidth();
  let defaultHeight = getDefaultHeight();
  let defaultIsNeedUpdate = getDefaultIsNeedUpdate();
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((widths, heights, isNeedUpdates), index) => (
           OperateTypeArrayTextureService.setWidth(index, defaultWidth, widths),
           OperateTypeArrayTextureService.setHeight(index, defaultHeight, heights),
           OperateTypeArrayTextureService.setIsNeedUpdate(
             index,
             defaultIsNeedUpdate,
             isNeedUpdates
           )
         )
       ),
       (widths, heights, isNeedUpdates)
     )
};

let _setDefaultTypeArrData = (count: int, (buffer, widths, heights, isNeedUpdates)) => (
  buffer,
  setDefaultTypeArrData(count, (widths, heights, isNeedUpdates))
);

let _initBufferData = (count) => {
  let buffer = createBuffer(count);
  let (widths, heights, isNeedUpdates) =
    CreateTypeArrayTextureService.createTypeArrays(buffer, count);
  (buffer, widths, heights, isNeedUpdates) |> _setDefaultTypeArrData(count)
};

let create = ({settingRecord} as state) => {
  let textureDataBufferCount = BufferSettingService.getTextureDataBufferCount(settingRecord);
  let (buffer, (widths, heights, isNeedUpdates)) = _initBufferData(textureDataBufferCount);
  state.textureRecord =
    Some({
      index: 0,
      buffer,
      widths,
      heights,
      isNeedUpdates,
      sourceMap: WonderCommonlib.SparseMapService.createEmpty(),
      glTextureMap: WonderCommonlib.SparseMapService.createEmpty(),
      bindTextureUnitCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
      disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
    });
  state
};
/* TODO add deepCopy, restore */