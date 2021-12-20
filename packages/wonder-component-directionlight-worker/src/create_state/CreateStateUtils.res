let createState = (isDebug, directionLightCount, buffer): StateType.state => {
  let (
    colors,
    intensities,
  ) = WonderComponentWorkerUtils.CreateTypeArrayDirectionLightUtils.createTypeArrays(
    buffer,
    directionLightCount,
  )

  {
    config: {
      isDebug: isDebug,
    },
    colors: colors,
    intensities: intensities,
  }
}
