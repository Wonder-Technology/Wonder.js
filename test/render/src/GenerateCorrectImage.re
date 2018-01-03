open RenderTestDataType;

let _getImageType = () => GenerateImageType.CORRECT("correct");

let getAllImagePathDataList = (renderTestData) =>
  GenerateImage.getAllImagePathDataList(renderTestData, _getImageType());

let generate = (renderTestData) => GenerateImage.generate(renderTestData, _getImageType());