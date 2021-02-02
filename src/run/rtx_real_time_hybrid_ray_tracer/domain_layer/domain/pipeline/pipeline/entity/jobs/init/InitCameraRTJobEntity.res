open Js.Typed_array

let create = () => JobEntity.create("init_camera")

let _buildCameraBufferData = device => {
  let bufferData = Float32Array.fromLength(16 + 16 + 2)
  let bufferSize = bufferData->Float32Array.byteLength

  let buffer = UniformBufferVO.createFromDevice(~device, ~bufferSize)

  (buffer, bufferData)
}

let _buildAndSetAllBufferData = device =>
  _buildCameraBufferData(device)->CameraRTRepo.setCameraBufferData

let exec = () => WebGPURTRepo.getDevice()->OptionSt.get->Result.mapSuccess(device => {
    _buildAndSetAllBufferData(device)

    ()
  })->WonderBsMost.Most.just
