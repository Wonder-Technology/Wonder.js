import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Map } from "immutable";
import {
    getMaterial
} from "../../core/entityObject/gameObject/GameObjectSystem";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import {
    buildRenderCommandBufferForDrawData
} from "../utils/command_buffer/basicRenderComandBufferUtils";
import { ClassUtils } from "../../utils/ClassUtils";
import {
    createRenderCommandBufferData as createRenderCommandBufferDataUtils,
    initData as initDataUtils
} from "../utils/worker/logic_file/command_buffer/basicRenderComandBufferUtils";

export var createRenderCommandBufferData = requireCheckFunc((state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>) => {
    it("renderGameObject should be basic material gameObject", () => {
        for(let gameObject of renderGameObjectArray) {
            expect(ClassUtils.getClassNameByInstance(getMaterial(gameObject, GameObjectData))).equal("BasicMaterial")
        }
    })
}, (state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>) => {
    return createRenderCommandBufferDataUtils(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, (count:number, buffer:any, materialIndices:Float32Array, geometryIndices:Float32Array, mMatrices:Float32Array) => {
        return buildRenderCommandBufferForDrawData(count, materialIndices, geometryIndices, mMatrices);
    });
})

export var initData = initDataUtils;
