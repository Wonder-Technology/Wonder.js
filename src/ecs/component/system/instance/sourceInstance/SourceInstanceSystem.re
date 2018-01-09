open SourceInstanceType;

let isAlive = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  SourceInstanceDisposeComponentCommon.isAlive(sourceInstance, state);

let create = (state: StateDataType.state) => SourceInstanceCreateCommon.create(state);

let getSourceInstanceData = SourceInstanceStateCommon.getSourceInstanceData;

let isSendModelMatrix = SourceInstanceStaticCommon.isSendModelMatrix;

let markSendModelMatrix = SourceInstanceStaticCommon.markSendModelMatrix;

let getObjectInstanceArray = (sourceInstance, state: StateDataType.state) =>
  SourceInstanceObjectInstanceArrayCommon.getObjectInstanceArray(sourceInstance, state);

let _addObjectInstnace = (sourceInstance, uid, {objectInstanceArrayMap} as data) => {
  objectInstanceArrayMap
  |> SourceInstanceObjectInstanceArrayCommon.unsafeGetObjectInstanceArray(sourceInstance)
  |> Js.Array.push(uid)
  |> ignore;
  data
};

/* TODO init objectInstance gameObjects when init? */
let createInstance = (sourceInstance, state: StateDataType.state) => {
  let (state, uid) = GameObjectCreateCommon.create(state);
  _addObjectInstnace(sourceInstance, uid, SourceInstanceStateCommon.getSourceInstanceData(state))
  |> ignore;
  let (state, transform) = TransformSystem.create(state);
  let (state, objectInstance) = ObjectInstanceSystem.create(sourceInstance, uid, state);
  let state =
    state
    |> GameObjectAddComponentCommon.addTransformComponent(uid, transform)
    |> GameObjectAddComponentCommon.addObjectInstanceComponent(uid, objectInstance);
  (state, uid)
};

let getGameObject = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  ComponentSystem.getComponentGameObject(
    sourceInstance,
    SourceInstanceStateCommon.getSourceInstanceData(state).gameObjectMap
  );

let markModelMatrixIsStatic = SourceInstanceStaticCommon.markModelMatrixIsStatic;

let isModelMatrixIsStatic = SourceInstanceStaticCommon.isModelMatrixIsStatic;

let deepCopyStateForRestore = SourceInstanceStateCommon.deepCopyStateForRestore;

let restore = SourceInstanceStateCommon.restore;