open WonderComponentWorkerUtils.BufferTransformUtils

let setLocalToWorldMatrix = (index, data, typeArr) =>
  WonderCommonlib.TypeArrayUtils.setFloat16(getLocalToWorldMatrixIndex(index), data, typeArr)

let getLocalPositionTuple = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat3Tuple(getLocalPositionIndex(index), typeArr)

// let getLocalPositionTypeArray = (index, typeArr) =>
//   WonderCommonlib. TypeArrayUtils.getFloat3TypeArray(getLocalPositionIndex(index), typeArr);

let setLocalPosition = (index, data, typeArr) =>
  WonderCommonlib.TypeArrayUtils.setFloat3(getLocalPositionIndex(index), data, typeArr)

let getLocalRotationTuple = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat4Tuple(getLocalRotationIndex(index), typeArr)

// let getLocalRotationTypeArray = (index, typeArr) =>
//   WonderCommonlib. TypeArrayUtils.getFloat4TypeArray(getLocalRotationIndex(index), typeArr);

let setLocalRotation = (index, data, typeArr) =>
  WonderCommonlib.TypeArrayUtils.setFloat4(getLocalRotationIndex(index), data, typeArr)

let getLocalScaleTuple = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat3Tuple(getLocalScaleIndex(index), typeArr)

// let getLocalScaleTypeArray = (index, typeArr) =>
//   WonderCommonlib. TypeArrayUtils.getFloat3TypeArray(getLocalScaleIndex(index), typeArr);

let setLocalScale = (index, data, typeArr) =>
  WonderCommonlib.TypeArrayUtils.setFloat3(getLocalScaleIndex(index), data, typeArr)
