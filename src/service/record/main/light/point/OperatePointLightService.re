open PointLightType;

let getColor = (light, {colors}) =>
  RecordPointLightMainService.getColor(light, colors);

let setColor = (light, color: array(float), {colors} as record) => {
  ...record,
  colors: RecordPointLightMainService.setColor(light, color, colors),
};

let getIntensity = (light, {intensities}) =>
  RecordPointLightMainService.getIntensity(light, intensities);

let setIntensity = (light, intensity, {intensities} as record) => {
  ...record,
  intensities:
    RecordPointLightMainService.setIntensity(light, intensity, intensities),
};

let getConstant = (light, {constants}) =>
  RecordPointLightMainService.getConstant(light, constants);

let setConstant = (light, constant, {constants} as record) => {
  ...record,
  constants:
    RecordPointLightMainService.setIntensity(light, constant, constants),
};

let getLinear = (light, {linears}) =>
  RecordPointLightMainService.getLinear(light, linears);

let setLinear = (light, linear, {linears} as record) => {
  ...record,
  linears: RecordPointLightMainService.setLinear(light, linear, linears),
};

let getQuadratic = (light, {quadratics}) =>
  RecordPointLightMainService.getQuadratic(light, quadratics);

let setQuadratic = (light, quadratic, {quadratics} as record) => {
  ...record,
  quadratics:
    RecordPointLightMainService.setQuadratic(light, quadratic, quadratics),
};

let getRange = (light, {ranges}) =>
  RecordPointLightMainService.getRange(light, ranges);

let setRange = (light, range, {ranges} as record) => {
  ...record,
  ranges: RecordPointLightMainService.setRange(light, range, ranges),
};

/* let setRangeLevel = (light, level, {linears, quadratics, ranges} as record) =>
   switch level {
   | 0 => {
       ...record,
       ranges: setRange(light, 7., record),
       linears: setLinear(light, 0.7, record),
       quadratics: setQuadratic(light, 1.8, record)
     }
   | 1 => {
       ...record,
       ranges: setRange(light, 13., record),
       linears: setLinear(light, 0.35, record),
       quadratics: setQuadratic(light, 0.44, record)
     }
   | 2 => {
       ...record,
       ranges: setRange(light, 20., record),
       linears: setLinear(light, 0.22, record),
       quadratics: setQuadratic(light, 0.20, record)
     }
   | 3 => {
       ...record,
       ranges: setRange(light, 32., record),
       linears: setLinear(light, 0.14, record),
       quadratics: setQuadratic(light, 0.07, record)
     }
   | 4 => {
       ...record,
       ranges: setRange(light, 50., record),
       linears: setLinear(light, 0.09, record),
       quadratics: setQuadratic(light, 0.032, record)
     }
   | 5 => {
       ...record,
       ranges: setRange(light, 65., record),
       linears: setLinear(light, 0.07, record),
       quadratics: setQuadratic(light, 0.017, record)
     }
   | 6 => {
       ...record,
       ranges: setRange(light, 100., record),
       linears: setLinear(light, 0.045, record),
       quadratics: setQuadratic(light, 0.0075, record)
     }
   | 7 => {
       ...record,
       ranges: setRange(light, 160., record),
       linears: setLinear(light, 0.027, record),
       quadratics: setQuadratic(light, 0.0028, record)
     }
   | 8 => {
       ...record,
       ranges: setRange(light, 200., record),
       linears: setLinear(light, 0.022, record),
       quadratics: setQuadratic(light, 0.0019, record)
     }
   | 9 => {
       ...record,
       ranges: setRange(light, 325., record),
       linears: setLinear(light, 0.014, record),
       quadratics: setQuadratic(light, 0.0007, record)
     }
   | 10 => {
       ...record,
       ranges: setRange(light, 600., record),
       linears: setLinear(light, 0.007, record),
       quadratics: setQuadratic(light, 0.0002, record)
     }
   | 11 => {
       ...record,
       ranges: setRange(light, 3250., record),
       linears: setLinear(light, 0.0014, record),
       quadratics: setQuadratic(light, 0.000007, record)
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
let setRangeLevel = (light, level, {linears, quadratics, ranges} as record) =>
  switch (level) {
  | 0 =>
    record
    |> setRange(light, 7.)
    |> setLinear(light, 0.7)
    |> setQuadratic(light, 1.8)
  | 1 =>
    record
    |> setRange(light, 13.)
    |> setLinear(light, 0.35)
    |> setQuadratic(light, 0.44)
  | 2 =>
    record
    |> setRange(light, 20.)
    |> setLinear(light, 0.22)
    |> setQuadratic(light, 0.20)
  | 3 =>
    record
    |> setRange(light, 32.)
    |> setLinear(light, 0.14)
    |> setQuadratic(light, 0.07)
  | 4 =>
    record
    |> setRange(light, 50.)
    |> setLinear(light, 0.09)
    |> setQuadratic(light, 0.032)
  | 5 =>
    record
    |> setRange(light, 65.)
    |> setLinear(light, 0.07)
    |> setQuadratic(light, 0.017)
  | 6 =>
    record
    |> setRange(light, 100.)
    |> setLinear(light, 0.045)
    |> setQuadratic(light, 0.0075)
  | 7 =>
    record
    |> setRange(light, 160.)
    |> setLinear(light, 0.027)
    |> setQuadratic(light, 0.0028)
  | 8 =>
    record
    |> setRange(light, 200.)
    |> setLinear(light, 0.022)
    |> setQuadratic(light, 0.0019)
  | 9 =>
    record
    |> setRange(light, 325.)
    |> setLinear(light, 0.014)
    |> setQuadratic(light, 0.0007)
  | 10 =>
    record
    |> setRange(light, 600.)
    |> setLinear(light, 0.007)
    |> setQuadratic(light, 0.0002)
  | 11 =>
    record
    |> setRange(light, 3250.)
    |> setLinear(light, 0.0014)
    |> setQuadratic(light, 0.000007)
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="setRangeLevel",
        ~description={j|shouldn't exceed point light range|j},
        ~reason="level is too large",
        ~solution={j|level should in [0, 11]|j},
        ~params={j|level: $level|j},
      ),
    )
  };

let getIsRender = (light, {renderLightArr} as record) =>
  renderLightArr |> Js.Array.includes(light);

let setIsRender = (light, isRender, {renderLightArr} as record) =>
  isRender ?
    {
      ...record,
      renderLightArr:
        renderLightArr
        |> ArrayService.push(light)
        |> WonderCommonlib.ArrayService.removeDuplicateItems,
    } :
    {
      ...record,
      renderLightArr:
        RenderLightArrLightService.removeFromRenderLightArr(
          light,
          renderLightArr,
        ),
    };