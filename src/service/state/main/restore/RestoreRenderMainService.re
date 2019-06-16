open StateDataMainType;

open RenderType;

let restore = (currentState, targetState) => {
  let {basicRenderObjectRecord, lightRenderObjectRecord} =
    RecordRenderMainService.getRecord(targetState);
  {
    ...targetState,
    renderRecord:
      Some({
        basicRenderObjectRecord,
        lightRenderObjectRecord,
        cameraRecord: None,
        textureRecord:
          Some({
            activableTextureUnitArray:
              OperateTextureRenderMainService.unsafeGetData(targetState).
                activableTextureUnitArray,
          }),
      }),
  };
};