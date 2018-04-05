open StateDataMainType;

open SourceInstanceType;

open DisposeSourceInstanceMainService;

open CreateObjectInstanceGameObjectMainService;

open ObjectInstanceArraySourceInstanceService;

open StaticSourceInstanceService;

open GameObjectSourceInstanceService;

let createSourceInstance = (state) => {
  let (sourceInstanceRecord, index) =
    CreateSourceInstanceService.create(state.sourceInstanceRecord);
  ({...state, sourceInstanceRecord}, index)
};

let unsafeGetSourceInstanceGameObject = (sourceInstance, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              state.sourceInstanceRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  unsafeGetGameObject(sourceInstance, state.sourceInstanceRecord)
};

let createObjectInstanceGameObject = (sourceInstance, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              state.sourceInstanceRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  createInstance(sourceInstance, state)
};

let getSourceInstanceObjectInstanceArray = (sourceInstance, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              state.sourceInstanceRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  getObjectInstanceArray(sourceInstance, state.sourceInstanceRecord)
};

let markSourceInstanceModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: Js.boolean, state: StateDataMainType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            AliveComponentService.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              state.sourceInstanceRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  {
    ...state,
    sourceInstanceRecord:
      markModelMatrixIsStatic(sourceInstance, Js.to_bool(isStatic), state.sourceInstanceRecord)
  }
};