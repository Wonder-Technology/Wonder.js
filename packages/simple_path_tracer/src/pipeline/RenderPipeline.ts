import { exec as execRenderPathTracingPassJob } from "./jobs/render/RenderPathTracingPassJob";
import { exec as execRenderScreenPassJob } from "./jobs/render/RenderScreenPassJob";

export let exec = () => {
    execRenderPathTracingPassJob();
    execRenderScreenPassJob();
}
