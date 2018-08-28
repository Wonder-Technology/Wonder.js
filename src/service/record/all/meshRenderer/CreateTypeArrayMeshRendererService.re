open Js.Typed_array;

open BufferMeshRendererService;

let createTypeArrays = (buffer, meshRendererCount) => (
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getDrawModesOffset(meshRendererCount),
    ~length=getDrawModesLength(meshRendererCount),
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIsRendersOffset(meshRendererCount),
    ~length=getIsRendersLength(meshRendererCount),
  ),
);