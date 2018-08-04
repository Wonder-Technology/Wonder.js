open StateDataMainType;

let getDirection =
    (
      index,
      {gameObjectRecord, globalTempRecord, directionLightRecord} as state,
    ) =>
  UpdateTransformMainService.updateAndGetRotationTuple(
    GetComponentGameObjectService.unsafeGetTransformComponent(
      GameObjectDirectionLightService.unsafeGetGameObject(
        index,
        directionLightRecord,
      ),
      gameObjectRecord,
    ),
    globalTempRecord,
    state |> RecordTransformMainService.getRecord,
  )
  |> Vector3Service.transformQuat((0., 0., 1.));

let buildDirectionMap = (index, getDirectionFunc, state) =>
  ArrayService.range(0, index - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, i) =>
         map
         |> WonderCommonlib.SparseMapService.set(
              i,
              getDirectionFunc(i, state),
            ),
       WonderCommonlib.SparseMapService.createEmpty(),
     );