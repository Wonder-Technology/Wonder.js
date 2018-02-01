open AmbientLightType;

open StateDataType;

open AmbientLightStateCommon;

let getColor = (mappedIndex, state: StateDataType.state) =>
  AmbientLightHelper.getColor(mappedIndex, getLightData(state).colors);

let setColor = (mappedIndex, color: array(float), state: StateDataType.state) => {
  ...state,
  ambientLightData: {
    ...getLightData(state),
    colors: AmbientLightHelper.setColor(mappedIndex, color, getLightData(state).colors)
  }
};