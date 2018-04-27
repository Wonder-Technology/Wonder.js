let buildInitRenderData = (~isDebug=false, ()) => {
  "operateType": "INIT_RENDER",
  "canvas": Sinon.matchAny,
  "contextConfig": Sinon.matchAny,
  "bufferData": Sinon.matchAny,
  "isDebug": isDebug,
  "gpuData": Sinon.matchAny,
  "memoryData": Sinon.matchAny,
  "renderConfigData": Sinon.matchAny,
  "workerDetectData": Sinon.matchAny,
  "transformData": Sinon.matchAny,
  "basicMaterialData": Sinon.matchAny,
  "lightMaterialData": Sinon.matchAny,
  "customGeometryData": Sinon.matchAny,
  "ambientLightData": Sinon.matchAny,
  "directionLightData": Sinon.matchAny,
  "pointLightData": Sinon.matchAny
};