open StateDataMainType;

open TransformType;

open DisposeComponentService;

let isAlive = (transform, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(transform, disposedIndexArray);

let _disposeFromParentAndChildMap = (transform, isKeepOrder, record) => {
  record
  |> HierachyTransformService.unsafeGetChildren(transform)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. record, child: transform) =>
         HierachyTransformService.removeFromParentMap(child, record),
       record,
     );
  switch (HierachyTransformService.getParent(transform, record)) {
  | None => record
  | Some(parent) =>
    record
    |> HierachyTransformService.removeFromChildMap(
         parent,
         transform,
         isKeepOrder,
       )
  };
};

let _disposeData =
    (
      transform: transform,
      (transformCount, maxTypeArrayPoolSize, isKeepOrder),
      {
        localToWorldMatrices,
        localPositions,
        localRotations,
        localScales,
        defaultLocalToWorldMatrix,
        defaultLocalPosition,
        defaultLocalRotation,
        defaultLocalScale,
        parentMap,
        childMap,
        dirtyMap,
        gameObjectMap,
      } as transformRecord,
    ) => {
  let transformRecord =
    _disposeFromParentAndChildMap(transform, isKeepOrder, transformRecord);

  transformRecord.localToWorldMatrices =
    DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
      BufferTransformService.getLocalToWorldMatrixIndex(transform),
      BufferTransformService.getLocalToWorldMatricesSize(),
      defaultLocalToWorldMatrix,
      localToWorldMatrices,
    );
  transformRecord.localPositions =
    DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
      BufferTransformService.getLocalPositionIndex(transform),
      BufferTransformService.getLocalPositionsSize(),
      defaultLocalPosition,
      localPositions,
    );
  transformRecord.localRotations =
    DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
      BufferTransformService.getLocalRotationIndex(transform),
      BufferTransformService.getLocalRotationsSize(),
      defaultLocalRotation,
      localRotations,
    );
  transformRecord.localScales =
    DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
      BufferTransformService.getLocalScaleIndex(transform),
      BufferTransformService.getLocalScalesSize(),
      defaultLocalScale,
      localScales,
    );

  transformRecord.parentMap = parentMap |> disposeSparseMapData(transform);
  transformRecord.childMap = childMap |> disposeSparseMapData(transform);
  transformRecord.dirtyMap = dirtyMap |> disposeSparseMapData(transform);
  transformRecord.gameObjectMap =
    gameObjectMap |> disposeSparseMapData(transform);
  transformRecord;
};

let handleBatchDisposeComponent =
  (.
    transformArray: array(int),
    maxTypeArrayPoolSize: int,
    isKeepOrder,
    {settingRecord, transformRecord} as state: StateDataMainType.state,
  ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                transformArray,
                isAlive,
                state |> RecordTransformMainService.getRecord,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

    transformArray |> Js.Array.length === 0 ?
      state :
      {
        let {disposedIndexArray} as transformRecord =
          state
          |> RecordTransformMainService.getRecord
          |> RecordTransformMainService.markAllDirtyForRestore(true);

        transformRecord.disposedIndexArray =
          disposedIndexArray |> Js.Array.concat(transformArray);
        /* let transformRecord = {
             ...transformRecord,
             disposedIndexArray: disposedIndexArray |> Js.Array.concat(transformArray)
           }; */
        let transformCount =
          BufferSettingService.getTransformCount(settingRecord);
        let dataTuple = (transformCount, maxTypeArrayPoolSize, isKeepOrder);
        /* TODO optimize: batch remove parent,child? */
        let transformRecord =
          transformArray
          |> WonderCommonlib.ArrayService.reduceOneParam(
               (. transformRecord, transform) =>
                 _disposeData(transform, dataTuple, transformRecord),
               transformRecord,
             );
        state.transformRecord = Some(transformRecord);
        state;
      };
  };