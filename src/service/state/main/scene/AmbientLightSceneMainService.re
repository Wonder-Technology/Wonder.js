open StateDataMainType;

let getAmbientLightColor = state =>
  RecordSceneMainService.getRecord(state).ambientLightData.color;

let setAmbientLightColor = (color, state) => {
  ...state,
  sceneRecord:
    Some({
      ...RecordSceneMainService.getRecord(state),
      ambientLightData: {
        color: color,
      },
    }),
};