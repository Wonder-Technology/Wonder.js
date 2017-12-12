open SourceInstanceSystem;

open SourceInstanceType;

open Contract;

let createSourceInstance = (state: StateDataType.state) => create(state);

let createSourceInstanceObjectInstance = (sourceInstance, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(sourceInstance, isAlive, state))
  );
  createInstance(sourceInstance, state)
};

let getSourceInstanceObjectInstanceArray = (sourceInstance, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(sourceInstance, isAlive, state))
  );
  getObjectInstanceArray(sourceInstance, state)
};

let markSourceInstanceModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: Js.boolean, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(sourceInstance, isAlive, state))
  );
  markModelMatrixIsStatic(sourceInstance, Js.to_bool(isStatic), state)
};