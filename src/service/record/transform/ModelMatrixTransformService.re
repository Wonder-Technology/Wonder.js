open Js.Typed_array;

open TypeArrayService;

open TransformType;

open HierachyTransformService;

open Matrix4Service;

let getLocalToWorldMatrixTypeArray = (transform: transform, {localToWorldMatrixMap}) =>
  localToWorldMatrixMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(transform)
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
       StateData.stateData.isDebug
     );

/* let getNormalMatrixTypeArray = (transform: transform, localToWorldMatrixMap, normalMatrixCacheMap) => */
let getNormalMatrixTypeArray = (transform: transform, {localToWorldMatrixMap, normalMatrixCacheMap} as record) =>
  switch (normalMatrixCacheMap |> WonderCommonlib.SparseMapSystem.get(transform)) {
  | Some(normalMatrix) => (normalMatrix, normalMatrixCacheMap)
  | None =>
    let normalMatrix =
      Matrix4Service.invertTo3x3(
        getLocalToWorldMatrixTypeArray(transform, record),
        Matrix3System.createIdentityMatrix3()
      )
      |> Matrix3System.transposeSelf;
    (
      normalMatrix,
      WonderCommonlib.SparseMapSystem.set(transform, normalMatrix, normalMatrixCacheMap)
    )
  };

let getLocalPositionTypeArray = (transform: transform, localPositionMap) =>
  localPositionMap
  |> WonderCommonlib.SparseMapSystem.unsafeGet(transform)
  |> WonderLog.Contract.ensureCheck(
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
       StateData.stateData.isDebug
     );

let getLocalPositionTuple = (transform: transform, localPositionMap) => {
  let typeArr = getLocalPositionTypeArray(transform, localPositionMap);
  (
    Float32Array.unsafe_get(typeArr, 0),
    Float32Array.unsafe_get(typeArr, 1),
    Float32Array.unsafe_get(typeArr, 2)
  )
};

let setLocalPositionByTuple = (transform: transform, (x, y, z), {localPositionMap} as record) => {
  let typeArr = getLocalPositionTypeArray(transform, localPositionMap);
  Float32Array.unsafe_set(typeArr, 0, x);
  Float32Array.unsafe_set(typeArr, 1, y);
  Float32Array.unsafe_set(typeArr, 2, z);
  record |> markHierachyDirty(transform)
};

/* let setPositionByTypeArray = (transform: transform, position, record, state: StateDataType.state) =>
   switch (getParent(transform, record)) {
   | None =>
     setLocalPositionByTypeArray(transform, position, record) |> ignore;
     record
   | Some(parent) =>
     let record = update(parent, state) |> getTransformData;
     Vector3System.transformMat4TypeArray(
       position,
       invert(
         getLocalToWorldMatrixTypeArray(parent, record.localToWorldMatrixMap),
         GlobalTempService.getFloat32Array1(state)
       ),
       getLocalPositionTypeArray(transform, record.localPositionMap)
     )
     |> ignore;
     record
   }; */
let setPositionByTuple =
    (transform: transform, parent, position: position, (globalTempRecord, record)) =>
  setLocalPositionByTuple(
    transform,
    Vector3System.transformMat4Tuple(
      position,
      invert(
        getLocalToWorldMatrixTypeArray(parent, record),
        GlobalTempService.getFloat32Array1(globalTempRecord)
      )
    ),
    record
  );