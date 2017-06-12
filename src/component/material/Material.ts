import { registerClass } from "../../definition/typescript/decorator/registerClass";
import {
    getAlphaTest, getColor, getGameObject, getOpacity,
    initMaterial as initMaterialSystem,
    setAlphaTest, setColor,
    setOpacity
} from "./MaterialSystem";
import { Color } from "../../structure/Color";
import { MaterialData } from "./MaterialData";
import { Component } from "../Component";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../ComponentSystem";

@registerClass("Material")
export class Material extends Component {
}

export var getMaterialColor = requireCheckFunc((material: Material) => {
    _checkShouldAlive(material, MaterialData);
}, (material: Material) => {
    return getColor(material.index, MaterialData);
})

export var setMaterialColor = requireCheckFunc((material: Material) => {
    _checkShouldAlive(material, MaterialData);
}, (material: Material, color: Color) => {
    setColor(material.index, color, MaterialData);
})

export var getMaterialOpacity = requireCheckFunc((material: Material) => {
    _checkShouldAlive(material, MaterialData);
}, (material: Material) => {
    return getOpacity(material.index, MaterialData);
})

export var setMaterialOpacity = requireCheckFunc((material: Material) => {
    _checkShouldAlive(material, MaterialData);
}, (material: Material, opacity: number) => {
    setOpacity(material.index, opacity, MaterialData);
})

export var getMaterialAlphaTest = requireCheckFunc((material: Material) => {
    _checkShouldAlive(material, MaterialData);
}, (material: Material) => {
    return getAlphaTest(material.index, MaterialData);
})

export var setMaterialAlphaTest = requireCheckFunc((material: Material) => {
    _checkShouldAlive(material, MaterialData);
}, (material: Material, alphaTest: number) => {
    setAlphaTest(material.index, alphaTest, MaterialData);
})

export var getMaterialGameObject = requireCheckFunc((material: Material) => {
    _checkShouldAlive(material, MaterialData);
}, (component: Material) => {
    return getGameObject(component.index, MaterialData);
})

// export var getMaterialShader = (material: Material) => {
//     return getShader(material.index, MaterialData.shaderMap);
// }

export var initMaterial = (material: Material) => {
    initMaterialSystem(material.index, getState(DirectorData));
}

var _checkShouldAlive = (material: Material, MaterialData: any) => {
    checkComponentShouldAlive(material, MaterialData, (material: Material, MaterialData: any) => {
        return isComponentIndexNotRemoved(material);
    })
}
