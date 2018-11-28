open StateDataMainType;

open SettingType;

open MaterialType;

open BasicMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeMaterialMainService.isAlive(material, disposedIndexArray);

/*!
  not dispose texture when dispose material!
  because different materials may use same texture, if dispose one material's texture which is shared, then will affect other materials!

  so need user mannually dispose texture!
  */
let _disposeData =
    (
      gameObject,
      material,
      textureCountPerMaterial,
      {
        shaderIndices,
        colors,
        textureIndices,
        mapUnits,
        emptyMapUnitArrayMap,
        defaultColor,
        nameMap,
        gameObjectsMap,
      } as basicMaterialRecord,
    ) => {
  let shaderIndices =
    DisposeMaterialService.disposeData(
      material,
      shaderIndices,
      DefaultTypeArrayValueService.getDefaultShaderIndex(),
    );

  {
    ...basicMaterialRecord,
    shaderIndices,
    colors:
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(.
        BufferBasicMaterialService.getColorIndex(material),
        BufferBasicMaterialService.getColorsSize(),
        defaultColor,
        colors,
      ),
    textureIndices:
      DisposeMaterialMainService.disposeTextureIndices(
        material,
        textureCountPerMaterial,
        textureIndices,
      ),
    mapUnits:
      DisposeTypeArrayService.deleteAndResetUint8(.
        BufferBasicMaterialService.getMapUnitIndex(material),
        MapUnitService.getDefaultUnit(),
        mapUnits,
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
      basicMaterialRecord,
    ) =>
  switch (
    GroupBasicMaterialService.isGroupBasicMaterial(
      material,
      basicMaterialRecord,
    )
  ) {
  | false => {
      ...
        basicMaterialRecord
        |> _disposeData(gameObject, material, textureCountPerMaterial),
      disposedIndexArray:
        DisposeMaterialService.addDisposeIndex(material, disposedIndexArray),
    }
  | true =>
    GroupBasicMaterialService.removeGameObject(
      gameObject,
      material,
      basicMaterialRecord,
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
                RecordBasicMaterialMainService.getRecord(state),
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );
    let {disposedIndexArray} as basicMaterialRecord =
      RecordBasicMaterialMainService.getRecord(state);
    let textureCountPerMaterial =
      BufferSettingService.getTextureCountPerMaterial(settingRecord);
    materialDataArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. basicMaterialRecord, materialData) =>
           _handleDispose(
             materialData,
             disposedIndexArray,
             textureCountPerMaterial,
             basicMaterialRecord,
           ),
         basicMaterialRecord,
       )
    |> ignore;
    state;
  };