open StateDataRenderWorkerType;

open RenderWorkerBasicMaterialType;

let execJob = (flags, e, stateData) =>
  MostUtils.callFunc(
    () => {
      /* TODO init light material */
      let state = StateRenderWorkerService.unsafeGetState(stateData);
      let data = MessageService.getRecord(e);
      let initData = data##initData;
      let materialData = initData##materialData;
      let basicMaterialData = data##initData##materialData##basicMaterialData;
      let directionLightData = initData##directionLightData;
      let pointLightData = initData##pointLightData;
      let gl = [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord);
      /* TODO get isSupportInstance by JudgeInstanceAllService.isSupportInstance */
      let isSupportInstance = false;
      let {shaderIndices} = RecordBasicMaterialRenderWorkerService.getRecord(state);
      basicMaterialData##materialDataForWorkerInit
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (initMaterialState, (materialIndex, isSourceInstance)) =>
               [@bs]
               InitBasicMaterialInitMaterialService.initMaterial(
                 gl,
                 (materialIndex, isSourceInstance, isSupportInstance),
                 initMaterialState
               )
           ),
           CreateInitMaterialStateRenderWorkerService.createInitMaterialState(
             (basicMaterialData##index, basicMaterialData##disposedIndexArray, shaderIndices),
             (directionLightData, pointLightData),
             state
           )
         )
      |> ignore;
      e
    }
  );