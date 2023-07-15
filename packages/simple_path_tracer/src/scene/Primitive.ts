import * as THREE from "three";
import { convertDegToRad } from "./utils/TransformUtils";
import { createBRDFLambertianMaterial } from "./BRDFLambertianMaterial";
import { createBRDFSpecularReflectionMaterial } from "./BRDFSpecularReflectionMaterial";

let _hasMaterialData = (materialData) => materialData !== null && materialData !== undefined;

let _createMaterial = (lambertianMaterialData, specularReflectionMaterialData) => {
    if (_hasMaterialData(lambertianMaterialData)) {
        return createBRDFLambertianMaterial(lambertianMaterialData) as any;
    }

    return createBRDFSpecularReflectionMaterial(specularReflectionMaterialData) as any;
}

export let createSphere = ({ localPosition, localEulerAngles, radius }, lambertianMaterialData, specularReflectionMaterialData) => {
    localEulerAngles = convertDegToRad(localEulerAngles);
    // let widthSegments = 20;
    // let heightSegments = 20;
    let widthSegments = 10;
    let heightSegments = 10;

    let material = _createMaterial(lambertianMaterialData, specularReflectionMaterialData);
    let geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(localPosition[0], localPosition[1], localPosition[2]);
    mesh.rotation.set(localEulerAngles[0], localEulerAngles[1], localEulerAngles[2]);

    // console.log(geometry.getAttribute("position").array.length)

    return mesh;
}

export let createPlane = ({ localPosition, localEulerAngles, width, height }, lambertianMaterialData, specularReflectionMaterialData) => {
    localEulerAngles = convertDegToRad(localEulerAngles);

    let geometry = new THREE.PlaneBufferGeometry(width, height, 1, 1);

    let material = _createMaterial(lambertianMaterialData, specularReflectionMaterialData);

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(localPosition[0], localPosition[1], localPosition[2]);
    mesh.rotation.set(localEulerAngles[0], localEulerAngles[1], localEulerAngles[2]);

    return mesh;
}