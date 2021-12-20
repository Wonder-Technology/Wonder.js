open Js.Typed_array

open BufferTransformUtils

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalToWorldMatricesOffset(count),
    ~length=getLocalToWorldMatricesLength(count),
  ),
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalPositionsOffset(count),
    ~length=getLocalPositionsLength(count),
  ),
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalRotationsOffset(count),
    ~length=getLocalRotationsLength(count),
  ),
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLocalScalesOffset(count),
    ~length=getLocalScalesLength(count),
  ),
)
