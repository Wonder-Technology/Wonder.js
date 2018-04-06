open StateDataMainType;

let createSourceInstanceGameObject = (state: StateDataMainType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let (state, sourceInstance) = InstanceTool.addSourceInstance(gameObject, state);
  /* let (state, _) = SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state); */
  let (state, _) = SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state);
  let state =
    VboBufferTool.passBufferShouldExistCheckWhenDisposeSourceInstance(sourceInstance, state);
  (state, gameObject, sourceInstance)
};

let createSourceInstanceGameObjectArr = (count, state: StateDataMainType.state) =>
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


let getGameObject = (sourceInstance, state) => state.sourceInstanceRecord |> GameObjectSourceInstanceService.getGameObject(sourceInstance);

let getSourceInstanceObjectInstanceArray = (sourceInstance, state) =>
  GetObjectInstanceArraySourceInstanceService.getObjectInstanceArray(sourceInstance, state.sourceInstanceRecord);
  