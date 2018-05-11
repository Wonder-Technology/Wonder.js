open Js.Typed_array;

open BufferCustomGeometryService;

let createTypeArrays = (buffer, customGeometryPointDataBufferCount, customGeometryDataBufferCount) => (
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesOffset(customGeometryPointDataBufferCount),
    ~length=getVertexLength(customGeometryPointDataBufferCount)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getTexCoordsOffset(customGeometryPointDataBufferCount),
    ~length=getVertexLength(customGeometryPointDataBufferCount)
  ),
  Float32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getNormalsOffset(customGeometryPointDataBufferCount),
    ~length=getVertexLength(customGeometryPointDataBufferCount)
  ),
  Uint16Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getIndicesOffset(customGeometryPointDataBufferCount),
    ~length=getIndicesLength(customGeometryPointDataBufferCount)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=getVerticesInfosOffset(customGeometryPointDataBufferCount),
    ~length=getVerticesInfosLength(customGeometryDataBufferCount)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=
      getTexCoordsInfosOffset(customGeometryPointDataBufferCount, customGeometryDataBufferCount),
    ~length=getTexCoordsInfosLength(customGeometryDataBufferCount)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=
      getNormalsInfosOffset(customGeometryPointDataBufferCount, customGeometryDataBufferCount),
    ~length=getNormalsInfosLength(customGeometryDataBufferCount)
  ),
  Uint32Array.fromBufferRange(
    Worker.sharedArrayBufferToArrayBuffer(buffer),
    ~offset=
      getIndicesInfosOffset(customGeometryPointDataBufferCount, customGeometryDataBufferCount),
    ~length=getIndicesInfosLength(customGeometryDataBufferCount)
  )
);