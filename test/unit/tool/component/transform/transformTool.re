open TransformType;

let getData = (state: StateDataType.state) => Js.Option.getExn(state.transformData);

let getDefaultPosition = () => (0., 0., 0.);

let getDefaultLocalToWorldMatrix = () => CacheType.New([|1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.|]);

let isTransform = (transform: transform) => {
  open Jest;
  open Expect;
  open! Expect.Operators;
  expect(transform) >= 0
};

let init = (state: StateDataType.state) => TransformSystem.init(state);

let update = (state: StateDataType.state) => TransformSystem.update(state);

let getLocalToWorldMatrix = (transform, state: StateDataType.state) =>
  TransformSystem.getLocalToWorldMatrix(transform, state);