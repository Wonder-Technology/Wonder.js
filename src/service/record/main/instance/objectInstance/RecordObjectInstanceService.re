open ObjectInstanceType;

let create = () => {
  index: 0,
  sourceInstanceMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
  gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty()
};

let deepCopyForRestore = ({index, sourceInstanceMap, disposedIndexArray, gameObjectMap}) => {
  index,
  sourceInstanceMap: sourceInstanceMap |> WonderCommonlib.MutableSparseMapService.copy,
  gameObjectMap: gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};