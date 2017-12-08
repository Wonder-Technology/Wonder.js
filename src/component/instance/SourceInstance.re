open SourceInstanceSystem;

open SourceInstanceType;

let createSourceInstance = create;

/* todo check alive */
let createInstance = createInstance;

let getObjectInstanceList = getObjectInstanceList;

let markModelMatrixIsStatic =
    (sourceInstance: sourceInstance, isStatic: Js.boolean, state: StateDataType.state) =>
  markModelMatrixIsStatic(sourceInstance, Js.to_bool(isStatic), state);