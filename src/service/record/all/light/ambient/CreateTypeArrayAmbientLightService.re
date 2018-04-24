open Js.Typed_array;

open BufferAmbientLightService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(),
    ~length=getColorsLength()
  )
);