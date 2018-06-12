open StateDataMainType;

open SettingType;

open MaterialType;

open LightMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(material, disposedIndexArray);

/*!
  not dispose texture when dispose material!
  */
let _disposeData =
    (
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
        textureCountMap,
        defaultDiffuseColor,
        defaultSpecularColor,
        defaultShininess,
        nameMap,
        groupCountMap,
        gameObjectMap,
      } as lightMaterialRecord,
    ) => {
  let (shaderIndices, groupCountMap, gameObjectMap) =
    DisposeMaterialService.disposeData(
      material,
      (shaderIndices, groupCountMap, gameObjectMap),
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
    textureCountMap:
      textureCountMap
      |> TextureCountMapMaterialService.setCount(
           material,
           TextureCountMapMaterialService.getDefaultCount(),
         ),
    nameMap: nameMap |> disposeSparseMapData(material),
    groupCountMap,
    gameObjectMap,
  };
};

let _handleDispose =
    (
      disposedIndexArray,
      material,
      textureCountPerMaterial,
      lightMaterialRecord,
    ) =>
  switch (
    GroupLightMaterialService.isGroupMaterial(material, lightMaterialRecord)
  ) {
  | false => {
      ...
        lightMaterialRecord |> _disposeData(material, textureCountPerMaterial),
      disposedIndexArray:
        DisposeMaterialService.addDisposeIndex(material, disposedIndexArray),
    }
  | true =>
    GroupLightMaterialService.decreaseGroupCount(
      material,
      lightMaterialRecord,
    )
  };

let handleBatchDisposeComponent =
  (. materialArray: array(material), {settingRecord} as state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                materialArray,
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
    materialArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. lightMaterialRecord, material) =>
           _handleDispose(
             disposedIndexArray,
             material,
             textureCountPerMaterial,
             lightMaterialRecord,
           ),
         lightMaterialRecord,
       )
    |> ignore;
    state;
  };