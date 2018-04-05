open PerspectiveCameraProjectionType;

let create = () => {
  index: 0,
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  dirtyArray: WonderCommonlib.ArrayService.createEmpty(),
  pMatrixMap: WonderCommonlib.SparseMapService.createEmpty(),
  nearMap: WonderCommonlib.SparseMapService.createEmpty(),
  farMap: WonderCommonlib.SparseMapService.createEmpty(),
  fovyMap: WonderCommonlib.SparseMapService.createEmpty(),
  aspectMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
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
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};