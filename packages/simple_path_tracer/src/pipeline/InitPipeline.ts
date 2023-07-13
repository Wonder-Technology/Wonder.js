import { exec as execInitWebGPUJob } from "./jobs/init/InitWebGPUJob";
import { exec as execInitCameraJob } from "./jobs/init/InitCameraJob";
import { exec as execInitPassJob } from "./jobs/init/InitPassJob";
import { exec as execInitRayTracingPassJob } from "./jobs/init/InitPathTracingPassJob";
import { exec as execInitScreenPassJob } from "./jobs/init/InitScreenPassJob";
import { setCanvas } from "../data/Repo";

export let exec = async () => {
    let canvas = document.querySelector("#webgpu")
    setCanvas(canvas)



    await execInitWebGPUJob();
    execInitCameraJob();
    execInitPassJob();
    execInitRayTracingPassJob();
    execInitScreenPassJob();
}
