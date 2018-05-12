open Js.Typed_array;

open BufferCustomGeometryService;

let createTypeArrays = (buffer, customGeometryPointCount, customGeometryCount) => (
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesOffset(customGeometryPointCount),
    ~length=getVertexLength(customGeometryPointCount)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTexCoordsOffset(customGeometryPointCount),
    ~length=getVertexLength(customGeometryPointCount)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getNormalsOffset(customGeometryPointCount),
    ~length=getVertexLength(customGeometryPointCount)
  ),
  Uint16Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIndicesOffset(customGeometryPointCount),
    ~length=getIndicesLength(customGeometryPointCount)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesInfosOffset(customGeometryPointCount),
    ~length=getVerticesInfosLength(customGeometryCount)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=
      getTexCoordsInfosOffset(customGeometryPointCount, customGeometryCount),
    ~length=getTexCoordsInfosLength(customGeometryCount)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=
      getNormalsInfosOffset(customGeometryPointCount, customGeometryCount),
    ~length=getNormalsInfosLength(customGeometryCount)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=
      getIndicesInfosOffset(customGeometryPointCount, customGeometryCount),
    ~length=getIndicesInfosLength(customGeometryCount)
  )
);