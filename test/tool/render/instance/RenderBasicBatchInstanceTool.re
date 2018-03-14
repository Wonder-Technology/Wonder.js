let createSourceInstanceGameObject = (sandbox, count, state) => {
  let (state, gameObject, geometry, material, meshRenderer) =
    RenderBasicJobTool.prepareGameObject(sandbox, state);
  let (state, sourceInstance) = SourceInstanceAPI.createSourceInstance(state);
  let state = state |> GameObjectAPI.addGameObjectSourceInstanceComponent(gameObject, sourceInstance);
  let (state, objectInstanceGameObjectList) =
    ArrayService.range(0, count - 1)
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs]
         (
           ((state, objectInstanceGameObjectList), _) => {
             let (state, objectInstanceGameObject) =
               SourceInstanceAPI.createObjectInstanceGameObject(sourceInstance, state);
             (state, [objectInstanceGameObject, ...objectInstanceGameObjectList])
           }
         ),
         (state, [])
       );
  (state, gameObject, geometry, objectInstanceGameObjectList)
};

let prepare = (sandbox, count, state) => {
  let state = state |> InstanceTool.setGPUDetectDataAllowBatchInstance;
  let (state, gameObject, componentTuple, objectInstanceGameObjectList) =
    createSourceInstanceGameObject(sandbox, count, state);
  let (state, _, _, _) = CameraTool.createCameraGameObject(state);
  (state, gameObject, componentTuple, objectInstanceGameObjectList)
};