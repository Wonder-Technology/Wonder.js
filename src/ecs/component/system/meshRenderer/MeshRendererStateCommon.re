open StateDataType;

open MeshRendererType;

let getMeshRendererData = (state: StateDataType.state) => state.meshRendererData;

let deepCopyState = (state: StateDataType.state) => {
  let {index, renderGameObjectArray, gameObjectMap, disposedIndexArray} =
    state |> getMeshRendererData;
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