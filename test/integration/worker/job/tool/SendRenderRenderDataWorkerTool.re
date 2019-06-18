let buildRenderRenderData =
    (
      ~basicSourceTextureData=Sinon.matchAny,
      ~arrayBufferViewSourceTextureData=Sinon.matchAny,
      ~cubemapTextureData=Sinon.matchAny,
      ~materialData=Sinon.matchAny,
      ~imguiData=Sinon.matchAny,
      ~customData=Sinon.matchAny,
      ~renderGeometryData=Sinon.matchAny,
      (),
    ) => {
  "operateType": Sinon.matchAny,
  "ambientLightData": Sinon.matchAny,
  "directionLightData": Sinon.matchAny,
  "pointLightData": Sinon.matchAny,
  "initData": {
    "materialData": materialData,
    "textureData": {
      "basicSourceTextureData": basicSourceTextureData,
      "arrayBufferViewSourceTextureData": arrayBufferViewSourceTextureData,
      "cubemapTextureData": cubemapTextureData,
    },
  },
  "renderData": {
    "isRender": Sinon.matchAny,
    "camera": Sinon.matchAny,
    "geometryData": renderGeometryData,
    "basic": Sinon.matchAny,
    "light": Sinon.matchAny,
    "sourceInstance": Sinon.matchAny,
  },
  "imguiData": imguiData,
  "customData": customData,
};