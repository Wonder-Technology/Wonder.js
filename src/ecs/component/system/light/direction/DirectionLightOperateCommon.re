open DirectionLightType;

open StateDataType;

open DirectionLightStateCommon;

let getColor = (mappedIndex, state: StateDataType.state) =>
  DirectionLightHelper.getColor(mappedIndex, getLightData(state).colors);

let setColor = (mappedIndex, color: array(float), state: StateDataType.state) => {
  ...state,
  directionLightData: {
    ...getLightData(state),
    colors: DirectionLightHelper.setColor(mappedIndex, color, getLightData(state).colors)
  }
};

let getIntensity = (mappedIndex, state: StateDataType.state) =>
  DirectionLightHelper.getIntensity(mappedIndex, getLightData(state).intensities);

let setIntensity = (mappedIndex, intensity, state: StateDataType.state) => {
  ...state,
  directionLightData: {
    ...getLightData(state),
    intensities:
      DirectionLightHelper.setIntensity(mappedIndex, intensity, getLightData(state).intensities)
  }
};