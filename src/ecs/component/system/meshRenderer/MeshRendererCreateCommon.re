open ComponentSystem;

open MeshRendererStateCommon;

open MeshRendererType;

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = getMeshRendererData(state);
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  ({...state, meshRendererData: {...data, index: newIndex, disposedIndexArray}}, index)
};