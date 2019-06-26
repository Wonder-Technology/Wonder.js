open Js.Typed_array;

open BufferPointLightService;

let createTypeArrays = (buffer, count) => (
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getColorsOffset(count),
    ~length=getColorsLength(count)
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIntensitiesOffset(count),
    ~length=getIntensitiesLength(count)
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getConstantsOffset(count),
    ~length=getConstantsLength(count)
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getLinearsOffset(count),
    ~length=getLinearsLength(count)
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getQuadraticsOffset(count),
    ~length=getQuadraticsLength(count)
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getRangesOffset(count),
    ~length=getRangesLength(count)
  )
);