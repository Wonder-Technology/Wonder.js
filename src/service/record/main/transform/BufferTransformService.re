open Js.Typed_array;

let getLocalToWorldMatricesSize = () => 16;

let getLocalToWorldMatricesLength = (count) => count * getLocalToWorldMatricesSize();

let getLocalToWorldMatricesOffset = (count) => 0;

let getLocalPositionsSize = () => 3;

let getLocalPositionsLength = (count) => count * getLocalPositionsSize();

let getLocalPositionsOffset = (count) =>
  getLocalToWorldMatricesLength(count) * Float32Array._BYTES_PER_ELEMENT;

let getLocalToWorldMatrixIndex = (index) => index * getLocalToWorldMatricesSize();

let getLocalPositionIndex = (index) => index * getLocalPositionsSize();

let createBuffer = (count) =>
  Worker.newSharedArrayBuffer(
    count
    * Float32Array._BYTES_PER_ELEMENT
    * (getLocalPositionsSize() + getLocalToWorldMatricesSize())
  );