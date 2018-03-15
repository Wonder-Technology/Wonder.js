open MaterialType;

open LightMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(material, disposedIndexArray);

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
      } as record
    ) => {
  let (shaderIndexMap, groupCountMap, gameObjectMap) =
    DisposeMaterialService.disposeData(material, (shaderIndexMap, groupCountMap, gameObjectMap));
  {
    ...record,
    diffuseColorMap: disposeSparseMapData(material, diffuseColorMap),
    specularColorMap: disposeSparseMapData(material, specularColorMap),
    shininessMap: disposeSparseMapData(material, shininessMap),
    shaderIndexMap,
    groupCountMap,
    gameObjectMap
  }
};

let _handleDispose = (disposedIndexArray, material, record) =>
  switch (GroupLightMaterialService.isGroupMaterial(material, record)) {
  | false => {
      ...record |> _disposeData(material),
      disposedIndexArray: DisposeMaterialService.addDisposeIndex(material, disposedIndexArray)
    }
  | true => GroupLightMaterialService.decreaseGroupCount(material, record)
  };

let handleDisposeComponent = (material, {disposedIndexArray} as record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(DisposeComponentService.checkComponentShouldAlive(material, isAlive, record))
        )
      ),
    IsDebugMainService.getIsDebug(MainStateData.stateData)
  );
  _handleDispose(disposedIndexArray, material, record)
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      materialArray: array(material),
      isGameObjectDisposedMap: array(bool),
      {disposedIndexArray} as record
    ) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  materialArray,
                  isAlive,
                  record
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(MainStateData.stateData)
      );
      materialArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs] ((record, material) => _handleDispose(disposedIndexArray, material, record)),
           record
         )
    }
  );