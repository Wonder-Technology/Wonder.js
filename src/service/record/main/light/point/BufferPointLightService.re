open Js.Typed_array;

let getBufferMaxCount = () => 4;

let getColorsSize = () => 3;

let getIntensitiesSize = () => 1;

let getConstantsSize = () => 1;

let getLinearsSize = () => 1;

let getQuadraticsSize = () => 1;

let getRangesSize = () => 1;

let getColorIndex = index => index * getColorsSize();

let getIntensityIndex = index => index * getIntensitiesSize();

let getConstantIndex = index => index * getConstantsSize();

let getLinearIndex = index => index * getLinearsSize();

let getQuadraticIndex = index => index * getQuadraticsSize();

let getRangeIndex = index => index * getRangesSize();

let getColorsOffset = count => 0;

let getColorsLength = count => count * getColorsSize();

let getIntensitiesOffset = count =>
  getColorsLength(count) * Float32Array._BYTES_PER_ELEMENT;

let getIntensitiesLength = count => count * getIntensitiesSize();

let getConstantsOffset = count =>
  getIntensitiesOffset(count)
  + getIntensitiesLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getConstantsLength = count => count * getConstantsSize();

let getLinearsOffset = count =>
  getConstantsOffset(count)
  + getConstantsLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getLinearsLength = count => count * getLinearsSize();

let getQuadraticsOffset = count =>
  getLinearsOffset(count)
  + getLinearsLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getQuadraticsLength = count => count * getQuadraticsSize();

let getRangesOffset = count =>
  getQuadraticsOffset(count)
  + getQuadraticsLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getRangesLength = count => count * getRangesSize();

let getTotalByteLength = count =>
  count
  * Float32Array._BYTES_PER_ELEMENT
  * (
    getColorsSize()
    + getIntensitiesSize()
    + getConstantsSize()
    + getLinearsSize()
    + getQuadraticsSize()
    + getRangesSize()
  );

let createBuffer = count =>
  Worker.newSharedArrayBuffer(getTotalByteLength(count));