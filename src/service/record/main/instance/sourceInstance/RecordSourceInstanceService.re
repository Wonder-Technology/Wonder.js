open SourceInstanceType;

let create = () => {
  index: 0,
  gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  objectInstanceTransformArrayMap: WonderCommonlib.SparseMapService.createEmpty(),
  matrixFloat32ArrayMap: WonderCommonlib.SparseMapService.createEmpty(),
  matrixInstanceBufferCapacityMap: WonderCommonlib.SparseMapService.createEmpty(),
  isTransformStaticMap: WonderCommonlib.SparseMapService.createEmpty(),
  isSendTransformMatrixDataMap: WonderCommonlib.SparseMapService.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArrayService.createEmpty()
};

let deepCopyForRestore =
    (
      {
        index,
        objectInstanceTransformArrayMap,
        matrixFloat32ArrayMap,
        matrixInstanceBufferCapacityMap,
        isTransformStaticMap,
        isSendTransformMatrixDataMap,
        gameObjectMap,
        disposedIndexArray
      }
    ) => {
  index,
  objectInstanceTransformArrayMap: objectInstanceTransformArrayMap |> CopyTypeArrayService.deepCopyArrayArray,
  matrixFloat32ArrayMap: matrixFloat32ArrayMap |> CopyTypeArrayService.deepCopyFloat32ArrayArray,
  matrixInstanceBufferCapacityMap: matrixInstanceBufferCapacityMap |> SparseMapService.copy,
  isTransformStaticMap: isTransformStaticMap |> SparseMapService.copy,
  isSendTransformMatrixDataMap,
  gameObjectMap: gameObjectMap |> SparseMapService.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};
