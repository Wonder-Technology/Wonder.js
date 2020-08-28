open Js.Typed_array;

open BufferTransformCPRepoUtils;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalToWorldMatricesOffset(count),
    ~length=getLocalToWorldMatricesLength(count),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalPositionsOffset(count),
    ~length=getLocalPositionsLength(count),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalRotationsOffset(count),
    ~length=getLocalRotationsLength(count),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalScalesOffset(count),
    ~length=getLocalScalesLength(count),
  ),
);
