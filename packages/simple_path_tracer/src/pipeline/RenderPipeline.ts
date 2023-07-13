import { exec as execRenderRayTracingPassJob } from "./jobs/render/RenderRayTracingPassJob";
import { exec as execRenderScreenPassJob } from "./jobs/render/RenderScreenPassJob";

export let exec = () => {
    execRenderRayTracingPassJob();
    execRenderScreenPassJob();
}
