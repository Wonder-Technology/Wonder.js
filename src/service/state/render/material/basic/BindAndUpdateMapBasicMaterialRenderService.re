open StateRenderType;

let _getTextureIndex = (material, mapUnit, textureIndices, settingRecord) =>
  OperateTypeArrayBasicMaterialService.getTextureIndex(
    (material, mapUnit, OperateRenderSettingService.getTextureCountPerMaterial(settingRecord)),
    textureIndices
  );

let bindAndUpdate = (gl, material, {settingRecord, basicMaterialRecord} as state) => {
  let mapUnit =
    OperateTypeArrayBasicMaterialService.getMapUnit(material, basicMaterialRecord.mapUnits);
  MapUnitService.hasMap(mapUnit) ?
    {
      let texture =
        _getTextureIndex(material, mapUnit, basicMaterialRecord.textureIndices, settingRecord);
      let state = state |> BindTextureRenderService.bind(gl, mapUnit, texture);
      UpdateTextureRenderService.isNeedUpdate(texture, state) ?
        UpdateTextureRenderService.update(gl, texture, state) : state
    } :
    state
};