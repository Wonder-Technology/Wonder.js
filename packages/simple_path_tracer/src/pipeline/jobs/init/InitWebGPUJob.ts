import { getCanvas, getConfig, setWebGPU } from "../../../data/Repo";

export let exec = async () => {
	const adapter = await navigator.gpu.requestAdapter();
	const device = await adapter.requestDevice();

	// if (state.canvas === null) return;
	const context = getCanvas().getContext('webgpu');


	// TODO set devicePixelRatio

	// const devicePixelRatio = window.devicePixelRatio || 1;
	// const presentationSize = [
	//   canvas.clientWidth * devicePixelRatio,
	//   canvas.clientHeight * devicePixelRatio,
	// ];

	const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

	// https://www.w3.org/TR/webgpu/#dictdef-gpucanvasconfiguration
	context.configure({
		device,
		format: presentationFormat,
		// https://www.w3.org/TR/webgpu/#context-sizing
		// size: presentationSize,
		alphaMode: "premultiplied"
	});

    setWebGPU({
        device,
        adapter,
        context,
		format: presentationFormat
    });
}