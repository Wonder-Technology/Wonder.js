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

let _disposeData = (sourceIndex, {index, colors, gameObjectMap, mappedIndexMap} as data) => {
  let gameObjectMap = LightDisposeComponentCommon.disposeData(sourceIndex, gameObjectMap);
  let colorDataSize = AmbientLightHelper.getColorDataSize();
  let lastComponentIndex = pred(index);
  {
    ...data,
    index: pred(index),
    mappedIndexMap:
      mappedIndexMap
      |> AmbientLightIndexCommon.setMappedIndex(lastComponentIndex, sourceIndex)
      |> AmbientLightIndexCommon.markDisposed(sourceIndex),
    colors:
      LightDisposeComponentCommon.deleteBySwapAndResetFloat32TypeArr(
        sourceIndex * colorDataSize,
        lastComponentIndex * colorDataSize,
        colors,
        colorDataSize,
        AmbientLightHelper.getDefaultColor()
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