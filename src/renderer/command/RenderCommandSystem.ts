import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import map from "wonder-lodash/map";
import forEach from "wonder-lodash/forEach";
import { RenderCommand } from "./RenderCommand";
import { getGeometry, getMaterial, getTransform } from "../../core/entityObject/gameObject/GameObjectSystem";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getShader } from "../../component/material/MaterialSystem";
import { getDrawMode } from "../../component/geometry/GeometrySystem";
import { getLocalToWorldMatrix, getTempLocalToWorldMatrix } from "../../component/transform/ThreeDTransformSystem";

export var createRenderCommands = requireCheckFunc(curry((state:Map<any, any>, GameObjectData:any, ThreeDTransformData:any, MaterialData:any, GeometryData:any, renderGameObjectArray:Array<GameObject>) => {
    forEach(renderGameObjectArray, (gameObject:GameObject) => {
        var geometry = getGeometry(gameObject, GameObjectData),
            material = getMaterial(gameObject, GameObjectData);

        it("geometry should exist in gameObject", () => {
            expect(geometry).exist;
        });
        it("material should exist in gameObject", () => {
            expect(material).exist;
        });
    });
}), curry((state:Map<any, any>, GameObjectData:any, ThreeDTransformData:any, MaterialData:any, GeometryData:any, renderGameObjectArray:Array<GameObject>) => {
    return map(renderGameObjectArray, (gameObject:GameObject) => {
        var command = new RenderCommand(),
            geometry = getGeometry(gameObject, GameObjectData),
            material = getMaterial(gameObject, GameObjectData),
            transform = getTransform(gameObject, GameObjectData),
            materialIndex = material.index,
            shader = getShader(materialIndex, MaterialData);

        command.mMatrix = getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData);

        //todo get camera and set vMatrix/pMatrix
        command.vMatrix = null;
        command.pMatrix = null;

        command.drawMode = getDrawMode(geometry, GeometryData);

        command.materialIndex = materialIndex;
        command.shaderIndex = shader.index;

        command.geometryIndex = geometry.index;

        return command;
    });
}))