open PointLightType;

open DisposeComponentService;

let isAlive = (light, record) =>
  DisposeLightService.isAlive(light, IndexPointLightService.getMappedIndexMap(record));

let _disposeData =
    [@bs](
      sourceIndex,
      {
        index,
        colors,
        intensities,
        constants,
        linears,
        quadratics,
        ranges,
        gameObjectMap,
        mappedIndexMap
      } as record
    ) => {
  let gameObjectMap = DisposeLightService.disposeData(sourceIndex, gameObjectMap);
  let lastComponentIndex = pred(index);
  let mappedSourceIndex = mappedIndexMap |> MappedIndexService.getMappedIndex(sourceIndex);
  {
    ...record,
    index: pred(index),
    mappedIndexMap:
      DisposeLightService.setMappedIndexMap(
        sourceIndex,
        mappedSourceIndex,
        lastComponentIndex,
        mappedIndexMap
      ),
    colors:
      colors
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             BufferPointLightService .getColorsSize(),
             RecordPointLightMainService.getDefaultColor()
           ),
           DisposeTypeArrayService.deleteBySwapAndResetFloat32TypeArr
         ),
    intensities:
      intensities
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             BufferPointLightService.getIntensitiesSize(),
             RecordPointLightMainService.getDefaultIntensity()
           ),
           DisposeTypeArrayService.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    constants:
      constants
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             BufferPointLightService.getConstantsSize(),
             RecordPointLightMainService.getDefaultConstant()
           ),
           DisposeTypeArrayService.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    linears:
      linears
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             BufferPointLightService.getLinearsSize(),
             RecordPointLightMainService.getDefaultLinear()
           ),
           DisposeTypeArrayService.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    quadratics:
      quadratics
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             BufferPointLightService.getQuadraticsSize(),
             RecordPointLightMainService.getDefaultQuadratic()
           ),
           DisposeTypeArrayService.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    ranges:
      ranges
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             BufferPointLightService.getRangesSize(),
             RecordPointLightMainService.getDefaultRange()
           ),
           DisposeTypeArrayService.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    gameObjectMap
  }
};

let handleDisposeComponent = (light, record) =>
  DisposeLightService.handleDisposeComponent(light, (isAlive, _disposeData), record);
  /* {

  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            DisposeComponentService.checkComponentShouldAlive(light, isAlive, record)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
  );
  [@bs] _disposeData(light, record)
  }; */

let handleBatchDisposeComponent =
  [@bs]
  (
    (lightArray, record) =>
      DisposeLightService.handleBatchDisposeComponent(lightArray, (isAlive, _disposeData), record)
  );