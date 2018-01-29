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

let isColorDirty = (light, state: StateDataType.state) =>
  AmbientLightHelper.getIsDirty(light, getLightData(state).isColorDirtys);

let cleanColorDirty = (light, state: StateDataType.state) => {
  ...state,
  ambientLightData: {
    ...getLightData(state),
    isColorDirtys: AmbientLightHelper.setIsDirty(light, 0, getLightData(state).isColorDirtys)
  }
};