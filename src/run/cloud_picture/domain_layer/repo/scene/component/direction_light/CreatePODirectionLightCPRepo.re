let _setAllTypeArrDataToDefault =
    ((colors, intensities), count, (defaultColor, defaultIntensity)) =>
  ListSt.range(0, count - 1)
  ->ListSt.reduce(Result.succeed(), (result, index) => {
      result->Result.bind(() => {
        OperateTypeArrayDirectionLightCPRepoUtils.setColor(
          index,
          defaultColor,
          colors,
        )
        ->Result.bind(() => {
            OperateTypeArrayDirectionLightCPRepoUtils.setIntensity(
              index,
              defaultIntensity,
              intensities,
            )
          })
      })
    })
  ->Result.mapSuccess(() => {(colors, intensities)});

let _initBufferData = (count, defaultDataTuple) => {
  BufferDirectionLightCPRepoUtils.createBuffer(count)
  ->Result.bind(buffer => {
      CreateTypeArrayDirectionLightCPRepoUtils.createTypeArrays(buffer, count)
      ->_setAllTypeArrDataToDefault(count, defaultDataTuple)
      ->Result.mapSuccess(typeArrData => {(buffer, typeArrData)})
    });
};

let createPO = () => {
  let lightCount = POConfigDpRunAPI.unsafeGet().getDirectionLightCount();

  let defaultColor = (1., 1., 1.);
  let defaultIntensity = 1.0;

  _initBufferData(lightCount, (defaultColor, defaultIntensity))
  ->Result.mapSuccess(((buffer, (colors, intensities))) => {
      (
        {
          maxIndex: 0,
          buffer,
          colors,
          intensities,
          gameObjectMap:
            CreateMapComponentCPRepoUtils.createEmptyMap(lightCount),
        }: DirectionLightCPPOType.directionLight
      )
    });
};
