open Js.Typed_array;

open BufferTransformService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    buffer,
    ~offset=getLocalToWorldMatricesOffset(count),
    ~length=getLocalToWorldMatricesLength(count)
  ),
  Float32Array.fromBufferRange(
    buffer,
    ~offset=getLocalPositionsOffset(count),
    ~length=getLocalPositionsLength(count)
  )
);