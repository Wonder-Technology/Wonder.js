import { getSize } from "../../utils/SizeUtils";

export let exec = (state) => {
	let { device, canvas, rayTracingPass } = state
	let { bindGroup, pipeline } = rayTracingPass

	let [width, height] = getSize(canvas)

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

	return state
}