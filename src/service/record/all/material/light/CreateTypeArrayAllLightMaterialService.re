open Js.Typed_array;

open BufferAllLightMaterialService;

let createTypeArrays = (buffer, lightMaterialCount) => (
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=ShaderIndicesService.getShaderIndicesOffset(lightMaterialCount),
    ~length=ShaderIndicesService.getShaderIndicesLength(lightMaterialCount),
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getDiffuseColorsOffset(lightMaterialCount),
    ~length=getDiffuseColorsLength(lightMaterialCount),
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getSpecularColorsOffset(lightMaterialCount),
    ~length=getSpecularColorsLength(lightMaterialCount),
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getShininessOffset(lightMaterialCount),
    ~length=getShininessLength(lightMaterialCount),
  ),
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getDiffuseTextureIndicesOffset(lightMaterialCount),
    ~length=getDiffuseTextureIndicesLength(lightMaterialCount),
  ),
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getSpecularTextureIndicesOffset(lightMaterialCount),
    ~length=getSpecularTextureIndicesLength(lightMaterialCount),
  ),
);