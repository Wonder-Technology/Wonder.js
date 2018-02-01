open AmbientLightType;

open StateDataType;

open AmbientLightStateCommon;

let getColor = (light, state: StateDataType.state) =>
  AmbientLightHelper.getColor(light, getLightData(state).colors);

let setColor = (light, color: array(float), state: StateDataType.state) => {
  ...state,
  ambientLightData: {
    ...getLightData(state),
    colors: AmbientLightHelper.setColor(light, color, getLightData(state).colors)
  }
};