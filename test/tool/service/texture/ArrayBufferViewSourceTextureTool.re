open StateDataMainType;

open ArrayBufferViewSourceTextureType;

let getRecord = state =>
  state.arrayBufferViewSourceTextureRecord |> OptionService.unsafeGet;

let generateArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, {settingRecord} as state) =>
  IndexSourceTextureMainService.generateArrayBufferViewSourceTextureIndex(
    arrayBufferViewSourceTextureIndex,
    state,
  );

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    getRecord(state).glTextureMap,
  );

let isNeedUpdate = (texture, state) =>
  OperateTypeArrayAllArrayBufferViewSourceTextureService.getIsNeedUpdate(.
    IndexAllSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(
        state,
      ),
    ),
    getRecord(state).isNeedUpdates,
  )
  === BufferSourceTextureService.getNeedUpdate();

let buildSource = () => Js.Typed_array.Uint8Array.make([|1, 255, 255, 255|]);

let buildSource2 = () => Js.Typed_array.Uint8Array.make([|2, 255, 255, 100|]);

let getDefaultWrapS = () => BufferBasicSourceTextureService.getDefaultWrapS();

let getDefaultWrapT = () => BufferBasicSourceTextureService.getDefaultWrapT();

let getDefaultMagFilter = () =>
  BufferBasicSourceTextureService.getDefaultMagFilter();

let getDefaultMinFilter = () =>
  BufferBasicSourceTextureService.getDefaultMinFilter();

let getDefaultFormat = () =>
  BufferBasicSourceTextureService.getDefaultFormat();

let getDefaultType = () => TextureTypeService.getUnsignedByte();

let getDefaultIsNeedUpdate = () =>
  BufferArrayBufferViewSourceTextureService.getDefaultIsNeedUpdate();

let getDefaultWidth = () =>
  BufferArrayBufferViewSourceTextureService.getDefaultWidth();

let getDefaultHeight = () =>
  BufferArrayBufferViewSourceTextureService.getDefaultHeight();

let getMaterialDataArr = (texture, state) =>
  MaterialsMapService.getMaterialDataArr(
    texture,
    RecordArrayBufferViewSourceTextureMainService.getRecord(state).
      materialsMap,
  );

let unsafeGetMaterialDataArr = (texture, state) =>
  getMaterialDataArr(texture, state) |> OptionService.unsafeGet;

let getNeedAddedSourceArray = state =>
  RecordArrayBufferViewSourceTextureMainService.getRecord(state).
    needAddedSourceArray;

let getNeedInitedTextureIndexArray = state =>
  RecordArrayBufferViewSourceTextureMainService.getRecord(state).
    needInitedTextureIndexArray;

let getArrayBufferViewSourceTextureName =
    (texture, state: StateDataMainType.state) =>
  NameArrayBufferViewSourceTextureMainService.getName(texture, state);

let getArrayBufferViewSourceTextureSource =
    (texture, state: StateDataMainType.state) => {
  let {sourceMap} =
    RecordArrayBufferViewSourceTextureMainService.getRecord(state);

  TextureSourceMapService.getSource(texture, sourceMap);
};

let getTexture = (texture, state) =>
  OperateGlTextureMapService.getTexture(
    texture,
    getRecord(state).glTextureMap,
  );

let unsafeGetTexture = (texture, state) =>
  OperateGlTextureMapService.unsafeGetTexture(
    texture,
    getRecord(state).glTextureMap,
  );

let setGlTexture = (texture, glTexture, state) => {
  OperateGlTextureMapService.setTexture(
    texture,
    glTexture,
    getRecord(state).glTextureMap,
  );

  state;
};

let getArrayBufferViewSourceTextureName =
    (texture, state: StateDataMainType.state) =>
  NameArrayBufferViewSourceTextureMainService.getName(texture, state);

let hasMaterial = (texture, material, state) =>
  switch (
    MaterialsMapService.getMaterialDataArr(
      texture,
      RecordArrayBufferViewSourceTextureMainService.getRecord(state).
        materialsMap,
    )
  ) {
  | Some(arr) =>
    arr
    |> Js.Array.find(((materialInData, _)) => materialInData === material)
    |> Js.Option.isSome
  | _ => false
  };