open StateRenderType;

open RenderLightMaterialType;

/* TODO duplicate */
let _getTextureIndex = (material, mapUnit, textureIndices, settingRecord) =>
  OperateTypeArrayLightMaterialService.getTextureIndex(
    (material, mapUnit, OperateRenderSettingService.getTextureCountPerMaterial(settingRecord)),
    textureIndices
  );

let _update = (gl, material, mapUnit, (textureIndices, settingRecord, state) as stateDataTuple) =>
  MapUnitService.hasMap(mapUnit) ?
    {
      let texture = _getTextureIndex(material, mapUnit, textureIndices, settingRecord);
      let state = state |> BindTextureRenderService.bind(gl, mapUnit, texture);
      let state =
        UpdateTextureRenderService.isNeedUpdate(texture, state) ?
          UpdateTextureRenderService.update(gl, texture, state) : state;
      stateDataTuple
    } :
    stateDataTuple;

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
        |> _update(gl, material, diffuseMapUnit)
        |> _update(gl, material, specularMapUnit);
      state
    }
  );