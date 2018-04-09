open Js.Typed_array;

open RenderObjectBufferTypeArrayService;

let createTypeArrays = (buffer, count) => (
  Uint32Array.fromBufferRange(
    buffer,
    ~offset=getTransformIndicesOffset(count),
    ~length=getTransformIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    buffer,
    ~offset=getMaterialIndicesOffset(count),
    ~length=getMaterialIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    buffer,
    ~offset=getShaderIndicesOffset(count),
    ~length=getShaderIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    buffer,
    ~offset=getGeometryIndicesOffset(count),
    ~length=getGeometryIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    buffer,
    ~offset=getSourceInstanceIndicesOffset(count),
    ~length=getSourceInstanceIndicesLength(count)
  ),
  Uint8Array.fromBufferRange(
    buffer,
    ~offset=getGeometryTypesOffset(count),
    ~length=getGeometryTypesLength(count)
  )
);