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

let buildPositionMap = (getPositionFunc, state) =>
  RecordPointLightMainService.getRecord(state).renderLightArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. map, i) =>
         map
         |> WonderCommonlib.MutableSparseMapService.set(
              i,
              getPositionFunc(i, state),
            ),
       WonderCommonlib.MutableSparseMapService.createEmpty(),
     );