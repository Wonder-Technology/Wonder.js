open SourceInstanceType;

let isAlive = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  SourceInstanceDisposeComponentCommon.isAlive(sourceInstance, state);

let create = (state: StateDataType.state) => SourceInstanceCreateCommon.create(state);

let getSourceInstanceData = SourceInstanceStateCommon.getSourceInstanceData;

let isSendTransformMatrixData = SourceInstanceStaticCommon.isSendTransformMatrixData;

let markIsSendTransformMatrixData = SourceInstanceStaticCommon.markIsSendTransformMatrixData;

let getObjectInstanceArray = (sourceInstance, state: StateDataType.state) =>
  SourceInstanceObjectInstanceArrayCommon.getObjectInstanceArray(sourceInstance, state);

let _addObjectInstnace = (sourceInstance, uid: int, objectInstanceArrayMap) => {
  objectInstanceArrayMap
  |> SourceInstanceObjectInstanceArrayCommon.unsafeGetObjectInstanceArray(sourceInstance)
  |> ArrayService.push(uid)
  |> ignore;
  objectInstanceArrayMap
};

/* TODO init objectInstance gameObjects when init? */
let createInstance = (sourceInstance, state: StateDataType.state) => {
  /* TODO add gameObjectRecord to state */
  let (gameObjectRecord, uid) = CreateGameObjectGameObjectService.create(state.gameObjectRecord);
  let {objectInstanceArrayMap} as data = SourceInstanceStateCommon.getSourceInstanceData(state);
  let state = {
    ...state,
    sourceInstanceData: {
      ...data,
      objectInstanceArrayMap: objectInstanceArrayMap |> _addObjectInstnace(sourceInstance, uid)
    }
  };
  /* TODO add record to state */
  /* let (typeArrayPoolRecord, transformRecord, transform) =
     CreateTransformService.create(state.typeArrayPoolRecord, state.transformRecord); */
  let (state, transform) = CreateTransformService.create(state);
  let (state, objectInstance) = ObjectInstanceSystem.create(sourceInstance, uid, state);
  /* let (transformRecord, gameObjectRecord) =
     (transformRecord, state.gameObjectRecord)
     |> AddGameObjectComponentService.addTransformComponent(uid, transform); */
  let state = state |> AddGameObjectComponentService.addTransformComponent(uid, transform);
  /* let state = {...state, transformRecord, gameObjectRecord}; */
  let state =
    state |> GameObjectAddComponentCommon.addObjectInstanceComponent(uid, objectInstance);
  (state, uid)
};

let getGameObject = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(
    sourceInstance,
    SourceInstanceStateCommon.getSourceInstanceData(state).gameObjectMap
  );

let markModelMatrixIsStatic = SourceInstanceStaticCommon.markModelMatrixIsStatic;

let isTransformStatic = SourceInstanceStaticCommon.isTransformStatic;

let deepCopyForRestore = SourceInstanceStateCommon.deepCopyForRestore;

let restore = SourceInstanceStateCommon.restore;