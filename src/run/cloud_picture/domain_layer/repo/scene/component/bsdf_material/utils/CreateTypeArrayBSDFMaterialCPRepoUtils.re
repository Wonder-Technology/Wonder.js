open Js.Typed_array;

open BufferBSDFMaterialCPRepoUtils;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getDiffuseColorsOffset(count),
    ~length=getDiffuseColorsLength(count),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getSpecularsOffset(count),
    ~length=getSpecularsLength(count),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getRoughnessesOffset(count),
    ~length=getRoughnessesLength(count),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getMetalnessesOffset(count),
    ~length=getMetalnessesLength(count),
  ),
);
