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
             RecordPointLightService.getColorDataSize(),
             RecordPointLightService.getDefaultColor()
           ),
           DisposeLightService.deleteBySwapAndResetFloat32TypeArr
         ),
    intensities:
      intensities
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             RecordPointLightService.getIntensityDataSize(),
             RecordPointLightService.getDefaultIntensity()
           ),
           DisposeLightService.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    constants:
      constants
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             RecordPointLightService.getConstantDataSize(),
             RecordPointLightService.getDefaultConstant()
           ),
           DisposeLightService.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    linears:
      linears
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             RecordPointLightService.getLinearDataSize(),
             RecordPointLightService.getDefaultLinear()
           ),
           DisposeLightService.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    quadratics:
      quadratics
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             RecordPointLightService.getQuadraticDataSize(),
             RecordPointLightService.getDefaultQuadratic()
           ),
           DisposeLightService.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    ranges:
      ranges
      |> DisposeLightService.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             RecordPointLightService.getRangeDataSize(),
             RecordPointLightService.getDefaultRange()
           ),
           DisposeLightService.deleteSingleValueBySwapAndResetFloat32TypeArr
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
    MainStateData.stateData.isDebug
  );
  [@bs] _disposeData(light, record)
  }; */

let handleBatchDisposeComponent =
  [@bs]
  (
    (lightArray, isGameObjectDisposedMap: array(bool), record) =>
      DisposeLightService.handleBatchDisposeComponent(lightArray, (isAlive, _disposeData), record)
  );