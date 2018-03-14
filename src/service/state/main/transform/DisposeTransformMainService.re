open MainStateDataType;

open TransformType;

open DisposeComponentService;

let isAlive = (transform, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(transform, disposedIndexArray);

let _disposeFromParentAndChildMap = (transform, record) => {
  record
  |> HierachyTransformService.unsafeGetChildren(transform)
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       ((record, child: transform) => HierachyTransformService.removeFromParentMap(child, record)),
       record
     );
  switch (HierachyTransformService.getParent(transform, record)) {
  | None => record
  | Some(parent) => record |> HierachyTransformService.removeFromChildMap(parent, transform, false)
  }
};

let _disposeData =
    (
      transform: transform,
      maxTypeArrayPoolSize,
      typeArrayPoolRecord,
      {localToWorldMatrixMap, localPositionMap, parentMap, childMap, dirtyMap, gameObjectMap} as transformRecord
    ) => {
  let transformRecord = _disposeFromParentAndChildMap(transform, transformRecord);
  let typeArrayPoolRecord =
    TypeArrayPoolTransformService.addTypeArrayToPool(
      transform,
      maxTypeArrayPoolSize,
      (localToWorldMatrixMap, localPositionMap),
      typeArrayPoolRecord
    );
  (
    typeArrayPoolRecord,
    {
      ...transformRecord,
      localToWorldMatrixMap: localToWorldMatrixMap |> disposeSparseMapData(transform),
      localPositionMap: localPositionMap |> disposeSparseMapData(transform),
      parentMap: parentMap |> disposeSparseMapData(transform),
      childMap: childMap |> disposeSparseMapData(transform),
      dirtyMap: dirtyMap |> disposeSparseMapData(transform),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(transform)
    }
  )
};

let handleDisposeComponent =
    (transform: transform, maxTypeArrayPoolSize, {typeArrayPoolRecord, transformRecord} as state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(transform, isAlive, transformRecord)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  let (typeArrayPoolRecord, transformRecord) =
    _disposeData(transform, maxTypeArrayPoolSize, typeArrayPoolRecord, transformRecord);
  let {disposedIndexArray} = transformRecord;
  {
    ...state,
    typeArrayPoolRecord,
    transformRecord: {
      ...transformRecord,
      disposedIndexArray: disposedIndexArray |> ArrayService.push(transform)
    }
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      transformArray: array(transform),
      isGameObjectDisposedMap: array(bool),
      maxTypeArrayPoolSize,
      {typeArrayPoolRecord, transformRecord} as state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  transformArray,
                  isAlive,
                  transformRecord
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(MainStateData.stateData)
      );
      let {disposedIndexArray} = transformRecord;
      let transformRecord = {
        ...transformRecord,
        disposedIndexArray: disposedIndexArray |> Js.Array.concat(transformArray)
      };
      /* TODO optimize: batch remove parent,child? */
      let (typeArrayPoolRecord, transformRecord) =
        transformArray
        |> WonderCommonlib.ArraySystem.reduceOneParam(
             [@bs]
             (
               ((typeArrayPoolRecord, transformRecord), transform) =>
                 _disposeData(
                   transform,
                   maxTypeArrayPoolSize,
                   typeArrayPoolRecord,
                   transformRecord
                 )
             ),
             (typeArrayPoolRecord, transformRecord)
           );
      {...state, typeArrayPoolRecord, transformRecord}
    }
  );