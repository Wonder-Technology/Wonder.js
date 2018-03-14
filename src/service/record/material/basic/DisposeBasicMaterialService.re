open MaterialType;

open BasicMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(material, disposedIndexArray);

let _disposeData = (material, {colorMap, shaderIndexMap, groupCountMap, gameObjectMap} as record) => {
  let (shaderIndexMap, groupCountMap, gameObjectMap) =
    DisposeMaterialService.disposeData(material, (shaderIndexMap, groupCountMap, gameObjectMap));
  {
    ...record,
    colorMap: disposeSparseMapData(material, colorMap),
    shaderIndexMap,
    groupCountMap,
    gameObjectMap
  }
};

let _handleDispose = (disposedIndexArray, material, record) =>
  switch (GroupBasicMaterialService.isGroupMaterial(material, record)) {
  | false => {
      ...record |> _disposeData(material),
      disposedIndexArray: DisposeMaterialService.addDisposeIndex(material, disposedIndexArray)
    }
  | true => GroupBasicMaterialService.decreaseGroupCount(material, record)
  };

let handleDisposeComponent = (material, {disposedIndexArray} as record) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(DisposeComponentService.checkComponentShouldAlive(material, isAlive, record))
        )
      ),
    MainStateData.stateData.isDebug
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
        MainStateData.stateData.isDebug
      );
      materialArray
      |> WonderCommonlib.ArraySystem.reduceOneParam(
           [@bs] ((record, material) => _handleDispose(disposedIndexArray, material, record)),
           record
         )
    }
  );