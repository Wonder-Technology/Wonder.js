open RenderDirectionLightType;

let getColor = (mappedIndex, {colors}) =>
  RecordDirectionLightMainService.getColor(mappedIndex, colors);

let getIntensity = (mappedIndex, {intensities}) =>
  RecordDirectionLightMainService.getIntensity(mappedIndex, intensities);