let _setAllTypeArrDataToDefault = (
  (diffuseColors, speculars, specularColors, roughnesses, metalnesses, transmissions, iors),
  count,
  (
    defaultDiffuseColor,
    defaultSpecular,
    defaultSpecularColor,
    defaultRoughness,
    defaultMetalness,
    defaultTransmission,
    defaultIOR,
  ),
) => {
  WonderCommonlib.ListSt.range(0, count - 1)->WonderCommonlib.ListSt.forEach(index => {
    OperateTypeArrayPBRMaterialUtils.setDiffuseColor(index, defaultDiffuseColor, diffuseColors)
    OperateTypeArrayPBRMaterialUtils.setSpecular(index, defaultSpecular, speculars)
    OperateTypeArrayPBRMaterialUtils.setSpecularColor(index, defaultSpecularColor, specularColors)
    OperateTypeArrayPBRMaterialUtils.setRoughness(index, defaultRoughness, roughnesses)
    OperateTypeArrayPBRMaterialUtils.setMetalness(index, defaultMetalness, metalnesses)
    OperateTypeArrayPBRMaterialUtils.setTransmission(index, defaultTransmission, transmissions)
    OperateTypeArrayPBRMaterialUtils.setIOR(index, defaultIOR, iors)
  })

  (diffuseColors, speculars, specularColors, roughnesses, metalnesses, transmissions, iors)
}

let _initBufferData = (count, defaultDataTuple) => {
  let buffer = WonderComponentWorkerUtils.BufferPBRMaterialUtils.createBuffer(count)

  let typeArrData =
    WonderComponentWorkerUtils.CreateTypeArrayPBRMaterialUtils.createTypeArrays(
      buffer,
      count,
    )->_setAllTypeArrDataToDefault(count, defaultDataTuple)

  (buffer, typeArrData)
}

let createStateWithSharedArrayBufferData = (
  (isDebug, pbrMaterialCount),
  (
    defaultDiffuseColor,
    defaultSpecular,
    defaultSpecularColor,
    defaultRoughness,
    defaultMetalness,
    defaultTransmission,
    defaultIOR,
  ),
  {
    buffer,
    diffuseColors,
    speculars,
    specularColors,
    roughnesses,
    metalnesses,
    transmissions,
    iors,
  }: PBRMaterialSharedArrayBufferDataType.pbrMaterialSharedArrayBufferData,
): StateType.state => {
  {
    config: {
      isDebug: isDebug,
      pbrMaterialCount: pbrMaterialCount,
    },
    maxIndex: 0,
    buffer: buffer,
    diffuseColors: diffuseColors,
    speculars: speculars,
    specularColors: specularColors,
    roughnesses: roughnesses,
    metalnesses: metalnesses,
    transmissions: transmissions,
    iors: iors,
    defaultDiffuseColor: defaultDiffuseColor,
    defaultSpecular: defaultSpecular,
    defaultSpecularColor: defaultSpecularColor,
    defaultRoughness: defaultRoughness,
    defaultMetalness: defaultMetalness,
    defaultTransmission: defaultTransmission,
    defaultIOR: defaultIOR,
    gameObjectPBRMaterialMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(
      pbrMaterialCount,
    ),
    gameObjectsMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
    diffuseMapMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
    channelRoughnessMetallicMapMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(
      pbrMaterialCount,
    ),
    emissionMapMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
    normalMapMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
    transmissionMapMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(
      pbrMaterialCount,
    ),
    specularMapMap: WonderCommonlib.CreateMapComponentUtils.createEmptyMap(pbrMaterialCount),
  }
}

let createState = (isDebug: bool, pbrMaterialCount: int) => {
  let defaultDiffuseColor = (1., 1., 1.)
  let defaultSpecular = 1.0
  let defaultSpecularColor = (1., 1., 1.)
  let defaultRoughness = 1.0
  let defaultMetalness = 1.0
  let defaultTransmission = 0.0
  let defaultIOR = 1.5

  let (
    buffer,
    (diffuseColors, speculars, specularColors, roughnesses, metalnesses, transmissions, iors),
  ) = _initBufferData(
    pbrMaterialCount,
    (
      defaultDiffuseColor,
      defaultSpecular,
      defaultSpecularColor,
      defaultRoughness,
      defaultMetalness,
      defaultTransmission,
      defaultIOR,
    ),
  )

  createStateWithSharedArrayBufferData(
    (isDebug, pbrMaterialCount),
    (
      defaultDiffuseColor,
      defaultSpecular,
      defaultSpecularColor,
      defaultRoughness,
      defaultMetalness,
      defaultTransmission,
      defaultIOR,
    ),
    {
      buffer: buffer,
      diffuseColors: diffuseColors,
      speculars: speculars,
      specularColors: specularColors,
      roughnesses: roughnesses,
      metalnesses: metalnesses,
      transmissions: transmissions,
      iors: iors,
    },
  )
}
