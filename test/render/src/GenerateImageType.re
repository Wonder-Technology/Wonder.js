type generateData = {
  framePathList: list(float),
  imageName: string
};

type generateDataList = list(generateData);

type imageType('dir) =
  | CORRECT('dir)
  | CURRENT('dir);