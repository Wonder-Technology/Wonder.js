open SourceInstanceType;

let create = () => {
  index: 0,
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  objectInstanceArrayMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  matrixFloat32ArrayMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  matrixInstanceBufferCapacityMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  isTransformStaticMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  isSendTransformMatrixDataMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};

let deepCopyForRestore =
    (
      {
        index,
        objectInstanceArrayMap,
        matrixFloat32ArrayMap,
        matrixInstanceBufferCapacityMap,
        isTransformStaticMap,
        isSendTransformMatrixDataMap,
        gameObjectMap,
        disposedIndexArray
      }
    ) => {
  index,
  objectInstanceArrayMap: objectInstanceArrayMap |> CopyTypeArrayService.deepCopyArrayArray,
  matrixFloat32ArrayMap: matrixFloat32ArrayMap |> CopyTypeArrayService.deepCopyFloat32ArrayArray,
  matrixInstanceBufferCapacityMap: matrixInstanceBufferCapacityMap |> SparseMapSystem.copy,
  isTransformStaticMap: isTransformStaticMap |> SparseMapSystem.copy,
  isSendTransformMatrixDataMap,
  gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
  disposedIndexArray: disposedIndexArray |> Js.Array.copy
};
