open ComponentSystem;

open ObjectInstanceType;

let _setSourceInstance = (objectInstance, sourceInstance, {sourceInstanceMap} as data) => {
  sourceInstanceMap |> WonderCommonlib.SparseMapSystem.set(objectInstance, sourceInstance);
  data
};

let create = (sourceInstance, uid, state: StateDataType.state) => {
  let {index, gameObjectMap, disposedIndexArray} as data =
    ObjectInstanceStateCommon.getObjectInstanceData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  data |> _setSourceInstance(index, sourceInstance) |> ignore;
  ComponentSystem.addComponentToGameObjectMap(index, uid, gameObjectMap) |> ignore;
  (state, index)
};