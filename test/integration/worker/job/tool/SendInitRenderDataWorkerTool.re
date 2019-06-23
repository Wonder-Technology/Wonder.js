let buildInitRenderData =
    (
      ~isDebug=true,
      ~viewportData=Sinon.matchAny,
      ~workerDetectData=Sinon.matchAny,
      ~browserDetectData=Sinon.matchAny,
      ~textureData=Sinon.matchAny,
      ~imguiData=Sinon.matchAny,
      ~meshRendererData=Sinon.matchAny,
      ~geometryData=Sinon.matchAny,
      (),
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
  "imguiData": imguiData,
  "transformData": Sinon.matchAny,
  "basicMaterialData": Sinon.matchAny,
  "lightMaterialData": Sinon.matchAny,
  "meshRendererData": Sinon.matchAny,
  "geometryData": geometryData,
  "directionLightData": Sinon.matchAny,
  "pointLightData": Sinon.matchAny,
  "sourceInstanceData": Sinon.matchAny,
};

let buildTextureData =
    (
      ~sourceTextureBuffer=Sinon.matchAny,
      ~basicSourceTextureData=Sinon.matchAny,
      ~arrayBufferViewSourceTextureData=Sinon.matchAny,
      ~cubemapTextureData=Sinon.matchAny,
      (),
    ) => {
  "sourceTextureBuffer": sourceTextureBuffer,
  "basicSourceTextureData": basicSourceTextureData,
  "arrayBufferViewSourceTextureData": arrayBufferViewSourceTextureData,
  "cubemapTextureData": cubemapTextureData,
};