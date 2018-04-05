open MaterialType;

open LightMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(material, disposedIndexArray);

let _disposeData =
    (
      material,
      {
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        defaultShaderIndex,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        groupCountMap,
        gameObjectMap
      } as record
    ) => {
  let (shaderIndices, groupCountMap, gameObjectMap) =
    DisposeMaterialService.disposeData(
      material,
      (shaderIndices, groupCountMap, gameObjectMap),
      defaultShaderIndex
    );
  {
    ...record,
    shaderIndices,
    diffuseColors:
      [@bs]
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(
        RecordLightMaterialMainService.getDiffuseColorIndex(material),
        RecordLightMaterialMainService.getDiffuseColorsSize(),
        defaultDiffuseColor,
        diffuseColors
      ),
    specularColors:
      [@bs]
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(
        RecordLightMaterialMainService.getSpecularColorIndex(material),
        RecordLightMaterialMainService.getSpecularColorsSize(),
        defaultSpecularColor,
        specularColors
      ),
    shininess:
      [@bs]
      DisposeTypeArrayService.deleteAndResetFloat32(
        RecordLightMaterialMainService.getShininessIndex(material),
        defaultShininess,
        shininess
      ),
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
    IsDebugMainService.getIsDebug(StateDataMain.stateData)
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
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      materialArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs] ((record, material) => _handleDispose(disposedIndexArray, material, record)),
           record
         )
    }
  );