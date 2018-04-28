open DisposeComponentService;

let disposeMatrixFloat32ArrayMap =
    (sourceInstance, maxBigTypeArrayPoolSize, matrixFloat32ArrayMap, typeArrayPoolRecord) => {
  switch (matrixFloat32ArrayMap |> WonderCommonlib.SparseMapService.get(sourceInstance)) {
  | Some(typeArr) =>
    [@bs]
    TypeArrayPoolService.addFloat32TypeArrayToPool(
      typeArr,
      maxBigTypeArrayPoolSize,
      TypeArrayPoolService.getFloat32ArrayPoolMap(typeArrayPoolRecord)
    )
    |> ignore
  | None => ()
  };
  matrixFloat32ArrayMap |> disposeSparseMapData(sourceInstance)
};

let disposeMatrixInstanceBufferCapacityMap = (sourceInstance, matrixInstanceBufferCapacityMap) =>
  matrixInstanceBufferCapacityMap |> disposeSparseMapData(sourceInstance);

let disposeIsSendTransformMatrixDataMap = (sourceInstance, isSendTransformMatrixDataMap) =>
  isSendTransformMatrixDataMap |> disposeSparseMapData(sourceInstance);