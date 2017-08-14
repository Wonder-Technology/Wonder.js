import { DataBufferConfig } from "../../../../../config/DataBufferConfig";
import { it, requireCheckFunc } from "../../../../../definition/typescript/decorator/contract";
import { Map } from "immutable";
import { GameObject } from "../../../../../core/entityObject/gameObject/GameObject";
import { expect } from "wonder-expect.js";
import { getMaterial } from "../../../../../core/entityObject/gameObject/GameObjectSystem";
import { ClassUtils } from "../../../../../utils/ClassUtils";
import { initData as initBasicRenderComandBufferData } from "./basicRenderComandBufferUtils";
import { initData as initLightRenderComandBufferData } from "./lightRenderComandBufferUtils";

export var createRenderCommandBufferData = requireCheckFunc((state: Map<any, any>, createBasicRenderCommandBufferData:Function, createLightRenderCommandBufferData:Function, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, BasicRenderCommandBufferData:any, LightRenderCommandBufferData:any, renderGameObjectArray: Array<GameObject>) => {
    it("renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count", () => {
        expect(renderGameObjectArray.length).lte(DataBufferConfig.renderCommandBufferCount)
    })
}, (state: Map<any, any>, createBasicRenderCommandBufferData:Function, createLightRenderCommandBufferData:Function, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, BasicRenderCommandBufferData:any, LightRenderCommandBufferData:any, renderGameObjectArray: Array<GameObject>) => {
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
});

export var initData = (DataBufferConfig: any, BasicRenderCommandBufferData: any, LightRenderCommandBufferData: any) => {
    initBasicRenderComandBufferData(DataBufferConfig, BasicRenderCommandBufferData);
    initLightRenderComandBufferData(DataBufferConfig, LightRenderCommandBufferData);
}
