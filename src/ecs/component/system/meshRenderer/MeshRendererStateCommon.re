open StateDataType;

open MeshRendererType;

let getMeshRendererData = (state: StateDataType.state) => state.meshRendererData;

let deepCopyState = ({meshRendererData} as state) => {
  let {index, renderGameObjectArray, gameObjectMap, disposedIndexArray} = meshRendererData;
  {
    ...state,
    meshRendererData: {
      index,
      renderGameObjectArray: renderGameObjectArray |> Js.Array.copy,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy
    }
  }
};

let restoreFromState = (targetState, currentState) => {
  currentState.meshRendererData = targetState.meshRendererData;
  currentState
};