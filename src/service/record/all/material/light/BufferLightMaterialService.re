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

let getTextureIndicesLength = BufferMaterialService.getTextureIndicesLength;

let getTextureIndicesOffset = (lightMaterialCount, textureCountPerMaterial) =>
  getShininessOffset(lightMaterialCount)
  + getShininessLength(lightMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getTextureIndicesIndex = BufferMaterialService.getTextureIndicesIndex;

let getTextureIndexIndex = BufferMaterialService.getTextureIndexIndex;

let getDiffuseMapUnitsLength = lightMaterialCount =>
  lightMaterialCount * getMapUnitsSize();

let getDiffuseMapUnitsOffset = (lightMaterialCount, textureCountPerMaterial) =>
  getTextureIndicesOffset(lightMaterialCount, textureCountPerMaterial)
  + getTextureIndicesLength(lightMaterialCount, textureCountPerMaterial)
  * Uint32Array._BYTES_PER_ELEMENT;

let getDiffuseMapUnitIndex = index => index * getMapUnitsSize();

let getSpecularMapUnitsLength = lightMaterialCount =>
  lightMaterialCount * getMapUnitsSize();

let getSpecularMapUnitsOffset = (lightMaterialCount, textureCountPerMaterial) =>
  getDiffuseMapUnitsOffset(lightMaterialCount, textureCountPerMaterial)
  + getDiffuseMapUnitsLength(lightMaterialCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getSpecularMapUnitIndex = index => index * getMapUnitsSize();

let getCopiedShaderIndicesLength = lightMaterialCount =>
  lightMaterialCount * ShaderIndicesService.getShaderIndicesSize();

let getCopiedShaderIndicesOffset =
    (lightMaterialCount, textureCountPerMaterial) =>
  getSpecularMapUnitsOffset(lightMaterialCount, textureCountPerMaterial)
  + getSpecularMapUnitsLength(lightMaterialCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getCopiedDiffuseColorsLength = lightMaterialCount =>
  lightMaterialCount * getDiffuseColorsSize();

let getCopiedDiffuseColorsOffset =
    (lightMaterialCount, textureCountPerMaterial) =>
  getCopiedShaderIndicesOffset(lightMaterialCount, textureCountPerMaterial)
  + getCopiedShaderIndicesLength(lightMaterialCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getCopiedSpecularColorsLength = lightMaterialCount =>
  lightMaterialCount * getSpecularColorsSize();

let getCopiedSpecularColorsOffset =
    (lightMaterialCount, textureCountPerMaterial) =>
  getCopiedDiffuseColorsOffset(lightMaterialCount, textureCountPerMaterial)
  + getCopiedDiffuseColorsLength(lightMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getCopiedShininessLength = lightMaterialCount =>
  lightMaterialCount * getShininessSize();

let getCopiedShininessOffset = (lightMaterialCount, textureCountPerMaterial) =>
  getCopiedSpecularColorsOffset(lightMaterialCount, textureCountPerMaterial)
  + getCopiedSpecularColorsLength(lightMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getCopiedTextureIndicesLength = BufferMaterialService.getTextureIndicesLength;

let getCopiedTextureIndicesOffset =
    (lightMaterialCount, textureCountPerMaterial) =>
  getCopiedShininessOffset(lightMaterialCount, textureCountPerMaterial)
  + getCopiedShininessLength(lightMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getCopiedDiffuseMapUnitsLength = lightMaterialCount =>
  lightMaterialCount * getMapUnitsSize();

let getCopiedDiffuseMapUnitsOffset =
    (lightMaterialCount, textureCountPerMaterial) =>
  getCopiedTextureIndicesOffset(lightMaterialCount, textureCountPerMaterial)
  + getCopiedTextureIndicesLength(
      lightMaterialCount,
      textureCountPerMaterial,
    )
  * Uint32Array._BYTES_PER_ELEMENT;

let getCopiedSpecularMapUnitsLength = lightMaterialCount =>
  lightMaterialCount * getMapUnitsSize();

let getCopiedSpecularMapUnitsOffset =
    (lightMaterialCount, textureCountPerMaterial) =>
  getDiffuseMapUnitsOffset(lightMaterialCount, textureCountPerMaterial)
  + getCopiedDiffuseMapUnitsLength(lightMaterialCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getTotalByteLength = (lightMaterialCount, textureCountPerMaterial) =>
  lightMaterialCount
  * (
    Uint32Array._BYTES_PER_ELEMENT
    * ShaderIndicesService.getShaderIndicesSize()
    + Float32Array._BYTES_PER_ELEMENT
    * (getDiffuseColorsSize() + getSpecularColorsSize() + getShininessSize())
    + Uint32Array._BYTES_PER_ELEMENT
    * BufferMaterialService.getTextureIndicesSize(textureCountPerMaterial)
    + Uint8Array._BYTES_PER_ELEMENT
    * (getMapUnitsSize() * 2)
  )
  * 2;

let createBuffer = (lightMaterialCount, textureCountPerMaterial) =>
  Worker.newSharedArrayBuffer(
    getTotalByteLength(lightMaterialCount, textureCountPerMaterial),
  );