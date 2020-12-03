type t = StorageBuffer(IWebGPUCoreDp.bufferObject)

let create = value => StorageBuffer(value)

let value = buffer =>
  switch buffer {
  | StorageBuffer(value) => value
  }

let createFromDevice = (
  ~device,
  ~bufferSize,
  ~usage=DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.storage,
  (),
) =>
  DpContainer.unsafeGetWebGPUCoreDp().device.createBuffer(
    {"size": bufferSize, "usage": usage},
    device,
  )->create
