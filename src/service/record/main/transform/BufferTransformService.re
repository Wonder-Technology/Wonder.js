open Js.Typed_array;

let getLocalToWorldMatricesSize = () => 16;

let getLocalToWorldMatricesLength = count =>
  count * getLocalToWorldMatricesSize();

let getLocalToWorldMatricesOffset = count => 0;

let getLocalPositionsSize = () => 3;

let getLocalPositionsLength = count => count * getLocalPositionsSize();

let getLocalPositionsOffset = count =>
  getLocalToWorldMatricesOffset()
  + getLocalToWorldMatricesLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getLocalRotationsSize = () => 4;

let getLocalRotationsLength = count => count * getLocalRotationsSize();

let getLocalRotationsOffset = count =>
  getLocalPositionsOffset(count)
  + getLocalPositionsLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getLocalScalesSize = () => 3;

let getLocalScalesLength = count => count * getLocalScalesSize();

let getLocalScalesOffset = count =>
  getLocalRotationsOffset(count)
  + getLocalRotationsLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getCopiedLocalToWorldMatricesForRestoreLength = count =>
  count * getLocalToWorldMatricesSize();

let getCopiedLocalToWorldMatricesForRestoreOffset = count =>
  getLocalScalesOffset(count)
  + getLocalScalesLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getCopiedLocalPositionsForRestoreLength = count =>
  count * getLocalPositionsSize();

let getCopiedLocalPositionsForRestoreOffset = count =>
  getCopiedLocalToWorldMatricesForRestoreOffset(count)
  + getCopiedLocalToWorldMatricesForRestoreLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getCopiedLocalRotationsForRestoreLength = count =>
  count * getLocalRotationsSize();

let getCopiedLocalRotationsForRestoreOffset = count =>
  getCopiedLocalPositionsForRestoreOffset(count)
  + getCopiedLocalPositionsForRestoreLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getCopiedLocalScalesForRestoreLength = count =>
  count * getLocalScalesSize();

let getCopiedLocalScalesForRestoreOffset = count =>
  getCopiedLocalRotationsForRestoreOffset(count)
  + getCopiedLocalRotationsForRestoreLength(count)
  * Float32Array._BYTES_PER_ELEMENT;

let getLocalToWorldMatrixIndex = index =>
  index * getLocalToWorldMatricesSize();

let getLocalPositionIndex = index => index * getLocalPositionsSize();

let getLocalRotationIndex = index => index * getLocalRotationsSize();

let getLocalScaleIndex = index => index * getLocalScalesSize();

let getTotalByteLength = count =>
  count
  * Float32Array._BYTES_PER_ELEMENT
  * (
    getLocalToWorldMatricesSize()
    + getLocalPositionsSize()
    + getLocalRotationsSize()
    + getLocalScalesSize()
  )
  * 2;

let createBuffer = count =>
  Worker.newSharedArrayBuffer(getTotalByteLength(count));

let getTotalByteLengthForCopiedBuffer = count =>
  count
  * Float32Array._BYTES_PER_ELEMENT
  * (
    getLocalToWorldMatricesSize()
    + getLocalPositionsSize()
    + getLocalRotationsSize()
    + getLocalScalesSize()
  );

let createCopiedBuffer = count =>
  Worker.newSharedArrayBuffer(getTotalByteLengthForCopiedBuffer(count));