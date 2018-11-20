open MaterialType;

open DisposeComponentService;

let isAlive = (material, disposedIndexArray) =>
  DisposeComponentService.isAlive(material, disposedIndexArray);

let addDisposeIndex = (material, disposedIndexArray) =>
  disposedIndexArray |> ArrayService.push(material);

let disposeData = (material, shaderIndices, defaultShaderIndex) =>
  DisposeTypeArrayService.deleteAndResetUint32(.
    ShaderIndicesService.getShaderIndexIndex(material),
    defaultShaderIndex,
    shaderIndices,
  );

/* let handleBatchDisposeComponent =
       (
         materialArray: array(material),
         disposedIndexArray,
         (isAliveFunc, handleDisposeFunc),
         state: StateDataMainType.state
       ) => {
     WonderLog.Contract.requireCheck(
       () =>
         WonderLog.(
           Contract.(
             Operators.(
               DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                 materialArray,
                 isAliveFunc,
                 state
               )
             )
           )
         ),
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );
     materialArray
     |> ReduceStateMainService.reduceState(
          [@bs] ((state, material) => [@bs] handleDisposeFunc(disposedIndexArray, material, state)),
          state
        )
   }; */
let isNotDisposed = disposedIndexArray =>
  disposedIndexArray |> Js.Array.length == 0;