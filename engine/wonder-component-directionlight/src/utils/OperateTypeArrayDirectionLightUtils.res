open WonderComponentWorkerUtils.BufferDirectionLightUtils

let setColor = (index, data, typeArr) =>
  WonderCommonlib.TypeArrayUtils.setFloat3(getColorIndex(index), data, typeArr)

let setIntensity = (index, data, typeArr) =>
  WonderCommonlib.TypeArrayUtils.setFloat1(getIntensityIndex(index), data, typeArr)
