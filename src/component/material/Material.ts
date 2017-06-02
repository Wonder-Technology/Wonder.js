import { registerClass } from "../../definition/typescript/decorator/registerClass";
import {
    getAlphaTest, getColor, getGameObject, getOpacity, getShader, initMaterial as initMaterialSystem, setAlphaTest, setColor,
    setOpacity
} from "./MaterialSystem";
import { Color } from "../../structure/Color";
import { MaterialData } from "./MaterialData";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Component } from "../Component";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { material_config } from "../../renderer/data/material_config";
import { shaderLib_generator } from "../../renderer/data/shaderLib_generator";
import { ShaderData } from "../../renderer/shader/ShaderData";
import { Shader } from "../../renderer/shader/Shader";

@registerClass("Material")
export class Material extends Component {
}

export var getMaterialColor = (material: Material) => {
    return getColor(material.index, MaterialData);
}

export var setMaterialColor = (material: Material, color: Color) => {
    setColor(material.index, color, MaterialData);
}

export var getMaterialOpacity = (material: Material) => {
    return getOpacity(material.index, MaterialData);
}

export var setMaterialOpacity = (material: Material, opacity: number) => {
    setOpacity(material.index, opacity, MaterialData);
}

export var getMaterialAlphaTest = (material: Material) => {
    return getAlphaTest(material.index, MaterialData);
}

export var setMaterialAlphaTest = (material: Material, alphaTest: number) => {
    setAlphaTest(material.index, alphaTest, MaterialData);
}

export var getMaterialGameObject = (component: Material) => {
    return getGameObject(component.index, MaterialData);
}

export var getMaterialShader = (material: Material) => {
    return getShader(material.index, MaterialData.shaderMap);
}

//todo restore
// export var initMaterial = (material: Material) => {
//     initMaterialSystem(material.index, getState(DirectorData));
// }
