open MaterialType;

open LightMaterialType;

open ComponentDisposeComponentCommon;

open LightMaterialStateCommon;

let isAlive = (material, state: StateDataType.state) =>
  MaterialDisposeComponentCommon.isAlive(material, getMaterialData(state).disposedIndexArray);

let _disposeData =
    (
      material,
      {
        diffuseColorMap,
        specularColorMap,
        shininessMap,
        shaderIndexMap,
        groupCountMap,
        gameObjectMap
      } as data
    ) => {
  let (shaderIndexMap, groupCountMap, gameObjectMap) =
    MaterialDisposeComponentCommon.disposeData(
      material,
      (shaderIndexMap, groupCountMap, gameObjectMap)
    );
  {
    ...data,
    diffuseColorMap: disposeSparseMapData(material, diffuseColorMap),
    specularColorMap: disposeSparseMapData(material, specularColorMap),
    shininessMap: disposeSparseMapData(material, shininessMap),
    shaderIndexMap,
    groupCountMap,
    gameObjectMap
  }
};

let _handleDispose =
  [@bs]
  (
    (disposedIndexArray, material, state: StateDataType.state) =>
      switch (LightMaterialGroupCommon.isGroupMaterial(material, state)) {
      | false => {
          ...state,
          lightMaterialData: {
            ...getMaterialData(state) |> _disposeData(material),
            disposedIndexArray:
              MaterialDisposeComponentCommon.addDisposeIndex(material, disposedIndexArray)
          }
        }
      | true => LightMaterialGroupCommon.decreaseGroupCount(material, state)
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