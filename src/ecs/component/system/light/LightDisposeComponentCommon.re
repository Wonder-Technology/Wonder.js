/* let isAlive = (light, maxCount) => light < maxCount; */

let deleteBySwapAndResetFloat32TypeArr =
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
};

let deleteSingleValueBySwapAndResetUint8TypeArr = (sourceIndex, lastIndex, typeArr, defaultValue) => {
  open Js.Typed_array;
  Uint8Array.unsafe_set(typeArr, sourceIndex, Uint8Array.unsafe_get(typeArr, lastIndex));
  Uint8Array.unsafe_set(typeArr, lastIndex, defaultValue);
  typeArr
};

let disposeData = (light, gameObjectMap) =>
  ComponentDisposeComponentCommon.disposeSparseMapData(light, gameObjectMap);

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