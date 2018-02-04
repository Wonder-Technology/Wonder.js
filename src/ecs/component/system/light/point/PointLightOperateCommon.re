open PointLightType;

open StateDataType;

open PointLightStateCommon;

let getColor = (mappedIndex, state: StateDataType.state) =>
  PointLightHelper.getColor(mappedIndex, getLightData(state).colors);

let setColor = (mappedIndex, color: array(float), state: StateDataType.state) => {
  ...state,
  pointLightData: {
    ...getLightData(state),
    colors: PointLightHelper.setColor(mappedIndex, color, getLightData(state).colors)
  }
};

let getIntensity = (mappedIndex, state: StateDataType.state) =>
  PointLightHelper.getIntensity(mappedIndex, getLightData(state).intensities);

let setIntensity = (mappedIndex, intensity, state: StateDataType.state) => {
  ...state,
  pointLightData: {
    ...getLightData(state),
    intensities:
      PointLightHelper.setIntensity(mappedIndex, intensity, getLightData(state).intensities)
  }
};

let getConstant = (mappedIndex, state: StateDataType.state) =>
  PointLightHelper.getIntensity(mappedIndex, getLightData(state).constants);

let setConstant = (mappedIndex, constant, state: StateDataType.state) => {
  ...state,
  pointLightData: {
    ...getLightData(state),
    constants: PointLightHelper.setConstant(mappedIndex, constant, getLightData(state).constants)
  }
};

let getLinear = (mappedIndex, state: StateDataType.state) =>
  PointLightHelper.getIntensity(mappedIndex, getLightData(state).linears);

let setLinear = (mappedIndex, linear, state: StateDataType.state) => {
  ...state,
  pointLightData: {
    ...getLightData(state),
    linears: PointLightHelper.setIntensity(mappedIndex, linear, getLightData(state).linears)
  }
};

let getQuadratic = (mappedIndex, state: StateDataType.state) =>
  PointLightHelper.getQuadratic(mappedIndex, getLightData(state).quadratics);

let setQuadratic = (mappedIndex, quadratic, state: StateDataType.state) => {
  ...state,
  pointLightData: {
    ...getLightData(state),
    quadratics:
      PointLightHelper.setQuadratic(mappedIndex, quadratic, getLightData(state).quadratics)
  }
};

let getRange = (mappedIndex, state: StateDataType.state) =>
  PointLightHelper.getIntensity(mappedIndex, getLightData(state).ranges);

let setRange = (mappedIndex, range, state: StateDataType.state) => {
  ...state,
  pointLightData: {
    ...getLightData(state),
    ranges: PointLightHelper.setRange(mappedIndex, range, getLightData(state).ranges)
  }
};

let setRangeLevel = (mappedIndex, level, state: StateDataType.state) =>
  switch level {
  | 0 =>
    setRange(mappedIndex, 7., state);
    setLinear(mappedIndex, 0.7, state);
    setQuadratic(mappedIndex, 1.8, state)
  | 1 =>
    setRange(mappedIndex, 13., state);
    setLinear(mappedIndex, 0.35, state);
    setQuadratic(mappedIndex, 0.44, state)
  | 2 =>
    setRange(mappedIndex, 20., state);
    setLinear(mappedIndex, 0.22, state);
    setQuadratic(mappedIndex, 0.20, state)
  | 3 =>
    setRange(mappedIndex, 32., state);
    setLinear(mappedIndex, 0.14, state);
    setQuadratic(mappedIndex, 0.07, state)
  | 4 =>
    setRange(mappedIndex, 50., state);
    setLinear(mappedIndex, 0.09, state);
    setQuadratic(mappedIndex, 0.032, state)
  | 5 =>
    setRange(mappedIndex, 65., state);
    setLinear(mappedIndex, 0.07, state);
    setQuadratic(mappedIndex, 0.017, state)
  | 6 =>
    setRange(mappedIndex, 100., state);
    setLinear(mappedIndex, 0.045, state);
    setQuadratic(mappedIndex, 0.0075, state)
  | 7 =>
    setRange(mappedIndex, 160., state);
    setLinear(mappedIndex, 0.027, state);
    setQuadratic(mappedIndex, 0.0028, state)
  | 8 =>
    setRange(mappedIndex, 200., state);
    setLinear(mappedIndex, 0.022, state);
    setQuadratic(mappedIndex, 0.0019, state)
  | 9 =>
    setRange(mappedIndex, 325., state);
    setLinear(mappedIndex, 0.014, state);
    setQuadratic(mappedIndex, 0.0007, state)
  | 10 =>
    setRange(mappedIndex, 600., state);
    setLinear(mappedIndex, 0.007, state);
    setQuadratic(mappedIndex, 0.0002, state)
  | 11 =>
    setRange(mappedIndex, 3250., state);
    setLinear(mappedIndex, 0.0014, state);
    setQuadratic(mappedIndex, 0.000007, state)
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="setRangeLevel",
        ~description={j|shouldn't exceed point light range|j},
        ~reason="level is too large",
        ~solution={j|level should in [0, 11]|j},
        ~params={j|level: $level|j}
      )
    )
  };