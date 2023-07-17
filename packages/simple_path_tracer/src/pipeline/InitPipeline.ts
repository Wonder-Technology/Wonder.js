import { exec as execInitWebGPUJob } from "./jobs/init/InitWebGPUJob";
import { exec as execInitCameraJob } from "./jobs/init/InitCameraJob";
import { exec as execInitPassJob } from "./jobs/init/InitPassJob";
import { exec as execInitRayTracingPassJob } from "./jobs/init/InitPathTracingPassJob";
import { exec as execInitScreenPassJob } from "./jobs/init/InitScreenPassJob";
import { getConfig, getPass, getScene, setCanvas, setPass } from "../data/Repo";
import { scene, gameObject, transform } from "../scene/SceneGraphConverter";

let _updateCameraLocalPosition = (getLocalPositionFunc) => {
    setPass({
        ...getPass(),
        isCameraMove: true
    })

    let cameraGameObject = scene.getActiveCamera();
    let cameraTransform = gameObject.getTransform(cameraGameObject);

    let localPosition = transform.getLocalPosition(cameraTransform)

    transform.setLocalPosition(cameraTransform, getLocalPositionFunc(localPosition))
}

let _bindEvent = () => {
    (document.querySelector("#x1") as HTMLButtonElement).onclick = (e) => {
        _updateCameraLocalPosition(
            (localPosition) => [localPosition[0] - 0.1, localPosition[1], localPosition[2]]
        )
    }
    (document.querySelector("#x2") as HTMLButtonElement).onclick = (e) => {
        _updateCameraLocalPosition(
            (localPosition) => [localPosition[0] + 0.1, localPosition[1], localPosition[2]]
        )
    }


    (document.querySelector("#y1") as HTMLButtonElement).onclick = (e) => {
        _updateCameraLocalPosition(
            (localPosition) => [localPosition[0], localPosition[1] - 0.1, localPosition[2]]
        )
    }
    (document.querySelector("#y2") as HTMLButtonElement).onclick = (e) => {
        _updateCameraLocalPosition(
            (localPosition) => [localPosition[0], localPosition[1] + 0.1, localPosition[2]]
        )
    }


    (document.querySelector("#z1") as HTMLButtonElement).onclick = (e) => {
        _updateCameraLocalPosition(
            (localPosition) => [localPosition[0], localPosition[1], localPosition[2] - 0.1]
        )
    }
    (document.querySelector("#z2") as HTMLButtonElement).onclick = (e) => {
        _updateCameraLocalPosition(
            (localPosition) => [localPosition[0], localPosition[1], localPosition[2] + 0.1]
        )
    }
}

export let exec = async () => {
    let { width, height } = getConfig()
    let canvas = document.querySelector("#webgpu") as HTMLCanvasElement
    canvas.width = width;
    canvas.style.width = width + "px";
    canvas.height = height;
    canvas.style.height = height + "px";
    setCanvas(canvas)


    _bindEvent()


    await execInitWebGPUJob();
    execInitCameraJob();
    execInitPassJob();
    execInitRayTracingPassJob();
    execInitScreenPassJob();
}
