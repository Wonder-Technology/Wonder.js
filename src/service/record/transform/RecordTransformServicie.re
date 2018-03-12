open TransformType;

open Js.Typed_array;

let create = () => {
  index: 0,
  parentMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  childMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  dirtyMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  localToWorldMatrixMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  localPositionMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  normalMatrixCacheMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
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
  normalMatrixCacheMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  parentMap: parentMap |> SparseMapSystem.copy,
  childMap: childMap |> CopyTypeArrayService.deepCopyArrayArray,
  dirtyMap: dirtyMap |> SparseMapSystem.copy,
  gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};
