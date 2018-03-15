open TransformType;

open Js.Typed_array;

let create = () => {
  index: 0,
  parentMap: WonderCommonlib.SparseMapService.createEmpty(),
  childMap: WonderCommonlib.SparseMapService.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  dirtyMap: WonderCommonlib.SparseMapService.createEmpty(),
  localToWorldMatrixMap: WonderCommonlib.SparseMapService.createEmpty(),
  localPositionMap: WonderCommonlib.SparseMapService.createEmpty(),
  normalMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
};

let deepCopyForRestore =
    (
      {
        index,
        localToWorldMatrixMap,
        localPositionMap,
        normalMatrixCacheMap,
        parentMap,
        childMap,
        dirtyMap,
        gameObjectMap,
        disposedIndexArray
      }
    ) => {
  index,
  localToWorldMatrixMap: localToWorldMatrixMap |> CopyTypeArrayService.deepCopyFloat32ArrayArray,
  localPositionMap: localPositionMap |> CopyTypeArrayService.deepCopyFloat32ArrayArray,
  normalMatrixCacheMap: WonderCommonlib.SparseMapService.createEmpty(),
  parentMap: parentMap |> SparseMapService.copy,
  childMap: childMap |> CopyTypeArrayService.deepCopyArrayArray,
  dirtyMap: dirtyMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};
