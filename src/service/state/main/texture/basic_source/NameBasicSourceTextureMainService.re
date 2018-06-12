open StateDataMainType;

open BasicSourceTextureType;

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