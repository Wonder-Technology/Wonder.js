open ObjectInstanceType;

let create = () => {
  index: 0,
  sourceInstanceMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty()
};

let deepCopyForRestore = ({index, sourceInstanceMap, disposedIndexArray, gameObjectMap}) => {
  index,
  sourceInstanceMap: sourceInstanceMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};