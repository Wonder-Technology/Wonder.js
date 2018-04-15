open StateDataMainType;

open BasicMaterialType;

open SettingType;

let _buildData = (operateType, canvas, stateData) => {
  let {
        settingRecord,
        workerInstanceRecord,
        gameObjectRecord,
        directionLightRecord,
        pointLightRecord
      } as state =
    StateDataMainService.unsafeGetState(stateData);
  let gpu = OperateSettingService.unsafeGetGPU(settingRecord);
  let buffer = BufferSettingService.unsafeGetBuffer(settingRecord);
  let renderConfigRecord = RecordRenderConfigMainService.getRecord(state);
  let transformRecord = RecordTransformMainService.getRecord(state);
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let boxGeometryRecord = RecordBoxGeometryMainService.getRecord(state);
  let customGeometryRecord = RecordCustomGeometryMainService.getRecord(state);
  {
    "operateType": operateType,
    "canvas": canvas,
    "contextConfig": OperateSettingService.unsafeGetContext(settingRecord),
    "bufferData": {
      "customGeometryPointDataBufferCount": buffer.customGeometryPointDataBufferCount,
      "transformDataBufferCount": buffer.transformDataBufferCount,
      "basicMaterialDataBufferCount": buffer.basicMaterialDataBufferCount
      /* "lightMaterialDataBufferCount": int */
    },
    "gpuData": {"useHardwareInstance": gpu.useHardwareInstance},
    "workerDetectData": {"isUseWorker": WorkerDetectMainService.isUseWorker(state)},
    "renderConfigData": {
      "shaders":
        GetDataRenderConfigService.getShaders(renderConfigRecord) |> Obj.magic |> Js.Json.stringify,
      "shaderLibs":
        GetDataRenderConfigService.getShaderLibs(renderConfigRecord)
        |> Obj.magic
        |> Js.Json.stringify
    },
    /* TODO fix and test! */
    "transformData": {"buffer": transformRecord |> CopyTransformService.unsafeGetCopiedBuffer},
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
    "customGeometryData": {
      "buffer": customGeometryRecord.buffer,
      "verticesInfoArray": customGeometryRecord.verticesInfoArray,
      "normalsInfoArray": customGeometryRecord.normalsInfoArray,
      "indicesInfoArray": customGeometryRecord.indicesInfoArray
    },
    /* TODO send positionMap */
    "directionLightData": {"index": directionLightRecord.index},
    "pointLightData": {"index": pointLightRecord.index}
  }
};

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
        StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      let offscreen =
        CreateCanvasService.createCanvas(OperateSettingService.getCanvasId(settingRecord))
        |> Worker.transferControlToOffscreen;
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessageWithTransferData(
           _buildData(operateType, offscreen, stateData),
           [|offscreen|]
         );
      Some(operateType)
    }
  );