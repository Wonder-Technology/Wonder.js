open Js.Typed_array;

open BufferAllBasicMaterialService;

let createTypeArrays = (buffer, basicMaterialCount) => (
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=ShaderIndicesService.getShaderIndicesOffset(basicMaterialCount),
    ~length=ShaderIndicesService.getShaderIndicesLength(basicMaterialCount),
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(basicMaterialCount),
    ~length=getColorsLength(basicMaterialCount),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIsDepthTestsOffset(basicMaterialCount),
    ~length=getIsDepthTestsLength(basicMaterialCount),
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getAlphasOffset(basicMaterialCount),
    ~length=getAlphasLength(basicMaterialCount),
  ),
);