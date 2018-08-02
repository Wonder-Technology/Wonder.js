open BufferMeshRendererService;

let getDrawMode = (index, typeArr) =>
  TypeArrayService.getUint8_1(getDrawModeIndex(index), typeArr);

let setDrawMode = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getDrawModeIndex(index), data, typeArr);