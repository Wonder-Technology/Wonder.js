open TransformType;

let getData = (state: StateDataType.state) => Js.Option.getExn(state.transformData);

let getDefaultPosition = () => (0., 0., 0.);

let getDefaultLocalToWorldMatrix = () =>
  Js.Typed_array.Float32Array.make([|
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.
  |]);

let isTransform = (transform: transform) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(transform) >= 0
};

let getLocalToWorldMatrix = (transform, state: StateDataType.state) =>
  TransformSystem.getLocalToWorldMatrix(transform, TransformStateSystem.getTransformData(state));

let dispose = (transform, state) => {
  TestTool.closeContractCheck();
  let state = GameObject.disposeGameObjectTransformComponent(0, transform, state);
  TestTool.openContractCheck();
  state
};