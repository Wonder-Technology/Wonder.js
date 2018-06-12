open StateDataMainType;

open LightMaterialType;

let unsafeGetName = (material, state) =>
  NameService.unsafeGetName(
    material,
    RecordLightMaterialMainService.getRecord(state).nameMap,
  );

let setName = (material, name, state) => {
  let {nameMap} as record = RecordLightMaterialMainService.getRecord(state);

  {
    ...state,
    lightMaterialRecord:
      Some({
        ...record,
        nameMap: NameService.setName(material, name, nameMap),
      }),
  };
};