open BasicCameraViewType;

let create = () => {
  index: 0,
  isActiveMap: WonderCommonlib.SparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
};

let deepCopyForRestore =
    ({index, isActiveMap, gameObjectMap, disposedIndexArray}) => {
  index,
  isActiveMap: isActiveMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy,
};