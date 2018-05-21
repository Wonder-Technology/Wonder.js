open Js.Typed_array;

open BufferTransformService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalToWorldMatricesOffset(count),
    ~length=getLocalToWorldMatricesLength(count)
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalPositionsOffset(count),
    ~length=getLocalPositionsLength(count)
  )
);