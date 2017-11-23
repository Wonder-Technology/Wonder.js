open ComponentSystem;

open MeshRendererStateUtils;

open MeshRendererType;

open Contract;

let create = (state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = getMeshRendererData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  (state, index)
};

let getRenderArray = (state: StateDataType.state) =>
  getMeshRendererData(state).renderGameObjectArray;

let getGameObject = (meshRenderer: meshRenderer, state: StateDataType.state) => {
  let {gameObjectMap} = getMeshRendererData(state);
  getComponentGameObject(meshRenderer, gameObjectMap)
};

let isAlive = (meshRenderer: meshRenderer, state: StateDataType.state) =>
  MeshRendererDisposeComponentUtils.isAlive(meshRenderer, state);

let initData = () => {
  index: 0,
  renderGameObjectArray: WonderCommonlib.ArraySystem.createEmpty(),
  gameObjectMap: WonderCommonlib.HashMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};