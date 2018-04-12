open Js.Typed_array;

let getColorsSize = () => 3;

let getColorsLength = (count) => count * getColorsSize();

let getColorsOffset = (count) =>
  ShaderIndicesService.getShaderIndicesLength(count) * Uint32Array._BYTES_PER_ELEMENT;

let getColorIndex = (index) => index * getColorsSize();

let getTotalByteLength = (count) =>
  count
  * Uint32Array._BYTES_PER_ELEMENT
  * ShaderIndicesService.getShaderIndicesSize()
  + count
  * Float32Array._BYTES_PER_ELEMENT
  * getColorsSize();

let createBuffer = (count) => Worker.newSharedArrayBuffer(getTotalByteLength(count));