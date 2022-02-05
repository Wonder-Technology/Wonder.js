open Js.Typed_array

let getDiffuseColorsSize = () => 3

let getDiffuseColorsLength = count => count * getDiffuseColorsSize()

let getDiffuseColorsOffset = count => 0

let getSpecularsSize = () => 1

let getSpecularsLength = count => count * getSpecularsSize()

let getSpecularsOffset = count =>
  getDiffuseColorsOffset() + getDiffuseColorsLength(count) * Float32Array._BYTES_PER_ELEMENT

let getSpecularColorsSize = () => 3

let getSpecularColorsLength = count => count * getSpecularColorsSize()

let getSpecularColorsOffset = count =>
  getSpecularsOffset(count) + getSpecularsLength(count) * Float32Array._BYTES_PER_ELEMENT

let getRoughnessesSize = () => 1

let getRoughnessesLength = count => count * getRoughnessesSize()

let getRoughnessesOffset = count =>
  getSpecularColorsOffset(count) + getSpecularColorsLength(count) * Float32Array._BYTES_PER_ELEMENT

let getMetalnessesSize = () => 1

let getMetalnessesLength = count => count * getMetalnessesSize()

let getMetalnessesOffset = count =>
  getRoughnessesOffset(count) + getRoughnessesLength(count) * Float32Array._BYTES_PER_ELEMENT

let getTransmissionsSize = () => 1

let getTransmissionsLength = count => count * getTransmissionsSize()

let getTransmissionsOffset = count =>
  getMetalnessesOffset(count) + getMetalnessesLength(count) * Float32Array._BYTES_PER_ELEMENT

let getIORsSize = () => 1

let getIORsLength = count => count * getIORsSize()

let getIORsOffset = count =>
  getTransmissionsOffset(count) + getTransmissionsLength(count) * Float32Array._BYTES_PER_ELEMENT

let getDiffuseColorIndex = index => index * getDiffuseColorsSize()

// let getSpecularIndex = index => index * getSpecularsSize()
let getSpecularIndex = index => index 

let getSpecularColorIndex = index => index * getSpecularColorsSize()

let getRoughnessIndex = index => index * getRoughnessesSize()

let getMetalnessIndex = index => index * getMetalnessesSize()

let getTransmissionIndex = index => index * getTransmissionsSize()

let getIORIndex = index => index * getIORsSize()

let getTotalByteLength = count =>
  count *
  Float32Array._BYTES_PER_ELEMENT *
  (getDiffuseColorsSize() +
  getSpecularsSize() +
  getSpecularColorsSize() +
  getRoughnessesSize() +
  getMetalnessesSize() +
  getTransmissionsSize() +
  getIORsSize())

let createBuffer = count =>
  WonderCommonlib.SharedArrayBufferUtils.newSharedArrayBuffer(getTotalByteLength(count))
