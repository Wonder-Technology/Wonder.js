open StateDataMainType;

let getPosition = (gameObject, {gameObjectRecord, globalTempRecord} as state) =>
  UpdateTransformMainService.updateAndGetPositionTuple(
    GetComponentGameObjectService.unsafeGetTransformComponent(
      gameObject,
      gameObjectRecord,
    ),
    globalTempRecord,
    state |> RecordTransformMainService.getRecord,
  );

let buildPositionMap = (getPositionFunc, {pointLightRecord} as state) =>
  pointLightRecord.renderLightArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, i) =>
         map
         |> WonderCommonlib.SparseMapService.set(
              i,
              getPositionFunc(i, state),
            ),
       WonderCommonlib.SparseMapService.createEmpty(),
     );