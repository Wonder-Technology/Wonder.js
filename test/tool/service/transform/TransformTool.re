open MainStateDataType;

open TransformType;

open Js.Typed_array;

let getTransformRecord = (state: MainStateDataType.state) => state.transformRecord;

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

let getLocalToWorldMatrixTypeArray = (transform, state: MainStateDataType.state) =>
  ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(transform, state.transformRecord);

let getNormalMatrixTypeArray = (transform, state: MainStateDataType.state) => {
  let (normalMatrix, _) =
    UpdateTransformService.updateAndGetNormalMatrixTypeArray(
      transform,
      state.globalTempRecord,
      state.transformRecord
    );
  normalMatrix
};

let dispose = (transform, state) => {
  TestTool.closeContractCheck();
  let state = GameObjectAPI.disposeGameObjectTransformComponent(0, transform, state);
  TestTool.openContractCheck();
  state
};

let isDisposed = (transform, state) => {
  let {localToWorldMatrixMap} = getTransformRecord(state);
  ! (localToWorldMatrixMap |> WonderCommonlib.SparseMapSystem.has(transform))
};

let getTransformLocalPositionTypeArray = (transform, state) =>
  ModelMatrixTransformService.getLocalPositionTypeArray(
    transform,
    state.transformRecord.localPositionMap
  );

/* let setTransformLocalPositionByTypeArray = TransformSystem.setLocalPositionByTypeArray; */
let getTransformPositionTypeArray = (transform, state) =>
  UpdateTransformService.updateAndGetPositionTypeArray(
    transform,
    state.globalTempRecord,
    state.transformRecord
  );

/* let setTransformPositionByTypeArray = TransformSystem.setPositionByTypeArray; */
let changeTupleToTypeArray = ((x, y, z)) => Float32Array.make([|x, y, z|]);