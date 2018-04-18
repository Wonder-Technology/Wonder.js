open StateDataMainType;

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
  transformRecord.localToWorldMatrices =
    [@bs]
    DisposeTypeArrayService.deleteAndResetFloat32TypeArr(
      BufferTransformService.getLocalToWorldMatrixIndex(transform),
      BufferTransformService.getLocalToWorldMatricesSize(),
      defaultLocalToWorldMatrix,
      localToWorldMatrices
    );
  transformRecord.localPositions =
    [@bs]
    DisposeTypeArrayService.deleteAndResetFloat32TypeArr(
      BufferTransformService.getLocalPositionIndex(transform),
      BufferTransformService.getLocalPositionsSize(),
      defaultLocalPosition,
      localPositions
    );
  transformRecord.parentMap = parentMap |> disposeSparseMapData(transform);
  transformRecord.childMap = childMap |> disposeSparseMapData(transform);
  transformRecord.dirtyMap = dirtyMap |> disposeSparseMapData(transform);
  transformRecord.gameObjectMap = gameObjectMap |> disposeSparseMapData(transform);
  transformRecord
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      transformArray: array(int),
      maxTypeArrayPoolSize: int,
      isKeepOrder,
      {settingRecord, transformRecord} as state: StateDataMainType.state
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
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      let {disposedIndexArray} as transformRecord = state |> RecordTransformMainService.getRecord;
      transformRecord.disposedIndexArray = disposedIndexArray |> Js.Array.concat(transformArray);
      /* let transformRecord = {
           ...transformRecord,
           disposedIndexArray: disposedIndexArray |> Js.Array.concat(transformArray)
         }; */
      let transformDataBufferCount =
        BufferSettingService.getTransformDataBufferCount(settingRecord);
      let dataTuple = (transformDataBufferCount, maxTypeArrayPoolSize, isKeepOrder);
      /* TODO optimize: batch remove parent,child? */
      let transformRecord =
        transformArray
        |> WonderCommonlib.ArrayService.reduceOneParam(
             [@bs]
             ((transformRecord, transform) => _disposeData(transform, dataTuple, transformRecord)),
             transformRecord
           );
      state.transformRecord = Some(transformRecord);
      state
    }
  );