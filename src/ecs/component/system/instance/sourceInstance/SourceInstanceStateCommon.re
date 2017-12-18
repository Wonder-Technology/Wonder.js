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
      /* isSendModelMatrixDataMap: isSendModelMatrixDataMap |> SparseMapSystem.copy, */
      isSendModelMatrixDataMap,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy
    }
  }
};

/* todo fix */
let _buildSendModelMatrixDataMap = (isSendModelMatrixDataMap) =>
  isSendModelMatrixDataMap
  |> SparseMapSystem.reduceiValid(
       [@bs] ((newMap, _, index) => newMap |> WonderCommonlib.SparseMapSystem.set(index, true)), 
       WonderCommonlib.SparseMapSystem.createEmpty()
     );

let restoreFromState = (currentState, {float32ArrayPoolMap} as sharedData, targetState) => {
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
    getSourceInstanceData(currentState);
  let {isSendModelMatrixDataMap} as targetData = getSourceInstanceData(targetState);
  let float32ArrayPoolMap =
    TypeArrayPoolSystem.addAllFloat32TypeArrayToPool(
      modelMatrixFloat32ArrayMap,
      float32ArrayPoolMap
    );
  (
    {
      ...targetState,
      sourceInstanceData: {
        ...targetData,
        isSendModelMatrixDataMap: _buildSendModelMatrixDataMap(isSendModelMatrixDataMap)
      }
    },
    {...sharedData, float32ArrayPoolMap}
  )
};