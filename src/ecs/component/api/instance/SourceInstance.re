open SourceInstanceSystem;

open SourceInstanceType;

let createSourceInstance = (state: StateDataType.state) => create(state);

let createSourceInstanceObjectInstance = (sourceInstance, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(ComponentSystem.checkComponentShouldAlive(sourceInstance, isAlive, state))
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
          Operators.(ComponentSystem.checkComponentShouldAlive(sourceInstance, isAlive, state))
        )
      ),
    StateData.stateData.isDebug
  );
  getObjectInstanceArray(sourceInstance, state)
};

let markSourceInstanceModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: Js.boolean, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(ComponentSystem.checkComponentShouldAlive(sourceInstance, isAlive, state))
        )
      ),
    StateData.stateData.isDebug
  );
  markModelMatrixIsStatic(sourceInstance, Js.to_bool(isStatic), state)
};