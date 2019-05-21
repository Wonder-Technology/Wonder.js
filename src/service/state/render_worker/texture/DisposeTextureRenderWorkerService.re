open StateDataRenderWorkerType;

open RenderWorkerBasicSourceTextureType;

let disposeGlTextureMap = (texture, state) => {
  let gl = DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

  let {glTextureMap} as basicSourceTextureRecord =
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