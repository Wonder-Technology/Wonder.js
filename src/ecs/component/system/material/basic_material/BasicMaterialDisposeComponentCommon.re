open MaterialType;

open BasicMaterialType;

open ComponentDisposeComponentCommon;

open BasicMaterialStateCommon;

let isAlive = (material, state: StateDataType.state) =>
  MaterialDisposeComponentCommon.isAlive(material, getMaterialData(state).disposedIndexArray);

let _disposeData = (material, {colorMap, shaderIndexMap, groupCountMap, gameObjectMap} as data) => {
  let (shaderIndexMap, groupCountMap, gameObjectMap) =
    MaterialDisposeComponentCommon.disposeData(
      material,
      (shaderIndexMap, groupCountMap, gameObjectMap)
    );
  {
    ...data,
    colorMap: disposeSparseMapData(material, colorMap),
    shaderIndexMap,
    groupCountMap,
    gameObjectMap
  }
};

let _handleDispose =
  [@bs]
  (
    (disposedIndexArray, material, state: StateDataType.state) =>
      switch (BasicMaterialGroupCommon.isGroupMaterial(material, state)) {
      | false => {
          ...state,
          basicMaterialData: {
            ...getMaterialData(state) |> _disposeData(material),
            disposedIndexArray:
              MaterialDisposeComponentCommon.addDisposeIndex(material, disposedIndexArray)
          }
        }
      | true => BasicMaterialGroupCommon.decreaseGroupCount(material, state)
      }
  );

let handleDisposeComponent = (material, state: StateDataType.state) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAlive(material, isAlive, state)
          )
        )
      ),
    StateData.stateData.isDebug
  );
  [@bs] _handleDispose(getMaterialData(state).disposedIndexArray, material, state)
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (materialArray: array(material), gameObjectUidMap: array(bool), state: StateDataType.state) =>
      MaterialDisposeComponentCommon.handleBatchDisposeComponent(
        materialArray,
        getMaterialData(state).disposedIndexArray,
        (isAlive, _handleDispose),
        state
      )
  );