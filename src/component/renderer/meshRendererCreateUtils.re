open ComponentSystem;

open MeshRendererStateUtils;

open MeshRendererType;

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = getMeshRendererData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  (state, index)
};