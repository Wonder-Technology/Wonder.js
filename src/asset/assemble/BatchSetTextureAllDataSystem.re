open StateDataMainType;

open WDType;

let _batchSetNewMap =
    (
      (materialArr, textureArr, mapCount),
      (setMapUnitFunc, setTextureIndexFunc),
      textureCountPerMaterial,
      state,
    ) => {
  let newTextureCount = mapCount |> succ;

  let state =
    materialArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (. state, material, index) => {
           let texture = Array.unsafe_get(textureArr, index);

           state
           |> GroupTextureMainService.addMaterial(
                (material, MaterialType.LightMaterial),
                texture,
              );
         },
         state,
       );

  let (
        {textureIndices, diffuseMapUnits, emptyMapUnitArrayMap}: LightMaterialType.lightMaterialRecord
      ) as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);

  let (textureIndices, mapUnits, emptyMapUnitArrayMap) =
    materialArr
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (textureIndices, mapUnits, emptyMapUnitArrayMap),
           material,
           index,
         ) => {
           let texture = Array.unsafe_get(textureArr, index);

           let (mapUnit, emptyMapUnitArrayMap) =
             EmptyMapUnitArrayMapService.unsafeGetEmptyMapUnitAndPop(
               material,
               emptyMapUnitArrayMap,
             );

           (
             setTextureIndexFunc(.
               (material, mapUnit, textureCountPerMaterial),
               texture,
               textureIndices,
             ),
             setMapUnitFunc(. material, mapUnit, mapUnits),
             emptyMapUnitArrayMap,
           );
         },
         (textureIndices, diffuseMapUnits, emptyMapUnitArrayMap),
       );

  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        textureIndices,
        diffuseMapUnits,
        emptyMapUnitArrayMap,
      }),
  };
};

let batchSetNewDiffueMaps =
    (
      diffuseMapLightMaterials,
      lightMaterialDiffuseMaps,
      {settingRecord} as state,
    ) =>
  _batchSetNewMap(
    (diffuseMapLightMaterials, lightMaterialDiffuseMaps, 0),
    (
      OperateTypeArrayLightMaterialService.setDiffuseMapUnit,
      OperateTypeArrayLightMaterialService.setTextureIndex,
    ),
    BufferSettingService.getTextureCountPerMaterial(settingRecord),
    state,
  );

let batchSetBasicSourceTextureData =
    (
      samplerBasicSourceTextures,
      arrayBufferViewSourceTextureSamplers,
      {settingRecord} as state,
    ) =>
  samplerBasicSourceTextures
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, arrayBufferViewSourceTexture, index) => {
         let {magFilter, minFilter, wrapS, wrapT}: WDType.sampler =
           Array.unsafe_get(arrayBufferViewSourceTextureSamplers, index);

         state
         |> OperateBasicSourceTextureMainService.setWrapS(
              arrayBufferViewSourceTexture,
              wrapS |> SourceTextureType.wrapToUint8,
            )
         |> OperateBasicSourceTextureMainService.setWrapT(
              arrayBufferViewSourceTexture,
              wrapT |> SourceTextureType.wrapToUint8,
            )
         |> OperateBasicSourceTextureMainService.setMagFilter(
              arrayBufferViewSourceTexture,
              magFilter |> SourceTextureType.filterToUint8,
            )
         |> OperateBasicSourceTextureMainService.setMinFilter(
              arrayBufferViewSourceTexture,
              minFilter |> SourceTextureType.filterToUint8,
            );
       },
       state,
     );

let batchSetFormatAndFlipY =
    (basicSourceTextureArr, basicSourceTextures, state) =>
  basicSourceTextureArr
  |> ArrayService.reduceOneParamValidi(
       (. state, basicSourceTexture, index) => {
         let {format, flipY} = Array.unsafe_get(basicSourceTextures, index);

         state
         |> OperateBasicSourceTextureMainService.setFormat(
              basicSourceTexture,
              format |> SourceTextureType.formatToUint8,
            )
         |> OperateBasicSourceTextureMainService.setFlipY(
              basicSourceTexture,
              flipY,
            );
       },
       state,
     );