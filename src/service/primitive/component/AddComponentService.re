open ComponentType;

let addComponentToGameObjectMap =
    (component, gameObjectUid: int, gameObjectMap) =>
  WonderCommonlib.MutableSparseMapService.set(
    component,
    gameObjectUid,
    gameObjectMap,
  );

let addSharableComponentToGameObjectsMap =
    (component, gameObjectUid: int, gameObjectsMap) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ArrayMapService.checkDuplicate(
              {j|sharable component only add to the same gameObject once|j},
              component,
              gameObjectUid,
              gameObjectsMap,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  ArrayMapService.addValue(component, gameObjectUid, gameObjectsMap);
};