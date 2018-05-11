let buildInitRenderData =
    (
      ~isDebug=true,
      ~viewportData=Sinon.matchAny,
      ~workerDetectData=Sinon.matchAny,
      ~browserDetectData=Sinon.matchAny,
      ~textureData=Sinon.matchAny,
      ()
    ) => {
  "operateType": "INIT_RENDER",
  "canvas": Sinon.matchAny,
  "contextConfig": Sinon.matchAny,
  "bufferData": Sinon.matchAny,
  "instanceBufferData": Sinon.matchAny,
  "isDebug": isDebug,
  "viewportData": viewportData,
  "gpuData": Sinon.matchAny,
  "memoryData": Sinon.matchAny,
  "renderConfigData": Sinon.matchAny,
  "workerDetectData": workerDetectData,
  "browserDetectData": browserDetectData,
  "textureData": textureData,
  "transformData": Sinon.matchAny,
  "basicMaterialData": Sinon.matchAny,
  "lightMaterialData": Sinon.matchAny,
  "customGeometryData": Sinon.matchAny,
  "ambientLightData": Sinon.matchAny,
  "directionLightData": Sinon.matchAny,
  "pointLightData": Sinon.matchAny,
  "sourceInstanceData": Sinon.matchAny
};