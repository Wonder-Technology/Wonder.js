open StateDataMainType;

open ArrayBufferViewSourceTextureType;

let getRecord = (state) => state.arrayBufferViewSourceTextureRecord |> OptionService.unsafeGet;

let getArrayBufferViewSourceTextureIndex =
    (arrayBufferViewSourceTextureIndex, {settingRecord} as state) =>
  IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndex(
    arrayBufferViewSourceTextureIndex,
    state
  );

/* let unsafeGetTexture = (texture, state) =>
   OperateGlTextureMapService.unsafeGetTexture(texture, getRecord(state).glTextureMap); */
let isNeedUpdate = (texture, state) =>
  OperateTypeArrayArrayBufferViewSourceTextureService.getIsNeedUpdate(
    IndexSourceTextureService.getArrayBufferViewSourceTextureIndexInTypeArray(
      texture,
      IndexSourceTextureMainService.getArrayBufferViewSourceTextureIndexOffset(state)
    ),
    getRecord(state).isNeedUpdates
  )
  === BufferArrayBufferViewSourceTextureService.getDefaultIsNeedUpdate();

let buildSource = () => Js.Typed_array.Uint8Array.make([|1, 255, 255, 255|]);