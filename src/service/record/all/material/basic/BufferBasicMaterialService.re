open Js.Typed_array;

/* let getDefaultTextureIndex = () => 0; */
let getShaderIndicesSize = () => 1;

let getColorsSize = () => 3;

/* let getTextureIndicesSize = BufferMaterialService.getTextureIndicesSize; */
let getMapUnitsSize = () => 1;

let getColorsLength = (basicMaterialCount) => basicMaterialCount * getColorsSize();

let getColorsOffset = (basicMaterialCount) =>
  ShaderIndicesService.getShaderIndicesOffset(basicMaterialCount)
  + ShaderIndicesService.getShaderIndicesLength(basicMaterialCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getColorIndex = (index) => index * getColorsSize();

let getTextureIndicesLength = BufferMaterialService.getTextureIndicesLength;

let getTextureIndicesOffset = (basicMaterialCount, textureCountPerMaterial) =>
  getColorsOffset(basicMaterialCount)
  + getColorsLength(basicMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getTextureIndicesIndex = BufferMaterialService.getTextureIndicesIndex;

let getTextureIndexIndex = BufferMaterialService.getTextureIndexIndex;

let getMapUnitsLength = (basicMaterialCount) => basicMaterialCount * getMapUnitsSize();

let getMapUnitsOffset = (basicMaterialCount, textureCountPerMaterial) =>
  getTextureIndicesOffset(basicMaterialCount, textureCountPerMaterial)
  + getTextureIndicesLength(basicMaterialCount, textureCountPerMaterial)
  * Uint32Array._BYTES_PER_ELEMENT;

let getMapUnitIndex = (index) => index * getMapUnitsSize();

let getTotalByteLength = (basicMaterialCount, textureCountPerMaterial) =>
  basicMaterialCount
  * (
    Uint32Array._BYTES_PER_ELEMENT
    * ShaderIndicesService.getShaderIndicesSize()
    + Float32Array._BYTES_PER_ELEMENT
    * getColorsSize()
    + Uint32Array._BYTES_PER_ELEMENT
    * BufferMaterialService.getTextureIndicesSize(textureCountPerMaterial)
    + Uint8Array._BYTES_PER_ELEMENT
    * getMapUnitsSize()
  );

let createBuffer = (basicMaterialCount, textureCountPerMaterial) =>
  Worker.newSharedArrayBuffer(getTotalByteLength(basicMaterialCount, textureCountPerMaterial));