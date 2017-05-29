import curry from "wonder-lodash/curry";
import { RenderCommand } from "./RenderCommand";
import { getComponent, getGeometry, getMaterial, getTransform } from "../../core/entityObject/gameObject/GameObjectSystem";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getShader } from "../../component/material/MaterialSystem";
import { getDrawMode } from "../../component/geometry/GeometrySystem";
import { getLocalToWorldMatrix, getTempLocalToWorldMatrix } from "../../component/transform/ThreeDTransformSystem";
import { getCurrentCamera } from "../../core/entityObject/scene/SceneSystem";
import { getPMatrix, getWorldToCameraMatrix } from "../../component/camera/CameraControllerSystem";
import { getTypeIDFromClass } from "../../component/ComponentTypeIDManager";
import { CameraController } from "../../component/camera/CameraController";
import { forEach } from "../../utils/arrayUtils";
export var createRenderCommands = requireCheckFunc(curry(function (state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, renderGameObjectArray) {
    forEach(renderGameObjectArray, function (gameObject) {
        var geometry = getGeometry(gameObject, GameObjectData), material = getMaterial(gameObject, GameObjectData);
        it("geometry should exist in gameObject", function () {
            expect(geometry).exist;
        });
        it("material should exist in gameObject", function () {
            expect(material).exist;
        });
    });
}), curry(function (state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, renderGameObjectArray) {
    var commandArr = [];
    for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
        var gameObject = renderGameObjectArray_1[_i];
        var command = new RenderCommand(), currentCamera = getComponent(getCurrentCamera(SceneData), getTypeIDFromClass(CameraController), GameObjectData), currentCameraIndex = currentCamera.index, geometry = getGeometry(gameObject, GameObjectData), material = getMaterial(gameObject, GameObjectData), transform = getTransform(gameObject, GameObjectData), materialIndex = material.index, shader = getShader(materialIndex, MaterialData);
        command.mMatrix = getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData).values;
        command.vMatrix = getWorldToCameraMatrix(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData).values;
        command.pMatrix = getPMatrix(currentCameraIndex, CameraData).values;
        command.drawMode = getDrawMode(geometry, GeometryData);
        command.materialIndex = materialIndex;
        command.shaderIndex = shader.index;
        command.geometryIndex = geometry.index;
        commandArr.push(command);
    }
    return commandArr;
}));
//# sourceMappingURL=RenderCommandSystem.js.map