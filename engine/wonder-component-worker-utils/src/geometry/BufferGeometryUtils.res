open Js.Typed_array

let getVertexSize = () => 3

let getTexCoordsSize = () => 2

let getVertexLength = geometryPointCount => geometryPointCount * getVertexSize()

let getTexCoordsLength = geometryPointCount => geometryPointCount * getTexCoordsSize()

let getVerticesOffset = geometryPointCount => 0

let getTexCoordsOffset = geometryPointCount =>
  getVerticesOffset(geometryPointCount) +
  getVertexLength(geometryPointCount) * Float32Array._BYTES_PER_ELEMENT

let getNormalsOffset = geometryPointCount =>
  getTexCoordsOffset(geometryPointCount) +
  getTexCoordsLength(geometryPointCount) * Float32Array._BYTES_PER_ELEMENT

let getTangentsOffset = geometryPointCount =>
  getNormalsOffset(geometryPointCount) +
  getVertexLength(geometryPointCount) * Float32Array._BYTES_PER_ELEMENT

let getIndexSize = () => 1

let getIndicesLength = geometryPointCount => (3 + (geometryPointCount - 3) * 3) * getIndexSize()

let getIndicesOffset = geometryPointCount =>
  getTangentsOffset(geometryPointCount) +
  getVertexLength(geometryPointCount) * Uint32Array._BYTES_PER_ELEMENT

let getInfoSize = () => 2

let getVerticesInfosLength = geometryCount => geometryCount * getInfoSize()

let getVerticesInfosOffset = geometryPointCount =>
  getIndicesOffset(geometryPointCount) +
  getIndicesLength(geometryPointCount) * Uint32Array._BYTES_PER_ELEMENT

let getTexCoordsInfosLength = geometryCount => geometryCount * getInfoSize()

let getTexCoordsInfosOffset = (geometryPointCount, geometryCount) =>
  getVerticesInfosOffset(geometryPointCount) +
  getVerticesInfosLength(geometryCount) * Uint32Array._BYTES_PER_ELEMENT

let getNormalsInfosLength = geometryCount => geometryCount * getInfoSize()

let getNormalsInfosOffset = (geometryPointCount, geometryCount) =>
  getTexCoordsInfosOffset(geometryPointCount, geometryCount) +
  getTexCoordsInfosLength(geometryCount) * Uint32Array._BYTES_PER_ELEMENT

let getTangentsInfosLength = geometryCount => geometryCount * getInfoSize()

let getTangentsInfosOffset = (geometryPointCount, geometryCount) =>
  getNormalsInfosOffset(geometryPointCount, geometryCount) +
  getNormalsInfosLength(geometryCount) * Uint32Array._BYTES_PER_ELEMENT

let getIndicesInfosLength = geometryCount => geometryCount * getInfoSize()

let getIndicesInfosOffset = (geometryPointCount, geometryCount) =>
  getTangentsInfosOffset(geometryPointCount, geometryCount) +
  getIndicesInfosLength(geometryCount) * Uint32Array._BYTES_PER_ELEMENT

let getVertexIndex = index => index * getVertexSize()

let getTexCoordIndex = index => index * getTexCoordsSize()

let getIndexIndex = index => index * getIndexSize()

let getInfoIndex = index => index * getInfoSize()

let getTotalByteLength = (geometryPointCount, geometryCount) =>
  geometryPointCount *
  (Float32Array._BYTES_PER_ELEMENT * getVertexSize() * 3 +
    Float32Array._BYTES_PER_ELEMENT * getTexCoordsSize()) +
  getIndicesLength(geometryPointCount) * Uint32Array._BYTES_PER_ELEMENT +
  geometryCount * Uint32Array._BYTES_PER_ELEMENT * (getInfoSize() * 5)

let createBuffer = (geometryPointCount, geometryCount) =>
  WonderCommonlib.SharedArrayBufferUtils.newSharedArrayBuffer(
    getTotalByteLength(geometryPointCount, geometryCount),
  )
