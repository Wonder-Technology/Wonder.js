open Js.Typed_array;

open TypeArrayService;

open TransformType;

open HierachyTransformService;

open Matrix4Service;

let getLocalToWorldMatrixTypeArray =
    (transform: transform, localToWorldMatrices, localToWorldMatrixCacheMap) =>
  switch (localToWorldMatrixCacheMap |> WonderCommonlib.SparseMapService.get(transform)) {
  | Some(matrix) => matrix
  | None =>
    let matrix =
      RecordTransformMainService.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices);
    WonderCommonlib.SparseMapService.set(transform, matrix, localToWorldMatrixCacheMap) |> ignore;
    matrix
  };

/* TODO duplicate with getLocalToWorldMatrixTypeArray */
let getNormalMatrixTypeArray =
    (
      transform: transform,
      localToWorldMatrices,
      (localToWorldMatrixCacheMap, normalMatrixCacheMap)
    ) =>
  switch (normalMatrixCacheMap |> WonderCommonlib.SparseMapService.get(transform)) {
  | Some(matrix) => matrix
  | None =>
    Matrix4Service.invertTo3x3(
      getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap),
      Matrix3Service.createIdentityMatrix3()
    )
    |> Matrix3Service.transposeSelf
  };

/* TODO duplicate with getNormalMatrixTypeArray */
let getNormalMatrixTypeArrayToTarget =
    (transform: transform, localToWorldMatrices, localToWorldTargetTypeArr, normalTargetTypeArr) =>
  Matrix4Service.invertTo3x3(
    RecordTransformMainService.getLocalToWorldMatrixTypeArrayToTarget(
      transform,
      localToWorldMatrices,
      localToWorldTargetTypeArr
    ),
    normalTargetTypeArr
  )
  |> Matrix3Service.transposeSelf;

let getLocalPositionTypeArray = (transform: transform, localPositions) =>
  RecordTransformMainService.getLocalPositionTypeArray(transform, localPositions);

/* |> WonderLog.Contract.ensureCheck(
     (localPosition) =>
       WonderLog.(
         Contract.(
           Operators.(
             test(
               Log.buildAssertMessage(~expect={j|localPosition exist|j}, ~actual={j|not|j}),
               () => localPosition |> assertNullableExist
             )
           )
         )
       ),
     IsDebugMainService.getIsDebug(StateDataMain.stateData)
   ); */
let getLocalPositionTuple = (transform: transform, localPositions) =>
  RecordTransformMainService.getLocalPositionTuple(transform, localPositions);

let setLocalPositionByTuple = (transform: transform, dataTuple, {localPositions} as record) => {
  RecordTransformMainService.setLocalPositionByTuple(transform, dataTuple, localPositions)
  |> ignore;
  record |> markHierachyDirty(transform)
};

/* let setPositionByTypeArray = (transform: transform, position, record, state: StateDataMainType.state) =>
   switch (getParent(transform, record)) {
   | None =>
     setLocalPositionByTypeArray(transform, position, record) |> ignore;
     record
   | Some(parent) =>
     let record = update(parent, state) |> getTransformData;
     Vector3Service.transformMat4TypeArray(
       position,
       invert(
         getLocalToWorldMatrixTypeArray(parent, record.localToWorldMatrices),
         GlobalTempService.getFloat32Array1(state)
       ),
       getLocalPositionTypeArray(transform, record.localPositions)
     )
     |> ignore;
     record
   }; */
let setPositionByTuple =
    (
      transform: transform,
      parent,
      position: position,
      (globalTempRecord, {localToWorldMatrices, localToWorldMatrixCacheMap} as record)
    ) => {
  let localToWorldMatrix =
    getLocalToWorldMatrixTypeArray(
      parent,
      record.localToWorldMatrices,
      localToWorldMatrixCacheMap
    );
  setLocalPositionByTuple(
    transform,
    Vector3Service.transformMat4Tuple(
      position,
      invert(localToWorldMatrix, GlobalTempService.getFloat32Array1(globalTempRecord))
    ),
    record
  )
};