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

let getVerticesCount = () => 72;

let getNormalsCount = () => 72;

let getIndicesCount = () => 36;

let getVertexIndex = (index) => index * getVertexSize() * getVerticesCount();

let getNormalIndex = (index) => index * getVertexSize() * getNormalsCount();

let getIndexIndex = (index) => index * getIndexSize() * getIndicesCount();