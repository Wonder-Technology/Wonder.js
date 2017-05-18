import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import map from "wonder-lodash/map";
import forEach from "wonder-lodash/forEach";
import { RenderCommand } from "./RenderCommand";
import { getDrawMode } from "../../component/geometry/GeometryDataSystem";
import { getGeometry, getMaterial } from "../../core/entityObject/gameObject/GameObjectSystem";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getShader } from "../../component/renderComponent/material/MaterialSystem";

export var createRenderCommands = curry(requireCheckFunc((state:Map<any, any>, GameObjectData:any, MaterialData:any, renderGameObjectArray:Array<GameObject>) => {
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
}, (state:Map<any, any>, GameObjectData:any, MaterialData:any, renderGameObjectArray:Array<GameObject>) => {
    map(renderGameObjectArray, (gameObject:GameObject) => {
        var command = new RenderCommand(),
            geometry = getGeometry(gameObject, GameObjectData),
            material = getMaterial(gameObject, GameObjectData),
            materialIndex = material.index,
            shader = getShader(materialIndex, MaterialData);

        //todo get camera and set xMatrix
        // command.mMatrix =

        command.drawMode = getDrawMode(geometry, GameObjectData);

        command.materialIndex = materialIndex;
        command.shaderIndex = shader.index;

        command.geometryIndex = geometry.index;

        return command;
    });
}))