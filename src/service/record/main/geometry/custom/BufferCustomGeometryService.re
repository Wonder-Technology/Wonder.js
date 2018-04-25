open Js.Typed_array;

let getVertexSize = () => 3;

let getVertexLength = (count) => count * getVertexSize();

let getVerticesOffset = (count) => 0;

let getNormalsOffset = (count) =>
  getVerticesOffset(count) + getVertexLength(count) * Float32Array._BYTES_PER_ELEMENT;

let getIndexSize = () => 1;

let getIndicesLength = (count) => count * getIndexSize();

let getIndicesOffset = (count) =>
  getNormalsOffset(count) + getVertexLength(count) * Float32Array._BYTES_PER_ELEMENT;

let getInfoSize = () => 2;

let getVerticesInfosLength = (count) => count * getInfoSize();

let getVerticesInfosOffset = (count) =>
  getIndicesOffset(count) + getIndicesLength(count) * Uint16Array._BYTES_PER_ELEMENT;

let getNormalsInfosLength = (count) => count * getInfoSize();

let getNormalsInfosOffset = (count) =>
  getVerticesInfosOffset(count) + getVerticesInfosLength(count) * Uint8Array._BYTES_PER_ELEMENT;

let getIndicesInfosLength = (count) => count * getInfoSize();

let getIndicesInfosOffset = (count) =>
  getNormalsInfosOffset(count) + getNormalsInfosLength(count) * Uint8Array._BYTES_PER_ELEMENT;

/* let getVertexIndex = (index) => index * getVertexSize(); */
/* let getIndexIndex = (index) => index * getIndexSize(); */
let getInfoIndex = (index) => index * getInfoSize();

let getTotalByteLength = (count) =>
  count
  * (
    Float32Array._BYTES_PER_ELEMENT
    * getVertexSize()
    * 2
    + Uint16Array._BYTES_PER_ELEMENT
    * getIndexSize()
    + Uint8Array._BYTES_PER_ELEMENT
    * (getInfoSize() * 3)
  );

let createBuffer = (count) => Worker.newSharedArrayBuffer(getTotalByteLength(count));