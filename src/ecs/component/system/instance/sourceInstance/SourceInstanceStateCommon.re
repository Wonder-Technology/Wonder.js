open SourceInstanceType;

open StateDataType;

let getSourceInstanceData = (state: StateDataType.state) => state.sourceInstanceData;

let deepCopyForRestore = (state: StateDataType.state) => {
  let {
    index,
    objectInstanceArrayMap,
    matrixFloat32ArrayMap,
    matrixInstanceBufferCapacityMap,
    isTransformStaticMap,
    isSendTransformMatrixDataMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getSourceInstanceData;
  {
    ...state,
    sourceInstanceData: {
      index,
      objectInstanceArrayMap: objectInstanceArrayMap |> CopyStateUtils.deepCopyArrayArray,
      matrixFloat32ArrayMap:
        matrixFloat32ArrayMap |> CopyStateUtils.deepCopyFloat32ArrayArray,
      matrixInstanceBufferCapacityMap:
        matrixInstanceBufferCapacityMap |> SparseMapSystem.copy,
      isTransformStaticMap: isTransformStaticMap |> SparseMapSystem.copy,
      isSendTransformMatrixDataMap,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy
    }
  }
};

let _buildIsNotSendTransformMatrixDataMap = (isSendTransformMatrixDataMap) =>
  isSendTransformMatrixDataMap
  |> SparseMapSystem.reduceiValid(
       [@bs] ((newMap, _, index) => newMap |> WonderCommonlib.SparseMapSystem.set(index, false)),
       WonderCommonlib.SparseMapSystem.createEmpty()
     );

let restore = (currentState, {float32ArrayPoolMap} as sharedData, targetState) => {
  let {matrixFloat32ArrayMap} = getSourceInstanceData(currentState);
  let {isSendTransformMatrixDataMap} as targetData = getSourceInstanceData(targetState);
  let float32ArrayPoolMap =
    TypeArrayPoolService.addAllFloat32TypeArrayToPool(
      matrixFloat32ArrayMap,
      ConfigMemoryService.getMaxBigTypeArrayPoolSize(targetState.memoryConfig),
      float32ArrayPoolMap
    );
  (
    {
      ...targetState,
      sourceInstanceData: {
        ...targetData,
        isSendTransformMatrixDataMap: _buildIsNotSendTransformMatrixDataMap(isSendTransformMatrixDataMap)
      }
    },
    {...sharedData, float32ArrayPoolMap}
  )
};