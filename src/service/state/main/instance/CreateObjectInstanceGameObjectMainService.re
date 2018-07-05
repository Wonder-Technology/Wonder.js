open StateDataMainType;

open SourceInstanceType;

/* TODO init objectInstance gameObjects when init? */
let createInstance = (sourceInstance, {settingRecord, gameObjectRecord} as state) => {
  let (gameObjectRecord, uid) = CreateGameObjectGameObjectService.create(gameObjectRecord);
  let (state, transform) = CreateTransformMainService.create(state);
  let {objectInstanceTransformCollections, objectInstanceTransformIndexMap} as sourceInstanceRecord =
    RecordSourceInstanceMainService.getRecord(state);
  state.gameObjectRecord = gameObjectRecord;
  let (objectInstanceTransformIndexMap, objectInstanceTransformCollections) =
    ObjectInstanceCollectionService.addObjectInstanceTransform(
      sourceInstance,
      transform,
      BufferSettingService.getObjectInstanceCountPerSourceInstance(settingRecord),
      (objectInstanceTransformIndexMap, objectInstanceTransformCollections)
    );
  state.sourceInstanceRecord =
    Some({
      ...sourceInstanceRecord,
      objectInstanceTransformIndexMap,
      objectInstanceTransformCollections
    });
  let (objectInstanceRecord, objectInstance) =
    CreateObjectInstanceService.create(sourceInstance, uid, state.objectInstanceRecord);
  state.objectInstanceRecord = objectInstanceRecord;
  let state =
    state
    |> AddComponentGameObjectMainService.addTransformComponent(uid, transform)
    |> AddComponentGameObjectMainService.addObjectInstanceComponent(uid, objectInstance);
  (state, uid)
};