open StateDataType;

open MaterialType;

let getMaterialData = (state: StateDataType.state) => Js.Option.getExn(state.materialData);

let deepCopyState = (state: StateDataType.state) => {
  let {index, colorMap, groupCountMap, gameObjectMap, disposedIndexArray} =
    state |> getMaterialData;
  {
    ...state,
    materialData:
      Some({
        index,
        shaderIndexMap: [||],
        colorMap: colorMap |> SparseMapSystem.copy,
        groupCountMap: groupCountMap |> SparseMapSystem.copy,
        gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};

let restore = (currentState, targetState) => {
  ...targetState,
  materialData: Some({...getMaterialData(targetState), shaderIndexMap: [||]})
};