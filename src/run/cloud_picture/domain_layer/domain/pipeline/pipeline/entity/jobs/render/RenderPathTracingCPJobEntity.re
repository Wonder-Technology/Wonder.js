let create = () => JobEntity.create("render_pathTracing");

let exec = () => {
  Tuple4.collectOption(
    WebGPUCPRepo.getDevice(),
    WebGPUCPRepo.getQueue(),
    WebGPUCPRepo.getWindow(),
    PathTracingPassCPRepo.getPipeline(),
  )
  ->Result.mapSuccess(((device, queue, window, pipeline)) => {
      let commandEncoder =
        WebGPUCoreDpRunAPI.unsafeGet().device.createCommandEncoder(
          IWebGPUCoreDp.commandEncoderDescriptor(),
          device,
        );
      let rtPass =
        WebGPURayTracingDpRunAPI.unsafeGet().commandEncoder.
          beginRayTracingPass(
          IWebGPURayTracingDp.passEncoderRayTracingDescriptor(),
          commandEncoder,
        );

      WebGPURayTracingDpRunAPI.unsafeGet().passEncoderRayTracing.
        setPipeline(
        pipeline,
        rtPass,
      );

      PathTracingPassCPRepo.getAllStaticBindGroupData()
      ->ListSt.forEach(
          ({setSlot, bindGroup}: PassCPPOType.staticBindGroupData) => {
          WebGPURayTracingDpRunAPI.unsafeGet().passEncoderRayTracing.
            setBindGroup(
            setSlot,
            bindGroup,
            rtPass,
          )
        });

      WebGPURayTracingDpRunAPI.unsafeGet().passEncoderRayTracing.traceRays(
        0, // sbt ray-generation offset
        1, // sbt ray-hit offset
        2, // sbt ray-miss offset
        WebGPUCoreDpRunAPI.unsafeGet().window.getWidth(window),
        WebGPUCoreDpRunAPI.unsafeGet().window.getHeight(window),
        1, // query depth dimension
        rtPass,
      );

      WebGPURayTracingDpRunAPI.unsafeGet().passEncoderRayTracing.endPass(
        rtPass,
      );

      WebGPUCoreDpRunAPI.unsafeGet().queue.submit(
        [|
          WebGPUCoreDpRunAPI.unsafeGet().commandEncoder.finish(
            commandEncoder,
          ),
        |],
        queue,
      );
    })
  ->WonderBsMost.Most.just;
};
