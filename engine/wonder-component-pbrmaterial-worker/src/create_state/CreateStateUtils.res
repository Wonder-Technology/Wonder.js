let createState = (isDebug, pbrMaterialCount, buffer): StateType.state => {
  let (
    diffuseColors,
    speculars,
    specularColors,
    roughnesses,
    metalnesses,
    transmissions,
    iors,
  ) = WonderComponentWorkerUtils.CreateTypeArrayPBRMaterialUtils.createTypeArrays(
    buffer,
    pbrMaterialCount,
  )

  {
    config: {
      isDebug: isDebug,
    },
    diffuseColors: diffuseColors,
    speculars: speculars,
    specularColors: specularColors,
    roughnesses: roughnesses,
    metalnesses: metalnesses,
    transmissions: transmissions,
    iors: iors,
  }
}
