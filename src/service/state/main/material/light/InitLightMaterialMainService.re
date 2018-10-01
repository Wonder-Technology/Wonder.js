open StateDataMainType;

open MaterialType;

open LightMaterialType;

let initMaterials = (materialIndexArr, gl, {gameObjectRecord} as state) => {
  let gameObjectsMap =
    RecordLightMaterialMainService.getRecord(state).gameObjectsMap;
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  let {index, disposedIndexArray} =
    RecordLightMaterialMainService.getRecord(state);
  materialIndexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, materialIndex: int) =>
         InitInitLightMaterialService.initMaterial(.
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
       CreateInitLightMaterialStateMainService.createInitMaterialState(
         (index, disposedIndexArray),
         state,
       ),
     )
  |> ignore;
  state;
};

let handleInitComponent = (materialIndex: int, {gameObjectRecord} as state) => {
  let {shaderIndices} = RecordLightMaterialMainService.getRecord(state);
  InitInitLightMaterialService.isNeedInitMaterial(
    materialIndex,
    shaderIndices,
  ) ?
    WorkerDetectMainService.isUseWorker(state) ?
      {
        let {materialArrayForWorkerInit} =
          RecordLightMaterialMainService.getRecord(state);
        MaterialArrayForWorkerInitService.addMaterialToMaterialArrayForWorkerInit(
          materialIndex,
          materialArrayForWorkerInit,
        )
        |> ignore;
        state;
      } :
      {
        let gl = DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);
        let gameObjectsMap =
          RecordLightMaterialMainService.getRecord(state).gameObjectsMap;
        let isSupportInstance =
          JudgeInstanceMainService.isSupportInstance(state);
        let {index, disposedIndexArray} =
          RecordLightMaterialMainService.getRecord(state);
        InitInitLightMaterialService.initMaterial(.
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
          CreateInitLightMaterialStateMainService.createInitMaterialState(
            (index, disposedIndexArray),
            state,
          ),
        )
        |> ignore;
        state;
      } :
    state;
};

let reInitComponents = (materialIndices: array(int), state) => {
  let state =
    materialIndices
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. {gameObjectRecord, shaderRecord} as state, materialIndex) => {
           let {shaderIndices} =
             RecordLightMaterialMainService.getRecord(state);
           let currentShaderIndex =
             ShaderIndicesService.getShaderIndex(
               materialIndex,
               shaderIndices,
             );

           let _ =
             ShaderIndexShaderService.unuseShaderIndex(
               currentShaderIndex,
               materialIndex,
               shaderRecord,
             );

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
             {
               let gl =
                 DeviceManagerService.unsafeGetGl(.
                   state.deviceManagerRecord,
                 );
               let gameObjectsMap =
                 RecordLightMaterialMainService.getRecord(state).
                   gameObjectsMap;
               let isSupportInstance =
                 JudgeInstanceMainService.isSupportInstance(state);
               let {index, disposedIndexArray} =
                 RecordLightMaterialMainService.getRecord(state);
               InitInitLightMaterialService.reInitMaterial(.
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
                 CreateInitLightMaterialStateMainService.createInitMaterialState(
                   (index, disposedIndexArray),
                   state,
                 ),
               )
               |> ignore;
               state;
             };
         },
         state,
       );

  state;
};