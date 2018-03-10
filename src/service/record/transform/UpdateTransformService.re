open TransformType;

open Matrix4Service;

open HierachyTransformService;

open ModelMatrixTransformService;

open DirtyTransformService;

let _clearCache = (record) => {
  record.normalMatrixCacheMap = WonderCommonlib.SparseMapSystem.createEmpty();
  record
};

let rec update =
        (
          transform: transform,
          globalTempRecord,
          {localToWorldMatrixMap, localPositionMap} as transformRecord
        ) =>
  switch (isDirty(transform, transformRecord)) {
  | false => transformRecord
  | true =>
    /* TODO perf: translation not clear normalMatrixCacheMap, only rotation/scale clear */
    let transformRecord = mark(transform, false, transformRecord) |> _clearCache;
    switch (getParent(transform, transformRecord)) {
    | Some(parent) =>
      let transformRecord = transformRecord |> update(parent, globalTempRecord);
      multiply(
        getLocalToWorldMatrixTypeArray(parent, transformRecord),
        fromTranslation(
          getLocalPositionTypeArray(transform, localPositionMap),
          GlobalTempService.getFloat32Array1(globalTempRecord)
        ),
        getLocalToWorldMatrixTypeArray(transform, transformRecord)
      )
      |> ignore;
      transformRecord
    | None =>
      fromTranslation(
        getLocalPositionTypeArray(transform, localPositionMap),
        getLocalToWorldMatrixTypeArray(transform, transformRecord)
      )
      |> ignore;
      transformRecord
    }
  };

let _updateAndGetPosition = (transform: transform, getTranslationFunc, globalTempRecord, record) =>
  Js.Typed_array.(
    [@bs]
    getTranslationFunc(
      getLocalToWorldMatrixTypeArray(transform, update(transform, globalTempRecord, record))
    )
  );

let updateAndGetPositionTypeArray = (transform: transform, globalTempRecord, record) =>
  _updateAndGetPosition(
    transform,
    Matrix4Service.getTranslationTypeArray,
    globalTempRecord,
    record
  );

let updateAndGetPositionTuple = (transform: transform, globalTempRecord, record) =>
  _updateAndGetPosition(transform, Matrix4Service.getTranslationTuple, globalTempRecord, record);

let updateAndGetLocalToWorldMatrixTypeArray = (transform: transform, globalTempRecord, record) =>
  update(transform, globalTempRecord, record)
  |> getLocalToWorldMatrixTypeArray(transform);

let updateAndGetNormalMatrixTypeArray = (transform: transform, globalTempRecord, record) =>
  update(transform, globalTempRecord, record) |> getNormalMatrixTypeArray(transform);

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
         Vector3System.transformMat4Tuple(
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