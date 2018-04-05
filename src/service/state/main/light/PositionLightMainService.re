open StateDataMainType;

let getPosition = (gameObject, {gameObjectRecord, globalTempRecord} as state) =>
  UpdateTransformService.updateAndGetPositionTuple(
    GetComponentGameObjectService.unsafeGetTransformComponent(gameObject, gameObjectRecord),
    globalTempRecord,
    state |> RecordTransformMainService.getRecord
  );