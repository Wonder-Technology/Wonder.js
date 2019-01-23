open Js.Typed_array;

open BufferBasicMaterialService;

let createTypeArrays = (buffer, basicMaterialCount, textureCountPerMaterial) => (
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
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=
      getTextureIndicesOffset(basicMaterialCount, textureCountPerMaterial),
    ~length=
      getTextureIndicesLength(basicMaterialCount, textureCountPerMaterial),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMapUnitsOffset(basicMaterialCount, textureCountPerMaterial),
    ~length=getMapUnitsLength(basicMaterialCount),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=
      getIsDepthTestsOffset(basicMaterialCount, textureCountPerMaterial),
    ~length=getIsDepthTestsLength(basicMaterialCount),
  ),
);