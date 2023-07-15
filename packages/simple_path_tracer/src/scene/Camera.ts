import * as THREE from "three";
import { getConfig } from "../data/Repo";

export let createCamera = ({
    localPosition = [0, 0, 2],
    lookAt = [0, 0, 0],
    fovy = 60,
    near = 0.01,
    far = 100000
}) => {
    let { width, height } = getConfig();

    let camera = new THREE.PerspectiveCamera(fovy, width / height, near, far);

    camera.position.set(localPosition[0], localPosition[1], localPosition[2]);

    camera.lookAt(new THREE.Vector3(lookAt[0], lookAt[1], lookAt[2]));

    return camera;
}