open BufferPBRMaterialUtils

let getDiffuseColor = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat3Tuple(getDiffuseColorIndex(index), typeArr)

let getSpecular = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat1(getSpecularIndex(index), typeArr)

let getSpecularColor = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat3Tuple(getSpecularColorIndex(index), typeArr)

let getRoughness = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat1(getRoughnessIndex(index), typeArr)

let getMetalness = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat1(getMetalnessIndex(index), typeArr)

let getTransmission = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat1(getTransmissionIndex(index), typeArr)

let getIOR = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat1(getIORIndex(index), typeArr)
