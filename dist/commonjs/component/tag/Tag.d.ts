import { Component } from "../Component";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
export declare class Tag extends Component {
}
export declare const createTag: (slotCount?: number) => any;
export declare const addTag: Function;
export declare const removeTag: Function;
export declare const findGameObjectsByTag: (tag: string) => GameObject[];
export declare const getTagGameObject: Function;
