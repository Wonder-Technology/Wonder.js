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
  /* (
       setTextureIndexFunc((material, mapCount, textureCountPerMaterial), texture, textureIndices),
       setMapUnitFunc(material, mapCount, mapUnits),
       textureCountMap |> TextureCountMapMaterialService.setCount(material, mapCount |> succ)
     ) */
};

let _batchSetNewDiffueMaps =
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

let _batchSetBasicSourceTextureData =
    (
      samplerBasicSourceTextures,
      basicSourceTextureSamplers,
      {settingRecord} as state,
    ) => {
  let (
        {wrapSs, wrapTs, minFilters, magFilters}: BasicSourceTextureType.basicSourceTextureRecord
      ) as basicSourceTextureRecord =
    RecordBasicSourceTextureMainService.getRecord(state);

  let (wrapSs, wrapTs, magFilters, minFilters) =
    samplerBasicSourceTextures
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (wrapSs, wrapTs, magFilters, minFilters),
           basicSourceTexture,
           index,
         ) => {
           let {magFilter, minFilter, wrapS, wrapT}: WDType.sampler =
             Array.unsafe_get(basicSourceTextureSamplers, index);
           (
             OperateTypeArrayBasicSourceTextureService.setWrapS(
               basicSourceTexture,
               wrapS |> SourceTextureType.wrapToUint8,
               wrapSs,
             ),
             OperateTypeArrayBasicSourceTextureService.setWrapT(
               basicSourceTexture,
               wrapT |> SourceTextureType.wrapToUint8,
               wrapTs,
             ),
             OperateTypeArrayBasicSourceTextureService.setMagFilter(
               basicSourceTexture,
               magFilter |> SourceTextureType.filterToUint8,
               magFilters,
             ),
             OperateTypeArrayBasicSourceTextureService.setMinFilter(
               basicSourceTexture,
               minFilter |> SourceTextureType.filterToUint8,
               minFilters,
             ),
           );
         },
         (wrapSs, wrapTs, magFilters, minFilters),
       );

  {
    ...state,
    basicSourceTextureRecord:
      Some({
        ...basicSourceTextureRecord,
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
      }),
  };
};

let _batchSetBasicSourceTextureSources =
    (
      imageBasicSourceTextures,
      basicSourceTextureImages,
      {settingRecord} as state,
    ) =>
  imageBasicSourceTextures
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, basicSourceTexture, index) => {
         let image = Array.unsafe_get(basicSourceTextureImages, index);

         OperateBasicSourceTextureMainService.setSource(
           basicSourceTexture,
           image,
           state,
         );
       },
       state,
     );

let _batchSetArrayBufferViewSourceTextureData =
    (
      samplerArrayBufferViewSourceTextures,
      arrayBufferViewSourceTextureSamplers,
      {settingRecord} as state,
    ) => {
  let (
        {wrapSs, wrapTs, minFilters, magFilters}: ArrayBufferViewSourceTextureType.arrayBufferViewSourceTextureRecord
      ) as arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);

  let (wrapSs, wrapTs, magFilters, minFilters) =
    samplerArrayBufferViewSourceTextures
    |> WonderCommonlib.ArrayService.reduceOneParami(
         (.
           (wrapSs, wrapTs, magFilters, minFilters),
           arrayBufferViewSourceTexture,
           index,
         ) => {
           let {magFilter, minFilter, wrapS, wrapT}: WDType.sampler =
             Array.unsafe_get(arrayBufferViewSourceTextureSamplers, index);

           (
             OperateTypeArrayArrayBufferViewSourceTextureService.setWrapS(
               arrayBufferViewSourceTexture,
               wrapS |> SourceTextureType.wrapToUint8,
               wrapSs,
             ),
             OperateTypeArrayArrayBufferViewSourceTextureService.setWrapT(
               arrayBufferViewSourceTexture,
               wrapT |> SourceTextureType.wrapToUint8,
               wrapTs,
             ),
             OperateTypeArrayArrayBufferViewSourceTextureService.setMagFilter(
               arrayBufferViewSourceTexture,
               magFilter |> SourceTextureType.filterToUint8,
               magFilters,
             ),
             OperateTypeArrayArrayBufferViewSourceTextureService.setMinFilter(
               arrayBufferViewSourceTexture,
               minFilter |> SourceTextureType.filterToUint8,
               minFilters,
             ),
           );
         },
         (wrapSs, wrapTs, magFilters, minFilters),
       );

  {
    ...state,
    arrayBufferViewSourceTextureRecord:
      Some({
        ...arrayBufferViewSourceTextureRecord,
        wrapSs,
        wrapTs,
        magFilters,
        minFilters,
      }),
  };
};

let _batchSetArrayBufferViewSourceTextureSizeAndSources =
    (
      imageArrayBufferViewSourceTextures,
      arrayBufferViewSourceTextureImages,
      {settingRecord} as state,
    ) =>
  imageArrayBufferViewSourceTextures
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, arrayBufferViewSourceTexture, index) => {
         let {uint8Array, width, height} =
           Array.unsafe_get(arrayBufferViewSourceTextureImages, index);

         state
         |> OperateArrayBufferViewSourceTextureMainService.setSource(
              arrayBufferViewSourceTexture,
              uint8Array,
            )
         |> OperateArrayBufferViewSourceTextureMainService.setWidth(
              arrayBufferViewSourceTexture,
              width,
            )
         |> OperateArrayBufferViewSourceTextureMainService.setHeight(
              arrayBufferViewSourceTexture,
              height,
            );
       },
       state,
     );

let batchSet = (basicSourceTextureData, arrayBufferSourceTextureData, state) =>
  switch (basicSourceTextureData) {
  | Some((
      (diffuseMapLightMaterials, lightMaterialDiffuseMaps),
      (samplerBasicSourceTextures, basicSourceTextureSamplers),
      (imageBasicSourceTextures, basicSourceTextureImages),
    )) =>
    state
    |> _batchSetNewDiffueMaps(
         diffuseMapLightMaterials,
         lightMaterialDiffuseMaps,
       )
    |> _batchSetBasicSourceTextureData(
         samplerBasicSourceTextures,
         basicSourceTextureSamplers,
       )
    |> _batchSetBasicSourceTextureSources(
         imageBasicSourceTextures,
         basicSourceTextureImages,
       )
  | None =>
    let (
      (diffuseMapLightMaterials, lightMaterialDiffuseMaps),
      (
        samplerArrayBufferViewSourceTextures,
        arrayBufferViewSourceTextureSamplers,
      ),
      (
        imageArrayBufferViewSourceTextures,
        arrayBufferViewSourceTextureImages,
      ),
    ) =
      arrayBufferSourceTextureData |> OptionService.unsafeGet;

    state
    |> _batchSetNewDiffueMaps(
         diffuseMapLightMaterials,
         lightMaterialDiffuseMaps,
       )
    |> _batchSetArrayBufferViewSourceTextureData(
         samplerArrayBufferViewSourceTextures,
         arrayBufferViewSourceTextureSamplers,
       )
    |> _batchSetArrayBufferViewSourceTextureSizeAndSources(
         imageArrayBufferViewSourceTextures,
         arrayBufferViewSourceTextureImages,
       );
  };