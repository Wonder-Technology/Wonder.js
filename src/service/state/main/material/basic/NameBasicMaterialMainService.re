open StateDataMainType;

open BasicMaterialType;

let getName = (material, state) =>
  NameService.getName(
    material,
    RecordBasicMaterialMainService.getRecord(state).nameMap,
  );

let unsafeGetName = (material, state) =>
  NameService.unsafeGetName(
    material,
    RecordBasicMaterialMainService.getRecord(state).nameMap,
  );

let setName = (material, name, state) => {
  let {nameMap} as record = RecordBasicMaterialMainService.getRecord(state);

  {
    ...state,
    basicMaterialRecord:
      Some({
        ...record,
        nameMap: NameService.setName(material, name, nameMap),
      }),
  };
};