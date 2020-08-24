open BufferTransformRepo;

// let getLocalToWorldMatrixTypeArray = (index, typeArr) =>
//   TypeArrayService.getFloat16TypeArray(
//     getLocalToWorldMatrixIndex(index),
//     typeArr,
//   );


TODO add TypeArray!

let getLocalToWorldMatrix = (index, typeArr) =>
  TypeArray.getFloat16(getLocalToWorldMatrixIndex(index), typeArr);

let setLocalToWorldMatrix = (index, data, typeArr) =>
  TypeArray.setFloat16(
    getLocalToWorldMatrixIndex(index),
    data,
    typeArr,
  );

// let getLocalPositionTuple = (index, typeArr) =>
//   TypeArrayService.getFloat3Tuple(getLocalPositionIndex(index), typeArr);

// let getLocalPositionTypeArray = (index, typeArr) =>
//   TypeArrayService.getFloat3TypeArray(getLocalPositionIndex(index), typeArr);

// let setLocalPosition = (index, data, typeArr) =>
//   TypeArrayService.setFloat3(getLocalPositionIndex(index), data, typeArr);

// let setLocalPositionByTuple = (index, dataTuple, typeArr) =>
//   TypeArrayService.setFloat3ByTuple(
//     getLocalPositionIndex(index),
//     dataTuple,
//     typeArr,
//   );

// let getLocalRotationTuple = (index, typeArr) =>
//   TypeArrayService.getFloat4Tuple(getLocalRotationIndex(index), typeArr);

// let getLocalRotationTypeArray = (index, typeArr) =>
//   TypeArrayService.getFloat4TypeArray(getLocalRotationIndex(index), typeArr);

// let setLocalRotation = (index, data, typeArr) =>
//   TypeArrayService.setFloat4(getLocalRotationIndex(index), data, typeArr);

// let setLocalRotationByTuple = (index, dataTuple, typeArr) =>
//   TypeArrayService.setFloat4ByTuple(
//     getLocalRotationIndex(index),
//     dataTuple,
//     typeArr,
//   );

// let getLocalScaleTuple = (index, typeArr) =>
//   TypeArrayService.getFloat3Tuple(getLocalScaleIndex(index), typeArr);

// let getLocalScaleTypeArray = (index, typeArr) =>
//   TypeArrayService.getFloat3TypeArray(getLocalScaleIndex(index), typeArr);

// let setLocalScale = (index, data, typeArr) =>
//   TypeArrayService.setFloat3(getLocalScaleIndex(index), data, typeArr);

// let setLocalScaleByTuple = (index, dataTuple, typeArr) =>
//   TypeArrayService.setFloat3ByTuple(
//     getLocalScaleIndex(index),
//     dataTuple,
//     typeArr,
//   );
