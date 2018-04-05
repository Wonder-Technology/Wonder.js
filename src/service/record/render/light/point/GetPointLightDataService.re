open PointLightRenderType;

let getColor = (mappedIndex, {colors}) => RecordPointLightService.getColor(mappedIndex, colors);

let getIntensity = (mappedIndex, {intensities}) =>
  RecordPointLightService.getIntensity(mappedIndex, intensities);

let getConstant = (mappedIndex, {constants}) =>
  RecordPointLightService.getConstant(mappedIndex, constants);

let getLiear = (mappedIndex, {linears}) => RecordPointLightService.getLinear(mappedIndex, linears);

let getQuadratic = (mappedIndex, {quadratics}) =>
  RecordPointLightService.getQuadratic(mappedIndex, quadratics);

let getRange = (mappedIndex, {ranges}) => RecordPointLightService.getRange(mappedIndex, ranges);