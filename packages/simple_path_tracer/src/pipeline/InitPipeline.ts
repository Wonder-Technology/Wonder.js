import { exec as execInitCanvasJob } from "../job/InitCanvas";
import { exec as execInitWebGPUJob } from "../job/InitWebGPU";
import { exec as execInitPassJob } from "../job/InitPass";
import { exec as execInitRayTracingPassJob } from "../job/ray_tracing_pass/InitRayTracingPass";
import { exec as execInitScreenPassJob } from "../job/screen_pass/InitScreenPass";

export let exec = async (state) => {
	// TODO use pipe

	state = execInitCanvasJob(state)
	state = await execInitWebGPUJob(state);

	state = execInitPassJob(state);
	state = execInitRayTracingPassJob(state);
	state = execInitScreenPassJob(state);

	return state
}
