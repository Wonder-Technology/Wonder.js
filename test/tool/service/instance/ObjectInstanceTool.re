open MainStateDataType;

let createObjectInstanceGameObject = (state: MainStateDataType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let (state, sourceInstance) = InstanceTool.addSourceInstance(gameObject, state);
  let state =
    VboBufferTool.passBufferShouldExistCheckWhenDisposeSourceInstance(sourceInstance, state);
  let (state, objectInstanceGameObject) =
    SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state);
  (
    state,
    gameObject,
    sourceInstance,
    objectInstanceGameObject,
    GameObjectAPI.unsafeGetGameObjectObjectInstanceComponent(objectInstanceGameObject, state)
  )
};

let createObjectInstanceGameObjectArr = (count, state: MainStateDataType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let (state, sourceInstance) = InstanceTool.addSourceInstance(gameObject, state);
  let state =
    VboBufferTool.passBufferShouldExistCheckWhenDisposeSourceInstance(sourceInstance, state);
  let objectInstanceGameObjectArr = [||];
  for (i in 0 to count - 1) {
    let (state, objectInstanceGameObject) =
      SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state);
    objectInstanceGameObjectArr |> Js.Array.push(objectInstanceGameObject) |> ignore
  };
  (
    state,
    gameObject,
    sourceInstance,
    objectInstanceGameObjectArr,
    objectInstanceGameObjectArr
    |> Js.Array.map(
         (objectInstanceGameObject) =>
           GameObjectAPI.unsafeGetGameObjectObjectInstanceComponent(
             objectInstanceGameObject,
             state
           )
       )
  )
};

let getObjectInstanceRecord = (state) => state.objectInstanceRecord;

let isDisposed = (objectInstance, state) => {
  open ObjectInstanceType;
  let {sourceInstanceMap} = getObjectInstanceRecord(state);
  ! (sourceInstanceMap |> WonderCommonlib.SparseMapService.has(objectInstance))
};