open RenderTestDataType;

let _getImageType = () => GenerateImageType.CURRENT("current");

let getAllImagePathDataList = (renderTestData) =>
  GenerateImage.getAllImagePathDataList(renderTestData, _getImageType());

let generate = (renderTestData) => GenerateImage.generate(renderTestData, _getImageType());