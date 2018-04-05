open DirectionLightType;

let getColor = (mappedIndex, {colors}) =>
  RecordDirectionLightService.getColor(mappedIndex, colors);

let setColor = (mappedIndex, color: array(float), {colors} as record) => {
  ...record,
  colors: RecordDirectionLightService.setColor(mappedIndex, color, colors)
};

let getIntensity = (mappedIndex, {intensities}) =>
  RecordDirectionLightService.getIntensity(mappedIndex, intensities);

let setIntensity = (mappedIndex, intensity, {intensities} as record) => {
  ...record,
  intensities: RecordDirectionLightService.setIntensity(mappedIndex, intensity, intensities)
};