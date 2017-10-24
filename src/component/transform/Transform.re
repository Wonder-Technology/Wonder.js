open TransformSystem;

open TransformType;

let createTransform (state: StateDataType.state) => create state;

let getTransformGameObject (transform: transform) (state: StateDataType.state) =>
  Js.Option.getExn (getGameObject transform state);

let getTransformParent (transform: transform) (state: StateDataType.state) =>
  Js.Nullable.from_opt (getParent transform state);

let setTransformParent
    (parent: Js.nullable transform)
    (child: transform)
    (state: StateDataType.state) =>
  setParent parent child state;

let getTransformLocalPosition (transform: transform) (state: StateDataType.state) =>
  getLocalPosition transform state;

let setTransformLocalPosition
    (transform: transform)
    (localPosition: position)
    (state: StateDataType.state) =>
  setLocalPosition transform localPosition state;

let getTransformPosition (transform: transform) (state: StateDataType.state) =>
  getPosition transform state;

let setTransformPosition (transform: transform) (position: position) (state: StateDataType.state) =>
  setPosition transform position state;