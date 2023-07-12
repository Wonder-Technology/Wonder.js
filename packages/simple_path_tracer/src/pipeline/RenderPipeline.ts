import { exec as execRenderRayTracingPassJob } from "../job/ray_tracing_pass/RenderRayTracingPass";
import { exec as execRenderScreenPassJob } from "../job/screen_pass/RenderScreenPass";

export let exec = (state) => {
	// TODO use pipe

	state = execRenderRayTracingPassJob(state)
	state = execRenderScreenPassJob(state);

	return state
}
