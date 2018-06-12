open StateRenderType;

open RenderBasicMaterialType;

let bindAndUpdate =
  [@bs]
  (
    (gl, material, {settingRecord, basicMaterialRecord} as state) => {
      let {textureIndices, mapUnits} = basicMaterialRecord;
      let mapUnit =
        OperateTypeArrayBasicMaterialService.getMapUnit(. material, basicMaterialRecord.mapUnits);
      let (textureIndices, settingRecord, state) =
        (textureIndices, settingRecord, state)
        |> BindAndUpdateMapMaterialRenderService.bindAndUpdate(
             (gl, material, mapUnit),
             OperateTypeArrayBasicMaterialService.getTextureIndex
           );
      state
    }
  );