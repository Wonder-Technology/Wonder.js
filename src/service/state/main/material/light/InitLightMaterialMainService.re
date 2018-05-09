open StateDataMainType;

open MaterialType;

open LightMaterialType;

let initMaterials = (materialIndexArr, gl, {gameObjectRecord} as state) => {
  let gameObjectMap = RecordLightMaterialMainService.getRecord(state).gameObjectMap;
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  let {index, disposedIndexArray} = RecordLightMaterialMainService.getRecord(state);
  materialIndexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (state, materialIndex: int) =>
           [@bs]
           InitInitLightMaterialService.initMaterial(
             gl,
             (
               materialIndex,
               JudgeInstanceMainService.isSourceInstance(
                 materialIndex,
                 gameObjectMap,
                 gameObjectRecord
               ),
               isSupportInstance
             ),
             state
           )
       ),
       CreateInitLightMaterialStateMainService.createInitMaterialState(
         (index, disposedIndexArray),
         state
       )
     )
  |> ignore;
  state
};

let handleInitComponent = (materialIndex: int, {gameObjectRecord} as state) => {
  let {shaderIndices} = RecordLightMaterialMainService.getRecord(state);
  InitInitLightMaterialService.isNeedInitMaterial(materialIndex, shaderIndices) ?
    WorkerDetectMainService.isUseWorker(state) ?
      {
        let {materialArrayForWorkerInit} = RecordLightMaterialMainService.getRecord(state);
        MaterialArrayForWorkerInitService.addMaterialToMaterialArrayForWorkerInit(
          materialIndex,
          materialArrayForWorkerInit
        )
        |> ignore;
        state
      } :
      {
        let gl = [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
        let gameObjectMap = RecordLightMaterialMainService.getRecord(state).gameObjectMap;
        let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
        let {index, disposedIndexArray} = RecordLightMaterialMainService.getRecord(state);
        [@bs]
        InitInitLightMaterialService.initMaterial(
          gl,
          (
            materialIndex,
            JudgeInstanceMainService.isSourceInstance(
              materialIndex,
              gameObjectMap,
              gameObjectRecord
            ),
            isSupportInstance
          ),
          CreateInitLightMaterialStateMainService.createInitMaterialState(
            (index, disposedIndexArray),
            state
          )
        )
        |> ignore;
        state
      } :
    state
};