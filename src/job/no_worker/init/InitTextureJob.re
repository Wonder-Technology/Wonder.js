open StateDataMainType;

open TextureType;

let execJob = (flags, {gameObjectRecord} as state) => {
  let {index, glTextureMap} as textureRecord = RecordTextureMainService.getRecord(state);
  {
    ...state,
    textureRecord:
      Some({
        ...textureRecord,
        glTextureMap:
          InitTextureService.initTextures(
            [@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord),
            index,
            glTextureMap
          )
      })
  }
};