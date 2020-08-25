open BufferTransformRepoUtils;

// let getLocalToWorldMatrixTypeArray = (index, typeArr) =>
//   TypeArrayRepoUtils.getFloat16TypeArray(
//     getLocalToWorldMatrixIndex(index),
//     typeArr,
//   );

// let getLocalToWorldMatrix = (index, typeArr) =>
//   TypeArrayRepoUtils.getFloat16(getLocalToWorldMatrixIndex(index), typeArr);

let setLocalToWorldMatrix = (index, data, typeArr) =>
  TypeArrayRepoUtils.setFloat16(
    getLocalToWorldMatrixIndex(index),
    data,
    typeArr,
  );

// let getLocalPositionTuple = (index, typeArr) =>
//   TypeArrayRepoUtils.getFloat3Tuple(getLocalPositionIndex(index), typeArr);

// let getLocalPositionTypeArray = (index, typeArr) =>
//   TypeArrayRepoUtils.getFloat3TypeArray(getLocalPositionIndex(index), typeArr);

let setLocalPosition = (index, data, typeArr) =>
  TypeArrayRepoUtils.setFloat3(getLocalPositionIndex(index), data, typeArr);

// let setLocalPositionByTuple = (index, dataTuple, typeArr) =>
//   TypeArrayRepoUtils.setFloat3ByTuple(
//     getLocalPositionIndex(index),
//     dataTuple,
//     typeArr,
//   );

// let getLocalRotationTuple = (index, typeArr) =>
//   TypeArrayRepoUtils.getFloat4Tuple(getLocalRotationIndex(index), typeArr);

// let getLocalRotationTypeArray = (index, typeArr) =>
//   TypeArrayRepoUtils.getFloat4TypeArray(getLocalRotationIndex(index), typeArr);

let setLocalRotation = (index, data, typeArr) =>
  TypeArrayRepoUtils.setFloat4(getLocalRotationIndex(index), data, typeArr);

// let setLocalRotationByTuple = (index, dataTuple, typeArr) =>
//   TypeArrayRepoUtils.setFloat4ByTuple(
//     getLocalRotationIndex(index),
//     dataTuple,
//     typeArr,
//   );

// let getLocalScaleTuple = (index, typeArr) =>
//   TypeArrayRepoUtils.getFloat3Tuple(getLocalScaleIndex(index), typeArr);

// let getLocalScaleTypeArray = (index, typeArr) =>
//   TypeArrayRepoUtils.getFloat3TypeArray(getLocalScaleIndex(index), typeArr);

let setLocalScale = (index, data, typeArr) =>
  TypeArrayRepoUtils.setFloat3(getLocalScaleIndex(index), data, typeArr);

// let setLocalScaleByTuple = (index, dataTuple, typeArr) =>
//   TypeArrayRepoUtils.setFloat3ByTuple(
//     getLocalScaleIndex(index),
//     dataTuple,
//     typeArr,
//   );
