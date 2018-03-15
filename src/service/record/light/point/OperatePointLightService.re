open PointLightType;

let getColor = (mappedIndex, {colors}) => RecordPointLightService.getColor(mappedIndex, colors);

let setColor = (mappedIndex, color: array(float), {colors} as record) => {
  ...record,
  colors: RecordAmbientLightService.setColor(mappedIndex, color, colors)
};

let getIntensity = (mappedIndex, {intensities}) =>
  RecordPointLightService.getIntensity(mappedIndex, intensities);

let setIntensity = (mappedIndex, intensity, {intensities} as record) => {
  ...record,
  intensities: RecordPointLightService.setIntensity(mappedIndex, intensity, intensities)
};

let getConstant = (mappedIndex, {constants}) =>
  RecordPointLightService.getConstant(mappedIndex, constants);

let setConstant = (mappedIndex, constant, {constants} as record) => {
  ...record,
  constants: RecordPointLightService.setIntensity(mappedIndex, constant, constants)
};

let getLinear = (mappedIndex, {linears}) =>
  RecordPointLightService.getLinear(mappedIndex, linears);

let setLinear = (mappedIndex, linear, {linears} as record) => {
  ...record,
  linears: RecordPointLightService.setLinear(mappedIndex, linear, linears)
};

let getQuadratic = (mappedIndex, {quadratics}) =>
  RecordPointLightService.getQuadratic(mappedIndex, quadratics);

let setQuadratic = (mappedIndex, quadratic, {quadratics} as record) => {
  ...record,
  quadratics: RecordPointLightService.setQuadratic(mappedIndex, quadratic, quadratics)
};

let getRange = (mappedIndex, {ranges}) => RecordPointLightService.getRange(mappedIndex, ranges);

let setRange = (mappedIndex, range, {ranges} as record) => {
  ...record,
  ranges: RecordPointLightService.setRange(mappedIndex, range, ranges)
};

/* let setRangeLevel = (mappedIndex, level, {linears, quadratics, ranges} as record) =>
   switch level {
   | 0 => {
       ...record,
       ranges: setRange(mappedIndex, 7., record),
       linears: setLinear(mappedIndex, 0.7, record),
       quadratics: setQuadratic(mappedIndex, 1.8, record)
     }
   | 1 => {
       ...record,
       ranges: setRange(mappedIndex, 13., record),
       linears: setLinear(mappedIndex, 0.35, record),
       quadratics: setQuadratic(mappedIndex, 0.44, record)
     }
   | 2 => {
       ...record,
       ranges: setRange(mappedIndex, 20., record),
       linears: setLinear(mappedIndex, 0.22, record),
       quadratics: setQuadratic(mappedIndex, 0.20, record)
     }
   | 3 => {
       ...record,
       ranges: setRange(mappedIndex, 32., record),
       linears: setLinear(mappedIndex, 0.14, record),
       quadratics: setQuadratic(mappedIndex, 0.07, record)
     }
   | 4 => {
       ...record,
       ranges: setRange(mappedIndex, 50., record),
       linears: setLinear(mappedIndex, 0.09, record),
       quadratics: setQuadratic(mappedIndex, 0.032, record)
     }
   | 5 => {
       ...record,
       ranges: setRange(mappedIndex, 65., record),
       linears: setLinear(mappedIndex, 0.07, record),
       quadratics: setQuadratic(mappedIndex, 0.017, record)
     }
   | 6 => {
       ...record,
       ranges: setRange(mappedIndex, 100., record),
       linears: setLinear(mappedIndex, 0.045, record),
       quadratics: setQuadratic(mappedIndex, 0.0075, record)
     }
   | 7 => {
       ...record,
       ranges: setRange(mappedIndex, 160., record),
       linears: setLinear(mappedIndex, 0.027, record),
       quadratics: setQuadratic(mappedIndex, 0.0028, record)
     }
   | 8 => {
       ...record,
       ranges: setRange(mappedIndex, 200., record),
       linears: setLinear(mappedIndex, 0.022, record),
       quadratics: setQuadratic(mappedIndex, 0.0019, record)
     }
   | 9 => {
       ...record,
       ranges: setRange(mappedIndex, 325., record),
       linears: setLinear(mappedIndex, 0.014, record),
       quadratics: setQuadratic(mappedIndex, 0.0007, record)
     }
   | 10 => {
       ...record,
       ranges: setRange(mappedIndex, 600., record),
       linears: setLinear(mappedIndex, 0.007, record),
       quadratics: setQuadratic(mappedIndex, 0.0002, record)
     }
   | 11 => {
       ...record,
       ranges: setRange(mappedIndex, 3250., record),
       linears: setLinear(mappedIndex, 0.0014, record),
       quadratics: setQuadratic(mappedIndex, 0.000007, record)
     }
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
   }; */
let setRangeLevel = (mappedIndex, level, {linears, quadratics, ranges} as record) =>
  switch level {
  | 0 =>
    record
    |> setRange(mappedIndex, 7.)
    |> setLinear(mappedIndex, 0.7)
    |> setQuadratic(mappedIndex, 1.8)
  | 1 =>
    record
    |> setRange(mappedIndex, 13.)
    |> setLinear(mappedIndex, 0.35)
    |> setQuadratic(mappedIndex, 0.44)
  | 2 =>
    record
    |> setRange(mappedIndex, 20.)
    |> setLinear(mappedIndex, 0.22)
    |> setQuadratic(mappedIndex, 0.20)
  | 3 =>
    record
    |> setRange(mappedIndex, 32.)
    |> setLinear(mappedIndex, 0.14)
    |> setQuadratic(mappedIndex, 0.07)
  | 4 =>
    record
    |> setRange(mappedIndex, 50.)
    |> setLinear(mappedIndex, 0.09)
    |> setQuadratic(mappedIndex, 0.032)
  | 5 =>
    record
    |> setRange(mappedIndex, 65.)
    |> setLinear(mappedIndex, 0.07)
    |> setQuadratic(mappedIndex, 0.017)
  | 6 =>
    record
    |> setRange(mappedIndex, 100.)
    |> setLinear(mappedIndex, 0.045)
    |> setQuadratic(mappedIndex, 0.0075)
  | 7 =>
    record
    |> setRange(mappedIndex, 160.)
    |> setLinear(mappedIndex, 0.027)
    |> setQuadratic(mappedIndex, 0.0028)
  | 8 =>
    record
    |> setRange(mappedIndex, 200.)
    |> setLinear(mappedIndex, 0.022)
    |> setQuadratic(mappedIndex, 0.0019)
  | 9 =>
    record
    |> setRange(mappedIndex, 325.)
    |> setLinear(mappedIndex, 0.014)
    |> setQuadratic(mappedIndex, 0.0007)
  | 10 =>
    record
    |> setRange(mappedIndex, 600.)
    |> setLinear(mappedIndex, 0.007)
    |> setQuadratic(mappedIndex, 0.0002)
  | 11 =>
    record
    |> setRange(mappedIndex, 3250.)
    |> setLinear(mappedIndex, 0.0014)
    |> setQuadratic(mappedIndex, 0.000007)
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