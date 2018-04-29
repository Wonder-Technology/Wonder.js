open PositionType;

open TransformType;

open Matrix4Service;

open HierachyTransformService;

open ModelMatrixTransformService;

open DirtyTransformService;

let _clearCache = (transform, {localToWorldMatrixCacheMap, normalMatrixCacheMap} as record) => {
  /* localToWorldMatrixCacheMap
     |> Obj.magic
     |> WonderCommonlib.SparseMapService.deleteVal(transform)
     |> ignore; */
  normalMatrixCacheMap
  |> Obj.magic
  |> WonderCommonlib.SparseMapService.deleteVal(transform)
  |> ignore;
  record
};

let rec update = (transform: transform, globalTempRecord, {localPositions} as transformRecord) =>
  switch (isDirty(transform, transformRecord)) {
  | false => transformRecord
  | true =>
    /* TODO perf: translation not clear normalMatrixCacheMap, only rotation/scale clear */
    let transformRecord = mark(transform, false, transformRecord) |> _clearCache(transform);
    switch (getParent(transform, transformRecord)) {
    | Some(parent) =>
      let transformRecord = transformRecord |> update(parent, globalTempRecord);
      let parentLocalToWorldMatrix =
        [@bs]
        getLocalToWorldMatrixTypeArray(
          parent,
          transformRecord.localToWorldMatrices,
          transformRecord.localToWorldMatrixCacheMap
        );
      let childLocalToWorldMatrix =
        [@bs]
        getLocalToWorldMatrixTypeArray(
          transform,
          transformRecord.localToWorldMatrices,
          transformRecord.localToWorldMatrixCacheMap
        );
      multiply(
        parentLocalToWorldMatrix,
        fromTranslation(
          getLocalPositionTuple(transform, localPositions),
          GlobalTempService.getFloat32Array1(globalTempRecord)
        ),
        childLocalToWorldMatrix
      )
      |> ignore;
      transformRecord
    | None =>
      let localToWorldMatrix =
        [@bs]
        getLocalToWorldMatrixTypeArray(
          transform,
          transformRecord.localToWorldMatrices,
          transformRecord.localToWorldMatrixCacheMap
        );
      fromTranslation(getLocalPositionTuple(transform, localPositions), localToWorldMatrix)
      |> ignore;
      transformRecord
    }
  };

let _updateAndGetPosition = (transform: transform, getTranslationFunc, globalTempRecord, record) => {
  open Js.Typed_array;
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    update(transform, globalTempRecord, record);
  let localToWorldMatrix =
    [@bs]
    getLocalToWorldMatrixTypeArray(transform, localToWorldMatrices, localToWorldMatrixCacheMap);
  [@bs] getTranslationFunc(localToWorldMatrix)
};

let updateAndGetPositionTypeArray = (transform: transform, globalTempRecord, record) =>
  _updateAndGetPosition(
    transform,
    Matrix4Service.getTranslationTypeArray,
    globalTempRecord,
    record
  );

let updateAndGetPositionTuple = (transform: transform, globalTempRecord, record) =>
  _updateAndGetPosition(transform, Matrix4Service.getTranslationTuple, globalTempRecord, record);

let updateAndGetLocalToWorldMatrixTypeArray = (transform: transform, globalTempRecord, record) => {
  let record = update(transform, globalTempRecord, record);
  [@bs]
  getLocalToWorldMatrixTypeArray(
    transform,
    record.localToWorldMatrices,
    record.localToWorldMatrixCacheMap
  )
};

let updateAndGetNormalMatrixTypeArray = (transform: transform, globalTempRecord, record) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap, normalMatrixCacheMap} =
    update(transform, globalTempRecord, record);
  getNormalMatrixTypeArray(
    transform,
    localToWorldMatrices,
    (localToWorldMatrixCacheMap, normalMatrixCacheMap)
  )
};

let updateAndSetPositionByTuple =
    (transform: transform, position: position, globalTempRecord, record) =>
  (
    switch (getParent(transform, record)) {
    | None => setLocalPositionByTuple(transform, position, record)
    | Some(parent) =>
      let record = update(parent, globalTempRecord, record);
      setPositionByTuple(
        transform: transform,
        parent,
        position: position,
        (globalTempRecord, record)
      )
    /* setLocalPositionByTuple(
         transform,
         Vector3Service.transformMat4Tuple(
           position,
           invert(
             getLocalToWorldMatrixTypeArray(parent, record.localToWorldMatrixMap),
             GlobalTempService.getFloat32Array1(globalTempRecord)
           )
         ),
         record
       ) */
    }
  )
  |> markHierachyDirty(transform);