open Js.Typed_array;

open BufferLightMaterialService;

let createTypeArrays = (buffer, count) => (
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=ShaderIndicesService.getShaderIndicesOffset(count),
    ~length=ShaderIndicesService.getShaderIndicesLength(count)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getDiffuseColorsOffset(count),
    ~length=getDiffuseColorsLength(count)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getSpecularColorsOffset(count),
    ~length=getSpecularColorsLength(count)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getShininessOffset(count),
    ~length=getShininessLength(count)
  )
);