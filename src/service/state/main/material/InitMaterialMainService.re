open StateDataMainType;

let initMaterials =
    (
      materialIndexArr,
      (gl, index, disposedIndexArray, gameObjectsMap),
      (initMaterialFunc, createInitMaterialStateFunc),
      {gameObjectRecord} as state,
    ) => {
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  materialIndexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, materialIndex: int) =>
         initMaterialFunc(.
           gl,
           (
             materialIndex,
             JudgeInstanceMainService.isSourceInstance(
               materialIndex,
               gameObjectsMap,
               gameObjectRecord,
             ),
             isSupportInstance,
           ),
           state,
         ),
       createInitMaterialStateFunc((index, disposedIndexArray), state),
     )
  |> ignore;
  state;
};

let handleInitComponent =
    (
      materialIndex: int,
      (
        index,
        disposedIndexArray,
        shaderIndices,
        materialArrayForWorkerInit,
        gameObjectsMap,
      ),
      (isNeedInitMaterialFunc, initMaterialFunc, createInitMaterialStateFunc),
      {gameObjectRecord} as state,
    ) =>
  isNeedInitMaterialFunc(materialIndex, shaderIndices) ?
    WorkerDetectMainService.isUseWorker(state) ?
      {
        MaterialArrayForWorkerInitService.addMaterialToMaterialArrayForWorkerInit(
          materialIndex,
          materialArrayForWorkerInit,
        )
        |> ignore;
        state;
      } :
      {
        let gl = AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);
        let isSupportInstance =
          JudgeInstanceMainService.isSupportInstance(state);
        initMaterialFunc(.
          gl,
          (
            materialIndex,
            JudgeInstanceMainService.isSourceInstance(
              materialIndex,
              gameObjectsMap,
              gameObjectRecord,
            ),
            isSupportInstance,
          ),
          createInitMaterialStateFunc((index, disposedIndexArray), state),
        )
        |> ignore;
        state;
      } :
    state;

let _reInitComponentsIfNoWorker =
    (
      materialIndex,
      (gameObjectsMap, index, disposedIndexArray),
      (reInitMaterialFunc, createInitMaterialStateFunc),
      {gameObjectRecord} as state,
    ) => {
  let gl = AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  reInitMaterialFunc(.
    gl,
    (
      materialIndex,
      JudgeInstanceMainService.isSourceInstance(
        materialIndex,
        gameObjectsMap,
        gameObjectRecord,
      ),
      isSupportInstance,
    ),
    createInitMaterialStateFunc((index, disposedIndexArray), state),
  )
  |> ignore;
  state;
};

let reInitComponents =
    (
      materialIndices: array(int),
      (shaderIndices, gameObjectsMap, index, disposedIndexArray),
      (reInitMaterialFunc, createInitMaterialStateFunc),
      state,
    ) => {
  let state = ClearShaderMainService.clearInitShaderCache(state);

  let state =
    materialIndices
    |> WonderCommonlib.ArrayService.removeDuplicateItems
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (.
           {gameObjectRecord, shaderRecord, glslSenderRecord} as state,
           materialIndex,
         ) => {
           let currentShaderIndex =
             ShaderIndicesService.getShaderIndex(
               materialIndex,
               shaderIndices,
             );

           ShaderIndexAllShaderService.isDefaultShaderIndex(currentShaderIndex) ?
             () :
             ShaderIndexAllShaderService.removeShaderIndexFromMaterial(
               currentShaderIndex,
               materialIndex,
               shaderRecord,
               glslSenderRecord,
             )
             |> ignore;

           WorkerDetectMainService.isUseWorker(state) ?
             WonderLog.Log.fatal(
               WonderLog.Log.buildFatalMessage(
                 ~title="reInitComponents",
                 ~description={j|not support worker|j},
                 ~reason="",
                 ~solution={j||j},
                 ~params={j||j},
               ),
             ) :
             _reInitComponentsIfNoWorker(
               materialIndex,
               (gameObjectsMap, index, disposedIndexArray),
               (reInitMaterialFunc, createInitMaterialStateFunc),
               state,
             );
         },
         state,
       );

  state;
};