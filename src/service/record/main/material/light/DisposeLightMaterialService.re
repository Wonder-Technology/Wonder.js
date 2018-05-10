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
      DefaultTypeArrayValueService.getDefaultShaderIndex()
    );
  {
    ...record,
    shaderIndices,
    diffuseColors:
      [@bs]
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(
        BufferLightMaterialService.getDiffuseColorIndex(material),
        BufferLightMaterialService.getDiffuseColorsSize(),
        defaultDiffuseColor,
        diffuseColors
      ),
    specularColors:
      [@bs]
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(
        BufferLightMaterialService.getSpecularColorIndex(material),
        BufferLightMaterialService.getSpecularColorsSize(),
        defaultSpecularColor,
        specularColors
      ),
    shininess:
      [@bs]
      DisposeTypeArrayService.deleteAndResetFloat32(
        BufferLightMaterialService.getShininessIndex(material),
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

let handleBatchDisposeComponent =
  [@bs]
  (
    (materialArray: array(material), {disposedIndexArray} as record) => {
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