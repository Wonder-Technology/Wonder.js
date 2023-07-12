import { getSize } from "../utils/SizeUtils"
import { createBuffer } from "../webgpu/Buffer";

let _buildPixelBufferData = (canvas, device) => {
	let [width, height] = getSize(canvas);
	let bufferSize =
		width *
		height *
		4 *
		Float32Array.BYTES_PER_ELEMENT;

	let buffer = device.createBuffer({
		size: bufferSize,
		usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
	});

	return [buffer, bufferSize];
}

let _buildResolutionBufferData = (canvas, device) => {
	let [width, height] = getSize(canvas);

	let bufferData = new Float32Array([
		width,
		height
	]);

	let buffer = createBuffer(device, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, bufferData)

	return [buffer, bufferData];
}


export let exec = (state) => {
	let { device, canvas } = state

	return {
		...state,
		pass: {
			pixelBufferData: _buildPixelBufferData(canvas, device),
			resolutionBufferData: _buildResolutionBufferData(canvas, device)
		}
	}
}