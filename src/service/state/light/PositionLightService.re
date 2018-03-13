open StateDataType;

let getPosition = (gameObject, {gameObjectRecord, globalTempRecord, transformRecord}) =>
  UpdateTransformService.updateAndGetPositionTuple(
    GetComponentGameObjectService.unsafeGetTransformComponent(gameObject, gameObjectRecord),
    globalTempRecord,
    transformRecord
  );