open StateDataMainType;

open WDType;

let _batchAddMaterialToTextureGroup = (materialArr, textureArr, state) =>
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

let _batchSetMaterialMap =
    ((materialArr, textureArr), setTextureIndexFunc, state) => {
  let ({diffuseTextureIndices}: LightMaterialType.lightMaterialRecord) as lightMaterialRecord =
    RecordLightMaterialMainService.getRecord(state);

  materialArr
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. diffuseTextureIndices, material, index) => {
         let texture = Array.unsafe_get(textureArr, index);

         setTextureIndexFunc(. material, texture, diffuseTextureIndices);
       },
       diffuseTextureIndices,
     );
};

let _batchSetNewMap =
    ((materialArr, textureArr, mapCount), setTextureIndexFunc, state) => {
  let state = _batchAddMaterialToTextureGroup(materialArr, textureArr, state);

  let diffuseTextureIndices =
    _batchSetMaterialMap(
      (materialArr, textureArr),
      setTextureIndexFunc,
      state,
    );

  {
    ...state,
    lightMaterialRecord:
      Some({
        ...RecordLightMaterialMainService.getRecord(state),
        diffuseTextureIndices,
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
    OperateTypeArrayAllLightMaterialService.setTextureIndex,
    state,
  );

let batchSetBasicSourceTextureData =
    (
      samplerBasicSourceTextures,
      basicSourceTextureSamplers,
      {settingRecord} as state,
    ) =>
  samplerBasicSourceTextures
  |> WonderCommonlib.ArrayService.reduceOneParami(
       (. state, basicSourceTexture, index) => {
         let {magFilter, minFilter, wrapS, wrapT}: WDType.sampler =
           Array.unsafe_get(basicSourceTextureSamplers, index);

         state
         |> OperateBasicSourceTextureMainService.setWrapS(
              basicSourceTexture,
              wrapS |> TextureType.wrapToUint8,
            )
         |> OperateBasicSourceTextureMainService.setWrapT(
              basicSourceTexture,
              wrapT |> TextureType.wrapToUint8,
            )
         |> OperateBasicSourceTextureMainService.setMagFilter(
              basicSourceTexture,
              magFilter |> TextureType.filterToUint8,
            )
         |> OperateBasicSourceTextureMainService.setMinFilter(
              basicSourceTexture,
              minFilter |> TextureType.filterToUint8,
            );
       },
       state,
     );

let batchSetFormatAndTypeAndFlipY =
    (basicSourceTextureArr, basicSourceTextures, state) =>
  basicSourceTextureArr
  |> ArrayService.reduceOneParamValidi(
       (. state, basicSourceTexture, index) => {
         let {format, type_, flipY} =
           Array.unsafe_get(basicSourceTextures, index);

         state
         |> OperateBasicSourceTextureMainService.setFormat(
              basicSourceTexture,
              format,
            )
         |> OperateBasicSourceTextureMainService.setType(
              basicSourceTexture,
              type_,
            )
         |> OperateBasicSourceTextureMainService.setFlipY(
              basicSourceTexture,
              flipY,
            );
       },
       state,
     );