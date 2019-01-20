open StateDataMainType;

let getDirection = (index, {gameObjectRecord, globalTempRecord} as state) =>
  UpdateTransformMainService.updateAndGetRotationTuple(
    GetComponentGameObjectService.unsafeGetTransformComponent(
      GameObjectDirectionLightService.unsafeGetGameObject(
        index,
        RecordDirectionLightMainService.getRecord(state),
      ),
      gameObjectRecord,
    ),
    globalTempRecord,
    state |> RecordTransformMainService.getRecord,
  )
  |> Vector3Service.transformQuat((0., 0., 1.));

let buildDirectionMap = (getDirectionFunc, state) =>
  RecordDirectionLightMainService.getRecord(state).renderLightArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, i) =>
         map
         |> WonderCommonlib.MutableSparseMapService.set(
              i,
              getDirectionFunc(i, state),
            ),
       WonderCommonlib.MutableSparseMapService.createEmpty(),
     );