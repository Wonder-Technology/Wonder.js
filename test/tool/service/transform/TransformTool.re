open StateDataMainType;

open TransformType;

open Js.Typed_array;

let getRecord = (state: StateDataMainType.state) =>
  state |> RecordTransformMainService.getRecord;

let getDefaultPosition = () => (0., 0., 0.);

let getDefaultRotation = () => (0., 0., 0., 1.);

let getDefaultScale = () => (1., 1., 1.);

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
  expect(transform) >= 0;
};

let getLocalToWorldMatrixTypeArray =
    (transform, state: StateDataMainType.state) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    RecordTransformMainService.getRecord(state);
  ModelMatrixTransformService.getLocalToWorldMatrixTypeArray(.
    transform,
    localToWorldMatrices,
    localToWorldMatrixCacheMap,
  );
};

let getLocalToWorldMatrixTypeArrayByVisitTypeArray =
    (transform, state: StateDataMainType.state) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    RecordTransformMainService.getRecord(state);
  OperateTypeArrayTransformService.getLocalToWorldMatrixTypeArray(
    transform,
    localToWorldMatrices,
  );
};

let update = (transform, {globalTempRecord} as state) => {
  UpdateTransformMainService.update(
    transform,
    globalTempRecord,
    RecordTransformMainService.getRecord(state),
  )
  |> ignore;
  state;
};

let getDefaultLocalToWorldMatrix = (state: StateDataMainType.state) =>
  RecordTransformMainService.getRecord(state).defaultLocalToWorldMatrix;

let getDefaultLocalToWorldMatrixTypeArray = (state: StateDataMainType.state) =>
  RecordTransformMainService.getRecord(state).defaultLocalToWorldMatrix
  |> Float32Array.make;

let getDefaultLocalPosition = (state: StateDataMainType.state) =>
  RecordTransformMainService.getRecord(state).defaultLocalPosition;

let getDefaultLocalRotation = (state: StateDataMainType.state) =>
  RecordTransformMainService.getRecord(state).defaultLocalRotation;

let getDefaultLocalScale = (state: StateDataMainType.state) =>
  RecordTransformMainService.getRecord(state).defaultLocalScale;

let getDefaultLocalPositionTuple = (state: StateDataMainType.state) =>
  getDefaultLocalPosition(state) |> Obj.magic;

let getDefaultLocalRotationTuple = (state: StateDataMainType.state) =>
  getDefaultLocalRotation(state) |> Obj.magic;

let getDefaultLocalScaleTuple = (state: StateDataMainType.state) =>
  getDefaultLocalScale(state) |> Obj.magic;

let getLocalToWorldMatrix = (transform, state: StateDataMainType.state) =>
  OperateTypeArrayTransformService.getLocalToWorldMatrix(
    transform,
    RecordTransformMainService.getRecord(state).localToWorldMatrices,
  );

let setLocalToWorldMatrix = (transform: transform, data, state) => {
  let {localToWorldMatrices} = state |> RecordTransformMainService.getRecord;
  OperateTypeArrayTransformService.setLocalToWorldMatrix(
    transform,
    data,
    localToWorldMatrices,
  )
  |> ignore;
  state;
};

let updateAndGetNormalMatrixTypeArray =
    (transform, state: StateDataMainType.state) =>
  UpdateTransformMainService.updateAndGetNormalMatrixTypeArray(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord,
  );

let dispose = (transform, state) => {
  let state =
    GameObjectTool.disposeGameObjectTransformComponent(
      0,
      transform,
      false,
      state,
    );
  TestTool.openContractCheck();
  state;
};

let isDisposed = (transform, state) =>
  !DisposeTransformMainService.isAlive(transform, getRecord(state));

let isDirty = (transform, state) =>
  DirtyTransformService.isDirty(
    transform,
    state |> RecordTransformMainService.getRecord,
  );

/* let {localToWorldMatrixMap} = getRecord(state);
   ! (localToWorldMatrixMap |> WonderCommonlib.MutableSparseMapService.has(transform)) */
let getTransformLocalPositionTypeArray = (transform, state) =>
  OperateTypeArrayTransformService.getLocalPositionTypeArray(
    transform,
    RecordTransformMainService.getRecord(state).localPositions,
  );

let getTransformPositionTypeArray = (transform, state) =>
  UpdateTransformMainService.updateAndGetPositionTuple(
    transform,
    state.globalTempRecord,
    state |> RecordTransformMainService.getRecord,
  );

let changeTupleToTypeArray = ((x, y, z)) => Float32Array.make([|x, y, z|]);

let createBuffer = BufferTransformService.createBuffer;

let createTypeArrays = CreateTypeArrayAllTransformService.createTypeArrays;

let setAllTypeArrDataToDefault =
    (
      count: int,
      state,
      (localToWorldMatrices, localPositions, localRotations, localScales),
    ) => {
  let (
    _,
    (localToWorldMatrices, localPositions, localRotations, localScales),
  ) =
    RecordTransformMainService._setAllTypeArrDataToDefault(
      count,
      (
        getDefaultLocalToWorldMatrix(state),
        getDefaultLocalPosition(state),
        getDefaultLocalRotation(state),
        getDefaultLocalScale(state),
      ),
      (
        Obj.magic(1),
        localToWorldMatrices,
        localPositions,
        localRotations,
        localScales,
      ),
    );
  (localToWorldMatrices, localPositions, localRotations, localScales);
};

let getTransformParent = (transform, state) =>
  HierachyTransformService.getParent(transform, getRecord(state));

let truncateRotation = (~rotation, ~digit=3, ()) => {
  let (x, y, z, w) = rotation;

  (
    x->FloatTool.truncateFloatValue(digit),
    x->FloatTool.truncateFloatValue(digit),
    z->FloatTool.truncateFloatValue(digit),
    w->FloatTool.truncateFloatValue(digit),
  );
};