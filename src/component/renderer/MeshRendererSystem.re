open ComponentSystem;

open MeshRendererStateSystem;

open MeshRendererType;

let handleAddComponent = MeshRendererAddComponentSystem.handleAddComponent;

let handleDisposeComponent = MeshRendererDisposeComponentSystem.handleDisposeComponent;

let handleBatchDisposeComponent = MeshRendererDisposeComponentSystem.handleBatchDisposeComponent;

let handleCloneComponent = MeshRendererCloneComponentSystem.handleCloneComponent;

let create = MeshRendererCreateSystem.create;

let getRenderArray = (state: StateDataType.state) =>
  getMeshRendererData(state).renderGameObjectArray;

let getGameObject = (meshRenderer: meshRenderer, state: StateDataType.state) => {
  let {gameObjectMap} = getMeshRendererData(state);
  getComponentGameObject(meshRenderer, gameObjectMap)
};

let isAlive = (meshRenderer: meshRenderer, state: StateDataType.state) =>
  MeshRendererDisposeComponentSystem.isAlive(meshRenderer, state);

let batchCreate = (countRangeArr: array(int), state: StateDataType.state) => {
  let {index, disposedIndexArray} as data = getMeshRendererData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  (state, index)
};

let initData = () => {
  index: 0,
  renderGameObjectArray: WonderCommonlib.ArraySystem.createEmpty(),
  gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};