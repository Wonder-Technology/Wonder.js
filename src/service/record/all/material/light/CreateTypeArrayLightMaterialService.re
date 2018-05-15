open Js.Typed_array;

open BufferLightMaterialService;

let createTypeArrays = (buffer, lightMaterialCount, textureCountPerMaterial) => (
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=ShaderIndicesService.getShaderIndicesOffset(lightMaterialCount),
    ~length=ShaderIndicesService.getShaderIndicesLength(lightMaterialCount)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getDiffuseColorsOffset(lightMaterialCount),
    ~length=getDiffuseColorsLength(lightMaterialCount)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getSpecularColorsOffset(lightMaterialCount),
    ~length=getSpecularColorsLength(lightMaterialCount)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getShininessOffset(lightMaterialCount),
    ~length=getShininessLength(lightMaterialCount)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTextureIndicesOffset(lightMaterialCount, textureCountPerMaterial),
    ~length=getTextureIndicesLength(lightMaterialCount, textureCountPerMaterial)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getDiffuseMapUnitsOffset(lightMaterialCount, textureCountPerMaterial),
    ~length=getDiffuseMapUnitsLength(lightMaterialCount)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getSpecularMapUnitsOffset(lightMaterialCount, textureCountPerMaterial),
    ~length=getSpecularMapUnitsLength(lightMaterialCount)
  )
);