import { getConfig, getRayTracingPass, getWebGPU } from "../../../data/Repo";

export let exec = () => {
    let { device } = getWebGPU();
    let {
        bindGroup,
        pipeline
    } = getRayTracingPass();
    let { width, height } = getConfig()

    const commandEncoder = device.createCommandEncoder();

    let workgroup_size = {
        width: 8,
        height: 8
    }

    const passEncoder = commandEncoder.beginComputePass();
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindGroup);
    passEncoder.dispatchWorkgroups(Math.ceil(width / workgroup_size.width), Math.ceil(height / workgroup_size.height));
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
}
