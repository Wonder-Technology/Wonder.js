open BasicMaterialType;

open MainStateDataType;

let unsafeGetColor = (material, {basicMaterialRecord}) =>
  ColorMapService.unsafeGetColor(material, basicMaterialRecord.colorMap);

let setColor = (material, color: array(float), {basicMaterialRecord} as state) => {
  ...state,
  basicMaterialRecord: {
    ...basicMaterialRecord,
    colorMap: ColorMapService.setColor(material, color, basicMaterialRecord.colorMap)
  }
};