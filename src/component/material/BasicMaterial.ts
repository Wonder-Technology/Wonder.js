import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { checkShouldAlive, Material } from "./Material";
import { create } from "./BasicMaterialSystem";
import { ShaderData } from "../../renderer/shader/ShaderData";
import { MaterialData } from "./MaterialData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { BasicMaterialData } from "./BasicMaterialData";
import { getAlphaTest, getColor, getOpacity, setAlphaTest, setColor, setOpacity } from "./MaterialSystem";
import { Color } from "../../structure/Color";

@registerClass("BasicMaterial")
export class BasicMaterial extends Material {
}

export var createBasicMaterial = () => {
    return create(ShaderData, MaterialData, BasicMaterialData);
}

export var getBasicMaterialColor = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial) => {
    return getColor(material.index, MaterialData);
})

export var setBasicMaterialColor = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial, color: Color) => {
    setColor(material.index, color, MaterialData);
})

export var getBasicMaterialOpacity = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial) => {
    return getOpacity(material.index, MaterialData);
})

export var setBasicMaterialOpacity = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial, opacity: number) => {
    setOpacity(material.index, opacity, MaterialData);
})

export var getBasicMaterialAlphaTest = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial) => {
    return getAlphaTest(material.index, MaterialData);
})

export var setBasicMaterialAlphaTest = requireCheckFunc((material: BasicMaterial) => {
    checkShouldAlive(material);
}, (material: BasicMaterial, alphaTest: number) => {
    setAlphaTest(material.index, alphaTest, MaterialData);
})

