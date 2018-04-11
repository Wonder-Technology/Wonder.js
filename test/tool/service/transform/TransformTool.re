open StateDataMainType;

open TransformType;

open Js.Typed_array;

let getTransformRecord = (state: StateDataMainType.state) =>
  state |> RecordTransformMainService.getRecord;

let getDefaultPosition = () => (0., 0., 0.);

/* let getDefaultLocalToWorldMatrix = () =>
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
   |]); */
let isTransform = (transform: transform) => {
  open Wonder_jest;
  open Expect;
  open! Expect.Operators;
  expect(transform) >= 0
};

let getLocalToWorldMatrixTypeArray = (transform, state: StateDataMainType.state) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    RecordTransformMainService.getRecord(state);
  ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(
    transform,
    localToWorldMatrices,
    localToWorldMatrixCacheMap
  )
};

let getLocalToWorldMatrixTypeArrayByVisitTypeArray = (transform, state: StateDataMainType.state) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    RecordTransformMainService.getRecord(state);
  RecordTransformMainService.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices)
};

let update = (transform, {globalTempRecord} as state) => {
  UpdateTransformMainService.update(
    transform,
    globalTempRecord,
    RecordTransformMainService.getRecord(state)
  )
  |> ignore;
  state
};

let updateAndGetLocalToWorldMatrixTypeArray = (transform, state: StateDataMainType.state) =>
  UpdateTransformMainService.updateAndGetLocalToWorldMatrixTypeArray(
    transform,
    state.globalTempRecord,
    RecordTransformMainService.getRecord(state)
  );

let getDefaultLocalToWorldMatrix = (state: StateDataMainType.state) =>
  RecordTransformMainService.getRecord(state).defaultLocalToWorldMatrix;

let getDefaultLocalToWorldMatrixTypeArray = (state: StateDataMainType.state) =>
  RecordTransformMainService.getRecord(state).defaultLocalToWorldMatrix |> Float32Array.make;

let getDefaultLocalPosition = (state: StateDataMainType.state) =>
  RecordTransformMainService.getRecord(state).defaultLocalPosition;

let getDefaultLocalPositionTuple = (state: StateDataMainType.state) => (0., 0., 0.);

let getLocalToWorldMatrix = (transform, state: StateDataMainType.state) =>
  RecordTransformMainService.getLocalToWorldMatrix(
    transform,
    RecordTransformMainService.getRecord(state).localToWorldMatrices
  );

let setLocalToWorldMatrix = (transform: transform, data, state) => {
  let {localToWorldMatrices} = state |> RecordTransformMainService.getRecord;
  RecordTransformMainService.setLocalToWorldMatrix(transform, data, localToWorldMatrices) |> ignore;
  state
};

let updateAndGetNormalMatrixTypeArray = (transform, state: StateDataMainType.state) =>
  UpdateTransformMainService.updateAndGetNormalMatrixTypeArray(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord
  );

let dispose = (transform, state) => {
  TestTool.closeContractCheck();
  let state = GameObjectAPI.disposeGameObjectTransformComponent(0, transform, false, state);
  TestTool.openContractCheck();
  state
};

let isDisposed = (transform, state) =>
  ! DisposeTransformMainService.isAlive(transform, getTransformRecord(state));

let isDirty = (transform, state) =>
  DirtyTransformService.isDirty(transform, state |> RecordTransformMainService.getRecord);

/* let {localToWorldMatrixMap} = getTransformRecord(state);
   ! (localToWorldMatrixMap |> WonderCommonlib.SparseMapService.has(transform)) */
let getTransformLocalPositionTypeArray = (transform, state) =>
  ModelMatrixTransformService.getLocalPositionTypeArray(
    transform,
    RecordTransformMainService.getRecord(state).localPositions
  );

/* let setTransformLocalPositionByTypeArray = TransformSystem.setLocalPositionByTypeArray; */
let getTransformPositionTypeArray = (transform, state) =>
  UpdateTransformMainService.updateAndGetPositionTypeArray(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord
  );

/* let setTransformPositionByTypeArray = TransformSystem.setPositionByTypeArray; */
let changeTupleToTypeArray = ((x, y, z)) => Float32Array.make([|x, y, z|]);