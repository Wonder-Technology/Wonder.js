open Js.Typed_array;

let getCameraBufferData = () => CameraCPRepo.getCameraBufferData();

let createAndSetCameraBufferData = () => {
  let bufferData = Float32Array.fromLength(16 + 16 + 4);
  let buffer = WebGPUDependencyTool.createBufferObject();

  (buffer->UniformBufferVO.create, bufferData)
  ->CameraCPRepo.setCameraBufferData;
};
