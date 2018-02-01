open AmbientLightType;

open ComponentDisposeComponentCommon;

open AmbientLightStateCommon;

let isAlive = (light, state: StateDataType.state) =>
  !
    AmbientLightIndexCommon.isDisposed(
      AmbientLightIndexCommon.getMappedIndex(
        light,
        AmbientLightIndexCommon.getMappedIndexMap(state)
      )
    );

let _swapIndex = (mappedSourceIndex, lastComponentIndex, mappedIndexMap) =>
  mappedSourceIndex >= lastComponentIndex ?
    mappedIndexMap :
    mappedIndexMap |> AmbientLightIndexCommon.setMappedIndex(lastComponentIndex, mappedSourceIndex);

let _swapData =
    ((mappedSourceIndex, lastComponentIndex), (mappedIndexMap, dataSize, defaultData), typeArr) =>
  mappedSourceIndex >= lastComponentIndex ?
    typeArr :
    LightDisposeComponentCommon.deleteBySwapAndResetFloat32TypeArr(
      mappedSourceIndex * dataSize,
      lastComponentIndex * dataSize,
      typeArr,
      dataSize,
      defaultData
    );

let _disposeData = (sourceIndex, {index, colors, gameObjectMap, mappedIndexMap} as data) => {
  let gameObjectMap = LightDisposeComponentCommon.disposeData(sourceIndex, gameObjectMap);
  let colorDataSize = AmbientLightHelper.getColorDataSize();
  let lastComponentIndex = pred(index);
  let mappedSourceIndex = mappedIndexMap |> AmbientLightIndexCommon.getMappedIndex(sourceIndex);
  {
    ...data,
    index: pred(index),
    mappedIndexMap:
      mappedIndexMap
      |> _swapIndex(mappedSourceIndex, lastComponentIndex)
      |> AmbientLightIndexCommon.markDisposed(sourceIndex),
    colors:
      colors
      |> _swapData(
           (mappedSourceIndex, lastComponentIndex),
           (mappedIndexMap, colorDataSize, AmbientLightHelper.getDefaultColor())
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