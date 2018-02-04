open DirectionLightType;

open ComponentDisposeComponentCommon;

open DirectionLightStateCommon;

let isAlive = (light, state: StateDataType.state) =>
  LightDisposeComponentCommon.isAlive(light, DirectionLightIndexCommon.getMappedIndexMap(state));

let _disposeData =
    (sourceIndex, {index, colors, intensities, gameObjectMap, mappedIndexMap} as data) => {
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
             DirectionLightHelper.getColorDataSize(),
             DirectionLightHelper.getDefaultColor()
           ),
           LightDisposeComponentCommon.deleteBySwapAndResetFloat32TypeArr
         ),
    intensities:
      intensities
      |> LightDisposeComponentCommon.swapData(
           (mappedSourceIndex, lastComponentIndex),
           (
             mappedIndexMap,
             DirectionLightHelper.getIntensityDataSize(),
             DirectionLightHelper.getDefaultIntensity()
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
      directionLightData: getLightData(state) |> _disposeData(light)
    }
  );

let handleDisposeComponent = (light, state: StateDataType.state) =>
  LightDisposeComponentCommon.handleDisposeComponent(light, (isAlive, _handleDispose), state);

let handleBatchDisposeComponent =
  [@bs]
  (
    (lightArray, gameObjectUidMap: array(bool), state: StateDataType.state) =>
      LightDisposeComponentCommon.handleBatchDisposeComponent(
        lightArray,
        (isAlive, _handleDispose),
        state
      )
  );