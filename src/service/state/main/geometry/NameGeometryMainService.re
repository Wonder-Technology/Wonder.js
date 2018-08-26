open StateDataMainType;

open GeometryType;

let getName = (geometry, state) =>
  NameService.getName(
    geometry,
    RecordGeometryMainService.getRecord(state).nameMap,
  );

let unsafeGetName = (geometry, state) =>
  NameService.unsafeGetName(
    geometry,
    RecordGeometryMainService.getRecord(state).nameMap,
  );

let setName = (geometry, name, state) => {
  let {nameMap} as record = RecordGeometryMainService.getRecord(state);

  {
    ...state,
    geometryRecord:
      Some({
        ...record,
        nameMap: NameService.setName(geometry, name, nameMap),
      }),
  };
};