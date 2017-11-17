open TransformSystem;

open TransformType;

open Contract;

let createTransform = create;

let getTransformGameObject = (transform: transform, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
  );
  getGameObject(transform, state) |> Js.Option.getExn
};

let getTransformParent = (transform: transform, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
  );
  getParent(transform, state) |> Js.Nullable.from_opt
};

let setTransformParent =
    (parent: Js.nullable(transform), child: transform, state: StateDataType.state) => {
  requireCheck(
    () => {
      open Contract.Operators;
      Js.Nullable.iter(
        parent,
        [@bs] ((parent) => ComponentSystem.checkComponentShouldAlive(parent, isAlive, state))
      );
      ComponentSystem.checkComponentShouldAlive(child, isAlive, state)
    }
  );
  setParent(parent, child, state)
};

let getTransformChildren = (transform: transform, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
  );
  getChildren(transform, state)
};

let getTransformLocalPosition = (transform: transform, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
  );
  getLocalPosition(transform, state)
};

let setTransformLocalPosition =
    (transform: transform, localPosition: position, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
  );
  setLocalPosition(transform, localPosition, state)
};

let getTransformPosition = (transform: transform, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
  );
  getPosition(transform, state)
};

let setTransformPosition = (transform: transform, position: position, state: StateDataType.state) => {
  requireCheck(
    () => Contract.Operators.(ComponentSystem.checkComponentShouldAlive(transform, isAlive, state))
  );
  setPosition(transform, position, state)
};