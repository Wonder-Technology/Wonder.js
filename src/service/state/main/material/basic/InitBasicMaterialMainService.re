open StateDataMainType;

open MaterialType;

open BasicMaterialType;

let initMaterials = (materialIndexArr, gl, {gameObjectRecord} as state) => {
  let gameObjectsMap =
    RecordBasicMaterialMainService.getRecord(state).gameObjectsMap;
  let isSupportInstance = JudgeInstanceMainService.isSupportInstance(state);
  let {index, disposedIndexArray} =
    RecordBasicMaterialMainService.getRecord(state);
  materialIndexArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, materialIndex: int) =>
         InitInitBasicMaterialService.initMaterial(.
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
       CreateInitBasicMaterialStateMainService.createInitMaterialState(
         (index, disposedIndexArray),
         state,
       ),
     )
  |> ignore;
  state;
};

let handleInitComponent = (materialIndex: int, {gameObjectRecord} as state) => {
  let {shaderIndices} = RecordBasicMaterialMainService.getRecord(state);
  InitInitBasicMaterialService.isNeedInitMaterial(
    materialIndex,
    shaderIndices,
  ) ?
    WorkerDetectMainService.isUseWorker(state) ?
      {
        let {materialArrayForWorkerInit} =
          RecordBasicMaterialMainService.getRecord(state);
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
          RecordBasicMaterialMainService.getRecord(state).gameObjectsMap;
        let isSupportInstance =
          JudgeInstanceMainService.isSupportInstance(state);
        let {index, disposedIndexArray, shaderIndices} =
          RecordBasicMaterialMainService.getRecord(state);
        InitInitBasicMaterialService.initMaterial(.
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
          CreateInitBasicMaterialStateMainService.createInitMaterialState(
            (index, disposedIndexArray),
            state,
          ),
        )
        |> ignore;
        state;
      } :
    state;
};