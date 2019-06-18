open StateRenderType;

let _setMapUnit = (material, unit, unitMap) =>
  unitMap |> WonderCommonlib.MutableSparseMapService.set(material, unit);

let setDiffuseMapUnit = (material, unit, {lightMaterialRecord} as state) => {
  _setMapUnit(material, unit, lightMaterialRecord.diffuseMapUnitMap) |> ignore;

  state;
};

let setSpecularMapUnit = (material, unit, {lightMaterialRecord} as state) => {
  _setMapUnit(material, unit, lightMaterialRecord.specularMapUnitMap)
  |> ignore;

  state;
};