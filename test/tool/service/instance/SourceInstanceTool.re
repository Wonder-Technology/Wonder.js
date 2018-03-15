open MainStateDataType;

let createSourceInstanceGameObject = (state: MainStateDataType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let (state, sourceInstance) = InstanceTool.addSourceInstance(gameObject, state);
  /* let (state, _) = SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state); */
  let (state, _) = SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state);
  let state =
    VboBufferTool.passBufferShouldExistCheckWhenDisposeSourceInstance(sourceInstance, state);
  (state, gameObject, sourceInstance)
};

let createSourceInstanceGameObjectArr = (count, state: MainStateDataType.state) =>
  ArrayService.range(0, count)
  |> WonderCommonlib.ArrayService.reduceOneParam(
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

let getSourceInstanceRecord = (state) => state.sourceInstanceRecord;

let getSourceInstanceObjectInstanceArray = (sourceInstance, state) =>
  ObjectInstanceArraySourceInstanceService.getObjectInstanceArray(sourceInstance, state.sourceInstanceRecord);
  