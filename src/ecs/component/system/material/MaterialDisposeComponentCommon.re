open MaterialType;

open ComponentDisposeComponentCommon;

let isAlive = (material, disposedIndexArray) =>
  ComponentDisposeComponentCommon.isAlive(material, disposedIndexArray);

let addDisposeIndex = (material, disposedIndexArray) =>
  disposedIndexArray |> ArraySystem.push(material);

let disposeData = (material, (shaderIndexMap, groupCountMap, gameObjectMap)) => (
  disposeSparseMapData(material, shaderIndexMap),
  groupCountMap |> WonderCommonlib.SparseMapSystem.set(material, 0),
  disposeSparseMapData(material, gameObjectMap)
);

let handleBatchDisposeComponent =
    (
      materialArray: array(material),
      disposedIndexArray,
      (isAliveFunc, handleDisposeFunc),
      state: StateDataType.state
    ) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAliveWithBatchDispose(
              materialArray,
              isAliveFunc,
              state
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  materialArray
  |> ArraySystem.reduceState(
       [@bs] ((state, material) => [@bs] handleDisposeFunc(disposedIndexArray, material, state)),
       state
     )
};

let isNotDisposed = (disposedIndexArray) => disposedIndexArray |> Js.Array.length == 0;