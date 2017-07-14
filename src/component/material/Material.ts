import { registerClass } from "../../definition/typescript/decorator/registerClass";
import {
    getGameObject, initMaterial as initMaterialSystem,
} from "./MaterialSystem";
import { MaterialData } from "./MaterialData";
import { Component } from "../Component";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../ComponentSystem";

@registerClass("Material")
export abstract class Material extends Component {
}

export var getMaterialGameObject = requireCheckFunc((material: Material) => {
    checkShouldAlive(material);
}, (component: Material) => {
    return getGameObject(component.index, MaterialData);
})

// export var getMaterialShader = (material: Material) => {
//     return getShader(material.index, MaterialData.shaderMap);
// }

export var initMaterial = (material: Material) => {
    initMaterialSystem(material.index, getState(DirectorData));
}

export var checkShouldAlive = (material: Material) => {
    checkComponentShouldAlive(material, null, (material: Material) => {
        return isComponentIndexNotRemoved(material);
    })
}
