open Js.Typed_array;

let getBufferMaxCount = () => 3;

let getColorsSize = () => 3;

let getColorIndex = (index) => index * getColorsSize();

let getTotalByteLength = (count) => count * Float32Array._BYTES_PER_ELEMENT * getColorsSize();

let createBuffer = (count) => Worker.newSharedArrayBuffer(getTotalByteLength(count));