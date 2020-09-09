open Js.Typed_array;

let getDiffuseColorsSize = () => 3;

let getDiffuseColorsLength = count => count * getDiffuseColorsSize();

let getDiffuseColorsOffset = count => 0;

let getSpecularsSize = () => 1;

let getSpecularsLength = count => count * getSpecularsSize();

let getSpecularsOffset = count =>
  getDiffuseColorsOffset()
  + getDiffuseColorsLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getRoughnessesSize = () => 1;

let getRoughnessesLength = count => count * getRoughnessesSize();

let getRoughnessesOffset = count =>
  getSpecularsOffset(count)
  + getSpecularsLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getMetalnessesSize = () => 1;

let getMetalnessesLength = count => count * getMetalnessesSize();

let getMetalnessesOffset = count =>
  getRoughnessesOffset(count)
  + getRoughnessesLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getDiffuseColorIndex = index => index * getDiffuseColorsSize();

let getSpecularIndex = index => index * getSpecularsSize();

let getRoughnessIndex = index => index * getRoughnessesSize();

let getMetalnessIndex = index => index * getMetalnessesSize();

let getTotalByteLength = count =>
  count
  * Float32Array._BYTES_PER_ELEMENT
  * (
    getDiffuseColorsSize()
    + getSpecularsSize()
    + getRoughnessesSize()
    + getMetalnessesSize()
  );

let createBuffer = count =>
  SharedArrayBufferCPRepoUtils.newSharedArrayBuffer(
    getTotalByteLength(count),
  );
