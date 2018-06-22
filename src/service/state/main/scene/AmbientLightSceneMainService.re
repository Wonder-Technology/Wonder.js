open SceneType;

let getAmbientLightColor = ({ambientLight}) => ambientLight.color;

let setAmbientLightColor = (color, {ambientLight} as record) => {
  ...record,
  ambientLight: {
    color: color,
  },
};