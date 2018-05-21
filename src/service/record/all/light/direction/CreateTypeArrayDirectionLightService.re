open Js.Typed_array;

open BufferDirectionLightService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(),
    ~length=getColorsLength()
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIntensitiesOffset(),
    ~length=getIntensitiesLength()
  )
);