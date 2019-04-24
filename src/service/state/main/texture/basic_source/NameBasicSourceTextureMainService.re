open StateDataMainType;

open BasicSourceTextureType;

let getName = (texture, state) =>
  NameService.getName(
    texture,
    RecordBasicSourceTextureMainService.getRecord(state).nameMap,
  );

let unsafeGetName = (texture, state) =>
  NameService.unsafeGetName(
    texture,
    RecordBasicSourceTextureMainService.getRecord(state).nameMap,
  );

let setName = (texture, name, state) => {
  let {nameMap} as record =
    RecordBasicSourceTextureMainService.getRecord(state);

  {
    ...state,
    basicSourceTextureRecord:
      Some({
        ...record,
        nameMap: NameService.setName(texture, name, nameMap),
      }),
  };
};