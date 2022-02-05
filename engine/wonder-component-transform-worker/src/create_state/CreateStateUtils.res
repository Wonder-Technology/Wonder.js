let createState = (isDebug, transformCount, buffer): StateType.state => {
  let (
    localToWorldMatrices,
    _,
    _,
    _,
  ) = WonderComponentWorkerUtils.CreateTypeArrayTransformUtils.createTypeArrays(
    buffer,
    transformCount,
  )

  {
    config: {
      isDebug: isDebug,
    },
    localToWorldMatrices: localToWorldMatrices,
  }
}
