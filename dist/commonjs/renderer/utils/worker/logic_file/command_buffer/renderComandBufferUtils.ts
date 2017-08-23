import { DataBufferConfig } from "../../../../../config/DataBufferConfig";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { Map } from "immutable";
import { GameObject } from "../../../../../core/entityObject/gameObject/GameObject";
import { expect } from "wonder-expect.js";
import { getComponent, getMaterial, getTransform } from "../../../../../core/entityObject/gameObject/GameObjectSystem";
import { ClassUtils } from "../../../../../utils/ClassUtils";
import { initData as initBasicRenderComandBufferData } from "./basicRenderComandBufferUtils";
import { initData as initLightRenderComandBufferData } from "./lightRenderComandBufferUtils";
import { getCurrentCamera } from "../../../../../core/entityObject/scene/SceneSystem";
import { getComponentIdFromClass } from "../../../../../component/ComponentComponentIdManager";
import { CameraController } from "../../../../../component/camera/CameraController";
import { getPMatrix, getWorldToCameraMatrix } from "../../../../../component/camera/CameraControllerSystem";
import { getNormalMatrix, getPosition } from "../../../../../component/transform/ThreeDTransformSystem";

export var createRenderCommandBufferData = requireCheckFunc((state: Map<any, any>, createBasicRenderCommandBufferData:Function, createLightRenderCommandBufferData:Function, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, BasicRenderCommandBufferData:any, LightRenderCommandBufferData:any, renderGameObjectArray: Array<GameObject>) => {
    it("renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count", () => {
        expect(renderGameObjectArray.length).lte(DataBufferConfig.renderCommandBufferCount)
    })
}, (state: Map<any, any>, createBasicRenderCommandBufferData:Function, createLightRenderCommandBufferData:Function, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, BasicRenderCommandBufferData:any, LightRenderCommandBufferData:any, renderGameObjectArray: Array<GameObject>) => {
    var basicMaterialGameObjectArr:Array<GameObject> = [],
        lightMaterialGameObjectArr:Array<GameObject> = [],
        vMatrix:Float32Array = null,
        pMatrix:Float32Array = null,
        cameraPosition:Float32Array = null,
        normalMatrix:Float32Array = null,
        currentCamera = getCurrentCamera(SceneData),
        currentCameraComponent = getComponent(currentCamera, getComponentIdFromClass(CameraController), GameObjectData),
        currentCameraIndex = currentCameraComponent.index,
        currentCameraTransform = getTransform(currentCamera, GameObjectData);

    vMatrix = getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData).values;
    pMatrix = getPMatrix(currentCameraIndex, CameraData).values;
    cameraPosition = getPosition(currentCameraTransform, ThreeDTransformData).values;
    normalMatrix = getNormalMatrix(currentCameraTransform, GlobalTempData, ThreeDTransformData).values;

    for(let gameObject of renderGameObjectArray){
        let material = getMaterial(gameObject, GameObjectData);

        if(ClassUtils.getClassNameByInstance(material) === "BasicMaterial"){
            basicMaterialGameObjectArr.push(gameObject);
        }
        else{
            lightMaterialGameObjectArr.push(gameObject);
        }
    }

    return {
        cameraData:{
            vMatrix:vMatrix,
            pMatrix:pMatrix,
            cameraPosition:cameraPosition,
            normalMatrix:normalMatrix
        },
        basicData: createBasicRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, basicMaterialGameObjectArr),
        lightData:createLightRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, LightRenderCommandBufferData, lightMaterialGameObjectArr)
    }
});

export var initData = (DataBufferConfig: any, BasicRenderCommandBufferData: any, LightRenderCommandBufferData: any) => {
    initBasicRenderComandBufferData(DataBufferConfig, BasicRenderCommandBufferData);
    initLightRenderComandBufferData(DataBufferConfig, LightRenderCommandBufferData);
}
