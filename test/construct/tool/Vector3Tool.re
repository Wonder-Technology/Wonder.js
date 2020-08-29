let truncate = ((x, y, z), digit) => (
  FloatTool.truncateFloatValue(x, digit),
  FloatTool.truncateFloatValue(y, digit),
  FloatTool.truncateFloatValue(z, digit),
);
