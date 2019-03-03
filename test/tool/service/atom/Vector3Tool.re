let truncate = (digit, (x, y, z)) => (
  FloatTool.truncateFloatValue(x, digit),
  FloatTool.truncateFloatValue(y, digit),
  FloatTool.truncateFloatValue(z, digit),
);