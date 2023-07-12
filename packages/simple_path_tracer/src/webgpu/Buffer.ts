export let createBuffer = (device, usage, bufferData) => {
	let buffer = device.createBuffer({
		size: bufferData.byteLength,
		usage,
		mappedAtCreation: true,
	});

	new Float32Array(buffer.getMappedRange()).set(bufferData);
	buffer.unmap();

	return buffer
}