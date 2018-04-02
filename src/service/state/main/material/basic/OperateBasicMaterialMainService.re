open BasicMaterialType;

open MainStateDataType;

let getColor = (material, state) =>
  RecordBasicMaterialMainService.getColor(
    material,
    RecordBasicMaterialMainService.getRecord(state).colors
  );

let setColor = (material, color: array(float), state) => {
  let {colors} as basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  {
    ...state,
    basicMaterialRecord:
      Some({
        ...basicMaterialRecord,
        colors: RecordBasicMaterialMainService.setColor(material, color, colors)
      })
  }
};