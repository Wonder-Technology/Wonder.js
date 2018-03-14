open MainStateDataType;

open GameObjectMeshRendererService;

open DisposeMeshRendererService;

open MeshRendererType;

let createMeshRenderer = (state) => {
  let (meshRendererRecord, index) = CreateMeshRendererService.create(state.meshRendererRecord);
  ({...state, meshRendererRecord}, index)
};

let unsafeGetMeshRendererGameObject = (meshRenderer: meshRenderer, state: MainStateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              meshRenderer,
              isAlive,
              state.meshRendererRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  unsafeGetGameObject(meshRenderer, state.meshRendererRecord)
};