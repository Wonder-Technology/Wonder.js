open BufferTextureService;

let getWidth = (index, typeArr) => TypeArrayService.getFloat1(getWidthIndex(index), typeArr);

let setWidth = (index, data, typeArr) =>
  TypeArrayService.setFloat1(getWidthIndex(index), data, typeArr);

let getHeight = (index, typeArr) => TypeArrayService.getFloat1(getHeightIndex(index), typeArr);

let setHeight = (index, data, typeArr) =>
  TypeArrayService.setFloat1(getHeightIndex(index), data, typeArr);

let getIsNeedUpdate = (index, typeArr) =>
  TypeArrayService.getUInt8_1(getIsNeedUpdateIndex(index), typeArr);

let setIsNeedUpdate = (index, data, typeArr) =>
  TypeArrayService.setUInt8_1(getIsNeedUpdateIndex(index), data, typeArr);

/* TODO add typeArrays */
let getWrapS = (gl) => gl |> Gl.getClampToEdge;

let getWrapT = (gl) => gl |> Gl.getClampToEdge;

let getMagFilter = (gl) => gl |> Gl.getLinear;

let getMinFilter = (gl) => gl |> Gl.getNearest;

let getFormat = (gl) => gl |> Gl.getRgba;

let getType = (gl) => gl |> Gl.getUnsignedByte;

let getFlipY = () => true;