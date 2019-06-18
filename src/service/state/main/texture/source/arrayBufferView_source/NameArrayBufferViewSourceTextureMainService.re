open StateDataMainType;

open ArrayBufferViewSourceTextureType;

let getName = (texture, state) =>
  NameService.getName(
    texture,
    RecordArrayBufferViewSourceTextureMainService.getRecord(state).nameMap,
  );

let unsafeGetName = (texture, state) =>
  NameService.unsafeGetName(
    texture,
    RecordArrayBufferViewSourceTextureMainService.getRecord(state).nameMap,
  );

let setName =
  (. texture, name, state) => {
    let {nameMap} as record =
      RecordArrayBufferViewSourceTextureMainService.getRecord(state);

    {
      ...state,
      arrayBufferViewSourceTextureRecord:
        Some({
          ...record,
          nameMap: NameService.setName(texture, name, nameMap),
        }),
    };
  };