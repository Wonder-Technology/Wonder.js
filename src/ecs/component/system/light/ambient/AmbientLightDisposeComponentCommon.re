open AmbientLightType;

open ComponentDisposeComponentCommon;

open AmbientLightStateCommon;

let isAlive = (light, state: StateDataType.state) =>
  LightDisposeComponentCommon.isAlive(light, AmbientLightIndexCommon.getMappedIndexMap(state));

let _disposeData = (sourceIndex, {index, colors, gameObjectMap, mappedIndexMap} as data) => {
  let gameObjectMap = LightDisposeComponentCommon.disposeData(sourceIndex, gameObjectMap);
  let colorDataSize = AmbientLightHelper.getColorDataSize();
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
           (mappedIndexMap, colorDataSize, AmbientLightHelper.getDefaultColor()),
           LightDisposeComponentCommon.deleteBySwapAndResetFloat32TypeArr
         ),
    gameObjectMap
  }
};

let _handleDispose =
  [@bs]
  (
    (light, state: StateDataType.state) => {
      ...state,
      ambientLightData: getLightData(state) |> _disposeData(light)
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