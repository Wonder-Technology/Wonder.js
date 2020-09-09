open Js.Typed_array;

open BufferGeometryCPRepoUtils;

let createTypeArrays = (buffer, geometryPointCount, geometryCount) => (
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesOffset(geometryPointCount),
    ~length=getVertexLength(geometryPointCount),
  ),
  Float32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getNormalsOffset(geometryPointCount),
    ~length=getVertexLength(geometryPointCount),
  ),
  Uint32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIndicesOffset(geometryPointCount),
    ~length=getIndicesLength(geometryPointCount),
  ),
  Uint32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesInfosOffset(geometryPointCount),
    ~length=getVerticesInfosLength(geometryCount),
  ),
  Uint32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getNormalsInfosOffset(geometryPointCount, geometryCount),
    ~length=getNormalsInfosLength(geometryCount),
  ),
  Uint32Array.fromBufferRange(
    SharedArrayBufferCPPOType.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIndicesInfosOffset(geometryPointCount, geometryCount),
    ~length=getIndicesInfosLength(geometryCount),
  ),
);
