open StateDataMainType;

let getPosition = (gameObject, {gameObjectRecord, globalTempRecord} as state) =>
  UpdateTransformService.updateAndGetPositionTuple(
    GetComponentGameObjectService.unsafeGetTransformComponent(gameObject, gameObjectRecord),
    globalTempRecord,
    state |> RecordTransformMainService.getRecord
  );

let buildPositionMap = (index, getPositionFunc, state) =>
  ArrayService.range(0, index - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       ((map, i) => map |> WonderCommonlib.SparseMapService.set(i, getPositionFunc(i, state))),
       WonderCommonlib.SparseMapService.createEmpty()
     );