open BufferTextureService;

let getWrapS = (index, typeArr) => TypeArrayService.getUint8_1(getWrapSIndex(index), typeArr);

let setWrapS = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getWrapSIndex(index), data, typeArr);

let getWrapT = (index, typeArr) => TypeArrayService.getUint8_1(getWrapTIndex(index), typeArr);

let setWrapT = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getWrapTIndex(index), data, typeArr);

let getMagFilter = (index, typeArr) =>
  TypeArrayService.getUint8_1(getMagFilterIndex(index), typeArr);

let setMagFilter = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getMagFilterIndex(index), data, typeArr);

let getMinFilter = (index, typeArr) =>
  TypeArrayService.getUint8_1(getMinFilterIndex(index), typeArr);

let setMinFilter = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getMinFilterIndex(index), data, typeArr);

let getIsNeedUpdate = (index, typeArr) =>
  TypeArrayService.getUint8_1(getIsNeedUpdateIndex(index), typeArr);

let setIsNeedUpdate = (index, data, typeArr) =>
  TypeArrayService.setUint8_1(getIsNeedUpdateIndex(index), data, typeArr);

/* TODO get from typeArrays */
/* let getWrapS = (gl) => gl |> Gl.getClampToEdge;

let getWrapT = (gl) => gl |> Gl.getClampToEdge;

let getMagFilter = (gl) => gl |> Gl.getLinear;

let getMinFilter = (gl) => gl |> Gl.getNearest; */

let getFormat = (gl) => gl |> Gl.getRgba;

let getType = (gl) => gl |> Gl.getUnsignedByte;

let getFlipY = () => Js.true_;