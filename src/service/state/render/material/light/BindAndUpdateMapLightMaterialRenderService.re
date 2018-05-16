open StateRenderType;

open RenderLightMaterialType;

let bindAndUpdate =
  [@bs]
  (
    (gl, material, {settingRecord, lightMaterialRecord} as state) => {
      let {textureIndices, diffuseMapUnits, specularMapUnits} = lightMaterialRecord;
      let diffuseMapUnit =
        OperateTypeArrayLightMaterialService.getDiffuseMapUnit(material, diffuseMapUnits);
      let specularMapUnit =
        OperateTypeArrayLightMaterialService.getSpecularMapUnit(material, specularMapUnits);
      let (textureIndices, settingRecord, state) =
        (textureIndices, settingRecord, state)
        |> BindAndUpdateMapMaterialRenderService.update(
             (gl, material, diffuseMapUnit),
             OperateTypeArrayLightMaterialService.getTextureIndex
           )
        |> BindAndUpdateMapMaterialRenderService.update(
             (gl, material, specularMapUnit),
             OperateTypeArrayLightMaterialService.getTextureIndex
           );
      state
    }
  );