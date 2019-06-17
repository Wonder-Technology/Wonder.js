let getMap = (material, getTextureIndexFunc, textureIndices) => {
  let textureIndex = getTextureIndexFunc(. material, textureIndices);

  TextureIndexService.isTextureNotDefaultValue(textureIndex) ?
    Some(textureIndex) : None;
};

let setMap = (material, texture, setTextureIndexFunc, textureIndices) =>
  setTextureIndexFunc(. material, texture, textureIndices);

let removeMap = (material, setTextureIndexFunc, textureIndices) => {
  let defaultTexture = TextureIndexService.getDefaultTextureIndex();

  setTextureIndexFunc(. material, defaultTexture, textureIndices);
};