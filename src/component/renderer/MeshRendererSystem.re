open ComponentSystem;

open MeshRendererStateUtils;

open MeshRendererType;

open Contract;

let getMaxCount = (state: StateDataType.state) =>
  BufferConfigSystem.getConfig(state).meshRendererDataBufferCount;

let create = (state: StateDataType.state) => {
  /* let {index, disposedIndexArray} as data = getMeshRendererData(state);
  let index = generateIndex(getMaxCount(state), index, disposedIndexArray);
  data.index = succ(index); */

  /* let index = generateIndex(Obj.magic(getMeshRendererData(state)) ); */
let {index, disposedIndexArray} as data = getMeshRendererData(state);

  let ( index, newIndex ) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;

  (state, index)
  |> ensureCheck(
       ((state, _)) => {
         open Contract.Operators;
         let {index} = getMeshRendererData(state);
         let maxCount = getMaxCount(state);
         test(
           {j|have create too many components(the count of transforms shouldn't exceed $maxCount)|j},
           () => index <= maxCount
         )
       }
     )
};

let getRenderArray = (state: StateDataType.state) =>
  getMeshRendererData(state).renderGameObjectArray;

let getGameObject = (meshRenderer: meshRenderer, state: StateDataType.state) => {
  let {gameObjectMap} = getMeshRendererData(state);
  getComponentGameObject(meshRenderer, gameObjectMap)
};

let isAlive = (meshRenderer: meshRenderer, state: StateDataType.state) =>
  ComponentDisposeComponentUtils.isAlive(
    meshRenderer,
    getMeshRendererData(state).disposedIndexArray
  );

let initData = () => {
  index: 0,
  renderGameObjectArray: WonderCommonlib.ArraySystem.createEmpty(),
  gameObjectMap: WonderCommonlib.HashMapSystem.createEmpty(),
  disposedIndexArray: WonderCommonlib.ArraySystem.createEmpty()
};