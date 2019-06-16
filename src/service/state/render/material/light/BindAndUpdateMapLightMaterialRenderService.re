open StateRenderType;

open RenderLightMaterialType;

let bindAndUpdate =
  (. gl, material, {settingRecord, lightMaterialRecord} as state) => {
    let {diffuseTextureIndices, specularTextureIndices} = lightMaterialRecord;

    let state =
      state
      |> BindAndUpdateMapMaterialRenderService.bindAndUpdate(
           (gl, material),
           OperateTypeArrayLightMaterialService.getTextureIndex(.
             material,
             diffuseTextureIndices,
           ),
           MapUnitLightMaterialRenderService.setDiffuseMapUnit,
         )
      |> BindAndUpdateMapMaterialRenderService.bindAndUpdate(
           (gl, material),
           OperateTypeArrayLightMaterialService.getTextureIndex(.
             material,
             specularTextureIndices,
           ),
           MapUnitLightMaterialRenderService.setSpecularMapUnit,
         );

    state;
  };