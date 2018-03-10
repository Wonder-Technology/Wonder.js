open ComponentSystem;

open MeshRendererStateCommon;

open MeshRendererType;

let handleAddComponent = MeshRendererAddComponentCommon.handleAddComponent;

let handleDisposeComponent = MeshRendererDisposeComponentCommon.handleDisposeComponent;

let handleBatchDisposeComponent = MeshRendererDisposeComponentCommon.handleBatchDisposeComponent;

let handleCloneComponent = MeshRendererCloneComponentCommon.handleCloneComponent;

let create = MeshRendererCreateCommon.create;

let getRenderArray = (state: StateDataType.state) =>
  getMeshRendererData(state).renderGameObjectArray;

let getGameObject = (meshRenderer: meshRenderer, state: StateDataType.state) => {
  let {gameObjectMap} = getMeshRendererData(state);
  getComponentGameObject(meshRenderer, gameObjectMap)
};

let isAlive = (meshRenderer: meshRenderer, state: StateDataType.state) =>
  MeshRendererDisposeComponentCommon.isAlive(meshRenderer, state);

let deepCopyForRestore = MeshRendererStateCommon.deepCopyForRestore;