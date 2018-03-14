open ObjectInstanceType;

let create = () => {
  index: 0,
  sourceInstanceMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty()
};

let deepCopyForRestore = ({index, sourceInstanceMap, disposedIndexArray, gameObjectMap}) => {
  index,
  sourceInstanceMap: sourceInstanceMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};