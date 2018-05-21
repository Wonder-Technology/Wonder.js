open Js.Typed_array;

open BufferAmbientLightService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(),
    ~length=getColorsLength()
  )
);