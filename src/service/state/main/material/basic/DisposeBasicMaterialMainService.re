open StateDataMainType;

open SettingType;

open MaterialType;

open BasicMaterialType;

open DisposeComponentService;

let isAlive = (material, {disposedIndexArray}) =>
  DisposeComponentService.isAlive(material, disposedIndexArray);

/*!
  not dispose texture when dispose material!
  because different materials may use same texture, if dispose one material's texture which is shared, then will affect other materials!

  so need user mannually dispose texture!
  */
let _disposeData =
    (
      material,
      textureCountPerMaterial,
      {
        shaderIndices,
        colors,
        textureIndices,
        mapUnits,
        textureCountMap,
        defaultColor,
        groupCountMap,
        gameObjectMap
      } as basicMaterialRecord
    ) => {
  let (shaderIndices, groupCountMap, gameObjectMap) =
    DisposeMaterialService.disposeData(
      material,
      (shaderIndices, groupCountMap, gameObjectMap),
      DefaultTypeArrayValueService.getDefaultShaderIndex()
    );
  {
    ...basicMaterialRecord,
    shaderIndices,
    colors:
      [@bs]
      DisposeTypeArrayService.deleteAndResetFloat32TypeArr(
        BufferBasicMaterialService.getColorIndex(material),
        BufferBasicMaterialService.getColorsSize(),
        defaultColor,
        colors
      ),
    textureIndices:
      DisposeMaterialMainService.disposeTextureIndices(
        material,
        textureCountPerMaterial,
        textureIndices
      ),
    mapUnits:
      [@bs]
      DisposeTypeArrayService.deleteAndResetUint8(
        BufferBasicMaterialService.getMapUnitIndex(material),
        MapUnitService.getDefaultUnit(),
        mapUnits
      ),
    textureCountMap:
      textureCountMap
      |> TextureCountMapMaterialService.setCount(
           material,
           TextureCountMapMaterialService.getDefaultCount()
         ),
    groupCountMap,
    gameObjectMap
  }
};

let _handleDispose = (disposedIndexArray, material, textureCountPerMaterial, basicMaterialRecord) =>
  switch (GroupBasicMaterialService.isGroupMaterial(material, basicMaterialRecord)) {
  | false => {
      ...basicMaterialRecord |> _disposeData(material, textureCountPerMaterial),
      disposedIndexArray: DisposeMaterialService.addDisposeIndex(material, disposedIndexArray)
    }
  | true => GroupBasicMaterialService.decreaseGroupCount(material, basicMaterialRecord)
  };

let handleBatchDisposeComponent =
  [@bs]
  (
    (materialArray: array(material), {settingRecord} as state) => {
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                  materialArray,
                  isAlive,
                  RecordBasicMaterialMainService.getRecord(state)
                )
              )
            )
          ),
        IsDebugMainService.getIsDebug(StateDataMain.stateData)
      );
      let {disposedIndexArray} as basicMaterialRecord =
        RecordBasicMaterialMainService.getRecord(state);
      let textureCountPerMaterial = BufferSettingService.getTextureCountPerMaterial(settingRecord);
      materialArray
      |> WonderCommonlib.ArrayService.reduceOneParam(
           [@bs]
           (
             (basicMaterialRecord, material) =>
               _handleDispose(
                 disposedIndexArray,
                 material,
                 textureCountPerMaterial,
                 basicMaterialRecord
               )
           ),
           basicMaterialRecord
         )
      |> ignore;
      state
    }
  );