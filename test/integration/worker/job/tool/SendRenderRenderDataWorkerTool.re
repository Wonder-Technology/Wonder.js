let buildRenderRenderData =
    (~basicSourceTextureData=Sinon.matchAny, ~arrayBufferViewSourceTextureData=Sinon.matchAny, ()) => {
  "operateType": Sinon.matchAny,
  "directionLightData": Sinon.matchAny,
  "pointLightData": Sinon.matchAny,
  "initData": {
    "materialData": Sinon.matchAny,
    "textureData": {
      "basicSourceTextureData": basicSourceTextureData,
      "arrayBufferViewSourceTextureData": arrayBufferViewSourceTextureData
    }
  },
  "renderData": Sinon.matchAny
};