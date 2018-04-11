open AmbientLightType;

let getColor = (mappedIndex, {colors}) => RecordAmbientLightMainService.getColor(mappedIndex, colors);

let setColor = (mappedIndex, color: array(float), {colors} as record) => {
  ...record,
  colors: RecordAmbientLightMainService.setColor(mappedIndex, color, colors)
};