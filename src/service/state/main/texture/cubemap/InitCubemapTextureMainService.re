open StateDataMainType;

/* TODO add init texture logic after add skybox material */

let clearNeedInitedTextureIndexArray = state => {
  ...state,
  cubemapTextureRecord:
    Some({
      ...RecordCubemapTextureMainService.getRecord(state),
      needInitedTextureIndexArray: [||],
    }),
};