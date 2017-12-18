open SourceInstanceType;

open StateDataType;

let getSourceInstanceData = (state: StateDataType.state) => state.sourceInstanceData;

let deepCopyState = (state: StateDataType.state) => {
  let {
    index,
    objectInstanceArrayMap,
    modelMatrixFloat32ArrayMap,
    modelMatrixInstanceBufferCapacityMap,
    isModelMatrixStaticMap,
    isSendModelMatrixDataMap,
    gameObjectMap,
    disposedIndexArray
  } =
    state |> getSourceInstanceData;
  {
    ...state,
    sourceInstanceData: {
      index,
      objectInstanceArrayMap: objectInstanceArrayMap |> CopyStateUtils.deepCopyArrayArray,
      modelMatrixFloat32ArrayMap:
        modelMatrixFloat32ArrayMap |> CopyStateUtils.deepCopyFloat32ArrayArray,
      modelMatrixInstanceBufferCapacityMap:
        modelMatrixInstanceBufferCapacityMap |> SparseMapSystem.copy,
      isModelMatrixStaticMap: isModelMatrixStaticMap |> SparseMapSystem.copy,
      isSendModelMatrixDataMap,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy
    }
  }
};

let _buildIsNotSendModelMatrixDataMap = (isSendModelMatrixDataMap) =>
  isSendModelMatrixDataMap
  |> SparseMapSystem.reduceiValid(
       [@bs] ((newMap, _, index) => newMap |> WonderCommonlib.SparseMapSystem.set(index, false)),
       WonderCommonlib.SparseMapSystem.createEmpty()
     );

let restoreFromState = (currentState, {float32ArrayPoolMap} as sharedData, targetState) => {
  let {modelMatrixFloat32ArrayMap} = getSourceInstanceData(currentState);
  let {isSendModelMatrixDataMap} as targetData = getSourceInstanceData(targetState);
  let float32ArrayPoolMap =
    TypeArrayPoolSystem.addAllFloat32TypeArrayToPool(
      modelMatrixFloat32ArrayMap,
      MemoryConfigSystem.getMaxBigTypeArrayPoolSize(targetState),
      float32ArrayPoolMap
    );
  (
    {
      ...targetState,
      sourceInstanceData: {
        ...targetData,
        isSendModelMatrixDataMap: _buildIsNotSendModelMatrixDataMap(isSendModelMatrixDataMap)
      }
    },
    {...sharedData, float32ArrayPoolMap}
  )
};