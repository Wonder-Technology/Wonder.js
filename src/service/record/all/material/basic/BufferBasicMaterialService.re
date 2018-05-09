open Js.Typed_array;

let getShaderIndicesSize = () => 1;

let getColorsSize = () => 3;

let getTextureIndicesSize = (textureCountPerBasicMaterial) => textureCountPerBasicMaterial;

let getMapUnitsSize = () => 1;

let getColorsLength = (basicMaterialCount) => basicMaterialCount * getColorsSize();

let getColorsOffset = (basicMaterialCount) =>
  ShaderIndicesService.getShaderIndicesOffset(basicMaterialCount)
  + ShaderIndicesService.getShaderIndicesLength(basicMaterialCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getColorIndex = (index) => index * getColorsSize();

let getTextureIndicesLength = (basicMaterialCount, textureCountPerBasicMaterial) =>
  basicMaterialCount * getTextureIndicesSize(textureCountPerBasicMaterial);

let getTextureIndicesOffset = (basicMaterialCount, textureCountPerBasicMaterial) =>
  getColorsOffset(basicMaterialCount)
  + getColorsLength(basicMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getTextureIndicesIndex = (index, textureCountPerBasicMaterial) =>
  index * getTextureIndicesSize(textureCountPerBasicMaterial);

let getTextureIndexIndex = (index, textureIndex, textureCountPerBasicMaterial) =>
  getTextureIndicesIndex(index, textureCountPerBasicMaterial) + textureIndex;

let getMapUnitsLength = (basicMaterialCount) => basicMaterialCount * getMapUnitsSize();

let getMapUnitsOffset = (basicMaterialCount, textureCountPerBasicMaterial) =>
  getTextureIndicesOffset(basicMaterialCount, textureCountPerBasicMaterial)
  + getTextureIndicesLength(basicMaterialCount, textureCountPerBasicMaterial)
  * Uint32Array._BYTES_PER_ELEMENT;

let getMapUnitIndex = (index) => index * getMapUnitsSize();

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
    * getMapUnitsSize()
  );

let createBuffer = (basicMaterialCount, textureCountPerBasicMaterial) =>
  Worker.newSharedArrayBuffer(
    getTotalByteLength(basicMaterialCount, textureCountPerBasicMaterial)
  );