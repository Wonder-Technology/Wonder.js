import { exec as execUpdatePassJob } from "./jobs/update/UpdatePassJob";

export let exec = () => {
    execUpdatePassJob();
}
