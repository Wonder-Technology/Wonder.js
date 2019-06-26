open Js.Typed_array;

open BufferGeometryService;

let createTypeArrays = (buffer, geometryPointCount, geometryCount) => (
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesOffset(geometryPointCount),
    ~length=getVertexLength(geometryPointCount),
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTexCoordsOffset(geometryPointCount),
    ~length=getTexCoordsLength(geometryPointCount),
  ),
  Float32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getNormalsOffset(geometryPointCount),
    ~length=getVertexLength(geometryPointCount),
  ),
  Uint16Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIndicesOffset(geometryPointCount),
    ~length=getIndicesLength(geometryPointCount),
  ),
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIndices32Offset(geometryPointCount),
    ~length=getIndices32Length(geometryPointCount),
  ),
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesInfosOffset(geometryPointCount),
    ~length=getVerticesInfosLength(geometryCount),
  ),
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTexCoordsInfosOffset(geometryPointCount, geometryCount),
    ~length=getTexCoordsInfosLength(geometryCount),
  ),
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getNormalsInfosOffset(geometryPointCount, geometryCount),
    ~length=getNormalsInfosLength(geometryCount),
  ),
  Uint32Array.fromBufferRange(
    WorkerType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIndicesInfosOffset(geometryPointCount, geometryCount),
    ~length=getIndicesInfosLength(geometryCount),
  ),
);