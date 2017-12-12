open SourceInstanceSystem;

open SourceInstanceType;

open Contract;

let createSourceInstance = (state: StateDataType.state) => create(state);

/* todo check alive */
let createSourceInstanceObjectInstance = (sourceInstance, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(sourceInstance, isAlive, state))
  );
  createInstance(sourceInstance, state)
};

let getSourceInstanceObjectInstanceList = (sourceInstance, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(sourceInstance, isAlive, state))
  );
  getObjectInstanceList(sourceInstance, state)
};

let markSourceInstanceModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: Js.boolean, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(sourceInstance, isAlive, state))
  );
  markModelMatrixIsStatic(sourceInstance, Js.to_bool(isStatic), state)
};