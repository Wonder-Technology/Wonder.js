open BufferTransformUtils

let getLocalToWorldMatrixTypeArray = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat16TypeArray(getLocalToWorldMatrixIndex(index), typeArr)
