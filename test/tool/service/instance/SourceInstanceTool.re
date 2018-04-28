open StateDataMainType;

open SourceInstanceType;

let createSourceInstanceGameObject = (state: StateDataMainType.state) => {
  let (state, gameObject) = GameObjectAPI.createGameObject(state);
  let (state, sourceInstance) = InstanceTool.addSourceInstance(gameObject, state);
  /* let (state, _) = SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state); */
  let (state, _) = SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state);
  let state = VboBufferTool.addVboBufferToSourceInstanceBufferMap(sourceInstance, state);
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

let getRecord = (state) => RecordSourceInstanceMainService.getRecord(state);

let getGameObject = (sourceInstance, state) =>
  state |> getRecord |> GameObjectSourceInstanceService.getGameObject(sourceInstance);

let hasObjectInstanceTransform = (sourceInstance, state) => {
  let {objectInstanceTransformIndexMap} = getRecord(state);
  ObjectInstanceCollectionService.getObjectInstanceTransformIndex(
    sourceInstance,
    objectInstanceTransformIndexMap
  )
  |> ObjectInstanceCollectionService.getObjectInstanceTransformCount > 0
};