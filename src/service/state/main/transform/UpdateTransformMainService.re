open PositionType;

open RotationType;

open ScaleType;

open TransformType;

open Matrix4Service;

open HierachyTransformService;

open ModelMatrixTransformService;

open DirtyTransformService;

let _clearCache =
    (
      transform,
      globalTempRecord,
      {localToWorldMatrixCacheMap, normalMatrixCacheMap} as record,
    ) => {
  let (has, normalMatrix) =
    normalMatrixCacheMap |> MutableSparseMapService.fastGet(transform);

  let globalTempRecord =
    has ?
      AllGlobalTempService.addUnUsedFloat9(normalMatrix, globalTempRecord) :
      globalTempRecord;

  normalMatrixCacheMap
  |> WonderCommonlib.MutableSparseMapService.deleteVal(transform)
  |> ignore;

  (record, globalTempRecord);
};

let rec update =
        (
          transform: transform,
          globalTempRecord,
          {localPositions, localRotations, localScales} as transformRecord,
        ) =>
  switch (isDirty(transform, transformRecord)) {
  | false => transformRecord
  | true =>
    /* TODO perf: translation not clear normalMatrixCacheMap, only rotation/scale clear */
    let (transformRecord, globalTempRecord) =
      mark(transform, false, transformRecord)
      |> _clearCache(transform, globalTempRecord);
    switch (getParent(transform, transformRecord)) {
    | Some(parent) =>
      let transformRecord =
        transformRecord |> update(parent, globalTempRecord);
      let parentLocalToWorldMatrix =
        getLocalToWorldMatrixTypeArray(.
          parent,
          transformRecord.localToWorldMatrices,
          transformRecord.localToWorldMatrixCacheMap,
        );
      let childLocalToWorldMatrix =
        getLocalToWorldMatrixTypeArray(.
          transform,
          transformRecord.localToWorldMatrices,
          transformRecord.localToWorldMatrixCacheMap,
        );
      multiply(
        parentLocalToWorldMatrix,
        fromTranslationRotationScale(
          getLocalPositionTuple(transform, localPositions),
          getLocalRotationTuple(transform, localRotations),
          getLocalScaleTuple(transform, localScales),
          AllGlobalTempService.getFloat32Array1(globalTempRecord),
        ),
        childLocalToWorldMatrix,
      )
      |> ignore;
      transformRecord;
    | None =>
      let localToWorldMatrix =
        getLocalToWorldMatrixTypeArray(.
          transform,
          transformRecord.localToWorldMatrices,
          transformRecord.localToWorldMatrixCacheMap,
        );
      fromTranslationRotationScale(
        getLocalPositionTuple(transform, localPositions),
        getLocalRotationTuple(transform, localRotations),
        getLocalScaleTuple(transform, localScales),
        localToWorldMatrix,
      )
      |> ignore;
      transformRecord;
    };
  };

let updateAndGetLocalToWorldMatrixTypeArray =
    (transform: transform, globalTempRecord, record) => {
  let record = update(transform, globalTempRecord, record);
  getLocalToWorldMatrixTypeArray(.
    transform,
    record.localToWorldMatrices,
    record.localToWorldMatrixCacheMap,
  );
};

let updateAndGetNormalMatrixTypeArray =
    (transform: transform, globalTempRecord, record) => {
  let {localToWorldMatrices, localToWorldMatrixCacheMap, normalMatrixCacheMap} =
    update(transform, globalTempRecord, record);
  getNormalMatrixTypeArray(
    transform,
    localToWorldMatrices,
    (localToWorldMatrixCacheMap, normalMatrixCacheMap),
    globalTempRecord,
  );
};

let updateAndGetPositionTuple =
    (transform: transform, globalTempRecord, record) => {
  open Js.Typed_array;
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    update(transform, globalTempRecord, record);
  let localToWorldMatrix =
    getLocalToWorldMatrixTypeArray(.
      transform,
      localToWorldMatrices,
      localToWorldMatrixCacheMap,
    );
  Matrix4Service.getTranslationTuple(localToWorldMatrix);
};

let updateAndSetPositionByTuple =
    (transform: transform, position: position, globalTempRecord, record) =>
  switch (getParent(transform, record)) {
  | None => setLocalPositionByTuple(transform, position, record)
  | Some(parent) =>
    let record = update(parent, globalTempRecord, record);
    setPositionByTuple(
      transform: transform,
      parent,
      position: position,
      (globalTempRecord, record),
    );
  };

let updateAndGetRotationTuple =
    (transform: transform, globalTempRecord, record) => {
  open Js.Typed_array;
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    update(transform, globalTempRecord, record);
  let localToWorldMatrix =
    getLocalToWorldMatrixTypeArray(.
      transform,
      localToWorldMatrices,
      localToWorldMatrixCacheMap,
    );
  Matrix4Service.getRotationTuple(localToWorldMatrix);
};

let updateAndSetRotationByTuple =
    (transform: transform, rotation: rotation, globalTempRecord, record) =>
  switch (getParent(transform, record)) {
  | None => setLocalRotationByTuple(transform, rotation, record)
  | Some(parent) =>
    setLocalRotationByTuple(
      transform,
      (
        updateAndGetRotationTuple(parent, globalTempRecord, record)
        |> QuaternionService.invert
      )
      ->(QuaternionService.multiply(rotation)),
      record,
    )
  };

let updateAndGetScaleTuple = (transform: transform, globalTempRecord, record) => {
  open Js.Typed_array;
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    update(transform, globalTempRecord, record);
  let localToWorldMatrix =
    getLocalToWorldMatrixTypeArray(.
      transform,
      localToWorldMatrices,
      localToWorldMatrixCacheMap,
    );
  Matrix4Service.getScaleTuple(localToWorldMatrix);
};

let updateAndSetScaleByTuple =
    (transform: transform, position: position, globalTempRecord, record) =>
  switch (getParent(transform, record)) {
  | None => setLocalScaleByTuple(transform, position, record)
  | Some(parent) =>
    let record = update(parent, globalTempRecord, record);
    setScaleByTuple(
      transform: transform,
      parent,
      position: position,
      (globalTempRecord, record),
    );
  };

let updateAndGetEulerAnglesTuple =
    (transform: transform, globalTempRecord, record) => {
  open Js.Typed_array;
  let {localToWorldMatrices, localToWorldMatrixCacheMap} =
    update(transform, globalTempRecord, record);
  let localToWorldMatrix =
    getLocalToWorldMatrixTypeArray(.
      transform,
      localToWorldMatrices,
      localToWorldMatrixCacheMap,
    );
  Matrix4Service.getEulerAngles(localToWorldMatrix);
};

let updateAndSetEulerAnglesByTuple =
    (transform: transform, eulerAngles, globalTempRecord, record) =>
  updateAndSetRotationByTuple(
    transform,
    QuaternionService.setFromEulerAngles(eulerAngles),
    globalTempRecord,
    record,
  );