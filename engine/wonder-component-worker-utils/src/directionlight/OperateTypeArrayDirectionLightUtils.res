open BufferDirectionLightUtils

let getColor = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat3Tuple(getColorIndex(index), typeArr)

let getIntensity = (index, typeArr) =>
  WonderCommonlib.TypeArrayUtils.getFloat1(getIntensityIndex(index), typeArr)
