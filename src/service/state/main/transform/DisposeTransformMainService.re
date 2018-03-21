open MainStateDataType;

open TransformType;

open DisposeComponentService;

let isAlive = (transform, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(transform, disposedIndexArray);

let _disposeFromParentAndChildMap = (transform, isKeepOrder, record) => {
  record
  |> HierachyTransformService.unsafeGetChildren(transform)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       ((record, child: transform) => HierachyTransformService.removeFromParentMap(child, record)),
       record
     );
  switch (HierachyTransformService.getParent(transform, record)) {
  | None => record
  | Some(parent) =>
    record |> HierachyTransformService.removeFromChildMap(parent, transform, isKeepOrder)
  }
};

let _disposeData =
    (
      transform: transform,
      (transformDataBufferCount, maxTypeArrayPoolSize, isKeepOrder),
      {
        localToWorldMatrices,
        localPositions,
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        parentMap,
        childMap,
        dirtyMap,
        gameObjectMap
      } as transformRecord
    ) => {
  let transformRecord = _disposeFromParentAndChildMap(transform, isKeepOrder, transformRecord);
  {
    ...transformRecord,
    localToWorldMatrices:
      [@bs]
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(
        RecordTransformMainService.getLocalToWorldMatrixIndex(transform),
        RecordTransformMainService.getLocalToWorldMatricesSize(),
        defaultLocalToWorldMatrix,
        localToWorldMatrices
      ),
    localPositions:
      [@bs]
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(
        RecordTransformMainService.getLocalPositionIndex(transform),
        RecordTransformMainService.getLocalPositionsSize(),
        defaultLocalPosition,
        localPositions
      ),
    parentMap: parentMap |> disposeSparseMapData(transform),
    childMap: childMap |> disposeSparseMapData(transform),
    dirtyMap: dirtyMap |> disposeSparseMapData(transform),
    gameObjectMap: gameObjectMap |> disposeSparseMapData(transform)
  }
};

let handleDisposeComponent =
    (transform: transform, maxTypeArrayPoolSize, isKeepOrder, {settingRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(
              transform,
              isAlive,
              state |> RecordTransformMainService.getRecord
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  let transformRecord =
    _disposeData(
      transform,
      (
        BufferSettingService.getTransformDataBufferCount(settingRecord),
        maxTypeArrayPoolSize,
        isKeepOrder
      ),
      state |> RecordTransformMainService.getRecord
    );
  let {disposedIndexArray} = transformRecord;
  {
    ...state,
    transformRecord:
      Some({
        ...transformRecord,
        disposedIndexArray: disposedIndexArray |> ArrayService.push(transform)
      })
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      transformArray: array(int),
      isGameObjectDisposedMap: array(bool),
      maxTypeArrayPoolSize: int,
      {settingRecord, transformRecord} as state: MainStateDataType.state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  transformArray,
                  isAlive,
                  state |> RecordTransformMainService.getRecord
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(MainStateData.stateData)
      );
      let {disposedIndexArray} as transformRecord = state |> RecordTransformMainService.getRecord;
      let transformRecord = {
        ...transformRecord,
        disposedIndexArray: disposedIndexArray |> Js.Array.concat(transformArray)
      };
      let transformDataBufferCount =
        BufferSettingService.getTransformDataBufferCount(settingRecord);
      let dataTuple = (transformDataBufferCount, maxTypeArrayPoolSize, false);
      /* TODO optimize: batch remove parent,child? */
      let transformRecord =
        transformArray
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             ((transformRecord, transform) => _disposeData(transform, dataTuple, transformRecord)),
             transformRecord
           );
      {...state, transformRecord:Some(transformRecord)}
    }
  );