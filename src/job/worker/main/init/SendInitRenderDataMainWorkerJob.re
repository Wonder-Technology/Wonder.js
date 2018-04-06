open StateDataMainType;

open BasicMaterialType;

open SettingType;

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {
            settingRecord,
            workerInstanceRecord,
            renderConfigRecord,
            gameObjectRecord,
            transformRecord,
            basicMaterialRecord,
            boxGeometryRecord,
            customGeometryRecord,
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

      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessageWithTransferData(
           {
             "operateType": operateType,
             "canvas": offscreen,
             "contextConfig": OperateSettingService.unsafeGetContext(settingRecord),
             "bufferData": {
               "boxGeometryPointDataBufferCount": buffer.boxGeometryPointDataBufferCount,
               "customGeometryPointDataBufferCount":
                 buffer.customGeometryPointDataBufferCount,
               "transformDataBufferCount": buffer.transformDataBufferCount,
               "basicMaterialDataBufferCount": buffer.basicMaterialDataBufferCount
               /* "lightMaterialDataBufferCount": int */
             },
             /* "gpuData":{
"useHardwareInstance":  gpu.useHardwareInstance
             }, */
             "renderConfigData": {
               "shaders":
                 RenderConfigMainService.getShaders(state) |> Obj.magic |> Js.Json.stringify,
               "shaderLibs":
                 RenderConfigMainService.getShaderLibs(state) |> Obj.magic |> Js.Json.stringify
             },
             /* TODO remove index? */
             "transformData": {"buffer": transformRecord.buffer, "index": transformRecord.index},
             "basicMaterialData": {
               "buffer": basicMaterialRecord.buffer,
               "index": basicMaterialRecord.index,
               "disposedIndexArray": basicMaterialRecord.disposedIndexArray,
               "isSourceInstanceMap":
                 JudgeInstanceMainService .buildMap(
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
             "directionLightData":{
               "index": directionLightRecord.index
             },
             "pointLightData":{
               "index": pointLightRecord.index
             }
           },
           [|offscreen|]
         );
      Some(operateType)
    }
  );