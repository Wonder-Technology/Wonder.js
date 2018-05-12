open Js.Typed_array;

let getVertexSize = () => 3;

let getTexCoordsSize = () => 2;

let getVertexLength = (customGeometryPointCount) =>
  customGeometryPointCount * getVertexSize();

let getTexCoordsLength = (customGeometryPointCount) =>
  customGeometryPointCount * getTexCoordsSize();

let getVerticesOffset = (customGeometryPointCount) => 0;

let getTexCoordsOffset = (customGeometryPointCount) =>
  getVerticesOffset(customGeometryPointCount)
  + getVertexLength(customGeometryPointCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getNormalsOffset = (customGeometryPointCount) =>
  getTexCoordsOffset(customGeometryPointCount)
  + getTexCoordsLength(customGeometryPointCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getIndexSize = () => 1;

let getIndicesLength = (customGeometryPointCount) =>
  customGeometryPointCount * getIndexSize();

let getIndicesOffset = (customGeometryPointCount) =>
  getNormalsOffset(customGeometryPointCount)
  + getVertexLength(customGeometryPointCount)
  * Float32Array._BYTES_PER_ELEMENT;

let getInfoSize = () => 2;

let getVerticesInfosLength = (customGeometryCount) =>
  customGeometryCount * getInfoSize();

let getVerticesInfosOffset = (customGeometryPointCount) =>
  getIndicesOffset(customGeometryPointCount)
  + getIndicesLength(customGeometryPointCount)
  * Uint16Array._BYTES_PER_ELEMENT;

let getTexCoordsInfosLength = (customGeometryCount) =>
  customGeometryCount * getInfoSize();

let getTexCoordsInfosOffset = (customGeometryPointCount, customGeometryCount) =>
  getVerticesInfosOffset(customGeometryPointCount)
  + getVerticesInfosLength(customGeometryCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getNormalsInfosLength = (customGeometryCount) =>
  customGeometryCount * getInfoSize();

let getNormalsInfosOffset = (customGeometryPointCount, customGeometryCount) =>
  getTexCoordsInfosOffset(customGeometryPointCount, customGeometryCount)
  + getTexCoordsInfosLength(customGeometryCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getIndicesInfosLength = (customGeometryCount) =>
  customGeometryCount * getInfoSize();

let getIndicesInfosOffset = (customGeometryPointCount, customGeometryCount) =>
  getNormalsInfosOffset(customGeometryPointCount, customGeometryCount)
  + getNormalsInfosLength(customGeometryCount)
  * Uint32Array._BYTES_PER_ELEMENT;

let getVertexIndex = (index) => index * getVertexSize();

let getTexCoordIndex = (index) => index * getTexCoordsSize();

let getIndexIndex = (index) => index * getIndexSize();

let getInfoIndex = (index) => index * getInfoSize();

let getTotalByteLength = (customGeometryPointCount, customGeometryCount) =>
  customGeometryPointCount
  * (
    Float32Array._BYTES_PER_ELEMENT
    * getVertexSize()
    * 2
    + Float32Array._BYTES_PER_ELEMENT
    * getTexCoordsSize()
    + Uint16Array._BYTES_PER_ELEMENT
    * getIndexSize()
  )
  + customGeometryCount
  * Uint32Array._BYTES_PER_ELEMENT
  * (getInfoSize() * 4);

let createBuffer = (customGeometryPointCount, customGeometryCount) =>
  Worker.newSharedArrayBuffer(
    getTotalByteLength(customGeometryPointCount, customGeometryCount)
  );