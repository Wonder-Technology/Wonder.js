open Js.Typed_array;

let getVertexSize = () => 3;

let getTexCoordsSize = () => 2;

let getVertexLength = geometryPointCount =>
  geometryPointCount * getVertexSize();

// let getTexCoordsLength = geometryPointCount =>
//   geometryPointCount * getTexCoordsSize();

let getVerticesOffset = geometryPointCount => 0;

// let getTexCoordsOffset = geometryPointCount =>
// getVerticesOffset(geometryPointCount)
// + getVertexLength(geometryPointCount)
// * Float32Array._BYTES_PER_ELEMENT;

let getNormalsOffset = geometryPointCount =>
  getVerticesOffset(geometryPointCount)
  + getVertexLength(geometryPointCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getIndexSize = () => 1;

let getIndicesLength = geometryPointCount =>
  geometryPointCount * getIndexSize();

let getIndicesOffset = geometryPointCount =>
  getNormalsOffset(geometryPointCount)
  + getVertexLength(geometryPointCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getInfoSize = () => 2;

let getVerticesInfosLength = geometryCount => geometryCount * getInfoSize();

let getVerticesInfosOffset = geometryPointCount =>
  getIndicesOffset(geometryPointCount)
  + getIndicesLength(geometryPointCount)
  * Uint32Array._BYTES_PER_ELEMENT;

// let getTexCoordsInfosLength = geometryCount => geometryCount * getInfoSize();

// let getTexCoordsInfosOffset = (geometryPointCount, geometryCount) =>
//   getVerticesInfosOffset(geometryPointCount)
//   + getVerticesInfosLength(geometryCount)
//   * Uint32Array._BYTES_PER_ELEMENT;

let getNormalsInfosLength = geometryCount => geometryCount * getInfoSize();

let getNormalsInfosOffset = (geometryPointCount, geometryCount) =>
  getVerticesInfosOffset(geometryPointCount)
  + getVerticesInfosLength(geometryCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getIndicesInfosLength = geometryCount => geometryCount * getInfoSize();

let getIndicesInfosOffset = (geometryPointCount, geometryCount) =>
  getNormalsInfosOffset(geometryPointCount, geometryCount)
  + getNormalsInfosLength(geometryCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getVertexIndex = index => index * getVertexSize();

// let getTexCoordIndex = index => index * getTexCoordsSize();

let getIndexIndex = index => index * getIndexSize();

let getInfoIndex = index => index * getInfoSize();

let getTotalByteLength = (geometryPointCount, geometryCount) =>
  geometryPointCount
  * (
    Float32Array._BYTES_PER_ELEMENT
    * getVertexSize()
    * 2
    // + Float32Array._BYTES_PER_ELEMENT
    // * getTexCoordsSize()
    // + Uint16Array._BYTES_PER_ELEMENT
    // * getIndexSize()
    + Uint32Array._BYTES_PER_ELEMENT
    * getIndexSize()
  )
  + geometryCount
  * Uint32Array._BYTES_PER_ELEMENT
  * (getInfoSize() * 3);

let createBuffer = (geometryPointCount, geometryCount) =>
  SharedArrayBufferCPRepoUtils.newSharedArrayBuffer(
    getTotalByteLength(geometryPointCount, geometryCount),
  );
