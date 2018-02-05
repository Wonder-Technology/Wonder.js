open SourceInstanceType;

open ComponentDisposeComponentCommon;

open SourceInstanceStateCommon;

let isAlive = (sourceInstance: sourceInstance, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(
    sourceInstance,
    getSourceInstanceData(state).disposedIndexArray
  );

let _disposeObjectInstanceGameObject =
    (sourceInstance: sourceInstance, batchDisposeGameObjectFunc, state) => {
  let objectInstanceGameObjectArr =
    SourceInstanceObjectInstanceArrayCommon.unsafeGetObjectInstanceArray(
      sourceInstance,
      getSourceInstanceData(state).objectInstanceArrayMap
    )
    |> Js.Array.copy;
  batchDisposeGameObjectFunc(objectInstanceGameObjectArr, state)
};

let _disposeData =
    (sourceInstance: sourceInstance, batchDisposeGameObjectFunc, state: StateDataType.state) => {
  let state =
    state
    |> VboBufferDisposeSystem.disposeInstanceBufferData(sourceInstance)
    |> _disposeObjectInstanceGameObject(sourceInstance, batchDisposeGameObjectFunc);
  let {
        objectInstanceArrayMap,
        modelMatrixFloat32ArrayMap,
        modelMatrixInstanceBufferCapacityMap,
        isModelMatrixStaticMap,
        isSendModelMatrixDataMap,
        gameObjectMap
      } as data =
    getSourceInstanceData(state);
  switch (modelMatrixFloat32ArrayMap |> WonderCommonlib.SparseMapSystem.get(sourceInstance)) {
  | Some(typeArr) =>
    [@bs]
    TypeArrayPoolSystem.addFloat32TypeArrayToPool(
      typeArr,
      MemoryConfigSystem.getMaxBigTypeArrayPoolSize(state),
      TypeArrayPoolSystem.getFloat32ArrayPoolMap(state)
    )
    |> ignore
  | None => ()
  };
  {
    ...state,
    sourceInstanceData: {
      ...data,
      objectInstanceArrayMap: objectInstanceArrayMap |> disposeSparseMapData(sourceInstance),
      modelMatrixFloat32ArrayMap:
        modelMatrixFloat32ArrayMap |> disposeSparseMapData(sourceInstance),
      modelMatrixInstanceBufferCapacityMap:
        modelMatrixInstanceBufferCapacityMap |> disposeSparseMapData(sourceInstance),
      isModelMatrixStaticMap: isModelMatrixStaticMap |> disposeSparseMapData(sourceInstance),
      isSendModelMatrixDataMap: isSendModelMatrixDataMap |> disposeSparseMapData(sourceInstance),
      gameObjectMap: gameObjectMap |> disposeSparseMapData(sourceInstance)
    }
  }
};

let handleDisposeComponent =
    (sourceInstance: sourceInstance, batchDisposeGameObjectFunc, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAlive(
              sourceInstance,
              isAlive,
              state
            )
          )
        )
      ),
    StateData.stateData.isDebug
  );
  let ({disposedIndexArray} as data): sourceInstanceData = getSourceInstanceData(state);
  let state =
    VboBufferSystem.addInstanceBufferToPool(sourceInstance, state)
    |> _disposeData(sourceInstance, batchDisposeGameObjectFunc);
  {
    ...state,
    sourceInstanceData: {
      ...data,
      disposedIndexArray: disposedIndexArray |> ArraySystem.push(sourceInstance)
    }
  }
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      sourceInstanceArray: array(sourceInstance),
      gameSourceUidMap: array(bool),
      batchDisposeGameObjectFunc,
      state: StateDataType.state
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                ComponentDisposeComponentCommon.checkComponentShouldAliveWithBatchDispose(
                  sourceInstanceArray,
                  isAlive,
                  state
                )
              )
            )
          ),
        StateData.stateData.isDebug
      );
      let ({disposedIndexArray} as data): sourceInstanceData = getSourceInstanceData(state);
      let state = {
        ...state,
        sourceInstanceData: {
          ...data,
          disposedIndexArray: disposedIndexArray |> Js.Array.concat(sourceInstanceArray)
        }
      };
      sourceInstanceArray
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, sourceInstance) =>
               state
               |> VboBufferSystem.addInstanceBufferToPool(sourceInstance)
               |> _disposeData(sourceInstance, batchDisposeGameObjectFunc)
           ),
           state
         )
    }
  );