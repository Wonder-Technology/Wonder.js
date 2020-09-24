let getLayerIndex = id => {
  TextureArrayWebGPUCPRepo.getLayerIndex(id->ImageIdVO.value)
  ->OptionSt.fromNullable;
};

let getBytesPerRow = () => {
  let (textureArrayLayerWidth, textureArrayLayerHeight) =
    WebGPUCoreRunAPI.getTextureArrayLayerSize();

  Js.Math.ceil_int(Number.dividInt(textureArrayLayerWidth * 4, 256)) * 256;
};

let getTextureArrayView = () => {
  TextureArrayWebGPUCPRepo.getTextureArrayView()->OptionSt.getExn;
};

let getTextureSampler = () => {
  TextureArrayWebGPUCPRepo.getTextureSampler()->OptionSt.getExn;
};
