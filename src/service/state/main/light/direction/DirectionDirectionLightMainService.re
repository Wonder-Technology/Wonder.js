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

let buildDirectionMap =
    (getDirectionFunc, {directionLightRecord} as state) =>
  directionLightRecord.renderLightArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, i) =>
         map
         |> WonderCommonlib.SparseMapService.set(
              i,
              getDirectionFunc(i, state),
            ),
       WonderCommonlib.SparseMapService.createEmpty(),
     );