import { exec as execUpdatePassJob } from "./jobs/update/UpdatePassJob";
import { exec as execUpdateCameraJob } from "./jobs/update/UpdateCameraJob";

export let exec = () => {
    execUpdatePassJob()
    execUpdateCameraJob()
}
