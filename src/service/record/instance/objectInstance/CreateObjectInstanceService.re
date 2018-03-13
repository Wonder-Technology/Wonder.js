open ComponentSystem;

open ObjectInstanceType;

let _setSourceInstance = (objectInstance, sourceInstance, sourceInstanceMap) =>
  sourceInstanceMap |> WonderCommonlib.SparseMapSystem.set(objectInstance, sourceInstance);

let create =
    (sourceInstance, uid, {index, sourceInstanceMap, gameObjectMap, disposedIndexArray} as record) => {
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  (
    {
      ...record,
      index: newIndex,
      sourceInstanceMap: sourceInstanceMap |> _setSourceInstance(index, sourceInstance),
      gameObjectMap: gameObjectMap |> AddComponentService.addComponentToGameObjectMap(index, uid)
    },
    index
  )
};