open StateDataMainType;

let isSupportInstance = (state: StateDataMainType.state) =>
  JudgeAllInstanceService.isSupportInstance(
    OperateSettingService.unsafeGetGPU(state.settingRecord).
      useHardwareInstance,
    state.gpuDetectRecord,
  );

let isSourceInstance = (materialIndex, gameObjectsMap, gameObjectRecord) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|all gameObjects are or are not sourceInstance|j},
                ~actual={j|some are, the others are not|j},
              ),
              () => {
                let gameObjects =
                  GameObjectsMapService.getGameObjects(
                    materialIndex,
                    gameObjectsMap,
                  );

                switch (gameObjects) {
                | None => assertPass()
                | Some(gameObjects) =>
                  let gameObjectsLen = Js.Array.length(gameObjects);
                  let isSourceInstanceLen =
                    gameObjects
                    |> Js.Array.filter(gameObject =>
                         gameObjectRecord
                         |> HasComponentGameObjectService.hasSourceInstanceComponent(
                              gameObject,
                            )
                       )
                    |> Js.Array.length;

                  (
                    isSourceInstanceLen === gameObjectsLen
                    || isSourceInstanceLen === 0
                  )
                  |> assertTrue;
                };
              },
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  switch (GameObjectsMapService.getGameObjects(materialIndex, gameObjectsMap)) {
  | None => false
  | Some(gameObjects) =>
    gameObjectRecord
    |> HasComponentGameObjectService.hasSourceInstanceComponent(
         gameObjects |> ArrayService.unsafeGetFirst,
       )
  };
};

let buildMap = (index, gameObjectsMap, gameObjectRecord) =>
  ArrayService.range(0, index - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, materialIndex: int) =>
         map
         |> WonderCommonlib.MutableSparseMapService.set(
              materialIndex,
              isSourceInstance(
                materialIndex,
                gameObjectsMap,
                gameObjectRecord,
              ),
            ),
       WonderCommonlib.MutableSparseMapService.createEmpty(),
     );