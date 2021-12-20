let _setAllTypeArrDataToDefault = (
  (colors, intensities),
  count,
  (defaultColor, defaultIntensity),
) => {
  WonderCommonlib.ListSt.range(0, count - 1)->WonderCommonlib.ListSt.forEach(index => {
    OperateTypeArrayDirectionLightUtils.setColor(index, defaultColor, colors)
    OperateTypeArrayDirectionLightUtils.setIntensity(index, defaultIntensity, intensities)
  })

  (colors, intensities)
}

let _initBufferData = (count, defaultDataTuple) => {
  let buffer = WonderComponentWorkerUtils.BufferDirectionLightUtils.createBuffer(count)

  let typeArrData =
    WonderComponentWorkerUtils.CreateTypeArrayDirectionLightUtils.createTypeArrays(
      buffer,
      count,
    )->_setAllTypeArrDataToDefault(count, defaultDataTuple)

  (buffer, typeArrData)
}

let createStateWithSharedArrayBufferData = (
  (isDebug, lightCount),
  {
    buffer,
    colors,
    intensities,
  }: DirectionLightSharedArrayBufferDataType.directionLightSharedArrayBufferData,
): StateType.state => {
  {
    config: {
      isDebug: isDebug,
      directionLightCount: lightCount,
    },
    maxIndex: 0,
    buffer: buffer,
    colors: colors,
    intensities: intensities,
    gameObjectMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(lightCount),
    gameObjectDirectionLightMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(
      lightCount,
    ),
  }
}

let createState = (isDebug, lightCount) => {
  let defaultColor = (1., 1., 1.)
  let defaultIntensity = 1.0

  let (buffer, (colors, intensities)) = _initBufferData(
    lightCount,
    (defaultColor, defaultIntensity),
  )

  createStateWithSharedArrayBufferData(
    (isDebug, lightCount),
    {
      buffer: buffer,
      colors: colors,
      intensities: intensities,
    },
  )
}
