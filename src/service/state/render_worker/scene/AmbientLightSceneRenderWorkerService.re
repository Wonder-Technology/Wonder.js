open StateDataRenderWorkerType;

let getAmbientLightColor = ({sceneRecord}) => sceneRecord.ambientLight.color;

let setAmbientLightColor = (color, {sceneRecord} as state) => {
  ...state,
  sceneRecord: {
    ambientLight: {
      color: color,
    },
  },
};