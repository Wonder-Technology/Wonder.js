open TransformSystem;

open TransformType;

let createTransform = create;

let getTransformGameObject = (transform: transform, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getGameObject(transform, state) |> Js.Option.getExn
};

let getTransformParent = (transform: transform, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getParent(transform, state) |> Js.Nullable.from_opt
};

let setTransformParent =
    (parent: Js.nullable(transform), child: transform, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      Js.Nullable.iter(
        parent,
        [@bs] ((parent) => ComponentSystem.checkComponentShouldAlive(parent, isAlive, state))
      );
      ComponentSystem.checkComponentShouldAlive(child, isAlive, state)
    },
    StateData.stateData.isDebug
  );
  setParent(parent, child, state)
};

let getTransformChildren = (transform: transform, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getChildren(transform, state)
};

/* let getTransformLocalPositionTypeArray = (transform: transform, state: StateDataType.state) => {
     requireCheck(
       () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
     );
     getLocalPositionTypeArray(transform, state)
   }; */
let getTransformLocalPosition = (transform: transform, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getLocalPositionTuple(transform, state)
};

/* let setTransformLocalPositionByTypeArray =
       (transform: transform, localPosition, state: StateDataType.state) => {
     requireCheck(
       () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
     );
     setLocalPositionByTypeArray(transform, localPosition, state)
   }; */
let setTransformLocalPosition = (transform: transform, localPosition, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setLocalPositionByTuple(transform, localPosition, state)
};

/* let getTransformPositionTypeArray = (transform: transform, state: StateDataType.state) => {
     requireCheck(
       () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
     );
     getPositionTypeArray(transform, state)
   }; */
let getTransformPosition = (transform: transform, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  getPositionTuple(transform, state)
};

/* let setTransformPositionByTypeArray = (transform: transform, position, state: StateDataType.state) => {
     requireCheck(
       () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
     );
     setPositionByTypeArray(transform, position, state)
   }; */
let setTransformPosition = (transform: transform, position: position, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state)))
      ),
    StateData.stateData.isDebug
  );
  setPositionByTuple(transform, position, state)
};