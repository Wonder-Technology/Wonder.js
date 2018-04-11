open Js.Typed_array;

let getBufferMaxCount = () => 4;

let getColorsSize = () => 3;

let getIntensitiesSize = () => 1;

let getConstantsSize = () => 1;

let getLinearsSize = () => 1;

let getQuadraticsSize = () => 1;

let getRangesSize = () => 1;

let getColorIndex = (index) => index * getColorsSize();

let getColorsOffset = () => 0;

let getColorsLength = () => getBufferMaxCount() * getColorsSize();

let getIntensitiesOffset = () => getColorsLength() * Float32Array._BYTES_PER_ELEMENT;

let getIntensitiesLength = () => getBufferMaxCount() * getIntensitiesSize();

let getConstantsOffset = () =>
  getIntensitiesOffset() + getIntensitiesLength() * Float32Array._BYTES_PER_ELEMENT;

let getConstantsLength = () => getBufferMaxCount() * getConstantsSize();

let getLinearsOffset = () =>
  getConstantsOffset() + getConstantsLength() * Float32Array._BYTES_PER_ELEMENT;

let getLinearsLength = () => getBufferMaxCount() * getLinearsSize();

let getQuadraticsOffset = () =>
  getLinearsOffset() + getLinearsLength() * Float32Array._BYTES_PER_ELEMENT;

let getQuadraticsLength = () => getBufferMaxCount() * getQuadraticsSize();

let getRangesOffset = () =>
  getQuadraticsOffset() + getQuadraticsLength() * Float32Array._BYTES_PER_ELEMENT;

let getRangesLength = () => getBufferMaxCount() * getRangesSize();

let createBuffer = (count) =>
  Worker.newSharedArrayBuffer(
    count
    * Float32Array._BYTES_PER_ELEMENT
    * (
      getColorsSize()
      + getIntensitiesSize()
      + getConstantsSize()
      + getLinearsSize()
      + getQuadraticsSize()
      + getRangesSize()
    )
  );