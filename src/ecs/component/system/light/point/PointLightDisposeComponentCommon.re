open PointLightType;

open ComponentDisposeComponentCommon;

open PointLightStateCommon;

let isAlive = (light, state: StateDataType.state) =>
  LightDisposeComponentCommon.isAlive(light, PointLightIndexCommon.getMappedIndexMap(state));

let _disposeData =
    (
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
      } as data
    ) => {
  let gameObjectMap = LightDisposeComponentCommon.disposeData(sourceIndex, gameObjectMap);
  let lastComponentIndex = pred(index);
  let mappedSourceIndex = mappedIndexMap |> LightIndexCommon.getMappedIndex(sourceIndex);
  {
    ...data,
    index: pred(index),
    mappedIndexMap:
      LightDisposeComponentCommon.setMappedIndexMap(
        sourceIndex,
        mappedSourceIndex,
        lastComponentIndex,
        mappedIndexMap
      ),
    colors:
      colors
      |> LightDisposeComponentCommon.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             PointLightHelper.getColorDataSize(),
             PointLightHelper.getDefaultColor()
           ),
           LightDisposeComponentCommon.deleteBySwapAndResetFloat32TypeArr
         ),
    intensities:
      intensities
      |> LightDisposeComponentCommon.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             PointLightHelper.getIntensityDataSize(),
             PointLightHelper.getDefaultIntensity()
           ),
           LightDisposeComponentCommon.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    constants:
      constants
      |> LightDisposeComponentCommon.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             PointLightHelper.getConstantDataSize(),
             PointLightHelper.getDefaultConstant()
           ),
           LightDisposeComponentCommon.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    linears:
      linears
      |> LightDisposeComponentCommon.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             PointLightHelper.getLinearDataSize(),
             PointLightHelper.getDefaultLinear()
           ),
           LightDisposeComponentCommon.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    quadratics:
      quadratics
      |> LightDisposeComponentCommon.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             PointLightHelper.getQuadraticDataSize(),
             PointLightHelper.getDefaultQuadratic()
           ),
           LightDisposeComponentCommon.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    ranges:
      ranges
      |> LightDisposeComponentCommon.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             PointLightHelper.getRangeDataSize(),
             PointLightHelper.getDefaultRange()
           ),
           LightDisposeComponentCommon.deleteSingleValueBySwapAndResetFloat32TypeArr
         ),
    gameObjectMap
  }
};

let _handleDispose =
  [@bs]
  (
    (light, state: StateDataType.state) => {
      ...state,
      pointLightData: getLightData(state) |> _disposeData(light)
    }
  );

let handleDisposeComponent = (light, state: StateDataType.state) =>
  LightDisposeComponentCommon.handleDisposeComponent(light, (isAlive, _handleDispose), state);

let handleBatchDisposeComponent =
  [@bs]
  (
    (lightArray, isGameObjectDisposedMap: array(bool), state: StateDataType.state) =>
      LightDisposeComponentCommon.handleBatchDisposeComponent(
        lightArray,
        (isAlive, _handleDispose),
        state
      )
  );