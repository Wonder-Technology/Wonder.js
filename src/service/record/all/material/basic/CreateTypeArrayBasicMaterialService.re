open Js.Typed_array;

open BufferBasicMaterialService;

let createTypeArrays = (buffer, count) => (
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=ShaderIndicesService.getShaderIndicesOffset(count),
    ~length=ShaderIndicesService.getShaderIndicesLength(count)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(count),
    ~length=getColorsLength(count)
  )
);