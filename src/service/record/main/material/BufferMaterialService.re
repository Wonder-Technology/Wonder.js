let getDefaultTextureIndex = () => 0;

let getTextureIndicesSize = (textureCountPerMaterial) => textureCountPerMaterial;

let getTextureIndicesLength = (materialCount, textureCountPerMaterial) =>
  materialCount * getTextureIndicesSize(textureCountPerMaterial);

let getTextureIndicesIndex = (index, textureCountPerMaterial) =>
  index * getTextureIndicesSize(textureCountPerMaterial);

let getTextureIndexIndex = (index, textureIndex, textureCountPerMaterial) =>
  getTextureIndicesIndex(index, textureCountPerMaterial) + textureIndex;