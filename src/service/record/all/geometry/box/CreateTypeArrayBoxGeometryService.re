open Js.Typed_array;

open BufferBoxGeometryService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesOffset(count),
    ~length=getVertexLength(count)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getNormalsOffset(count),
    ~length=getVertexLength(count)
  ),
  Uint16Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIndicesOffset(count),
    ~length=getIndicesLength(count)
  )
);