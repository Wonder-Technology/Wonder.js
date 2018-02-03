/* let isAlive = (light, maxCount) => light < maxCount; */
let isAlive = (light, mappedIndexMap) =>
  ! LightIndexCommon.isDisposed(LightIndexCommon.getMappedIndex(light, mappedIndexMap));

let deleteBySwapAndResetFloat32TypeArr =
  [@bs]
  (
    (sourceIndex, targetIndex, typeArr, length, defaultValueArr) => {
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
    (sourceIndex, targetIndex, typeArr, length: int, defaultValue) => {
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
  ComponentDisposeComponentCommon.disposeSparseMapData(light, gameObjectMap);


let _swapIndex = (mappedSourceIndex, lastComponentIndex, mappedIndexMap) =>
  mappedSourceIndex >= lastComponentIndex ?
    mappedIndexMap :
    mappedIndexMap |> LightIndexCommon.setMappedIndex(lastComponentIndex, mappedSourceIndex);


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
      mappedSourceIndex * dataSize,
      lastComponentIndex * dataSize,
      typeArr,
      dataSize,
      defaultData
    );


  let setMappedIndexMap = (sourceIndex, mappedSourceIndex, lastComponentIndex, mappedIndexMap) => {

      mappedIndexMap
      |> _swapIndex(mappedSourceIndex, lastComponentIndex)
      |> LightIndexCommon.markDisposed(sourceIndex)
  };

let handleDisposeComponent = (light, (isAliveFunc, handleDisposeFunc), state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAlive(light, isAliveFunc, state)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  [@bs] handleDisposeFunc(light, state)
};

let handleBatchDisposeComponent =
    (lightArray, (isAliveFunc, handleDisposeFunc), state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAliveWithBatchDispose(
              lightArray,
              isAliveFunc,
              state
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  lightArray
  |> ArraySystem.reduceState(
       [@bs] ((state, light) => [@bs] handleDisposeFunc(light, state)),
       state
     )
};