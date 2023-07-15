import { exec as execInitWebGPUJob } from "./jobs/init/InitWebGPUJob";
import { exec as execInitCameraJob } from "./jobs/init/InitCameraJob";
import { exec as execInitPassJob } from "./jobs/init/InitPassJob";
import { exec as execInitRayTracingPassJob } from "./jobs/init/InitPathTracingPassJob";
import { exec as execInitScreenPassJob } from "./jobs/init/InitScreenPassJob";
import { getConfig, setCanvas } from "../data/Repo";

export let exec = async () => {
    let { width, height } = getConfig()
    let canvas = document.querySelector("#webgpu") as HTMLCanvasElement
    canvas.width = width;
    canvas.style.width = width + "px";
    canvas.height = height;
    canvas.style.height = height + "px";
    setCanvas(canvas)



    await execInitWebGPUJob();
    execInitCameraJob();
    execInitPassJob();
    execInitRayTracingPassJob();
    execInitScreenPassJob();
}
