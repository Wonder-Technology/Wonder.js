import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import {
    getMaterial
} from "../../core/entityObject/gameObject/GameObjectSystem";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DataBufferConfig } from "../../config/DataBufferConfig";
import {
    createRenderCommandBufferData as createBasicRenderCommandBufferData,
    initData as initBasicRenderCommandBufferSystemData
} from "./BasicRenderCommandBufferSystem";
import {
    createRenderCommandBufferData as createLightRenderCommandBufferData,
    initData as initLightRenderCommandBufferSystemData
} from "./LightRenderCommandBufferSystem";
import { ClassUtils } from "../../utils/ClassUtils";

export var createRenderCommandBufferData = curry(requireCheckFunc((state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, BasicRenderCommandBufferData:any, LightRenderCommandBufferData:any, renderGameObjectArray: Array<GameObject>) => {
    it("renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count", () => {
        expect(renderGameObjectArray.length).lte(DataBufferConfig.renderCommandBufferCount)
    })
}, (state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, BasicRenderCommandBufferData:any, LightRenderCommandBufferData:any, renderGameObjectArray: Array<GameObject>) => {
    var basicMaterialGameObjectArr:Array<GameObject> = [],
        lightMaterialGameObjectArr:Array<GameObject> = [];

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
        basicData: createBasicRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, BasicRenderCommandBufferData, basicMaterialGameObjectArr),
        lightData:createLightRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, LightRenderCommandBufferData, lightMaterialGameObjectArr)
    }
}), 12)

export var initData = (DataBufferConfig: any, BasicRenderCommandBufferData: any, LightRenderCommandBufferData: any) => {
    initBasicRenderCommandBufferSystemData(DataBufferConfig, BasicRenderCommandBufferData);
    initLightRenderCommandBufferSystemData(DataBufferConfig, LightRenderCommandBufferData);
}
