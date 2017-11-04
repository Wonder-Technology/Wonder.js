open MeshRendererStateUtils;

open MeshRendererType;

let create = (state: StateDataType.state) => {
  let data = getMeshRendererData(state);
  let index = data.index;
  data.index = succ(data.index);
  (state, index)
};

let getRenderList = (state: StateDataType.state) =>
  getMeshRendererData(state).renderGameObjectArray;

let initData = () => {
  index: 0,
  renderGameObjectArray: ArraySystem.createEmpty(),
  gameObjectMap: HashMapSystem.createEmpty()
};