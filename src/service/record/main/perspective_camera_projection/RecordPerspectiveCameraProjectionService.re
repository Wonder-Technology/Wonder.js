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
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
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
        dirtyArray,
      },
    ) => {
  index,
  pMatrixMap: pMatrixMap |> CopyTypeArrayService.deepCopyFloat32ArrayArray,
  dirtyArray: dirtyArray |> SparseMapService.copy,
  nearMap: nearMap |> SparseMapService.copy,
  farMap: farMap |> SparseMapService.copy,
  fovyMap: fovyMap |> SparseMapService.copy,
  aspectMap: aspectMap |> SparseMapService.copy,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy,
};