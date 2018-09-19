open DirectionLightType;

open DisposeComponentService;

let isAlive = (light, {disposedIndexArray}) =>
  /* DisposeLightService.isAlive(
       light,
       IndexDirectionLightService.getMappedIndexMap(record),
     ); */
  DisposeComponentService.isAlive(light, disposedIndexArray);

let _disposeData =
    (
      light,
      {
        /* index, */
        colors,
        intensities,
        gameObjectMap,
        /* mappedIndexMap, */
        renderLightArr,
      } as record,
    ) => {
  /* let lastComponentIndex = pred(index);
     let mappedSourceIndex =
       mappedIndexMap |> MappedIndexService.getMappedIndex(sourceIndex); */
  /* let gameObjectMap =
     DisposeLightService.disposeData(
       mappedSourceIndex,
       lastComponentIndex,
       gameObjectMap,
     ); */
  ...record,
  /* index: pred(index), */
  /* mappedIndexMap:
     DisposeLightService.setMappedIndexMap(
       sourceIndex,
       mappedSourceIndex,
       lastComponentIndex,
       mappedIndexMap,
     ), */
  colors:
    DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
      BufferDirectionLightService.getColorIndex(light),
      BufferDirectionLightService.getColorsSize(),
      RecordDirectionLightMainService.getDefaultColor(),
      colors,
    ),
  /* colors
     |> DisposeLightService.swapData(
          (mappedSourceIndex, lastComponentIndex),
          (
            mappedIndexMap,
            BufferDirectionLightService.getColorsSize(),
            RecordDirectionLightMainService.getDefaultColor(),
          ),
          DisposeTypeArrayService.deleteBySwapAndResetFloat32TypeArr,
        ), */
  intensities:
    /* intensities
       |> DisposeLightService.swapData(
            (mappedSourceIndex, lastComponentIndex),
            (
              mappedIndexMap,
              BufferDirectionLightService.getIntensitiesSize(),
              RecordDirectionLightMainService.getDefaultIntensity(),
            ),
            DisposeTypeArrayService.deleteSingleValueBySwapAndResetFloat32TypeArr,
          ), */
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
  /* gameObjectMap, */
  gameObjectMap: gameObjectMap |> disposeSparseMapData(light),
};

/* let handleBatchDisposeComponent =
   (. lightArray, record) =>
     DisposeLightService.handleBatchDisposeComponent(
       lightArray,
       (isAlive, _disposeData),
       record,
     ); */

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