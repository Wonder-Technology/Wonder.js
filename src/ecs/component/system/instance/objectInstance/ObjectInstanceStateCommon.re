open ObjectInstanceType;

let getObjectInstanceData = (state: StateDataType.state) => state.objectInstanceData;

let deepCopyState = (state: StateDataType.state) => {
  let {index, sourceInstanceMap, disposedIndexArray, gameObjectMap} =
    state |> getObjectInstanceData;
  {
    ...state,
    objectInstanceData: {
      index,
      sourceInstanceMap: sourceInstanceMap |> SparseMapSystem.copy,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy
    }
  }
};