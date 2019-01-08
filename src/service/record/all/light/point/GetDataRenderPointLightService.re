open RenderPointLightType;

let getColor = (mappedIndex, {colors}) => RecordPointLightMainService.getColor(mappedIndex, colors);

let getIntensity = (mappedIndex, {intensities}) =>
  RecordPointLightMainService.getIntensity(mappedIndex, intensities);

let getConstant = (mappedIndex, {constants}) =>
  RecordPointLightMainService.getConstant(mappedIndex, constants);

let getLiear = (mappedIndex, {linears}) => RecordPointLightMainService.getLinear(mappedIndex, linears);

let getQuadratic = (mappedIndex, {quadratics}) =>
  RecordPointLightMainService.getQuadratic(mappedIndex, quadratics);

let getRange = (mappedIndex, {ranges}) => RecordPointLightMainService.getRange(mappedIndex, ranges);