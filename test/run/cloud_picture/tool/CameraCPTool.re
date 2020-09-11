open Js.Typed_array;

let getCameraBufferData = () => CameraCPRepo.getCameraBufferData();

let buildAndSetAllBufferData = device => {
  InitCameraCPJobEntity._buildAndSetAllBufferData(device);
};
