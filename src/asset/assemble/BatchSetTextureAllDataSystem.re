open StateDataMainType;

open WDType;

let _batchSetNewMap =
    (
      (materialArr, textureArr, mapCount),
      (setMapUnitFunc, setTextureIndexFunc),
      (textureCountPerMaterial, textureIndices, mapUnits, textureCountMap),
    ) => {
  let newTextureCount = mapCount |> succ;

  materialArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. (textureIndices, mapUnits, textureCountMap), material, index) => {
         let texture = Array.unsafe_get(textureArr, index);

         (
           setTextureIndexFunc(.
             (material, mapCount, textureCountPerMaterial),
             texture,
             textureIndices,
           ),
           setMapUnitFunc(. material, mapCount, mapUnits),
           textureCountMap
           |> TextureCountMapMaterialService.setCount(
                material,
                newTextureCount,
              ),
         );
       },
       (textureIndices, mapUnits, textureCountMap),
     );
};

let batchSetNewDiffueMaps =
    (
      diffuseMapLightMaterials,
      lightMaterialDiffuseMaps,
      {settingRecord} as state,
    ) => {
  let (
        {textureIndices, diffuseMapUnits, textureCountMap}: LightMaterialType.lightMaterialRecord
      ) as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);
  let (textureIndices, diffuseMapUnits, textureCountMap) =
    _batchSetNewMap(
      (diffuseMapLightMaterials, lightMaterialDiffuseMaps, 0),
      (
        OperateTypeArrayLightMaterialService.setDiffuseMapUnit,
        OperateTypeArrayLightMaterialService.setTextureIndex,
      ),
      (
        BufferSettingService.getTextureCountPerMaterial(settingRecord),
        textureIndices,
        diffuseMapUnits,
        textureCountMap,
      ),
    );

  {
    ...state,
    lightMaterialRecord:
      Some({
        ...lightMaterialRecord,
        textureIndices,
        diffuseMapUnits,
        textureCountMap,
      }),
  };
};

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

let batchSetFormat = (basicSourceTextureArr, basicSourceTextures, state) =>
  basicSourceTextureArr
  |> ArrayService.reduceOneParamValidi(
       (. state, basicSourceTexture, index) =>
         OperateBasicSourceTextureMainService.setFormat(
           basicSourceTexture,
           Array.unsafe_get(basicSourceTextures, index).format
           |> SourceTextureType.formatToUint8,
           state,
         ),
       state,
     );