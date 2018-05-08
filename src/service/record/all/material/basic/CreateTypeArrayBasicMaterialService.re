open Js.Typed_array;

open BufferBasicMaterialService;

let createTypeArrays = (buffer, basicMaterialCount, textureCountPerBasicMaterial) => (
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=ShaderIndicesService.getShaderIndicesOffset(basicMaterialCount),
    ~length=ShaderIndicesService.getShaderIndicesLength(basicMaterialCount)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(basicMaterialCount),
    ~length=getColorsLength(basicMaterialCount)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTextureIndicesOffset(basicMaterialCounl),
    ~length=getTextureIndicesLength(basicMaterialCount, textureCountPerBasicMaterial)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTextureCountsOffset(basicMaterialCount, textureCountPerBasicMaterial),
    ~length=getTextureCountsLength(basicMaterialCount)
  )
);