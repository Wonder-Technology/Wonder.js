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
        DpContainer.unsafeGetWebGPUCoreDp().device.createCommandEncoder(
          IWebGPUCoreDp.commandEncoderDescriptor(),
          device,
        );
      let rtPass =
        DpContainer.unsafeGetWebGPURayTracingDp().commandEncoder.
          beginRayTracingPass(
          IWebGPURayTracingDp.passEncoderRayTracingDescriptor(),
          commandEncoder,
        );

      DpContainer.unsafeGetWebGPURayTracingDp().passEncoderRayTracing.
        setPipeline(
        pipeline,
        rtPass,
      );

      PathTracingPassCPRepo.getAllStaticBindGroupData()
      ->ListSt.forEach(
          ({setSlot, bindGroup}: PassCPPOType.staticBindGroupData) => {
          DpContainer.unsafeGetWebGPURayTracingDp().passEncoderRayTracing.
            setBindGroup(
            setSlot,
            bindGroup,
            rtPass,
          )
        });

      DpContainer.unsafeGetWebGPURayTracingDp().passEncoderRayTracing.traceRays(
        0, // sbt ray-generation offset
        1, // sbt ray-hit offset
        2, // sbt ray-miss offset
        DpContainer.unsafeGetWebGPUCoreDp().window.getWidth(window),
        DpContainer.unsafeGetWebGPUCoreDp().window.getHeight(window),
        1, // query depth dimension
        rtPass,
      );

      DpContainer.unsafeGetWebGPURayTracingDp().passEncoderRayTracing.endPass(
        rtPass,
      );

      DpContainer.unsafeGetWebGPUCoreDp().queue.submit(
        [|
          DpContainer.unsafeGetWebGPUCoreDp().commandEncoder.finish(
            commandEncoder,
          ),
        |],
        queue,
      );
    })
  ->WonderBsMost.Most.just;
};
