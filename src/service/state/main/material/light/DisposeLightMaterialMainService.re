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
  };
};

let handleBatchDisposeComponent =
  (. materialDataMap, {settingRecord} as state) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                materialDataMap
                |> WonderCommonlib.MutableSparseMapService.getValidKeys,
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

    materialDataMap
    |> WonderCommonlib.MutableSparseMapService.reduceiValid(
         (. lightMaterialRecord, gameObjectArr, material) => {
           let lightMaterialRecord =
             GroupLightMaterialService.batchRemoveGameObjects(
               gameObjectArr,
               material,
               lightMaterialRecord,
             );

           GroupLightMaterialService.isGroupLightMaterial(
             material,
             lightMaterialRecord,
           ) ?
             lightMaterialRecord :
             {
               ...
                 lightMaterialRecord
                 |> _disposeData(material, textureCountPerMaterial),
               disposedIndexArray:
                 DisposeMaterialService.addDisposeIndex(
                   material,
                   disposedIndexArray,
                 ),
             };
         },
         lightMaterialRecord,
       )
    |> ignore;

    state;
  };