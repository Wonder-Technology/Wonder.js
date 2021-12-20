open Js.Typed_array

let getLocalToWorldMatricesSize = () => 16

let getLocalToWorldMatricesLength = count => count * getLocalToWorldMatricesSize()

let getLocalToWorldMatricesOffset = count => 0

let getLocalPositionsSize = () => 3

let getLocalPositionsLength = count => count * getLocalPositionsSize()

let getLocalPositionsOffset = count =>
  getLocalToWorldMatricesOffset() +
  getLocalToWorldMatricesLength(count) * Float32Array._BYTES_PER_ELEMENT

let getLocalRotationsSize = () => 4

let getLocalRotationsLength = count => count * getLocalRotationsSize()

let getLocalRotationsOffset = count =>
  getLocalPositionsOffset(count) + getLocalPositionsLength(count) * Float32Array._BYTES_PER_ELEMENT

let getLocalScalesSize = () => 3

let getLocalScalesLength = count => count * getLocalScalesSize()

let getLocalScalesOffset = count =>
  getLocalRotationsOffset(count) + getLocalRotationsLength(count) * Float32Array._BYTES_PER_ELEMENT

let getLocalToWorldMatrixIndex = index => index * getLocalToWorldMatricesSize()

let getLocalPositionIndex = index => index * getLocalPositionsSize()

let getLocalRotationIndex = index => index * getLocalRotationsSize()

let getLocalScaleIndex = index => index * getLocalScalesSize()

let getTotalByteLength = count =>
  count *
  Float32Array._BYTES_PER_ELEMENT *
  (getLocalToWorldMatricesSize() +
  getLocalPositionsSize() +
  getLocalRotationsSize() +
  getLocalScalesSize())

let createBuffer = count =>
  WonderCommonlib.SharedArrayBufferUtils.newSharedArrayBuffer(getTotalByteLength(count))
