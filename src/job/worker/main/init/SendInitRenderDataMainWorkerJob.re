open StateDataMainType;

open BasicMaterialType;

open SettingType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {
            settingRecord,
            workerInstanceRecord,
            gameObjectRecord,
            directionLightRecord,
            pointLightRecord
          } as state =
        StateDataMainService.getState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      let offscreen =
        CreateCanvasService.createCanvas(OperateSettingService.getCanvasId(settingRecord))
        |> Worker.transferControlToOffscreen;
      /* let { buffer, gpu } = settingRecord; */
      let buffer = BufferSettingService.unsafeGetBuffer(settingRecord);
      let renderConfigRecord = RecordRenderConfigMainService.getRecord(state);
      let transformRecord = RecordTransformMainService.getRecord(state);
      let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
      let boxGeometryRecord = RecordBoxGeometryMainService.getRecord(state);
      let customGeometryRecord = RecordCustomGeometryMainService.getRecord(state);
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessageWithTransferData(
           {
             "operateType": operateType,
             "canvas": offscreen,
             "contextConfig": OperateSettingService.unsafeGetContext(settingRecord),
             "bufferData": {
               "boxGeometryPointDataBufferCount": buffer.boxGeometryPointDataBufferCount,
               "customGeometryPointDataBufferCount": buffer.customGeometryPointDataBufferCount,
               "transformDataBufferCount": buffer.transformDataBufferCount,
               "basicMaterialDataBufferCount": buffer.basicMaterialDataBufferCount
               /* "lightMaterialDataBufferCount": int */
             },
             /* "gpuData":{
                "useHardwareInstance":  gpu.useHardwareInstance
                             }, */
             "renderConfigData": {
               "shaders":
                 GetDataRenderConfigService.getShaders(renderConfigRecord)
                 |> Obj.magic
                 |> Js.Json.stringify,
               "shaderLibs":
                 GetDataRenderConfigService.getShaderLibs(renderConfigRecord)
                 |> Obj.magic
                 |> Js.Json.stringify
             },
             "transformData": {"buffer": transformRecord.buffer},
             "basicMaterialData": {
               "buffer": basicMaterialRecord.buffer,
               "index": basicMaterialRecord.index,
               "disposedIndexArray": basicMaterialRecord.disposedIndexArray,
               "isSourceInstanceMap":
                 JudgeInstanceMainService.buildMap(
                   basicMaterialRecord.index,
                   RecordBasicMaterialMainService.getRecord(state).gameObjectMap,
                   gameObjectRecord
                 )
             },
             "boxGeometryData": {
               "buffer": boxGeometryRecord.buffer,
               "index": boxGeometryRecord.index
             },
             "customGeometryData": {
               "buffer": customGeometryRecord.buffer,
               "verticesInfoArray": customGeometryRecord.verticesInfoArray,
               "normalsInfoArray": customGeometryRecord.normalsInfoArray,
               "indicesInfoArray": customGeometryRecord.indicesInfoArray
             },
             /* TODO send positionMap */
             "directionLightData": {"index": directionLightRecord.index},
             "pointLightData": {"index": pointLightRecord.index}
           },
           [|offscreen|]
         );
      Some(operateType)
    }
  );