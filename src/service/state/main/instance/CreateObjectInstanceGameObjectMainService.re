open StateDataMainType;

open SourceInstanceType;

let _addObjectInstanceTransform = (sourceInstance, transform, objectInstanceTransformArrayMap) => {
  objectInstanceTransformArrayMap
  |> GetObjectInstanceArrayService.unsafeGetObjectInstanceTransformArray(sourceInstance)
  |> ArrayService.push(transform)
  |> ignore;
  objectInstanceTransformArrayMap
  /* TODO ensure check:has no duplicate transform */
};

/* TODO init objectInstance gameObjects when init? */
let createInstance = (sourceInstance, {sourceInstanceRecord, gameObjectRecord} as state) => {
  let (gameObjectRecord, uid) = CreateGameObjectGameObjectService.create(gameObjectRecord);
  let (state, transform) = CreateTransformMainService.create(state);
  let {objectInstanceTransformArrayMap} = sourceInstanceRecord;
  state.gameObjectRecord = gameObjectRecord;
  state.sourceInstanceRecord = {
    ...sourceInstanceRecord,
    objectInstanceTransformArrayMap:
      objectInstanceTransformArrayMap |> _addObjectInstanceTransform(sourceInstance, transform)
  };
  let (objectInstanceRecord, objectInstance) =
    CreateObjectInstanceService.create(sourceInstance, uid, state.objectInstanceRecord);
  state.objectInstanceRecord = objectInstanceRecord;
  let state =
    state
    |> AddGameObjectComponentMainService.addTransformComponent(uid, transform)
    |> AddGameObjectComponentMainService.addObjectInstanceComponent(uid, objectInstance);
  (state, uid)
};