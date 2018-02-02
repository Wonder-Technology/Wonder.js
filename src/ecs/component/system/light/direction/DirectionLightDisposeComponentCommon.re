/* TODO duplicate */
open DirectionLightType;

open ComponentDisposeComponentCommon;

open DirectionLightStateCommon;

let isAlive = (light, state: StateDataType.state) =>
  !
    LightIndexCommon.isDisposed(
      LightIndexCommon.getMappedIndex(light, DirectionLightIndexCommon.getMappedIndexMap(state))
    );

let _swapIndex = (mappedSourceIndex, lastComponentIndex, mappedIndexMap) =>
  mappedSourceIndex >= lastComponentIndex ?
    mappedIndexMap :
    mappedIndexMap
    |> LightIndexCommon.setMappedIndex(lastComponentIndex, mappedSourceIndex);

let _swapData =
    ((mappedSourceIndex, lastComponentIndex), (mappedIndexMap, dataSize, defaultData), deleteBySwapAndResetTypeArrFunc, typeArr) =>
  mappedSourceIndex >= lastComponentIndex ?
    typeArr :
    [@bs]deleteBySwapAndResetTypeArrFunc(
      mappedSourceIndex * dataSize,
      lastComponentIndex * dataSize,
      typeArr,
      dataSize,
      defaultData
    );

let _disposeData = (sourceIndex, {index, colors, intensities, gameObjectMap, mappedIndexMap} as data) => {
  let gameObjectMap = LightDisposeComponentCommon.disposeData(sourceIndex, gameObjectMap);
  let colorDataSize = DirectionLightHelper.getColorDataSize();
  let intensityDataSize = DirectionLightHelper.getIntensityDataSize();
  let lastComponentIndex = pred(index);
  let mappedSourceIndex = mappedIndexMap |> LightIndexCommon.getMappedIndex(sourceIndex);
  {
    ...data,
    index: pred(index),
    mappedIndexMap:
      mappedIndexMap
      |> _swapIndex(mappedSourceIndex, lastComponentIndex)
      |> LightIndexCommon.markDisposed(sourceIndex),
    colors:
      colors
      |> _swapData(
           (mappedSourceIndex, lastComponentIndex),
           (mappedIndexMap, colorDataSize, DirectionLightHelper.getDefaultColor()),
           LightDisposeComponentCommon.deleteBySwapAndResetFloat32TypeArr
         ),
    intensities:
      intensities
      |> _swapData(
           (mappedSourceIndex, lastComponentIndex),
           (mappedIndexMap, intensityDataSize, DirectionLightHelper.getDefaultIntensity()),
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

let handleDisposeComponent = (light, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAlive(light, isAlive, state)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  [@bs] _handleDispose(light, state)
};

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