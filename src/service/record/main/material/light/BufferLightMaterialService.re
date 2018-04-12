open Js.Typed_array;

let getDiffuseColorsSize = () => 3;

let getDiffuseColorsLength = (count) => count * getDiffuseColorsSize();

let getDiffuseColorsOffset = (count) =>
  ShaderIndicesService.getShaderIndicesLength(count) * Uint32Array._BYTES_PER_ELEMENT;

let getSpecularColorsSize = () => 3;

let getSpecularColorsLength = (count) => count * getSpecularColorsSize();

let getSpecularColorsOffset = (count) =>
  /* ShaderIndicesService.getShaderIndicesLength(count)
   * Uint32Array._BYTES_PER_ELEMENT */
  getDiffuseColorsOffset(count) + getDiffuseColorsLength(count) * Float32Array._BYTES_PER_ELEMENT;

let getShininessSize = () => 1;

let getShininessLength = (count) => count * getShininessSize();

let getShininessOffset = (count) =>
  /* ShaderIndicesService.getShaderIndicesLength(count)
   * Uint32Array._BYTES_PER_ELEMENT
   + getDiffuseColorsLength(count)
   * Float32Array._BYTES_PER_ELEMENT */
  getSpecularColorsOffset(count) + getSpecularColorsLength(count) * Float32Array._BYTES_PER_ELEMENT;

let getDiffuseColorIndex = (index) => index * getDiffuseColorsSize();

let getSpecularColorIndex = (index) => index * getSpecularColorsSize();

let getShininessIndex = (index) => index * getShininessSize();

let getTotalByteLength = (count) =>
  count
  * Uint32Array._BYTES_PER_ELEMENT
  * ShaderIndicesService.getShaderIndicesSize()
  + count
  * Float32Array._BYTES_PER_ELEMENT
  * (getDiffuseColorsSize() + getSpecularColorsSize() + getShininessSize());

let createBuffer = (count) => Worker.newSharedArrayBuffer(getTotalByteLength(count));