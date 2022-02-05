open Js.Typed_array

open BufferPBRMaterialUtils

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getDiffuseColorsOffset(count),
    ~length=getDiffuseColorsLength(count),
  ),
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getSpecularsOffset(count),
    ~length=getSpecularsLength(count),
  ),
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getSpecularColorsOffset(count),
    ~length=getSpecularColorsLength(count),
  ),
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getRoughnessesOffset(count),
    ~length=getRoughnessesLength(count),
  ),
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMetalnessesOffset(count),
    ~length=getMetalnessesLength(count),
  ),
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTransmissionsOffset(count),
    ~length=getTransmissionsLength(count),
  ),
  Float32Array.fromBufferRange(
    WonderCommonlib.SharedArrayBufferType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIORsOffset(count),
    ~length=getIORsLength(count),
  ),
)
