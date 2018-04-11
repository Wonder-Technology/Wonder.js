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

let createBuffer = (count) =>
  Worker.newSharedArrayBuffer(
    count
    * (
      Float32Array._BYTES_PER_ELEMENT
      * getVertexSize()
      * 2
      + Uint16Array._BYTES_PER_ELEMENT
      * getIndexSize()
    )
  );