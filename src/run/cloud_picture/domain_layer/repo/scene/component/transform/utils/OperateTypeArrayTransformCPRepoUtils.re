open BufferTransformCPRepoUtils;

let getLocalToWorldMatrixTypeArray = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat16TypeArray(
    getLocalToWorldMatrixIndex(index),
    typeArr,
  );

// let getLocalToWorldMatrix = (index, typeArr) =>
//   TypeArrayCPRepoUtils.getFloat16(getLocalToWorldMatrixIndex(index), typeArr);

let setLocalToWorldMatrix = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat16(
    getLocalToWorldMatrixIndex(index),
    data,
    typeArr,
  );

let getLocalPositionTuple = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat3Tuple(getLocalPositionIndex(index), typeArr);

// let getLocalPositionTypeArray = (index, typeArr) =>
//   TypeArrayCPRepoUtils.getFloat3TypeArray(getLocalPositionIndex(index), typeArr);

let setLocalPosition = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat3(
    getLocalPositionIndex(index),
    data,
    typeArr,
  );

let getLocalRotationTuple = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat4Tuple(getLocalRotationIndex(index), typeArr);

// let getLocalRotationTypeArray = (index, typeArr) =>
//   TypeArrayCPRepoUtils.getFloat4TypeArray(getLocalRotationIndex(index), typeArr);

let setLocalRotation = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat4(
    getLocalRotationIndex(index),
    data,
    typeArr,
  );

let getLocalScaleTuple = (index, typeArr) =>
  TypeArrayCPRepoUtils.getFloat3Tuple(getLocalScaleIndex(index), typeArr);

// let getLocalScaleTypeArray = (index, typeArr) =>
//   TypeArrayCPRepoUtils.getFloat3TypeArray(getLocalScaleIndex(index), typeArr);

let setLocalScale = (index, data, typeArr) =>
  TypeArrayCPRepoUtils.setFloat3(getLocalScaleIndex(index), data, typeArr);
