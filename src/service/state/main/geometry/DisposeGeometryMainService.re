open BoxGeometryType;

open GeometryType;

open MainStateDataType;

open DisposeComponentService;

let isAlive = (transform, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(transform, disposedIndexArray);

let _disposeData =
    (
      geometry,
      maxTypeArrayPoolSize,
      (
        vboBufferRecord,
        typeArrayPoolRecord,
        {
          verticesMap,
          normalsMap,
          indicesMap,
          configDataMap,
          isInitMap,
          computeDataFuncMap,
          groupCountMap,
          gameObjectMap
        } as boxGeometryRecord
      )
    ) => {
  let vboBufferRecord =
    DisposeVboBufferService.disposeGeometryBufferData(geometry, vboBufferRecord);
  let typeArrayPoolRecord =
    typeArrayPoolRecord
    |> TypeArrayPoolGeometryService.addTypeArrayToPool(
         geometry,
         maxTypeArrayPoolSize,
         (verticesMap, normalsMap, indicesMap)
       );
  (
    vboBufferRecord,
    typeArrayPoolRecord,
    {
      ...boxGeometryRecord,
      groupCountMap: groupCountMap |> WonderCommonlib.SparseMapSystem.set(geometry, 0),
      verticesMap: verticesMap |> disposeSparseMapData(geometry),
      normalsMap: normalsMap |> disposeSparseMapData(geometry),
      indicesMap: indicesMap |> disposeSparseMapData(geometry),
      configDataMap: configDataMap |> disposeSparseMapData(geometry),
      isInitMap: isInitMap |> disposeSparseMapData(geometry),
      computeDataFuncMap: computeDataFuncMap |> disposeSparseMapData(geometry),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(geometry)
    }
  )
};

let handleDisposeComponent =
    (
      geometry: geometry,
      maxTypeArrayPoolSize,
      {vboBufferRecord, typeArrayPoolRecord, boxGeometryRecord} as state
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(geometry, isAlive, boxGeometryRecord)
          )
        )
      ),
    MainStateData.stateData.isDebug
  );
  let {disposedIndexArray} as boxGeometryRecord = boxGeometryRecord;
  switch (GroupGeometryService.isGroupGeometry(geometry, boxGeometryRecord)) {
  | false =>
    let vboBufferRecord = PoolVboBufferService.addGeometryBufferToPool(geometry, vboBufferRecord);
    let (vboBufferRecord, typeArrayPoolRecord, boxGeometryRecord) =
      _disposeData(
        geometry,
        maxTypeArrayPoolSize,
        (vboBufferRecord, typeArrayPoolRecord, boxGeometryRecord)
      );
    {
      ...state,
      vboBufferRecord,
      typeArrayPoolRecord,
      boxGeometryRecord: {
        ...boxGeometryRecord,
        disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry)
      }
    }
  | true => {
      ...state,
      boxGeometryRecord: GroupGeometryService.decreaseGroupCount(geometry, boxGeometryRecord)
    }
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      geometryArray: array(geometry),
      isGameObjectDisposedMap: array(bool),
      maxTypeArrayPoolSize,
      {vboBufferRecord, typeArrayPoolRecord, boxGeometryRecord} as state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  geometryArray,
                  isAlive,
                  boxGeometryRecord
                )
              )
            )
          ),
        MainStateData.stateData.isDebug
      );
      let {disposedIndexArray} = boxGeometryRecord;
      let (vboBufferRecord, typeArrayPoolRecord, boxGeometryRecord) =
        geometryArray
        |> WonderCommonlib.ArraySystem.reduceOneParam(
             [@bs]
             (
               ((vboBufferRecord, typeArrayPoolRecord, boxGeometryRecord), geometry) =>
                 switch (GroupGeometryService.isGroupGeometry(geometry, boxGeometryRecord)) {
                 | false =>
                   let vboBufferRecord =
                     PoolVboBufferService.addGeometryBufferToPool(geometry, vboBufferRecord);
                   let boxGeometryRecord = {
                     ...boxGeometryRecord,
                     disposedIndexArray: disposedIndexArray |> ArrayService.push(geometry)
                   };
                   _disposeData(
                     geometry,
                     maxTypeArrayPoolSize,
                     (vboBufferRecord, typeArrayPoolRecord, boxGeometryRecord)
                   )
                 | true => (
                     vboBufferRecord,
                     typeArrayPoolRecord,
                     GroupGeometryService.decreaseGroupCount(geometry, boxGeometryRecord)
                   )
                 }
             ),
             (vboBufferRecord, typeArrayPoolRecord, boxGeometryRecord)
           );
      {...state, vboBufferRecord, typeArrayPoolRecord, boxGeometryRecord}
    }
  );

let isNotDisposed = ({boxGeometryRecord}) =>
  boxGeometryRecord.disposedIndexArray |> Js.Array.length == 0;