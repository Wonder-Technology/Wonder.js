open StateDataRenderWorkerType;

/* let disposeBasicSourceTextureGlTextureMap = (texture, state) => {
  let gl = AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  let (
        {glTextureMap}: RenderWorkerBasicSourceTextureType.basicSourceTextureRecord
      ) as basicSourceTextureRecord =
    RecordBasicSourceTextureRenderWorkerService.getRecord(state);

  {
    ...state,
    basicSourceTextureRecord:
      Some({
        ...basicSourceTextureRecord,
        glTextureMap:
          DisposeTextureService.disposeGlTextureMap(
            texture,
            gl,
            glTextureMap,
          ),
      }),
  };
};

let disposeArrayBufferViewSourceTextureGlTextureMap = (texture, state) => {
  let gl = AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  let (
        {glTextureMap}: RenderWorkerArrayBufferViewSourceTextureType.arrayBufferViewSourceTextureRecord
      ) as arrayBufferViewSourceTextureRecord =
    RecordArrayBufferViewSourceTextureRenderWorkerService.getRecord(state);

  {
    ...state,
    arrayBufferViewSourceTextureRecord:
      Some({
        ...arrayBufferViewSourceTextureRecord,
        glTextureMap:
          DisposeTextureService.disposeGlTextureMap(
            texture,
            gl,
            glTextureMap,
          ),
      }),
  };
}; */