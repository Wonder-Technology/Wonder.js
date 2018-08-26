let isAlive = (light, mappedIndexMap) =>
  MappedIndexService.isComponentAlive(light, mappedIndexMap);

let _deleteBySwapGameObjectMapData =
    (mappedSourceIndex, lastComponentIndex, gameObjectMap) => {
  let lastGameObject =
    gameObjectMap
    |> WonderCommonlib.SparseMapService.unsafeGet(lastComponentIndex);

  gameObjectMap
  |> WonderCommonlib.SparseMapService.set(
       lastComponentIndex,
       gameObjectMap
       |> WonderCommonlib.SparseMapService.unsafeGet(mappedSourceIndex),
     )
  |> WonderCommonlib.SparseMapService.set(mappedSourceIndex, lastGameObject)
  |> Js.Array.pop
  |> ignore;

  gameObjectMap;
};

let disposeData = (mappedSourceIndex, lastComponentIndex, gameObjectMap) =>
  _deleteBySwapGameObjectMapData(
    mappedSourceIndex,
    lastComponentIndex,
    gameObjectMap,
  );

let _swapIndex = (mappedSourceIndex, lastComponentIndex, mappedIndexMap) =>
  mappedSourceIndex >= lastComponentIndex ?
    mappedIndexMap :
    mappedIndexMap
    |> MappedIndexService.setMappedIndex(
         lastComponentIndex,
         mappedSourceIndex,
       );

let swapData =
    (
      (mappedSourceIndex, lastComponentIndex),
      (mappedIndexMap, dataSize, defaultData),
      deleteBySwapAndResetTypeArrFunc,
      typeArr,
    ) =>
  mappedSourceIndex >= lastComponentIndex ?
    typeArr :
    deleteBySwapAndResetTypeArrFunc(.
      (mappedSourceIndex * dataSize, lastComponentIndex * dataSize),
      typeArr,
      dataSize,
      defaultData,
    );

let setMappedIndexMap =
    (sourceIndex, mappedSourceIndex, lastComponentIndex, mappedIndexMap) =>
  mappedIndexMap
  |> _swapIndex(mappedSourceIndex, lastComponentIndex)
  |> MappedIndexService.markDisposed(sourceIndex);

let handleDisposeComponent =
    (light, (isAliveFunc, handleDisposeFunc), record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(
              light,
              isAliveFunc,
              record,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  handleDisposeFunc(. light, record);
};

let handleBatchDisposeComponent =
    (lightArray, (isAliveFunc, handleDisposeFunc), record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
              lightArray,
              isAliveFunc,
              record,
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  lightArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. record, light) => handleDisposeFunc(. light, record),
       record,
     );
};