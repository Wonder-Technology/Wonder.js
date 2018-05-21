open Js.Typed_array;

open BufferSourceInstanceService;

let createTypeArrays = (buffer, sourceInstanceCount, objectInstanceCountPerSourceInstance) => (
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=
      getObjectInstanceTransformCollectionsOffset(
        sourceInstanceCount,
        objectInstanceCountPerSourceInstance
      ),
    ~length=
      getObjectInstanceTransformCollectionsLength(
        sourceInstanceCount,
        objectInstanceCountPerSourceInstance
      )
  ),
  Uint8Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIsTransformStaticsOffset(sourceInstanceCount, objectInstanceCountPerSourceInstance),
    ~length=getIsTransformStaticsLength(sourceInstanceCount)
  )
);