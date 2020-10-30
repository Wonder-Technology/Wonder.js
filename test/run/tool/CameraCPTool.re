open Js.Typed_array;

let getCameraBufferData = () =>
  CameraCPRepo.getCameraBufferData()->OptionSt.getExn;

let buildAndSetAllBufferData = device => {
  InitCameraCPJobEntity._buildAndSetAllBufferData(device);
};
