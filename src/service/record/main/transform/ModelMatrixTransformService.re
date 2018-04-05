open Js.Typed_array;

open TypeArrayService;

open TransformType;

open HierachyTransformService;

open Matrix4Service;

let getLocalToWorldMatrixTypeArray = (transform: transform, {localToWorldMatrices}) =>
  RecordTransformMainService.getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices)
  |> WonderLog.Contract.ensureCheck(
       (localToWorldMatrix) =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(~expect={j|localToWorldMatrix exist|j}, ~actual={j|not|j}),
                 () => localToWorldMatrix |> assertNullableExist
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     );

/* let getNormalMatrixTypeArray = (transform: transform, localToWorldMatrices, normalMatrixCacheMap) => */
let getNormalMatrixTypeArray =
    (transform: transform, {localToWorldMatrices, normalMatrixCacheMap} as record) =>
  switch (normalMatrixCacheMap |> WonderCommonlib.SparseMapService.get(transform)) {
  | Some(normalMatrix) => (normalMatrix, normalMatrixCacheMap)
  | None =>
    let normalMatrix =
      Matrix4Service.invertTo3x3(
        getLocalToWorldMatrixTypeArray(transform, record),
        Matrix3Service.createIdentityMatrix3()
      )
      |> Matrix3Service.transposeSelf;
    (
      normalMatrix,
      WonderCommonlib.SparseMapService.set(transform, normalMatrix, normalMatrixCacheMap)
    )
  };

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
       IsDebugMainService.getIsDebug(MainStateData.stateData)
     ); */

let getLocalPositionTuple = (transform: transform, localPositions) => {
   RecordTransformMainService.getLocalPositionTuple(transform, localPositions);
  
};

let setLocalPositionByTuple = (transform: transform, dataTuple, {localPositions} as record) => {
  RecordTransformMainService.setLocalPositionByTuple(transform, dataTuple, localPositions) |> ignore;
  record |> markHierachyDirty(transform)
};

/* let setPositionByTypeArray = (transform: transform, position, record, state: MainStateDataType.state) =>
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
    (transform: transform, parent, position: position, (globalTempRecord, record)) =>
  setLocalPositionByTuple(
    transform,
    Vector3Service.transformMat4Tuple(
      position,
      invert(
        getLocalToWorldMatrixTypeArray(parent, record),
        GlobalTempService.getFloat32Array1(globalTempRecord)
      )
    ),
    record
  );