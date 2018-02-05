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
  |> ArraySystem.push(uid)
  |> ignore;
  objectInstanceArrayMap
};

/* TODO init objectInstance gameObjects when init? */
let createInstance = (sourceInstance, state: StateDataType.state) => {
  let (state, uid) = GameObjectCreateCommon.create(state);
  let {objectInstanceArrayMap} as data = SourceInstanceStateCommon.getSourceInstanceData(state);
  let state = {
    ...state,
    sourceInstanceData: {
      ...data,
      objectInstanceArrayMap: objectInstanceArrayMap |> _addObjectInstnace(sourceInstance, uid)
    }
  };
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

let isTransformStatic = SourceInstanceStaticCommon.isTransformStatic;

let deepCopyStateForRestore = SourceInstanceStateCommon.deepCopyStateForRestore;

let restore = SourceInstanceStateCommon.restore;