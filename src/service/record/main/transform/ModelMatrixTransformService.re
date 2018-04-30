open Js.Typed_array;

open TypeArrayService;

open PositionType;

open TransformType;

open HierachyTransformService;

open Matrix4Service;

let getLocalToWorldMatrixTypeArray =
  [@bs]
  (
    (transform: transform, localToWorldMatrices, localToWorldMatrixCacheMap) =>
      switch (localToWorldMatrixCacheMap |> WonderCommonlib.SparseMapService.get(transform)) {
      | Some(matrix) => matrix
      | None =>
        let matrix =
          RecordTransformMainService.getLocalToWorldMatrixTypeArray(
            transform,
            localToWorldMatrices
          );
        WonderCommonlib.SparseMapService.set(transform, matrix, localToWorldMatrixCacheMap)
        |> ignore;
        matrix
      }
  );

let _getNormalMatrixTypeArray =
    (
      transform,
      localToWorldMatrices,
      (localToWorldTargetTypeArr, normalTargetTypeArr),
      getLocalToWorldMatrixTypeArrayFunc
    ) =>
  Matrix4Service.invertTo3x3(
    [@bs]
    getLocalToWorldMatrixTypeArrayFunc(transform, localToWorldMatrices, localToWorldTargetTypeArr),
    normalTargetTypeArr
  )
  |> Matrix3Service.transposeSelf;

let getNormalMatrixTypeArray =
    (
      transform: transform,
      localToWorldMatrices,
      (localToWorldMatrixCacheMap, normalMatrixCacheMap)
    ) =>
  switch (normalMatrixCacheMap |> WonderCommonlib.SparseMapService.get(transform)) {
  | Some(matrix) => matrix
  | None =>
    let matrix =
      _getNormalMatrixTypeArray(
        transform,
        localToWorldMatrices,
        (localToWorldMatrixCacheMap, Matrix3Service.createIdentityMatrix3()),
        getLocalToWorldMatrixTypeArray
      );
    WonderCommonlib.SparseMapService.set(transform, matrix, normalMatrixCacheMap) |> ignore;
    matrix
  };

let getNormalMatrixTypeArrayToTarget =
    (transform: transform, localToWorldMatrices, localToWorldTargetTypeArr, normalTargetTypeArr) =>
  _getNormalMatrixTypeArray(
    transform,
    localToWorldMatrices,
    (localToWorldTargetTypeArr, normalTargetTypeArr),
    RecordTransformMainService.getLocalToWorldMatrixTypeArrayToTarget
  );

let getLocalPositionTypeArray = (transform: transform, localPositions) =>
  RecordTransformMainService.getLocalPositionTypeArray(transform, localPositions);

let getLocalPositionTuple = (transform: transform, localPositions) =>
  RecordTransformMainService.getLocalPositionTuple(transform, localPositions);

let setLocalPositionByTuple = (transform: transform, dataTuple, {localPositions} as record) => {
  RecordTransformMainService.setLocalPositionByTuple(transform, dataTuple, localPositions)
  |> ignore;
  record |> markHierachyDirty(transform)
};

let setPositionByTuple =
    (
      transform: transform,
      parent,
      position: position,
      (globalTempRecord, {localToWorldMatrices, localToWorldMatrixCacheMap} as record)
    ) => {
  let localToWorldMatrix =
    [@bs]
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