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
        OperateTypeArrayPBRMaterialCPRepoUtils.setDiffuseColor(
          index,
          defaultDiffuseColor,
          diffuseColors,
        )
        ->Result.bind(() => {
            OperateTypeArrayPBRMaterialCPRepoUtils.setSpecular(
              index,
              defaultSpecular,
              speculars,
            )
            ->Result.bind(() => {
                OperateTypeArrayPBRMaterialCPRepoUtils.setRoughness(
                  index,
                  defaultRoughness,
                  roughnesses,
                )
                ->Result.bind(() => {
                    OperateTypeArrayPBRMaterialCPRepoUtils.setMetalness(
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
  BufferPBRMaterialCPRepoUtils.createBuffer(count)
  ->Result.bind(buffer => {
      CreateTypeArrayPBRMaterialCPRepoUtils.createTypeArrays(buffer, count)
      ->_setAllTypeArrDataToDefault(count, defaultDataTuple)
      ->Result.mapSuccess(typeArrData => {(buffer, typeArrData)})
    });
};

let createPO = () => {
  let pbrMaterialCount = POConfigCPRepo.getPBRMaterialCount();

  let defaultDiffuseColor = (1., 1., 1.);
  let defaultSpecular = 0.0;
  let defaultRoughness = 0.0;
  let defaultMetalness = 0.0;

  _initBufferData(
    pbrMaterialCount,
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
            CreateMapComponentCPRepoUtils.createEmptyMap(pbrMaterialCount),
          diffuseMapSourceIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(pbrMaterialCount),
          metalRoughnessMapSourceIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(pbrMaterialCount),
          emissionMapSourceIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(pbrMaterialCount),
          normalMapSourceIdMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(pbrMaterialCount),
        }: PBRMaterialCPPOType.pbrMaterial
      )
    });
};
