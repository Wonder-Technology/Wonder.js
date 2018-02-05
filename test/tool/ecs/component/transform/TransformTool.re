open TransformType;

open Js.Typed_array;

let getTransformData = (state: StateDataType.state) => state.transformData;

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

let getLocalToWorldMatrixTypeArray = (transform, state: StateDataType.state) =>
  TransformSystem.getLocalToWorldMatrixTypeArray(transform, state);

let getNormalMatrixTypeArray = (transform, state: StateDataType.state) => {
  let (normalMatrix, _) = TransformSystem.getNormalMatrixTypeArray(transform, state);
  normalMatrix
};

let dispose = (transform, state) => {
  TestTool.closeContractCheck();
  let state = GameObject.disposeGameObjectTransformComponent(0, transform, state);
  TestTool.openContractCheck();
  state
};

let isDisposed = (transform, state) => {
  let {localToWorldMatrixMap} = getTransformData(state);
  ! (localToWorldMatrixMap |> WonderCommonlib.SparseMapSystem.has(transform))
};

let getTransformLocalPositionTypeArray = TransformSystem.getLocalPositionTypeArray;

/* let setTransformLocalPositionByTypeArray = TransformSystem.setLocalPositionByTypeArray; */
let getTransformPositionTypeArray = TransformSystem.getPositionTypeArray;

/* let setTransformPositionByTypeArray = TransformSystem.setPositionByTypeArray; */
let changeTupleToTypeArray = ((x, y, z)) => Float32Array.make([|x, y, z|]);