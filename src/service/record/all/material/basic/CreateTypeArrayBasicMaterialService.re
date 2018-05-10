open Js.Typed_array;

open BufferBasicMaterialService;

let createTypeArrays = (buffer, basicMaterialCount, textureCountPerMaterial) => (
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
    ~offset=getTextureIndicesOffset(basicMaterialCount, textureCountPerMaterial),
    ~length=getTextureIndicesLength(basicMaterialCount, textureCountPerMaterial)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMapUnitsOffset(basicMaterialCount, textureCountPerMaterial),
    ~length=getMapUnitsLength(basicMaterialCount)
  )
);