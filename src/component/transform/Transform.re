open TransformSystem;

open TransformType;

let createTransform = create;

let getTransformGameObject = (transform: transform, state: StateDataType.state) =>
  getGameObject(transform, state) |> Js.Option.getExn;

let getTransformParent = (transform: transform, state: StateDataType.state) =>
  getParent(transform, state) |> Js.Nullable.from_opt;

let setTransformParent = setParent;

let getTransformChildren = getChildren;

let getTransformLocalPosition = getLocalPosition;

let setTransformLocalPosition = setLocalPosition;

let getTransformPosition = getPosition;

let setTransformPosition = setPosition;