open Js.Typed_array;

let getShaderIndicesSize = () => 1;

let getColorsSize = () => 3;

let getIsDepthTestsSize = () => 1;

let getAlphasSize = () => 1;

let getColorsLength = basicMaterialCount =>
  basicMaterialCount * getColorsSize();

let getColorsOffset = basicMaterialCount =>
  ShaderIndicesService.getShaderIndicesOffset(basicMaterialCount)
  + ShaderIndicesService.getShaderIndicesLength(basicMaterialCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getColorIndex = index => index * getColorsSize();

let getIsDepthTestsLength = basicMaterialCount =>
  basicMaterialCount * getIsDepthTestsSize();

let getIsDepthTestsOffset = basicMaterialCount =>
  getColorsOffset(basicMaterialCount)
  + getColorsLength(basicMaterialCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getIsDepthTestIndex = index => index * getIsDepthTestsSize();

let getAlphasLength = basicMaterialCount =>
  basicMaterialCount * getAlphasSize();

let getAlphasOffset = basicMaterialCount =>
  getIsDepthTestsOffset(basicMaterialCount)
  + getIsDepthTestsLength(basicMaterialCount)
  * Uint8Array._BYTES_PER_ELEMENT;

let getAlphaIndex = index => index * getAlphasSize();

let getTotalByteLength = basicMaterialCount =>
  basicMaterialCount
  * (
    Uint32Array._BYTES_PER_ELEMENT
    * ShaderIndicesService.getShaderIndicesSize()
    + Float32Array._BYTES_PER_ELEMENT
    * getColorsSize()
    + Uint8Array._BYTES_PER_ELEMENT
    * getIsDepthTestsSize()
    + Float32Array._BYTES_PER_ELEMENT
    * getAlphasSize()
  );

let createBuffer = basicMaterialCount =>
  Worker.newSharedArrayBuffer(getTotalByteLength(basicMaterialCount));

let getDefaultAlpha = () => 1.;