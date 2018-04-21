open StateDataMainType;

open GameObjectMeshRendererService;

open DisposeMeshRendererService;

open MeshRendererType;

let createMeshRenderer = (state) => {
  let (meshRendererRecord, index) = CreateMeshRendererService.create(state.meshRendererRecord);
  state.meshRendererRecord = meshRendererRecord;
  (state, index)
};

let unsafeGetMeshRendererGameObject = (meshRenderer: meshRenderer, state: StateDataMainType.state) => {
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetGameObject(meshRenderer, state.meshRendererRecord)
};