open Js.Typed_array;

open BufferBoxGeometryService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    buffer,
    ~offset=getVerticesOffset(count),
    ~length=getVertexLength(count)
  ),
  Float32Array.fromBufferRange(
    buffer,
    ~offset=getNormalsOffset(count),
    ~length=getVertexLength(count)
  ),
  Uint16Array.fromBufferRange(
    buffer,
    ~offset=getIndicesOffset(count),
    ~length=getIndicesLength(count)
  )
);