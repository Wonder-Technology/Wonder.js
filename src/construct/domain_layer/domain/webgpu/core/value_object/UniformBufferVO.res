type t = UniformBuffer(IWebGPUCoreDp.bufferObject)

let create = value => UniformBuffer(value)

let value = buffer =>
  switch buffer {
  | UniformBuffer(value) => value
  }

let createFromDevice = (~device, ~bufferSize) =>
  DpContainer.unsafeGetWebGPUCoreDp().device.createBuffer(
    {
      "size": bufferSize,
      "usage": lor(
        DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.copy_dst,
        DpContainer.unsafeGetWebGPUCoreDp().bufferUsage.uniform,
      ),
    },
    device,
  )->create
