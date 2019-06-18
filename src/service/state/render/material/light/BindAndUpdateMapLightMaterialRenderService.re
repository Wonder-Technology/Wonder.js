open StateRenderType;

open RenderLightMaterialType;

let bindAndUpdate =
  (. gl, material, {settingRecord, lightMaterialRecord} as state) => {
    let {diffuseTextureIndices, specularTextureIndices} = lightMaterialRecord;

    let diffuseTextureIndex =
      OperateTypeArrayAllLightMaterialService.getTextureIndex(.
        material,
        diffuseTextureIndices,
      );

    let specularTextureIndex =
      OperateTypeArrayAllLightMaterialService.getTextureIndex(.
        material,
        specularTextureIndices,
      );

    let arrayBufferViewSourceTextureIndexOffset =
      IndexSourceTextureRenderService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      );

    let state =
      state
      |> BindAndUpdateMapMaterialRenderService.bindAndUpdate(
           (gl, material),
           (
             diffuseTextureIndex,
             IndexAllSourceTextureService.getSourceTextureType(
               diffuseTextureIndex,
               arrayBufferViewSourceTextureIndexOffset,
             ),
           ),
           MapUnitLightMaterialRenderService.setDiffuseMapUnit,
         )
      |> BindAndUpdateMapMaterialRenderService.bindAndUpdate(
           (gl, material),
           (
             specularTextureIndex,
             IndexAllSourceTextureService.getSourceTextureType(
               specularTextureIndex,
               arrayBufferViewSourceTextureIndexOffset,
             ),
           ),
           MapUnitLightMaterialRenderService.setSpecularMapUnit,
         );

    state;
  };