open AmbientLightType;

let getColor = (mappedIndex, {colors}) => RecordAmbientLightService.getColor(mappedIndex, colors);

let setColor = (mappedIndex, color: array(float), {colors} as record) => {
  ...record,
  colors: RecordAmbientLightService.setColor(mappedIndex, color, colors)
};