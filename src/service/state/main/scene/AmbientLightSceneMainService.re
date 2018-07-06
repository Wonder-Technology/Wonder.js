open StateDataMainType;

let getAmbientLightColor = state =>
  RecordSceneMainService.getRecord(state).ambientLight.color;

let setAmbientLightColor = (color, state) => {
  ...state,
  sceneRecord:
    Some({
      ...RecordSceneMainService.getRecord(state),
      ambientLight: {
        color: color,
      },
    }),
};