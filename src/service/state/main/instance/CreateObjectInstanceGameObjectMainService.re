open StateDataType;

open SourceInstanceType;

let _addObjectInstnace = (sourceInstance, uid: int, objectInstanceArrayMap) => {
  objectInstanceArrayMap
  |> ObjectInstanceArraySourceInstanceService.unsafeGetObjectInstanceArray(sourceInstance)
  |> ArrayService.push(uid)
  |> ignore;
  objectInstanceArrayMap
};

/* TODO init objectInstance gameObjects when init? */
let createInstance = (sourceInstance, {sourceInstanceRecord, gameObjectRecord} as state) => {
  let (gameObjectRecord, uid) = CreateGameObjectGameObjectService.create(gameObjectRecord);
  let {objectInstanceArrayMap} = sourceInstanceRecord;
  let state = {
    ...state,
    gameObjectRecord,
    sourceInstanceRecord: {
      ...sourceInstanceRecord,
      objectInstanceArrayMap: objectInstanceArrayMap |> _addObjectInstnace(sourceInstance, uid)
    }
  };
  let (state, transform) = CreateTransformMainService.create(state);
  let (objectInstanceRecord, objectInstance) =
    CreateObjectInstanceService.create(sourceInstance, uid, state.objectInstanceRecord);
  let state = {...state, objectInstanceRecord};
  let state =
    state
    |> AddGameObjectComponentMainService.addTransformComponent(uid, transform)
    |> AddGameObjectComponentMainService.addObjectInstanceComponent(uid, objectInstance);
  (state, uid)
};