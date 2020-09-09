open Js.Typed_array;

open BufferDirectionLightCPRepoUtils;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(count),
    ~length=getColorsLength(count),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIntensitiesOffset(count),
    ~length=getIntensitiesLength(count),
  ),
);
