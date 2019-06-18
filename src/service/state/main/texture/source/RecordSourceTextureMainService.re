open StateDataMainType;

open TextureType;

let getRecord = ({sourceTextureRecord}) => sourceTextureRecord |> OptionService.unsafeGet;

let create = ({settingRecord} as state) => {
  let basicSourceTextureCount = BufferSettingService.getBasicSourceTextureCount(settingRecord);
  let arrayBufferViewSourceTextureCount =
    BufferSettingService.getArrayBufferViewSourceTextureCount(settingRecord);
  let arrayBufferViewSourceTextureCount =
    BufferSettingService.getArrayBufferViewSourceTextureCount(settingRecord);
  state.sourceTextureRecord =
    Some({
      buffer:
        BufferSourceTextureService.createBuffer(
          basicSourceTextureCount,
          arrayBufferViewSourceTextureCount
        )
    });
  state
};