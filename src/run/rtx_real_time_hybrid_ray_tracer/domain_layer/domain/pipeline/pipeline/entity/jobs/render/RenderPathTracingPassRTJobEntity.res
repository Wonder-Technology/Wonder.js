

let create = () => JobEntity.create("render_pathTracing_pass")

let exec = () =>
  Tuple4.collectOption(
    WebGPURTRepo.getDevice(),
    WebGPURTRepo.getQueue(),
    WebGPURTRepo.getWindow(),
    PathTracingPassRTRepo.getPipeline(),
  )
  ->Result.mapSuccess(((device, queue, window, pipeline)) => {
    let commandEncoder = WebGPUCoreDpRunAPI.unsafeGet().device.createCommandEncoder(
      IWebGPUCoreDp.commandEncoderDescriptor(),
      device,
    )
    let rtPass = WebGPURayTracingDpRunAPI.unsafeGet().commandEncoder.beginRayTracingPass(
      IWebGPURayTracingDp.passEncoderRayTracingDescriptor(),
      commandEncoder,
    )

    WebGPURayTracingDpRunAPI.unsafeGet().passEncoder.setPipeline(pipeline, rtPass)

    PathTracingPassRTRepo.getAllStaticBindGroupData()->ListSt.forEach(({
      setSlot,
      bindGroup,
    }: PassRTPOType.staticBindGroupData) =>
      WebGPURayTracingDpRunAPI.unsafeGet().passEncoder.setBindGroup(setSlot, bindGroup, rtPass)
    )

    WebGPURayTracingDpRunAPI.unsafeGet().passEncoder.traceRays(
      0, // sbt ray_generation offset
      1, // sbt ray-hit offset
      3, // sbt ray_miss offset
      WebGPUCoreDpRunAPI.unsafeGet().window.getWidth(window),
      WebGPUCoreDpRunAPI.unsafeGet().window.getHeight(window),
      1, // query depth dimension
      rtPass,
    )

    WebGPURayTracingDpRunAPI.unsafeGet().passEncoder.endPass(rtPass)

    WebGPUCoreDpRunAPI.unsafeGet().queue.submit(
      [WebGPUCoreDpRunAPI.unsafeGet().commandEncoder.finish(commandEncoder)],
      queue,
    )
  })
  ->WonderBsMost.Most.just
