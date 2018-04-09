open Js.Typed_array;

open RenderObjectBufferTypeArrayService;

let createTypeArrays = (buffer, count) => (
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTransformIndicesOffset(count),
    ~length=getTransformIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMaterialIndicesOffset(count),
    ~length=getMaterialIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getShaderIndicesOffset(count),
    ~length=getShaderIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getGeometryIndicesOffset(count),
    ~length=getGeometryIndicesLength(count)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getSourceInstanceIndicesOffset(count),
    ~length=getSourceInstanceIndicesLength(count)
  ),
  Uint8Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getGeometryTypesOffset(count),
    ~length=getGeometryTypesLength(count)
  )
);