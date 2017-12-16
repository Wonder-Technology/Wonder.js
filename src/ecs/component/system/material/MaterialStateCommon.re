open StateDataType;

open MaterialType;

let getMaterialData = (state: StateDataType.state) => Js.Option.getExn(state.materialData);

let deepCopyState = (state: StateDataType.state) => {
  let {index, shaderIndexMap, colorMap, groupCountMap, gameObjectMap, disposedIndexArray} =
    state |> getMaterialData;
  {
    ...state,
    materialData:
      Some({
        index,
        shaderIndexMap: shaderIndexMap |> SparseMapSystem.copy,
        colorMap: colorMap |> SparseMapSystem.copy,
        groupCountMap: groupCountMap |> SparseMapSystem.copy,
        gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy
      })
  }
};