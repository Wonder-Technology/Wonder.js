import THREE from "three";
import { convertDegToRad } from "./utils/TransformUtils";
import { createBRDFLambertianMaterial } from "./BRDFLambertianMaterial";

export let createRectAreaLight = ({ localPosition, localEulerAngles, lemit, width, height }) => {
    localEulerAngles = convertDegToRad(localEulerAngles);

    let material = createBRDFLambertianMaterial({ isRectAreaLight: true }) as any;

    let geometry = new THREE.PlaneBufferGeometry(width, height, 1, 1);

    let mesh = new THREE.Mesh(geometry, material) as any;
    mesh.position.set(localPosition[0], localPosition[1], localPosition[2]);
    mesh.rotation.set(localEulerAngles[0], localEulerAngles[1], localEulerAngles[2]);

    mesh.lemit = lemit;
    mesh.geometry_size = [width, height];

    return mesh;
}