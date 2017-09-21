import { registerClass } from "../../definition/typescript/decorator/registerClass";
import {
    getGameObject
} from "./MaterialSystem";
import { MaterialData } from "./MaterialData";
import { Component } from "../Component";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../ComponentSystem";

@registerClass("Material")
export abstract class Material extends Component {
}

export const getMaterialGameObject = requireCheckFunc((material: Material) => {
    checkShouldAlive(material);
}, (component: Material) => {
    return getGameObject(component.index, MaterialData);
})

export const checkShouldAlive = (material: Material) => {
    checkComponentShouldAlive(material, null, (material: Material) => {
        return isComponentIndexNotRemoved(material);
    })
}
