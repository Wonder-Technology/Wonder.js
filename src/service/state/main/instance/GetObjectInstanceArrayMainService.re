open StateDataMainType;

open SourceInstanceType;

let getObjectInstanceTransformArray = (sourceInstance, {settingRecord} as state) => {
  let {objectInstanceTransformIndexMap, objectInstanceTransformCollections} =
    RecordSourceInstanceMainService.getRecord(state);
  ObjectInstanceCollectionService.getObjectInstanceTransformArray(
    sourceInstance,
    BufferSettingService.getObjectInstanceCountPerSourceInstance(settingRecord),
    objectInstanceTransformIndexMap,
    objectInstanceTransformCollections
  )
};

let getObjectInstanceArray = (sourceInstance, state) => {
  let transformRecord = RecordTransformMainService.getRecord(state);
  getObjectInstanceTransformArray(sourceInstance, state)
  |> Js.Array.map(
       (transform) => GameObjectTransformService.unsafeGetGameObject(transform, transformRecord)
     )
};