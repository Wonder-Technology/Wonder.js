/* let isAlive = (light, maxCount) => light < maxCount; */
let isAlive = (light, mappedIndexMap) =>
  ! MappedIndexService.isDisposed(MappedIndexService.getMappedIndex(light, mappedIndexMap));

let disposeData = (light, gameObjectMap) =>
  DisposeComponentService.disposeSparseMapData(light, gameObjectMap);

let _swapIndex = (mappedSourceIndex, lastComponentIndex, mappedIndexMap) =>
  mappedSourceIndex >= lastComponentIndex ?
    mappedIndexMap :
    mappedIndexMap |> MappedIndexService.setMappedIndex(lastComponentIndex, mappedSourceIndex);

let swapData =
    (
      (mappedSourceIndex, lastComponentIndex),
      (mappedIndexMap, dataSize, defaultData),
      deleteBySwapAndResetTypeArrFunc,
      typeArr
    ) =>
  mappedSourceIndex >= lastComponentIndex ?
    typeArr :
    [@bs]
    deleteBySwapAndResetTypeArrFunc(
      (mappedSourceIndex * dataSize, lastComponentIndex * dataSize),
      typeArr,
      dataSize,
      defaultData
    );

let setMappedIndexMap = (sourceIndex, mappedSourceIndex, lastComponentIndex, mappedIndexMap) =>
  mappedIndexMap
  |> _swapIndex(mappedSourceIndex, lastComponentIndex)
  |> MappedIndexService.markDisposed(sourceIndex);

let handleDisposeComponent = (light, (isAliveFunc, handleDisposeFunc), record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(DisposeComponentService.checkComponentShouldAlive(light, isAliveFunc, record))
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] handleDisposeFunc(light, record)
};

let handleBatchDisposeComponent = (lightArray, (isAliveFunc, handleDisposeFunc), record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
              lightArray,
              isAliveFunc,
              record
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  lightArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs] ((record, light) => [@bs] handleDisposeFunc(light, record)),
       record
     )
};