let _setAllTypeArrDataToDefault =
    (
      (
        diffuseColors,
        speculars,
        specularColors,
        roughnesses,
        metalnesses,
        transmissions,
        iors,
      ),
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
    ) =>
  ListSt.range(0, count - 1)
  ->ListSt.reduce(Result.succeed(), (result, index) => {
      result->Result.bind(() => {
        ListResult.mergeResults([
          OperateTypeArrayBSDFMaterialCPRepoUtils.setDiffuseColor(
            index,
            defaultDiffuseColor,
            diffuseColors,
          ),
          OperateTypeArrayBSDFMaterialCPRepoUtils.setSpecular(
            index,
            defaultSpecular,
            speculars,
          ),
          OperateTypeArrayBSDFMaterialCPRepoUtils.setSpecularColor(
            index,
            defaultSpecularColor,
            specularColors,
          ),
          OperateTypeArrayBSDFMaterialCPRepoUtils.setRoughness(
            index,
            defaultRoughness,
            roughnesses,
          ),
          OperateTypeArrayBSDFMaterialCPRepoUtils.setMetalness(
            index,
            defaultMetalness,
            metalnesses,
          ),
          OperateTypeArrayBSDFMaterialCPRepoUtils.setTransmission(
            index,
            defaultTransmission,
            transmissions,
          ),
          OperateTypeArrayBSDFMaterialCPRepoUtils.setIOR(
            index,
            defaultIOR,
            iors,
          ),
        ])
      })
    })
  ->Result.mapSuccess(() => {
      (
        diffuseColors,
        speculars,
        specularColors,
        roughnesses,
        metalnesses,
        transmissions,
        iors,
      )
    });

let _initBufferData = (count, defaultDataTuple) => {
  BufferBSDFMaterialCPRepoUtils.createBuffer(count)
  ->Result.bind(buffer => {
      CreateTypeArrayBSDFMaterialCPRepoUtils.createTypeArrays(buffer, count)
      ->_setAllTypeArrDataToDefault(count, defaultDataTuple)
      ->Result.mapSuccess(typeArrData => {(buffer, typeArrData)})
    });
};

let createPO = () => {
  let bsdfMaterialCount = POConfigDpRunAPI.unsafeGet().getBSDFMaterialCount();

  let defaultDiffuseColor = (1., 1., 1.);
  let defaultSpecular = 1.0;
  let defaultSpecularColor = (1., 1., 1.);
  let defaultRoughness = 1.0;
  let defaultMetalness = 1.0;
  let defaultTransmission = 0.0;
  let defaultIOR = 1.5;

  _initBufferData(
    bsdfMaterialCount,
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
  ->Result.mapSuccess(
      (
        (
          buffer,
          (
            diffuseColors,
            speculars,
            specularColors,
            roughnesses,
            metalnesses,
            transmissions,
            iors,
          ),
        ),
      ) => {
      (
        {
          maxIndex: 0,
          buffer,
          diffuseColors,
          speculars,
          specularColors,
          roughnesses,
          metalnesses,
          transmissions,
          iors,
          defaultDiffuseColor,
          defaultSpecular,
          defaultSpecularColor,
          defaultRoughness,
          defaultMetalness,
          defaultTransmission,
          defaultIOR,
          gameObjectsMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(bsdfMaterialCount),
          diffuseMapImageIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(bsdfMaterialCount),
          channelRoughnessMetallicMapImageIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(bsdfMaterialCount),
          emissionMapImageIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(bsdfMaterialCount),
          normalMapImageIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(bsdfMaterialCount),
          transmissionMapImageIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(bsdfMaterialCount),
          specularMapImageIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(bsdfMaterialCount),
        }: BSDFMaterialCPPOType.bsdfMaterial
      )
    });
};
