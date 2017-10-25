open TransformType;

let getData (state: StateDataType.state) => Js.Option.getExn state.transformData;

let getDefaultPosition () => (0., 0., 0.);

let isTransform (transform: transform) => {
  open Jest;
  open Expect;
  open! Expect.Operators;
  expect transform >= 0
};

let update (state: StateDataType.state) => TransformSystem.update state;