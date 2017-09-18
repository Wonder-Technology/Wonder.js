import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkShouldAlive, Material } from "./Material";
import { addMap, create, initMaterial } from "./BasicMaterialSystem";
import { MaterialData } from "./MaterialData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { BasicMaterialData } from "./BasicMaterialData";
import { getAlphaTest, getColor, getOpacity, setAlphaTest, setColor, setOpacity } from "./MaterialSystem";
import { Color } from "../../structure/Color";
import { Texture } from "../../renderer/texture/Texture";
import { MapManagerData } from "../../renderer/texture/MapManagerData";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { TextureData } from "../../renderer/texture/TextureData";
import { isWebgl1 } from "../../renderer/device/WebGLDetectSystem";
import { WebGL1ShaderData } from "../../renderer/webgl1/shader/ShaderData";
import { WebGL2ShaderData } from "../../renderer/webgl2/shader/ShaderData";

@registerClass("BasicMaterial")
export class BasicMaterial extends Material {
}

export var createBasicMaterial = null;

if (isWebgl1()) {
    createBasicMaterial = () => {
        return create(WebGL1ShaderData, MaterialData, BasicMaterialData);
    }
}
else {
    createBasicMaterial = () => {
        return create(WebGL2ShaderData, MaterialData, BasicMaterialData);
    }
}

export const initBasicMaterial = (material: BasicMaterial) => {
    initMaterial(material.index, getState(DirectorData));
}

export const getBasicMaterialColor = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial) => {
    return getColor(material.index, MaterialData);
})

export const setBasicMaterialColor = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial, color: Color) => {
    setColor(material.index, color, MaterialData);
})

export const getBasicMaterialOpacity = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial) => {
    return getOpacity(material.index, MaterialData);
})

export const setBasicMaterialOpacity = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial, opacity: number) => {
    setOpacity(material.index, opacity, MaterialData);
})

export const getBasicMaterialAlphaTest = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial) => {
    return getAlphaTest(material.index, MaterialData);
})

export const setBasicMaterialAlphaTest = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial, alphaTest: number) => {
    setAlphaTest(material.index, alphaTest, MaterialData);
})

export const addBasicMaterialMap = requireCheckFunc((material: BasicMaterial, map: Texture) => {
    checkShouldAlive(material);
}, (material: BasicMaterial, map: Texture) => {
    addMap(material.index, map, MapManagerData, TextureData);
})
