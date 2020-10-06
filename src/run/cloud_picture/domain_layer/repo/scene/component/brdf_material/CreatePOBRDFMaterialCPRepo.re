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
        OperateTypeArrayBRDFMaterialCPRepoUtils.setDiffuseColor(
          index,
          defaultDiffuseColor,
          diffuseColors,
        )
        ->Result.bind(() => {
            OperateTypeArrayBRDFMaterialCPRepoUtils.setSpecular(
              index,
              defaultSpecular,
              speculars,
            )
            ->Result.bind(() => {
                OperateTypeArrayBRDFMaterialCPRepoUtils.setRoughness(
                  index,
                  defaultRoughness,
                  roughnesses,
                )
                ->Result.bind(() => {
                    OperateTypeArrayBRDFMaterialCPRepoUtils.setMetalness(
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
  BufferBRDFMaterialCPRepoUtils.createBuffer(count)
  ->Result.bind(buffer => {
      CreateTypeArrayBRDFMaterialCPRepoUtils.createTypeArrays(buffer, count)
      ->_setAllTypeArrDataToDefault(count, defaultDataTuple)
      ->Result.mapSuccess(typeArrData => {(buffer, typeArrData)})
    });
};

let createPO = () => {
  let brdfMaterialCount = POConfigDpRunAPI.unsafeGet().getBRDFMaterialCount();

  let defaultDiffuseColor = (0., 0., 0.);
  let defaultSpecular = 0.0;
  let defaultRoughness = 0.0;
  let defaultMetalness = 0.0;

  _initBufferData(
    brdfMaterialCount,
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
            CreateMapComponentCPRepoUtils.createEmptyMap(brdfMaterialCount),
          diffuseMapImageIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(brdfMaterialCount),
          channelRoughnessMetallicMapImageIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(brdfMaterialCount),
          emissionMapImageIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(brdfMaterialCount),
          normalMapImageIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(brdfMaterialCount),
        }: BRDFMaterialCPPOType.brdfMaterial
      )
    });
};
