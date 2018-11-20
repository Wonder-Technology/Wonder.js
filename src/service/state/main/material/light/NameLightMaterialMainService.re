open StateDataMainType;

open LightMaterialType;

let getName = (material, state) =>
  NameService.getName(
    material,
    RecordLightMaterialMainService.getRecord(state).nameMap,
  );

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
        isNameMapDirtyForDeepCopy: true,
        nameMap: NameService.setName(material, name, nameMap),
      }),
  };
};