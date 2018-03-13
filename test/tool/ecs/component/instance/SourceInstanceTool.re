open StateDataType;

let createSourceInstanceGameObject = (state: StateDataType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let (state, sourceInstance) = InstanceTool.addSourceInstance(gameObject, state);
  /* let (state, _) = SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state); */
  let (state, _) = SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state);
  let state =
    VboBufferTool.passBufferShouldExistCheckWhenDisposeSourceInstance(sourceInstance, state);
  (state, gameObject, sourceInstance)
};

let createSourceInstanceGameObjectArr = (count, state: StateDataType.state) =>
  ArraySystem.range(0, count)
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         ((state, sourceInstanceGameObjectArr, sourceInstanceArr), index) => {
           let (state, gameObject, sourceInstance) = createSourceInstanceGameObject(state);
           sourceInstanceArr |> Js.Array.push(sourceInstance) |> ignore;
           sourceInstanceGameObjectArr |> Js.Array.push(gameObject) |> ignore;
           (state, sourceInstanceGameObjectArr, sourceInstanceArr)
         }
       ),
       (state, [||], [||])
     );

let getSourceInstanceData = (state) => state.sourceInstanceRecord;

let getSourceInstanceObjectInstanceArray = (sourceInstance, state) =>
  ObjectInstanceArraySourceInstanceService.getObjectInstanceArray(sourceInstance, state.sourceInstanceRecord);
  