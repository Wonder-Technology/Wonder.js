open Js.Typed_array;

let getShaderIndicesSize = () => 1;

let getDiffuseColorsSize = () => 3;

let getMapUnitsSize = () => 1;

let getDiffuseColorsLength = lightMaterialCount =>
  lightMaterialCount * getDiffuseColorsSize();

let getDiffuseColorsOffset = lightMaterialCount =>
  ShaderIndicesService.getShaderIndicesLength(lightMaterialCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getSpecularColorsSize = () => 3;

let getSpecularColorsLength = lightMaterialCount =>
  lightMaterialCount * getSpecularColorsSize();

let getSpecularColorsOffset = lightMaterialCount =>
  getDiffuseColorsOffset(lightMaterialCount)
  + getDiffuseColorsLength(lightMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getShininessSize = () => 1;

let getShininessLength = lightMaterialCount =>
  lightMaterialCount * getShininessSize();

let getShininessOffset = lightMaterialCount =>
  getSpecularColorsOffset(lightMaterialCount)
  + getSpecularColorsLength(lightMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getDiffuseColorIndex = index => index * getDiffuseColorsSize();

let getSpecularColorIndex = index => index * getSpecularColorsSize();

let getShininessIndex = index => index * getShininessSize();

let getDiffuseTextureIndicesLength = BufferMaterialService.getTextureIndicesLength;

let getDiffuseTextureIndicesOffset = lightMaterialCount =>
  getShininessOffset(lightMaterialCount)
  + getShininessLength(lightMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getDiffuseTextureIndicesIndex = BufferMaterialService.getTextureIndicesIndex;

let getSpecularTextureIndicesLength = BufferMaterialService.getTextureIndicesLength;

let getSpecularTextureIndicesOffset = lightMaterialCount =>
  getDiffuseTextureIndicesOffset(lightMaterialCount)
  + getDiffuseTextureIndicesLength(lightMaterialCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getSpecularTextureIndicesIndex = BufferMaterialService.getTextureIndicesIndex;

let getTextureIndexIndex = BufferMaterialService.getTextureIndexIndex;

let getTotalByteLength = lightMaterialCount =>
  lightMaterialCount
  * (
    Uint32Array._BYTES_PER_ELEMENT
    * ShaderIndicesService.getShaderIndicesSize()
    + Float32Array._BYTES_PER_ELEMENT
    * (getDiffuseColorsSize() + getSpecularColorsSize() + getShininessSize())
    + Uint32Array._BYTES_PER_ELEMENT
    * BufferMaterialService.getTextureIndicesSize()
    * 2
  );

let createBuffer = lightMaterialCount =>
  Worker.newSharedArrayBuffer(getTotalByteLength(lightMaterialCount));