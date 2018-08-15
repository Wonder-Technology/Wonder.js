open StateDataMainType;

open GeometryType;

let getName = (material, state) =>
  NameService.getName(
    material,
    RecordGeometryMainService.getRecord(state).nameMap,
  );

let unsafeGetName = (material, state) =>
  NameService.unsafeGetName(
    material,
    RecordGeometryMainService.getRecord(state).nameMap,
  );

let setName = (material, name, state) => {
  let {nameMap} as record = RecordGeometryMainService.getRecord(state);

  {
    ...state,
    geometryRecord:
      Some({
        ...record,
        nameMap: NameService.setName(material, name, nameMap),
      }),
  };
};