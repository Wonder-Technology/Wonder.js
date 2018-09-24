open StateDataMainType;

let isSupportInstance = (state: StateDataMainType.state) =>
  JudgeInstanceService.isSupportInstance(
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
                  GameObjectsMapService.unsafeGetGameObjects(
                    materialIndex,
                    gameObjectsMap,
                  );
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
              },
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  gameObjectRecord
  |> HasComponentGameObjectService.hasSourceInstanceComponent(
       GameObjectsMapService.unsafeGetGameObjects(
         materialIndex,
         gameObjectsMap,
       )
       |> ArrayService.unsafeGetFirst,
     );
};

let buildMap = (index, gameObjectsMap, gameObjectRecord) =>
  ArrayService.range(0, index - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, materialIndex: int) =>
         map
         |> WonderCommonlib.SparseMapService.set(
              materialIndex,
              isSourceInstance(
                materialIndex,
                gameObjectsMap,
                gameObjectRecord,
              ),
            ),
       WonderCommonlib.SparseMapService.createEmpty(),
     );