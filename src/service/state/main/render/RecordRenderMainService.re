open StateDataMainType;

open RenderType;

let getRecord = state => state.renderRecord |> OptionService.unsafeGet;

let create = state => {
  state.renderRecord =
    Some({
      basicRenderObjectRecord:
        RecordBasicRenderObjectMainService.create(state),
      lightRenderObjectRecord:
        RecordLightRenderObjectMainService.create(state),
      cameraRecord: None,
      textureRecord: None,
    });
  state;
};