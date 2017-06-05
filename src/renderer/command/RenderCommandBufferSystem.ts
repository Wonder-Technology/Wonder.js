import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import {
    getComponent, getGeometry, getMaterial,
    getTransform
} from "../../core/entityObject/gameObject/GameObjectSystem";
import { getShader } from "../../component/material/MaterialSystem";
import { getDrawMode } from "../../component/geometry/GeometrySystem";
import {
    getLocalToWorldMatrix,
    getTempLocalToWorldMatrix
} from "../../component/transform/ThreeDTransformSystem";
import { getCurrentCamera } from "../../core/entityObject/scene/SceneSystem";
import {
    getPMatrix, getWorldToCameraMatrix
} from "../../component/camera/CameraControllerSystem";
import { getTypeIDFromClass } from "../../component/ComponentTypeIDManager";
import { CameraController } from "../../component/camera/CameraController";
import { DataUtils } from "../../utils/DataUtils";

export var createRenderCommandBuffer = curry((state: Map<any, any>, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, renderGameObjectArray: Array<GameObject>) => {
    let mat4Length = 16;
    var count = renderGameObjectArray.length,
        size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 3,
        buffer:any = null;

    //todo optimize: create buffer once

    //todo handle not support SharedArrayBuffer
    buffer = new SharedArrayBuffer(count * size + 2 * Float32Array.BYTES_PER_ELEMENT * mat4Length);


    let mMatrices = new Float32Array(buffer, 0, count * mat4Length),
        // vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, count * mat4Length),
        // pMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length * 2, count * mat4Length),
        vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length),
        pMatrices = new Float32Array(buffer, (count + 1) * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length),
        materialIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length, count),
        shaderIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT, count),
        geometryIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT * 2, count);
    // drawModes = new Uint16Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length * 3 + Uint32Array.BYTES_PER_ELEMENT * 3, count);

    let currentCamera = getComponent(getCurrentCamera(SceneData), getTypeIDFromClass(CameraController), GameObjectData),
        currentCameraIndex = currentCamera.index;


    DataUtils.setMatrices(vMatrices, getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData), 0);

    DataUtils.setMatrices(pMatrices, getPMatrix(currentCameraIndex, CameraData), 0);




    // for (let gameObject of renderGameObjectArray) {
    for (let i = 0; i < count; i++) {
        let matIndex = 16 * i;

        let gameObject = renderGameObjectArray[i];
        // let command = new RenderCommand(),
        // let currentCamera = getComponent(getCurrentCamera(SceneData), getTypeIDFromClass(CameraController), GameObjectData),
        //     currentCameraIndex = currentCamera.index,
        let geometry = getGeometry(gameObject, GameObjectData),
            material = getMaterial(gameObject, GameObjectData),
            transform = getTransform(gameObject, GameObjectData),
            materialIndex = material.index,
            shader = getShader(materialIndex, MaterialData.shaderMap);

        DataUtils.setMatrices(mMatrices, getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData), matIndex);


        // drawModes[i] = getDrawMode(geometry, GeometryData);
        materialIndices[i] = materialIndex;
        shaderIndices[i] = shader.index;
        geometryIndices[i] = geometry.index;
    }

    return {
        buffer:buffer,
        count:count
    }
})

