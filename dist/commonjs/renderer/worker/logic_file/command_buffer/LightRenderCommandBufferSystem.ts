import { GameObject } from "../../../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import {
    getMaterial
} from "../../../../core/entityObject/gameObject/GameObjectSystem";
import { it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { ClassUtils } from "../../../../utils/ClassUtils";
import {
    createRenderCommandBufferData as createRenderCommandBufferDataUtils,
    initData as initDataUtils
} from "../../../utils/worker/logic_file/command_buffer/lightRenderComandBufferUtils";

export const createRenderCommandBufferData = curry(requireCheckFunc((state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>) => {
    it("renderGameObject should be light material gameObject", () => {
        for (let gameObject of renderGameObjectArray) {
            expect(ClassUtils.getClassNameByInstance(getMaterial(gameObject.uid, GameObjectData))).equal("LightMaterial")
        }
    })
}, (state: Map<any, any>, GlobalTempData: any, GameObjectData: any, ThreeDTransformData: any, CameraControllerData: any, CameraData: any, MaterialData: any, GeometryData: any, SceneData: any, RenderCommandBufferData: any, renderGameObjectArray: Array<GameObject>) => {
    return createRenderCommandBufferDataUtils(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray, (count: number, buffer: any, materialIndices: Float32Array, geometryIndices: Float32Array, mMatrices: Float32Array, vMatrices: Float32Array, pMatrices: Float32Array, cameraPositions: Float32Array, normalMatrices: Float32Array) => {
        return {
            buffer: buffer,
            count: count
        }
    })
}), 11)

export const initData = initDataUtils;
