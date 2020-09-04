open Js.Typed_array;

let create = () => JobEntity.create("init_camera");

let exec = () => {
  WebGPUCPDoService.getDevice()
  ->OptionSt.get
  ->Result.mapSuccess(device => {
      let cameraBufferData = Float32Array.fromLength(4 + 16 + 16);
      let cameraBufferSize = cameraBufferData |> Float32Array.byteLength;

      let cameraBuffer =
        UniformBufferVO.createFromDevice(device, cameraBufferSize);

      CameraCPRepo.setCameraBufferData(cameraBuffer, cameraBufferData);

      ();
    })
  ->WonderBsMost.Most.just;
};
