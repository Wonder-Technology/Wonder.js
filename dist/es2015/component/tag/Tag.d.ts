import { Component } from "../Component";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
export declare class Tag extends Component {
}
export declare var createTag: (slotCount?: number) => any;
export declare var addTag: Function;
export declare var removeTag: Function;
export declare var findGameObjectsByTag: (tag: string) => GameObject[];
export declare var getTagGameObject: Function;
