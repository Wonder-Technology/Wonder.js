open StateDataMainType;

open BasicMaterialType;

open RenderType;

open RenderCameraType;

let _buildData = (operateType, stateData) => {
  let {settingRecord, gameObjectRecord, directionLightRecord, pointLightRecord} as state =
    StateDataMainService.unsafeGetState(stateData);
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let basicRenderObjectRecord = OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
  let cameraData = OperateRenderMainService.getCameraRecord(state);
  let isRender = cameraData |> Js.Option.isSome;
  let (isRender, cameraData) =
    switch (OperateRenderMainService.getCameraRecord(state)) {
    | None => (Js.false_, Js.Nullable.empty)
    | Some({vMatrix, pMatrix, position}) => (
        Js.true_,
        Js.Nullable.return({"vMatrix": vMatrix, "pMatrix": pMatrix, "position": position})
      )
    };


    /* WonderLog.Log.print(("materialDataForWorkerInit: ", basicMaterialRecord.materialArrayForWorkerInit)) |> ignore; */
    WonderLog.Log.print("send render data") |> ignore;

  {
    "operateType": operateType,
    "initData": {
      "materialData": {
        "basicMaterialData": {
          "materialDataForWorkerInit":
            basicMaterialRecord.materialArrayForWorkerInit
            |> Js.Array.map(
                 (materialIndex) => (
                   materialIndex,
                   JudgeInstanceMainService.isSourceInstance(
                     materialIndex,
                     basicMaterialRecord.gameObjectMap,
                     gameObjectRecord
                   )
                 )
               ),
          "index": basicMaterialRecord.index,
          "disposedIndexArray": basicMaterialRecord.disposedIndexArray
        }
      },
      "directionLightData": {"index": directionLightRecord.index},
      "pointLightData": {"index": pointLightRecord.index}
    },
    "renderData": {
      "isRender": isRender,
      "camera": cameraData,
      "basic": {
        "buffer": basicRenderObjectRecord.buffer,
        "count": basicRenderObjectRecord.count,
        "bufferCount": BufferSettingService.getBasicMaterialDataBufferCount(settingRecord)
      }
    }
  }
};

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {workerInstanceRecord} as state = StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      /* let basicRenderObjectRecord =
           OperateRenderMainService.unsafeGetBasicRenderObjectRecord(state);
         let {vMatrix, pMatrix, position} = OperateRenderMainService.unsafeGetCameraRecord(state); */
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessage(_buildData(operateType, stateData));
      Some(operateType)
    }
  );