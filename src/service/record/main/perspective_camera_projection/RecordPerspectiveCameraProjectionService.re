open PerspectiveCameraProjectionType;

let create = () => {
  index: 0,
  gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  dirtyArray: WonderCommonlib.ArrayService.createEmpty(),
  pMatrixMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  nearMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  farMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  fovyMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
  aspectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
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
  pMatrixMap: pMatrixMap |> CopyTypeArrayService.deepCopyMutableSparseMapOfFloat32Array,
  dirtyArray: dirtyArray |> WonderCommonlib.MutableSparseMapService.copy,
  nearMap: nearMap |> WonderCommonlib.MutableSparseMapService.copy,
  farMap: farMap |> WonderCommonlib.MutableSparseMapService.copy,
  fovyMap: fovyMap |> WonderCommonlib.MutableSparseMapService.copy,
  aspectMap: aspectMap |> WonderCommonlib.MutableSparseMapService.copy,
  gameObjectMap: gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy,
};