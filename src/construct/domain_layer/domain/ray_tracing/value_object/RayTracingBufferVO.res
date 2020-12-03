type t = RayTracingBuffer(IWebGPUCoreDp.bufferObject)

let create = value => RayTracingBuffer(value)

let value = buffer =>
  switch buffer {
  | RayTracingBuffer(value) => value
  }

let createFromDevice = (~device, ~bufferSize) =>
  DpContainer.unsafeGetWebGPUCoreDp().device.createBuffer(
    {
      "size": bufferSize,
      "usage": lor(
        DpContainer.unsafeGetWebGPURayTracingDp().bufferUsage.copy_dst,
        DpContainer.unsafeGetWebGPURayTracingDp().bufferUsage.ray_tracing,
      ),
    },
    device,
  )->create
