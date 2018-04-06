open RenderDirectionLightType;

let getColor = (mappedIndex, {colors}) =>
  RecordDirectionLightService.getColor(mappedIndex, colors);

let getIntensity = (mappedIndex, {intensities}) =>
  RecordDirectionLightService.getIntensity(mappedIndex, intensities);