open StateRenderType;

let getTextureIndex = (material, mapUnit, getTextureIndexFunc, (textureIndices, settingRecord)) =>
  getTextureIndexFunc(
    (material, mapUnit, OperateRenderSettingService.getTextureCountPerMaterial(settingRecord)),
    textureIndices
  );

let bindAndUpdate =
    (
      (gl, material, mapUnit),
      getTextureIndexFunc,
      (textureIndices, settingRecord, state) as stateDataTuple
    ) =>
  MapUnitService.hasMap(mapUnit) ?
    {
      let texture =
        getTextureIndex(material, mapUnit, getTextureIndexFunc, (textureIndices, settingRecord));
      let state = state |> BindTextureRenderService.bind(gl, mapUnit, texture);
      (textureIndices, settingRecord, UpdateTextureRenderService.handleUpdate(gl, texture, state))
    } :
    stateDataTuple;