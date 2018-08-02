open StateDataMainType;

open GameObjectMeshRendererService;

open DisposeMeshRendererService;

open MeshRendererType;

open OperateMeshRendererMainService;

let createMeshRenderer = state =>
  CreateMeshRendererMainService.create(. state);

let unsafeGetMeshRendererGameObject =
    (meshRenderer: meshRenderer, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              meshRenderer,
              isAlive,
              RecordMeshRendererMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  unsafeGetGameObject(
    meshRenderer,
    RecordMeshRendererMainService.getRecord(state),
  );
};

let getMeshRendererDrawMode =
    (meshRenderer: meshRenderer, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              meshRenderer,
              isAlive,
              RecordMeshRendererMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  getDrawMode(meshRenderer, state);
};

let setMeshRendererDrawMode =
    (meshRenderer: meshRenderer, drawMode, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              meshRenderer,
              isAlive,
              RecordMeshRendererMainService.getRecord(state),
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  setDrawMode(meshRenderer, drawMode, state);
};