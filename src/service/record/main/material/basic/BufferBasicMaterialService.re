open Js.Typed_array;

let getDefaultTextureCount = () => 0;

let getShaderIndicesSize = () => 1;

let getColorsSize = () => 3;

let getTextureIndicesSize = (textureCountPerBasicMaterial) => textureCountPerBasicMaterial;

let getTextureCountsSize = () => 1;

let getColorsLength = (basicMaterialCount) => basicMaterialCount * getColorsSize();

let getColorsOffset = (basicMaterialCount) =>
  ShaderIndicesService.getShaderIndicesLength(basicMaterialCount) * Uint32Array._BYTES_PER_ELEMENT;

let getColorIndex = (index) => index * getColorsSize();

let getTextureIndicesLength = (basicMaterialCount, textureCountPerBasicMaterial) =>
  basicMaterialCount * getTextureIndicesSize(textureCountPerBasicMaterial);

let getTextureIndicesOffset = (basicMaterialCount) =>
  getColorsLength(basicMaterialCount) * Float32Array._BYTES_PER_ELEMENT;

let getTextureIndicesIndex = (index, textureCountPerBasicMaterial) =>
  index * getTextureIndicesSize(textureCountPerBasicMaterial);

let getTextureIndexIndex = (index, textureIndex, textureCountPerBasicMaterial) =>
  getTextureIndicesIndex(index, textureCountPerBasicMaterial) + textureIndex;

let getTextureCountsLength = (basicMaterialCount) => basicMaterialCount * getTextureCountsSize();

let getTextureCountsOffset = (basicMaterialCount, textureCountPerBasicMaterial) =>
  getTextureIndicesLength(basicMaterialCount, textureCountPerBasicMaterial)
  * Uint32Array._BYTES_PER_ELEMENT;

let getTextureCountIndex = (index) => index * getTextureCountsSize();

let getTotalByteLength = (basicMaterialCount, textureCountPerBasicMaterial) =>
  basicMaterialCount
  * (
    Uint32Array._BYTES_PER_ELEMENT
    * ShaderIndicesService.getShaderIndicesSize()
    + Float32Array._BYTES_PER_ELEMENT
    * getColorsSize()
    + Uint32Array._BYTES_PER_ELEMENT
    * getTextureIndicesSize(textureCountPerBasicMaterial)
    + Uint8Array._BYTES_PER_ELEMENT
    * getTextureCountsSize()
  );

let createBuffer = (basicMaterialCount, textureCountPerBasicMaterial) =>
  Worker.newSharedArrayBuffer(
    getTotalByteLength(basicMaterialCount, textureCountPerBasicMaterial)
  );