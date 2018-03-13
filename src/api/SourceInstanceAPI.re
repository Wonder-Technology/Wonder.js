open StateDataType;

open SourceInstanceType;

open DisposeSourceInstanceService;

open CreateObjectInstanceGameObjectService;

open ObjectInstanceArraySourceInstanceService;

open StaticSourceInstanceService;

let createSourceInstance = (state) => {
  let (sourceInstanceRecord, index) =
    CreateSourceInstanceService.create(state.sourceInstanceRecord);
  ({...state, sourceInstanceRecord}, index)
};

let createObjectInstanceGameObject = (sourceInstance, state: StateDataType.state) => {
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
    StateData.stateData.isDebug
  );
  createInstance(sourceInstance, state)
};

let getSourceInstanceObjectInstanceArray = (sourceInstance, state: StateDataType.state) => {
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
    StateData.stateData.isDebug
  );
  getObjectInstanceArray(sourceInstance, state.sourceInstanceRecord)
};

let markSourceInstanceModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: Js.boolean, state: StateDataType.state) => {
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
    StateData.stateData.isDebug
  );
  {
    ...state,
    sourceInstanceRecord:
      markModelMatrixIsStatic(sourceInstance, Js.to_bool(isStatic), state.sourceInstanceRecord)
  }
};