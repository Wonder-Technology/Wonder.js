open BasicMaterialType;

open StateDataMainType;

let getColor = (material, state) =>
  OperateTypeArrayBasicMaterialService.getColor(
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
        colors: OperateTypeArrayBasicMaterialService.setColor(material, color, colors)
      })
  }
};

let getMap = (material, state) => ManageMapBasicMaterialMainService.getMap(material, state);

let unsafeGetMap = (material, state) =>
  ManageMapBasicMaterialMainService.unsafeGetMap(material, state);

let setMap = (material, texture, state) =>
  ManageMapBasicMaterialMainService.setMap(material, texture, state);