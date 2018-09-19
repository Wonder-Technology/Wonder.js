open DirectionLightType;

open DisposeComponentService;

let isAlive = (light, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(light, disposedIndexArray);

let _disposeData =
    (light, {colors, intensities, gameObjectMap, renderLightArr} as record) => {
  ...record,
  colors:
    DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
      BufferDirectionLightService.getColorIndex(light),
      BufferDirectionLightService.getColorsSize(),
      RecordDirectionLightMainService.getDefaultColor(),
      colors,
    ),
  intensities:
    DisposeTypeArrayService.deleteAndResetFloat32(.
      BufferDirectionLightService.getIntensityIndex(light),
      RecordDirectionLightMainService.getDefaultIntensity(),
      intensities,
    ),
  renderLightArr:
    RenderLightArrLightService.removeFromRenderLightArr(
      light,
      renderLightArr,
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