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
    StateData.stateData.isTest
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
    StateData.stateData.isTest
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
    StateData.stateData.isTest
  );
  markModelMatrixIsStatic(sourceInstance, Js.to_bool(isStatic), state)
};