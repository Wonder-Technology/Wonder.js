open Js.Typed_array

// let getBufferMaxCount = () => 4;

let getColorsSize = () => 3

let getIntensitiesSize = () => 1

let getColorIndex = index => index * getColorsSize()

let getIntensityIndex = index => index * getIntensitiesSize()

let getColorsOffset = count => 0

let getColorsLength = count => count * getColorsSize()

let getIntensitiesOffset = count =>
  getColorsOffset(count) + getColorsLength(count) * Float32Array._BYTES_PER_ELEMENT

let getIntensitiesLength = count => count * getIntensitiesSize()

let getTotalByteLength = count =>
  count * Float32Array._BYTES_PER_ELEMENT * (getColorsSize() + getIntensitiesSize())

let createBuffer = count =>
  WonderCommonlib.SharedArrayBufferUtils.newSharedArrayBuffer(getTotalByteLength(count))
