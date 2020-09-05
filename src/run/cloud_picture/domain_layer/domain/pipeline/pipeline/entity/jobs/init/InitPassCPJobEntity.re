open Js.Typed_array;

let create = () => JobEntity.create("init_pass");

let _buildPixelBufferData = (window, device) => {
  let bufferSize =
    DpContainer.unsafeGetWebGPUCoreDp().window.getWidth(window)
    * DpContainer.unsafeGetWebGPUCoreDp().window.getHeight(window)
    * 4
    * Float32Array._BYTES_PER_ELEMENT;

  let buffer = StorageBufferVO.createFromDevice(~device, ~bufferSize, ());

  (buffer, bufferSize);
};

let _buildCommonBufferData = device => {
  let bufferData = Uint32Array.fromLength(2);
  let bufferSize = bufferData |> Uint32Array.byteLength;

  let buffer = UniformBufferVO.createFromDevice(~device, ~bufferSize);

  (buffer, bufferData);
};

let _buildResolutionBufferData = (window, device) => {
  let bufferData =
    Float32Array.make([|
      DpContainer.unsafeGetWebGPUCoreDp().window.getWidth(window)
      ->Belt.Float.fromInt,
      DpContainer.unsafeGetWebGPUCoreDp().window.getHeight(window)
      ->Belt.Float.fromInt,
    |]);
  let bufferSize = bufferData->Float32Array.byteLength;

  let buffer = UniformBufferVO.createFromDevice(~device, ~bufferSize);

  DpContainer.unsafeGetWebGPUCoreDp().buffer.setSubFloat32Data(
    0,
    bufferData,
    buffer->UniformBufferVO.value,
  );

  (buffer, bufferData);
};

let exec = () => {
  Tuple2.collectOption(WebGPUCPRepo.getWindow(), WebGPUCPRepo.getDevice())
  ->Result.mapSuccess(((window, device)) => {
      _buildPixelBufferData(window, device)->PassCPRepo.setPixelBufferData;

      _buildCommonBufferData(device)->PassCPRepo.setCommonBufferData;

      _buildResolutionBufferData(window, device)
      ->PassCPRepo.setResolutionBufferData;

      ();
    })
  ->WonderBsMost.Most.just;
};
