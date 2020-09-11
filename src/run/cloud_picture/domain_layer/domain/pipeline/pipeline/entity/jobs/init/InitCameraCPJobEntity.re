open Js.Typed_array;

let create = () => JobEntity.create("init_camera");

let _buildCameraBufferData = device => {
  let bufferData = Float32Array.fromLength(16 + 16 + 4);
  let bufferSize = bufferData |> Float32Array.byteLength;

  let buffer = UniformBufferVO.createFromDevice(~device, ~bufferSize);

  (buffer, bufferData);
};

let _buildAndSetAllBufferData = device => {
  _buildCameraBufferData(device)->CameraCPRepo.setCameraBufferData;
};

let exec = () => {
  WebGPUCPRepo.getDevice()
  ->OptionSt.get
  ->Result.mapSuccess(device => {
      _buildAndSetAllBufferData(device);

      ();
    })
  ->WonderBsMost.Most.just;
};
