let _setAllTypeArrDataToDefault =
    (
      (diffuseColors, speculars, roughnesses, metalnesses),
      count,
      (
        defaultDiffuseColor,
        defaultSpecular,
        defaultRoughness,
        defaultMetalness,
      ),
    ) =>
  ListSt.range(0, count - 1)
  ->ListSt.reduce(Result.succeed(), (result, index) => {
      result->Result.bind(() => {
        OperateTypeArrayBSDFMaterialCPRepoUtils.setDiffuseColor(
          index,
          defaultDiffuseColor,
          diffuseColors,
        )
        ->Result.bind(() => {
            OperateTypeArrayBSDFMaterialCPRepoUtils.setSpecular(
              index,
              defaultSpecular,
              speculars,
            )
            ->Result.bind(() => {
                OperateTypeArrayBSDFMaterialCPRepoUtils.setRoughness(
                  index,
                  defaultRoughness,
                  roughnesses,
                )
                ->Result.bind(() => {
                    OperateTypeArrayBSDFMaterialCPRepoUtils.setMetalness(
                      index,
                      defaultMetalness,
                      metalnesses,
                    )
                  })
              })
          })
      })
    })
  ->Result.mapSuccess(() => {
      (diffuseColors, speculars, roughnesses, metalnesses)
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

  let defaultDiffuseColor = (0., 0., 0.);
  let defaultSpecular = 0.0;
  let defaultRoughness = 0.0;
  let defaultMetalness = 0.0;

  _initBufferData(
    bsdfMaterialCount,
    (
      defaultDiffuseColor,
      defaultSpecular,
      defaultRoughness,
      defaultMetalness,
    ),
  )
  ->Result.mapSuccess(
      ((buffer, (diffuseColors, speculars, roughnesses, metalnesses))) => {
      (
        {
          maxIndex: 0,
          buffer,
          diffuseColors,
          speculars,
          roughnesses,
          metalnesses,
          defaultDiffuseColor,
          defaultSpecular,
          defaultRoughness,
          defaultMetalness,
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
        }: BSDFMaterialCPPOType.bsdfMaterial
      )
    });
};
