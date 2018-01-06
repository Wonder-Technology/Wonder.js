let createObjectInstanceGameObject = (state: StateDataType.state) => {
  let (state, gameObject) = GameObject.createGameObject(state);
  let (state, sourceInstance) = InstanceTool.addSourceInstance(gameObject, state);
  let state =
    VboBufferTool.passBufferShouldExistCheckWhenDisposeSourceInstance(sourceInstance, state);
  let (state, objectInstanceGameObject) = SourceInstance.createSourceInstanceObjectInstance(sourceInstance, state);
  (
    state,
    gameObject,
    sourceInstance,
    objectInstanceGameObject,
    GameObject.getGameObjectObjectInstanceComponent(objectInstanceGameObject, state)
    |> Js.Option.getExn
  )
};

let createObjectInstanceGameObjectArr = (count, state: StateDataType.state) => {
  let (state, gameObject) = GameObject.createGameObject(state);
  let (state, sourceInstance) = InstanceTool.addSourceInstance(gameObject, state);
  let state =
    VboBufferTool.passBufferShouldExistCheckWhenDisposeSourceInstance(sourceInstance, state);
  let objectInstanceGameObjectArr = [||];
  for (i in 0 to count - 1) {
    let (state, objectInstanceGameObject) = SourceInstance.createSourceInstanceObjectInstance(sourceInstance, state);
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
           GameObject.getGameObjectObjectInstanceComponent(objectInstanceGameObject, state)
           |> Js.Option.getExn
       )
  )
};

let getObjectInstanceData = ObjectInstanceStateCommon.getObjectInstanceData;

let isDisposed = (objectInstance, state) => {
  open ObjectInstanceType;
  let {sourceInstanceMap} = getObjectInstanceData(state);
  ! (sourceInstanceMap |> WonderCommonlib.SparseMapSystem.has(objectInstance))
};