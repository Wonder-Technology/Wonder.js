let getDefaultIsDepthTest = () => 0;

let getTextureIndicesSize = () => 1;

let getTextureIndicesLength = materialCount =>
  materialCount * getTextureIndicesSize();

let getTextureIndicesIndex = index => index * getTextureIndicesSize();

let getTextureIndexIndex = index => getTextureIndicesIndex(index);