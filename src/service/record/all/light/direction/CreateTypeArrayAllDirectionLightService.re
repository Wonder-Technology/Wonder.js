open Js.Typed_array;

open BufferDirectionLightService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(count),
    ~length=getColorsLength(count),
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIntensitiesOffset(count),
    ~length=getIntensitiesLength(count),
  ),
);