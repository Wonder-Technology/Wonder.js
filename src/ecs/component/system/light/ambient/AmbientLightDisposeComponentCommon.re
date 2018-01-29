open AmbientLightType;

open ComponentDisposeComponentCommon;

open AmbientLightStateCommon;

let isAlive = (light, state: StateDataType.state) =>
  LightDisposeComponentCommon.isAlive(light, AmbientLightHelper.getBufferMaxCount());

let _disposeData = (sourceIndex, {index, colors, isColorDirtys, gameObjectMap} as data) => {
  let gameObjectMap = LightDisposeComponentCommon.disposeData(sourceIndex, gameObjectMap);
  let colorDataSize = AmbientLightHelper.getColorDataSize();
  let isColorDirtyDataSize = AmbientLightHelper.getIsDirtyDataSize();
  let lastComponentIndex = pred(index);
  {
    ...data,
    index: pred(index),
    colors:
      LightDisposeComponentCommon.deleteBySwapAndResetFloat32TypeArr(
        sourceIndex * colorDataSize,
        lastComponentIndex * colorDataSize,
        colors,
        colorDataSize,
        AmbientLightHelper.getDefaultColor()
      ),
    isColorDirtys:
      LightDisposeComponentCommon.deleteSingleValueBySwapAndResetUint8TypeArr(
        sourceIndex * isColorDirtyDataSize,
        lastComponentIndex * isColorDirtyDataSize,
        isColorDirtys,
        AmbientLightHelper.getDefaultIsColorDirty()
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