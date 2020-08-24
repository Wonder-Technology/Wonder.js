open Js.Typed_array;

open BufferTransformRepo;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    SharedArrayBufferPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalToWorldMatricesOffset(count),
    ~length=getLocalToWorldMatricesLength(count),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalPositionsOffset(count),
    ~length=getLocalPositionsLength(count),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalRotationsOffset(count),
    ~length=getLocalRotationsLength(count),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalScalesOffset(count),
    ~length=getLocalScalesLength(count),
  ),
);
