open BufferMeshRendererService;

let getDrawMode = (index, typeArr) =>
  TypeArrayService.getUint8_1(getDrawModeIndex(index), typeArr);

let setDrawMode = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getDrawModeIndex(index), data, typeArr);

let getIsRender = (index, typeArr) =>
  TypeArrayService.getUint8_1(getIsRenderIndex(index), typeArr);

let setIsRender = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getIsRenderIndex(index), data, typeArr);