/* let isAlive = (light, maxCount) => light < maxCount; */
let isAlive = (light, mappedIndexMap) =>
  ! MappedIndexService.isDisposed(MappedIndexService.getMappedIndex(light, mappedIndexMap));

let deleteBySwapAndResetFloat32TypeArr =
  [@bs]
  (
    ((sourceIndex, targetIndex), typeArr, length, defaultValueArr) => {
      open Js.Typed_array;
      for (i in 0 to length - 1) {
        Float32Array.unsafe_set(
          typeArr,
          sourceIndex + i,
          Float32Array.unsafe_get(typeArr, targetIndex + i)
        );
        Float32Array.unsafe_set(typeArr, targetIndex + i, defaultValueArr[i])
      };
      typeArr
    }
  );

let deleteSingleValueBySwapAndResetFloat32TypeArr =
  [@bs]
  (
    ((sourceIndex, targetIndex), typeArr, length: int, defaultValue) => {
      open Js.Typed_array;
      Float32Array.unsafe_set(typeArr, sourceIndex, Float32Array.unsafe_get(typeArr, targetIndex));
      Float32Array.unsafe_set(typeArr, targetIndex, defaultValue);
      typeArr
    }
  );

let deleteSingleValueBySwapAndResetUint8TypeArr = (sourceIndex, lastIndex, typeArr, defaultValue) => {
  open Js.Typed_array;
  Uint8Array.unsafe_set(typeArr, sourceIndex, Uint8Array.unsafe_get(typeArr, lastIndex));
  Uint8Array.unsafe_set(typeArr, lastIndex, defaultValue);
  typeArr
};

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
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(light, isAliveFunc, record)
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  [@bs] handleDisposeFunc(light, record)
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
              record
            )
          )
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  lightArray
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs] ((record, light) => [@bs] handleDisposeFunc(light, record)),
       record
     )
};