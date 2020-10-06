let getLayerIndex = id => {
  TextureArrayWebGPUCPRepo.getLayerIndex(id->ImageIdVO.value)
  
};

let getBytesPerRow = () => {
  let (textureArrayLayerWidth, textureArrayLayerHeight) =
    WebGPUCoreCPAPI.getTextureArrayLayerSize();

  Js.Math.ceil_int(Number.dividInt(textureArrayLayerWidth * 4, 256)) * 256;
};

let getTextureArrayView = () => {
  TextureArrayWebGPUCPRepo.getTextureArrayView()->OptionSt.getExn;
};

let getTextureSampler = () => {
  TextureArrayWebGPUCPRepo.getTextureSampler()->OptionSt.getExn;
};

let createAndSetTextureArrayViewAndTextureSampler = () => {
  TextureArrayWebGPUCPRepo.setTextureArrayView(
    WebGPUDependencyTool.createTextureViewObject(),
  );
  TextureArrayWebGPUCPRepo.setTextureSampler(
    WebGPUDependencyTool.createSamplerObject(),
  );
};

let setMapBetweenAllUsedImageIdToLayerIndex = () => {
  UpdateTextureArrayCPJobEntity._getAllUsedImageIdAndData()
  ->UpdateTextureArrayCPJobEntity._setMapBetweenImageIdToLayerIndex;
};
