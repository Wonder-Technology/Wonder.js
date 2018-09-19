open PointLightType;

open DisposeComponentService;

let isAlive = (light, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(light, disposedIndexArray);

let _disposeData =
    (
      light,
      {
        colors,
        intensities,
        constants,
        linears,
        quadratics,
        ranges,
        gameObjectMap,
        renderLightArr,
      } as record,
    ) => {
  ...record,
  colors:
    DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
      BufferPointLightService.getColorIndex(light),
      BufferPointLightService.getColorsSize(),
      RecordPointLightMainService.getDefaultColor(),
      colors,
    ),
  intensities:
    DisposeTypeArrayService.deleteAndResetFloat32(.
      BufferPointLightService.getIntensityIndex(light),
      RecordPointLightMainService.getDefaultIntensity(),
      intensities,
    ),
  constants:
    DisposeTypeArrayService.deleteAndResetFloat32(.
      BufferPointLightService.getConstantIndex(light),
      RecordPointLightMainService.getDefaultConstant(),
      constants,
    ),
  linears:
    DisposeTypeArrayService.deleteAndResetFloat32(.
      BufferPointLightService.getLinearIndex(light),
      RecordPointLightMainService.getDefaultLinear(),
      linears,
    ),
  quadratics:
    DisposeTypeArrayService.deleteAndResetFloat32(.
      BufferPointLightService.getQuadraticIndex(light),
      RecordPointLightMainService.getDefaultQuadratic(),
      quadratics,
    ),
  ranges:
    DisposeTypeArrayService.deleteAndResetFloat32(.
      BufferPointLightService.getRangeIndex(light),
      RecordPointLightMainService.getDefaultRange(),
      ranges,
    ),
  gameObjectMap: gameObjectMap |> disposeSparseMapData(light),
};

let handleBatchDisposeComponent =
  (. lightArray, {disposedIndexArray} as record) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                lightArray,
                isAlive,
                record,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

    switch (lightArray |> Js.Array.length) {
    | 0 => record
    | _ =>
      let record = {
        ...record,
        disposedIndexArray: disposedIndexArray |> Js.Array.concat(lightArray),
      };
      lightArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. record, light) => record |> _disposeData(light),
           record,
         );
    };
  };