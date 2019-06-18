open StateDataMainType;

open CubemapTextureType;

let getName = (texture, state) =>
  NameService.getName(
    texture,
    RecordCubemapTextureMainService.getRecord(state).nameMap,
  );

let unsafeGetName = (texture, state) =>
  NameService.unsafeGetName(
    texture,
    RecordCubemapTextureMainService.getRecord(state).nameMap,
  );

let setName = (texture, name, state) => {
  let {nameMap} as record = RecordCubemapTextureMainService.getRecord(state);

  {
    ...state,
    cubemapTextureRecord:
      Some({
        ...record,
        nameMap: NameService.setName(texture, name, nameMap),
      }),
  };
};