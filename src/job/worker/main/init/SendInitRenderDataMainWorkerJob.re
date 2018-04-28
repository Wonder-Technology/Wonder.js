open StateDataMainType;

open BasicMaterialType;

open SettingType;

open SettingGPUType;

let _buildData = (operateType, canvas, stateData) => {
  let {
        settingRecord,
        workerInstanceRecord,
        gameObjectRecord,
        ambientLightRecord,
        directionLightRecord,
        pointLightRecord
      } as state =
    StateDataMainService.unsafeGetState(stateData);
  let {useHardwareInstance} = OperateSettingService.unsafeGetGPU(settingRecord);
  let {maxBigTypeArrayPoolSize} = OperateSettingService.unsafeGetMemory(settingRecord);
  let buffer = BufferSettingService.unsafeGetBuffer(settingRecord);
  let renderConfigRecord = RecordRenderConfigMainService.getRecord(state);
  let transformRecord = RecordTransformMainService.getRecord(state);
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  let boxGeometryRecord = RecordBoxGeometryMainService.getRecord(state);
  let customGeometryRecord = RecordCustomGeometryMainService.getRecord(state);
  let (x, y, width, height, _, _) = ScreenService.queryFullScreenData();
  {
    "operateType": operateType,
    "canvas": canvas,
    "contextConfig": OperateSettingService.unsafeGetContext(settingRecord),
    "isDebug": IsDebugMainService.getIsDebug(stateData),
    "viewportData": [|x, y, width, height|],
    "bufferData": {
      "customGeometryPointDataBufferCount": buffer.customGeometryPointDataBufferCount,
      "transformDataBufferCount": buffer.transformDataBufferCount,
      "basicMaterialDataBufferCount": buffer.basicMaterialDataBufferCount,
      "lightMaterialDataBufferCount": buffer.lightMaterialDataBufferCount
    },
    "gpuData": {"useHardwareInstance": useHardwareInstance},
    "memoryData": {"maxBigTypeArrayPoolSize": maxBigTypeArrayPoolSize},
    "workerDetectData": {"isUseWorker": WorkerDetectMainService.isUseWorker(state)},
    "renderConfigData": {
      "shaders":
        GetDataRenderConfigService.getShaders(renderConfigRecord) |> Obj.magic |> Js.Json.stringify,
      "shaderLibs":
        GetDataRenderConfigService.getShaderLibs(renderConfigRecord)
        |> Obj.magic
        |> Js.Json.stringify
    },
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
    "lightMaterialData": {
      "buffer": lightMaterialRecord.buffer,
      "index": lightMaterialRecord.index,
      "disposedIndexArray": lightMaterialRecord.disposedIndexArray,
      "isSourceInstanceMap":
        JudgeInstanceMainService.buildMap(
          lightMaterialRecord.index,
          RecordLightMaterialMainService.getRecord(state).gameObjectMap,
          gameObjectRecord
        )
    },
    "customGeometryData": {"buffer": customGeometryRecord.buffer},
    "ambientLightData": {"buffer": ambientLightRecord.buffer, "index": ambientLightRecord.index},
    "directionLightData": {
      "buffer": directionLightRecord.buffer,
      "index": directionLightRecord.index
    },
    "pointLightData": {"buffer": pointLightRecord.buffer, "index": pointLightRecord.index}
  }
};

let execJob = (flags, stateData) =>
  MostUtils.callFunc(
    () => {
      let {
            settingRecord,
            viewRecord,
            workerInstanceRecord,
            gameObjectRecord,
            directionLightRecord,
            pointLightRecord
          } as state =
        StateDataMainService.unsafeGetState(stateData);
      let operateType = JobConfigUtils.getOperateType(flags);
      let offscreen = ViewService.getCanvas(viewRecord) |> Worker.transferControlToOffscreen;
      WorkerInstanceService.unsafeGetRenderWorker(workerInstanceRecord)
      |> WorkerService.postMessageWithTransferData(
           _buildData(operateType, offscreen, stateData),
           [|offscreen|]
         );
      Some(operateType)
    }
  );