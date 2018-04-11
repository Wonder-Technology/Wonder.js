open DirectionLightType;

let getColor = (mappedIndex, {colors}) =>
  RecordDirectionLightMainService.getColor(mappedIndex, colors);

let setColor = (mappedIndex, color: array(float), {colors} as record) => {
  ...record,
  colors: RecordDirectionLightMainService.setColor(mappedIndex, color, colors)
};

let getIntensity = (mappedIndex, {intensities}) =>
  RecordDirectionLightMainService.getIntensity(mappedIndex, intensities);

let setIntensity = (mappedIndex, intensity, {intensities} as record) => {
  ...record,
  intensities: RecordDirectionLightMainService.setIntensity(mappedIndex, intensity, intensities)
};