open Js.Typed_array;

let getVertexSize = () => 3;

let getTexCoordsSize = () => 2;

let getVertexLength = (customGeometryPointDataBufferCount) =>
  customGeometryPointDataBufferCount * getVertexSize();

let getTexCoordsLength = (customGeometryPointDataBufferCount) =>
  customGeometryPointDataBufferCount * getTexCoordsSize();

let getVerticesOffset = (customGeometryPointDataBufferCount) => 0;

let getTexCoordsOffset = (customGeometryPointDataBufferCount) =>
  getVerticesOffset(customGeometryPointDataBufferCount)
  + getVertexLength(customGeometryPointDataBufferCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getNormalsOffset = (customGeometryPointDataBufferCount) =>
  getTexCoordsOffset(customGeometryPointDataBufferCount)
  + getTexCoordsLength(customGeometryPointDataBufferCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getIndexSize = () => 1;

let getIndicesLength = (customGeometryPointDataBufferCount) =>
  customGeometryPointDataBufferCount * getIndexSize();

let getIndicesOffset = (customGeometryPointDataBufferCount) =>
  getNormalsOffset(customGeometryPointDataBufferCount)
  + getVertexLength(customGeometryPointDataBufferCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getInfoSize = () => 2;

let getVerticesInfosLength = (customGeometryDataBufferCount) =>
  customGeometryDataBufferCount * getInfoSize();

let getVerticesInfosOffset = (customGeometryPointDataBufferCount) =>
  getIndicesOffset(customGeometryPointDataBufferCount)
  + getIndicesLength(customGeometryPointDataBufferCount)
  * Uint16Array._BYTES_PER_ELEMENT;

let getTexCoordsInfosLength = (customGeometryDataBufferCount) =>
  customGeometryDataBufferCount * getInfoSize();

let getTexCoordsInfosOffset = (customGeometryPointDataBufferCount, customGeometryDataBufferCount) =>
  getVerticesInfosOffset(customGeometryPointDataBufferCount)
  + getVerticesInfosLength(customGeometryDataBufferCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getNormalsInfosLength = (customGeometryDataBufferCount) =>
  customGeometryDataBufferCount * getInfoSize();

let getNormalsInfosOffset = (customGeometryPointDataBufferCount, customGeometryDataBufferCount) =>
  getTexCoordsInfosOffset(customGeometryPointDataBufferCount, customGeometryDataBufferCount)
  + getTexCoordsInfosLength(customGeometryDataBufferCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getIndicesInfosLength = (customGeometryDataBufferCount) =>
  customGeometryDataBufferCount * getInfoSize();

let getIndicesInfosOffset = (customGeometryPointDataBufferCount, customGeometryDataBufferCount) =>
  getNormalsInfosOffset(customGeometryPointDataBufferCount, customGeometryDataBufferCount)
  + getNormalsInfosLength(customGeometryDataBufferCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getVertexIndex = (index) => index * getVertexSize();

let getTexCoordIndex = (index) => index * getTexCoordsSize();

let getIndexIndex = (index) => index * getIndexSize();

let getInfoIndex = (index) => index * getInfoSize();

let getTotalByteLength = (customGeometryPointDataBufferCount, customGeometryDataBufferCount) =>
  customGeometryPointDataBufferCount
  * (
    Float32Array._BYTES_PER_ELEMENT
    * getVertexSize()
    * 2
    + Float32Array._BYTES_PER_ELEMENT
    * getTexCoordsSize()
    + Uint16Array._BYTES_PER_ELEMENT
    * getIndexSize()
  )
  + customGeometryDataBufferCount
  * Uint32Array._BYTES_PER_ELEMENT
  * (getInfoSize() * 4);

let createBuffer = (customGeometryPointDataBufferCount, customGeometryDataBufferCount) =>
  Worker.newSharedArrayBuffer(
    getTotalByteLength(customGeometryPointDataBufferCount, customGeometryDataBufferCount)
  );