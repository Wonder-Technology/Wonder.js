open StateDataMainType;

open SettingType;

open MaterialType;

open LightMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeMaterialMainService.isAlive(material, disposedIndexArray);

/*!
  not dispose texture when dispose material!
  */
let _disposeData =
    (
      gameObject,
      material,
      textureCountPerMaterial,
      {
        shaderIndices,
        diffuseColors,
        specularColors,
        shininess,
        textureIndices,
        diffuseMapUnits,
        specularMapUnits,
        emptyMapUnitArrayMap,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        nameMap,
        gameObjectsMap,
      } as lightMaterialRecord,
    ) => {
  let shaderIndices =
    DisposeMaterialService.disposeData(
      material,
      shaderIndices,
      DefaultTypeArrayValueService.getDefaultShaderIndex(),
    );

  {
    ...lightMaterialRecord,
    shaderIndices,
    diffuseColors:
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
        BufferLightMaterialService.getDiffuseColorIndex(material),
        BufferLightMaterialService.getDiffuseColorsSize(),
        defaultDiffuseColor,
        diffuseColors,
      ),
    specularColors:
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
        BufferLightMaterialService.getSpecularColorIndex(material),
        BufferLightMaterialService.getSpecularColorsSize(),
        defaultSpecularColor,
        specularColors,
      ),
    shininess:
      DisposeTypeArrayService.deleteAndResetFloat32(.
        BufferLightMaterialService.getShininessIndex(material),
        defaultShininess,
        shininess,
      ),
    textureIndices:
      DisposeMaterialMainService.disposeTextureIndices(
        material,
        textureCountPerMaterial,
        textureIndices,
      ),
    diffuseMapUnits:
      DisposeTypeArrayService.deleteAndResetUint8(.
        BufferLightMaterialService.getDiffuseMapUnitIndex(material),
        MapUnitService.getDefaultUnit(),
        diffuseMapUnits,
      ),
    specularMapUnits:
      DisposeTypeArrayService.deleteAndResetUint8(.
        BufferLightMaterialService.getDiffuseMapUnitIndex(material),
        MapUnitService.getDefaultUnit(),
        specularMapUnits,
      ),
    emptyMapUnitArrayMap:
      emptyMapUnitArrayMap |> disposeSparseMapData(material),
    nameMap: nameMap |> disposeSparseMapData(material),
    gameObjectsMap:
      GameObjectsMapService.removeGameObject(
        gameObject,
        material,
        gameObjectsMap,
      ),
  };
};

let _handleDispose =
    (
      (gameObject, material),
      disposedIndexArray,
      textureCountPerMaterial,
      lightMaterialRecord,
    ) =>
  switch (
    GroupLightMaterialService.isGroupLightMaterial(
      material,
      lightMaterialRecord,
    )
  ) {
  | false => {
      ...
        lightMaterialRecord
        |> _disposeData(gameObject, material, textureCountPerMaterial),
      disposedIndexArray:
        DisposeMaterialService.addDisposeIndex(material, disposedIndexArray),
    }
  | true =>
    GroupLightMaterialService.removeGameObject(
      gameObject,
      material,
      lightMaterialRecord,
    )
  };

let handleBatchDisposeComponent =
  (. materialDataArray, {settingRecord} as state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                materialDataArray
                |> Js.Array.map(((_, material)) => material),
                isAlive,
                RecordLightMaterialMainService.getRecord(state),
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    let {disposedIndexArray} as lightMaterialRecord =
      RecordLightMaterialMainService.getRecord(state);
    let textureCountPerMaterial =
      BufferSettingService.getTextureCountPerMaterial(settingRecord);
    materialDataArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. lightMaterialRecord, materialData) =>
           _handleDispose(
             materialData,
             disposedIndexArray,
             textureCountPerMaterial,
             lightMaterialRecord,
           ),
         lightMaterialRecord,
       )
    |> ignore;
    state;
  };