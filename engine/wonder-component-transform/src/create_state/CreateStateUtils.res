let _setAllTypeArrDataToDefault = (
  (localToWorldMatrices, localPositions, localRotations, localScales),
  count,
  (defaultLocalToWorldMatrix, defaultLocalPosition, defaultLocalRotation, defaultLocalScale),
) => {
  WonderCommonlib.ListSt.range(0, count - 1)->WonderCommonlib.ListSt.forEach(index => {
    OperateTypeArrayTransformUtils.setLocalToWorldMatrix(
      index,
      defaultLocalToWorldMatrix,
      localToWorldMatrices,
    )
    OperateTypeArrayTransformUtils.setLocalPosition(index, defaultLocalPosition, localPositions)
    OperateTypeArrayTransformUtils.setLocalRotation(index, defaultLocalRotation, localRotations)
    OperateTypeArrayTransformUtils.setLocalScale(index, defaultLocalScale, localScales)
  })

  (localToWorldMatrices, localPositions, localRotations, localScales)
}

let _initBufferData = (count, defaultDataTuple) => {
  let buffer = WonderComponentWorkerUtils.BufferTransformUtils.createBuffer(count)

  let typeArrData =
    WonderComponentWorkerUtils.CreateTypeArrayTransformUtils.createTypeArrays(
      buffer,
      count,
    )->_setAllTypeArrDataToDefault(count, defaultDataTuple)

  (buffer, typeArrData)
}

let createStateWithSharedArrayBufferData = (
  (isDebug, transformCount, float9Array1, float32Array1),
  (defaultLocalToWorldMatrix, defaultLocalPosition, defaultLocalRotation, defaultLocalScale),
  {
    buffer,
    localToWorldMatrices,
    localPositions,
    localRotations,
    localScales,
  }: TransformSharedArrayBufferDataType.transformSharedArrayBufferData,
): StateType.state => {
  {
    config: {
      isDebug: isDebug,
      transformCount: transformCount,
      float9Array1: float9Array1,
      float32Array1: float32Array1,
    },
    maxIndex: 0,
    buffer: buffer,
    localToWorldMatrices: localToWorldMatrices,
    localPositions: localPositions,
    localRotations: localRotations,
    localScales: localScales,
    defaultLocalToWorldMatrix: defaultLocalToWorldMatrix,
    defaultLocalPosition: defaultLocalPosition,
    defaultLocalRotation: defaultLocalRotation,
    defaultLocalScale: defaultLocalScale,
    parentMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(transformCount),
    childrenMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(transformCount),
    gameObjectMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(transformCount),
    gameObjectTransformMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(
      transformCount,
    ),
    dirtyMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(transformCount),
  }
}

let createState = (isDebug, transformCount, float9Array1, float32Array1) => {
  let defaultLocalToWorldMatrix = (1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.)
  let defaultLocalPosition = (0., 0., 0.)
  let defaultLocalRotation = (0., 0., 0., 1.)
  let defaultLocalScale = (1., 1., 1.)

  let (
    buffer,
    (localToWorldMatrices, localPositions, localRotations, localScales),
  ) = _initBufferData(
    transformCount,
    (defaultLocalToWorldMatrix, defaultLocalPosition, defaultLocalRotation, defaultLocalScale),
  )

  createStateWithSharedArrayBufferData(
    (isDebug, transformCount, float9Array1, float32Array1),
    (defaultLocalToWorldMatrix, defaultLocalPosition, defaultLocalRotation, defaultLocalScale),
    {
      buffer: buffer,
      localToWorldMatrices: localToWorldMatrices,
      localPositions: localPositions,
      localRotations: localRotations,
      localScales: localScales,
    },
  )
}
