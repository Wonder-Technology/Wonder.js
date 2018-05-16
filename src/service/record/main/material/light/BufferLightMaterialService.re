open Js.Typed_array;

let getDefaultTextureIndex = () => 0;

let getShaderIndicesSize = () => 1;

let getDiffuseColorsSize = () => 3;

let getTextureIndicesSize = (textureCountPerMaterial) => textureCountPerMaterial;

let getMapUnitsSize = () => 1;

let getDiffuseColorsLength = (lightMaterialCount) => lightMaterialCount * getDiffuseColorsSize();

let getDiffuseColorsOffset = (lightMaterialCount) =>
  ShaderIndicesService.getShaderIndicesLength(lightMaterialCount) * Uint32Array._BYTES_PER_ELEMENT;

let getSpecularColorsSize = () => 3;

let getSpecularColorsLength = (lightMaterialCount) => lightMaterialCount * getSpecularColorsSize();

let getSpecularColorsOffset = (lightMaterialCount) =>
  getDiffuseColorsOffset(lightMaterialCount)
  + getDiffuseColorsLength(lightMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getShininessSize = () => 1;

let getShininessLength = (lightMaterialCount) => lightMaterialCount * getShininessSize();

let getShininessOffset = (lightMaterialCount) =>
  getSpecularColorsOffset(lightMaterialCount)
  + getSpecularColorsLength(lightMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getDiffuseColorIndex = (index) => index * getDiffuseColorsSize();

let getSpecularColorIndex = (index) => index * getSpecularColorsSize();

let getShininessIndex = (index) => index * getShininessSize();

/* TODO duplicate */
let getTextureIndicesLength = (lightMaterialCount, textureCountPerMaterial) =>
  lightMaterialCount * getTextureIndicesSize(textureCountPerMaterial);

let getTextureIndicesOffset = (lightMaterialCount, textureCountPerMaterial) =>
  getShininessOffset(lightMaterialCount)
  + getShininessLength(lightMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getTextureIndicesIndex = (index, textureCountPerMaterial) =>
  index * getTextureIndicesSize(textureCountPerMaterial);

let getTextureIndexIndex = (index, textureIndex, textureCountPerMaterial) =>
  getTextureIndicesIndex(index, textureCountPerMaterial) + textureIndex;

let getDiffuseMapUnitsLength = (lightMaterialCount) => lightMaterialCount * getMapUnitsSize();

let getDiffuseMapUnitsOffset = (lightMaterialCount, textureCountPerMaterial) =>
  getTextureIndicesOffset(lightMaterialCount, textureCountPerMaterial)
  + getTextureIndicesLength(lightMaterialCount, textureCountPerMaterial)
  * Uint32Array._BYTES_PER_ELEMENT;

let getDiffuseMapUnitIndex = (index) => index * getMapUnitsSize();

let getSpecularMapUnitsLength = (lightMaterialCount) => lightMaterialCount * getMapUnitsSize();

let getSpecularMapUnitsOffset = (lightMaterialCount, textureCountPerMaterial) =>
  getTextureIndicesOffset(lightMaterialCount, textureCountPerMaterial)
  + getTextureIndicesLength(lightMaterialCount, textureCountPerMaterial)
  * Uint32Array._BYTES_PER_ELEMENT;

let getSpecularMapUnitIndex = (index) => index * getMapUnitsSize();

let getTotalByteLength = (lightMaterialCount, textureCountPerMaterial) =>
  lightMaterialCount
  * (
    Uint32Array._BYTES_PER_ELEMENT
    * ShaderIndicesService.getShaderIndicesSize()
    + Float32Array._BYTES_PER_ELEMENT
    * (getDiffuseColorsSize() + getSpecularColorsSize() + getShininessSize())
    + Uint32Array._BYTES_PER_ELEMENT
    * getTextureIndicesSize(textureCountPerMaterial)
    + Uint8Array._BYTES_PER_ELEMENT
    * (getMapUnitsSize() * 2)
  );

let createBuffer = (lightMaterialCount, textureCountPerMaterial) =>
  Worker.newSharedArrayBuffer(getTotalByteLength(lightMaterialCount, textureCountPerMaterial));