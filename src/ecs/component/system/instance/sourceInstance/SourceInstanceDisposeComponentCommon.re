open SourceInstanceType;

open Contract;

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
  } =
    getSourceInstanceData(state);
  disposeSparseMapData(sourceInstance, objectInstanceArrayMap) |> ignore;
  disposeSparseMapData(sourceInstance, modelMatrixFloat32ArrayMap) |> ignore;
  disposeSparseMapData(sourceInstance, modelMatrixInstanceBufferCapacityMap) |> ignore;
  disposeSparseMapData(sourceInstance, isModelMatrixStaticMap) |> ignore;
  disposeSparseMapData(sourceInstance, isSendModelMatrixDataMap) |> ignore;
  disposeSparseMapData(sourceInstance, gameObjectMap) |> ignore;
  state
};

let handleDisposeComponent =
    (sourceInstance: sourceInstance, batchDisposeGameObjectFunc, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentCommon.checkComponentShouldAlive(sourceInstance, isAlive, state)
      )
  );
  let ({disposedIndexArray} as data): sourceInstanceData = getSourceInstanceData(state);
  disposedIndexArray |> Js.Array.push(sourceInstance) |> ignore;
  VboBufferSystem.addInstanceBufferToPool(sourceInstance, state)
  |> _disposeData(sourceInstance, batchDisposeGameObjectFunc)
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
      requireCheck(
        () =>
          Contract.Operators.(
            sourceInstanceArray
            |> WonderCommonlib.ArraySystem.forEach(
                 [@bs]
                 (
                   (sourceInstance) =>
                     ComponentDisposeComponentCommon.checkComponentShouldAlive(
                       sourceInstance,
                       isAlive,
                       state
                     )
                 )
               )
          )
      );
      let ({disposedIndexArray} as data): sourceInstanceData = getSourceInstanceData(state);
      data.disposedIndexArray = disposedIndexArray |> Js.Array.concat(sourceInstanceArray);
      sourceInstanceArray
      |> ArraySystem.reduceState(
           [@bs]
           (
             (state, sourceInstance) =>
               state
               |> VboBufferSystem.addInstanceBufferToPool(sourceInstance)
               |> _disposeData(
                    sourceInstance,
                    batchDisposeGameObjectFunc
                  )
           ),
           state
         )
    }
  );