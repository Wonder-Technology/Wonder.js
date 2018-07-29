open DirectionLightType;

let handleAddComponent =
  (. light, gameObjectUid: int, {gameObjectMap} as record) => {
    ...record,
    gameObjectMap:
      AddComponentService.addComponentToGameObjectMap(
        /* light, */
        MappedIndexService.getMappedIndex(
          light,
          IndexDirectionLightService.getMappedIndexMap(record),
        ),
        gameObjectUid,
        gameObjectMap,
      ),
  };