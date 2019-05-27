open StateDataMainType;

let addMaterial = (materialData, texture, state) =>
  IndexSourceTextureMainService.isBasicSourceTextureIndex(texture, state) ?
    {
      ...state,
      basicSourceTextureRecord:
        Some(
          GroupBasicSourceTextureService.addMaterial(
            materialData,
            texture,
            RecordBasicSourceTextureMainService.getRecord(state),
          ),
        ),
    } :
    IndexSourceTextureMainService.isArrayBufferViewSourceTextureIndex(
      texture,
      state,
    ) ?
      {
        ...state,
        arrayBufferViewSourceTextureRecord:
          Some(
            GroupArrayBufferViewSourceTextureService.addMaterial(
              materialData,
              texture,
              RecordArrayBufferViewSourceTextureMainService.getRecord(state),
            ),
          ),
      } :
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="addMaterial",
          ~description={j|unknown texture: $texture|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      );

let removeMaterial = (materialData, texture, state) =>
  IndexSourceTextureMainService.isBasicSourceTextureIndex(texture, state) ?
    {
      ...state,
      basicSourceTextureRecord:
        Some(
          GroupBasicSourceTextureService.removeMaterial(
            materialData,
            texture,
            RecordBasicSourceTextureMainService.getRecord(state),
          ),
        ),
    } :
    IndexSourceTextureMainService.isArrayBufferViewSourceTextureIndex(
      texture,
      state,
    ) ?
      {
        ...state,
        arrayBufferViewSourceTextureRecord:
          Some(
            GroupArrayBufferViewSourceTextureService.removeMaterial(
              materialData,
              texture,
              RecordArrayBufferViewSourceTextureMainService.getRecord(state),
            ),
          ),
      } :
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="removeMaterial",
          ~description={j|unknown texture: $texture|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      );