open PerspectiveCameraProjectionType;

let create = () => {
  index: 0,
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  dirtyArray: WonderCommonlib.ArraySystem.createEmpty(),
  pMatrixMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  nearMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  farMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  fovyMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  aspectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};

let deepCopyForRestore =
    (
      {
        index,
        gameObjectMap,
        disposedIndexArray,
        nearMap,
        farMap,
        fovyMap,
        aspectMap,
        pMatrixMap,
        dirtyArray
      }
    ) => {
  index,
  pMatrixMap: pMatrixMap |> CopyTypeArrayService.deepCopyFloat32ArrayArray,
  dirtyArray: dirtyArray |> Js.Array.copy,
  nearMap: nearMap |> Js.Array.copy,
  farMap: farMap |> Js.Array.copy,
  fovyMap: fovyMap |> Js.Array.copy,
  aspectMap: aspectMap |> Js.Array.copy,
  gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};