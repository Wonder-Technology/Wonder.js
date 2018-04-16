open Js.Typed_array;

let getBufferMaxCount = () => 4;

let getColorsSize = () => 3;

let getIntensitiesSize = () => 1;

let getColorIndex = (index) => index * getColorsSize();

let getIntensityIndex = (index) => index * getIntensitiesSize();

let getColorsOffset = () => 0;

let getColorsLength = () => getBufferMaxCount() * getColorsSize();

let getIntensitiesOffset = () => getColorsLength() * Float32Array._BYTES_PER_ELEMENT;

let getIntensitiesLength = () => getBufferMaxCount() * getIntensitiesSize();

let getTotalByteLength = (count) =>
  count * Float32Array._BYTES_PER_ELEMENT * (getColorsSize() + getIntensitiesSize());

let createBuffer = (count) => Worker.newSharedArrayBuffer(getTotalByteLength(count));