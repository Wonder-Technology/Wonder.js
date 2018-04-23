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
      /* WonderLog.Log.print((
           "inited material array in render worker:",
           basicMaterialData##materialDataForWorkerInit
         ))
         |> ignore; */
      basicMaterialData##materialDataForWorkerInit
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (initBasicMaterialState, (materialIndex, isSourceInstance)) =>
               [@bs]
               InitInitBasicMaterialService.initMaterial(
                 gl,
                 (materialIndex, isSourceInstance, isSupportInstance),
                 initBasicMaterialState
               )
           ),
           CreateInitBasicMaterialStateRenderWorkerService.createInitMaterialState(
             (basicMaterialData##index, basicMaterialData##disposedIndexArray, shaderIndices),
             state
           )
         )
      |> ignore;
      e
    }
  );