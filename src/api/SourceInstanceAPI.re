open StateDataMainType;

open InstanceType;

open SourceInstanceType;

open DisposeSourceInstanceMainService;

open CreateObjectInstanceGameObjectMainService;

open GetObjectInstanceArrayMainService;

open StaticSourceInstanceService;

open GameObjectSourceInstanceService;

let createSourceInstance = (state) => {
  let (sourceInstanceRecord, index) =
    CreateSourceInstanceService.create(state.sourceInstanceRecord);
  state.sourceInstanceRecord = sourceInstanceRecord;
  (state, index)
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

let getSourceInstanceObjectInstanceTransformArray =
    (sourceInstance, state: StateDataMainType.state) => {
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
  getObjectInstanceTransformArray(sourceInstance, state.sourceInstanceRecord)
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