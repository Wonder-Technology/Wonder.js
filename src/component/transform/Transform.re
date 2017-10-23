open TransformSystem;

open TransformType;

let createTransform (state: StateDataType.state) => create state;

let getTransformGameObject (transform: transform) (state: StateDataType.state) =>
  Js.Option.getExn (getGameObject transform state);